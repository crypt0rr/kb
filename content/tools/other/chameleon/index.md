---
title : "Chameleon"
# pre : ' '
description : "Chameleon is a tool which assists red teams in categorizing their infrastructure under arbitrary categories."
date : 2021-03-04T12:33:06+01:00
# hidden : true
# draft : true
weight : 310
# tags : ['']
---

---

A tool which assists red teams in categorizing their infrastructure under arbitrary categories.

Currently, the tool supports arbitrary categorization for Bluecoat, McAfee Trustedsource and IBM X-Force. However, the tool is designed in such a way that additional proxies can be added with ease.

## Installation

```plain
git clone https://github.com/mdsecactivebreach/Chameleon
```

## Usage

```plain
chameleon.py [-h] [--proxy <proxy>] [--check] [--submit]
               [--domain <domain>]
```

## Flags

```plain
optional arguments:
  -h, --help         show this help message and exit
  --proxy <proxy>    Proxy type: a = all, b = bluecoat, m = mcafee, i = IBM
                     Xforce
  --check            Perform check on current category
  --submit           Submit new category
  --domain <domain>  Domain to validate
```

## Examples

### Checking the category of your website against all supported proxies

```plain
$ python chameleon.py --proxy a --check --domain google.com

                     _.....---..._
      _..-'-.   _.--'             '--.._
  _.-' (  0) Y''                        ''-.._
 (---.._,                                     '-._
  `---.,___.-\  \----......./  /..------...____   '-.
     _/  /  _/  /         __\  \   __\  \      `-.   \
    (((-'  (((-'         (((---'  (((---`         )  /
                                               .-'.-'
    Chameleon: @domchell, MDSec ActiveBreach  (__`-,
                                                 ``

[-] Targeting Bluecoat WebPulse
[-] Checking category for google.com
[-] Your site is categorised as: Search Engines/Portals
[-] Targeting McAfee Trustedsource
[-] Getting anti-automation tokens
[-] Checking category for google.com
[-] Found category: - Search Engines
[-] Targeting IBM Xforce
[-] IBM xForce Check: google.com
[-] Domain categorised as Search Engines / Web Catalogues / Portals
```

### Submitting your domain for the financial category for McAfee proxy only

```plain
$ python chameleon.py --proxy m --submit --domain foobar.com

                     _.....---..._
      _..-'-.   _.--'             '--.._
  _.-' (  0) Y''                        ''-.._
 (---.._,                                     '-._
  `---.,___.-\  \----......./  /..------...____   '-.
     _/  /  _/  /         __\  \   __\  \      `-.   \
    (((-'  (((-'         (((---'  (((---`         )  /
                                               .-'.-'
    Chameleon: @domchell, MDSec ActiveBreach  (__`-,
                                                 ``

[-] Targeting McAfee Trustedsource
[-] Getting anti-automation tokens
[-] Checking category for foobar.com
[-] Found category: - Personal Pages
[-] Submitting URL for finance category
[-] URL submitted, please wait up to 6 hours for categorization
```

## URL List

- [Github.com - Chameleon](https://github.com/mdsecactivebreach/Chameleon)
