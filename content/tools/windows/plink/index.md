---
title : "Plink"
# pre : ' '
description : "Command-line connection utility."
date : 2022-11-15T10:28:37+01:00
# hidden : true
# draft : true
weight : 220
tags : ['Windows' , 'SSH', 'Pivoting']
---

---

Command-line connection utility.

Plink is part of [PuTTY](https://putty.org/), install PuTTY yourself or download the (x86_x64) executable below.

## Installation

{{%resources fa_icon_class="fas fa-file-code" pattern=".*(exe)"/%}}

## Usage

```plain
plink [options] [user@]host [command]
   ("host" can also be a PuTTY saved session name)
```

## Flags

```plain
Options:
  -V        print version information and exit
  -pgpfp    print PGP key fingerprints and exit
  -v        show verbose messages
  -load sessname  Load settings from saved session
  -ssh -telnet -rlogin -raw -serial
            force use of a particular protocol
  -ssh-connection
            force use of the bare ssh-connection protocol
  -P port   connect to specified port
  -l user   connect with specified username
  -batch    disable all interactive prompts
  -proxycmd command
            use 'command' as local proxy
  -sercfg configuration-string (e.g. 19200,8,n,1,X)
            Specify the serial configuration (serial only)
The following options only apply to SSH connections:
  -pwfile file   login with password read from specified file
  -D [listen-IP:]listen-port
            Dynamic SOCKS-based port forwarding
  -L [listen-IP:]listen-port:host:port
            Forward local port to remote address
  -R [listen-IP:]listen-port:host:port
            Forward remote port to local address
  -X -x     enable / disable X11 forwarding
  -A -a     enable / disable agent forwarding
  -t -T     enable / disable pty allocation
  -1 -2     force use of particular SSH protocol version
  -4 -6     force use of IPv4 or IPv6
  -C        enable compression
  -i key    private key file for user authentication
  -noagent  disable use of Pageant
  -agent    enable use of Pageant
  -no-trivial-auth
            disconnect if SSH authentication succeeds trivially
  -noshare  disable use of connection sharing
  -share    enable use of connection sharing
  -hostkey keyid
            manually specify a host key (may be repeated)
  -sanitise-stderr, -sanitise-stdout, -no-sanitise-stderr, -no-sanitise-stdout
            do/don't strip control chars from standard output/error
  -no-antispoof   omit anti-spoofing prompt after authentication
  -m file   read remote command(s) from file
  -s        remote command is an SSH subsystem (SSH-2 only)
  -N        don't start a shell/command (SSH-2 only)
  -nc host:port
            open tunnel in place of session (SSH-2 only)
  -sshlog file
  -sshrawlog file
            log protocol details to a file
  -logoverwrite
  -logappend
            control what happens when a log file already exists
  -shareexists
            test whether a connection-sharing upstream exists
```

## Examples

### Pivoting from Windows (Remote Port Forwarding)

- `-ssh` - Force use of specific protocol.
- `-l` - Username on the remote host.
- `-pw` - Password for the user on remote host.
- `-R` - Forward remote port to local address

In this scenario the localhost will expose the local port `3389` to the remote host on port `1234` via SSH.

```plain
plink.exe -ssh -l user -pw password -R 10.10.10.1:1234:127.0.0.1:3389 10.10.10.1
```

**NOTE:** The first time plink connects to a host, it will attempt to cache the host key, this needs interactive approval from the user. When not using an interactive shell, pipe the needed flag to plink. Add `cmd.exe /c echo y |` in front of the `plink.exe` command.

## URL list

- [Chiark.greenend.org.uk - Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
