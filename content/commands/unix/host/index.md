---
title : "host"
# pre : '<i class="fas fa-code"></i> '
description : "DNS lookup utility."
date : 2020-04-14T12:14:50+02:00
# hidden : true
# draft : true
weight : 390
tags : ['Unix', 'DNS', 'OSINT', 'Subdomain', 'DNS Zone Transfer']
---

---

## Usage

```plain
host [-aCdilrTvVw] [-c class] [-N ndots] [-t type] [-W time]
            [-R number] [-m flag] hostname [server]
```

## Flags

```plain
-a is equivalent to -v -t ANY
-c specifies query class for non-IN data
-C compares SOA records on authoritative nameservers
-d is equivalent to -v
-i IP6.INT reverse lookups
-l lists all hosts in a domain, using AXFR
-m set memory debugging flag (trace|record|usage)
-N changes the number of dots allowed before root lookup is done
-r disables recursive processing
-R specifies number of retries for UDP packets
-s a SERVFAIL response should stop query
-t specifies the query type
-T enables TCP/IP mode
-U enables UDP mode
-v enables verbose output
-V print version number and exit
-w specifies to wait forever for a reply
-W specifies how long to wait for a reply
-4 use IPv4 query transport only
-6 use IPv6 query transport only
```

## Examples

### Get simple record overview

```plain
$ host example.com

example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

### Get specific record

NS-record

```plain
$ host -t ns example.com

example.com name server b.iana-servers.net.
example.com name server a.iana-servers.net.
```

TXT-record

```plain
$ host -t txt example.com

example.com descriptive text "v=spf1 -all"
```

### Reverse DNS lookup

```plain
$ host 50.7.67.155

155.67.7.50.in-addr.arpa domain name pointer mail.offsec.nl.
```

### DNS zone transfer

A zone transfer is basically a database replication between related DNS servers in which the zone file is copied from a primary DNS server to a secondary server. The zone file contains a list of all the DNS names configured for that zone. Zone transfers should only be allowed to authorized secondary DNS servers but many administrators misconfigure their DNS servers, and in these cases, anyone asking for a copy of the DNS server zone will usually receive one.

```plain
$ host -l megacorpone.com ns2.megacorpone.com
Using domain server:
Name: ns2.megacorpone.com
Address: 51.222.39.63#53
Aliases: 

megacorpone.com name server ns1.megacorpone.com.
megacorpone.com name server ns2.megacorpone.com.
megacorpone.com name server ns3.megacorpone.com.
admin.megacorpone.com has address 51.222.169.208
beta.megacorpone.com has address 51.222.169.209
[...]
```

To automate this process a script is made available below.

{{% resources fa_icon_class="fas fa-code" pattern=".*(sh)" /%}}

```plain
./dns-axfr.sh megacorpone.com
admin.megacorpone.com has address 51.222.169.208
beta.megacorpone.com has address 51.222.169.209
fs1.megacorpone.com has address 51.222.169.210
intranet.megacorpone.com has address 51.222.169.211
[...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/host)
