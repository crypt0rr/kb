---
title : "dfir_ntfs"
# pre : ' '
description : "An NTFS/FAT parser for digital forensics & incident response."
date : 2022-01-04T10:07:48+01:00
# hidden : true
draft : true
weight : 0
# tags : ['']
---

## dfir_ntfs

* Parse $MFT, $UsnJrnl:$J, $LogFile files, extract as much data as possible.
* Parse volumes, volume images, and volume shadow copies.
* Parse FAT12/16/32 volumes.

### Timestamps

All timestamps reported by the tools are in UTC.
(For FAT file systems, all timestamps are local or UTC, returned as is.)

The MACE notation is used:

* modified (M),
* last accessed (A),
* created (C),
* $MFT entry modified (E).

In the WSL set of timestamps (and FAT):

* inode changed (CH).

### Installation

Please change installation URL according to release number.

```plain
pip3 install https://github.com/msuhanov/dfir_ntfs/archive/1.1.2.tar.gz
```

### Usage

```plain

```

### Flags

```plain

```

### Examples

```plain

```

### URL list

* [Github.com - dfir_ntfs](https://github.com/msuhanov/dfir_ntfs)
