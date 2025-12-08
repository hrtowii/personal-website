---
date: 2025-12-08
title: "x64 pwntools on ARM macs"
---

# why ???

today i was trying to debug a x64 binary with pwntools, but with a twist: i'm on a mac (ARM) !!! yay who doesn't love power efficiency right?

the only issue is that i can't. rosetta "works" but it doesn't even properly work bc debugging breaks it!

```bash
~/dev/ctfpractice/blahajctf/sharktank main* ❯ arch -x86_64 ./main       18:44:25
./main: ./main: cannot execute binary file
~/dev/ctfpractice/blahajctf/sharktank main* ❯ file main                 18:44:26
main: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=db8344c4a23c1db594a052faa8f1da0f3afc5082, for GNU/Linux 3.2.0, with debug_info, not stripped

```

running an x64 vm is surprisingly easy with [orbstack](https://orbstack.dev/), so i just installed Kali then nix on it! yippee

now it should DEFINITELY work with just `gdb <thing>` right!!! :copium:

No!

```bash
~/dev/ctfpractice main* ❯ orb                                           18:41:39

    ╭───────────────────────────────────────────────────────╮
    │                                                       │
    │              OrbStack update available!               │
    │              Run "orb update" to update.              │
    │                                                       │
    │  Updates include improvements, features, and fixes.   │
    │                                                       │
    ╰───────────────────────────────────────────────────────╯

ibarahime@kali:/Users/ibarahime/dev/ctfpractice$ cd blahajctf/sharktank/
ibarahime@kali:/Users/ibarahime/dev/ctfpractice/blahajctf/sharktank$ gdb main
GNU gdb (Debian 16.3-1) 16.3
Copyright (C) 2024 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<https://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from main...
(gdb) run
Starting program: /Users/ibarahime/dev/ctfpractice/blahajctf/sharktank/main
warning: linux_ptrace_test_ret_to_nx: Cannot PTRACE_GETREGS: Input/output error
warning: linux_ptrace_test_ret_to_nx: PC 0x900000000 is neither near return address 0x7ffff87f3000 nor is the return instruction 0x55555598af12!
Couldn't get CS register: Input/output error.
(gdb)
```

great! so i can't debug! at least with OrbStack normally. their docs do mention this limitation and a way to fix it ![here](https://docs.orbstack.dev/machines/#debugging-with-gdb-lldb), which is basically telling you to use qemu then run it in another terminal

the issue is that I can't run my pwntools script with this together, and pwntools normal gdb functions don't work normally! i'd try to run qemu as my `process()`, but that made pwntools start debugging qemu which wasn't my need

```python
from pwn import *
import struct

context.binary = elf = ELF("./main")
libc = ELF("./libc.so.6", checksec=False)

QEMU_GDB_PORT = 1234

qemu_cmd = [
    "qemu-x86_64-static",
    "-g", str(QEMU_GDB_PORT),
    elf.path
]

p = process(qemu_cmd)
gdb_script = f"""
set architecture i386:x86-64
file {elf.path}
target remote :{QEMU_GDB_PORT}
continue
"""

gdb.attach(p, gdbscript=gdb_script)
```

the fix was to just give up on using gdb.attach because it will always try to debug the `p` being ran. i was on copium

the next best solution is to run them separately myself, with a temp file. this was what i ended up doing and it seems(?) to work fine!

```python
from pwn import *
import struct
import tempfile
import os

context.binary = elf = ELF("./main")
libc = ELF("./libc.so.6", checksec=False)

context.terminal = ["tmux", "splitw", "-h"]

QEMU_GDB_PORT = 1234

p = process(
    [
        "/usr/bin/qemu-x86_64-static",
        "-g",
        str(QEMU_GDB_PORT),
        elf.path,
    ]
)

gdb_script = f"""
set architecture i386:x86-64
file {elf.path}
target remote :{QEMU_GDB_PORT}
break *rename_ticker
continue
"""

fd, script_path = tempfile.mkstemp(suffix=".gdb")
os.write(fd, gdb_script.encode())
os.close(fd)

gdb_proc = process(context.terminal + ["gdb", "-q", elf.path, "-x", script_path])
```

which gives you a nice tmux window with gdb and your program already set, preset breakpoints included :D

apparently outside of orbstack, lima seems to work without any issue in gdb so maybe I should have just given up and used that, but it is what it is: [https://bof.rip/blog/setting-up-pwn/](https://bof.rip/blog/setting-up-pwn/)
