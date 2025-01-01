---
title : "Nikto"
# pre : ' '
description : "Nikto is a pluggable web server and CGI scanner written in Perl, using rfp’s LibWhisker to perform fast security or informational checks."
date : 2022-10-11T11:26:50+02:00
# hidden : true
# draft : true
weight : 1200
tags : ['Other', 'Brute Force', 'Web Application']
---

---

Nikto is a pluggable web server and CGI scanner written in Perl, using rfp’s LibWhisker to perform fast security or informational checks.

Features:

- Easily updatable CSV-format checks database
- Output reports in plain text or HTML
- Available HTTP versions automatic switching
- Generic as well as specific server software checks
- SSL support (through libnet-ssleay-perl)
- Proxy support (with authentication)
- Cookies support

## Installation

```plain
sudo apt install nikto
```

## Usage

```plain
nikto [OPTIONS]
```

## Flags

```plain
    -config+            Use this config file
    -Display+           Turn on/off display outputs
    -dbcheck            check database and other key files for syntax errors
    -Format+            save file (-o) format
    -Help               Extended help information
    -host+              target host/URL
    -id+                Host authentication to use, format is id:pass or id:pass:realm
    -list-plugins       List all available plugins
    -output+            Write output to this file
    -nossl              Disables using SSL
    -no404              Disables 404 checks
    -Plugins+           List of plugins to run (default: ALL)
    -port+              Port to use (default 80)
    -root+              Prepend root value to all requests, format is /directory
    -ssl                Force ssl mode on port
    -Tuning+            Scan tuning
    -timeout+           Timeout for requests (default 10 seconds)
    -update             Update databases and plugins from CIRT.net
    -Version            Print plugin and database versions
    -vhost+             Virtual host (for Host header)
    + requires a value

Note: This is the short help output. Use -H for full help text.
```

## Examples

```plain
$ nikto -host=https://kb.offsec.nl -maxtime=30s
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          104.21.67.203
+ Target Hostname:    kb.offsec.nl
+ Target Port:        443
---------------------------------------------------------------------------
+ SSL Info:        Subject:  /C=US/ST=California/L=San Francisco/O=Cloudflare, Inc./CN=kb.offsec.nl
                   Ciphers:  TLS_AES_256_GCM_SHA384
                   Issuer:   /C=US/O=Cloudflare, Inc./CN=Cloudflare Inc ECC CA-3
+ Message:            Multiple IP addresses found: 104.21.67.203, 172.67.180.148
+ Start Time:         2022-10-11 11:31:07 (GMT2)
---------------------------------------------------------------------------
+ Server: cloudflare
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ Uncommon header 'alt-svc' found, with contents: h3=":443"; ma=86400, h3-29=":443"; ma=86400
+ Uncommon header 'report-to' found, with contents: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=18i0elXhqOLWySHTaJb9vLvqf%2BnZNs%2FwzRx95XFKS1AutDYyaiPn1tkJrD2dgq9E7O4Ner4Qv8%2BU1sy3qit4DVJWg8wWqGHWER0EDX1CCc6Y0ueOgkG2f2r5QAWWsdw%3D"}],"group":"cf-nel","max_age":604800}
+ Uncommon header 'nel' found, with contents: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
+ The site uses SSL and Expect-CT header is not present.
+ ERROR: Host maximum execution time of 30 seconds reached
+ Scan terminated:  0 error(s) and 5 item(s) reported on remote host
+ End Time:           2022-10-11 11:31:38 (GMT2) (31 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested
```

## URL List

- [Kali.org - nikto](https://www.kali.org/tools/nikto/)
