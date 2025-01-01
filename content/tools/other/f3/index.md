---
title : "F3"
# pre : ' '
description : "Fight Flash Fraud - testing performance of flash / disks."
date : 2020-03-10T15:34:43+01:00
# hidden : true
# draft : true
weight : 610
#tags : ['']
---

---

Fight Flash Fraud - testing performance of flash / disks.

## Installation

Download newest release from [Github.com](https://github.com/AltraMayor/f3/releases)

```plain
unzip f3-x.x.zip
make
make install
```

## Usage

```plain
f3write [OPTION...] <PATH>
```

```plain
f3read [OPTION...] <PATH>
```

## Flags

```plain
Usage: f3write [OPTION...] <PATH>
F3 Write -- fill a drive out with .h2w files to test its real capacity

  -e, --end-at=NUM           Last NUM.h2w file to be written
  -p, --show-progress=NUM    Show progress if NUM is not zero
  -s, --start-at=NUM         First NUM.h2w file to be written
  -w, --max-write-rate=KB/s  Maximum write rate
  -?, --help                 Give this help list
      --usage                Give a short usage message
  -V, --version              Print program version

Mandatory or optional arguments to long options are also mandatory or optional
for any corresponding short options.
```

```plain
Usage: f3read [OPTION...] <PATH>
F3 Read -- validate .h2w files to test the real capacity of the drive

  -e, --end-at=NUM           Last NUM.h2w file to be read
  -p, --show-progress=NUM    Show progress if NUM is not zero
  -s, --start-at=NUM         First NUM.h2w file to be read
  -?, --help                 Give this help list
      --usage                Give a short usage message
  -V, --version              Print program version

Mandatory or optional arguments to long options are also mandatory or optional
for any corresponding short options.
```

## Examples

### F3 Write

```plain
f3write /media/b/1GB-USB

F3 write 7.2
Copyright (C) 2010 Digirati Internet LTDA.
This is free software; see the source for copying conditions.

Free space: 948.76 MB
Creating file 1.h2w ... OK!
Free space: 0.00 Byte
Average writing speed: 15.97 MB/s
```

### F3 Read

```plain
f3read /media/b/1GB-USB

F3 read 7.2
Copyright (C) 2010 Digirati Internet LTDA.
This is free software; see the source for copying conditions.

                  SECTORS      ok/corrupted/changed/overwritten
Validating file 1.h2w ... 1942960/        0/      0/      0

  Data OK: 948.71 MB (1942960 sectors)
Data LOST: 0.00 Byte (0 sectors)
         Corrupted: 0.00 Byte (0 sectors)
  Slightly changed: 0.00 Byte (0 sectors)
       Overwritten: 0.00 Byte (0 sectors)
Average reading speed: 835.91 MB/s
```

### F3 custom write amount

```plain
$ f3write -e 3 /media/b/DISK

F3 write 7.2
Copyright (C) 2010 Digirati Internet LTDA.
This is free software; see the source for copying conditions.

Removing old file 1.h2w ...
Removing old file 2.h2w ...
Removing old file 3.h2w ...
Free space: 433.51 GB
Creating file 1.h2w ... OK!
Creating file 2.h2w ... OK!
Creating file 3.h2w ... OK!
Free space: 430.51 GB
Average writing speed: 60.21 MB/s
```

### F3 custom read amount

```plain
$ f3read -e 3 /media/b/DISK

F3 read 7.2
Copyright (C) 2010 Digirati Internet LTDA.
This is free software; see the source for copying conditions.

                  SECTORS      ok/corrupted/changed/overwritten
Validating file 1.h2w ... 2097152/        0/      0/      0
Validating file 2.h2w ... 2097152/        0/      0/      0
Validating file 3.h2w ... 2097152/        0/      0/      0

  Data OK: 3.00 GB (6291456 sectors)
Data LOST: 0.00 Byte (0 sectors)
         Corrupted: 0.00 Byte (0 sectors)
  Slightly changed: 0.00 Byte (0 sectors)
       Overwritten: 0.00 Byte (0 sectors)
Average reading speed: 1.09 GB/s
```

## URL List

- [GitHub.com - f3](https://github.com/AltraMayor/f3)
- [Readthedocs.io](https://fight-flash-fraud.readthedocs.io/)
