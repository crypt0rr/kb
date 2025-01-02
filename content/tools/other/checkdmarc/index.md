---
title : "Checkdmarc"
# pre : ' '
description : "Validates and parses SPF amd DMARC DNS records."
date : 2020-03-13T14:26:48+01:00
# hidden : true
# draft : true
weight : 320
# tags : [""]
---

---

Validates and parses SPF amd DMARC DNS records.

## Installation

```plain
python3 -m pip install checkdmarc
```

## Usage

```plain
checkdmarc [OPTIONS] domain
```

## Flags

```plain
usage: checkdmarc [-h] [-p] [--ns NS [NS ...]] [--mx MX [MX ...]] [-d]
                  [-f FORMAT] [-o OUTPUT [OUTPUT ...]]
                  [-n NAMESERVER [NAMESERVER ...]] [-t TIMEOUT] [-v] [-w WAIT]
                  [--skip-tls] [--debug]
                  domain [domain ...]

Validates and parses SPF amd DMARC DNS records

positional arguments:
  domain                one or more domains, or a single path to a file
                        containing a list of domains

optional arguments:
  -h, --help            show this help message and exit
  -p, --parked          indicate that the domains are parked
  --ns NS [NS ...]      approved nameserver substrings
  --mx MX [MX ...]      approved MX hostname substrings
  -d, --descriptions    include descriptions of DMARC tags in the JSON output
  -f FORMAT, --format FORMAT
                        specify JSON or CSV screen output format
  -o OUTPUT [OUTPUT ...], --output OUTPUT [OUTPUT ...]
                        one or more file paths to output to (must end in .json
                        or .csv) (silences screen output)
  -n NAMESERVER [NAMESERVER ...], --nameserver NAMESERVER [NAMESERVER ...]
                        nameservers to query (Default is Cloudflare's
  -t TIMEOUT, --timeout TIMEOUT
                        number of seconds to wait for an answer from DNS
                        (default 2.0)
  -v, --version         show program's version number and exit
  -w WAIT, --wait WAIT  number of seconds to wait between checking domains
                        (default 0.0)
  --skip-tls            skip TLS/SSL testing
  --debug               enable debugging output
```

## Examples

```plain
$ checkdmarc --nameserver=1.1.1.1 amazon.com
{
  "domain": "amazon.com",
  "base_domain": "amazon.com",
  "dnssec": false,
  "ns": {
    "hostnames": [
      "pdns1.ultradns.net",
      "ns4.p31.dynect.net",
      "ns3.p31.dynect.net",
      "ns2.p31.dynect.net",
      "ns1.p31.dynect.net",
      "pdns6.ultradns.co.uk"
    ],
    "warnings": []
  },
  "mx": {
    "hosts": [
      {
        "preference": 5,
        "hostname": "amazon-smtp.amazon.com",
        "addresses": [
          "207.171.188.4",
          "52.119.213.148",
          "52.94.124.5"
        ],
        "tls": false,
        "starttls": false
      }
    ],
    "warnings": [
      "The DNS operation timed out after 2.0 seconds",
      "The reverse DNS of 207.171.188.4 is smtp-fw-0101.amazon.com, but the A/AAAA DNS records for smtp-fw-0101.amazon.com do not resolve to 207.171.188.4",
      "52.119.213.148 does not have any reverse DNS (PTR) records",
      "The DNS operation timed out after 2.0 seconds",
      "The reverse DNS of 52.94.124.5 is smtp-fw-7001.amazon.com, but the A/AAAA DNS records for smtp-fw-7001.amazon.com do not resolve to 52.94.124.5",
      "amazon-smtp.amazon.com: Could not connect:  SMTP error code 554 - Not allowed"
    ]
  },
  "spf": {
    "record": "v=spf1 include:spf1.amazon.com include:spf2.amazon.com include:amazonses.com -all",
    "valid": false,
    "warnings": [],
    "error": "The domain amazonses.com does not exist"
[...]
```

## URL List

- [Pypi.org - checkdmarc](https://pypi.org/project/checkdmarc/)
