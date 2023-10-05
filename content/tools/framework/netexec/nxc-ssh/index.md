---
title : "SSH"
# pre : ' '
description : "Own stuff using SSH."
date : 2023-10-05T12:26:49+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'SSH']
---

## NetExec - SSH

## Installation

Install [NetExec]({{< ref "../" >}}).

## Usage

```plain
nxc ssh [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
               [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
               [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [--key-file KEY_FILE] [--port PORT] [--no-output] [-x COMMAND] [--remote-enum]
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
  --key-file KEY_FILE   Authenticate using the specified private key. Treats the password parameter as the key's passphrase.
  --port PORT           SSH port (default: 22)

Command Execution:
  Options for executing commands

  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  --remote-enum         executes remote commands for enumeration
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

{{%attachments fa_icon_class="far fa-file" pattern=".*(txt)"%}}

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
