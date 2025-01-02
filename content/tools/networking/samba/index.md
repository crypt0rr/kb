---
title : "Samba"
# pre : ' '
description : "Server to provide AD and SMB/CIFS services to clients."
date : 2023-09-15T20:46:01+02:00
# hidden : true
# draft : true
weight : 340
tags : ['Networking', 'SMB']
---

---

Server to provide AD and SMB/CIFS services to clients.

## Installation

```plain
sudo apt update
sudo apt install samba
```

## Usage

```plain
samba: root process [OPTION...]
```

## Flags

```plain
  -M, --model=MODEL                  Select process model
      --maximum-runtime=seconds      set maximum runtime of the server process, till autotermination
  -b, --show-build                   show build info

Help options:
  -?, --help                         Show this help message
      --usage                        Display brief usage message

Common Samba options:
  -d, --debuglevel=DEBUGLEVEL        Set debug level
      --debug-stdout                 Send debug output to standard output
  -s, --configfile=CONFIGFILE        Use alternative configuration file
      --option=name=value            Set smb.conf option from command line
  -l, --log-basename=LOGFILEBASE     Basename for log/debug files
      --leak-report                  enable talloc leak reporting on exit
      --leak-report-full             enable full talloc leak reporting on exit

Daemon options:
  -D, --daemon                       Become a daemon (default)
  -i, --interactive                  Run interactive (not a daemon) and log to stdout
  -F, --foreground                   Run daemon in foreground (for daemontools, etc.)
      --no-process-group             Don't create a new process group

Version options:
  -V, --version                      Print version
```

## Examples

First create a folder to share.

Restart service command `sudo service smbd restart`

### Configuration

Configuration file `/etc/samba/smb.conf`

```plain
[mynewshare]
    comment = Samba mynewshare
    path = /home/crypt0rr/mynewshare
    read only = no
    browsable = yes
```

### UFW

It is recommended to use host based firewalls, for example [UFW]({{< ref "ufw" >}}).

```plain
sudo ufw allow from 10.10.10.0/24 to any port 445
```

### Setting up User Account(s)

Adding a user.

```plain
sudo smbpasswd -a crypt0rr
```

Enable/disable user.

```plain
sudo smbpasswd -e crypt0rr
sudo smbpasswd -d crypt0rr
```

Check all user accounts configured for Samba `sudo pdbedit -L -v`.

## URL list

- [Linux.die.net - samba](https://linux.die.net/man/7/samba)
