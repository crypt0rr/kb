---
title : "zbar-tools"
# pre : ' '
description : "Scan and decode bar codes (QR) from one or more image files."
date : 2021-06-20T13:57:32+02:00
# hidden : true
# draft : true
weight : 140
# tags : ['']
---

---

Scan and decode bar codes (QR) from one or more image files.

## Installation

```plain
sudo apt-get install zbar-tools
```

## Usage

```plain
zbarimg [options] <image>...
```

## Flags

```plain
scan and decode bar codes from one or more image files

options:
    -h, --help      display this help text
    --version       display version information and exit
    -q, --quiet     minimal output, only print decoded symbol data
    -v, --verbose   increase debug output level
    --verbose=N     set specific debug output level
    -d, --display   enable display of following images to the screen
    -D, --nodisplay disable display of following images (default)
    --xml, --noxml  enable/disable XML output format
    --raw           output decoded symbol data without converting charsets
    -1, --oneshot   exit after scanning one bar code
    -S<CONFIG>[=<VALUE>], --set <CONFIG>[=<VALUE>]
                    set decoder/scanner <CONFIG> to <VALUE> (or 1)

    --nodbus        disable dbus message
```

## Examples

### Read QR code from file

```plain
$ zbarimg QRCTF.png 
QR-Code:https://soundcloud.com/user-86667759/thm-ctf-vol1
```

## URL List

- [Linux.die.net - zbarimg](https://linux.die.net/man/1/zbarimg)
