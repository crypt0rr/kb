---
title : "Pcredz"
# pre : ' '
description : "This tool extracts Credit card numbers, NTLM(DCE-RPC, HTTP, SQL, LDAP, etc), Kerberos (AS-REQ Pre-Auth etype 23), HTTP Basic, SNMP, POP, SMTP, FTP, IMAP, etc from a pcap file or from a live interface."
date : 2021-08-04T13:42:43+02:00
# hidden : true
# draft : true
weight : 1300
tags : ['Other', 'HTTP', 'FTP', 'Wireshark']
---

---

This tool extracts Credit card numbers, NTLM(DCE-RPC, HTTP, SQL, LDAP, etc), Kerberos (AS-REQ Pre-Auth etype 23), HTTP Basic, SNMP, POP, SMTP, FTP, IMAP, etc from a pcap file or from a live interface.

### Features

- Extract from a pcap file or from a live interface IPv4 and IPv6:
  - Credit card numbers
  - POP
  - SMTP
  - IMAP
  - SNMP community string
  - FTP
  - HTTP (NTLM/Basic/HTTP Forms)
  - NTLMv1/v2 (DCE-RPC,SMBv1/2,LDAP, MSSQL, HTTP, etc)
  - Kerberos (AS-REQ Pre-Auth etype 23) hashes.

- All hashes are displayed in a hashcat format (use -m 7500 for kerberos, -m 5500 for NTLMv1, -m 5600 for NTLMv2).

- Log all credentials and information to a file (CredentialDump-Session.log).

- Log credentials in the logs/ folder. MSKerb.txt, NTLMv1.txt and NTLMv2.txt can be directly fed to hashcat.

## Installation

### Requirements

```plain
apt install python3-pip && sudo apt-get install libpcap-dev && python3 -m pip install Cython && python3 -m pip install python-libpcap
```

When running Python3.10 it can happen that Pcredz states `libpcap` is not installed. This is a [known issue](https://github.com/lgandx/PCredz/issues/48). The fix for this is cloning `python-libpcap` from source and installing it.

```plain
git clone https://github.com/caizhengxin/python-libpcap.git
python3 setup.py install
```

### Download tool

```plain
git clone https://github.com/lgandx/PCredz.git
```

## Usage

```plain
python3 Pcredz [-h] [-f FNAME | -d DIR_PATH | -i INTERFACE] [-c] [-t] [-v] [-o OUTPUT_PATH]
```

## Flags

```plain
Pcredz 2.0.2 Author: Laurent Gaffie

options:
  -h, --help      show this help message and exit
  -f FNAME        Pcap file to parse
  -d DIR_PATH     Pcap directory to parse recursivly
  -i INTERFACE    interface for live capture
  -c              deactivate CC number scanning (Can gives false positives!)
  -t              Include a timestamp in all generated messages (useful for correlation)
  -v              More verbose.
  -o OUTPUT_PATH  output directory
```

## Examples

### Live on interface

For example you can start this live capture with the following tools all at the same time:

- [Impacket - SMBserver.py]({{< ref "smbserver-py" >}})
- [Responder]({{< ref "responder" >}})

```plain
$ sudo python3 Pcredz -i enp0s31f6
Pcredz 2.0.2
Author: Laurent Gaffie
Please send bugs/comments/pcaps to: laurent.gaffie@gmail.com
This script will extract NTLM (HTTP,LDAP,SMB,MSSQL,RPC, etc), Kerberos,
FTP, HTTP Basic and credit card data from a given pcap file or from a live interface.

CC number scanning activated

Pcredz live capture started, using:enp0s31f6
Starting timestamp (1639734999.1870687) corresponds to 12/17/21 10:56:39
protocol: tcp 10.10.10.102:36188 > 10.10.10.103:445
NTLMv2 complete hash is: john-do::OFFSEC:aaaaaaaaaaaaaaaa:41DBF91ACAE926FCF1BB4D7580A4BC96:0101000000000000[...]
```

### Analyzing .PCAP(NG) files

Note: first change owner for the input PCAP(NG) file. `sudo chown -R $USER:$USER *.pcap*`

### HTTP Basic authentication

```plain
$ python3 ./Pcredz -f capture.pcapng
Pcredz 2.0.2
Author: Laurent Gaffie
Please send bugs/comments/pcaps to: laurent.gaffie@gmail.com
This script will extract NTLM (HTTP,LDAP,SMB,MSSQL,RPC, etc), Kerberos,
FTP, HTTP Basic and credit card data from a given pcap file or from a live interface.

CC number scanning activated

Unknown format, trying TCPDump format

protocol: tcp 10.10.10.10:50114 > 52.201.75.114:80
Found  HTTP Basic authentication: johndo:johndo

capture.pcapng parsed in: 0.32 seconds (File size 1.94 Mo).
```

### SNMP(v1-v2)

```plain
$ python3 ./Pcredz -f capture.pcapng
Pcredz 2.0.2
Author: Laurent Gaffie
Please send bugs/comments/pcaps to: laurent.gaffie@gmail.com
This script will extract NTLM (HTTP,LDAP,SMB,MSSQL,RPC, etc), Kerberos,
FTP, HTTP Basic and credit card data from a given pcap file or from a live interface.

CC number scanning activated


Parsing: temp/capture.pcapng
Unknown format, trying TCPDump format

protocol: udp 172.17.1.71:55016 > 172.17.11.13:161
Found SNMPv2 Community string: ABbJm18w

protocol: udp 172.17.1.70:58218 > 172.17.11.12:161
Found SNMPv1 Community string: ABbJm18w

protocol: udp 172.17.1.126:60189 > 172.17.210.128:161
Found SNMPv1 Community string: public

protocol: udp 172.17.1.70:58808 > 172.17.210.117:161
Found SNMPv2 Community string: public
```

### NTLMv2

```plain
$ python3 ./Pcredz -f capture.pcapng
Pcredz 2.0.2
Author: Laurent Gaffie
Please send bugs/comments/pcaps to: laurent.gaffie@gmail.com
This script will extract NTLM (HTTP,LDAP,SMB,MSSQL,RPC, etc), Kerberos,
FTP, HTTP Basic and credit card data from a given pcap file or from a live interface.

CC number scanning activated


Parsing: capture.pcapng
Unknown format, trying TCPDump format

protocol: tcp 10.51.222.19:49254 > 10.51.223.29:80
NTLMv2 complete hash is: SA-DA::OFFSEC:717b58d1234658b:0CDFE112345678909742C4EBE4:01010000000000007E9CBA2A3E0FD7017720946CFDAC6FB7000000000200060053004D0042000100160053004D0042002D0054004F004F004C004B00490054000400120073006D0062002E006C006F00630061006C000300280073006500720076006500720032003000300033002E007610064000000000000000000
```

### Microsoft SQL

```plain
$ python3 Pcredz -f capture.pcapng                         
Pcredz 2.0.2
Author: Laurent Gaffie
Please send bugs/comments/pcaps to: laurent.gaffie@gmail.com
This script will extract NTLM (HTTP,LDAP,SMB,MSSQL,RPC, etc), Kerberos,
FTP, HTTP Basic and credit card data from a given pcap file or from a live interface.

CC number scanning activated

Unknown format, trying TCPDump format

protocol: tcp 10.10.10.1:445 > 10.10.10.2:58484
Found a password in an SMB read operation:

[Netwerk]
Max=0
0=AD;DC=offsec,DC=nl

[OFFSECMASTERDB]
Soort=          SQLSERVER
SQLServerName=  SQLSERVER-PROD.offsec.nl
SQLDatabaseName=OFFSECMASTERDB
SQLUserName=    SQLADMIN
SQLPassWord=    aMEWMj7J?Cz7hU?44KwD3js8KyxXddhG
```

## URL List

- [Github.com - PCredz](https://github.com/lgandx/PCredz)
- [HTTPbin.org - HTTP Basic Auth testing page](http://httpbin.org/basic-auth/user/passwd)
