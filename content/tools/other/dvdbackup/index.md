---
title : "DVDbackup"
# pre : ' '
description : "Tool to backup DVDs."
date : 2021-06-04T09:31:16+02:00
# hidden : true
# draft : true
weight : 540
# tags : ['']
---

---

Tool to backup DVDs.

## Installation

```plain
sudo apt install dvdbackup
```

## Usage

```plain
dvdbackup [OPTION]...
```

## Flags

```plain
  -h, --help         display this help and exit
  -V, --version      display version information and exit

  -I, --info         prints information about the DVD
  -M, --mirror       backup the whole DVD
  -F, --feature      backup the main feature of the DVD
  -T, --titleset=X   backup title set X
  -t, --title=X      backup title X
  -s, --start=X      backup from chapter X
  -e, --end=X        backup to chapter X

  -i, --input=DEVICE       where DEVICE is your DVD device
                           if not given /dev/dvd is used
  -o, --output=DIRECTORY   where directory is your backup target
                           if not given the current directory is used
  -v, --verbose            print more information about progress
  -n, --name=NAME          set the title (useful if autodetection fails)
  -a, --aspect=0           to get aspect ratio 4:3 instead of 16:9 if both are
                           present
  -r, --error={a,b,m}      select read error handling: a=abort, b=skip block,
                           m=skip multiple blocks (default)
  -p, --progress           print progress information while copying VOBs

  -a is option to the -F switch and has no effect on other options
  -s and -e should preferably be used together with -t

Report bugs on Launchpad: https://bugs.launchpad.net/dvdbackup
```

## Examples

### Backup full DVD

```plain
$ dvdbackup -i /dev/sr0 -o ~ -M
libdvdread: Encrypted DVD support unavailable.************************************************
**                                            **
**  No css library available. See             **
**  /usr/share/doc/libdvdread4/README.css     **
**  for more information.                     **
**                                            **
************************************************
```

## URL List

- [Manpages.ubuntu.com - dvdbackup](https://manpages.ubuntu.com/manpages/bionic/man1/dvdbackup.1.html)
- [Wiki.archlinux.org - dvdbackup](https://wiki.archlinux.org/title/Dvdbackup)
