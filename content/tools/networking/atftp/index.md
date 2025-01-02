---
title : "atftp"
# pre : ' '
description : "Can be used interactively or in batch mode to retrieve files from TFTP servers."
date : 2022-11-12T12:50:29+01:00
# hidden : true
# draft : true
weight : 30
tags : ['Networking', 'FTP']
---

---

Can be used interactively or in batch mode to retrieve files from TFTP servers. When used interactively, a summary of the commands can be printed by typing 'help'. This TFTP client support all basic feature from RFC1350, RFC2347, RFC2348 and RFC2349. It also support multicast implementation of RFC2090 and mtftp as defined in the PXE specification.

## Installation

```plain
sudo apt install atftp
```

## Usage

```plain
atftp [options] [host [port]]
```

## Flags

```plain
-g, --get
    Non interactive invocation only. Instruct atftp to get file.
--mget
    Non interactive invocation only. Used to get file from a mtftp capable server.
-p, --put
    Non interactive invocation only. Instruct atftp to put file.
-l, --local-file
    Non interactive invocation only. The client side file name to read or write. Must be used in conjunction with --get or --put.
-r, --remote-file
    Non interactive invocation only. The server side file name to get or put. Must be used in conjunction with --get or --put.
--tftp-timeout <value>
    Number of seconds for timeout, client side. Default is 5 seconds.
--option <"name value">
    Set option "name" to "value". This command support exactly the same arguments as the interactive one. For example, use: --option "blksize 1428" to configure block size.
--mtftp <"name value">
    Set mtftp possible options. Accept the same options as the interactive mtftp command. For example, use: --mtftp "client-port 76" to configure client side port to use.
--no-source-port-checking
    See atftpd's man page.
--verbose
    Instruct atftp to be verbose. It will print more information about what's going on.
--trace
    This is useful for debugging purpose to display all packet going to and from the network.
-V, --version
    Print version.
-h, --help
    Print a summary of command line arguments.
```

## Examples

### Running as Daemon

```plain
sudo mkdir /tftp
sudo chown nobody: /tftp
sudo atftpd --daemon --port 69 /tftp
```

Transferring files to running server.

```plain
$ tftp -i 10.10.10.10 put secrets.txt
Transfer successful: 1337420 bytes in 69 second(s), 1337 bytes/s
```

## URL list

- [Linux.die.net - atftp](https://linux.die.net/man/1/atftp)
