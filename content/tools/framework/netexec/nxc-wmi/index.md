---
title : "WMI"
# pre : ' '
description : "Own stuff using WMI."
date : 2023-10-05T12:26:45+02:00
# hidden : true
# draft : true
weight : 100
tags : ['Framework', 'WMI']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec wmi [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]]
                   [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache]
                   [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                   [-H HASH [HASH ...]] [--port {135}] [--rpc-timeout RPC_TIMEOUT] [-d DOMAIN | --local-auth] [--wmi QUERY] [--wmi-namespace NAMESPACE] [--no-output] [-x COMMAND] [--exec-method {wmiexec-event,wmiexec}]
                   [--exec-timeout exec_timeout] [--codec CODEC]
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
  --port {135}          WMI port (default: 135)
  --rpc-timeout RPC_TIMEOUT
                        RPC/DCOM(WMI) connection timeout, default is 2 seconds
  -d DOMAIN             Domain to authenticate to
  --local-auth          Authenticate locally to each target

Generic:
  Generic options for nxc across protocols

  -t THREADS, --threads THREADS
                        set how many concurrent threads to use
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
                        DNS query timeout in seconds

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
                        use the selected server
  --server-host HOST    IP to bind the server to
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
                        method to execute the command. (default: wmiexec). [wmiexec (win32_process + StdRegProv)]: get command results over registry instead of using smb connection. [wmiexec-event (T1546.003)]: this method is not
                        very stable, highly recommend use this method in single host, using on multiple hosts may crash (just try again if it crashed).
  --exec-timeout exec_timeout
                        Set timeout (in seconds) when executing a command, minimum 5 seconds is recommended. Default: 5
  --codec CODEC         Set encoding used (codec) from the target's output (default: utf-8). If errors are detected, run chcp.com at the target & map the result with https://docs.python.org/3/library/codecs.html#standard-encodings
                        and then execute again with --codec and the corresponding codec
```

### Modules

#### LOW PRIVILEGE MODULES

```plain
[*] ioxidresolver             This module helps you to identify hosts that have additional active interfaces
[*] spooler                   Detect if print spooler is enabled or not
[*] zerologon                 Module to check if the DC is vulnerable to Zerologon aka CVE-2020-1472
```

#### HIGH PRIVILEGE MODULES (requires admin privs)

```plain
[*] bitlocker                 Enumerating BitLocker Status on target(s) If it is enabled or disabled.
[*] enum_dns                  Uses WMI to dump DNS from an AD DNS Server
[*] get_netconnections        Uses WMI to query network connections.
[*] rdp                       Enables/Disables RDP
```
