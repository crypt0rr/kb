---
title : "LDAPmonitor"
# pre : ' '
description : "Monitor creation, deletion and changes to LDAP objects live during your pentest or system administration! With this tool you can quickly see if your attack worked and if it changed LDAP attributes of the target object."
date : 2021-10-27T12:44:43+02:00
# hidden : true
# draft : true
weight : 1000
tags : ['Other', 'LDAP', 'Active Directory']
---

---

Monitor creation, deletion and changes to LDAP objects live during your pentest or system administration!

With this tool you can quickly see if your attack worked and if it changed LDAP attributes of the target object.

## Features

| Feature | [Python (.py)](./python/) | [CSharp (.exe)](./csharp/) | [Powershell (.ps1)](./powershell/) |
|---------|--------|--------|------------|
| LDAPS support                                    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Random delay in seconds between queries          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Custom delay in seconds between queries          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Save output to logfile                           | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Colored or not colored output with `--no-colors` | :heavy_check_mark: | :x: | :x: |
| Custom page size for paged queries               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Authenticate with user and password              | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Authenticate as current shell user               | :x: | :heavy_check_mark: | :heavy_check_mark: |
| Authenticate with LM:NT hashes                   | :heavy_check_mark: | :x: | :x: |
| Authenticate with kerberos tickets               | :heavy_check_mark: | :x: | :x: |
| Option to ignore user logon events               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## Installation

{{%resources fa_icon_class="far fa-file-code" pattern=".*(exe|ps1|py)"/%}}

```plain
git clone https://github.com/p0dalirius/LDAPmonitor.git
```

## Usage

### Python

```plain
./ldapmonitor.py -d 'LAB.local' -u 'user1' -p 'Welkom1234!' --dc-ip 10.10.10.10
```

### PowerShell

```plain
ldapmonitor.exe /dcip:10.10.10.10 /user:LAB\user1 /pass:Welkom1234!
```

## Examples

```plain
$ ./pyLDAPmonitor.py -d 'offsec.nl' -u 'JOHNDO' -p 'Welkom1234!' --dc-ip 10.10.10.10
[+]======================================================
[+]    LDAP live monitor v1.1        @podalirius_        
[+]======================================================

[>] Trying to connect to 10.10.10.10 ...
[>] Listening for LDAP changes ...
[2021-10-27 12:49:17] DC=OFFSEC,DC=nl

[2021-10-27 12:49:17] CN=Administrator,CN=Users,DC=OFFSEC,DC=nl
 | Attribute "lastLogon" changed from '2021-10-27 10:48:09.027786+00:00' to '2021-10-27 10:49:09.047533+00:00'
[2021-10-27 12:49:17] CN=JaneDo, W.,OU=DC Groningen,OU=NL Groningen,DC=OFFSEC,DC=nl
 | Attribute "lastLogon" changed from '2021-10-27 10:47:44.354975+00:00' to '2021-10-27 10:49:26.346279+00:00'
 | Attribute "logonCount" changed from '6489' to '6490'
[2021-10-27 12:49:17] CN=DCU01DC,OU=Special Servers,DC=OFFSEC,DC=nl
 | Attribute "lastLogon" changed from '2021-10-27 10:49:05.407049+00:00' to '2021-10-27 10:49:47.069838+00:00'
[2021-10-27 12:49:17] CN=PC02,OU=Windows 10 Machines XG,OU=nlputers,OU=NL Groningen,DC=OFFSEC,DC=nl
 | Attribute "lastLogon" changed from '2021-10-27 10:15:39.982048+00:00' to '2021-10-27 10:49:48.007343+00:00'
[2021-10-27 12:49:17] CN=VMWARE-ESX,OU=Special Accounts and Groups,OU=NL Management,DC=OFFSEC,DC=nl
 | Attribute "lastLogon" changed from '2021-10-27 10:48:58.218666+00:00' to '2021-10-27 10:50:03.056452+00:00'
 | Attribute "uSNChanged" changed from '238359212' to '238360709'
```

## URL List

- [Github.com - LDAPmonitor](https://github.com/p0dalirius/LDAPmonitor)
- [Podalirius.net](https://podalirius.net/)
