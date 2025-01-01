---
title : "vlan-hop"
# pre : ' '
description : "Commands needed to do a VLAN hop."
date : 2020-06-26T10:54:43+02:00
# hidden : true
# draft : true
weight : 470
# tags : ['']
---

---

Commands needed to do a VLAN hop.

## Installation

```plain
sudo apt install vlan
```

## Usage

```plain
sudo modprobe 8021q
sudo vconfig add <ethernet-adapter> <vlan-id>
sudo dhclient <ethernet-adapter>.<vlan-id>

ifconfig eth0.200

sudo vconfig rem <ethernet-adapter>.<vlan-id>
```

## Frogger

```plain
git clone https://github.com/nccgroup/vlan-hopping.git
```

```plain
##########################################
***   Frogger - The VLAN Hopper Version 1.9  ***

***   Auto enumerates VLANs and device discovery ***
##########################################

For usage information refer to the Wiki

https://github.com/nccgroup/vlan-hopping/wiki

Running as user "root" and group "root". This could be dangerous.

[-] The following Interfaces are available

eth0:
ether

----------------------------------------------------------
[?] Enter the interface to scan from as the source
----------------------------------------------------------
eth0

[-] Now Sniffing CDP Packets on eth0 - Please wait for 90 seconds.
```

## URL List

- [Github.com - vlan-hopping](https://github.com/nccgroup/vlan-hopping.git)
