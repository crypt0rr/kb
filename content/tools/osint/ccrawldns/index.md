---
title : "CCrawlDNS"
# pre : ' '
description : "This small utility retrieves from the CommonCrawl data set unique subdomains for a given domain name."
date : 2021-08-04T15:10:35+02:00
# hidden : true
# draft : true
weight : 50
tags : ['OSINT', 'DNS']
---

---

This small utility retrieves from the CommonCrawl data set unique subdomains for a given domain name.

## Installation

```plain
git clone https://github.com/lgandx/CCrawlDNS
```

## Usage

```plain
python3 CCrawlDNS.py -p -f asp -d microsoft.com
```

## Flags

```plain
Options:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain=DOMAIN
                        Target domain
  -p, --printurl        Print all collected URL
  -f FILEEXT, --FileExt=FILEEXT
                        Print collected URL with the following file extension
```

## Examples

```plain
$ python3 CCrawlDNS.py -d example.com
Processing CC-MAIN-2021-25
Processing CC-MAIN-2021-21
Processing CC-MAIN-2021-17
[...]
Processing CC-MAIN-2014-35
CC-MAIN-2015-11 Processed
CC-MAIN-2017-39 Processed
CC-MAIN-2014-52 Processed
CC-MAIN-2018-30 Processed
CC-MAIN-2008-2009 Processed
CC-MAIN-2015-35 Processed
CC-MAIN-2014-42 Processed
CC-MAIN-2020-05 Processed
CC-MAIN-2020-24 Processed
CC-MAIN-2017-30 Processed
CC-MAIN-2016-18 Processed
CC-MAIN-2019-43 Processed
CC-MAIN-2019-26 Processed
CC-MAIN-2018-47 Processed

[+] In total 3 unique subdomains were retrieved.
Subdomain found: example.com
Subdomain found: www.example.com
Subdomain found: www.example.com.
```

## URL List

- [Github.com - CCrawlDNS](https://github.com/lgandx/CCrawlDNS)
