---
title : "EmailSecCheck"
# pre : ' '
description : "EmailSecCheck is a lightweight Python utility used to check for common SPF/DMARC misconfigurations that may allow for email spoofing."
date : 2022-02-08T16:38:29+01:00
# hidden : true
# draft : true
weight : 560
# tags : ['']
---

---

EmailSecCheck is a lightweight Python utility that checks whether email security DNS records (DMARC and SPF) are configured properly for a domain. EmailSecCheck is powered by [checkdmarc](https://github.com/domainaware/checkdmarc), and leverages it to identify common misconfigurations in DNS records that may enable for email spoofing.

Email spoofing is identified under the following conditions:

- SPF Issues
  - SPF configured as something other than `fail` or `softfail`
  - SPF record is missing
  - SPF record contains a syntax error
- DMARC Issues
  - Multiple SPF records exist
  - DMARC record is missing
  - DMARC record contains a syntax error
  - Multiple DMARC records exist

## Installation

```plain
git clone https://github.com/MarkoH17/EmailSecCheck.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
emailseccheck.py [-h] (--domain DOMAIN | --domains_file DOMAINS_FILE)
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  --domain DOMAIN       Domain to check for SPF/DMARC issues (default: None)
  --domains_file DOMAINS_FILE
                        File containing list of domains to check for SPF/DMARC issues (default: None)
```

## Examples

```plain
$ python3 emailseccheck.py --domain offsec.nl
 [+] INFO: Analyzing 1 domain(s)...
 [+] INFO: Analyzing offsec.nl
 [-] WARN: DMARC record is missing for 'offsec.nl'
 

 Spoofing possible for 1 domain(s): 
   > offsec.nl
```

## URL List

- [Github.com - EmailSecCheck](https://github.com/MarkoH17/EmailSecCheck)
