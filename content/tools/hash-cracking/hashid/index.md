---
title : "HashID"
# pre : ' '
description : "Identify the different types of hashes used to encrypt data."
date : 2020-03-11T14:29:03+01:00
# hidden : true
# draft : true
weight : 70
# tags : [""]
---

---

Identify the different types of hashes used to encrypt data.

## Installation

```plain
sudo apt install hashid
```

## Usage

```plain
hashid.py [-h] [-e] [-m] [-j] [-o FILE] [--version] INPUT
```

## Flags

```plain
usage: hashid.py [-h] [-e] [-m] [-j] [-o FILE] [--version] INPUT

Identify the different types of hashes used to encrypt data

positional arguments:
  INPUT                    input to analyze (default: STDIN)

options:
  -e, --extended           list all possible hash algorithms including salted
                           passwords
  -m, --mode               show corresponding Hashcat mode in output
  -j, --john               show corresponding JohnTheRipper format in output
  -o FILE, --outfile FILE  write output to file
  -h, --help               show this help message and exit
  --version                show program's version number and exit

License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
```

## Examples

```plain
hashid '527dda9cae309ba94c25b5262a0ebe62'

Analyzing '527dda9cae309ba94c25b5262a0ebe62'
[+] MD2
[+] MD5
[+] MD4
[+] Double MD5
[+] LM
[+] RIPEMD-128
[+] Haval-128
[+] Tiger-128
[+] Skein-256(128)
[+] Skein-512(128)
[+] Lotus Notes/Domino 5
[+] Skype
[+] Snefru-128
[+] NTLM
[+] Domain Cached Credentials
[+] Domain Cached Credentials 2
[+] DNSSEC(NSEC3)
[+] RAdmin v2.x
```

## URL List

- [GitHub.com - hashID](https://github.com/psypanda/hashID)
