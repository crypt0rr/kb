---
title : "TheHarvester"
# pre : ' '
description : "Is used to gather open source intelligence (OSINT) on a company or domain."
date : 2020-03-14T19:48:31+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## TheHarvester

Is used to gather open source intelligence (OSINT) on a company or domain.

### Installation

```plain
git clone https://github.com/laramies/theHarvester.git
```

```plain
pip3 -r install requirements.txt
```

### Usage

```plain
python3 theHarvester.py [OPTIONS]
```

### Flags

```plain
usage: theHarvester.py [-h] -d DOMAIN [-l LIMIT] [-S START] [-g] [-p] [-s]
                       [-v] [-e DNS_SERVER] [-t DNS_TLD] [-r] [-n] [-c]
                       [-f FILENAME] [-b SOURCE]

theHarvester is used to gather open source intelligence (OSINT) on a company
or domain.

optional arguments:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        company name or domain to search
  -l LIMIT, --limit LIMIT
                        limit the number of search results, default=500
  -S START, --start START
                        start with result number X, default=0
  -g, --google-dork     use Google Dorks for Google search
  -p, --proxies         use proxies for requests, enter proxies in
                        proxies.yaml
  -s, --shodan          use Shodan to query discovered hosts
  -v, --virtual-host    verify host name via DNS resolution and search for
                        virtual hosts
  -e DNS_SERVER, --dns-server DNS_SERVER
                        DNS server to use for lookup
  -t DNS_TLD, --dns-tld DNS_TLD
                        perform a DNS TLD expansion discovery, default False
  -r, --take-over       Check for takeovers
  -n, --dns-lookup      enable DNS server lookup, default False
  -c, --dns-brute       perform a DNS brute force on the domain
  -f FILENAME, --filename FILENAME
                        save the results to an HTML and/or XML file
  -b SOURCE, --source SOURCE
                        baidu, bing, bingapi, bufferoverun, certspotter,
                        crtsh, dnsdumpster, dogpile, duckduckgo, exalead,
                        github-code, google, hunter, intelx, linkedin,
                        linkedin_links, netcraft, otx, securityTrails, spyse,
                        threatcrowd, trello, twitter, vhost, virustotal,
                        yahoo, all
```

### Examples

```plain
python3 theHarvester.py -d example.com -b google -l 1000

*******************************************************************
*  _   _                                            _             *
* | |_| |__   ___    /\  /\__ _ _ ____   _____  ___| |_ ___ _ __  *
* | __|  _ \ / _ \  / /_/ / _` | '__\ \ / / _ \/ __| __/ _ \ '__| *
* | |_| | | |  __/ / __  / (_| | |   \ V /  __/\__ \ ||  __/ |    *
*  \__|_| |_|\___| \/ /_/ \__,_|_|    \_/ \___||___/\__\___|_|    *
*                                                                 *
* theHarvester 3.2.0dev0                                          *
* Coded by Christian Martorella                                   *
* Edge-Security Research                                          *
* cmartorella@edge-security.com                                   *
*                                                                 *
******************************************************************* 


[*] Target: example.com

    Searching 0 results.
    Searching 100 results.
    Searching 200 results.
    Searching 300 results.
    Searching 400 results.
    Searching 500 results.
    Searching 600 results.
    Searching 700 results.
    Searching 800 results.
    Searching 900 results.
    Searching 1000 results.
[*] Searching Google.

[*] No IPs found.

[*] Emails found: 24
----------------------
abigail@example.com
email@example.com
example@example.com
hey@example.com
info@example.com
james@example.com
jenny.rosen@example.com
joe@example.com
john.doe@example.com
john@example.com
johndoe@example.com
johnsmith@example.com
mail@example.com
name@example.com
postmaster@example.com
root@example.com
someone@example.com
test+amazon@example.com
test+netflix@example.com
to1@example.com
uid1@example.com
username@example.com
webmaster@example.com
you@example.com

[*] Hosts found: 24
---------------------
2525www.example.com:
25www.example.com:
chef-server.example.com:
com.example.com:
internalnetwork.example.com:
intranet.example.com:
js.example.com:
kdc01.example.com:
kdc02.example.com:
mail.example.com:
p1.example.com:
p2.example.com:
public.example.com:
security.example.com:
sub.example.com:
subdomain.example.com:
this.example.com:
u003dwww.example.com:
u1.example.com:
ws2008r2.example.com:
www.example.com:93.184.216.34
www.example.com:93.184.216.34
www.example.com:93.184.216.34
x3ewww.example.com:
```

### URL list

* [GitHub.com - theHarvester](https://github.com/laramies/theHarvester)
* [Kali.org - theHarvester](https://tools.kali.org/information-gathering/theharvester)
