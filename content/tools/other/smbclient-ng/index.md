---
title : "smbclient-ng"
# pre : ' '
description : "smbclient-ng, a fast and user friendly way to interact with SMB shares."
date : 2024-06-03T10:24:39+02:00
# hidden : true
# draft : true
weight : 1630
tags : ['Other', 'SMB']
---

---

## Features

- [x] `cd`: Change the current working directory. Syntax: `cd <directory>`
- [x] `close`: Closes the SMB connection to the remote machine. Syntax: `close`
- [x] `connect`: Connect to the remote machine (useful if connection timed out). Syntax: `connect`
- [x] `dir`: List the contents of the current working directory. Syntax: `dir`
- [x] `exit`: Exits the smbclient-ng script. Syntax: `exit`
- [x] `get`: Get a remote file. Syntax: `get [-r] <directory or file>`
- [x] `help`: Displays this help message. Syntax: `help`
- [x] `info`: Get information about the server and or the share. Syntax: `info [server|share]`
- [x] `lcd`: Changes the current local directory. Syntax: `lcd <directory>`
- [x] `lls`: Lists the contents of the current local directory. Syntax: `lls`
- [x] `lmkdir`: Creates a new local directory. Syntax: `lmkdir <directory>`
- [x] `lpwd`: Shows the current local directory. Syntax: `lpwd`
- [x] `lrm`: Removes a local file. Syntax: `lrm <file>`
- [x] `lrmdir`: Removes a local directory. Syntax: `lrmdir <directory>`
- [x] `ls`: List the contents of the current remote working directory. Syntax: `ls`
- [x] `ltree`: Displays a tree view of the local directories. Syntax: `ltree [directory]`
- [x] `mkdir`: Creates a new remote directory. Syntax: `mkdir <directory>`
- [x] `module`: Loads a specific module for additional functionalities. Syntax: `module <name>`
- [x] `put`: Put a local file or directory in a remote directory. Syntax: `put [-r] <directory or file>`
- [x] `reconnect`: Reconnect to the remote machine (useful if connection timed out). Syntax: `reconnect`
- [x] `reset`: Reset the TTY output, useful if it was broken after printing a binary file on stdout. Syntax: `reset`
- [x] `rmdir`: Removes a remote directory. Syntax: `rmdir <directory>`
- [x] `rm`: Removes a remote file. Syntax: `rm <file>`
- [x] `shares`: Lists the SMB shares served by the remote machine. Syntax: `shares`
- [x] `use`: Use a SMB share. Syntax: `use <sharename>`

## Installation

```plain
python3 -m pip install smbclientng
```

## Usage

```plain
smbclient-ng [-h] [--debug] [--no-colors] --target ip address [--kdcHost FQDN KDC] [-d DOMAIN] [-u USER] [--no-pass | -p PASSWORD | -H [LMHASH:]NTHASH | --aes-key hex key] [-k]
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  --debug               Debug mode.
  --no-colors           No colors mode.
  --target ip address   IP Address of the SMB Server to connect to.

Authentication & connection:
  --kdcHost FQDN KDC    FQDN of KDC for Kerberos.
  -d DOMAIN, --domain DOMAIN
                        (FQDN) domain to authenticate to
  -u USER, --user USER  user to authenticate with

  --no-pass             Don't ask for password (useful for -k)
  -p PASSWORD, --password PASSWORD
                        password to authenticate with
  -H [LMHASH:]NTHASH, --hashes [LMHASH:]NTHASH
                        NT/LM hashes, format is LMhash:NThash
  --aes-key hex key     AES key to use for Kerberos Authentication (128 or 256 bits)
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from .ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
```

## Examples

```plain
$ smbclient-ng -u "Administrator" -d OFFSEC.nl -p 'Welkom1234' --target "100.70.60.50" 
               _          _ _            _                    
 ___ _ __ ___ | |__   ___| (_) ___ _ __ | |_      _ __   __ _ 
/ __| '_ ` _ \| '_ \ / __| | |/ _ \ '_ \| __|____| '_ \ / _` |
\__ \ | | | | | |_) | (__| | |  __/ | | | ||_____| | | | (_| |
|___/_| |_| |_|_.__/ \___|_|_|\___|_| |_|\__|    |_| |_|\__, |
    by @podalirius_                               v1.2  |___/  
    
[+] Successfully authenticated to '100.70.60.50' as 'OFFSEC.nl\Administrator'!
⏺[\\100.70.60.50\]> shares
┏━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓
┃ Share    ┃ Hidden ┃ Type              ┃ Description         ┃
┡━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━┩
│ admin$   │ True   │ DISKTREE, SPECIAL │ Remote Admin        │
│ c$       │ True   │ DISKTREE, SPECIAL │ Default share       │
│ ipc$     │ True   │ IPC, SPECIAL      │ Remote IPC          │
│ netlogon │ False  │ DISKTREE          │ Logon server share  │
│ sysvol   │ False  │ DISKTREE          │ Logon server share  │
└──────────┴────────┴───────────────────┴─────────────────────┘
⏺[\\100.70.60.50\]> use c$
⏺[\\100.70.60.50\c$\]> dir
d--h--s-     0.00 B  2021-05-08 10:20  $Recycle.Bin\
d--h----     0.00 B  2024-05-15 12:48  $WinREAgent\
d--h--s-     0.00 B  2024-03-16 18:39  Documents and Settings\
-a-h--s-   12.00 kB  2024-06-03 10:11  DumpStack.log.tmp
-a------   16.00 MB  2024-03-25 11:44  ntds.dit
-a-h--s-    1.12 GB  2024-06-03 10:11  pagefile.sys
d-------     0.00 B  2021-05-08 10:20  PerfLogs\
d----r--     0.00 B  2024-03-16 20:15  Program Files\
d-------     0.00 B  2021-05-08 11:39  Program Files (x86)\
d--h----     0.00 B  2024-04-01 16:57  ProgramData\
d--h--s-     0.00 B  2024-03-16 18:39  Recovery\
-a------   15.58 MB  2024-03-25 11:56  SYSTEM
d--h--s-     0.00 B  2024-03-25 11:37  System Volume Information\
d----r--     0.00 B  2024-03-16 18:40  Users\
d-------     0.00 B  2024-05-15 12:49  Windows\
⏺[\\100.70.60.50\c$\]>
```

## URL list

- [Github.com - smbclient-ng](https://github.com/p0dalirius/smbclient-ng)
