---
title : "host"
# pre : '<i class="fas fa-code"></i> '
description : "DNS lookup utility."
date : 2020-04-14T12:14:50+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Host

### Usage

```plain
host [-aCdilrTvVw] [-c class] [-N ndots] [-t type] [-W time]
            [-R number] [-m flag] hostname [server]
```

### Flags

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

### Examples

#### Get simple record overview

```plain
$ host example.com

example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

#### Get specific record

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

#### Reverse DNS lookup

```plain
$ host 50.7.67.155

155.67.7.50.in-addr.arpa domain name pointer mail.megacorpone.com.
```

#### DNS zone transfer

```plain
$ host -l megacorpone.com ns1.megacorpone.com

; Transfer failed.
Using domain server:
Name: ns1.megacorpone.com
Address: 50.7.67.186#53
```

### URL list

* [Linux.die.net](https://linux.die.net/man/1/host)
