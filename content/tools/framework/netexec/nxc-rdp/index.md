---
title : "RDP"
# pre : ' '
description : "Own stuff using RDP."
date : 2023-10-05T12:27:02+02:00
# hidden : true
# draft : true
weight : 50
tags : ['Framework', 'RDP']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec rdp [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT]
                   [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT]
                   [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--pfx-cert PFXCERT] [--pfx-base64 PFXB64] [--pfx-pass PFXPASS] [--pem-cert PEMCERT] [--pem-key PEMKEY]
                   [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L [LIST_MODULES]] [--options] [-H HASH [HASH ...]] [--port PORT] [--rdp-timeout RDP_TIMEOUT] [--nla-screenshot] [-d DOMAIN | --local-auth]
                   [--screenshot] [--screentime SCREENTIME] [--res RES] [-x COMMAND] [-X PS_COMMAND] [--cmd-delay CMD_DELAY] [--clipboard-delay CLIPBOARD_DELAY] [--no-output]
                   target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -H, --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           RDP port (default: 3389)
  --rdp-timeout RDP_TIMEOUT
                        RDP timeout on socket connection (default: 5)
  --nla-screenshot      Screenshot RDP login prompt if NLA is disabled
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Generic:
  Generic options for nxc across protocols

  --version             Display nxc version
  -t, --threads THREADS
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

  -u, --username USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p, --password PASSWORD [PASSWORD ...]
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

Certificate:
  Options for certificate authentication

  --pfx-cert PFXCERT    Use certificate authentication from pfx file .pfx
  --pfx-base64 PFXB64   Use certificate authentication from pfx file encoded in base64
  --pfx-pass PFXPASS    Password of the pfx certificate
  --pem-cert PEMCERT    Use certificate authentication from PEM file
  --pem-key PEMKEY      Private key for the PEM format

Modules:
  Options for nxc modules

  -M, --module MODULE   module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules [LIST_MODULES]
                        list available modules
  --options             display module options

Screenshot:
  Remote Desktop Screenshot

  --screenshot          Screenshot RDP if connection success
  --screentime SCREENTIME
                        Time to wait for desktop image (default: 10)
  --res RES             Resolution in WIDTHxHEIGHT format (default: 1024x768)

Command Execution:
  Options for executing commands

  -x COMMAND            execute the specified command
  -X PS_COMMAND         execute the specified PowerShell command
  --cmd-delay CMD_DELAY
                        Sleep time before executing command (default: 5)
  --clipboard-delay CLIPBOARD_DELAY
                        Maximum time to wait for clipboard initialization (seconds) (default: 30)
  --no-output           do not retrieve command output
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
