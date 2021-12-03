---
title : "PRET"
# pre : ' '
description : "Printer Exploitation Toolkit."
date : 2020-03-13T16:49:24+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Printer Exploitation Toolkit (PRET)

### Installation

```plain
git clone https://github.com/RUB-NDS/PRET.git
```

### Usage

```plain
python pret.py [-h] [-s] [-q] [-d] [-i file] [-o file] target {ps,pjl,pcl}
```

### Flags

```plain
usage: pret.py [-h] [-s] [-q] [-d] [-i file] [-o file] target {ps,pjl,pcl}

Printer Exploitation Toolkit.

positional arguments:
  target                printer device or hostname
  {ps,pjl,pcl}          printing language to abuse

optional arguments:
  -h, --help            show this help message and exit
  -s, --safe            verify if language is supported
  -q, --quiet           suppress warnings and chit-chat
  -d, --debug           enter debug mode (show traffic)
  -i file, --load file  load and run commands from file
  -o file, --log file   log raw data sent to the target
```

### URL list

* [GitHub.com - PRET](https://github.com/RUB-NDS/PRET.git)
* [Hacking-Printers.net](http://hacking-printers.net/wiki/index.php/)
