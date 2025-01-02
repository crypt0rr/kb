---
title : "Mimikatz"
# pre : ' '
description : "Is a tool I've made to learn C and make somes experiments with Windows security."
date : 2020-03-13T22:19:32+01:00
# hidden : true
# draft : true
weight : 220
tags : ['Framework', 'LSASS']
---

---

Is a tool I've made to learn C and make somes experiments with Windows security.

## Installation

Download newest release from [Github.com](https://github.com/gentilkiwi/mimikatz/releases)

## Usage

```plain
mimikatz.py [-h] [-file FILE] [-debug] [-hashes LMHASH:NTHASH]
            [-no-pass] [-k] [-aesKey hex key] [-dc-ip ip address]
            [-target-ip ip address]
            target
```

## Flags

```plain
Impacket v0.9.23.dev1+20210315.121412.a16198c3 - Copyright 2020 SecureAuth Corporation

SMB client implementation.

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

optional arguments:
  -h, --help            show this help message and exit
  -file FILE            input file with commands to execute in the mini shell
  -debug                Turn DEBUG output ON

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from
                        ccache file (KRB5CCNAME) based on target parameters.
                        If valid credentials cannot be found, it will use the
                        ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256
                        bits)

connection:
  -dc-ip ip address     IP Address of the domain controller. If omitted it
                        will use the domain part (FQDN) specified in the
                        target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will
                        use whatever was specified as target. This is useful
                        when target is the NetBIOS name and you cannot resolve
                        it
```

## Examples

### Dump all user hashes (on client system)

```plain
lsadump::dcsync /domain:example.local /all /csv
```

## URL List

- [GitHub.com - Mimikatz](https://github.com/gentilkiwi/mimikatz)
- [GitHub.com - Impacket](https://github.com/SecureAuthCorp/impacket/releases)
