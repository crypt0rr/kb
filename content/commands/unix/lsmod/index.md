---
title : "lsmod"
# pre : '<i class="fas fa-code"></i> '
description : "Show the status of modules in the Linux Kernel."
date : 2020-03-13T17:00:48+01:00
# hidden : true
# draft : true
weight : 520
# tags : ['']
---

---

## Usage

```plain
lsmod
```

## Examples

```plain
lsmod

Module                  Size  Used by
uas                    24576  0
usb_storage            77824  2 uas
nfnetlink              16384  0
ccm                    20480  6
hid_logitech_hidpp     40960  0
hid_logitech_dj        24576  0
thunderbolt           167936  0
pci_stub               16384  1
vboxpci                24576  0
vboxnetadp             28672  0
vboxnetflt             28672  0
vboxdrv               487424  3 vboxpci,vboxnetadp,vboxnetflt
[...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/lsmod)
