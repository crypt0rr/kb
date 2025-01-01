---
title : "Dmidecode"
# pre : ' '
description : "Tool for dumping a computer's DMI (some say SMBIOS) table contents in a human-readable format."
date : 2020-04-28T20:11:22+02:00
# hidden : true
# draft : true
weight : 490
# tags : ['']
---

---

Tool for dumping a computer's DMI (some say SMBIOS) table contents in a human-readable format.

## Installation

```plain
sudo apt install dmidecode
```

## Usage

```plain
dmidecode [OPTIONS]
```

## Flags

```plain
Options are:
 -d, --dev-mem FILE     Read memory from device FILE (default: /dev/mem)
 -h, --help             Display this help text and exit
 -q, --quiet            Less verbose output
 -s, --string KEYWORD   Only display the value of the given DMI string
 -t, --type TYPE        Only display the entries of given type
 -H, --handle HANDLE    Only display the entry of given handle
 -u, --dump             Do not decode the entries
     --dump-bin FILE    Dump the DMI data to a binary file
     --from-dump FILE   Read the DMI data from a binary file
     --no-sysfs         Do not attempt to read DMI data from sysfs files
     --oem-string N     Only display the value of the given OEM string
 -V, --version          Display the version and exit
```

```plain
$ dmidecode -t

Valid type keywords are:
  bios
  system
  baseboard
  chassis
  processor
  memory
  cache
  connector
  slot
```

## Examples

### Display critical hardware information

```plain
$ sudo dmidecode -t system

# dmidecode 3.2
Getting SMBIOS data from sysfs.
SMBIOS 3.0.0 present.

Handle 0x000C, DMI type 1, 27 bytes
System Information
    Manufacturer: LENOVO
    Product Name: 20HD000EMH
    Version: ThinkPad T470
    Serial Number: SN12345
    UUID: 7bd0a14c-24f2-11aa-abcd-efghijklmn
    Wake-up Type: Power Switch
    SKU Number: LENOVO_MT_20HD_BU_Think_FM_ThinkPad T470
    Family: ThinkPad T470
```

### BIOS information

```plain
$ sudo dmidecode -t bios -q

BIOS Information
    Vendor: LENOVO
    Version: N1QET85W (1.60 )
    Release Date: 08/30/2019
    Address: 0xE0000
    Runtime Size: 128 kB
    ROM Size: 16 MB
    Characteristics:
[...]
    BIOS Revision: 1.60
    Firmware Revision: 1.34
```

### Find serial number

```plain
$ sudo dmidecode -t chassis -q

Chassis Information
    Manufacturer: LENOVO
    Type: Notebook
    Lock: Not Present
    Version: None
    Serial Number: SN12345
```

### Memory information

```plain
$ sudo dmidecode -t memory

# dmidecode 3.2
Getting SMBIOS data from sysfs.
SMBIOS 3.0.0 present.

Handle 0x0003, DMI type 16, 23 bytes
Physical Memory Array
    Location: System Board Or Motherboard
    Use: System Memory
    Error Correction Type: None
    Maximum Capacity: 32 GB
    Error Information Handle: Not Provided
    Number Of Devices: 2
```

## URL List

- [Linux.die.net - dmidecode](https://linux.die.net/man/8/dmidecode)
