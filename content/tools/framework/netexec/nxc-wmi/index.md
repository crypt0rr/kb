---
title : "WMI"
# pre : ' '
description : "Own stuff using WMI."
date : 2023-10-05T12:26:45+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'WMI']
---

## NetExec - WMI

## Installation

Install [NetExec]({{< ref "../" >}}).

## Usage

```plain
nxc wmi [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
               [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
               [--server {https,http}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port {135}] [--rpc-timeout RPC_TIMEOUT] [-d DOMAIN | --local-auth] [--wmi QUERY]
               [--wmi-namespace NAMESPACE] [--no-output] [-x COMMAND] [--exec-method {wmiexec-event,wmiexec}] [--exec-timeout exec_timeout] [--codec CODEC]
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
  --port {135}          WMI port (default: 135)
  --rpc-timeout RPC_TIMEOUT
                        RPC/DCOM(WMI) connection timeout, default is 2 secondes
  -d DOMAIN             Domain to authenticate to
  --local-auth          Authenticate locally to each target

Mapping/Enumeration:
  Options for Mapping/Enumerating

  --wmi QUERY           Issues the specified WMI query
  --wmi-namespace NAMESPACE
                        WMI Namespace (default: root\cimv2)

Command Execution:
  Options for executing commands

  --no-output           do not retrieve command output
  -x COMMAND            Creates a new cmd process and executes the specified command with output
  --exec-method {wmiexec-event,wmiexec}
                        method to execute the command. (default: wmiexec). [wmiexec (win32_process + StdRegProv)]: get command results over registry instead of using smb connection. [wmiexec-event (T1546.003)]: this
                        method is not very stable, highly recommend use this method in single host, using on multiple hosts may crash (just try again if it crashed).
  --exec-timeout exec_timeout
                        Set timeout (in seconds) when executing a command, minimum 5 seconds is recommended. Default: 5
  --codec CODEC         Set encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute again with --codec and the corresponding codec
```
