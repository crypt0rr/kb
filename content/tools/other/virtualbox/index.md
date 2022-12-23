---
title : "Virtualbox"
# pre : ' '
description : "VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use."
date : 2020-03-13T17:58:55+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Virtualbox

VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use.

## Installation

Download newest release from [Virtualbox.org](https://www.virtualbox.org/wiki/Downloads)

### Troubleshooting

### When no USB-device is reported to send to vm

```plain
sudo adduser $USER vboxusers
```

## Examples

![Example](images/example.png)

## VirtualBox CLI

| Description                            | Command                                                                                       | Option(s)             |
| -------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------- |
| List All VMS                           | `VBoxManage list vms`                                                                         | -                     |
| List running VMS                       | `VBoxManage list runningvms`                                                                  | More details add `-l` |
| Show VM Properties                     | `VBoxManage showvminfo <VM>`                                                                  | -                     |
| Start VM (Not HeadLess)                | `VBoxManage startvm <VM>`                                                                     | `--type headless`     |
| Stop Time Sync Between Host and Client | `VBoxManage setextradata <VM> "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled" "1"` | -                     |

## URL List

* [Virtualbox.org](https://www.virtualbox.org/)
