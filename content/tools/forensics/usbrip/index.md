---
title : "Usbrip"
# pre : ' '
description : "A simple forensics tool with command line interface that lets you keep track of USB device artifacts (i.e., USB event history) on Linux machines."
date : 2021-02-08T09:44:17+01:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

A simple forensics tool with command line interface that lets you keep track of USB device artifacts (i.e., USB event history) on Linux machines

## Installation

```plain
python3 -m pip install usbrip
```

## Usage

```plain
usbrip [-h] {banner,events,storage,ids} ...
```

## Flags

```plain
positional arguments:
  {banner,events,storage,ids}
    banner              show tool banner
    events              work with USB events
    storage             work with USB event storage
    ids                 work with USB IDs

optional arguments:
  -h, --help            show this help message and exit
```

## Examples

```plain
$ usbrip events history   
                       
         _     {{4}}    {v2.2.2-1}
 _ _ ___| |_ ___[e]___ 
| | |_ -| . |  _[N] . |
|___|___|___|_| [5]  _|
               x[I]_|   https://github.com/snovvcrash/usbrip
                       

[*] Started at 2021-02-08 09:47:15
[09:47:15] [INFO] Trying to run journalctl...
[09:47:52] [INFO] Successfully runned journalctl
[09:47:53] [INFO] Reading journalctl output
100%|███████████████████████████| 3311437/3311437 [00:06<00:00, 529620.77line/s]
[?] How would you like your event history list to be generated?

    1. Terminal stdout
    2. JSON-file

[>] Please enter the number of your choice (default 1): 1
[09:48:06] [INFO] Preparing collected events
[09:48:07] [WARNING] Terminal window is too small to display table properly
[09:48:07] [WARNING] Representation: list

USB-History-Events
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
Connected:      2020-07-14 08:40:28
Host:           ocd
VID:            1d6b
PID:            0002
Product:        xHCI Host Controller
Manufacturer:   Linux 5.4.0-7634-generic xhci-hcd
Serial Number:  0000:00:14.0
Bus-Port:       usb1
Disconnected:   ∅
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
Connected:      2020-07-14 08:40:28
Host:           ocd
VID:            1d6b
PID:            0003
Product:        xHCI Host Controller
Manufacturer:   Linux 5.4.0-7634-generic xhci-hcd
Serial Number:  0000:00:14.0
Bus-Port:       usb2
Disconnected:   ∅
[...]
```

## URL List

- [Github.com - usbrip](https://github.com/snovvcrash/usbrip)
