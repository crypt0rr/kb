---
title : "SMB"
# pre : ' '
description : "Own stuff using SMB."
date : 2023-10-05T12:25:10+02:00
# hidden : true
draft : true
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

## Examples

```plain

```
