---
title : "Aircrack-ng"
# pre : ' '
description: "Is an 802.11 WEP, 802.11i WPA/WPA2, and 802.11w WPA2 key cracking program."
date : 2020-03-11T11:14:16+01:00
# hidden : true
# draft : true
weight : 10
tags : ['Networking', 'WiFi']
---

---

Is an 802.11 WEP, 802.11i WPA/WPA2, and 802.11w WPA2 key cracking program.

## Installation

Debian requirements

```plain
sudo apt install build-essential autoconf automake libtool pkg-config libnl-3-dev libnl-genl-3-dev libssl-dev ethtool shtool rfkill zlib1g-dev libpcap-dev libsqlite3-dev libpcre3-dev libhwloc-dev libcmocka-dev hostapd wpasupplicant tcpdump screen iw usbutils
```

```plain
sudo apt install aircrack-ng
```

## Usage

```plain
aircrack-ng [options] <input file(s)>
```

## Flags

```plain
Aircrack-ng 1.5.2  - (C) 2006-2018 Thomas d'Otreppe
https://www.aircrack-ng.org

usage: aircrack-ng [options] <input file(s)>

Common options:

    -a <amode> : force attack mode (1/WEP, 2/WPA-PSK)
    -e <essid> : target selection: network identifier
    -b <bssid> : target selection: access point's MAC
    -p <nbcpu> : # of CPU to use  (default: all CPUs)
    -q         : enable quiet mode (no status output)
    -C <macs>  : merge the given APs to a virtual one
    -l <file>  : write key to file. Overwrites file.

Static WEP cracking options:

    -c         : search alpha-numeric characters only
    -t         : search binary coded decimal chr only
    -h         : search the numeric key for Fritz!BOX
    -d <mask>  : use masking of the key (A1:XX:CF:YY)
    -m <maddr> : MAC address to filter usable packets
    -n <nbits> : WEP key length :  64/128/152/256/512
    -i <index> : WEP key index (1 to 4), default: any
    -f <fudge> : bruteforce fudge factor,  default: 2
    -k <korek> : disable one attack method  (1 to 17)
    -x or -x0  : disable bruteforce for last keybytes
    -x1        : last keybyte bruteforcing  (default)
    -x2        : enable last  2 keybytes bruteforcing
    -X         : disable  bruteforce   multithreading
    -y         : experimental  single bruteforce mode
    -K         : use only old KoreK attacks (pre-PTW)
    -s         : show the key in ASCII while cracking
    -M <num>   : specify maximum number of IVs to use
    -D         : WEP decloak, skips broken keystreams
    -P <num>   : PTW debug:  1: disable Klein, 2: PTW
    -1         : run only 1 try to crack key with PTW
    -V         : run in visual inspection mode

WEP and WPA-PSK cracking options:

    -w <words> : path to wordlist(s) filename(s)
    -N <file>  : path to new session filename
    -R <file>  : path to existing session filename

WPA-PSK options:

    -E <file>  : create EWSA Project file v3
    -j <file>  : create Hashcat v3.6+ file (HCCAPX)
    -J <file>  : create Hashcat file (HCCAP)
    -S         : WPA cracking speed test
    -Z <sec>   : WPA cracking speed test length of
                 execution.
    -r <DB>    : path to airolib-ng database
                 (Cannot be used with -w)

SIMD selection:

    --simd-list       : Show a list of the available
                        SIMD architectures, for this
                        machine.
    --simd=<option>   : Use specific SIMD architecture.

    <option> may be one of the following, depending on
    your platform:

                 generic
                 avx512
                 avx2
                 avx
                 sse2
                 altivec
                 power8
                 asimd
                 neon

Other options:

    -u         : Displays # of CPUs & SIMD support
    --help     : Displays this usage screen
```

## Examples

Show compatible devices

```plain
sudo airmon-ng
```

Start airmon on desired device

```plain
sudo airmon-ng start <device>
```

Stop airmon on the used device

```plain
sudo airmon-ng stop <device>
```

Monitor networks

```plain
sudo airodump-ng <device>
```

Capture handshakes passively (can take some time)

```plain
sudo airodump-ng -c <channel> --bssid <BSSID> -w <output-file> <monitor-device>
```

Crack handshake

```plain
sudo aircrack-ng <input-file>.cap -w <wordlist>
```

## URL List

- [Aircrack-ng.org](https://www.aircrack-ng.org/)
- [Github.com - Aircrack-ng](https://github.com/aircrack-ng/aircrack-ng)
- [Github.com - Aircrack-ng - rtl8812au driver - awus036acs](https://github.com/aircrack-ng/rtl8812au/)]
