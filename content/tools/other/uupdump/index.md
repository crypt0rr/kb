---
title : "UUP dump"
# pre : ' '
description : "Download UUP files from Windows Update servers with ease."
date : 2021-07-02T09:51:36+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## UUP dump

Download UUP files from Windows Update servers with ease - Create Windows ISO as you like.

[UUPdump.net](https://uupdump.net/)

## Installation

### Linux (Debian)

Please install [Aria2]({{< ref "aria2" >}}).

```plain
sudo apt-get install cabextract wimtools chntpw genisoimage
```

### Apple Silicon

```plain
brew tap minacle/chntpw
brew install aria2 cabextract wimlib cdrtools minacle/chntpw/chntpw
```

## Usage

Select the right package you want to download on [UUPdump.net](https://uupdump.net/known.php)

![Example](images/example.png)
![Example](images/example2.png)
![Example](images/example3.png)
![Example](images/example4.png)
![Example](images/example5.png)

## Examples

### Linux

Extract the package just downloaded with the options you want.

```plain
$ bash uup_download_linux.sh 
Retrieving aria2 script...

07/02 10:01:57 [NOTICE] Downloading 1 item(s)
[...]
Status Legend:
(OK):download completed.

UUP Converter v0.6.4

[...]
 99.99% done, estimate finish Fri Jul  2 10:12:36 2021
Total translation table size: 2048
Total rockridge attributes bytes: 0
Total directory bytes: 68
Path table size(bytes): 10
Max brk space used d5000
2090173 extents written (4082 MB)
Done.
```

### macOS

Extract the package just downloaded with the options you want.

```plain
$ bash uup_download_macos.sh                                         
Retrieving aria2 script...

08/05 10:40:57 [NOTICE] Downloading 1 item(s)
(OK):download completed.

Attempting to download files...
Creating ISO structure...
Exporting winre.wim...
Creating boot.wim...
Exporting Windows 11 Professional to install.wim...
Adding winre.wim for Windows 11 Professional...
Creating ISO image...
Total translation table size: 2048
Total rockridge attributes bytes: 0
Total directory bytes: 0
Path table size(bytes): 10
Max brk space used 0
2165663 extents written (4229 MB)
Done.
```

## URL List

- [UUPdump.net](https://uupdump.net/)
- [Github.com - UUP dump](https://github.com/uup-dump)
- [Win10.guru - UUP Dump - Get Insider Fast Ring ISO](https://win10.guru/uup-dump-get-insider-fast-ring-iso/)
