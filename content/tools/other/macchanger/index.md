---
title : "MACchanger"
# pre : ' '
description : "Change MAC address of a NIC."
date : 2020-06-04T11:55:04+02:00
# hidden : true
# draft : true
weight : 1100
tags : ['Other', 'Unix', 'macOS']
---

---

Change MAC address of a NIC.

## Installation

```plain
sudo apt install macchanger
```

For macOS installation via brew.

```plain
brew install acrogenesis/macchanger/macchanger
```

## Usage

```plain
macchanger [options] device
```

## Flags Unix

```plain
GNU MAC Changer
  -h,  --help                   Print this help
  -V,  --version                Print version and exit
  -s,  --show                   Print the MAC address and exit
  -e,  --ending                 Don't change the vendor bytes
  -a,  --another                Set random vendor MAC of the same kind
  -A                            Set random vendor MAC of any kind
  -p,  --permanent              Reset to original, permanent hardware MAC
  -r,  --random                 Set fully random MAC
  -l,  --list[=keyword]         Print known vendors
  -b,  --bia                    Pretend to be a burned-in-address
  -m,  --mac=XX:XX:XX:XX:XX:XX
       --mac XX:XX:XX:XX:XX:XX  Set the MAC XX:XX:XX:XX:XX:XX

Report bugs to https://github.com/alobbs/macchanger/issues
```

## Flags macOS

```plain
    -m, --mac MAC                    Set the MAC address, macchanger -m XX:XX:XX:XX:XX:XX en0
    -r, --random                     Set random MAC address, macchanger -r en0
    -s, --show                       Show the MAC address, macchanger -s en0
```

## Examples

Remember to save your MAC-adres.

```plain
$ sudo macchanger -m <new-MAC> <interface>

Current MAC:   ab:cd:ef:gh:ij (unknown)
Permanent MAC: ab:cd:ef:gh:ij (unknown)
New MAC:       12:34:56:78:90 (unknown)
```

## URL List

- [Manpages.ubuntu.com - macchanger](https://manpages.ubuntu.com/manpages/xenial/man1/macchanger.1.html)
- [Github.com - macchanger (macOS)](https://github.com/acrogenesis/macchanger)
