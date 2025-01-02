---
title : "onesixtyone"
# pre : ' '
description : "onesixtyone is a simple SNMP scanner which sends SNMP requests for the sysDescr value asynchronously with user-adjustable sending times and then logs the responses which gives the description of the software running on the device."
date : 2022-10-08T13:11:45+02:00
# hidden : true
# draft : true
weight : 1270
tags : ['Other', 'SNMP']
---

---

onesixtyone is a simple SNMP scanner which sends SNMP requests for the sysDescr value asynchronously with user-adjustable sending times and then logs the responses which gives the description of the software running on the device.

## Installation

```plain
sudo apt install onesixtyone
```

## Usage

```plain
onesixtyone [options] <host> <community>
```

## Flags

```plain
  -c <communityfile> file with community names to try
  -i <inputfile>     file with target hosts
  -o <outputfile>    output log
  -p                 specify an alternate destination SNMP port
  -d                 debug mode, use twice for more information

  -s                 short mode, only print IP addresses

  -w n               wait n milliseconds (1/1000 of a second) between sending packets (default 10)
  -q                 quiet mode, do not print log to stdout, use with -l
host is either an IPv4 address or an IPv4 address and a netmask
default community names are: public private

Max number of hosts :       65535
Max community length:       32
Max number of communities:  16384
```

## Examples

### Basic whole subnet scan

```plain
onesixtyone 192.168.4.0/24 public
```

### Using list to check multiple community strings

```plain
$ onesixtyone -c communitylist -i targets
192.168.120.92 [1234] HP ETHERNET MULTI-ENVIRONMENT,ROM A.05.03,JETDIRECT,
JD24,EEPROM A.05.05
130.160.108.146 [public] Hardware: x86 Family 15 Model 0 Stepping 10 AT/AT
COMPATIBLE - Software: Windows 2000 Version 5.0 (Build 2195 Uniprocessor Free)
192.168.112.64 [public] Power Macintosh, hardware type 406; MacOS 9.0;
OpenTransport 2.5.2
192.168.104.254 [public] Novell NetWare 4.11  August 22, 1996
192.168.112.83 [public] Macintosh Quadra 650, System Software 7.1
192.168.244.210 [public] RICOH Aficio 850 / RICOH Network Printer D model
192.168.240.39 [public] Cisco Systems WS-C5000
192.168.244.103 [public] HPJ3210A AdvanceStack 10BT Switching Hub Management
Module, ROM A.01.02, EEPROM A.01.01, HW A.01.00
```

Community list:

```plain
public
private
manager
```

## URL List

- [Github.com - onesixtyone](https://github.com/trailofbits/onesixtyone)
- [Kali.org - onesixtyone](https://www.kali.org/tools/onesixtyone/)
