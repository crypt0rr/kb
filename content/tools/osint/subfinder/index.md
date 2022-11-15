---
title : "Subfinder"
# pre : ' '
description : "Fast passive subdomain enumeration tool."
date : 2021-10-20T10:54:24+02:00
# hidden : true
# draft : true
weight : 0
tags : ['OSINT', 'DNS', 'Subdomain', 'Nameserver']
---

## Subfinder

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

| Flag             | Description                                                | Example                                  |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------- |
| -all             | Use all sources (slow) for enumeration                     | subfinder -d uber.com -all               |
| -b               | IP address to be used as local bind                        | subfinder -b 172.16.0.1                  |
| -config          | Configuration file for API Keys, etc                       | subfinder -config config.yaml            |
| -d               | Domain to find subdomains for                              | subfinder -d uber.com                    |
| -dL              | File containing list of domains to enumerate               | subfinder -dL hackerone-hosts.txt        |
| -exclude-sources | List of sources to exclude from enumeration                | subfinder -exclude-sources archiveis     |
| -max-time        | Minutes to wait for enumeration results (default 10)       | subfinder -max-time 1                    |
| -nC              | Don't Use colors in output                                 | subfinder -nC                            |
| -nW              | Remove Wildcard & Dead Subdomains from output              | subfinder -nW                            |
| -ls              | List all available sources                                 | subfinder -ls                            |
| -o               | File to write output to (optional)                         | subfinder -o output.txt                  |
| -oD              | Directory to write enumeration results to (optional)       | subfinder -oD ~/outputs                  |
| -oI              | Write output in Host,IP format                             | subfinder -oI                            |
| -oJ              | Write output in JSON lines Format                          | subfinder -oJ                            |
| -r               | Comma-separated list of resolvers to use                   | subfinder -r 1.1.1.1,1.0.0.1             |
| -rL              | Text file containing list of resolvers to use              | subfinder -rL resolvers.txt              |
| -recursive       | Enumeration recursive subdomains                           | subfinder -d news.yahoo.com -recursive   |
| -silent          | Show only subdomains in output                             | subfinder -silent                        |
| -sources         | Comma separated list of sources to use                     | subfinder -sources shodan,censys         |
| -t               | Number of concurrent goroutines for resolving (default 10) | subfinder -t 100                         |
| -timeout         | Seconds to wait before timing out (default 30)             | subfinder -timeout 30                    |
| -proxy           | HTTP proxy to use with subfinder                           | subfinder -proxy <http://localhost:3128> |
| -rate-limit      | Maximum number of HTTP requests to send per second         | subfinder -rate-limit 10                 |
| -v               | Show Verbose output                                        | subfinder -v                             |
| -version         | Show current program version                               | subfinder -version                       |

## Examples

```plain
$ subfinder -d hackerone.com

               __    _____           __         
   _______  __/ /_  / __(_)___  ____/ /__  _____
  / ___/ / / / __ \/ /_/ / __ \/ __  / _ \/ ___/
 (__  ) /_/ / /_/ / __/ / / / / /_/ /  __/ /    
/____/\__,_/_.___/_/ /_/_/ /_/\__,_/\___/_/ v2.4.9

        projectdiscovery.io

Use with caution. You are responsible for your actions
Developers assume no liability and are not responsible for any misuse or damage.
By using subfinder, you also agree to the terms of the APIs used.

[INF] Enumerating subdomains for hackerone.com

www.hackerone.com
support.hackerone.com
links.hackerone.com
api.hackerone.com
o1.email.hackerone.com
go.hackerone.com
3d.hackerone.com
resources.hackerone.com
a.ns.hackerone.com
b.ns.hackerone.com
mta-sts.hackerone.com
docs.hackerone.com
mta-sts.forwarding.hackerone.com
gslink.hackerone.com
hackerone.com
info.hackerone.com
mta-sts.managed.hackerone.com
events.hackerone.com

[INF] Found 18 subdomains for hackerone.com in 3 seconds 672 milliseconds
```

## URL List

* [Github.com - subfinder](https://github.com/projectdiscovery/subfinder)
