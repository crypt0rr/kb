---
title : "puredns"
# pre : ' '
description : "puredns description."
date : 2022-11-30T20:56:26+01:00
# hidden : true
# draft : true
weight : 230
tags : ['OSINT', 'DNS', 'Subdomain']
---

---

puredns is a fast domain resolver and subdomain bruteforcing tool that can accurately filter out wildcard subdomains and DNS poisoned entries.

It uses [massdns](https://github.com/blechschmidt/massdns), a powerful stub DNS resolver, to perform bulk lookups. With the proper bandwidth and a good list of public resolvers, it can resolve millions of queries in just a few minutes. Unfortunately, the results from massdns are only as good as the answers provided by the public resolvers. The results are often polluted by wrong DNS answers and false positives from wildcard subdomains.

puredns solves this with its wildcard detection algorithm. It can filter out wildcards based on the DNS answers obtained from a set of trusted resolvers. It also attempts to work around DNS poisoning by validating the answers obtained using those trusted resolvers.

Think this is useful? ⭐ Star us on GitHub — it helps!

## Features

- Resolve thousands of DNS queries per second using massdns and a list of public DNS resolvers
- Bruteforce subdomains using a wordlist and a root domain
- Clean wildcards and detect wildcard roots using the minimal number of queries to ensure precise results
- Circumvent DNS load-balancing during wildcard detection
- Validate that the results are free of DNS poisoning by running against a list of known, trusted resolvers
- Save a list of valid domains, wildcard subdomain roots, and a clean massdns output containing only the valid entries
- Read a list of domains or words from stdin and enable quiet mode for easy integration into custom automation pipelines

## Installation

### Prerequisites

#### massdns

Puredns requires massdns on the host machine. If the path to the massdns binary is present in the PATH environment variable, puredns will work out of the box. A good place to copy the massdns executable is /usr/local/bin on most systems. Otherwise, you will need to specify the path to the massdns binary file using the --bin command-line argument.

The following should work on most Debian based systems. Follow the official instructions for more information.

```plain
git clone https://github.com/blechschmidt/massdns.git
cd massdns
make
sudo make install
```

### go 1.15, 1.16

```plain
GO111MODULE=on go get github.com/d3mondev/puredns/v2
```

### go 1.17+

```plain
go install github.com/d3mondev/puredns/v2@latest
```

## Usage

```plain
puredns [command]
```

## Flags

```plain
Examples:
  puredns resolve domains.txt
  puredns bruteforce wordlist.txt domain.com --resolvers public.txt
  cat domains.txt | puredns resolve

Available Commands:
  bruteforce  Bruteforce subdomains using a wordlist
  resolve     Resolve a list of domains
  sponsors    Show the active sponsors <3

Flags:
  -q, --quiet     quiet mode
  -h, --help      help for puredns
  -v, --version   version for puredns

Use "puredns [command] --help" for more information about a command.
```

## Examples

```plain
$ cat dnslist 
google.com
cloudflare.com
facebook.com
instagram.com
n0tarealdomain.com
```

```plain
$ ./puredns resolve dnslist
                          _           
                         | |          
 _ __  _   _ _ __ ___  __| |_ __  ___ 
| '_ \| | | | '__/ _ \/ _` | '_ \/ __|
| |_) | |_| | | |  __/ (_| | | | \__ \
| .__/ \__,_|_|  \___|\__,_|_| |_|___/
| |                                   
|_|                     puredns v2.0.1

Fast and accurate DNS resolving and bruteforcing

Crafted with <3 by @d3mondev
https://github.com/sponsors/d3mondev

------------------------------------------------------------
[+] Mode                 : resolve
[+] File                 : dnslist
[+] Resolvers            : resolvers.txt
[+] Rate Limit           : unlimited
[+] Rate Limit (Trusted) : 500 qps
[+] Wildcard Threads     : 100
[+] Wildcard Tests       : 3
------------------------------------------------------------

Resolving domains with public resolvers
[ETA 00:00:00] |██████████████████████████████████████| 5/5 rate: 5 qps (time: 00:00:00)

Detecting wildcard root subdomains
[ETA 00:00:00] |██████████████████████████████████████| 4/4 queries: 0 (time: 00:00:00)

Validating domains against trusted resolvers
[ETA 00:00:00] |██████████████████████████████████████| 4/4 rate: 4 qps (time: 00:00:00)

Found 4 valid domains:
google.com
instagram.com
facebook.com
cloudflare.com
```

## URL list

- [Github.com - puredns](https://github.com/d3mondev/puredns)
