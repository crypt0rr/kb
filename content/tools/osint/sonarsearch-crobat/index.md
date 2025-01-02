---
title : "SonarSearch Crobat"
# pre : ' '
description : "Crobat is a command line utility designed to allow easy querying of the Crobat API for DNS lookups."
date : 2020-09-24T16:31:49+02:00
# hidden : true
# draft : true
weight : 320
# tags : ['']
---

---

Crobat is a command line utility designed to allow easy querying of the Crobat API for DNS lookups. For example sear sub-domains and reverse lookup.

## Installation

```plain
go get github.com/cgboal/sonarsearch/crobat
```

## Usage

```plain
crobat [OPTIONS]
```

## Flags

```plain
  -r string
        Perform reverse lookup on IP address or CIDR range. Supports files and quoted lists
  -s string
        Get subdomains for this value. Supports files and quoted lists
  -t string
        Get tlds for this value. Supports files and quoted lists
```

## Examples

### Reverse DNS lookup

```plain
$ crobat -r 93.184.216.34
example.com
example.edu
example.net
example.org
[...]
```

### Subdomain search

```plain
$ crobat -s google.com
0.chart.apis.google.com
0.client-channel.google.com
0.docs.google.com
0.drive.google.com
0.talkgadget.google.com
07cgvs.feedproxy.ghs.google.com
07cgvs.feedproxy.ghs.google.com
1.chart.apis.google.com
1.docs.google.com
1.drive.google.com
1.google.com
10.docs.google.com
10.drive.google.com
100.docs.google.com
[...]
```

### TLD (Top Level Domain) search

```plain
$ crobat -t example
example.ac
example.ai
example.am
example.at
example.be
example.bi
example.by
example.cc
example.cf
example.ch
example.cm
example.cn
example.co.il
example.co.in
example.co.kr
example.co.nz
example.co.uk
example.com
[...]
```

## URL List

- [Sonar.omnisint.io](https://sonar.omnisint.io/)
- [GitHub.com - SonarSearch](https://github.com/cgboal/sonarsearch)
