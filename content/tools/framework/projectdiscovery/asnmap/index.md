---
title : "ASNmap"
# pre : ' '
description : "Go CLI and Library for quickly mapping organization network ranges using ASN information."
date : 2022-10-13T09:07:56+02:00
# hidden : true
# draft : true
weight : 10
tags : ['Framework', 'OSINT', 'CIDR']
---

---

Go CLI and Library for quickly mapping organization network ranges using [ASN](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) information.

- ASN to CIDR Lookup
- ORG to CIDR Lookup
- DNS to CIDR Lookup
- IP to CIDR Lookup
- ASN/DNS/IP/ORG input
- JSON/CSV/TEXT output
- STD IN/OUT support

## Installation

```plain
go install github.com/projectdiscovery/asnmap/cmd/asnmap@latest
```

Or download newest pre-compiled binary from [Github.com](https://github.com/projectdiscovery/asnmap/releases).

## Usage

```plain
asnmap [flags]
```

## Flags

```plain
INPUT:
   -a, -asn string[]      target asn to lookup, example: -a AS5650
   -i, -ip string[]       target ip to lookup, example: -i 100.19.12.21, -i 2a10:ad40:: 
   -d, -domain string[]   target domain to lookup, example: -d google.com, -d facebook.com
   -org string[]          target organization to lookup, example: -org GOOGLE

CONFIGURATIONS:
   -config string           path to the asnmap configuration file
   -r, -resolvers string[]  list of resolvers to use

OUTPUT:
   -o, -output string  file to write output to
   -j, -json           display json format output
   -c, -csv            display csv format output
   -v6                 display ipv6 cidr ranges in cli output
   -v, -verbose        display verbose output
   -silent             display silent output
   -version            show version of the project
```

## Examples

Example input for asnmap:

- `asnmap -a AS45596 -silent`
- `asnmap -i 100.19.12.21 -silent`
- `asnmap -d hackerone.com -silent`
- `asnmap -o GOOGLE -silent`

### ASN Look-up by name

```plain
$ echo GOOGLE | asnmap -silent  
8.8.4.0/24
8.8.8.0/24
8.35.200.0/21
34.3.3.0/24
34.4.4.0/24
34.96.0.0/20
34.96.32.0/19
34.96.64.0/18
34.98.64.0/18
34.98.136.0/21
34.98.144.0/21
34.104.4.0/23
34.104.24.0/22
34.104.28.0/24
34.104.30.0/23
```

### Look-up by ASN

```plain
asnmap -a AS45596 -silent
103.252.142.0/23
203.176.112.0/23
```

### Look-up to JSON

```plain
echo hackerone.com | asnmap -json -silent | jq
{
  "timestamp": "2022-10-13 09:14:19.657435 +0200 CEST",
  "input": "hackerone.com",
  "as_number": "AS13335",
  "as_name": "CLOUDFLARENET",
  "as_country": "US",
  "as_range": [
    "104.16.0.0/14",
    "104.20.0.0/16",
    "104.21.0.0/17"
  ]
}
{
  "timestamp": "2022-10-13 09:14:19.914636 +0200 CEST",
  "input": "hackerone.com",
  "as_number": "AS13335",
  "as_name": "CLOUDFLARENET",
  "as_country": "US",
  "as_range": [
    "2606:4700::/47"
  ]
}
```

### Look-up to CSV

```plain
echo hackerone.com | asnmap -csv -silent 
timestamp|input|as_number|as_name|as_country|as_range
2022-10-13 09:15:59.231592 +0200 CEST|hackerone.com|AS13335|CLOUDFLARENET|US|104.16.0.0/14,104.20.0.0/16,104.21.0.0/17
2022-10-13 09:15:59.239025 +0200 CEST|hackerone.com|AS13335|CLOUDFLARENET|US|2606:4700::/47
```

## URL List

- [Github.com - asnmap](https://github.com/projectdiscovery/asnmap)
