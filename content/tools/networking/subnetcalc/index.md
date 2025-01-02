---
title : "Subnet Calculator"
# pre : ' '
description : "Subnet calculator written in Python. It takes IP address and subnet mask as an input and returns for a given subnet network and broadcast address, first and last IP host, wildcard mask and number of usable hosts."
date : 2022-08-01T14:32:57+02:00
# hidden : true
# draft : true
weight : 410
tags : ['Networking', 'CIDR', 'Netmask']
---

---

Subnet calculator written in Python. It takes IP address and subnet mask as an input and returns for a given subnet network and broadcast address, first and last IP host, wildcard mask and number of usable hosts.

Program takes an IPv4 address and subnet mask as an input and returns following information:

- IPv4 address
- Subnet mask in dotted decimal format and CIDR notation
- Network address
- Broadcast address
- First IP address in the subnet
- Last IP address in the subnet
- Usable hosts per subnet
- Wildcard mask

Program will accept IPv4 address from class A, B, C except:

- 127.0.0.0/ 8 - used for loopback addresses
- 169.254.0.0/16 - used for link-local addresses

## Installation

You need Python version 3.6 or later to run the program.

```plain
git clone https://github.com/crypt0rr/subnetcalc.git
```

## Usage

**Note**: Subnet mask should be entered in dotted decimal format e.g. 255.255.255.0. Program will accept subnet mask from 255.0.0.0.0 to 255.255.255.255. If you use subnet mask 255.255.255.254 (/31) or 255.255.255.255 (/32) program returns None for: network and broadcast address, first and last IP address, usable hosts per subnet.

```plain
python3 subnetcalc.py
```

## Examples

```plain
$ python3 subnetcalc.py
Enter an IP address: 192.168.0.0
Enter a subnet mask: 255.255.255.0
--------------------------------------------------
CIDR notation:       /24 (255.255.255.0)
First usable IP:     192.168.0.1
Last usable IP:      192.168.0.254
Broadcast:           192.168.0.255
Usable hosts:        254
Network:             192.168.0.0
Wildcard mask:       0.0.0.255
```

## URL List

- [Github.com - subnetcalc](https://github.com/crypt0rr/subnetcalc)
