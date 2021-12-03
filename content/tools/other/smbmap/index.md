---
title : "SMBmap"
# pre : ' '
description : "Samba Share Enumerator."
date : 2020-03-13T16:14:02+01:00
# hidden : true
draft : true
weight : 0
# tags : ['']
---

## SMBmap

Samba Share Enumerator.

### Installation

```plain
sudo apt install smbmap
```

### Usage

```plain
smbmap -H <host> [OPTIONS]
```

### Flags

```plain
usage: smbmap [-h] (-H HOST | --host-file FILE) [-u USERNAME] [-p PASSWORD]
              [-s SHARE] [-d DOMAIN] [-P PORT] [-x COMMAND] [-L | -R [PATH] |
              -r [PATH]] [-A PATTERN] [-q] [--depth DEPTH] [-F PATTERN]
              [--search-path PATH] [--download PATH] [--upload SRC DST]
              [--delete PATH TO FILE] [--skip]

SMBMap - Samba Share Enumerator | Shawn Evans - ShawnDEvans@gmail.com

optional arguments:
  -h, --help            show this help message and exit

Main arguments:
  -H HOST               IP of host
  --host-file FILE      File containing a list of hosts
  -u USERNAME           Username, if omitted null session assumed
  -p PASSWORD           Password or NTLM hash
  -s SHARE              Specify a share (default C$), ex 'C$'
  -d DOMAIN             Domain name (default WORKGROUP)
  -P PORT               SMB port (default 445)

Command Execution:
  Options for executing commands on the specified host

  -x COMMAND            Execute a command ex. 'ipconfig /all'

Filesystem Search:
  Options for searching/enumerating the filesystem of the specified host

  -L                    List all drives on the specified host
  -R [PATH]             Recursively list dirs, and files (no share\path lists
                        ALL shares), ex. 'C$\Finance'
  -r [PATH]             List contents of directory, default is to list root of
                        all shares, ex. -r 'C$\Documents and
                        Settings\Administrator\Documents'
  -A PATTERN            Define a file name pattern (regex) that auto downloads
                        a file on a match (requires -R or -r), not case
                        sensitive, ex '(web|global).(asax|config)'
  -q                    Disable verbose output. Only shows shares you have
                        READ/WRITE on, and suppresses file listing when
                        performing a search (-A).
  --depth DEPTH         Traverse a directory tree to a specific depth

File Content Search:
  Options for searching the content of files

  -F PATTERN            File content search, -F '[Pp]assword' (requires admin
                        access to execute commands, and powershell on victim
                        host)
  --search-path PATH    Specify drive/path to search (used with -F, default
                        C:\Users), ex 'D:\HR\'

Filesystem interaction:
  Options for interacting with the specified host's filesystem

  --download PATH       Download a file from the remote system,
                        ex.'C$\temp\passwords.txt'
  --upload SRC DST      Upload a file to the remote system ex.
                        '/tmp/payload.exe C$\temp\payload.exe'
  --delete PATH TO FILE
                        Delete a remote file, ex. 'C$\temp\msf.exe'
  --skip                Skip delete file confirmation prompt

Examples:

$ smbmap -u jsmith -p password1 -d workgroup -H 192.168.0.1
$ smbmap -u jsmith -p 'aad3b435b51404eeaad3b435b51404ee:da76f2c4c96028b7a6111aef4a50a94d' -H 172.16.0.20
$ smbmap -u 'apadmin' -p 'asdf1234!' -d ACME -H 10.1.3.30 -x 'net group "Domain Admins" /domain'
```

### Examples

#### SMB NULL sessions

```plain
smbmap -H <target>
```

```plain
smbmap -H 10.10.10.10

[+] Finding open SMB ports....
[+] User SMB session established on 10.10.10.10...
[...SNIP...]
```

#### Multiple hosts

```plain
for i in {1..254}; do smbmap -H 192.168.1.$i; done
```

```plain
for i in $(cat iplist.txt); do smbmap -H $i; done
```

#### List directories

```plain
$ smbmap -H 10.10.10.10 -r iso/test
[+] Finding open SMB ports....
[+] Guest SMB session established on 10.10.10.10...
[+] IP: 10.10.10.10:445  Name: 10.10.10.10                                    
  Disk                                                    Permissions Comment
  ----                                                    ----------- -------
  iso                                                     READ, WRITE
  .test                                         
  dr--r--r--                0 Mon Feb 13 13:05:00 2012  .
  dr--r--r--                0 Mon Jan 25 11:37:59 2021  ..
  dr--r--r--                0 Mon Feb 13 13:01:08 2012  testfolder

```

#### List files recursively

```plain
$ smbmap -H 10.10.10.10 -R Software
[+] Finding open SMB ports....
[+] Guest SMB session established on 10.10.10.10...
[+] IP: 10.10.10.10:445  Name: 10.10.10.10
  Disk                                                    Permissions Comment
  ----                                                    ----------- -------
  .
  dr--r--r--                0 Mon Sep 23 15:48:53 2013  .
  dr--r--r--                0 Mon Sep 23 15:48:53 2013  ..
  dr--r--r--                0 Mon Jan 26 10:51:16 2015  zarafa
  Software                                              READ ONLY
  .\
  dr--r--r--                0 Mon Sep 23 15:48:53 2013  .
  dr--r--r--                0 Mon Sep 23 15:48:53 2013  ..
  dr--r--r--                0 Mon Jan 26 10:51:16 2015  zarafa
  .\zarafa\
  dr--r--r--                0 Mon Jan 26 10:51:16 2015  .
  dr--r--r--                0 Mon Sep 23 15:48:53 2013  ..
  -r--r--r--         14435840 Wed Jun 11 11:47:10 2014  zarafaclient.msi
  -r--r--r--         14000640 Wed Jun 11 11:47:10 2014  zarafaclient-en.msi
  -r--r--r--         14435840 Wed Jun 11 11:47:10 2014  zarafaclient-7.1.10-44973.msi
  -r--r--r--          7939696 Wed Jun 11 11:47:10 2014  zarafamigrationtool.exe
```

#### Download files

```plain
$ smbmap -H 10.10.10.10 --download iso/test/testfile
[+] Finding open SMB ports....
[+] Guest SMB session established on 10.10.10.10...
[+] Starting download: iso\test\testfile (100 bytes)
```

### URL list

* [GitHub.com - smbmap](https://github.com/ShawnDEvans/smbmap)
* [Kali.org - smbmap](https://tools.kali.org/information-gathering/smbmap)
