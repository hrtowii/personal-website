---
date: 2022-12-22
title: Installing triple boot on my laptop
draft: false
tags: ["linux", "arch btw", "idk bruh"]
---

# Disclaimer (30th Sep 2024)

I wrote most of this post two years ago, but I'm updating it to fill up the rest of my experience. I really forgot most of what I did, so doing this is also a walk through memory lane for me. I wish I was as free again to fuck around with my system as last time. :sob: I suppose I'm free enough to make this website though... so maybe I can retry this again :3

# Introduction

During my June holidays in 2021, I managed to complete my goal of installing macOS, Windows, and Linux on the same machine.

# What's the point of doing so?

Initially, I wanted to install Linux and Windows together just to try it. However after some time, I preferred to use Linux over windows for normal usage. I'd always notice that my system ran much smoother and without stutters on Arch (i use arch btw) whereas Windows sometimes would keep my laptop hot and noisy even on a fresh install. Furthermore, I was much more comfortable using the terminal on Linux as compared to Powershell/cmd on Windows. Having an easy to use package manager (pacman/yay/paru/yaourt) to install whatever I wanted using the Arch User Repository (AUR) instead of trawling through Google for install links was the icing on the cake for me.

I couldn't outright just ditch Windows though, as I needed it to play games that aren't compatible with proton/WINE due to anticheat compatibility. Examples of such games were Genshin Impact and VALORANT.

Well, so that settles why I wanted to use Linux. How about macOS? After all, both Linux and macOS are UNIX(-like), so there shouldn't be any difference in those two operating systems for programming. The main difference for me was the UI. Cheesy, I know, but I recently had the chance to use my dad's 2013 MacBook Pro. After using it for around 2 weeks, I had grown accustomed and even found myself growing fond of it moreso than using Linux at times. These aren't really valid reasons though, aren't they? I was just bored during the holidays with nothing to do, so I decided to waste my time installing macOS onto my system.

# Installing Linux

## Selecting a distro

Before I installed Linux, I was a Windows only user which had previously installed WSL to learn basic terminal commands. After some Googling, I managed to shortlist my choices to 3 distros: Fedora, Ubuntu, or Arch Linux. I flashed an ISO of each distro to my thumbdrive and livebooted each of them to try which of them were my favourite.
// complete later
(Later me from 2024 will finish this :3)

# Installing macOS

## Smooth sailing?

Researching the internet for information about Hackintosh revealed that there were multiple methods for me to choose from in order to install macOS on my laptop. OpenCore, Clover, "flavors" of macOS which offered prebuilt EFIs... left me spoilt for choice. However, reading more Reddit threads about installing Big Sur on my laptop showed that OpenCore was the way to go. Conveniently, OpenCore also has a [guide](https://dortania.github.io/OpenCore-Install-Guide/) which was easy for me to follow.

Great! I could follow the guide for my laptop, which had a Kaby Lake CPU and UHD620 iGPU graphics, and create an EFI with OpenCore to install macOS on.

## Problems faced when installing

- WiFi + Bluetooth incompatibility

  - macOS is a picky operating system. As it only needs to support a limited number of laptops and iMacs, each with specified hardware, I was bound to have _some_ sort of incompatible hardware. As Apple macOS devices all contain Broadcom WiFi cards, macOS only supports WiFi and Bluetooth for those WiFi cards.
  - Unfortunately, my laptop contained a Qualcomm Atheros QC6174a Wireless Network Adapter. Bummer.
  - This meant that I wasn't able to connect to the internet or use bluetooth at ALL, which prevented me from using the online macOS installer to install to my laptop. My laptop didn't have an ethernet port either, so I couldn't go down that path.

- NVIDIA (Optimus) being unsupported

  - My laptop contained both integrated graphics and a dedicated NVIDIA GPU to switch between at any given time. This was a cool feature on my other operating systems, as I was able to save some battery life when I wasn't doing anything graphically intensive.
  - However, Mac(book)s no longer have any new NVIDIA GPUs, and so macOS doesn't really support them anymore. Hence, the latest GPU that can be supported for NVIDIA are the Maxwell and Pascal generations up to High Sierra. Kepler(v2) GPUs are supported up to the latest version of Big Sur.
  - On the other hand, many AMD graphics cards are still well supported up to the current version of macOS.
  - As my laptop's discrete graphics card was unsupported, I had to disable it and rely on integrated graphics to work. This brings me to my next point:

- iGPU not working initially

  - In my rush to quickly install macOS, I messed up in configuring my EFI for OpenCore such that I was not able to use my integrated graphics properly.
  - It was such a PITA that I decided to trash everything and start from the top again.

- Sound codec not working without Codeccommander
  - Audio is broke OOTB for Hackintoshes. The easiest way to solve this normally is to follow the OpenCore guide to try multiple possible layout IDs for your audio codec.
  - After trial-and-error, I stumbled open a layout ID that played sound correctly, but was weirdly tinny on both headphones and speakers. Confused, I tried other audio codec's layout IDs, but to no avail either.
  - I eventually had to use Google to check out what I was doing wrong, but it was just a known issue with certain audio codecs, and I had to[install some software](https://elitemacx86.com/threads/audio-distortion-when-using-headphones-on-laptops-clover-opencore.185/) to fix it.

## Working around problems

- Buying a WiFi adapter
  - After some intense ~~googling~~ research, I came to the conclusion that I had to use the offline macOS installer, then use a external wireless adapter (those USB wifi sticks) and install drivers to enable WiFi for my laptop.
  - This still did not restore Bluetooth functionality, which meant I could not use my wireless mice or keyboard.
  - It was a painstaking 2 weeks of waiting for my wireless adapter to arrive before I could proceed with installing macOS on my laptop.

# Compatibility issues between OSes

## Bootloader problems

Previously on my dual boot, I used REFInd as a bootloader to select between the Windows and Linux EFI partitions, as they were each on separate drives. I'd heard of horror stories where Windows updates would wipe the Linux bootloader if they were both installed on the same drive.

However, OpenCore is also a bootloader, which meant I had to either get rid of REFInd and use OpenCore to boot each OS directly, or chainload to REFInd when I wanted to boot either Windows or Linux.

## What have I learnt from this?
