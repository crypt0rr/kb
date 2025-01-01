---
title : "SilentListener"
# pre : ' '
description : "SilentListener listens on the network interface of choice to identify network segments that cross the interface."
date : 2024-10-23T14:59:04+02:00
# hidden : true
# draft : true
weight : 350
# tags : ['']
---

---

SilentListener listens on the network interface of choice to identify network segments that cross the interface.

## Installation

```plain
wget https://gist.githubusercontent.com/Dfte/9cfeb87892557fd098de78f68b1b1390/raw/a9a3d9cb5867ad95e565116c83817e10c75574a6/SilentListener.py
python3 -m pip install argparse ipaddress scapy
```

{{%resources fa_icon_class="far fa-file-code" pattern=".*(py)"/%}}

## Usage

```plain
python3 SilentListener.py [-h] -i INTERFACE -o OUTPUT [--scan] [--rate RATE]
```

## Flags

```plain
  -h, --help    show this help message and exit
  -i INTERFACE  Interface on which to listen and run scan
  -o OUTPUT     File in which to write found ranges
  --scan        Launch internal ranges masscan
  --rate RATE   Scan rate (the more the faster)
```

## Examples

```plain
$ sudo python3 SilentListener.py -i en0 -o silentlistener-out.log
Already found ranges:
Listening for incoming packets on en0... Press Ctrl+C to stop
10.10.10.0/24
10.10.20.0/24
10.10.30.0/24
10.20.30.0/24
```

## URL list

- [Gist.github.com - SilentListener.py](https://gist.github.com/Dfte/9cfeb87892557fd098de78f68b1b1390)
