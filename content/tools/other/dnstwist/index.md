---
title : "DNStwist"
# pre : ' '
description : "Domain name permutation engine for detecting homograph phishing attacks, typosquatting, fraud and brand impersonation."
date : 2020-07-02T15:37:36+02:00
# hidden : true
# draft : true
weight : 500
# tags : ['']
---

---

Domain name permutation engine for detecting homograph phishing attacks, typosquatting, fraud and brand impersonation.

## Installation

```plain
git clone https://github.com/elceef/dnstwist.git
cd dnstwist
python3 -m pip install .
```

## Usage

```plain
dnstwist [OPTION]... DOMAIN
```

## Flags

```plain
dnstwist 20200521 by <marcin@ulikowski.pl>

Domain name permutation engine for detecting homograph phishing attacks, typosquatting, fraud and brand impersonation.

positional arguments:
  domain                      Domain name or URL to scan

optional arguments:
  -a, --all                   Show all DNS records
  -b, --banners               Determine HTTP and SMTP service banners
  -d FILE, --dictionary FILE  Generate more domains using dictionary FILE
  -f {cli,csv,json,list}, --format {cli,csv,json,list}
                              Output format (default: cli)
  -g, --geoip                 Lookup for GeoIP location
  -m, --mxcheck               Check if MX can be used to intercept emails
  -o FILE, --output FILE      Save output to FILE
  -r, --registered            Show only registered domain names
  -s, --ssdeep                Fetch web pages and compare their fuzzy hashes to evaluate similarity
  --ssdeep-url URL            Override URL to fetch the original web page from
  -t NUMBER, --threads NUMBER
                              Start specified NUMBER of threads (default: 10)
  -w, --whois                 Lookup WHOIS database for creation date
  --tld FILE                  Generate more domains by swapping TLD from FILE
  --nameservers LIST          DNS servers to query (separated with commas)
  --useragent STRING          User-Agent STRING to send with HTTP requests (default: Mozilla/5.0 dnstwist/20200521)
```

## Examples

```plain
$ dnstwist example.com
     _           _            _     _
  __| |_ __  ___| |___      _(_)___| |_
 / _` | '_ \/ __| __\ \ /\ / / / __| __|
| (_| | | | \__ \ |_ \ V  V /| \__ \ |_
 \__,_|_| |_|___/\__| \_/\_/ |_|___/\__| {20200521}

Processing 1650 permutations ····37%··59%····94%·· 93 hits

original*      example.com     93.184.216.34 2606:2800:220:1:248:1893:25c8:1946 NS:a.iana-servers.net MX:
addition       examplea.com    23.20.239.12 NS:nsg1.namebrightdns.com
addition       exampleb.com    23.20.239.12 NS:ns1.namebrightdns.com
addition       examplec.com    23.20.239.12 NS:nsg1.namebrightdns.com
addition       exampled.com    91.195.241.136 NS:ns1.sedoparking.com MX:mail.pickelhost.com
addition       examplee.com    167.88.193.189 NS:jm1.dns.com
addition       examplef.com    -
addition       exampleg.com    202.181.185.161 NS:ns6.timway.com MX:mx.zoho.com
addition       exampleh.com    -
addition       examplei.com    NS:ns1626.ztomy.com
addition       examplej.com    156.243.243.187 NS:f1g1ns1.dnspod.net
addition       examplek.com    -
addition       examplel.com    138.201.138.240 2a01:4f8:172:35ec::2 NS:b.ns14.net MX:mail.examplel.com
[...]
```

## URL List

- [GitHub.com - DNStwist](https://github.com/elceef/dnstwist)
