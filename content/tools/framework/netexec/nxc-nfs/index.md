---
title : "NFS"
# pre : ' '
description : "Own stuff using NFS."
date : 2024-10-10T12:25:57+02:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec nfs [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--no-progress] [--log LOG] [--verbose | --debug] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
                   [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success]
                   [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--pfx-cert PFXCERT] [--pfx-base64 PFXB64]
                   [--pfx-pass PFXPASS] [--pem-cert PEMCERT] [--pem-key PEMKEY] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L [LIST_MODULES]] [--options] [--port PORT] [--nfs-timeout NFS_TIMEOUT]
                   [--share SHARE] [--shares] [--enum-shares [ENUM_SHARES]] [--ls [PATH]] [--get-file FILE FILE] [--put-file FILE FILE]
                   target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  --port PORT           NFS portmapper port (default: 111)
  --nfs-timeout NFS_TIMEOUT
                        NFS connection timeout (default: 5s)

Generic Options:
  --version             Display nxc version
  -t, --threads THREADS
                        set how many concurrent threads to use
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output Options:
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file
  --verbose             enable verbose output
  --debug               enable debug level information

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds

Authentication:
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

Kerberos Authentication:
  -k, --kerberos        Use Kerberos authentication
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter

Certificate Authentication:
  --pfx-cert PFXCERT    Use certificate authentication from pfx file .pfx
  --pfx-base64 PFXB64   Use certificate authentication from pfx file encoded in base64
  --pfx-pass PFXPASS    Password of the pfx certificate
  --pem-cert PEMCERT    Use certificate authentication from PEM file
  --pem-key PEMKEY      Private key for the PEM format

Modules:
  -M, --module MODULE   module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules [LIST_MODULES]
                        list available modules
  --options             display module options

NFS Mapping/Enumeration:
  --share SHARE         Specify a share, e.g. for --ls, --get-file, --put-file
  --shares              List NFS shares
  --enum-shares [ENUM_SHARES]
                        Authenticate and enumerate exposed shares recursively (default depth: 3)
  --ls [PATH]           List files in the specified NFS share. Example: --ls /
  --get-file FILE FILE  Download remote NFS file. Example: --get-file remote_file local_file
  --put-file FILE FILE  Upload remote NFS file with chmod 777 permissions to the specified folder. Example: --put-file local_file remote_file
```
