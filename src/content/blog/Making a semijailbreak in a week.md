---
date: 2024-09-27
title: making a semi-jailbreak in a week
excerpt: example?
---
# Introduction
One fine week in January 2024, I released a semi-jailbreak named [Serotonin](https://github.com/hrtowii/Serotonin). If you're unaware of what it does, it aims to enable tweak injection for SpringBoard and works with the RootHide bootstrap. I never really explained how it worked and why I view it as a failure, so this blog post aims to cover that. Let's go over what led up to the release, how I made it, and how I'd have made it now if I didn't rush it out.

Disclaimer: I did not do this alone. I have gotten countless amounts of help from very patient people, and I would not be able to make this without them. 
# Background: What's a semi-jailbreak?

## What does a jailbreak need?
Traditional jailbreaks typically involve running exploits to ultimately inject a dylib into every process to tweak them.

In Dopamine 1 (v2 wasn't out yet), this was achieved by using the [Fugu15 exploit chain](https://objectivebythesea.org/v5/talks/OBTS_v5_lHenze.pdf), which consisted of a DriverKit kernel exploit, a CoreTrust+installd bypass, a PAC bypass, and a PPL bypass. 

Do you spot the problem here? There are just too many exploits needed to be chained together. How do we get around this?

**Let me ask you:** What do you *really* want from a jailbreak?

Is it the ability to run arbitrary binaries? To get a root shell? To get cool icons on your homescreen? If all you really want is that, you don't even need systemwide injection, just SpringBoard injection. This is exactly what a "semi-jailbreak" aims to be. Note that I'm just making this shit up, the terminology isn't exactly set in stone.

### kernel r/w
To read and write to kernel memory, a kernel exploit is needed. 

I could write another blogpost on how \*OS kexploits have evolved throughout their versions, but the gist is that _physical_ memory has less mitigations than _virtual_ memory. This is evident from recent kexploits abusing [physical use-after-frees](https://github.com/felix-pb/kfd/blob/main/writeups/exploiting-puafs.md) and the last virtual memory exploit being [multicast_bytecopy](https://github.com/potmdehex/multicast_bytecopy) which only works up to iOS 15.

[kfd](https://github.com/felix-pb/kfd) is a set of kernel exploits that mainly work from iOS ???-16.6.1. landa is the most recent version that works up to 16.6.1, and doesn't require any cleanup on exploit failure. This makes it the best version in terms of both reliability and version support.

### Codesigning bypass
Codesigning is an essential part of the iOS security model that ensures that random binaries can't run with arbitrary entitlements. For more info on this I recommend reading [the Apple Wiki article](https://theapplewiki.com/wiki/Code_signature) and [this article from Alfie](https://alfiecg.uk/2024/01/06/Ad-hoc-signing.html).

What's relevant here is that CoreTrust has a vulnerability that allows us to run any binary we want with arbitrary entitlements (barring 3). By itself, this is pretty useful (see TrollStore, Bootstrap).

# The idea: Replacing launchd to win
`launchd` replacement has always been viewed as a "holy grail" in the sense that running arbitrary code in it allows us to hook every other spawn function, as every process that's spawned in iOS userspace has to go through its `posix_spawn()` function.

If we could replace launchd with our own using the CoreTrust bypass, it'd be game over. This has been demonstrated using [asdfugil's haxx](https://github.com/asdfugil/haxx/launchd.c) if you just replace the original `/sbin/launchd` binary on iOS 14-14.8.1. A related article from Alfie is [here](https://alfiecg.uk/2023/02/25/Getting-untethered-code-execution-on-iOS-14.8.html) which talks about it.

However, the introduction of SSV on iOS 15 ([Signed System Volume](https://support.apple.com/en-sg/guide/security/secd698747c9/web)) aka. Rootless (not to be confused with SIP) prevents us from doing that on newer versions of iOS.

Could there still be a way to replace files, temporarily or not, without breaking SSV?

If so, we could get a semi-jailbreak to work by hooking `posix_spawn()` and making it spawn our own SpringBoard. Not only that, but it could be used to replace any system binary we please because it's all CT signed.

# Getting it to work

## launchd control first
### Idea: MacDirtyCow
MacDirtyCow (MDC) is a unique kernel exploit in the sense that it doesn't grant krw, but overwrites arbitrary files, similar to the dirty COW exploit on Linux.

As a plus, changes get reverted on reboot because of SSV. A great example of what MDC can do is [grant_full_disk_access.m](https://gist.github.com/zhuowei/bc7a90bdc520556fda84d33e0583eb3e), which overwrites **tccd** on iOS temporarily to allow full disk read/write. That sounds great! Why don't we do that for launchd?

Unfortunately, I'm not skilled enough to write a patchfinder. 😭 

It's not possible to just replace the whole file, because MDC isn't a magical solution; it can't write to binary TEXT segments or the dyld_shared_cache, because the minute you write to an executable page you will get a page fault and the process will crash.

It is possible to work around this, as shown in the above code and from [Ian Beer](https://project-zero.issues.chromium.org/issues/42451497#comment5):

> ...writing to the *data* segments of binaries (not the shared cache) *does* work ;-) What this means in practise is that from inside the app sandbox you can mess with the fixup chains in the data segment which basically gives you a neat JOP primitive where the loader will rebase and sign all your gadgets for you with the correct keys for the target process.

I might mess around and learn how to write JOP chains in the future, but for the time being I marked it off as an option.
### Idea: NSGetExecutablePath

### Idea: Namecache

A [vnode](https://github.com/apple-oss-distributions/xnu/blob/main/bsd/sys/vnode_internal.h#L159) is essentially a kernel representation of a file.
Reading this struct, you may come across this interesting part:
```c
struct vnode {
	// ...
	TAILQ_HEAD(, namecache) v_ncchildren;   /* name cache entries that regard us as their parent */
	LIST_HEAD(, namecache) v_nclinks;       /* name cache entries that name this vnode */
	// ...
}
```

Alright, so `v_ncchildren` is for a directory that contains a linked list of namecaches of children files. For example, here are some items in `/sbin/`.
```
/
└── sbin/
    ├── fsck
    ├── launchd
    ├── mount
    ├── reboot
    ├── shutdown
    └── umount
```

If we read through the `v_ncchildren` of `sbin`'s vnode, we will get fsck's namecache. Read 0x10 after that and you get launchd's namecache.



Each vnode consists of a namecache struct. Namecaches are a way for the kernel to keep track of where a certain file is stored.
From XNU [(source)](https://github.com/apple-oss-distributions/xnu/blob/xnu-8792.41.9/bsd/sys/namei.h#L243):
```c
struct  namecache {
	TAILQ_ENTRY(namecache)  nc_entry;       /* chain of all entries */
	TAILQ_ENTRY(namecache)  nc_child;       /* chain of ncp's that are children of a vp */
	union {
		LIST_ENTRY(namecache)  nc_link; /* chain of ncp's that 'name' a vp */
		TAILQ_ENTRY(namecache) nc_negentry; /* chain of ncp's that 'name' a vp */
	} nc_un;
	LIST_ENTRY(namecache)   nc_hash;        /* hash chain */
	vnode_t                 nc_dvp;         /* vnode of parent of name */
	vnode_t                 nc_vp;          /* vnode the name refers to → This sounds interesting... */
	unsigned int            nc_hashval;     /* hashval of stringname */
	const char              *nc_name;       /* pointer to segment name in string cache */
};
```

Okay, so this namecache has a pointer to a vnode that tells the kernel where the file is. What happens if you try to write this `nc_vp` field of a certain vnode's namecache, with another vnode's `nc_vp`? Would the file be "redirected"? 

Let's try writing a `SwitchSysBin` function in C to test it. 

Let's say that we want to swap `/sbin/launchd` (which is initproc) with `/var/mobile/kfc`.
Assuming that we have krw, there are two ways of doing this:
1. Traverse the linked list of `v_ncchildren` of `/sbin/` and check if the `v_name` of the current namecache is `launchd`. If it is, kwrite its `nc_vp` with `/var/mobile/kfc`'s `nc_vp`.
2. 

Here's the code for method 1:

```c
// try reading through vp_ncchildren of /sbin/'s vnode to find launchd's namecache
// after that, kwrite namecache, vnode id -> thx bedtime / misfortune

int SwitchSysBin(uint64_t vnode, char* what, char* with)
{
    uint64_t vp_nameptr = kread64(vnode + off_vnode_v_name);
    // the namecache is a linked list, so we just start from the first element and update to the last.
    uint64_t vp_namecache = kread64(vnode + off_vnode_v_ncchildren_tqh_first);
    if(vp_namecache == 0)
        return 0;
    
    while(1) {
        if(vp_namecache == 0)
            break;
        vnode = kread64(vp_namecache + off_namecache_nc_vp);
        if(vnode == 0)
            break;
        vp_nameptr = kread64(vnode + off_vnode_v_name);
        
        char vp_name[256];
        // 
        kreadbuf(kread64(vp_namecache + 96), &vp_name, 256);
//        printf("vp_name: %s\n", vp_name);
        
        if(strcmp(vp_name, what) == 0)
        {
            uint64_t with_vnd = getVnodeAtPath(with);
            uint32_t with_vnd_id = kread64(with_vnd + 116);
            uint64_t patient = kread64(vp_namecache + 80);        // vnode the name refers → offsetof(nc_vp)
            uint32_t patient_vid = kread64(vp_namecache + 64);    // name vnode id
            printf("patient: %llx vid:%llx -> %llx\n", patient, patient_vid, with_vnd_id);

            kwrite64(vp_namecache + 80, with_vnd);
            kwrite32(vp_namecache + 64, with_vnd_id);
            vnode_increment(with_vnd);

            return vnode;
        }
        // if we haven't found launchd, update the namecache to the next file's one.
        vp_namecache = kread64(vp_namecache + off_namecache_nc_child_tqe_prev);
    }
    return 0;
}
```




HOLY SHIT IT WORKS???????
![[Pasted image 20240925041720.png]]
This panic is from our launchd violating Launch Constraints, and to fix it I just copied over the entitlements of original launch into my fake launchd.
### csops hook

### fishhook works?

### hooking posix_spawn(\_p)


## SpringBoard injection
### choosing a bootstrap

### fishhook doesn't work, but we didn't know

### os_variant_has_internal_content as a workaround

### jit springboard to allow invalid pages, dlopen bootstrap.dylib


# Improvements
## replace fishhook with Ellekit, replace tbd
## create a generalhook that will be used for daemons later


Improvements were made to the kernel exploit code by no longer relying on 40k lines of offsets for every iOS and device combination and using a kernel patchfinder from [tihmstar](https://github.com/SerotoninApp/Serotonin/commit/7feab34b6601c00a4b63d5ab820785fc4cae8d5a), then to using a [fork of dimentio](https://github.com/SerotoninApp/Serotonin/commit/9cb9ab086607aaa70e8c44a3c3a0d547f79d5058).

Dopamine 2 was released and everyone on applicable versions moved on to it, which reduced my motivation to work on Serotonin anymore.

It was only a few months later in July when I decided to get off my ass and try to work on generalising the hook made for SpringBoard to other processes, namely daemons as some tweaks such as AppStore++, Mitsuha Forever, and Snapper 3 rely on injecting into them.

# System Injection

## the problem: no fakelib

## the solution: launchdhook server - 3 parts

## part 1: kfd in launchd for unsandbox
is there a better way for this? probably
## part 2: jbserver systemwide checkin to grant sandbox extensions like Dopamine

## part 3: jitterd to jit stuff during systemwide checkin because APPARENTLY bootstrapd doesn't work



# Why not rootless?

# The better version: nathanLR


# Conclusion

# Glossary
Entitlement:
