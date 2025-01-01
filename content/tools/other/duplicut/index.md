---
title : "Duplicut"
# pre : ' '
description : "Remove duplicate lines from INFILE without changing order."
date : 2020-09-22T12:52:59+02:00
# hidden : true
# draft : true
weight : 530
# tags : ['']
---

---

Quickly dedupe massive wordlists, without changing the order.

## Installation

```plain
git clone https://github.com/nil0x42/duplicut.git
cd duplicut/ && make
```

## Usage

```plain
duplicut [OPTION]... [INFILE] -o [OUTFILE]
```

## Flags

```plain
Options:
-o, --outfile <FILE>       Write result to <FILE>
-t, --threads <NUM>        Max threads to use (default max)
-m, --memlimit <VALUE>     Limit max used memory (default max)
-l, --line-max-size <NUM>  Max line size (default 64)
-p, --printable            Filter ascii printable lines
-c, --lowercase            Convert wordlist to lowercase
-C, --uppercase            Convert wordlist to uppercase
-h, --help                 Display this help and exit
-v, --version              Output version information and exit

Example: duplicut wordlist.txt -o new-wordlist.txt
```

## Examples

```plain
$ ./duplicut wordlist.txt -o clean-wordlist.txt -l 255

$ wc -l wordlist.txt clean-wordlist.txt
 33591536 wordlist.txt
 7487676 clean-wordlist.txt
```

## URL List

- [GitHub.com - duplicut](https://github.com/nil0x42/duplicut)
