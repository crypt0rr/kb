---
title : "theHarvester"
# pre : ' '
description : "theHarvester is used to gather open source intelligence (OSINT) on a company or domain."
date : 2020-03-14T19:48:31+01:00
# hidden : true
# draft : true
weight : 350
tags : ['OSINT', 'DNS']
---

---

theHarvester is used to gather open source intelligence (OSINT) on a company or domain.

## Installation

```plain
git clone https://github.com/laramies/theHarvester.git
```

```plain
pip3 -r install requirements.txt
```

## Usage

```plain
theHarvester [-h] -d DOMAIN [-l LIMIT] [-S START] [-p] [-s] [--screenshot SCREENSHOT] [-v] [-e DNS_SERVER] [-r] [-n] [-c] [-f FILENAME] [-b SOURCE]
```

## Flags

```plain
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Company name or domain to search.
  -l LIMIT, --limit LIMIT
                        Limit the number of search results, default=500.
  -S START, --start START
                        Start with result number X, default=0.
  -p, --proxies         Use proxies for requests, enter proxies in proxies.yaml.
  -s, --shodan          Use Shodan to query discovered hosts.
  --screenshot SCREENSHOT
                        Take screenshots of resolved domains specify output directory: --screenshot output_directory
  -v, --virtual-host    Verify host name via DNS resolution and search for virtual hosts.
  -e DNS_SERVER, --dns-server DNS_SERVER
                        DNS server to use for lookup.
  -r, --take-over       Check for takeovers.
  -n, --dns-lookup      Enable DNS server lookup, default False.
  -c, --dns-brute       Perform a DNS brute force on the domain.
  -f FILENAME, --filename FILENAME
                        Save the results to an XML and JSON file.
  -b SOURCE, --source SOURCE
                        anubis, baidu, bevigil, binaryedge, bing, bingapi, bufferoverun, censys, certspotter, crtsh, dnsdumpster, duckduckgo, fullhunt, github-code, hackertarget,
                        hunter, intelx, omnisint, otx, pentesttools, projectdiscovery, qwant, rapiddns, rocketreach, securityTrails, sublist3r, threatcrowd, threatminer, urlscan,
                        virustotal, yahoo, zoomeye
```

## Examples

```plain
$ theHarvester -d example.com -b duckduckgo
*******************************************************************
*  _   _                                            _             *
* | |_| |__   ___    /\  /\__ _ _ ____   _____  ___| |_ ___ _ __  *
* | __|  _ \ / _ \  / /_/ / _` | '__\ \ / / _ \/ __| __/ _ \ '__| *
* | |_| | | |  __/ / __  / (_| | |   \ V /  __/\__ \ ||  __/ |    *
*  \__|_| |_|\___| \/ /_/ \__,_|_|    \_/ \___||___/\__\___|_|    *
*                                                                 *
* theHarvester 4.2.0                                              *
* Coded by Christian Martorella                                   *
* Edge-Security Research                                          *
* cmartorella@edge-security.com                                   *
*                                                                 *
*******************************************************************

[*] Target: example.com 

[*] Searching Duckduckgo. 

[*] No IPs found.

[*] No emails found.

[*] Hosts found: 1
---------------------
www.example.com:93.184.216.34
```

## URL List

- [GitHub.com - theHarvester](https://github.com/laramies/theHarvester)
- [Kali.org - theHarvester](https://tools.kali.org/information-gathering/theharvester)
