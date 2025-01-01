---
title : "ADReaper"
# pre : ' '
description : "A fast enumeration tool for Windows Active Directory Pentesting written in Go."
date : 2022-04-25T09:28:30+02:00
# hidden : true
# draft : true
weight : 60
tags : ['Other', 'Active Directory']
---

---

`ADReaper` is a tool written in Golang which enumerate a Active Directory environment with LDAP queries within few seconds

## Installation

You can download precompiled executable binaries for Windows/Linux from [latest releases](https://github.com/AidenPearce369/ADReaper/releases/tag/ADReaper).

To build from source, clone the repo and build it with GO

```plain
git clone https://github.com/AidenPearce369/ADReaper
cd ADReaper/
go build
```

## Usage

```plain
./ADReaper
```

## Flags

```plain
  -command string
        Command to run
    
                users           - to list all users
                user-logs       - to list user session activities
                never-loggedon  - to list users never logged on
                groups          - to list all groups with members
                computers       - to list all computers
                dc              - to list domain controllers
                gpo             - to list group policy objects
                spn             - to list service principal objects
                admin-priv      - to list AD objects with admin privilege
                domain-trust    - to list domain trust
                ou              - to list organizational units
                ms-sql          - to list MS-SQL servers
    
  -dc string
        Enter the DC
  -password string
        Enter the Password
  -user string
        Enter the Username
```

## Examples

### List domain controllers

```plain
$ ./ADReaper -command dc -dc SRV2019.offsec.nl -password Welkom1234 -user johndo@offsec.nl
+--------------------------------------------------------------------------------------------+
| DOMAIN CONTROLLERS                                                                         |
+--------------------------------------------------------------------------------------------+
| Distinguished Name (DN) : CN=SRV2019,OU=Domain Controllers,DC=offsec,DC=nl                 |
| SAM Account Name : SRV2019$                                                                |
| Common Name (CN) : SRV2019                                                                 |
| Logon Count : 99                                                                           |
| DNS Host Name : SRV2019.offsec.nl                                                          |
| Service Principal Name (SPN) : Dfsr-12F9A27C-BF97-4787-9364-D31B6C55EB04/SRV2019.offsec.nl |
| Operating System : Windows Server 2019 Standard                                            |
| Operating System Version : 10.0 (17763)                                                    |
| UAC Flag : SERVER_TRUST_ACCOUNT,TRUSTED_FOR_DELEGATION                                     |
| Object GUID : 6c808bd9-f8e4-4587-9e9d-539ff59b3346                                         |
| Object SID : S-1-5-21-3509477529-2169914037-1395257886-1000                                |
+--------------------------------------------------------------------------------------------+
| Distinguished Name (DN) : CN=SRV2022,OU=Domain Controllers,DC=offsec,DC=nl                 |
| SAM Account Name : SRV2022$                                                                |
| Common Name (CN) : SRV2022                                                                 |
| Logon Count : 34                                                                           |
| DNS Host Name : SRV2022.offsec.nl                                                          |
| Service Principal Name (SPN) : HOST/SRV2022.offsec.nl/OFFSEC                               |
| Operating System : Windows Server 2022 Standard                                            |
| Operating System Version : 10.0 (20348)                                                    |
| UAC Flag : SERVER_TRUST_ACCOUNT,TRUSTED_FOR_DELEGATION                                     |
| Object GUID : 492c1af5-48ab-4f3c-9bd0-cc1d658be070                                         |
| Object SID : S-1-5-21-3509477529-2169914037-1395257886-4188                                |
+--------------------------------------------------------------------------------------------+
```

### List all Computers

```plain
$ ./ADReaper -command computers -dc SRV2019.offsec.nl -password Welkom1234 -user johndo@offsec.nl
+--------------------------------------------------------------------------------------------------+
| COMPUTERS                                                                                        |
+--------------------------------------------------------------------------------------------------+
| Distinguished Name (DN) : CN=SRV2019,OU=Domain Controllers,DC=offsec,DC=nl                       |
| SAM Account Name : SRV2019$                                                                      |
| Common Name (CN) : SRV2019                                                                       |
| DNS Host Name : SRV2019.offsec.nl                                                                |
| Service Principal Name (SPN) : Dfsr-12F9A27C-BF97-4787-9364-D31B6C55EB04/SRV2019.offsec.nl       |
| Operating System : Windows Server 2019 Standard                                                  |
| Operating System Version : 10.0 (17763)                                                          |
| UAC Flag : SERVER_TRUST_ACCOUNT,TRUSTED_FOR_DELEGATION                                           |
| Object GUID : 6c808bd9-f8e4-4587-9e9d-539ff59b3346                                               |
| Object SID : S-1-5-21-3509477529-2169914037-1395257886-1000                                      |
+--------------------------------------------------------------------------------------------------+
| Distinguished Name (DN) : CN=FINWDBAS1000000,OU=OGC,OU=Stage,DC=offsec,DC=nl                     |
| SAM Account Name : FINWDBAS1000000$                                                              |
| Common Name (CN) : FINWDBAS1000000                                                               |
[...]
```

### List all users

```plain
$ ./ADReaper -command users -dc SRV2019.offsec.nl -password Welkom1234 -user johndo@offsec.nl
+-------------------------+
| USERS                   |
+-------------------------+
|  - Administrator        |
|  - Guest                |
|  - SRV2019$             |
|  - krbtgt               |
|  - MARSHALL_FRANKS      |
|  - JAMES_VAUGHAN        |
|  - WARD_CONTRERAS       |
|  - EDDY_MILES           |
|  - ANDREW_VASQUEZ       |
|  - ULYSSES_COTE         |
|  - RICKIE_WEAVER        |
|  - SALLIE_SHANNON       |
|  - AUBREY_WISE          |
|  - MARCY_TANNER         |
|  - CHARLEY_KLEIN        |
[...]
```

## URL List

- [Github.com - ADReaper](https://github.com/AidenPearce369/ADReaper)
