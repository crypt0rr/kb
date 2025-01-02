---
title : "FTP"
# pre : ' '
description : "Own stuff using FTP."
date : 2022-10-11T09:53:15+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme ftp [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
               [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {https,http}] [--server-host HOST]
               [--server-port PORT] [--connectback-host CHOST] [--port PORT] [--ls]
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
  --port PORT           FTP port (default: 21)

FTP Access:
  Options for enumerating your access

  --ls                  List files in the directory
```

## Examples

### Validation of anonymous login

```plain
$ cme ftp 194.244.111.113 -u anonymous -p anonymous
FTP         194.244.111.113 21     194.244.111.113  [*] Banner: 194.244.111.113 FTP server ready
FTP         194.244.111.113 21     194.244.111.113  [+] anonymous:anonymous
```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
