---
title : "PRET"
# pre : ' '
description : "Printer Exploitation Toolkit."
date : 2020-03-13T16:49:24+01:00
# hidden : true
# draft : true
weight : 1380
# tags : ['']
---

---

Printer Exploitation Toolkit (PRET).

## Installation

```plain
git clone https://github.com/RUB-NDS/PRET.git
```

## Usage

```plain
python pret.py [-h] [-s] [-q] [-d] [-i file] [-o file] target {ps,pjl,pcl}
```

## Flags

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

### Example

### Discovering local printers

```plain
./pret.py
No target given, discovering local printers

address          device                       uptime    status                 
───────────────────────────────────────────────────────────────────────────────
192.168.1.5      hp LaserJet 4250             10:21:49   Ready                 
192.168.1.11     HP LaserJet M3027 MFP        13 days    Paper jam             
192.168.1.27     Lexmark X792                 153 days   Ready                 
192.168.1.28     Brother MFC-7860DW           16:31:17   Sleep mode            
```

### Connecting and running commands

```plain
$ ./pret.py laserjet.lan pjl
      ________________
    _/_______________/|
   /___________/___//||   PRET | Printer Exploitation Toolkit v0.25
  |===        |----| ||    by Jens Mueller <jens.a.mueller@rub.de>
  |           |   ô| ||
  |___________|   ô| ||
  | ||/.´---.||    | ||        「 cause your device can be
  |-||/_____\||-.  | |´           more fun than paper jams 」
  |_||=L==H==||_|__|/

     (ASCII art by
     Jan Foerster)

Connection to laserjet.lan established
Device:   hp LaserJet 4250

Welcome to the pret shell. Type help or ? to list commands.
laserjet.lan:/> help

Available commands (type help <topic>):
=======================================
append  debug    edit    free  id    ls       open      restart   timeout  
cat     delete   env     fuzz  info  mirror   printenv  selftest  touch    
cd      df       exit    get   load  mkdir    put       set       traversal
chvol   disable  find    help  lock  nvram    pwd       site      unlock   
close   display  format  hold  loop  offline  reset     status    version  

laserjet.lan:/> ls ../../
-      834   .profile
d        -   bin
d        -   dev
d        -   etc
d        -   hp
d        -   hpmnt
-     1276   init
d        -   lib
d        -   pipe
d        -   tmp
laserjet.lan:/> exit
```

## URL List

- [GitHub.com - PRET](https://github.com/RUB-NDS/PRET.git)
- [Hacking-Printers.net](http://hacking-printers.net/wiki/index.php/)
