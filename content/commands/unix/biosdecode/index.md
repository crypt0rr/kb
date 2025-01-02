---
title : "biosdecode"
# pre : ' '
description : "BIOS information decoder."
date : 2020-08-22T14:22:27+02:00
# hidden : true
# draft : true
weight : 50
# tags : ['']
---

---

## Usage

```plain
Usage: biosdecode [OPTIONS]
```

## Flags

```plain
Options are:
 -d, --dev-mem FILE     Read memory from device FILE (default: /dev/mem)
     --pir full         Decode the details of the PCI IRQ routing table
 -h, --help             Display this help text and exit
 -V, --version          Display the version and exit
```

## Examples

```plain
$ sudo biosdecode
# biosdecode 3.2
SMBIOS 3.0 present.
    Structure Table Length: 3034 bytes
    Structure Table Address: 0x8F0D6000
    Number Of Structures: 62
    Maximum Structure Size: 320 bytes
SMBIOS 3.0.0 present.
    Structure Table Maximum Length: 3034 bytes
    Structure Table 64-bit Address: 0x000000008F0D3000
ACPI 2.0 present.
    OEM Identifier: LENOVO
    RSD Table 32-bit Address: 0x8FFC10C4
    XSD Table 64-bit Address: 0x000000008FFC1188
PNP BIOS 1.0 present.
    Event Notification: Not Supported
    Real Mode 16-bit Code Address: F000:0A8D
    Real Mode 16-bit Data Address: F000:0000
    16-bit Protected Mode Code Address: 0x000F0A68
    16-bit Protected Mode Data Address: 0x000F0000
BIOS32 Service Directory present.
    Revision: 0
    Calling Interface Address: 0x000FD000
PCI Interrupt Routing 1.0 present.
    Router Device: 00:1f.0
    Exclusive IRQs: None
    Compatible Router: 8086:9d58
    Device: 00:02, on-board
    Device: 00:14, on-board
    Device: 00:16, on-board
    Device: 00:1c, on-board
    Device: 04:00, slot 17
    Device: 00:1d, on-board
    Device: 00:1f, on-board
    Device: 3e:00, slot 62
```

## URL List

- [Google](https://www.google.com)
