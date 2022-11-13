---
title : "ip"
# pre : '<i class="fas fa-code"></i> '
description : "Show / manipulate routing, network devices, interfaces and tunnels."
date : 2020-09-28T20:32:48+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## IP -  show / manipulate routing, network devices, interfaces and tunnels

## Usage

```plain
Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
       ip [ -force ] -batch filename
where  OBJECT := { link | address | addrlabel | route | rule | neigh | ntable |
                   tunnel | tuntap | maddress | mroute | mrule | monitor | xfrm |
                   netns | l2tp | fou | macsec | tcp_metrics | token | netconf | ila |
                   vrf | sr | nexthop }
```

## Flags

```plain
OPTIONS := { -V[ersion] | -s[tatistics] | -d[etails] | -r[esolve] |
            -h[uman-readable] | -iec | -j[son] | -p[retty] |
            -f[amily] { inet | inet6 | mpls | bridge | link } |
            -4 | -6 | -I | -D | -M | -B | -0 |
            -l[oops] { maximum-addr-flush-attempts } | -br[ief] |
            -o[neline] | -t[imestamp] | -ts[hort] | -b[atch] [filename] |
            -rc[vbuf] [size] | -n[etns] name | -N[umeric] | -a[ll] |
            -c[olor]}
```

## Examples

#### Show IPv4 addresses

```plain
$ ip -4 a

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    inet 192.168.1.35/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp4s0
       valid_lft 85828sec preferred_lft 85828sec
```

#### Show IPv6 addresses

```plain
$ ip -6 addr

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN qlen 1000
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP qlen 1000
    inet6 fe80::67c3:63c4:a12e:7f2a/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

## URL List

* [Linux.die.net](https://linux.die.net/man/8/ip)
* [HowToGeek.com](https://www.howtogeek.com/657911/how-to-use-the-ip-command-on-linux/)
