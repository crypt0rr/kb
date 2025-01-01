---
title : "BBOT"
# pre : ' '
description : "OSINT automation for hackers."
date : 2023-06-18T15:43:26+02:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

OSINT automation for hackers.

## Installation

```plain
python3 -m pip install bbot
```

For other installation options please refer to [Github.com](https://github.com/blacklanternsecurity/bbot).

## Usage

```plain
bbot [-h] [--help-all] [-t TARGET [TARGET ...]] [-w WHITELIST [WHITELIST ...]] [-b BLACKLIST [BLACKLIST ...]] [--strict-scope] [-n SCAN_NAME] [-m MODULE [MODULE ...]] [-l] [-em MODULE [MODULE ...]]
            [-f FLAG [FLAG ...]] [-rf FLAG [FLAG ...]] [-ef FLAG [FLAG ...]] [-om MODULE [MODULE ...]] [-o DIR] [-c [CONFIG ...]] [--allow-deadly] [-v] [-d] [-s] [--force] [-y] [--dry-run] [--current-config]
            [--save-wordcloud FILE] [--load-wordcloud FILE] [--no-deps | --force-deps | --retry-deps | --ignore-failed-deps | --install-all-deps] [-a] [--version]
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  --help-all            Display full help including module config options
  -n SCAN_NAME, --name SCAN_NAME
                        Name of scan (default: random)
  -m MODULE [MODULE ...], --modules MODULE [MODULE ...]
                        Modules to enable. Choices: affiliates,anubisdb,asn,azure_tenant,badsecrets,bevigil,binaryedge,bucket_aws,bucket_azure,bucket_digitalocean,bucket_firebase,bucket_gcp,builtwith,bypass403,c99,censys,certspotter,crobat,crt,dnscommonsrv,dnsdumpster,dnszonetransfer,emailformat,ffuf,ffuf_shortnames,fingerprintx,fullhunt,generic_ssrf,github,gowitness,hackertarget,host_header,httpx,hunt,hunterio,iis_shortnames,ipneighbor,ipstack,leakix,masscan,massdns,naabu,ntlm,nuclei,otx,paramminer_cookies,paramminer_getparams,paramminer_headers,passivetotal,pgp,rapiddns,riddler,robots,secretsdb,securitytrails,shodan_dns,skymem,smuggler,social,sslcert,subdomain_hijack,sublist3r,telerik,threatminer,url_manipulation,urlscan,vhost,viewdns,virustotal,wafw00f,wappalyzer,wayback,zoomeye
  -l, --list-modules    List available modules.
  -em MODULE [MODULE ...], --exclude-modules MODULE [MODULE ...]
                        Exclude these modules.
  -f FLAG [FLAG ...], --flags FLAG [FLAG ...]
                        Enable modules by flag. Choices: active,affiliates,aggressive,cloud-enum,deadly,email-enum,iis-shortnames,passive,portscan,report,safe,service-enum,slow,social-enum,subdomain-enum,subdomain-hijack,web-basic,web-paramminer,web-screenshots,web-thorough
  -rf FLAG [FLAG ...], --require-flags FLAG [FLAG ...]
                        Only enable modules with these flags (e.g. -rf passive)
  -ef FLAG [FLAG ...], --exclude-flags FLAG [FLAG ...]
                        Disable modules with these flags. (e.g. -ef aggressive)
  -om MODULE [MODULE ...], --output-modules MODULE [MODULE ...]
                        Output module(s). Choices: asset_inventory,csv,http,human,json,neo4j,python,web_report,websocket
  -o DIR, --output-dir DIR
  -c [CONFIG ...], --config [CONFIG ...]
                        custom config file, or configuration options in key=value format: 'modules.shodan.api_key=1234'
  --allow-deadly        Enable the use of highly aggressive modules
  -v, --verbose         Be more verbose
  -d, --debug           Enable debugging
  -s, --silent          Be quiet
  --force               Run scan even if module setups fail
  -y, --yes             Skip scan confirmation prompt
  --dry-run             Abort before executing scan
  --current-config      Show current config in YAML format

Target:
  -t TARGET [TARGET ...], --targets TARGET [TARGET ...]
                        Targets to seed the scan
  -w WHITELIST [WHITELIST ...], --whitelist WHITELIST [WHITELIST ...]
                        What's considered in-scope (by default it's the same as --targets)
  -b BLACKLIST [BLACKLIST ...], --blacklist BLACKLIST [BLACKLIST ...]
                        Don't touch these things
  --strict-scope        Don't consider subdomains of target/whitelist to be in-scope

Word cloud:
  Save/load wordlist of common words gathered during a scan

  --save-wordcloud FILE
                        Output wordcloud to custom file when the scan completes
  --load-wordcloud FILE
                        Load wordcloud from a custom file

Module dependencies:
  Control how modules install their dependencies

  --no-deps             Don't install module dependencies
  --force-deps          Force install all module dependencies
  --retry-deps          Try again to install failed module dependencies
  --ignore-failed-deps  Run modules even if they have failed dependencies
  --install-all-deps    Install dependencies for all modules

Agent:
  Report back to a central server

  -a, --agent-mode      Start in agent mode

Misc:
  --version             show BBOT version and exit

EXAMPLES

    Subdomains:
        bbot -t evilcorp.com -f subdomain-enum

    Subdomains (passive only):
        bbot -t evilcorp.com -f subdomain-enum -rf passive

    Subdomains + port scan + web screenshots:
        bbot -t evilcorp.com -f subdomain-enum -m naabu gowitness -n my_scan -o .

    Subdomains + basic web scan (wappalyzer, robots.txt, iis shortnames, etc.):
        bbot -t evilcorp.com -f subdomain-enum web-basic

    Subdomains + web spider (search for emails, etc.):
        bbot -t evilcorp.com -f subdomain-enum -c web_spider_distance=2 web_spider_depth=2

    Subdomains + emails + cloud + port scan + non-intrusive web + web screenshots + nuclei:
        bbot -t evilcorp.com -f subdomain-enum email-enum cloud-enum web-basic -m naabu gowitness nuclei --allow-deadly

    List modules:
        bbot -l
```

## Examples

For examples please refer to [Github.com](https://github.com/blacklanternsecurity/bbot#scanning-with-bbot)

```plain
$ bbot -t offsec.nl -f subdomain-enum -m naabu gowitness -n my_scan -o .
[REDACTED]
[SUCC] bbot.cli: Scan ready. Press enter to execute my_scan

[SUCC] bbot.scanner: Starting scan my_scan
[INFO] bbot.scanner: my_scan: Modules running: human, json
[INFO] bbot.scanner: my_scan: No events produced yet
[INFO] bbot.scanner: my_scan: No events in queue
[SCAN]                  my_scan (SCAN:7f6e092f29d9ba1447bdccf5dc192f8bfef122e0) TARGET  (distance-0)
[DNS_NAME]              offsec.nl       TARGET  (a-record, aaaa-record, cdn-cloudflare, distance-0, domain, in-scope, mx-record, ns-record, resolved, soa-record, target, txt-record)
[INFO] bbot.modules.massdns: Brute-forcing subdomains for offsec.nl
[IP_ADDRESS]            2606:4700:3035::6815:43cb       AAAA    (cdn-cloudflare, distance-1, internal, ipv6)
[ASN]                   {"asn": "13335", "country": "US", "description": "Cloudflare, Inc.", "name": "CLOUDFLARENET", "subnet": "2606:4700:3035::/48"}  asn     (distance-2)
[ASN]                   {"asn": "13335", "country": "US", "description": "Cloudflare, Inc.", "name": "CLOUDFLARENET", "subnet": "2606:4700:3030::/48"}  asn     (distance-2)
[OPEN_TCP_PORT]         offsec.nl:443   naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         offsec.nl:80    naabu   (distance-0, in-scope)
[IP_ADDRESS]            2606:4700:3030::ac43:b494       AAAA    (cdn-cloudflare, distance-1, internal, ipv6)
[OPEN_TCP_PORT]         offsec.nl:8443  naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         offsec.nl:8080  naabu   (distance-0, in-scope)
[DNS_NAME]              lock.offsec.nl  certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME_UNRESOLVED]   temp2.offsec.nl otx     (distance-0, in-scope, subdomain, unresolved)
[DNS_NAME]              lock.offsec.nl  leakix  (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              temp.offsec.nl  hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME_UNRESOLVED]   test.offsec.nl  otx     (distance-0, in-scope, subdomain, unresolved)
[DNS_NAME]              temp.offsec.nl  otx     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              temp.offsec.nl  dnsdumpster     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     leakix  (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     otx     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     dnsdumpster     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              saf.offsec.nl   leakix  (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              offsec.nl       speculate       (a-record, aaaa-record, cdn-cloudflare, distance-0, domain, in-scope, mx-record, ns-record, resolved, soa-record, txt-record)
[DNS_NAME]              saf.offsec.nl   hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://offsec.nl/      naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-302)
[OPEN_TCP_PORT]         lock.offsec.nl:8443     naabu   (distance-0, in-scope)
[DNS_NAME]              mha.offsec.nl   certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              mha.offsec.nl   hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[ASN]                   {"asn": "13335", "country": "US", "description": "Cloudflare, Inc.", "name": "CLOUDFLARENET", "subnet": "172.67.176.0/20"}      asn     (distance-2)
[DNS_NAME]              mha.offsec.nl   leakix  (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   http://offsec.nl/       naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-302)
[DNS_NAME_UNRESOLVED]   temp2.offsec.nl crt     (distance-0, in-scope, subdomain, unresolved)
[DNS_NAME_UNRESOLVED]   test.offsec.nl  crt     (distance-0, in-scope, subdomain, unresolved)
[OPEN_TCP_PORT]         lock.offsec.nl:8080     naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         lock.offsec.nl:443      naabu   (distance-0, in-scope)
[DNS_NAME]              mha.offsec.nl   crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              saf.offsec.nl   crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              saf.offsec.nl   otx     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[OPEN_TCP_PORT]         temp.offsec.nl:443      naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         temp.offsec.nl:8443     naabu   (distance-0, in-scope)
[DNS_NAME]              saf.offsec.nl   dnsdumpster     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[IP_ADDRESS]            172.67.180.148  A       (cdn-cloudflare, distance-1, internal, ipv4)
[OPEN_TCP_PORT]         temp.offsec.nl:80       naabu   (distance-0, in-scope)
[DNS_NAME]              lock.offsec.nl  crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              temp.offsec.nl  crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[OPEN_TCP_PORT]         temp.offsec.nl:8080     naabu   (distance-0, in-scope)
[URL]                   https://offsec.nl:8443/ naabu   (dir, distance-0, in-scope, ip-172-67-180-148, status-302)
[DNS_NAME]              saf.offsec.nl   certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              msportals.offsec.nl     hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              msportals.offsec.nl     leakix  (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[OPEN_TCP_PORT]         lock.offsec.nl:80       naabu   (distance-0, in-scope)
[DNS_NAME]              msportals.offsec.nl     certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              msportals.offsec.nl     crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[IP_ADDRESS]            104.21.67.203   A       (cdn-cloudflare, distance-1, internal, ipv4)
[ASN]                   {"asn": "13335", "country": "US", "description": "Cloudflare, Inc.", "name": "CLOUDFLARENET", "subnet": "104.21.64.0/20"}       asn     (distance-2)
[DNS_NAME]              kb.offsec.nl    otx     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    rapiddns        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    urlscan (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    certspotter     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    hackertarget    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    dnsdumpster     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    crt     (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   http://offsec.nl:8080/  naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-302)
[URL]                   https://temp.offsec.nl:8443/    naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-302)
[URL]                   https://temp.offsec.nl/ naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-302)
[FINDING]               {"description": "JWT Identified [eyJraWQiOiI0OGM4NjI0MGIzMzAyODAxMDM2Y2VkMjA4NTc1YWM1OTkyOWNlMzM5ZjBjMjhlMTZhYjQxMThkN2ZjNjk5M2RlIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzZXJ2aWNlX3Rva2VuX3N0YXR1cyI6ZmFsc2UsImlhdCI6MTY4NzA5NjU3OSwic2VydmljZV90b2tlbl9pZCI6IiIsImF1ZCI6IjEwMTRlZjdkZjdhOGYzYzhmNTk1NTQwMzk1MjNhZDc5MTMxNWU0NzZhNGJlMmJiNjZlZWYwZTViZWY1ZTkxZDUiLCJob3N0bmFtZSI6InRlbXAub2Zmc2VjLm5sIiwiYXBwX3Nlc3Npb25faGFzaCI6IjU4YWI3NmQ1ZTBmNDJjMjA2OTQzNDk3ZDBlYmQwMTNhOWRlNWZkZDFiMGQ4NGZhZDZlNTllOGFlMDQ0OTkxZTEiLCJuYmYiOjE2ODcwOTY1NzksImlzX3dhcnAiOmZhbHNlLCJpc19nYXRld2F5IjpmYWxzZSwidHlwZSI6Im1ldGEiLCJyZWRpcmVjdF91cmwiOiJcLyIsIm10bHNfYXV0aCI6eyJjZXJ0X2lzc3Vlcl9za2kiOiIiLCJjZXJ0X3ByZXNlbnRlZCI6ZmFsc2UsImNlcnRfc2VyaWFsIjoiIiwiY2VydF9pc3N1ZXJfZG4iOiIiLCJhdXRoX3N0YXR1cyI6Ik5PTkUifSwiYXV0aF9zdGF0dXMiOiJOT05FIn0.d1sLozGPk6kxxNGcP8rIU9bpgzR96KxO04fbvlUfCEtclt-7sORzre3On9f89V7AchRFZaJpvkqfTbP8QAc0Idg5f2Ry9g7FmLihH-czjcv7TUNV49uGIbmEm3E7Fef3h1JziPlLRdDxsyND33IoAykifmR1GK8eHNhoqWH6un5feDkWuukeEk0vFgT0_X0CumsOWWICpAfp7lLN5Zod-T3pQj-V7SE32aM-dS_YuHOMG1F8MDVxYpuj1nVSSXp2suyfCW4jkgzR0iFWBNQmbXCZUPfV_wz3MTpHihU0wUNw3gNTHjAUrhzSeYqSBsTe_UE4Crr8rEfWMP8qYQuwhg]", "host": "temp.offsec.nl", "url": "https://temp.offsec.nl:8443"}   excavate        (distance-0, in-scope)
[FINDING]               {"description": "JWT Identified [eyJraWQiOiI0OGM4NjI0MGIzMzAyODAxMDM2Y2VkMjA4NTc1YWM1OTkyOWNlMzM5ZjBjMjhlMTZhYjQxMThkN2ZjNjk5M2RlIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzZXJ2aWNlX3Rva2VuX3N0YXR1cyI6ZmFsc2UsImlhdCI6MTY4NzA5NjU3OSwic2VydmljZV90b2tlbl9pZCI6IiIsImF1ZCI6IjEwMTRlZjdkZjdhOGYzYzhmNTk1NTQwMzk1MjNhZDc5MTMxNWU0NzZhNGJlMmJiNjZlZWYwZTViZWY1ZTkxZDUiLCJob3N0bmFtZSI6InRlbXAub2Zmc2VjLm5sIiwiYXBwX3Nlc3Npb25faGFzaCI6IjU4YWI3NmQ1ZTBmNDJjMjA2OTQzNDk3ZDBlYmQwMTNhOWRlNWZkZDFiMGQ4NGZhZDZlNTllOGFlMDQ0OTkxZTEiLCJuYmYiOjE2ODcwOTY1NzksImlzX3dhcnAiOmZhbHNlLCJpc19nYXRld2F5IjpmYWxzZSwidHlwZSI6Im1ldGEiLCJyZWRpcmVjdF91cmwiOiJcLyIsIm10bHNfYXV0aCI6eyJjZXJ0X2lzc3Vlcl9za2kiOiIiLCJjZXJ0X3ByZXNlbnRlZCI6ZmFsc2UsImNlcnRfc2VyaWFsIjoiIiwiY2VydF9pc3N1ZXJfZG4iOiIiLCJhdXRoX3N0YXR1cyI6Ik5PTkUifSwiYXV0aF9zdGF0dXMiOiJOT05FIn0.d1sLozGPk6kxxNGcP8rIU9bpgzR96KxO04fbvlUfCEtclt-7sORzre3On9f89V7AchRFZaJpvkqfTbP8QAc0Idg5f2Ry9g7FmLihH-czjcv7TUNV49uGIbmEm3E7Fef3h1JziPlLRdDxsyND33IoAykifmR1GK8eHNhoqWH6un5feDkWuukeEk0vFgT0_X0CumsOWWICpAfp7lLN5Zod-T3pQj-V7SE32aM-dS_YuHOMG1F8MDVxYpuj1nVSSXp2suyfCW4jkgzR0iFWBNQmbXCZUPfV_wz3MTpHihU0wUNw3gNTHjAUrhzSeYqSBsTe_UE4Crr8rEfWMP8qYQuwhg]", "host": "temp.offsec.nl", "url": "https://temp.offsec.nl:8443"}   excavate        (distance-0, in-scope)
[DNS_NAME]              temp.offsec.nl  excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://lock.offsec.nl:8443/    naabu   (dir, distance-0, http-title-lock-your-laptop, in-scope, ip-104-21-67-203, status-200)
[FINDING]               {"description": "JWT Identified [eyJraWQiOiI0OGM4NjI0MGIzMzAyODAxMDM2Y2VkMjA4NTc1YWM1OTkyOWNlMzM5ZjBjMjhlMTZhYjQxMThkN2ZjNjk5M2RlIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzZXJ2aWNlX3Rva2VuX3N0YXR1cyI6ZmFsc2UsImlhdCI6MTY4NzA5NjU3OSwic2VydmljZV90b2tlbl9pZCI6IiIsImF1ZCI6IjEwMTRlZjdkZjdhOGYzYzhmNTk1NTQwMzk1MjNhZDc5MTMxNWU0NzZhNGJlMmJiNjZlZWYwZTViZWY1ZTkxZDUiLCJob3N0bmFtZSI6InRlbXAub2Zmc2VjLm5sIiwiYXBwX3Nlc3Npb25faGFzaCI6IjlmMjhjNmY4NzdiYTJhZTM0Zjg1Y2Y0MTdjNDQzNTAxMDhiZjg3MDI0ZjdiZThiNTcxZjI0YzQ0M2UzZjkzYWEiLCJuYmYiOjE2ODcwOTY1NzksImlzX3dhcnAiOmZhbHNlLCJpc19nYXRld2F5IjpmYWxzZSwidHlwZSI6Im1ldGEiLCJyZWRpcmVjdF91cmwiOiJcLyIsIm10bHNfYXV0aCI6eyJjZXJ0X2lzc3Vlcl9za2kiOiIiLCJjZXJ0X3ByZXNlbnRlZCI6ZmFsc2UsImNlcnRfc2VyaWFsIjoiIiwiY2VydF9pc3N1ZXJfZG4iOiIiLCJhdXRoX3N0YXR1cyI6Ik5PTkUifSwiYXV0aF9zdGF0dXMiOiJOT05FIn0.v6ysDmjEtO3TvmWIDGgHzNhxLP5_4oAOJYF8QuCUJ6DPa8XdsQsc-eaQDMe88Oy3bwIrNAc8jG0QFxncclX2WtQP2zkwUqHHw7TQky_rvz2NlMlobmOKhrZ3tGEp9SBrfx3jQFznSOrQvNvM-1G5YlaRXZHtL6DSHYh7fpj5Nipe_hhcWhpv8ftKZGMNXePcUQxy-AoExWLAtXUzPDcJ1YfI4mWHeRIVr7_lt3v_QmUPj2JZWcLKJpywjGIx-aQqLmF5HkLiJl1F56_9fqHwmGRm_kBrxMR2Fm1da5I2Ij1t-fYWychQ1NwkgRPQkopSVJgQcyONRiLVrnVkZWREwQ]", "host": "temp.offsec.nl", "url": "https://temp.offsec.nl:443"}    excavate        (distance-0, in-scope)
[FINDING]               {"description": "JWT Identified [eyJraWQiOiI0OGM4NjI0MGIzMzAyODAxMDM2Y2VkMjA4NTc1YWM1OTkyOWNlMzM5ZjBjMjhlMTZhYjQxMThkN2ZjNjk5M2RlIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzZXJ2aWNlX3Rva2VuX3N0YXR1cyI6ZmFsc2UsImlhdCI6MTY4NzA5NjU3OSwic2VydmljZV90b2tlbl9pZCI6IiIsImF1ZCI6IjEwMTRlZjdkZjdhOGYzYzhmNTk1NTQwMzk1MjNhZDc5MTMxNWU0NzZhNGJlMmJiNjZlZWYwZTViZWY1ZTkxZDUiLCJob3N0bmFtZSI6InRlbXAub2Zmc2VjLm5sIiwiYXBwX3Nlc3Npb25faGFzaCI6IjlmMjhjNmY4NzdiYTJhZTM0Zjg1Y2Y0MTdjNDQzNTAxMDhiZjg3MDI0ZjdiZThiNTcxZjI0YzQ0M2UzZjkzYWEiLCJuYmYiOjE2ODcwOTY1NzksImlzX3dhcnAiOmZhbHNlLCJpc19nYXRld2F5IjpmYWxzZSwidHlwZSI6Im1ldGEiLCJyZWRpcmVjdF91cmwiOiJcLyIsIm10bHNfYXV0aCI6eyJjZXJ0X2lzc3Vlcl9za2kiOiIiLCJjZXJ0X3ByZXNlbnRlZCI6ZmFsc2UsImNlcnRfc2VyaWFsIjoiIiwiY2VydF9pc3N1ZXJfZG4iOiIiLCJhdXRoX3N0YXR1cyI6Ik5PTkUifSwiYXV0aF9zdGF0dXMiOiJOT05FIn0.v6ysDmjEtO3TvmWIDGgHzNhxLP5_4oAOJYF8QuCUJ6DPa8XdsQsc-eaQDMe88Oy3bwIrNAc8jG0QFxncclX2WtQP2zkwUqHHw7TQky_rvz2NlMlobmOKhrZ3tGEp9SBrfx3jQFznSOrQvNvM-1G5YlaRXZHtL6DSHYh7fpj5Nipe_hhcWhpv8ftKZGMNXePcUQxy-AoExWLAtXUzPDcJ1YfI4mWHeRIVr7_lt3v_QmUPj2JZWcLKJpywjGIx-aQqLmF5HkLiJl1F56_9fqHwmGRm_kBrxMR2Fm1da5I2Ij1t-fYWychQ1NwkgRPQkopSVJgQcyONRiLVrnVkZWREwQ]", "host": "temp.offsec.nl", "url": "https://temp.offsec.nl:443"}    excavate        (distance-0, in-scope)
[INFO] bbot.scanner: my_scan: Modules running: naabu, massdns, wayback, excavate, httpx, dnscommonsrv, gowitness
[INFO] bbot.scanner: my_scan: Events produced so far: IP_ADDRESS: 128, DNS_NAME: 49, OPEN_TCP_PORT: 12, HTTP_RESPONSE: 7, URL: 7, ASN: 4, DNS_NAME_UNRESOLVED: 4, EMAIL_ADDRESS: 3, URL_UNVERIFIED: 2, FINDING: 2
[INFO] bbot.scanner: my_scan: 16 events in queue (URL_UNVERIFIED: 15, DNS_NAME: 1)
[DNS_NAME]              lock.offsec.nl  excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://lock.offsec.nl/ naabu   (dir, distance-0, http-title-lock-your-laptop, in-scope, ip-104-21-67-203, status-200)
[OPEN_TCP_PORT]         cyberchef.offsec.nl:8080        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         cyberchef.offsec.nl:80  naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         cyberchef.offsec.nl:443 naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         cyberchef.offsec.nl:8443        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         saf.offsec.nl:8080      naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         saf.offsec.nl:80        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         saf.offsec.nl:443       naabu   (distance-0, in-scope)
[DNS_NAME]              temp.offsec.nl  massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[OPEN_TCP_PORT]         saf.offsec.nl:8443      naabu   (distance-0, in-scope)
[DNS_NAME]              kb.offsec.nl    massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   http://lock.offsec.nl:8080/     naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://temp.offsec.nl:8080/     naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://lock.offsec.nl/  naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://temp.offsec.nl/  naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   https://cyberchef.offsec.nl:8443/       naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-200)
[DNS_NAME]              cyberchef.offsec.nl     excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://cyberchef.offsec.nl/    naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-200)
[URL]                   https://saf.offsec.nl/  naabu   (dir, distance-0, http-title-search-active-github-forks, in-scope, ip-172-67-180-148, status-200)
[URL]                   https://saf.offsec.nl:8443/     naabu   (dir, distance-0, http-title-search-active-github-forks, in-scope, ip-172-67-180-148, status-200)
[DNS_NAME]              saf.offsec.nl   excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   http://cyberchef.offsec.nl/     naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://saf.offsec.nl/   naabu   (dir, distance-0, in-scope, ip-172-67-180-148, status-301)
[URL]                   http://saf.offsec.nl:8080/      naabu   (dir, distance-0, in-scope, ip-172-67-180-148, status-301)
[URL]                   http://cyberchef.offsec.nl:8080/        naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[OPEN_TCP_PORT]         kb.offsec.nl:8080       naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         kb.offsec.nl:8443       naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         kb.offsec.nl:80 naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         kb.offsec.nl:443        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         mha.offsec.nl:80        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         mha.offsec.nl:443       naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         mha.offsec.nl:8080      naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         mha.offsec.nl:8443      naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         msportals.offsec.nl:8080        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         msportals.offsec.nl:8443        naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         msportals.offsec.nl:80  naabu   (distance-0, in-scope)
[OPEN_TCP_PORT]         msportals.offsec.nl:443 naabu   (distance-0, in-scope)
[WEBSCREENSHOT]         {'filename': 'https-lock.offsec.nl-8443-.png', 'url': 'https://lock.offsec.nl:8443/'}   gowitness       (distance-1)
[URL]                   http://msportals.offsec.nl:8080/        naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[DNS_NAME]              msportals.offsec.nl     excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://mha.offsec.nl:8443/     naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-200)
[URL]                   https://mha.offsec.nl/  naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-200)
[DNS_NAME]              mha.offsec.nl   excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[URL]                   https://msportals.offsec.nl:8443/       naabu   (dir, distance-0, http-title-administrator-portals-microsoft-portals, in-scope, ip-104-21-67-203, status-200)
[URL]                   https://msportals.offsec.nl/    naabu   (dir, distance-0, http-title-administrator-portals-microsoft-portals, in-scope, ip-104-21-67-203, status-200)
[URL]                   https://kb.offsec.nl/   naabu   (dir, distance-0, http-title-home-knowledge-base-kb, in-scope, ip-104-21-67-203, status-200)
[URL]                   https://kb.offsec.nl:8443/      naabu   (dir, distance-0, http-title-home-knowledge-base-kb, in-scope, ip-104-21-67-203, status-200)
[URL]                   http://kb.offsec.nl/    naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://mha.offsec.nl:8080/      naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://msportals.offsec.nl/     naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://kb.offsec.nl:8080/       naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[URL]                   http://mha.offsec.nl/   naabu   (dir, distance-0, in-scope, ip-104-21-67-203, status-301)
[DNS_NAME]              cyberchef.offsec.nl     wayback (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              kb.offsec.nl    wayback (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              saf.offsec.nl   wayback (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[INFO] bbot.scanner: my_scan: Modules running: excavate, gowitness, subdomain_hijack
[INFO] bbot.scanner: my_scan: Events produced so far: IP_ADDRESS: 251, DNS_NAME: 122, URL_UNVERIFIED: 122, OPEN_TCP_PORT: 32, HTTP_RESPONSE: 32, URL: 32, ASN: 4, DNS_NAME_UNRESOLVED: 4, EMAIL_ADDRESS: 3, FINDING: 2, WEBSCREENSHOT: 1
[INFO] bbot.scanner: my_scan: 714 events in queue (URL_UNVERIFIED: 687, DNS_NAME: 27)
[DNS_NAME]              kb.offsec.nl    excavate        (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     host    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              mha.offsec.nl   host    (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[WEBSCREENSHOT]         {'filename': 'https-cyberchef.offsec.nl-8443-.png', 'url': 'https://cyberchef.offsec.nl:8443/'} gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-cyberchef.offsec.nl-.png', 'url': 'https://cyberchef.offsec.nl/'}   gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-lock.offsec.nl-.png', 'url': 'https://lock.offsec.nl/'}     gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-saf.offsec.nl-.png', 'url': 'https://saf.offsec.nl/'}       gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-saf.offsec.nl-8443-.png', 'url': 'https://saf.offsec.nl:8443/'}     gowitness       (distance-1)
[FINDING]               {"description": "Hijackable Subdomain \"preview.vision.azure.com\": NXDOMAIN (offsec.nl -[hackertarget]-> msportals.offsec.nl -[naabu]-> msportals.offsec.nl -[naabu]-> msportals.offsec.nl -[host]-> preview.vision.azure.com)", "host": "preview.vision.azure.com", "url": "https://preview.vision.azure.com"}    subdomain_hijack        (cloud-azure, distance-1)
[FINDING]               {"description": "Hijackable Subdomain \"preview.vision.azure.com\": NXDOMAIN (offsec.nl -[hackertarget]-> msportals.offsec.nl -[naabu]-> msportals.offsec.nl -[naabu]-> msportals.offsec.nl -[host]-> preview.vision.azure.com)", "host": "preview.vision.azure.com", "url": "https://preview.vision.azure.com"}    subdomain_hijack        (cloud-azure, distance-1)
[DNS_NAME_UNRESOLVED]   preview.vision.azure.com        host    (cloud-azure, distance-1, internal, subdomain, unresolved)
[INFO] bbot.scanner: my_scan: Modules running: gowitness, subdomain_hijack
[INFO] bbot.scanner: my_scan: Events produced so far: URL_UNVERIFIED: 1061, IP_ADDRESS: 449, DNS_NAME: 229, OPEN_TCP_PORT: 32, HTTP_RESPONSE: 32, URL: 32, DNS_NAME_UNRESOLVED: 7, WEBSCREENSHOT: 6, ASN: 4, EMAIL_ADDRESS: 3, FINDING: 3
[INFO] bbot.scanner: my_scan: 1,327 events in queue (URL_UNVERIFIED: 1,279, DNS_NAME: 44, TECHNOLOGY: 4)
[TECHNOLOGY]            {"host": "saf.offsec.nl", "technology": "Font Awesome", "url": "https://saf.offsec.nl/"}        gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "saf.offsec.nl", "technology": "Bootstrap:4.0.0", "url": "https://saf.offsec.nl:8443/"}        gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "saf.offsec.nl", "technology": "Font Awesome", "url": "https://saf.offsec.nl:8443/"}   gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "saf.offsec.nl", "technology": "Bootstrap:4.0.0", "url": "https://saf.offsec.nl/"}     gowitness       (distance-0, in-scope)
[WEBSCREENSHOT]         {'filename': 'https-kb.offsec.nl-8443-.png', 'url': 'https://kb.offsec.nl:8443/'}       gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-kb.offsec.nl-.png', 'url': 'https://kb.offsec.nl/'} gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-mha.offsec.nl-.png', 'url': 'https://mha.offsec.nl/'}       gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-mha.offsec.nl-8443-.png', 'url': 'https://mha.offsec.nl:8443/'}     gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-msportals.offsec.nl-8443-.png', 'url': 'https://msportals.offsec.nl:8443/'} gowitness       (distance-1)
[WEBSCREENSHOT]         {'filename': 'https-msportals.offsec.nl-.png', 'url': 'https://msportals.offsec.nl/'}   gowitness       (distance-1)
[TECHNOLOGY]            {"host": "kb.offsec.nl", "technology": "Hugo:0.99.1", "url": "https://kb.offsec.nl:8443/"}      gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "kb.offsec.nl", "technology": "Hugo:0.99.1", "url": "https://kb.offsec.nl/"}   gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "msportals.offsec.nl", "technology": "Jekyll:v3.9.3", "url": "https://msportals.offsec.nl:8443/"}      gowitness       (distance-0, in-scope)
[TECHNOLOGY]            {"host": "msportals.offsec.nl", "technology": "Jekyll:v3.9.3", "url": "https://msportals.offsec.nl/"}   gowitness       (distance-0, in-scope)
[INFO] bbot.scanner.manager: Finishing scan
[INFO] bbot.modules.massdns: Trying 5,328 mutations against offsec.nl (1/1)
[INFO] bbot.scanner: my_scan: Modules running: massdns
[INFO] bbot.scanner: my_scan: Events produced so far: URL_UNVERIFIED: 1771, IP_ADDRESS: 519, DNS_NAME: 301, OPEN_TCP_PORT: 32, HTTP_RESPONSE: 32, URL: 32, WEBSCREENSHOT: 12, DNS_NAME_UNRESOLVED: 9, TECHNOLOGY: 8, ASN: 4, EMAIL_ADDRESS: 3, FINDING: 3
[INFO] bbot.scanner: my_scan: No events in queue
[INFO] bbot.scanner: my_scan: Modules running: massdns
[INFO] bbot.scanner: my_scan: Events produced so far: URL_UNVERIFIED: 1771, IP_ADDRESS: 519, DNS_NAME: 301, OPEN_TCP_PORT: 32, HTTP_RESPONSE: 32, URL: 32, WEBSCREENSHOT: 12, DNS_NAME_UNRESOLVED: 9, TECHNOLOGY: 8, ASN: 4, EMAIL_ADDRESS: 3, FINDING: 3
[INFO] bbot.scanner: my_scan: No events in queue
[DNS_NAME]              mha.offsec.nl   massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              cyberchef.offsec.nl     massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              saf.offsec.nl   massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              lock.offsec.nl  massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[DNS_NAME]              msportals.offsec.nl     massdns (a-record, aaaa-record, cdn-cloudflare, distance-0, in-scope, resolved, subdomain)
[INFO] bbot.scanner.manager: Finishing scan
[INFO] bbot.modules.asn: +---------+---------------------+--------------+---------------+------------------+-----------+
[INFO] bbot.modules.asn: | ASN     | Subnet              | Host Count   | Name          | Description      | Country   |
[INFO] bbot.modules.asn: +=========+=====================+==============+===============+==================+===========+
[INFO] bbot.modules.asn: | AS13335 | 2606:4700:3035::/48 | 9            | CLOUDFLARENET | Cloudflare, Inc. | US        |
[INFO] bbot.modules.asn: +---------+---------------------+--------------+---------------+------------------+-----------+
[INFO] bbot.modules.asn: | AS13335 | 2606:4700:3030::/48 | 9            | CLOUDFLARENET | Cloudflare, Inc. | US        |
[INFO] bbot.modules.asn: +---------+---------------------+--------------+---------------+------------------+-----------+
[INFO] bbot.modules.asn: | AS13335 | 172.67.176.0/20     | 9            | CLOUDFLARENET | Cloudflare, Inc. | US        |
[INFO] bbot.modules.asn: +---------+---------------------+--------------+---------------+------------------+-----------+
[INFO] bbot.modules.asn: | AS13335 | 104.21.64.0/20      | 9            | CLOUDFLARENET | Cloudflare, Inc. | US        |
[INFO] bbot.modules.asn: +---------+---------------------+--------------+---------------+------------------+-----------+
[SUCC] bbot.modules.gowitness: 12 web screenshots captured. To view:
[SUCC] bbot.modules.gowitness:     - Start gowitness
[SUCC] bbot.modules.gowitness:         - cd /root/my_scan/gowitness && ./gowitness server
[SUCC] bbot.modules.gowitness:     - Browse to http://localhost:7171
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | Module           | Produced                              | Consumed                                 |
[INFO] bbot.modules.aggregate: +==================+=======================================+==========================================+
[INFO] bbot.modules.aggregate: | naabu            | 64 (32 OPEN_TCP_PORT, 32 URL)         | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | gowitness        | 20 (8 TECHNOLOGY, 12 WEBSCREENSHOT)   | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | crt              | 9 (7 DNS_NAME, 2 DNS_NAME_UNRESOLVED) | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | excavate         | 9 (7 DNS_NAME, 2 FINDING)             | 32 (32 HTTP_RESPONSE)                    |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot: Saved word cloud (57 words) to /root/my_scan/wordcloud.tsv
[INFO] bbot.modules.aggregate: | massdns          | 7 (7 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | hackertarget     | 6 (6 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | certspotter      | 6 (6 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | otx              | 6 (4 DNS_NAME, 2 DNS_NAME_UNRESOLVED) | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | leakix           | 5 (5 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | dnsdumpster      | 4 (4 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | wayback          | 3 (3 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | host             | 3 (2 DNS_NAME, 1 DNS_NAME_UNRESOLVED) | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | AAAA             | 2 (2 IP_ADDRESS)                      | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | A                | 2 (2 IP_ADDRESS)                      | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | rapiddns         | 1 (1 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | subdomain_hijack | 1 (1 FINDING)                         | 257 (251 DNS_NAME, 6                     |
[INFO] bbot.modules.aggregate: |                  |                                       | DNS_NAME_UNRESOLVED)                     |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | urlscan          | 1 (1 DNS_NAME)                        | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | speculate        | 1 (1 DNS_NAME)                        | 1,888 (176 DNS_NAME, 32 HTTP_RESPONSE, 4 |
[INFO] bbot.modules.aggregate: |                  |                                       | IP_ADDRESS, 32 URL, 1,644                |
[INFO] bbot.modules.aggregate: |                  |                                       | URL_UNVERIFIED)                          |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | anubisdb         | 0                                     | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | azure_tenant     | 0                                     | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | dnscommonsrv     | 0                                     | 8 (8 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | riddler          | 0                                     | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | threatminer      | 0                                     | 1 (1 DNS_NAME)                           |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | NS               | 0                                     | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | ipneighbor       | 0                                     | 4 (4 IP_ADDRESS)                         |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | TXT              | 0                                     | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | MX               | 0                                     | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | SOA              | 0                                     | 0                                        |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.aggregate: | sslcert          | 0                                     | 24 (24 OPEN_TCP_PORT)                    |
[INFO] bbot.modules.aggregate: +------------------+---------------------------------------+------------------------------------------+
[INFO] bbot.modules.output.csv: Saved CSV output to /root/my_scan/output.csv
[INFO] bbot.modules.output.human: Saved TXT output to /root/my_scan/output.txt
[INFO] bbot.modules.output.json: Saved JSON output to /root/my_scan/output.json
[SUCC] bbot.scanner: Scan my_scan completed in 53 seconds with status FINISHED
```

Output files from the above run are available below.

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}}

## URL list

- [Github.com - bbot](https://github.com/blacklanternsecurity/bbot)
