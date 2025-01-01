---
title : "LDAP Nom Nom"
# pre : ' '
description : "Anonymously bruteforce Active Directory usernames from Domain Controllers by abusing LDAP Ping requests (cLDAP)."
date : 2022-09-20T10:42:03+02:00
# hidden : true
# draft : true
weight : 1030
tags : ['Other', 'LDAP', 'Active Directory']
---

---

Anonymously bruteforce Active Directory usernames from Domain Controllers by abusing LDAP Ping requests (cLDAP)

**No** Windows audit logs generated. High speed ~ up to 10K usernames tested per second.

- Tries to autodetect DC from environment variables on domain joined machines or falls back to machine hostname FDQN DNS suffix
- Reads usernames to test from stdin (default) or file
- Outputs to stdout (default) or file
- Parallelized (defaults to 8 connections)
- Shows progressbar if you're using both input and output files

### Username lists

- [Common-AD-Usernames](https://github.com/crypt0rr/common-ad-usernames)
- [SecLists](https://github.com/danielmiessler/SecLists/tree/master/Usernames)

## Installation

```plain
go install github.com/lkarlslund/ldapnomnom@latest
```

## Usage

```plain
ldapnomnom [--server ipaddress] [--port number] [--tlsmode notls|tls|starttls] [--input filename] [--output filename [--progressbar]] [--parallel number-of-connections]
```

## Flags

```plain
  -dnsdomain string
        Domain to connect to in DNS suffix format - will try autodection if not supplied
  -ignorecert
        Disable certificate checks (default true)
  -input string
        File to read usernames from, uses stdin if not supplied
  -output string
        File to write detected usernames to, uses stdout if not supplied
  -parallel int
        How many connections to run in parallel (default 8)
  -port int
        LDAP port to connect to (389 or 636 typical) (default 389)
  -server string
        DC to connect to, use IP or full hostname - will try autodection if not supplied
  -tlsmode string
        Transport mode (TLS, StartTLS, NoTLS) (default "NoTLS")
```

## Examples

```plain
ldapnomnom --input 10m_usernames.txt --output results.txt --server 192.168.0.11 --parallel 16
```

## URL List

- [Github.com * LDAP Nom Nom](https://github.com/lkarlslund/ldapnomnom)
