---
title : "MSSQL"
# pre : ' '
description : "Own stuff using MSSQL"
date : 2022-02-14T15:23:07+01:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme mssql [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
                [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {http,https}] [--server-host HOST]
                [--server-port PORT] [--connectback-host CHOST] [-d DOMAIN | --local-auth] [-H HASH [HASH ...]] [--port PORT] [-q QUERY] [--force-ps32] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs]
                [--clear-obfscripts] [--put-file FILE FILE] [--get-file FILE FILE]
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
  --server {http,https}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to (default: same as server-host)
  -d DOMAIN             domain name
  --local-auth          authenticate locally to each target
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           MSSQL port (default: 1433)
  -q QUERY, --query QUERY
                        execute the specified query against the MSSQL DB

Command Execution:
  options for executing commands

  --force-ps32          force the PowerShell command to run in a 32-bit process
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Obfuscation:
  Options for PowerShell script obfuscation

  --obfs                Obfuscate PowerShell scripts
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts

Files:
  Options for put and get remote files

  --put-file FILE FILE  Put a local file into remote target, ex: whoami.txt C:\Windows\Temp\whoami.txt
  --get-file FILE FILE  Get a remote file, ex: C:\Windows\Temp\whoami.txt whoami.txt
```

### Modules

The modules below can be used with the `-M` option.

```plain
[*] Get-ComputerDetails       Enumerates sysinfo
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] enum_chrome               Decrypts saved Chrome passwords using Get-ChromeDump
[*] get_keystrokes            Logs keys pressed, time and the active window
[*] get_netdomaincontroller   Enumerates all domain controllers
[*] get_netrdpsession         Enumerates all active RDP sessions
[*] get_timedscreenshot       Takes screenshots at a regular interval
[*] invoke_sessiongopher      Digs up saved session information for PuTTY, WinSCP, FileZilla, SuperPuTTY, and RDP using SessionGopher
[*] invoke_vnc                Injects a VNC client in memory
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] mimikatz                  Dumps all logon credentials from memory
[*] mimikatz_enum_chrome      Decrypts saved Chrome passwords using Mimikatz
[*] mimikatz_enum_vault_creds Decrypts saved credentials in Windows Vault/Credential Manager
[*] mimikittenz               Executes Mimikittenz
[*] mssql_priv                Enumerate and exploit MSSQL privileges
[*] multirdp                  Patches terminal services in memory to allow multiple RDP users
[*] netripper                 Capture's credentials by using API hooking
[*] pe_inject                 Downloads the specified DLL/EXE and injects it into memory
[*] rid_hijack                Executes the RID hijacking persistence hook.
[*] shellcode_inject          Downloads the specified raw shellcode and injects it into memory
[*] test_connection           Pings a host
[*] tokens                    Enumerates available tokens
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
```

## Examples

```plain

```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
