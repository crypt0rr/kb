---
title : "MSSQL"
# pre : ' '
description : "Owning stuff using MSSQL."
date : 2023-10-05T12:26:41+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'MSSQL']
---

## NetExec - MSSQL

## Installation

Install [NetExec]({{< ref "netexec" >}}).

## Usage

```plain
nxc mssql [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
                 [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                 [--server {https,http}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port PORT] [-q QUERY] [--no-smb] [-d DOMAIN | --local-auth] [--force-ps32]
                 [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--clear-obfscripts] [--put-file FILE FILE] [--get-file FILE FILE]
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
  --server {https,http}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to (default: same as server-host)
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           MSSQL port (default: 1433)
  -q QUERY, --query QUERY
                        execute the specified query against the MSSQL DB
  --no-smb              No smb connection
  -d DOMAIN             domain name
  --local-auth          authenticate locally to each target

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

## Modules

```plain
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] mssql_priv                Enumerate and exploit MSSQL privileges
[*] nanodump                  Get lsass dump using nanodump and parse the result with pypykatz
[*] test_connection           Pings a host
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
```
