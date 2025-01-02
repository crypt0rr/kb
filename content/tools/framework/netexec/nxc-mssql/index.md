---
title : "MSSQL"
# pre : ' '
description : "Owning stuff using MSSQL."
date : 2023-10-05T12:26:41+02:00
# hidden : true
# draft : true
weight : 30
tags : ['Framework', 'MSSQL']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec mssql [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]]
                     [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache]
                     [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                     [-H HASH [HASH ...]] [--port PORT] [--mssql-timeout MSSQL_TIMEOUT] [-q QUERY] [-d DOMAIN | --local-auth] [--no-output] [-x COMMAND | -X PS_COMMAND] [--force-ps32] [--obfs] [--amsi-bypass FILE]
                     [--clear-obfscripts] [--no-encode] [--put-file SRC_FILE DEST_FILE] [--get-file SRC_FILE DEST_FILE]
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
  --port PORT           MSSQL port (default: 1433)
  --mssql-timeout MSSQL_TIMEOUT
                        SQL server connection timeout (default: 5)
  -q QUERY, --query QUERY
                        execute the specified query against the MSSQL DB
  -d DOMAIN             domain name
  --local-auth          authenticate locally to each target

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

Command Execution:
  options for executing commands

  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Options:
  Options for PowerShell execution

  --force-ps32          Force the PowerShell command to run in a 32-bit process via a job; WARNING: depends on the job completing quickly, so you may have to increase the timeout
  --obfs                Obfuscate PowerShell ran on target; WARNING: Defender will almost certainly trigger on this
  --amsi-bypass FILE    File with a custom AMSI bypass
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts
  --no-encode           Do not encode the PowerShell command ran on target

Files:
  Options for put and get remote files

  --put-file SRC_FILE DEST_FILE
                        Put a local file into remote target, ex: whoami.txt C:\\Windows\\Temp\\whoami.txt
  --get-file SRC_FILE DEST_FILE
                        Get a remote file, ex: C:\\Windows\\Temp\\whoami.txt whoami.txt
```

## Modules

```plain
LOW PRIVILEGE MODULES
[*] mssql_priv                Enumerate and exploit MSSQL privileges

HIGH PRIVILEGE MODULES (requires admin privs)
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] nanodump                  Get lsass dump using nanodump and parse the result with pypykatz
[*] test_connection           Pings a host
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
```
