---
title : "ExifTool"
# pre : ' '
description : "Read and write meta information in files."
date : 2020-03-10T15:34:33+01:00
# hidden : true
# draft : true
weight : 0
# tags : [""]
---

## ExifTool

Read and write meta information in files.

### Installation

#### APT Repo

```plain
sudo apt install exiftool
```

#### GitHub Repo

```plain
git clone https://github.com/exiftool/exiftool.git
```

### Usage

```plain
./exiftool
```

### Flags

See documentation <https://github.com/exiftool/exiftool>

### Examples

Remove all EXIF-data from image

```plain
exiftool -all= <file>
```

Remove all EXIF-data from all images in folder

```plain
exiftool -all= *
```

### URL list

* [ExifTool.org](https://exiftool.org/)
* [ExifTool.org Flag creator](https://exiftool.org/examples.html)
* [GitHub.com - exiftool](https://github.com/exiftool/exiftool)
