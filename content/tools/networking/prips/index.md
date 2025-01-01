---
title : "Prips"
# pre : ' '
description : "Print IP addresses in a range."
date : 2023-06-04T18:25:43+02:00
# hidden : true
# draft : true
weight : 290
# tags : ['']
---

---

prips is a tool that can be used to print all of the IP addresses in a given range. It can enhance the usability of tools that are made to work on only one host at a time (e.g. whois).

## Installation

```plain
sudo apt install prips
```

```plain
brew install prips
```

## Usage

```plain
prips [options] <start end | CIDR block>
```

## Flags

```plain
-c              print range in CIDR notation
-d <x>          set the delimiter to the character with ASCII code 'x'
                where 0 <= x <= 255 
-h              display this help message and exit 
-f <x>          set the format of addresses (hex, dec, or dot)
-i <x>          set the increment to 'x'
-e <x.x.x,x.x>  exclude a range from the output, e.g. -e ..4. will
                not print 192.168.4.[0-255]

prips --help | --version | --features
```

## Examples

```plain
$ prips 173.0.84.0/28
173.0.84.0
173.0.84.1
173.0.84.2
173.0.84.3
173.0.84.4
173.0.84.5
173.0.84.6
173.0.84.7
173.0.84.8
173.0.84.9
173.0.84.10
173.0.84.11
173.0.84.12
173.0.84.13
173.0.84.14
173.0.84.15
```

## URL list

- [Devel.ringlet.net - prips](https://devel.ringlet.net/sysutils/prips/)
