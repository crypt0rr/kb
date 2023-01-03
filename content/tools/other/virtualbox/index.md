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
| Show VM Properties                     | `VBoxManage showvminfo <vm>`                                                                  | -                     |
| Start VM (Not HeadLess)                | `VBoxManage startvm <vm>`                                                                     | `--type headless`     |
| Stop Time Sync Between Host and Client | `VBoxManage setextradata <vm> "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled" "1"` | -                     |
| Send ACPI Shutdown Signal              | `VBoxManage controlvm <vm> acpipowerbutton`                                                   | -                     |
| PowerOff VM                            | `VBoxManage controlvm <vm> poweroff`                                                          | -                     |
| Reset VM                               | `VBoxManage controlvm <vm> reset`                                                             | -                     |
| Pauze VM                               | `VBoxManage controlvm <vm> pause`                                                             | -                     |
| Resume VM                              | `VBoxManage controlvm <vm> resume`                                                            | -                     |

## URL List

* [Virtualbox.org](https://www.virtualbox.org/)
