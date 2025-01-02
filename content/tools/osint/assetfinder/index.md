---
title : "assetfinder"
# pre : ' '
description : "Find domains and subdomains potentially related to a given domain."
date : 2022-11-06T15:23:40+01:00
# hidden : true
# draft : true
weight : 30
tags : ['OSINT', 'DNS', 'Subdomain']
---

---

Find domains and subdomains potentially related to a given domain.

Implemented Sources

- crt.sh
- certspotter
- hackertarget
- threatcrowd
- wayback machine
- dns.bufferover.run
- facebook
  - Needs FB_APP_ID and FB_APP_SECRET environment variables set (<https://developers.facebook.com/>) You need to be careful with your app's rate limits
- virustotal
  - Needs VT_API_KEY environment variable set (<https://developers.virustotal.com/reference>)
- findsubdomains
  - Needs SPYSE_API_TOKEN environment variable set (the free version always gives the first response page, and you also get "25 unlimited requests") — (<https://spyse.com/apidocs>)

## Installation

```plain
go install github.com/tomnomnom/assetfinder@latest
```

## Usage

```plain
assetfinder [--subs-only] <domain>
```

## Examples

```plain
$ assetfinder offsec.nl
kb.offsec.nl
temp.offsec.nl
temp2.offsec.nl
offsec.nl
offsec.nl
test.offsec.nl
offsec.nl
```

## URL List

- [Github.com - assetfinder](https://github.com/tomnomnom/assetfinder)
