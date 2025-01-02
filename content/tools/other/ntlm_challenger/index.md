---
title : "NTLM_challenger"
# pre : ' '
description : "Fetch and parse NTLM challenge messages from HTTP and SMB services."
date : 2021-04-22T09:47:06+02:00
# hidden : true
# draft : true
weight : 1220
tags : ['Other', 'NTLM']
---

---

Fetch and parse NTLM challenge messages from HTTP and SMB services.

## Installation

```plain
git clone https://github.com/b17zr/ntlm_challenger.git
```

## Usage

```plain
ntlm_challenger.py [-h] [--smbv1] url
```

## Flags

```plain
Fetch and parse NTLM challenge messages from HTTP and SMB services

positional arguments:
  url         HTTP or SMB URL to fetch NTLM challenge from

optional arguments:
  -h, --help  show this help message and exit
  --smbv1     Use SMBv1
```

## Examples

### Challenge NTLM HTTPS endpoint

```plain
$ python3 ntlm_challenger.py 'https://ntlm.example.com/'

Target (Domain): AD

Version: Server 2016 or 2019 / Windows 10 (build 14393)

TargetInfo:
  MsvAvNbDomainName: AD
  MsvAvNbComputerName: EXAMPLE-DC
  MsvAvDnsDomainName: ad.example.com
  MsvAvDnsComputerName: example-dc.ad.example.com
  MsvAvDnsTreeName: ad.example.com
  MsvAvTimestamp: Apr 22, 2021 07:40:50.514308

Negotiate Flags:
  NTLMSSP_NEGOTIATE_UNICODE
  NTLMSSP_REQUEST_TARGET
  NTLMSSP_NEGOTIATE_ALWAYS_SIGN
  NTLMSSP_TARGET_TYPE_DOMAIN
  NTLMSSP_NEGOTIATE_EXTENDED_SESSIONSECURITY
  NTLMSSP_NEGOTIATE_TARGET_INFO
  NTLMSSP_NEGOTIATE_VERSION
```

### Challenge SMB

```plain
$ python3 ntlm_challenger.py 'smb://10.10.10.10' 

Target (Server): DC01

Version: Server 2016 or 2019 / Windows 10 (build 17763)

TargetInfo:
  MsvAvNbDomainName: DC01
  MsvAvNbComputerName: DC01
  MsvAvDnsDomainName: DC01
  MsvAvDnsComputerName: DC01
  MsvAvTimestamp: Jun 24, 2021 13:07:22.441720

Negotiate Flags:
  NTLMSSP_NEGOTIATE_UNICODE
  NTLMSSP_REQUEST_TARGET
  NTLMSSP_TARGET_TYPE_SERVER
  NTLMSSP_NEGOTIATE_EXTENDED_SESSIONSECURITY
  NTLMSSP_NEGOTIATE_TARGET_INFO
  NTLMSSP_NEGOTIATE_VERSION
  NTLMSSP_NEGOTIATE_128
  NTLMSSP_NEGOTIATE_56
```

## URL List

- [Github.com - NTLM_Challenger](https://github.com/b17zr/ntlm_challenger)
