---
title : "SMBmap.py"
# pre : ' '
description : "Samba Share Enumerator."
date : 2021-08-03T09:48:12+02:00
# hidden : true
# draft : true
weight : 1650
tags : ['Other', 'SMB']
---

---

Samba Share Enumerator.

- Pass-the-Hash Support
- File upload/download/delete
- Permission enumeration (writable share, meet Metasploit)
- Remote Command Execution
- Distrubted file content searching (beta!)
- File name matching (with an auto downoad capability)

## Installation

```plain
git clone https://github.com/ShawnDEvans/smbmap.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
smbmap.py [-h] (-H HOST | --host-file FILE) [-u USERNAME] [-p PASSWORD | --prompt] [-s SHARE] [-d DOMAIN] [-P PORT] [-v] [--admin] [--no-banner] [--no-color] [--no-update] [-x COMMAND] [--mode CMDMODE] [-L | -R [PATH] | -r [PATH]] [-A PATTERN | -g FILE | --csv FILE] [--dir-only] [--no-write-check] [-q] [--depth DEPTH] [--exclude SHARE [SHARE ...]] [-F PATTERN] [--search-path PATH] [--search-timeout TIMEOUT] [--download PATH] [--upload SRC DST] [--delete PATH TO FILE] [--skip]
```

## Flags

```plain
    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
 -----------------------------------------------------------------------------
     SMBMap - Samba Share Enumerator | Shawn Evans - ShawnDEvans@gmail.com   
                     https://github.com/ShawnDEvans/smbmap

optional arguments:
  -h, --help            show this help message and exit

Main arguments:
  -H HOST               IP of host
  --host-file FILE      File containing a list of hosts
  -u USERNAME           Username, if omitted null session assumed
  -p PASSWORD           Password or NTLM hash
  --prompt              Prompt for a password
  -s SHARE              Specify a share (default C$), ex 'C$'
  -d DOMAIN             Domain name (default WORKGROUP)
  -P PORT               SMB port (default 445)
  -v                    Return the OS version of the remote host
  --admin               Just report if the user is an admin
  --no-banner           Removes the banner from the top of the output
  --no-color            Removes the color from output
  --no-update           Removes the "Working on it" message

Command Execution:
  Options for executing commands on the specified host

  -x COMMAND            Execute a command ex. 'ipconfig /all'
  --mode CMDMODE        Set the execution method, wmi or psexec, default wmi

Shard drive Search:
  Options for searching/enumerating the share of the specified host(s)

  -L                    List all drives on the specified host, requires ADMIN rights.
  -R [PATH]             Recursively list dirs, and files (no share\path lists ALL shares), ex. 'C$\Finance'
  -r [PATH]             List contents of directory, default is to list root of all shares, ex. -r 'C$\Documents and Settings\Administrator\Documents'
  -A PATTERN            Define a file name pattern (regex) that auto downloads a file on a match (requires -R or -r), not case sensitive, ex '(web|global).(asax|config)'
  -g FILE               Output to a file in a grep friendly format, used with -r or -R (otherwise it outputs nothing), ex -g grep_out.txt
  --csv FILE            Output to a CSV file, used with -r or -R outputs file listings, ex --csv shares.csv
  --dir-only            List only directories, ommit files.
  --no-write-check      Skip check to see if drive grants WRITE access.
  -q                    Quiet verbose output. Only shows shares you have READ or WRITE on, and suppresses file listing when performing a search (-A).
  --depth DEPTH         Traverse a directory tree to a specific depth. Default is 5.
  --exclude SHARE [SHARE ...]
                        Exclude share(s) from searching and listing, ex. --exclude ADMIN$ C$'

File Content Search:
  Options for searching the content of files (must run as root), kind of experimental

  -F PATTERN            File content search, -F '[Pp]assword' (requires admin access to execute commands, and PowerShell on victim host)
  --search-path PATH    Specify drive/path to search (used with -F, default C:\Users), ex 'D:\HR\'
  --search-timeout TIMEOUT
                        Specifcy a timeout (in seconds) before the file search job gets killed. Default is 300 seconds.

Filesystem interaction:
  Options for interacting with the specified host's filesystem

  --download PATH       Download a file from the remote system, ex.'C$\temp\passwords.txt'
  --upload SRC DST      Upload a file to the remote system ex. '/tmp/payload.exe C$\temp\payload.exe'
  --delete PATH TO FILE
                        Delete a remote file, ex. 'C$\temp\msf.exe'
  --skip                Skip delete file confirmation prompt

Examples:

$ python smbmap.py -u jsmith -p password1 -d workgroup -H 192.168.0.1
$ python smbmap.py -u jsmith -p 'aad3b435b51404eeaad3b435b51404ee:da76f2c4c96028b7a6111aef4a50a94d' -H 172.16.0.20
$ python smbmap.py -u 'apadmin' -p 'asdf1234!' -d ACME -Hh 10.1.3.30 -x 'net group "Domain Admins" /domain'
```

## Examples

### Enumerate authenticated shares

```plain
$ python3 smbmap.py -u johndo -p 'Welkom1234' -H 10.10.10.10

    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
 -----------------------------------------------------------------------------
     SMBMap - Samba Share Enumerator | Shawn Evans - ShawnDEvans@gmail.com   
                     https://github.com/ShawnDEvans/smbmap

                                                                                                    
[+] IP: 10.10.10.10:445    Name: unknown               Status: Authenticated
    Disk                                                Permissions Comment
    ----                                                ----------- -------
    ADMIN$                                              NO ACCESS   Extern beheer
    aiff                                                READ ONLY    
    C$                                                  NO ACCESS    Standaardshare
    IPC$                                                READ ONLY    Externe IPC
    M$                                                  NO ACCESS    Standaardshare
```

### SMB NULL sessions

```plain
smbmap -H <target>
```

### Multiple hosts

```plain
for i in {1..254}; do smbmap.py -H 192.168.1.$i; done
```

```plain
for i in $(cat iplist.txt); do smbmap.py -H $i; done
```

### Recursively enumerate shares

```plain
$ smbmap.py -u johndo -p Welkom1234 -H 10.10.20.251 -R aiff

    ________  ___      ___  _______   ___      ___       __         _______
   /"       )|"  \    /"  ||   _  "\ |"  \    /"  |     /""\       |   __ "\
  (:   \___/  \   \  //   |(. |_)  :) \   \  //   |    /    \      (. |__) :)
   \___  \    /\  \/.    ||:     \/   /\   \/.    |   /' /\  \     |:  ____/
    __/  \   |: \.        |(|  _  \  |: \.        |  //  __'  \    (|  /
   /" \   :) |.  \    /:  ||: |_)  :)|.  \    /:  | /   /  \   \  /|__/ \
  (_______/  |___|\__/|___|(_______/ |___|\__/|___|(___/    \___)(_______)
 -----------------------------------------------------------------------------
     SMBMap - Samba Share Enumerator | Shawn Evans - ShawnDEvans@gmail.com   
                     https://github.com/ShawnDEvans/smbmap

                                                                                                    
[+] IP: 10.10.20.251:445    Name: unknown                 Status: Authenticated
        Disk                                              Permissions    Comment
    ----                                                  -----------    -------
    aiff                                                  READ ONLY    
    .\aiff\\*
    dr--r--r--                0 Tue Aug  3 08:45:37 2021    .
    dr--r--r--                0 Tue Aug  3 08:45:37 2021    ..
    dr--r--r--                0 Sat Jun  5 19:45:38 2021    Private
    dr--r--r--                0 Sat May 29 09:45:24 2021    Secrets
```

## URL List

- [Github.com - smbmap.py](https://github.com/ShawnDEvans/smbmap)
