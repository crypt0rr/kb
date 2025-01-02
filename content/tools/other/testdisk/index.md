---
title : "Testdisk"
# pre : ' '
description : "Checks the partition and boot sectors of your disks. It is very useful in recovering lost partitions."
date : 2020-03-11T16:38:12+01:00
# hidden : true
# draft : true
weight : 1830
tags : ['Other', 'Forensics', 'Harddisk', 'Recovery']
---

---

Checks the partition and boot sectors of your disks. It is very useful in recovering lost partitions.

## Installation

```plain
sudo apt install testdisk
```

## Usage

```plain
sudo testdisk [OPTIONS] <device>
```

## Flags

```plain
TestDisk 7.1, Data Recovery Utility, July 2019
Christophe GRENIER <grenier@cgsecurity.org>
https://www.cgsecurity.org

Usage: testdisk [/log] [/debug] [file.dd|file.e01|device]
       testdisk /list  [/log]   [file.dd|file.e01|device]
       testdisk /version

/log          : create a testdisk.log file
/debug        : add debug information
/list         : display current partitions

TestDisk checks and recovers lost partitions
It works with :
- BeFS (BeOS)                           - BSD disklabel (Free/Open/Net BSD)
- CramFS, Compressed File System        - DOS/Windows FAT12, FAT16 and FAT32
- XBox FATX                             - Windows exFAT
- HFS, HFS+, Hierarchical File System   - JFS, IBM's Journaled File System
- Linux btrfs                           - Linux ext2, ext3 and ext4
- Linux GFS2                            - Linux LUKS
- Linux Raid                            - Linux Swap
- LVM, LVM2, Logical Volume Manager     - Netware NSS
- Windows NTFS                          - ReiserFS 3.5, 3.6 and 4
- Sun Solaris i386 disklabel            - UFS and UFS2 (Sun/BSD/...)
- XFS, SGI's Journaled File System      - Wii WBFS
- Sun ZFS
```

## Examples

```plain
$ sudo testdisk

TestDisk 7.1, Data Recovery Utility, July 2019
Christophe GRENIER <grenier@cgsecurity.org>
https://www.cgsecurity.org

  TestDisk is free software, and
comes with ABSOLUTELY NO WARRANTY.

Select a media (use Arrow keys, then press Enter):
>Disk /dev/mapper/cryptdata - 991 GB / 923 GiB
 Disk /dev/mapper/cryptswap - 4294 MB / 4095 MiB
 Disk /dev/mapper/data-root - 991 GB / 923 GiB
 Disk /dev/dm-0 - 991 GB / 923 GiB
 Disk /dev/dm-1 - 991 GB / 923 GiB
 Disk /dev/dm-2 - 4294 MB / 4095 MiB
 Disk /dev/loop0 - 8085 KB / 7896 KiB (RO)
 Disk /dev/loop1 - 170 MB / 162 MiB (RO)
 Disk /dev/loop10 - 150 MB / 143 MiB (RO)
 Disk /dev/loop11 - 96 MB / 91 MiB (RO)
 [Previous]  [  Next  ] >[Proceed ]  [  Quit  ]
```

## URL List

- [GitHub.com - Testdisk](https://github.com/cgsecurity/testdisk)
