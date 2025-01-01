---
title : "RDP-Sec-Check"
# pre : ' '
description : "Is a Perl script to enumerate security settings of an RDP Service (AKA Terminal Services)."
date : 2020-03-18T11:06:38+01:00
# hidden : true
# draft : true
weight : 1450
# tags : ['']
---

---

Is a Perl script to enumerate security settings of an RDP Service (AKA Terminal Services).

## Installation

```plain
sudo apt install make

sudo cpan install Encoding::BER

git clone https://github.com/portcullislabs/rdp-sec-check.git
```

## Usage

```plain
perl rdp-sec-check.pl [OPTIONS] <target>
```

## Flags

```plain
Starting rdp-sec-check v0.9-beta ( http://labs.portcullis.co.uk/application/rdp-sec-check/ )
Copyright (C) 2014 Mark Lowe (mrl@portcullis-security.com)

rdp-sec-check.pl [ options ]  ( --file hosts.txt | host | host:port )

options are:

  --file hosts.txt  targets, one ip:port per line
  --outfile out.log output logfile
  --timeout sec     receive timeout (default 10s)
  --retries times   number of retries after timeout
  --verbose
  --debug
  --help

Example:
         rdp-sec-check.pl 192.168.1.1
         rdp-sec-check.pl --file hosts.txt --timeout 15 --retries 3
         rdp-sec-check.pl --outfile rdp.log 192.168.69.69:3389
         rdp-sec-check.pl --file hosts.txt --outfile rdp.log --verbose
```

## Examples

### Scan RDP security

```plain
perl rdp-sec-check.pl 10.10.10.16

Starting rdp-sec-check v0.9-beta ( http://labs.portcullis.co.uk/application/rdp-sec-check/ ) at Wed Mar 18 11:08:15 2020

[+] Scanning 1 hosts

Target:    10.10.10.16
IP:        10.10.10.16
Port:      3389

[+] Checking supported protocols

[-] Checking if RDP Security (PROTOCOL_RDP) is supported...Supported
[-] Checking if TLS Security (PROTOCOL_SSL) is supported...Supported
[-] Checking if CredSSP Security (PROTOCOL_HYBRID) is supported [uses NLA]...Supported

[+] Checking RDP Security Layer

[-] Checking RDP Security Layer with encryption ENCRYPTION_METHOD_NONE...Not supported
[-] Checking RDP Security Layer with encryption ENCRYPTION_METHOD_40BIT...Supported.  Server encryption level: ENCRYPTION_LEVEL_CLIENT_COMPATIBLE
[-] Checking RDP Security Layer with encryption ENCRYPTION_METHOD_128BIT...Supported.  Server encryption level: ENCRYPTION_LEVEL_CLIENT_COMPATIBLE
[-] Checking RDP Security Layer with encryption ENCRYPTION_METHOD_56BIT...Supported.  Server encryption level: ENCRYPTION_LEVEL_CLIENT_COMPATIBLE
[-] Checking RDP Security Layer with encryption ENCRYPTION_METHOD_FIPS...Supported.  Server encryption level: ENCRYPTION_LEVEL_CLIENT_COMPATIBLE

[+] Summary of protocol support

[-] 10.10.10.16:3389 supports PROTOCOL_SSL   : TRUE
[-] 10.10.10.16:3389 supports PROTOCOL_HYBRID: TRUE
[-] 10.10.10.16:3389 supports PROTOCOL_RDP   : TRUE

[+] Summary of RDP encryption support

[-] 10.10.10.16:3389 has encryption level: ENCRYPTION_LEVEL_CLIENT_COMPATIBLE
[-] 10.10.10.16:3389 supports ENCRYPTION_METHOD_NONE   : FALSE
[-] 10.10.10.16:3389 supports ENCRYPTION_METHOD_40BIT  : TRUE
[-] 10.10.10.16:3389 supports ENCRYPTION_METHOD_128BIT : TRUE
[-] 10.10.10.16:3389 supports ENCRYPTION_METHOD_56BIT  : TRUE
[-] 10.10.10.16:3389 supports ENCRYPTION_METHOD_FIPS   : TRUE

[+] Summary of security issues

[-] 10.10.10.16:3389 has issue NLA_SUPPORTED_BUT_NOT_MANDATED_DOS
[-] 10.10.10.16:3389 has issue SSL_SUPPORTED_BUT_NOT_MANDATED_MITM
[-] 10.10.10.16:3389 has issue WEAK_RDP_ENCRYPTION_SUPPORTED
[-] 10.10.10.16:3389 has issue FIPS_SUPPORTED_BUT_NOT_MANDATED

rdp-sec-check v0.9-beta completed at Wed Mar 18 11:08:15 2020
```

## URL List

- [GitHub.com - RDP-sec-check](https://github.com/portcullislabs/rdp-sec-check)
