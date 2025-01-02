---
title : "Route"
# pre : '<i class="fas fa-code"></i> '
description : "Manipulates network routing tables."
date : 2022-11-13T16:05:57+01:00
# hidden : true
# draft : true
weight : 140
tags : ['Windows', 'Networking']
---

---

Displays and modifies the entries in the local IP routing table. If used without parameters, route displays help at the command prompt.

## Usage

```plain
ROUTE [-f] [-p] [-4|-6] command [destination]
                  [MASK netmask]  [gateway] [METRIC metric]  [IF interface]
```

## Flags

```plain
  -f           Clears the routing tables of all gateway entries.  If this is
               used in conjunction with one of the commands, the tables are
               cleared prior to running the command.

  -p           When used with the ADD command, makes a route persistent across
               boots of the system. By default, routes are not preserved
               when the system is restarted. Ignored for all other commands,
               which always affect the appropriate persistent routes.

  -4           Force using IPv4.

  -6           Force using IPv6.

  command      One of these:
                 PRINT     Prints  a route
                 ADD       Adds    a route
                 DELETE    Deletes a route
                 CHANGE    Modifies an existing route
  destination  Specifies the host.
  MASK         Specifies that the next parameter is the 'netmask' value.
  netmask      Specifies a subnet mask value for this route entry.
               If not specified, it defaults to 255.255.255.255.
  gateway      Specifies gateway.
  interface    the interface number for the specified route.
  METRIC       specifies the metric, ie. cost for the destination.

All symbolic names used for destination are looked up in the network database
file NETWORKS. The symbolic names for gateway are looked up in the host name
database file HOSTS.

If the command is PRINT or DELETE. Destination or gateway can be a wildcard,
(wildcard is specified as a star '*'), or the gateway argument may be omitted.

If Dest contains a * or ?, it is treated as a shell pattern, and only
matching destination routes are printed. The '*' matches any string,
and '?' matches any one char. Examples: 157.*.1, 157.*, 127.*, *224*.

Pattern match is only allowed in PRINT command.
Diagnostic Notes:
    Invalid MASK generates an error, that is when (DEST & MASK) != DEST.
    Example> route ADD 157.0.0.0 MASK 155.0.0.0 157.55.80.1 IF 1
             The route addition failed: The specified mask parameter is invalid. (Destination & Mask) != Destination.

Examples:

    > route PRINT
    > route PRINT -4
    > route PRINT -6
    > route PRINT 157*          .... Only prints those matching 157*

    > route ADD 157.0.0.0 MASK 255.0.0.0  157.55.80.1 METRIC 3 IF 2
             destination^      ^mask      ^gateway     metric^    ^
                                                         Interface^
      If IF is not given, it tries to find the best interface for a given
      gateway.
    > route ADD 3ffe::/32 3ffe::1

    > route CHANGE 157.0.0.0 MASK 255.0.0.0 157.55.80.5 METRIC 2 IF 2

      CHANGE is used to modify gateway and/or metric only.

    > route DELETE 157.0.0.0
    > route DELETE 3ffe::/32
```

## Examples

For more examples check [learn.microsoft.com](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008#examples)

### Display the entire contents of the IP routing table

```cmd
C:\Users\crypt0rr>route print
===========================================================================
Interface List
  9...00 1c 42 b0 90 e2 ......Parallels VirtIO Ethernet Adapter
 14...02 00 4c 4f 4f 50 ......Npcap Loopback Adapter
  1...........................Software Loopback Interface 1
===========================================================================

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      10.211.55.1      10.211.55.6     15
      10.211.55.0    255.255.255.0         On-link       10.211.55.6    271
      10.211.55.6  255.255.255.255         On-link       10.211.55.6    271
    10.211.55.255  255.255.255.255         On-link       10.211.55.6    271
        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331
        127.0.0.1  255.255.255.255         On-link         127.0.0.1    331
  127.255.255.255  255.255.255.255         On-link         127.0.0.1    331
      169.254.0.0      255.255.0.0         On-link    169.254.136.15    281
   169.254.136.15  255.255.255.255         On-link    169.254.136.15    281
  169.254.255.255  255.255.255.255         On-link    169.254.136.15    281
        224.0.0.0        240.0.0.0         On-link         127.0.0.1    331
        224.0.0.0        240.0.0.0         On-link    169.254.136.15    281
        224.0.0.0        240.0.0.0         On-link       10.211.55.6    271
  255.255.255.255  255.255.255.255         On-link         127.0.0.1    331
  255.255.255.255  255.255.255.255         On-link    169.254.136.15    281
  255.255.255.255  255.255.255.255         On-link       10.211.55.6    271
===========================================================================
Persistent Routes:
  None

IPv6 Route Table
===========================================================================
Active Routes:
 If Metric Network Destination      Gateway
  1    331 ::1/128                  On-link
 14    281 fe80::/64                On-link
 14    281 fe80::2594:eebe:2b4d:880f/128
                                    On-link
  1    331 ff00::/8                 On-link
 14    281 ff00::/8                 On-link
===========================================================================
Persistent Routes:
  None
```

### Display the routes in the IP routing table that begin with 10

```cmd
C:\Users\crypt0rr>route print 10.*
===========================================================================
Interface List
  9...00 1c 42 b0 90 e2 ......Parallels VirtIO Ethernet Adapter
 14...02 00 4c 4f 4f 50 ......Npcap Loopback Adapter
  1...........................Software Loopback Interface 1
===========================================================================

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
      10.211.55.0    255.255.255.0         On-link       10.211.55.6    271
      10.211.55.6  255.255.255.255         On-link       10.211.55.6    271
    10.211.55.255  255.255.255.255         On-link       10.211.55.6    271
===========================================================================
Persistent Routes:
  None

IPv6 Route Table
===========================================================================
Active Routes:
  None
Persistent Routes:
  None
```

### Add a default route with the default gateway address of 192.168.12.1

```cmd
route add 0.0.0.0 mask 0.0.0.0 192.168.12.1
```

## URL list

- [Learn.microsoft.com - route](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008)
