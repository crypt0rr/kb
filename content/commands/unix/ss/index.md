---
title : "ss"
# pre : '<i class="fas fa-code"></i> '
description : "Another utility to investigate sockets."
date : 2022-09-20T13:56:11+02:00
# hidden : true
# draft : true
weight : 830
# tags : ['']
---

---

Another utility to investigate sockets.

## Usage

```plain
ss [ OPTIONS ]
ss [ OPTIONS ] [ FILTER ]
```

## Flags

```plain
   -h, --help          this message
   -V, --version       output version information
   -n, --numeric       don't resolve service names
   -r, --resolve       resolve host names
   -a, --all           display all sockets
   -l, --listening     display listening sockets
   -o, --options       show timer information
   -e, --extended      show detailed socket information
   -m, --memory        show socket memory usage
   -p, --processes     show process using socket
   -i, --info          show internal TCP information
       --tipcinfo      show internal tipc socket information
   -s, --summary       show socket usage summary
       --tos           show tos and priority information
       --cgroup        show cgroup information
   -b, --bpf           show bpf filter socket information
   -E, --events        continually display sockets as they are destroyed
   -Z, --context       display process SELinux security contexts
   -z, --contexts      display process and socket SELinux security contexts
   -N, --net           switch to the specified network namespace name

   -4, --ipv4          display only IP version 4 sockets
   -6, --ipv6          display only IP version 6 sockets
   -0, --packet        display PACKET sockets
   -t, --tcp           display only TCP sockets
   -M, --mptcp         display only MPTCP sockets
   -S, --sctp          display only SCTP sockets
   -u, --udp           display only UDP sockets
   -d, --dccp          display only DCCP sockets
   -w, --raw           display only RAW sockets
   -x, --unix          display only Unix domain sockets
       --tipc          display only TIPC sockets
       --vsock         display only vsock sockets
   -f, --family=FAMILY display sockets of type FAMILY
       FAMILY := {inet|inet6|link|unix|netlink|vsock|tipc|xdp|help}

   -K, --kill          forcibly close sockets, display what was closed
   -H, --no-header     Suppress header line
   -O, --oneline       socket's data printed on a single line
       --inet-sockopt  show various inet socket options

   -A, --query=QUERY, --socket=QUERY
       QUERY := {all|inet|tcp|mptcp|udp|raw|unix|unix_dgram|unix_stream|unix_seqpacket|packet|netlink|vsock_stream|vsock_dgram|tipc}[,QUERY]

   -D, --diag=FILE     Dump raw information about TCP sockets to FILE
   -F, --filter=FILE   read filter information from FILE
       FILTER := [ state STATE-FILTER ] [ EXPRESSION ]
       STATE-FILTER := {all|connected|synchronized|bucket|big|TCP-STATES}
         TCP-STATES := {established|syn-sent|syn-recv|fin-wait-{1,2}|time-wait|closed|close-wait|last-ack|listening|closing}
          connected := {established|syn-sent|syn-recv|fin-wait-{1,2}|time-wait|close-wait|last-ack|closing}
       synchronized := {established|syn-recv|fin-wait-{1,2}|time-wait|close-wait|last-ack|closing}
             bucket := {syn-recv|time-wait}
                big := {established|syn-sent|fin-wait-{1,2}|closed|close-wait|last-ack|listening|closing}
```

## Examples

Showing all sockets, numeric that are listening on TCP and show the process that is using the socket.

- `-a` - display all sockets
- `-n` - don't resolve service names
- `-t` - display only TCP sockets
- `-l` - display listening sockets
- `-p` - show process using socket

```plain
$ ss -antlp
State        Recv-Q    Send-Q            Local Address:Port        Peer Address:Port         Process                
LISTEN       0         10               127.0.0.1:8888             0.0.0.0:*                 users:(("rslsync",pid=3597,fd=16))                  
LISTEN       0         10                 0.0.0.0:44641            0.0.0.0:*                 users:(("rslsync",pid=3597,fd=8))    
LISTEN       0         10                    [::]:44641               [::]:*                 users:(("rslsync",pid=3597,fd=9)) 
```

## URL List

- [Linux.die.net - ss](https://linux.die.net/man/8/ss)
