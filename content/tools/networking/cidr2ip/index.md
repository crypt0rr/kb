---
title : "cidr2ip"
# pre : ' '
description : "This program converts IPv4 CIDR blocks into their constituent IP addresses."
date : 2022-08-01T14:24:05+02:00
# hidden : true
# draft : true
weight : 120
tags : ['Networking', 'CIDR', 'Netmask']
---

---

This program converts IPv4 CIDR blocks into their constituent IP addresses.

## Installation

```plain
go install github.com/crypt0rr/cidr2ip@latest
```

## Usage

```plain
cidr2ip [-f <filename>] <list of cidrs> 
```

## Examples

### Command line arguments

It is possible to use one or more CLI arguments.

```plain
$ cidr2ip 10.0.0.0/30 192.68.0.0/30
10.0.0.1
10.0.0.2
192.68.0.1
192.68.0.2
```

### Piped input

Pipe a file containing networks (e.g. `192.168.0.100/30`) to `cidr2ip`

```plain
$ cat cidrs.txt | cidr2ip
192.168.0.101
192.168.0.102
```

### File input

Instead of piping the content of a file to `cidr2ip` it can also be used directly.

```plain
$ cidr2ip -f cidrs.txt
192.168.0.101
192.168.0.102
```

## URL List

- [Github.com - cidr2ip](https://github.com/crypt0rr/cidr2ip)
