---
title : "MountEFI"
# pre : ' '
description : "An even more robust edition of my previous MountEFI scripts."
date : 2022-01-25T16:40:52+01:00
# hidden : true
# draft : true
weight : 310
# tags : ['']
---

---

An *even* more robust edition of my previous MountEFI scripts.

Other scripts can call this script to do a silent mount - and receive a 0 on succes, or 1 (or higher) on failure.

For example: If another script calls MountEFI.command disk0 then my script would mount without user interaction, and return a 0 on success, or a 1 on failure. This can also take multiple EFIs to mount - MountEFI.command disk0 / disk3 would mount the EFIs connected to disk0, the boot drive (/), and disk3 if they exist.

## Installation

```plain
git clone https://github.com/corpnewt/MountEFI.git
```

## Usage

```plain
./MountEFI.command
```

## Examples

```plain
$ ./MountEFI.command
  ##########################################
 #                     MountEFI                        #
##########################################
 
1. Macintosh HD (disk1s1s1)

S. Switch to Full Output
L. Set As Default Layout (Current: Slim)
B. Mount the Boot Drive's EFI

D. Pick Default Disk (None Set)
M. After Mounting: Return to Menu
R. Toggle Window Resizing (Currently Enabled)
Q. Quit
 
(* denotes the booted EFI (Clover/OC))
Pick the drive containing your EFI:
```

## URL List

- [Github.com - MountEFI](https://github.com/corpnewt/MountEFI)
