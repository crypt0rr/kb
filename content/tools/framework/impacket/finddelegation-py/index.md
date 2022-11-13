---
title : "FindDelegation.py"
# pre : ' '
description : "Queries target domain for delegation relationships."
date : 2022-02-14T12:20:35+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## FindDelegation.py

Queries target domain for delegation relationships.

## Installation

Install the [Impacket Framework]({{< ref "../" >}})

## Usage

```plain
findDelegation.py [-h] [-target-domain TARGET_DOMAIN] [-debug] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-dc-ip ip address] target
```

## Flags

```plain
Impacket v0.9.25.dev1+20220201.191645.d8679837 - Copyright 2021 SecureAuth Corporation

Queries target domain for delegation relationships

positional arguments:
  target                domain/username[:password]

options:
  -h, --help            show this help message and exit
  -target-domain TARGET_DOMAIN
                        Domain to query/request if different than the domain of the user. Allows for retrieving delegation info across trusts.
  -debug                Turn DEBUG output ON

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in
                        the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter. Ignoredif -target-domain is specified.
```

## Examples

```plain
$ findDelegation.py offsec.nl/normal-user:'Welkom1234'
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

AccountName     AccountType     DelegationType                  DelegationRightsTo
-----------     -----------     --------------------------      ------------------
janedo          Person          Resource-Based Constrained      SRV01$
```

## URL List

* [Github.com](https://github.com/SecureAuthCorp/impacket)
