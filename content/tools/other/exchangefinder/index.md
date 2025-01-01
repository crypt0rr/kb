---
title : "ExchangeFinder"
# pre : ' '
description : "Find Microsoft Exchange instance for a given domain and identify the exact version."
date : 2022-09-13T12:10:15+02:00
# hidden : true
# draft : true
weight : 580
tags : ['Other', 'Exchange', 'Microsoft']
---

---

## Installation

Requirements:

```plain
python3 -m pip install pyparsing attrs certifi charset-normalizer idna more-itertools packaging pluggy py urllib3 wcwidth dnspython pytest requests termcolor
```

## Usage

```plain
exchangefinder.py [-h] [--domain DOMAIN] [--domains DOMAINS] [--useragent USERAGENT] [--output OUTPUT] [--verbose]
```

## Flags

```plain
DNSStager main parser

options:
  -h, --help            show this help message and exit
  --domain DOMAIN       The target domain you want to scan (example.com)
  --domains DOMAINS     Path to domains file you want to scan (domains.txt)
  --useragent USERAGENT
                        Useragent to use, the default is "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36."
  --output OUTPUT       Export results to given .csv file
  --verbose             Show detailed output
```

## Examples

```plain
$ python3 exchangefinder.py --domain offsec.nl              

    
    ______     __                           _______           __         
   / ____/  __/ /_  ____ _____  ____ ____  / ____(_)___  ____/ /__  _____
  / __/ | |/_/ __ \/ __ `/ __ \/ __ `/ _ \/ /_  / / __ \/ __  / _ \/ ___/
 / /____>  </ / / / /_/ / / / / /_/ /  __/ __/ / / / / / /_/ /  __/ /    
/_____/_/|_/_/ /_/\__,_/_/ /_/\__, /\___/_/   /_/_/ /_/\__,_/\___/_/     
                             /____/                                        
                                                
                                                Find that Microsoft Exchange server ..
    
[!] Scanning domain offsec.nl
        [+] The following MX records found for the main domain
        10 filter.fekahost.nl.

[!]     Scanning host (mail.offsec.nl)
[+]     IIS server detected (https://mail.offsec.nl)
[!]     Potential Microsoft Exchange Identified
[+]     Microsoft Exchange identified with the following details:

        Domain Found : https://mail.offsec.nl
        Exchange version : Exchange Server 2016 CU23 (2022H1)
        Login page : https://mail.offsec.nl/owa/auth/logon.aspx?url=https%3a%2f%2fmail.offsec.nl%2fowa%2f&reason=0
        IIS/Webserver version: Microsoft-IIS/10.0
```

## URL List

- [Github.com - ExchangeFinder](https://github.com/mhaskar/ExchangeFinder)
