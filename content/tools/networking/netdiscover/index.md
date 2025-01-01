---
title : "Netdiscover"
# pre : ' '
description : "Active/passive ARP reconnaissance tool."
date : 2020-03-13T16:53:34+01:00
# hidden : true
# draft : true
weight : 220
# tags : ['']
---

---

Active/passive ARP reconnaissance tool.

## Installation

```plain
sudo apt install netdiscover
```

## Usage

```plain
netdiscover [OPTIONS]
```

## Flags

```plain
Netdiscover 0.5.1 [Active/passive ARP reconnaissance tool]
Written by: Jaime Penalba <jpenalbae@gmail.com>

Usage: netdiscover [-i device] [-r range | -l file | -p] [-m file] [-F filter] [-s time] [-c count] [-n node] [-dfPLNS]
  -i device: your network device
  -r range: scan a given range instead of auto scan. 192.168.6.0/24,/16,/8
  -l file: scan the list of ranges contained into the given file
  -p passive mode: do not send anything, only sniff
  -m file: scan a list of known MACs and host names
  -F filter: customize pcap filter expression (default: "arp")
  -s time: time to sleep between each ARP request (milliseconds)
  -c count: number of times to send each ARP request (for nets with packet loss)
  -n node: last source IP octet used for scanning (from 2 to 253)
  -d ignore home config files for autoscan and fast mode
  -f enable fastmode scan, saves a lot of time, recommended for auto
  -P print results in a format suitable for parsing by another program and stop after active scan
  -L similar to -P but continue listening after the active scan is completed
  -N Do not print header. Only valid when -P or -L is enabled.
  -S enable sleep time suppression between each request (hardcore mode)

If -r, -l or -p are not enabled, netdiscover will scan for common LAN addresses.
```

## Examples

### Scan whole network

```plain
sudo netdiscover -r 10.20.30.0/24
```

## URL List

- [Debian.org](https://manpages.debian.org/unstable/netdiscover/netdiscover.8.en.html)
- [Github.com - netdiscover](https://github.com/netdiscover-scanner/netdiscover)
