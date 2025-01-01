---
title : "SMBclient"
# pre : ' '
description : "FTP-like client to access SMB/CIFS resources on servers."
date : 2020-04-13T13:23:38+02:00
# hidden : true
# draft : true
weight : 1620
tags : ['Other', 'SMB']
---

---

FTP-like client to access SMB/CIFS resources on servers.

## Installation

```plain
sudo apt install smbclient
```

## Usage

```plain
smbclient service <password>
```

## Flags

```plain
  -R, --name-resolve=NAME-RESOLVE-ORDER     Use these name resolution services only
  -M, --message=HOST                        Send message
  -I, --ip-address=IP                       Use this IP to connect to
  -E, --stderr                              Write messages to stderr instead of stdout
  -L, --list=HOST                           Get a list of shares available on a host
  -m, --max-protocol=LEVEL                  Set the max protocol level
  -T, --tar=<c|x>IXFqgbNan                  Command line tar
  -D, --directory=DIR                       Start from directory
  -c, --command=STRING                      Execute semicolon separated commands
  -b, --send-buffer=BYTES                   Changes the transmit/send buffer
  -t, --timeout=SECONDS                     Changes the per-operation timeout
  -p, --port=PORT                           Port to connect to
  -g, --grepable                            Produce grepable output
  -q, --quiet                               Suppress help message
  -B, --browse                              Browse SMB servers using DNS

Help options:
  -?, --help                                Show this help message
      --usage                               Display brief usage message

Common samba options:
  -d, --debuglevel=DEBUGLEVEL               Set debug level
  -s, --configfile=CONFIGFILE               Use alternate configuration file
  -l, --log-basename=LOGFILEBASE            Base name for log files
  -V, --version                             Print version
      --option=name=value                   Set smb.conf option from command line

Connection options:
  -O, --socket-options=SOCKETOPTIONS        socket options to use
  -n, --netbiosname=NETBIOSNAME             Primary netbios name
  -W, --workgroup=WORKGROUP                 Set the workgroup name
  -i, --scope=SCOPE                         Use this Netbios scope

Authentication options:
  -U, --user=USERNAME                       Set the network username
  -N, --no-pass                             Don't ask for a password
  -k, --kerberos                            Use kerberos (active directory) authentication
  -A, --authentication-file=FILE            Get the credentials from a file
  -S, --signing=on|off|required             Set the client signing state
  -P, --machine-pass                        Use stored machine account password
  -e, --encrypt                             Encrypt SMB transport
  -C, --use-ccache                          Use the winbind ccache for authentication
      --pw-nt-hash                          The supplied password is the NT hash
```

## Examples

### List SMB-shares on target without passwords

```plain
smbclient -L //<target-ip> -N
```

### SMB NULL-sessions

```plain
smbclient //<victim_ip>/IPC$ -N

Success #:/smb>
```

### Connect to SMB-share

```plain
$ smbclient \\\\10.10.10.10\\c$ -U administrator -W offsec
Enter OFFSEC\administrator's password:
Try "help" to get a list of possible commands.
smb: \> ls
  $Recycle.Bin                      DHS        0  Tue Mar 17 16:11:19 2020
  bootmgr                          AHSR   389332  Sat Feb  3 23:45:52 2018
  BOOTNXT                           AHS        1  Sat Jul 16 15:18:08 2016
  Documents and Settings            DHS        0  Mon Mar 16 16:32:03 2020
  pagefile.sys                      AHS 4623302656  Fri Jul  3 12:36:21 2020
  PerfLogs                            D        0  Mon Mar 16 17:53:03 2020
  Program Files                      DR        0  Sun Feb  4 00:35:48 2018
  Program Files (x86)                 D        0  Sat Jul 16 15:23:24 2016
  ProgramData                        DH        0  Thu Apr  9 09:10:44 2020
  Recovery                          DHS        0  Mon Mar 16 16:32:05 2020
  System Volume Information         DHS        0  Tue Jun  9 17:19:59 2020
  Users                              DR        0  Tue Mar 17 16:10:54 2020
  Windows                             D        0  Tue Mar 17 16:12:50 2020
  __output                            A        8  Wed Mar 18 13:10:48 2020

    9029887 blocks of size 4096. 4630358 blocks available
smb: \>
```

### Download file(s)

```plain
# smbclient //10.10.10.10/nt4wrksv -U guest
Enter WORKGROUP\guest's password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Mon Jun 21 10:52:52 2021
  ..                                  D        0  Mon Jun 21 10:52:52 2021
  passwords.txt                       A       98  Sat Jul 25 17:15:33 2020

    7735807 blocks of size 4096. 5139890 blocks available
smb: \> get passwords.txt
getting file \passwords.txt of size 98 as passwords.txt (0.2 KiloBytes/sec) (average 0.2 KiloBytes/sec)
smb: \>
```

## URL List

- [Linux.die.net - smbclient](https://linux.die.net/man/1/smbclient)
