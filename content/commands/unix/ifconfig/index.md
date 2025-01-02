---
title : "ifconfig"
# pre : '<i class="fas fa-code"></i> '
description : "Configure a network interface."
date : 2020-03-13T15:00:25+01:00
# hidden : true
# draft : true
weight : 400
tags : ['Unix','Networking']
---

---

## Usage

```plain
ifconfig [OPTIONS]
```

## Flags

```plain
Usage:
  ifconfig [-a] [-v] [-s] <interface> [[<AF>] <address>]
  [add <address>[/<prefixlen>]]
  [del <address>[/<prefixlen>]]
  [[-]broadcast [<address>]]  [[-]pointopoint [<address>]]
  [netmask <address>]  [dstaddr <address>]  [tunnel <address>]
  [outfill <NN>] [keepalive <NN>]
  [hw <HW> <address>]  [mtu <NN>]
  [[-]trailers]  [[-]arp]  [[-]allmulti]
  [multicast]  [[-]promisc]
  [mem_start <NN>]  [io_addr <NN>]  [irq <NN>]  [media <type>]
  [txqueuelen <NN>]
  [[-]dynamic]
  [up|down] ...

  <HW>=Hardware Type.
  List of possible hardware types:
    loop (Local Loopback) slip (Serial Line IP) cslip (VJ Serial Line IP)
    slip6 (6-bit Serial Line IP) cslip6 (VJ 6-bit Serial Line IP) adaptive (Adaptive Serial Line IP)
    ash (Ash) ether (Ethernet) ax25 (AMPR AX.25)
    netrom (AMPR NET/ROM) rose (AMPR ROSE) tunnel (IPIP Tunnel)
    ppp (Point-to-Point Protocol) hdlc ((Cisco)-HDLC) lapb (LAPB)
    arcnet (ARCnet) dlci (Frame Relay DLCI) frad (Frame Relay Access Device)
    sit (IPv6-in-IPv4) fddi (Fiber Distributed Data Interface) hippi (HIPPI)
    irda (IrLAP) ec (Econet) x25 (generic X.25)
    eui64 (Generic EUI-64)
  <AF>=Address family. Default: inet
  List of possible address families:
    unix (UNIX Domain) inet (DARPA Internet) inet6 (IPv6)
    ax25 (AMPR AX.25) netrom (AMPR NET/ROM) rose (AMPR ROSE)
    ipx (Novell IPX) ddp (Appletalk DDP) ec (Econet)
    ash (Ash) x25 (CCITT X.25)
```

## Examples

### Network adapter overview

```plain
ifconfig

wlp4s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.20.30.10 netmask 255.255.255.0  broadcast 10.20.30.255
        inet6 fe80::fd53:581d:b57d:af7b  prefixlen 64  scopeid 0x20<link>
        ether ac:00:00:00:00:01  txqueuelen 1000  (Ethernet)
        RX packets 816855  bytes 797953551 (797.9 MB)
        RX errors 0  dropped 872  overruns 0  frame 0
        TX packets 488936  bytes 406249425 (406.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

### Change MAC address

```plain
sudo ifconfig eth0 down
sudo ifconfig eth0 hw ether <new-MAC-address>
sudo ifconfig eth0 up
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/ifconfig)
