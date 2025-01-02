---
title : "blkid"
# pre : ' '
description : "Locate/print block device attributes."
date : 2020-08-22T14:16:11+02:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

Locate/print block device attributes.

## Usage

```plain
 blkid --label <label> | --uuid <uuid>

 blkid [--cache-file <file>] [-ghlLv] [--output <format>] [--match-tag <tag>]
       [--match-token <token>] [<dev> ...]

 blkid -p [--match-tag <tag>] [--offset <offset>] [--size <size>]
       [--output <format>] <dev> ...

 blkid -i [--match-tag <tag>] [--output <format>] <dev> ...
```

## Flags

```plain
Options:
 -c, --cache-file <file>    read from <file> instead of reading from the default
                              cache file (-c /dev/null means no cache)
 -d, --no-encoding          don't encode non-printing characters
 -g, --garbage-collect      garbage collect the blkid cache
 -o, --output <format>      output format; can be one of:
                              value, device, export or full; (default: full)
 -k, --list-filesystems     list all known filesystems/RAIDs and exit
 -s, --match-tag <tag>      show specified tag(s) (default show all tags)
 -t, --match-token <token>  find device with a specific token (NAME=value pair)
 -l, --list-one             look up only first device with token specified by -t
 -L, --label <label>        convert LABEL to device name
 -U, --uuid <uuid>          convert UUID to device name
 <dev>                      specify device(s) to probe (default: all devices)

Low-level probing options:
 -p, --probe                low-level superblocks probing (bypass cache)
 -i, --info                 gather information about I/O limits
 -S, --size <size>          overwrite device size
 -O, --offset <offset>      probe at the given offset
 -u, --usages <list>        filter by "usage" (e.g. -u filesystem,raid)
 -n, --match-types <list>   filter by filesystem type (e.g. -n vfat,ext3)
 -D, --no-part-details      don't print info from partition table

 -h, --help                 display this help
 -V, --version              display version

For more details see blkid(8).
```

## Examples

```plain
$ blkid
/dev/mapper/cryptdata: UUID="0yGlEK-24oT-8mMG-w5uS-bRKv-abcd-YHJB74" TYPE="LVM2_member"
/dev/mapper/data-root: UUID="5d9b752f-4284-420f-98f4-abcd0478be72" TYPE="ext4"
/dev/nvme0n1p3: UUID="d11302226-ae33-4410-a7f6-b22ed06bb069" TYPE="crypto_LUKS" PARTUUID="0ac9dbad-1010-4b3a-8041-616385f21854"
/dev/nvme0n1p4: UUID="afbdeaea-1111-444c-5aa9-abcdbe067ad0" TYPE="swap" PARTUUID="34330769-ed04-4c3a-acd0-66b4c9070ef6"
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/blkid)
- [Systutorials.com](https://www.systutorials.com/docs/linux/man/8-blkid/)
