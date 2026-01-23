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
netexec mssql [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--no-progress] [--log LOG] [--verbose | --debug] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
                     [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success]
                     [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--pfx-cert PFXCERT] [--pfx-base64 PFXB64]
                     [--pfx-pass PFXPASS] [--pem-cert PEMCERT] [--pem-key PEMKEY] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L [LIST_MODULES]] [--options] [-H HASH [HASH ...]] [--port PORT]
                     [--mssql-timeout MSSQL_TIMEOUT] [-q QUERY] [--database [NAME]] [-d DOMAIN | --local-auth] [--sam] [--lsa] [--no-output] [-x COMMAND | -X PS_COMMAND] [--force-ps32] [--obfs]
                     [--amsi-bypass FILE] [--clear-obfscripts] [--no-encode] [--put-file SRC_FILE DEST_FILE] [--get-file SRC_FILE DEST_FILE] [--rid-brute [MAX_RID]]
                     target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -H, --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           MSSQL port (default: 1433)
  --mssql-timeout MSSQL_TIMEOUT
                        SQL server connection timeout (default: 5)
  -q, --query QUERY     execute the specified query against the mssql db
  --database [NAME]     list databases or list tables for NAME
  -d DOMAIN             domain name
  --local-auth          authenticate locally to each target

Generic Options:
  --version             Display nxc version
  -t, --threads THREADS
                        set how many concurrent threads to use (default: 256)
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output Options:
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file
  --verbose             enable verbose output
  --debug               enable debug level information

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds (default: 3)

Authentication:
  -u, --username USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p, --password PASSWORD [PASSWORD ...]
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

Kerberos Authentication:
  -k, --kerberos        Use Kerberos authentication
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter

Certificate Authentication:
  --pfx-cert PFXCERT    Use certificate authentication from pfx file .pfx
  --pfx-base64 PFXB64   Use certificate authentication from pfx file encoded in base64
  --pfx-pass PFXPASS    Password of the pfx certificate
  --pem-cert PEMCERT    Use certificate authentication from PEM file
  --pem-key PEMKEY      Private key for the PEM format

Modules:
  -M, --module MODULE   module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules [LIST_MODULES]
                        list available modules
  --options             display module options

Credential Gathering:
  --sam                 dump SAM hashes from target systems
  --lsa                 dump LSA secrets from target systems

Command Execution:
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command

Powershell Options:
  --force-ps32          Force the PowerShell command to run in a 32-bit process via a job; WARNING: depends on the job completing quickly, so you may have to increase the timeout
  --obfs                Obfuscate PowerShell ran on target; WARNING: Defender will almost certainly trigger on this
  --amsi-bypass FILE    File with a custom AMSI bypass
  --clear-obfscripts    Clear all cached obfuscated PowerShell scripts
  --no-encode           Do not encode the PowerShell command ran on target

File Operations:
  --put-file SRC_FILE DEST_FILE
                        Put a local file into remote target, ex: whoami.txt C:\\Windows\\Temp\\whoami.txt
  --get-file SRC_FILE DEST_FILE
                        Get a remote file, ex: C:\\Windows\\Temp\\whoami.txt whoami.txt

Mapping/Enumeration:
  --rid-brute [MAX_RID]
                        enumerate users by bruteforcing RIDs
```

## Modules

```plain
[*] Initializing MSSQL protocol database
LOW PRIVILEGE MODULES

ENUMERATION
[*] enum_impersonate          Enumerate users with impersonation privileges
[*] enum_links                Enumerate linked SQL Servers and their login configurations.
[*] enum_logins               Enumerate SQL Server logins (SQL, Domain, Local users)

PRIVILEGE_ESCALATION
[*] enable_cmdshell           Enable or disable xp_cmdshell in MSSQL Server
[*] exec_on_link              Execute commands on a SQL Server linked server
[*] link_enable_cmdshell      Enable or disable xp_cmdshell on a linked MSSQL server
[*] link_xpcmd                Run xp_cmdshell commands on a linked SQL server
[*] mssql_coerce              Execute SQL commands To interact with a specified LISTENER for coercion/exfiltration
[*] mssql_priv                Enumerate and exploit MSSQL privileges

HIGH PRIVILEGE MODULES (requires admin privs)
ENUMERATION
[*] test_connection           Pings a host

CREDENTIAL_DUMPING
[*] nanodump                  Get lsass dump using nanodump and parse the result with pypykatz

PRIVILEGE_ESCALATION
[*] empire_exec               Uses Empire's RESTful API to generate a launcher for the specified listener and executes it
[*] met_inject                Downloads the Meterpreter stager and injects it into memory
[*] web_delivery              Kicks off a Metasploit Payload using the exploit/multi/script/web_delivery module
```
