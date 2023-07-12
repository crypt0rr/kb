---
title : "ncdu"
# pre : '<i class="fas fa-code"></i> '
description : "Provides a fast and easy-to-use interface through famous du utility."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Unix', 'Harddisk']
---

## Ncdu

## Installation

```plain
sudo apt install ncdu
```

## Usage

```plain
ncdu <options> <directory>
```

## Flags

```plain
ncdu <options> <directory>

  -h,--help                  This help message
  -q                         Quiet mode, refresh interval 2 seconds
  -v,-V,--version            Print version
  -x                         Same filesystem
  -e                         Enable extended information
  -r                         Read only
  -o FILE                    Export scanned directory to FILE
  -f FILE                    Import scanned directory from FILE
  -0,-1,-2                   UI to use when scanning (0=none,2=full ncurses)
  --si                       Use base 10 (SI) prefixes instead of base 2
  --exclude PATTERN          Exclude files that match PATTERN
  -X, --exclude-from FILE    Exclude files that match any pattern in FILE
  -L, --follow-symlinks      Follow symbolic links (excluding directories)
  --exclude-caches           Exclude directories containing CACHEDIR.TAG
  --confirm-quit             Confirm quitting ncdu
  --color SCHEME             Set color scheme
```

## Examples

```plain
ncdu /home/b/Desktop/temp
```

![Example](images/example.png)

## URL List

- [Linux.die.net](https://linux.die.net/man/1/ncdu)
- [Dev.yorhel.nl](https://dev.yorhel.nl/ncdu)
