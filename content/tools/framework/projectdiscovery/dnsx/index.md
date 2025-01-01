---
title : "dnsx"
# pre : ' '
description : "dnsx is a fast and multi-purpose DNS toolkit allow to run multiple probes using retryabledns library."
date : 2022-11-09T19:46:30+01:00
# hidden : true
# draft : true
weight : 20
tags : ['Framework', 'OSINT', 'DNS']
---

---

dnsx is a fast and multi-purpose DNS toolkit allow to run multiple probes using retryabledns library.

Combine with [subfinder]({{< ref "subfinder" >}}).

## Installation

```plain
go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest
```

## Usage

```plain
dnsx [flags]
```

## Flags

```plain
Flags:
INPUT:
   -l, -list string      list of sub(domains)/hosts to resolve (file or stdin)
   -d, -domain string    list of domain to bruteforce (file or comma separated or stdin)
   -w, -wordlist string  list of words to bruteforce (file or comma separated or stdin)

QUERY:
   -a      query A record (default)
   -aaaa   query AAAA record
   -cname  query CNAME record
   -ns     query NS record
   -txt    query TXT record
   -ptr    query PTR record
   -mx     query MX record
   -soa    query SOA record
   -axfr   query AXFR
   -caa    query CAA record

FILTER:
   -re, -resp          display dns response
   -ro, -resp-only     display dns response only
   -rc, -rcode string  filter result by dns status code (eg. -rcode noerror,servfail,refused)

PROBE:
   -cdn  display cdn name

RATE-LIMIT:
   -t, -threads int      number of concurrent threads to use (default 100)
   -rl, -rate-limit int  number of dns request/second to make (disabled as default) (default -1)

OUTPUT:
   -o, -output string  file to write output
   -json               write output in JSONL(ines) format

DEBUG:
   -hc, -health-check  run diagnostic check up
   -silent             display only results in the output
   -v, -verbose        display verbose output
   -raw, -debug        display raw dns response
   -stats              display stats of the running scan
   -version            display version of dnsx

OPTIMIZATION:
   -retry int                number of dns attempts to make (must be at least 1) (default 2)
   -hf, -hostsfile           use system host file
   -trace                    perform dns tracing
   -trace-max-recursion int  Max recursion for dns trace (default 32767)
   -resume                   resume existing scan
   -stream                   stream mode (wordlist, wildcard, stats and stop/resume will be disabled)

CONFIGURATIONS:
   -r, -resolver string          list of resolvers to use (file or comma separated)
   -wt, -wildcard-threshold int  wildcard filter threshold (default 5)
   -wd, -wildcard-domain string  domain name for wildcard filtering (other flags will be ignored)
```

## Examples

For more examples see [Github.com](https://github.com/projectdiscovery/dnsx#running-dnsx)

### Print A records for the given list of subdomains

```plain
$ subfinder -silent -d hackerone.com | dnsx -silent -a -resp

hackerone.com [104.16.99.52]
hackerone.com [104.16.100.52]
docs.hackerone.com [185.199.109.153]
docs.hackerone.com [185.199.108.153]
docs.hackerone.com [185.199.110.153]
docs.hackerone.com [185.199.111.153]
a.ns.hackerone.com [162.159.0.31]
mta-sts.forwarding.hackerone.com [185.199.108.153]
mta-sts.forwarding.hackerone.com [185.199.109.153]
mta-sts.forwarding.hackerone.com [185.199.110.153]
mta-sts.forwarding.hackerone.com [185.199.111.153]
api.hackerone.com [104.16.99.52]
api.hackerone.com [104.16.100.52]
www.hackerone.com [104.16.99.52]
www.hackerone.com [104.16.100.52]
mta-sts.hackerone.com [185.199.108.153]
mta-sts.hackerone.com [185.199.109.153]
mta-sts.hackerone.com [185.199.110.153]
mta-sts.hackerone.com [185.199.111.153]
b.ns.hackerone.com [162.159.1.31]
mta-sts.managed.hackerone.com [185.199.108.153]
gslink.hackerone.com [18.65.39.14]
mta-sts.managed.hackerone.com [185.199.109.153]
mta-sts.managed.hackerone.com [185.199.110.153]
mta-sts.managed.hackerone.com [185.199.111.153]
gslink.hackerone.com [18.65.39.101]
gslink.hackerone.com [18.65.39.9]
gslink.hackerone.com [18.65.39.56]
support.hackerone.com [104.16.53.111]
support.hackerone.com [104.16.51.111]
resources.hackerone.com [3.98.63.202]
resources.hackerone.com [52.60.160.16]
resources.hackerone.com [52.60.165.183]
```

### Extract A records for the given list of subdomains

```plain
$ subfinder -silent -d hackerone.com | dnsx -silent -a -resp-only

104.16.99.52
104.16.100.52
162.159.1.31
104.16.99.52
104.16.100.52
185.199.110.153
185.199.111.153
185.199.108.153
185.199.109.153
104.16.99.52
104.16.100.52
104.16.51.111
104.16.53.111
185.199.108.153
185.199.111.153
185.199.110.153
185.199.111.153
```

### Extract CNAME records for the given list of subdomains

```plain
subfinder -silent -d hackerone.com | dnsx -silent -cname -resp

support.hackerone.com [hackerone.zendesk.com]
resources.hackerone.com [read.uberflip.com]
mta-sts.hackerone.com [hacker0x01.github.io]
mta-sts.forwarding.hackerone.com [hacker0x01.github.io]
events.hackerone.com [whitelabel.bigmarker.com]
```

## URL List

- [Github.com - dnsx](https://github.com/projectdiscovery/dnsx)
