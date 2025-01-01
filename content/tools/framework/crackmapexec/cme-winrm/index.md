---
title : "WinRM"
# pre : ' '
description : "Own stuff using WinRM."
date : 2022-02-14T15:22:55+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme winrm [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
                 [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {http,https}] [--server-host HOST]
                 [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port PORT] [--ssl] [--ignore-ssl-cert] [--laps [LAPS]] [--http-timeout HTTP_TIMEOUT] [-d DOMAIN | --local-auth] [--sam | --lsa]
                 [--no-output] [-x COMMAND] [-X PS_COMMAND]
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
  --server {http,https}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to (default: same as server-host)
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           Custom WinRM port
  --ssl                 Connect to SSL Enabled WINRM
  --ignore-ssl-cert     Ignore Certificate Verification
  --laps [LAPS]         LAPS authentification
  --http-timeout HTTP_TIMEOUT
                        HTTP timeout for WinRM connections
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Credential Gathering:
  Options for gathering credentials

  --sam                 dump SAM hashes from target systems
  --lsa                 dump LSA secrets from target systems

Command Execution:
  Options for executing commands

  --no-output           do not retrieve command output
  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command
```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
