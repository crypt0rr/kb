---
title : "Subfinder"
# pre : ' '
description : "Subfinder is a subdomain discovery tool that discovers subdomains for websites by using passive online sources."
date : 2021-10-20T10:54:24+02:00
# hidden : true
# draft : true
weight : 60
tags : ['Framework', 'OSINT', 'DNS', 'Subdomain']
---

---

Is a subdomain discovery tool that discovers valid subdomains for websites by using passive online sources. It has a simple modular architecture and is optimized for speed. subfinder is built for doing one thing only - passive subdomain enumeration, and it does that very well.

We have designed subfinder to comply with all passive sources licenses, and usage restrictions, as well as maintained a consistently passive model to make it useful to both penetration testers and bug bounty hunters alike.

This tool can be easily combined with [dnsx]({{< ref "dnsx" >}}).

## Installation

```plain
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
```

### Post Installation Instructions

Subfinder will work after using the installation instructions however to configure Subfinder to work with certain services, you will need to have setup API keys. The following services do not work without an API key:

[Binaryedge](https://binaryedge.io), [C99](https://api.c99.nl/), [Certspotter](https://sslmate.com/certspotter/api/), [Chinaz](http://my.chinaz.com/ChinazAPI/DataCenter/MyDataApi), [Censys](https://censys.io), [Chaos](https://chaos.projectdiscovery.io), [DnsDB](https://api.dnsdb.info), [Fofa](https://fofa.so/static_pages/api_help), [Github](https://github.com), [Intelx](https://intelx.io), [Passivetotal](http://passivetotal.org), [Recon.dev](https://recon.dev), [Robtex](https://www.robtex.com/api/), [SecurityTrails](http://securitytrails.com), [Shodan](https://shodan.io), [Spyse](https://spyse.com), [Threatbook](https://x.threatbook.cn/en), [Virustotal](https://www.virustotal.com), [Zoomeye](https://www.zoomeye.org)

Theses values are stored in the `$HOME/.config/subfinder/config.yaml` file which will be created when you run the tool for the first time. The configuration file uses the YAML format. Multiple API keys can be specified for each of these services from which one of them will be used for enumeration.

For sources that require multiple keys, namely `Censys`, `Passivetotal`, they can be added by separating them via a colon (:).

An example config file -

```yaml
resolvers:
  - 1.1.1.1
  - 1.0.0.1
sources:
  - binaryedge
  - bufferover
  - censys
  - passivetotal
  - sitedossier
binaryedge:
  - 0bf8919b-aab9-42e4-9574-d3b639324597
  - ac244e2f-b635-4581-878a-33f4e79a2c13
censys:
  - ac244e2f-b635-4581-878a-33f4e79a2c13:dd510d6e-1b6e-4655-83f6-f347b363def9
certspotter: []
passivetotal:
  - sample-email@user.com:sample_password
securitytrails: []
shodan:
  - AAAAClP1bJJSRMEYJazgwhJKrggRwKA
github:
  - d23a554bbc1aabb208c9acfbd2dd41ce7fc9db39
  - asdsd54bbc1aabb208c9acfbd2dd41ce7fc9db39
```

## Usage

```plain
subfinder [flags]
```

## Flags

```plain
INPUT:
   -d, -domain string[]  domains to find subdomains for
   -dL, -list string     file containing list of domains for subdomain discovery

SOURCE:
   -s, -sources string[]           specific sources to use for discovery (-s crtsh,github). Use -ls to display all available sources.
   -recursive                      use only sources that can handle subdomains recursively (e.g. subdomain.domain.tld vs domain.tld)
   -all                            use all sources for enumeration (slow)
   -es, -exclude-sources string[]  sources to exclude from enumeration (-es alienvault,zoomeyeapi)

FILTER:
   -m, -match string[]   subdomain or list of subdomain to match (file or comma separated)
   -f, -filter string[]   subdomain or list of subdomain to filter (file or comma separated)

RATE-LIMIT:
   -rl, -rate-limit int      maximum number of http requests to send per second (global)
   -rls, -rate-limits value  maximum number of http requests to send per second four providers in key=value format (-rls hackertarget=10/m) (default ["github=30/m", "fullhunt=60/m", "robtex=18446744073709551615/ms", "securitytrails=1/s", "shodan=1/s", "virustotal=4/m", "hackertarget=2/s", "waybackarchive=15/m", "whoisxmlapi=50/s", "securitytrails=2/s"])
   -t int                    number of concurrent goroutines for resolving (-active only) (default 10)

UPDATE:
   -up, -update                 update subfinder to latest version
   -duc, -disable-update-check  disable automatic subfinder update check

OUTPUT:
   -o, -output string       file to write output to
   -oJ, -json               write output in JSONL(ines) format
   -oD, -output-dir string  directory to write output (-dL only)
   -cs, -collect-sources    include all sources in the output (-json only)
   -oI, -ip                 include host IP in output (-active only)

CONFIGURATION:
   -config string                flag config file (default "/Users/crypt0rr/Library/Application Support/subfinder/config.yaml")
   -pc, -provider-config string  provider config file (default "/Users/crypt0rr/Library/Application Support/subfinder/provider-config.yaml")
   -r string[]                   comma separated list of resolvers to use
   -rL, -rlist string            file containing list of resolvers to use
   -nW, -active                  display active subdomains only
   -proxy string                 http proxy to use with subfinder
   -ei, -exclude-ip              exclude IPs from the list of domains

DEBUG:
   -silent             show only subdomains in output
   -version            show version of subfinder
   -v                  show verbose output
   -nc, -no-color      disable color in output
   -ls, -list-sources  list all available sources
   -stats              report source statistics

OPTIMIZATION:
   -timeout int   seconds to wait before timing out (default 30)
   -max-time int  minutes to wait for enumeration results (default 10)
```

## Examples

```plain
$ subfinder -d hackerone.com

               __    _____           __         
   _______  __/ /_  / __(_)___  ____/ /__  _____
  / ___/ / / / __ \/ /_/ / __ \/ __  / _ \/ ___/
 (__  ) /_/ / /_/ / __/ / / / / /_/ /  __/ /    
/____/\__,_/_.___/_/ /_/_/ /_/\__,_/\___/_/

                projectdiscovery.io

[INF] Current subfinder version v2.6.5 (latest)
[INF] Loading provider config from /Users/crypt0rr/Library/Application Support/subfinder/provider-config.yaml
[INF] Enumerating subdomains for hackerone.com
events.hackerone.com
www.hackerone.com
links.hackerone.com
mta-sts.hackerone.com
api.hackerone.com
go.hackerone.com
gslink.hackerone.com
a.ns.hackerone.com
resources.hackerone.com
info.hackerone.com
mta-sts.managed.hackerone.com
design.hackerone.com
hackerone.com
docs.hackerone.com
mta-sts.forwarding.hackerone.com
support.hackerone.com
b.ns.hackerone.com
3d.hackerone.com
[INF] Found 18 subdomains for hackerone.com in 2 seconds 818 milliseconds
```

## URL List

- [Github.com - subfinder](https://github.com/projectdiscovery/subfinder)
