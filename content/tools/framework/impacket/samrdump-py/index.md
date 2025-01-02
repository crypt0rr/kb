---
title : "samrdump.py"
# pre : ' '
description : "This script downloads the list of users for the target system."
date : 2022-02-14T11:56:25+01:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

This script downloads the list of users for the target system.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
samrdump.py [-h] [-csv] [-ts] [-debug] [-dc-ip ip address] [-target-ip ip address] [-port [destination port]] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] target
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit
  -csv                  Turn CSV output
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON

connection:
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If ommited it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -port [destination port]
                        Destination port to connect to SMB Server

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
```

## Examples

```plain
$ samrdump.py offsec.nl/johndo-adm:Welkom1234@10.10.10.10

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[*] Retrieving endpoint list from 10.10.10.16
Found domain(s):
 . OFFSEC
 . Builtin
[*] Looking up users in domain OFFSEC
Found user: Administrator, uid = 500
Found user: Guest, uid = 501
Found user: krbtgt, uid = 502
Found user: johndo, uid = 1107
Found user: adm_johndo, uid = 1108
Found user: janedo, uid = 1110
Found user: tokio, uid = 1111
Found user: lisboa, uid = 1112
Found user: professor, uid = 1113
Found user: nairobi, uid = 1114
Found user: helsinki, uid = 1115
Administrator (500)/FullName:
Administrator (500)/UserComment:
Administrator (500)/PrimaryGroupId: 513
Administrator (500)/BadPasswordCount: 0
Administrator (500)/LogonCount: 24
Administrator (500)/PasswordLastSet: 2020-03-18 10:55:43.427441
Administrator (500)/PasswordDoesNotExpire: False
Administrator (500)/AccountIsDisabled: False
Administrator (500)/ScriptPath
[...]
```

## URL List

- [Github.com - samrdump.py](https://github.com/fortra/impacket/blob/master/examples/samrdump.py)
