---
title : "lsblk"
# pre : '<i class="fas fa-code"></i> '
description : "List information about block devices."
date : 2021-03-17T11:23:47+01:00
# hidden : true
# draft : true
weight : 500
# tags : ['']
---

---

List information about block devices.

## Usage

```plain
lsblk [options] [<device> ...]
```

## Flags

```plain
Options:
 -D, --discard        print discard capabilities
 -E, --dedup <column> de-duplicate output by <column>
 -I, --include <list> show only devices with specified major numbers
 -J, --json           use JSON output format
 -O, --output-all     output all columns
 -P, --pairs          use key="value" output format
 -S, --scsi           output info about SCSI devices
 -T, --tree[=<column>] use tree format output
 -a, --all            print all devices
 -b, --bytes          print SIZE in bytes rather than in human readable format
 -d, --nodeps         don't print slaves or holders
 -e, --exclude <list> exclude devices by major number (default: RAM disks)
 -f, --fs             output info about filesystems
 -i, --ascii          use ascii characters only
 -l, --list           use list format output
 -M, --merge          group parents of sub-trees (usable for RAIDs, Multi-path)
 -m, --perms          output info about permissions
 -n, --noheadings     don't print headings
 -o, --output <list>  output columns
 -p, --paths          print complete device path
 -r, --raw            use raw output format
 -s, --inverse        inverse dependencies
 -t, --topology       output info about topology
 -z, --zoned          print zone model
 -x, --sort <column>  sort output by <column>
     --sysroot <dir>  use specified directory as system root

 -h, --help           display this help
 -V, --version        display version

Available output columns:
        NAME  device name
       KNAME  internal kernel device name
        PATH  path to the device node
     MAJ:MIN  major:minor device number
     FSAVAIL  filesystem size available
      FSSIZE  filesystem size
      FSTYPE  filesystem type
      FSUSED  filesystem size used
      FSUSE%  filesystem use percentage
  MOUNTPOINT  where the device is mounted
       LABEL  filesystem LABEL
        UUID  filesystem UUID
      PTUUID  partition table identifier (usually UUID)
      PTTYPE  partition table type
    PARTTYPE  partition type UUID
   PARTLABEL  partition LABEL
    PARTUUID  partition UUID
   PARTFLAGS  partition flags
          RA  read-ahead of the device
          RO  read-only device
          RM  removable device
     HOTPLUG  removable or hotplug device (usb, pcmcia, ...)
       MODEL  device identifier
      SERIAL  disk serial number
        SIZE  size of the device
       STATE  state of the device
       OWNER  user name
       GROUP  group name
        MODE  device node permissions
   ALIGNMENT  alignment offset
      MIN-IO  minimum I/O size
      OPT-IO  optimal I/O size
     PHY-SEC  physical sector size
     LOG-SEC  logical sector size
        ROTA  rotational device
       SCHED  I/O scheduler name
     RQ-SIZE  request queue size
        TYPE  device type
    DISC-ALN  discard alignment offset
   DISC-GRAN  discard granularity
    DISC-MAX  discard max bytes
   DISC-ZERO  discard zeroes data
       WSAME  write same max bytes
         WWN  unique storage identifier
        RAND  adds randomness
      PKNAME  internal parent kernel device name
        HCTL  Host:Channel:Target:Lun for SCSI
        TRAN  device transport type
  SUBSYSTEMS  de-duplicated chain of subsystems
         REV  device revision
      VENDOR  device vendor
       ZONED  zone model

For more details see lsblk(8).
```

## Examples

```plain
$ lsblk   
NAME            MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
loop0             7:0    0  14.6M  1 loop  /snap/amass/861
loop3             7:3    0   153M  1 loop  /snap/code/58
loop7             7:7    0    34M  1 loop  /snap/hugo/9775
loop8             7:8    0 238.7M  1 loop  /snap/gimp/347
loop9             7:9    0 156.7M  1 loop  /snap/code/59
loop10            7:10   0 161.4M  1 loop  /snap/gnome-3-28-1804/128
nvme0n1         259:0    0 238.5G  0 disk  
├─nvme0n1p1     259:1    0    16M  0 part  
├─nvme0n1p2     259:2    0   238G  0 part  
└─nvme0n1p3     259:3    0   505M  0 part  
nvme1n1         259:4    0 931.5G  0 disk  
├─nvme1n1p1     259:5    0   498M  0 part  /boot/efi
├─nvme1n1p2     259:6    0     4G  0 part  /recovery
├─nvme1n1p3     259:7    0   923G  0 part  
│ └─cryptdata   253:0    0   923G  0 crypt 
│   └─data-root 253:1    0   923G  0 lvm   /
└─nvme1n1p4     259:8    0     4G  0 part  
  └─cryptswap   253:2    0     4G  0 crypt [SWAP]
```

## URL List

- [Man7.org - lsblk](https://man7.org/linux/man-pages/man8/lsblk.8.html)
- [Linux.die.net - lsblk](https://linux.die.net/man/8/lsblk)
