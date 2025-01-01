---
title : "Smap"
# pre : ' '
description : "A drop-in replacement for Nmap powered by shodan.io"
date : 2022-04-01T14:07:54+02:00
# hidden : true
# draft : true
weight : 360
# tags : ['']
---

---

passive Nmap like scanner built with shodan.io

Smap is a replica of Nmap which uses shodan.io's free API for port scanning. It takes same command line arguments as Nmap and proudces the same output which makes it a drop-in replacament for Nmap.

## Features

- Scans 200 hosts per second
- Vulnerability detection
- Supports all nmap's output formats
- Service and version fingerprinting
- Makes no contact to the targets
- Doesn't require any account/api key

## Installation

```plain
go install -v github.com/s0md3v/smap/cmd/smap@latest
```

## Usage

Smap takes the same arguments as Nmap but options other than `-p`, `-h`, `-o*`, `-iL` are ignored. If you are unfamiliar with Nmap, here's how to use Smap.

```plain
smap <targets here>
```

### Specifying ports

SMap scans these [1237 ports](https://api.shodan.io/shodan/ports) by default. If you want to display results for certain ports, use the `-p` option.

```plain
smap -p21-30,80,443 -iL targets.txt
```

## Considerations

Since Smap simply fetches existent port data from shodan.io, it is super fast but there's more to it. You should use Smap if:

### You want

- vulnerability detection
- a super fast port scanner
- results for most common ports (top 1237)
- no connections to be made to the targets

### You are okay with

- not being able to scan IPv6 addresses
- results being up to 7 days old
- a few false negatives

## Examples

```plain
$ smap kb.offsec.nl           
Starting Nmap 9.99 ( https://nmap.org ) at 2022-04-01 14:06 CEST
Nmap scan report for kb.offsec.nl (104.21.67.203)
Host is up.
rDNS record for 104.21.67.203: sni.cloudflaressl.com

PORT     STATE SERVICE        VERSION
80/tcp   open  http?          
443/tcp  open  https?         
2082/tcp open  infowave?      
2083/tcp open  radsec?        
2086/tcp open  gnunet?        
2087/tcp open  eli?           
2096/tcp open  nbx-dir?       
8080/tcp open  http-alt?      
8443/tcp open  pcsync-https?  
8880/tcp open  cddbp-alt?     

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 0.38 seconds
```

## URL List

- [Github.com - Smap](https://github.com/s0md3v/Smap)
