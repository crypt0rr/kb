---
title : "iwconfig"
# pre : '<i class="fas fa-code"></i> '
description : "Configure a wireless network interface."
date : 2021-04-14T09:10:29+02:00
# hidden : true
# draft : true
weight : 430
# tags : ['']
---

---

## Usage

```plain
iwconfig [interface] [options]
```

## Flags

```plain
iwconfig [interface]
    interface essid {NNN|any|on|off}
    interface mode {managed|ad-hoc|master|...}
    interface freq N.NNN[k|M|G]
    interface channel N
    interface bit {N[k|M|G]|auto|fixed}
    interface rate {N[k|M|G]|auto|fixed}
    interface enc {NNNN-NNNN|off}
    interface key {NNNN-NNNN|off}
    interface power {period N|timeout N|saving N|off}
    interface nickname NNN
    interface nwid {NN|on|off}
    interface ap {N|off|auto}
    interface txpower {NmW|NdBm|off|auto}
    interface sens N
    interface retry {limit N|lifetime N}
    interface rts {N|auto|fixed|off}
    interface frag {N|auto|fixed|off}
    interface modulation {11g|11a|CCK|OFDMg|...}
    interface commit 
Check man pages for more details.
```

## Examples

### Connect to specific (hidden) SSID

```plain
sudo iwconfig [INTERFACE] essid [(HIDDEN)SSID]
```

## URL List

- [Linux.die.net - iwconfig](https://linux.die.net/man/8/iwconfig)
- [Computerhope.com - iwconfig](https://www.computerhope.com/unix/iwconfig.htm)
- [Geeksforgeeks.org - iwconfig command in Linux with examples](https://www.geeksforgeeks.org/iwconfig-command-in-linux-with-examples/)
