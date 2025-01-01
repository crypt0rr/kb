---
title : "ExifTool"
# pre : ' '
description : "Read and write meta information in files."
date : 2020-03-10T15:34:33+01:00
# hidden : true
# draft : true
weight : 590
# tags : [""]
---

---

Read and write meta information in files.

## Installation

### Linux

```plain
sudo apt install exiftool
```

### Brew

```plain
brew install exiftool
```

## Usage

```plain
exiftool [FLAGS]
```

## Flags

See documentation <https://github.com/exiftool/exiftool>

## Examples

### Remove all exif data from image

```plain
exiftool -all= <file>
```

### Remove all EXIF-data from all images in folder

```plain
exiftool -all= *
```

### Show only timestamp

```plain
exiftool -DateTimeOriginal <file>
```

## URL List

- [ExifTool.org](https://exiftool.org/)
- [ExifTool.org Flag creator](https://exiftool.org/examples.html)
- [GitHub.com - exiftool](https://github.com/exiftool/exiftool)
