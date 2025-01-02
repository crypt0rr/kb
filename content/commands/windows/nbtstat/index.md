---
title : "nbtstat"
# pre : '<i class="fas fa-code"></i> '
description : "Displays protocol statistics and current TCP/IP connections using NBT (NetBIOS over TCP/IP)."
date : 2020-09-23T12:24:05+02:00
# hidden : true
# draft : true
weight : 50
# tags : ['']
---

---

Displays protocol statistics and current TCP/IP connections using NBT (NetBIOS over TCP/IP).

## Usage

```plain
NBTSTAT [ [-a RemoteName] [-A IP address] [-c] [-n]
        [-r] [-R] [-RR] [-s] [-S] [interval] ]
```

## Flags

```plain
  -a   (adapter status) Lists the remote machine's name table given its name
  -A   (Adapter status) Lists the remote machine's name table given its
                        IP address.
  -c   (cache)          Lists NBT's cache of remote [machine] names and their IP addresses
  -n   (names)          Lists local NetBIOS names.
  -r   (resolved)       Lists names resolved by broadcast and via WINS
  -R   (Reload)         Purges and reloads the remote cache name table
  -S   (Sessions)       Lists sessions table with the destination IP addresses
  -s   (sessions)       Lists sessions table converting destination IP
                        addresses to computer NETBIOS names.
  -RR  (ReleaseRefresh) Sends Name Release packets to WINS and then, starts Refresh

  RemoteName   Remote host machine name.
  IP address   Dotted decimal representation of the IP address.
  interval     Redisplays selected statistics, pausing interval seconds
               between each display. Press Ctrl+C to stop redisplaying
               statistics.


```

## Examples

```plain
$ nbtstat -A 10.10.10.11

Ethernet:
Node IpAddress: [10.10.10.10] Scope Id: []

           NetBIOS Remote Machine Name Table

       Name               Type         Status
    ---------------------------------------------
    DC2019         <00>  UNIQUE      Registered
    OFFSEC         <00>  GROUP       Registered
    DC2019         <20>  UNIQUE      Registered

    MAC Address = 68-AA-CC-DD-EE-12
```

## URL List

- [Docs.microsoft.com](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/nbtstat)
