---
title : "netstat"
# pre : '<i class="fas fa-code"></i> '
description : "Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships."
date : 2020-04-14T14:12:27+02:00
# hidden : true
# draft : true
weight : 650
# tags : ['']
---

---

## Usage

```plain
netstat [-vWeenNcCF] [<Af>] -r         netstat {-V|--version|-h|--help}
       netstat [-vWnNcaeol] [<Socket> ...]
       netstat { [-vWeenNac] -i | [-cnNe] -M | -s [-6tuw] }
```

## Flags

```plain
-r, --route              display routing table
-i, --interfaces         display interface table
-g, --groups             display multicast group memberships
-s, --statistics         display networking statistics (like SNMP)
-M, --masquerade         display masqueraded connections

-v, --verbose            be verbose
-W, --wide               don't truncate IP addresses
-n, --numeric            don't resolve names
--numeric-hosts          don't resolve host names
--numeric-ports          don't resolve port names
--numeric-users          don't resolve user names
-N, --symbolic           resolve hardware names
-e, --extend             display other/more information
-p, --programs           display PID/Program name for sockets
-o, --timers             display timers
-c, --continuous         continuous listing

-l, --listening          display listening server sockets
-a, --all                display all sockets (default: connected)
-F, --fib                display Forwarding Information Base (default)
-C, --cache              display routing cache instead of FIB
-Z, --context            display SELinux security context for sockets

  <Socket>={-t|--tcp} {-u|--udp} {-U|--udplite} {-S|--sctp} {-w|--raw}
           {-x|--unix} --ax25 --ipx --netrom
  <AF>=Use '-6|-4' or '-A <af>' or '--<af>'; default: inet
  List of possible address families (which support routing):
    inet (DARPA Internet) inet6 (IPv6) ax25 (AMPR AX.25)
    netrom (AMPR NET/ROM) ipx (Novell IPX) ddp (Appletalk DDP)
    x25 (CCITT X.25)
```

## Examples

### Show routing table

```plain
$ netstat -r

Kernel IP routing table
Destination    Gateway         Genmask         Flags   MSS Window  irtt Iface
default        _gateway        0.0.0.0         UG        0 0          0 enp0
link-local     0.0.0.0         255.255.0.0     U         0 0          0 enp0
10.10.10.0     0.0.0.0         255.255.255.0   U         0 0          0 enp0
```

### Show ports that are listened on (TCP)

```plain
$ netstat -nlvpt
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:5939          0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:8888          0.0.0.0:*               LISTEN      2977/rslsync
tcp        0      0 127.0.0.1:1080          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:1337          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:1338          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:1339          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:2525          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:5054          0.0.0.0:*               LISTEN      3627/python3
tcp        0      0 0.0.0.0:8834            0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:16966           0.0.0.0:*               LISTEN      2977/rslsync
tcp        0      0 127.0.0.1:4455          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 127.0.0.1:2222          0.0.0.0:*               LISTEN      17613/ssh
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:34512         0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:42321         0.0.0.0:*               LISTEN      -
tcp6       0      0 ::1:1337                :::*                    LISTEN      17613/ssh
tcp6       0      0 127.0.0.1:41401         :::*                    LISTEN      4181/cryptomator
[...REDACTED...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/netstat)
