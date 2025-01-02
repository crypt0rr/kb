---
title : "addcomputer.py"
# pre : ' '
description : "Adds a computer account to domain."
date : 2023-06-19T08:57:18+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Adds a computer account to domain.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
addcomputer.py [-h] [-domain-netbios NETBIOSNAME] [-computer-name COMPUTER-NAME$] [-computer-pass password] [-no-add] [-delete] [-debug] [-method {SAMR,LDAPS}] [-port {139,445,636}] [-baseDN DC=test,DC=local]
                      [-computer-group CN=Computers,DC=test,DC=local] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-dc-host hostname] [-dc-ip ip]
                      [domain/]username[:password]
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  [domain/]username[:password]
                        Account used to authenticate to DC.

options:
  -h, --help            show this help message and exit
  -domain-netbios NETBIOSNAME
                        Domain NetBIOS name. Required if the DC has multiple domains.
  -computer-name COMPUTER-NAME$
                        Name of computer to add.If omitted, a random DESKTOP-[A-Z0-9]{8} will be used.
  -computer-pass password
                        Password to set to computerIf omitted, a random [A-Za-z0-9]{32} will be used.
  -no-add               Don't add a computer, only set password on existing one.
  -delete               Delete an existing computer.
  -debug                Turn DEBUG output ON
  -method {SAMR,LDAPS}  Method of adding the computer.SAMR works over SMB.LDAPS has some certificate requirementsand isn't always available.
  -port {139,445,636}   Destination port to connect to. SAMR defaults to 445, LDAPS to 636.

LDAP:
  -baseDN DC=test,DC=local
                        Set baseDN for LDAP.If ommited, the domain part (FQDN) specified in the account parameter will be used.
  -computer-group CN=Computers,DC=test,DC=local
                        Group to which the account will be added.If omitted, CN=Computers will be used,

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on account parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -dc-host hostname     Hostname of the domain controller to use. If ommited, the domain part (FQDN) specified in the account parameter will be used
  -dc-ip ip             IP of the domain controller to use. Useful if you can't translate the FQDN.specified in the account parameter will be used
```

## Examples

```plain
$ addcomputer.py -computer-name 'MYNEWCOMPUTERACCOUNT$' -computer-pass 'SANImpersonation' -dc-host 10.10.10.1 -domain-netbios offsec.nl 'offsec.nl/lowprivuser:Welcome1234!'
Impacket v0.10.1.dev1+20230316.112532.f0ac44b - Copyright 2022 Fortra

[*] Successfully added machine account MYNEWCOMPUTERACCOUNT$ with password SANImpersonation.
```

## URL list

- [Github.com - addcomputer.py](https://github.com/fortra/impacket/blob/master/examples/addcomputer.py)
