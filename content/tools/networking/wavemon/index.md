---
title : "Wavemon"
# pre : ' '
description : "A wireless network monitor."
date : 2021-05-24T11:12:45+02:00
# hidden : true
# draft : true
weight : 490
# tags : ['']
---

---

Is a ncurses-based monitoring application for wireless network devices. It plots levels in real-time as well as showing wireless and network related device information.

Analyze Wi-Fi networks, use for example [iperf3]({{< ref "iperf3" >}}) to measure speed and stability.

## Installation

```plain
sudo apt install wavemon
```

## Usage

```plain
wavemon [ -hgv ] [ -i ifname ]
```

## Flags

```plain
  -g            Ensure screen is sufficiently dimensioned
  -h            This help screen
  -i <ifname>   Use specified network interface (default: auto)
  -v            Print version details
```

## Examples

```plain
sudo wavemon -iface wlp4s0

┌─Scan window────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                            │
│<hidden ESSID>        74:DA:88:F2:9E:39  44%, -79 dBm, ch 112, 5560 MHz ESS, Radio Measure, Spectrum Mgmt                   │
│Cordless-G                  C8:B5:AD:F8:D7:F1  46%, -78 dBm, ch  52, 5260 MHz ESS                                           │
│Cordless                    C8:B5:AD:F8:D7:F0  46%, -78 dBm, ch  52, 5260 MHz 2 sta, Radio Measure                          │
│Cordless-G                  AB:CD:EF:GH:IJ:F1  63%, -66 dBm, ch  36, 5180 MHz 1 sta, 7% chan                                │
│Cordless                    AB:CD:EF:GH:IJ:F0  61%, -67 dBm, ch  36, 5180 MHz 5 sta, 5% chan, Radio Measure                 │
│total: 49 Ch/Sg desc, 23 not shown, 2 open 5/2GHz: 18/31 top-3: ch#36 (11), ch#10 (7), ch#11 (6)                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
F1 info  F2 lhist **F3 scan**  F4      F5      F6      F7 prefs F8 help  F9 about F10 quit
```

```plain
sudo wavemon -iface wlp4s0

┌─Interface──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│wlp4s0 (IEEE 802.11), phy 0, reg: n/a, SSID: Cordless                                                                       │
├─Levels─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                            │
│link quality: 59%  (41/70)                                                                                                  │
│========================================================================                                                    │
│                                                                                                                            │
│                                                                                                                            │
│signal level: -69 dBm (0.13 nW)                                                                                             │
│==========================================                                                                                  │
│                                                                                                                            │
├─Statistics─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│RX: 58k (62.49 MiB), drop: 10 (0.0%)                                                                                        │
│TX: 29k (5.46 MiB), retries: 2k (7.8%), failed: 21                                                                          │
├─Info───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│mode: Managed, connected to: AB:CD:EF:GH:IJ:F0, time: 1:01h, inactive: 0.3s                                                 │
│freq: 5180 MHz, ctr1: 5210 MHz, channel: 36 (width: 80 MHz)                                                                 │
│rx rate: 526.6 Mbit/s VHT-MCS 6 80MHz VHT-NSS 2, tx rate: 585.1 Mbit/s VHT-MCS 6 80MHz short GI VHT-NSS 2                   │
│beacons: 35216, lost: 2, avg sig: -69 dBm, interval: 0.1s, DTIM: 1                                                          │
│power mgt: on,  tx-power: 22 dBm (158.49 mW)                                                                                │
│retry: short limit 7,  rts/cts: off,  frag: off                                                                             │
├─Network────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│wlp4s0 (UP RUNNING BROADCAST MULTICAST)                                                                                     │
│mac: AC:ED:5C:B9:8C:14, qlen: 1000                                                                                          │
│ip: 10.10.20.107/24                                                                                                         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
**F1 info**  F2 lhist F3 scan  F4      F5      F6      F7 prefs F8 help  F9 about F10 quit
```

## URL List

- [Github.com - Wavemon](https://github.com/uoaerg/wavemon)
- [Systutorials - Wavemon](https://www.systutorials.com/docs/linux/man/1-wavemon/)
