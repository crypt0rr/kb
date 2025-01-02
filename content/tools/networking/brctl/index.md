---
title: "Brctl"
# pre : '<i class="fas fa-code"></i> '
description: "Ethernet bridge administration."
date: 2020-03-10T16:18:52+01:00
# hidden : true
# draft : true
weight: 60
# tags : [""]
---

---

Bridge networking - Ethernet bridge administration.

## Installation

```plain
sudo apt-get install bridge-utils
```

## Usage

```plain
brctl [commands]
```

## Flags

```plain
commands:
addbr           <bridge>        add bridge
delbr           <bridge>        delete bridge
addif           <bridge> <device>   add interface to bridge
delif           <bridge> <device>   delete interface from bridge
hairpin         <bridge> <port> {on|off}    turn hairpin on/off
setageing       <bridge> <time>  set ageing time
setbridgeprio   <bridge> <prio>  set bridge priority
setfd           <bridge> <time>  set bridge forward delay
sethello        <bridge> <time>  set hello time
setmaxage       <bridge> <time>  set max message age
setpathcost     <bridge> <port> <cost>  set path cost
setportprio     <bridge> <port> <prio>  set port priority
show            [ <bridge> ]    show a list of bridges
showmacs        <bridge>        show a list of mac addrs
showstp         <bridge>        show bridge stp info
stp             <bridge> {on|off}   turn stp on/off
```

## Examples

Add a bridge to route network through system

```plain
sudo brctl addbr br0
sudo brctl addif br0 <internal-ethernet>
sudo brctl addif br0 <usb-ethernet>
sudo ifconfig br0 up
sudo dhclient -v br0
```

## URL List

- [Linux.die.net - brctl](https://linux.die.net/man/8/brctl)
