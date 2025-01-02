---
title : "genisoimage"
# pre : ' '
description : "Create ISO9660/Joliet/HFS filesystem with optional Rock Ridge attributes."
date : 2020-03-13T22:01:35+01:00
# hidden : true
# draft : true
weight : 710
# tags : ['']
---

---

Create ISO9660/Joliet/HFS filesystem with optional Rock Ridge attributes.

## Installation

```plain
sudo apt install genisoimage
```

## Usage

```plain
genisoimage [options] [-o filename] pathspec [pathspec ...]
```

## Examples

### Lenovo BIOS update

Download newest BIOS from <https://support.lenovo.com/nl/en/>

```plain
geteltorito -o bios.img <bootable-iso>
```

```plain
sudo dd if=bios.img of=/dev/<usb> bs=1M
```

Boot from USB

## URL List

- [Linux.die.net - genisoimage](https://linux.die.net/man/1/genisoimage)
