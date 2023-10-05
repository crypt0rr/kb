---
title : "RDP"
# pre : ' '
description : "Own stuff using RDP."
date : 2023-10-05T12:27:02+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'RDP']
---

## NetExec - RDP

## Installation

Install [NetExec]({{< ref "../" >}}).

## Usage

```plain
nxc rdp [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
               [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
               [--server {https,http}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port PORT] [--rdp-timeout RDP_TIMEOUT] [--nla-screenshot] [-d DOMAIN | --local-auth]
               [--screenshot] [--screentime SCREENTIME] [--res RES]
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
  --port PORT           Custom RDP port
  --rdp-timeout RDP_TIMEOUT
                        RDP timeout on socket connection, defalut is 5s
  --nla-screenshot      Screenshot RDP login prompt if NLA is disabled
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Screenshot:
  Remote Desktop Screenshot

  --screenshot          Screenshot RDP if connection success
  --screentime SCREENTIME
                        Time to wait for desktop image, default is 10s
  --res RES             Resolution in "WIDTHxHEIGHT" format. Default: "1024x768"
```

## Examples

**NOTE:** By default NXC will exit after a successful login is found. Using the `--continue-on-success` flag will continue spraying even after a valid password is found. Useful for spraying a single password against a large user list.

### Login Checking

```plain
nxc rdp 100.120.137.0/24 -u user -p password
```

```plain
$ nxc rdp 100.120.137.43 -u crypt0rr -p Welkom1234   
RDP         100.120.137.43  3389   DC01             [*] Windows 10 or Windows Server 2016 Build 20348 (name:DC01) (domain:offsec.nl) (nla:True)
RDP         100.120.137.43  3389   DC01             [+] offsec.nl\crypt0rr:Welkom1234 
```
