---
title : "snmp-check"
# pre : ' '
description : "Like to snmpwalk, snmpcheck allows you to enumerate the SNMP devices and places the output in a very human readable friendly format. It could be useful for penetration testing or systems monitoring."
date : 2022-10-09T16:10:30+02:00
# hidden : true
# draft : true
weight : 1680
tags : ['Other', 'SNMP']
---

---

Like to snmpwalk, snmpcheck allows you to enumerate the SNMP devices and places the output in a very human readable friendly format. It could be useful for penetration testing or systems monitoring.

## Installation

By default installed in [Kali Linux](https://www.kali.org/).

```plain
sudo apt install snmp-check
```

## Usage

```plain
snmp-check [OPTIONS] <target IP address>
```

## Flags

```plain
snmp-check v1.9 - SNMP enumerator
Copyright (c) 2005-2015 by Matteo Cantoni (www.nothink.org)

  -p --port        : SNMP port. Default port is 161;
  -c --community   : SNMP community. Default is public;
  -v --version     : SNMP version (1,2c). Default is 1;

  -w --write       : detect write access (separate action by enumeration);

  -d --disable_tcp : disable TCP connections enumeration!
  -t --timeout     : timeout in seconds. Default is 5;
  -r --retries     : request retries. Default is 1; 
  -i --info        : show script version;
  -h --help        : show help menu;
```

## Examples

```plain
$ snmp-check -c public 10.10.10.10
snmp-check v1.9 - SNMP enumerator
Copyright (c) 2005-2015 by Matteo Cantoni (www.nothink.org)

[+] Try to connect to 10.10.10.10:161 using SNMPv1 and community 'public'

[*] System information:

  Host IP address               : 10.10.10.10
  Hostname                      : OFFSEC
  Description                   : HP G7
  Contact                       : -
  Location                      : -
  Uptime snmp                   : 1 days, 13:37:59.21
  Uptime system                 : 1 day, 13:37:15.73
  System date                   : 2022-10-9 16:19:05.5
  Domain                        : WORKGROUP

[*] User accounts:
  Administrator       

[*] Network information:
[...]
```

## URL List

- [Kali.org - snmp-check](https://www.kali.org/tools/snmpcheck/)
