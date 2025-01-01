---
title : "SNMP"
# pre : ' '
description : "Simple Network Management Protocol."
date : 2020-03-13T16:08:59+01:00
# hidden : true
# draft : true
weight : 1670
tags : ['Other', 'SNMP']
---

---

Simple Network Management Protocol.

## Installation

```plain
sudo apt install snmp
```

### snmpbulkget

```plain
snmpbulkget -v 2c -c public <ip> iso.3.6.1.2.1.1.9
```

### snmp-check (Kali)

```plain
snmp-check -w <ip>
```

## Flags

```plain
snmp-check v1.9 - SNMP enumerator
Copyright (c) 2005-2015 by Matteo Cantoni (www.nothink.org)

 Usage: snmp-check [OPTIONS] <target IP address>

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
snmp-check 192.168.1.2 -c public
snmp-check v1.9 - SNMP enumerator
Copyright (c) 2005-2015 by Matteo Cantoni (www.nothink.org)

[+] Try to connect to 192.168.1.2:161 using SNMPv1 and community 'public'

[*] System information:

  Host IP address               : 192.168.1.2
  Hostname                      : ...retracted...
  Description                   : ...retracted...
[...]
```

### MIB Tree Microsoft SNMP implementation

| Variable               | Content          |
| ---------------------- | ---------------- |
| 1.3.6.1.2.1.25.1.6.0   | System Processes |
| 1.3.6.1.2.1.25.4.2.1.2 | Running Programs |
| 1.3.6.1.2.1.25.4.2.1.4 | Processes Path   |
| 1.3.6.1.2.1.25.2.3.1.4 | Storage Units    |
| 1.3.6.1.2.1.25.6.3.1.2 | Software Name    |
| 1.3.6.1.4.1.77.1.2.25  | User Accounts    |
| 1.3.6.1.2.1.6.13.1.3   | TCP Local Ports  |

## URL List

- [Kali.org - snmp-check](https://tools.kali.org/information-gathering/snmp-check)
