---
title : "fls"
# pre : '<i class="fas fa-code"></i> '
description : "List file and directory names in a disk image."
date : 2021-05-13T15:55:33+02:00
# hidden : true
# draft : true
weight : 280
# tags : ['']
---

---

List file and directory names in a disk image.

## Usage

```plain
usage: fls [-adDFlhpruvV] [-f fstype] [-i imgtype] [-b dev_sector_size] [-m dir/] [-o imgoffset] [-z ZONE] [-s seconds] image [images] [inode]
        If [inode] is not given, the root directory is used
```

## Flags

```plain
    -a: Display "." and ".." entries
    -d: Display deleted entries only
    -D: Display only directories
    -F: Display only files
    -l: Display long version (like ls -l)
    -i imgtype: Format of image file (use '-i list' for supported types)
    -b dev_sector_size: The size (in bytes) of the device sectors
    -f fstype: File system type (use '-f list' for supported types)
    -m: Display output in mactime input format with
          dir/ as the actual mount point of the image
    -h: Include MD5 checksum hash in mactime output
    -o imgoffset: Offset into image file (in sectors)
    -p: Display full path for each file
    -r: Recurse on directory entries
    -u: Display undeleted entries only
    -v: verbose output to stderr
    -V: Print version
    -z: Time zone of original machine (i.e. EST5EDT or GMT) (only useful with -l)
    -s seconds: Time skew of original machine (in seconds) (only useful with -l & -m)
```

## URL List

- [Sleuthkit.org - fls](https://www.sleuthkit.org/sleuthkit/man/fls.html)
- [Manpages.ubuntu.com - fls](https://manpages.ubuntu.com/manpages/bionic/man1/fls.1.html)
