---
title : "Sg3-Utils"
# pre : ' '
description : "Apple's SuperDrive on Linux."
date : 2021-05-28T20:08:07+02:00
# hidden : true
# draft : true
weight : 1560
# tags : ['']
---

---

Apple's SuperDrive on Linux.

## Installation

### Debian/linux only - Linux SCSI generic driver

```plain
sudo apt install sg3-utils -y
```

### RHEL/Fedora only - Linux SCSI generic driver

```plain
sudo dnf install sg3_utils -y
```

## Usage

### Tell the external DVD player/burner to turn on

```plain
sudo sg_raw /dev/sr0 EA 00 00 00 00 00 01
```

## URL List

- [Jeltsch.org - SuperDrive](https://jeltsch.org/SuperDrive)
- [Gist.github.com - AnnoyingTechnology - Apple's SuperDrive tweak for use with Linux](https://gist.github.com/AnnoyingTechnology/dbaae864822cf08372f0aafe64a63477)
