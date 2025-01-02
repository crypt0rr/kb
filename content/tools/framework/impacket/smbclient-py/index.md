---
title : "smbclient.py"
# pre : ' '
description : "SMB client implementation."
date : 2022-02-14T14:52:24+01:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
smbclient.py [-h] [-inputfile INPUTFILE] [-outputfile OUTPUTFILE] [-debug] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-dc-ip ip address] [-target-ip ip address] [-port [destination port]] target
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit
  -inputfile INPUTFILE  input file with commands to execute in the mini shell
  -outputfile OUTPUTFILE
                        Output file to log smbclient actions in
  -debug                Turn DEBUG output ON

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)

connection:
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -port [destination port]
                        Destination port to connect to SMB Server
```

## Examples

{{%resources fa_icon_class="far fa-file-video" pattern="smbclient.mp4"/%}}

```plain
$ smbclient.py offsec.nl/administrator:Welkom1234@10.10.10.10

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

Type help for list of commands
# shares
ADMIN$
C$
IPC$
NETLOGON
SYSVOL
# use C$
# ls
drw-rw-rw-          0  Tue Mar 17 16:11:19 2020 $Recycle.Bin
-rw-rw-rw-     389332  Tue Mar 17 01:27:24 2020 bootmgr
-rw-rw-rw-          1  Tue Mar 17 01:27:24 2020 BOOTNXT
drw-rw-rw-          0  Mon Mar 16 16:32:03 2020 Documents and Settings
-rw-rw-rw- 1073741824  Wed Mar 18 08:56:25 2020 pagefile.sys
drw-rw-rw-          0  Mon Mar 16 17:53:03 2020 PerfLogs
drw-rw-rw-          0  Tue Mar 17 01:30:24 2020 Program Files
drw-rw-rw-          0  Tue Mar 17 01:30:24 2020 Program Files (x86)
drw-rw-rw-          0  Tue Mar 17 16:14:16 2020 ProgramData
drw-rw-rw-          0  Mon Mar 16 16:32:05 2020 Recovery
drw-rw-rw-          0  Mon Mar 16 18:09:38 2020 System Volume Information
drw-rw-rw-          0  Tue Mar 17 16:10:54 2020 Users
drw-rw-rw-          0  Tue Mar 17 16:12:50 2020 Windows
-rw-rw-rw-          8  Wed Mar 18 13:10:48 2020 __output
```

## URL List

- [Github.com - smbclient.py](https://github.com/fortra/impacket/blob/master/examples/smbclient.py)
