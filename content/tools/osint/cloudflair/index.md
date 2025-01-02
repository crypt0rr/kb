---
title : "Cloudflair"
# pre : ' '
description : "A tool to find origin servers of websites protected by CloudFlare who are publicly exposed and don't restrict network access to the CloudFlare IP ranges as they should."
date : 2021-03-01T07:46:52+01:00
# hidden : true
# draft : true
weight : 60
tags : ['OSINT', 'DNS', 'CloudFlare']
---

---

A tool to find origin servers of websites protected by CloudFlare who are publicly exposed and don't restrict network access to the CloudFlare IP ranges as they should.

## Installation

Register a free account at [Censys.io](https://censys.io/register) and save your [API keys](https://censys.io/account/api).

```plain
git clone https://github.com/christophetd/CloudFlair
```

```plain
pip2 install -r requirements.txt
```

## Usage

```plain
cloudflair.py [-h] [-o OUTPUT_FILE] [--censys-api-id CENSYS_API_ID]
                     [--censys-api-secret CENSYS_API_SECRET]
                     domain
```

## Flags

```plain
positional arguments:
  domain                The domain to scan

optional arguments:
  -h, --help            show this help message and exit
  -o OUTPUT_FILE, --output OUTPUT_FILE
                        A file to output likely origin servers to (default:
                        None)
  --censys-api-id CENSYS_API_ID
                        Censys API ID. Can also be defined using the
                        CENSYS_API_ID environment variable (default: None)
  --censys-api-secret CENSYS_API_SECRET
                        Censys API secret. Can also be defined using the
                        CENSYS_API_SECRET environment variable (default: None)

```

## Examples

Set environment variables or use inline instead.

```plain
export CENSYS_API_ID=<ID-KEY>
export CENSYS_API_SECRET=<SECRET-KEY>
```

```plain
$ python cloudflair.py kb.offsec.nl                        
[*] Retrieving Cloudflare IP ranges from https://www.cloudflare.com/ips-v4
[*] The target appears to be behind CloudFlare.
[*] Looking for certificates matching "kb.offsec.nl" using Censys
[*] 2 certificates matching "kb.offsec.nl" found.
[*] Looking for IPv4 hosts presenting these certificates...
[*] 0 IPv4 hosts presenting a certificate issued to "kb.offsec.nl" were found.
[-] The target is most likely not vulnerable.
```

## URL List

- [Github.com - Cloudflair](https://github.com/christophetd/CloudFlair)
- [Censys.io - Register](https://censys.io/register)
- [Linuxize.com - How to install pip2 on Ubuntu 20.04](https://linuxize.com/post/how-to-install-pip-on-ubuntu-20.04/)
