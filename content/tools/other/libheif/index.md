---
title : "Libheif"
# pre : ' '
description : "Convert HEIC/HEIF image."
date : 2020-03-31T10:02:38+02:00
# hidden : true
# draft : true
weight : 1080
# tags : ['']
---

---

Convert HEIC/HEIF image.

## Installation

```plain
sudo apt install libheif-examples
```

## Usage

```plain
heif-convert [-q QUALITY] filename output[.jpg|.png|.y4m]
```

## Examples

### HEIC to JPG

```plain
heif-convert infile.HEIC outfile.jpg
```

```plain
for i in {137..152}; do heif-convert IMG_0$i.HEIC IMG_0$i.jpg; done
```

## URL List

- [Manpages.debian.org - HEIF convert](https://manpages.debian.org/testing/libheif-examples/heif-convert.1.en.html)
