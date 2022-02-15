---
title : "SSH"
# pre : ' '
description : "Own stuff using SSH."
date : 2022-02-14T15:23:02+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## CrackMapExec - SSH

### Installation

Install the [CrackMapExec]({{< ref "../" >}})

### Usage

```plain
cme ssh [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--export EXPORT [EXPORT ...]] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST]
               [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {http,https}] [--server-host HOST]
               [--server-port PORT] [--connectback-host CHOST] [--no-bruteforce] [--key-file KEY_FILE] [--port PORT] [--continue-on-success] [--no-output] [-x COMMAND]
               [target ...]
```

### Flags

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
  -k, --kerberos        Use Kerberos authentication from ccache file (KRB5CCNAME)
  --export EXPORT [EXPORT ...]
                        Export result into a file, probably buggy
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
  --no-bruteforce       No spray when using file for username and password (user1 => password1, user2 => password2
  --key-file KEY_FILE   Authenticate using the specified private key. Treats the password parameter as the key's passphrase.
  --port PORT           SSH port (default: 22)
  --continue-on-success
                        continues authentication attempts even after successes

Command Execution:
  Options for executing commands

  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
```

### Modules

The modules below can be used with the `-M` option.

```plain
[*] mimipenguin               Dumps cleartext credentials in memory
```

### Examples

#### Checking SSH available

```plain
$ cme ssh 10.10.10.1
SSH         10.10.10.1      22     10.10.10.1       [*] SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4
```

### URL list

* [GitHub.com - CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec/)
