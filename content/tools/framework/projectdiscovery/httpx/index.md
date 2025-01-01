---
title : "httpx"
# pre : ' '
description : "httpx is a fast and multi-purpose HTTP toolkit that allows running multiple probes using the retryablehttp library."
date : 2024-03-11T11:37:05+01:00
# hidden : true
# draft : true
weight : 30
tags : ['Framework', 'OSINT', 'HTTP']
---

---

`httpx` is a fast and multi-purpose HTTP toolkit that allows running multiple probes using the [retryablehttp](https://github.com/projectdiscovery/retryablehttp-go) library. It is designed to maintain result reliability with an increased number of threads.

- Simple and modular code base making it easy to contribute.
- Fast And fully configurable flags to probe multiple elements.
- Supports multiple HTTP based probings.
- Smart auto fallback from https to http as default.
- Supports hosts, URLs and CIDR as input.
- Handles edge cases doing retries, backoffs etc for handling WAFs.

## Supported probes

Please see [Github.com - httpx - supported probes](https://github.com/projectdiscovery/httpx?tab=readme-ov-file#supported-probes)

## Installation

```plain
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
```

## Usage

```plain
httpx [flags]
```

## Flags

```plain
INPUT:
   -l, -list string      input file containing list of hosts to process
   -rr, -request string  file containing raw request
   -u, -target string[]  input target host(s) to probe

PROBES:
   -sc, -status-code     display response status-code
   -cl, -content-length  display response content-length
   -ct, -content-type    display response content-type
   -location             display response redirect location
   -favicon              display mmh3 hash for '/favicon.ico' file
   -hash string          display response body hash (supported: md5,mmh3,simhash,sha1,sha256,sha512)
   -jarm                 display jarm fingerprint hash
   -rt, -response-time   display response time
   -lc, -line-count      display response body line count
   -wc, -word-count      display response body word count
   -title                display page title
   -bp, -body-preview    display first N characters of response body (default 100)
   -server, -web-server  display server name
   -td, -tech-detect     display technology in use based on wappalyzer dataset (default true)
   -method               display http request method
   -websocket            display server using websocket
   -ip                   display host ip
   -cname                display host cname
   -asn                  display host asn information
   -cdn                  display cdn/waf in use (default true)
   -probe                display probe status

HEADLESS:
   -ss, -screenshot                 enable saving screenshot of the page using headless browser
   -system-chrome                   enable using local installed chrome for screenshot
   -ho, -headless-options string[]  start headless chrome with additional options
   -esb, -exclude-screenshot-bytes  enable excluding screenshot bytes from json output
   -ehb, -exclude-headless-body     enable excluding headless header from json output
   -st, -screenshot-timeout int     set timeout for screenshot in seconds (default 10)

MATCHERS:
   -mc, -match-code string            match response with specified status code (-mc 200,302)
   -ml, -match-length string          match response with specified content length (-ml 100,102)
   -mlc, -match-line-count string     match response body with specified line count (-mlc 423,532)
   -mwc, -match-word-count string     match response body with specified word count (-mwc 43,55)
   -mfc, -match-favicon string[]      match response with specified favicon hash (-mfc 1494302000)
   -ms, -match-string string          match response with specified string (-ms admin)
   -mr, -match-regex string           match response with specified regex (-mr admin)
   -mcdn, -match-cdn string[]         match host with specified cdn provider (google, leaseweb, stackpath, cloudfront, fastly)
   -mrt, -match-response-time string  match response with specified response time in seconds (-mrt '< 1')
   -mdc, -match-condition string      match response with dsl expression condition

EXTRACTOR:
   -er, -extract-regex string[]   display response content with matched regex
   -ep, -extract-preset string[]  display response content matched by a pre-defined regex (url,ipv4,mail)

FILTERS:
   -fc, -filter-code string            filter response with specified status code (-fc 403,401)
   -fep, -filter-error-page            filter response with ML based error page detection
   -fl, -filter-length string          filter response with specified content length (-fl 23,33)
   -flc, -filter-line-count string     filter response body with specified line count (-flc 423,532)
   -fwc, -filter-word-count string     filter response body with specified word count (-fwc 423,532)
   -ffc, -filter-favicon string[]      filter response with specified favicon hash (-ffc 1494302000)
   -fs, -filter-string string          filter response with specified string (-fs admin)
   -fe, -filter-regex string           filter response with specified regex (-fe admin)
   -fcdn, -filter-cdn string[]         filter host with specified cdn provider (google, leaseweb, stackpath, cloudfront, fastly)
   -frt, -filter-response-time string  filter response with specified response time in seconds (-frt '> 1')
   -fdc, -filter-condition string      filter response with dsl expression condition
   -strip                              strips all tags in response. supported formats: html,xml (default html)

RATE-LIMIT:
   -t, -threads int              number of threads to use (default 50)
   -rl, -rate-limit int          maximum requests to send per second (default 150)
   -rlm, -rate-limit-minute int  maximum number of requests to send per minute

MISCELLANEOUS:
   -pa, -probe-all-ips        probe all the ips associated with same host
   -p, -ports string[]        ports to probe (nmap syntax: eg http:1,2-10,11,https:80)
   -path string               path or list of paths to probe (comma-separated, file)
   -tls-probe                 send http probes on the extracted TLS domains (dns_name)
   -csp-probe                 send http probes on the extracted CSP domains
   -tls-grab                  perform TLS(SSL) data grabbing
   -pipeline                  probe and display server supporting HTTP1.1 pipeline
   -http2                     probe and display server supporting HTTP2
   -vhost                     probe and display server supporting VHOST
   -ldv, -list-dsl-variables  list json output field keys name that support dsl matcher/filter

UPDATE:
   -up, -update                 update httpx to latest version
   -duc, -disable-update-check  disable automatic httpx update check

OUTPUT:
   -o, -output string                  file to write output results
   -oa, -output-all                    filename to write output results in all formats
   -sr, -store-response                store http response to output directory
   -srd, -store-response-dir string    store http response to custom directory
   -csv                                store output in csv format
   -csvo, -csv-output-encoding string  define output encoding
   -j, -json                           store output in JSONL(ines) format
   -irh, -include-response-header      include http response (headers) in JSON output (-json only)
   -irr, -include-response             include http request/response (headers + body) in JSON output (-json only)
   -irrb, -include-response-base64     include base64 encoded http request/response in JSON output (-json only)
   -include-chain                      include redirect http chain in JSON output (-json only)
   -store-chain                        include http redirect chain in responses (-sr only)
   -svrc, -store-vision-recon-cluster  include visual recon clusters (-ss and -sr only)

CONFIGURATIONS:
   -config string                path to the httpx configuration file (default $HOME/.config/httpx/config.yaml)
   -auth                         configure projectdiscovery cloud (pdcp) api key (default true)
   -r, -resolvers string[]       list of custom resolver (file or comma separated)
   -allow string[]               allowed list of IP/CIDR's to process (file or comma separated)
   -deny string[]                denied list of IP/CIDR's to process (file or comma separated)
   -sni, -sni-name string        custom TLS SNI name
   -random-agent                 enable Random User-Agent to use (default true)
   -H, -header string[]          custom http headers to send with request
   -http-proxy, -proxy string    http proxy to use (eg http://127.0.0.1:8080)
   -unsafe                       send raw requests skipping golang normalization
   -resume                       resume scan using resume.cfg
   -fr, -follow-redirects        follow http redirects
   -maxr, -max-redirects int     max number of redirects to follow per host (default 10)
   -fhr, -follow-host-redirects  follow redirects on the same host
   -rhsts, -respect-hsts         respect HSTS response headers for redirect requests
   -vhost-input                  get a list of vhosts as input
   -x string                     request methods to probe, use 'all' to probe all HTTP methods
   -body string                  post body to include in http request
   -s, -stream                   stream mode - start elaborating input targets without sorting
   -sd, -skip-dedupe             disable dedupe input items (only used with stream mode)
   -ldp, -leave-default-ports    leave default http/https ports in host header (eg. http://host:80 - https://host:443
   -ztls                         use ztls library with autofallback to standard one for tls13
   -no-decode                    avoid decoding body
   -tlsi, -tls-impersonate       enable experimental client hello (ja3) tls randomization
   -no-stdin                     Disable Stdin processing

DEBUG:
   -health-check, -hc        run diagnostic check up
   -debug                    display request/response content in cli
   -debug-req                display request content in cli
   -debug-resp               display response content in cli
   -version                  display httpx version
   -stats                    display scan statistic
   -profile-mem string       optional httpx memory profile dump file
   -silent                   silent mode
   -v, -verbose              verbose mode
   -si, -stats-interval int  number of seconds to wait between showing a statistics update (default: 5)
   -nc, -no-color            disable colors in cli output

OPTIMIZATIONS:
   -nf, -no-fallback                  display both probed protocol (HTTPS and HTTP)
   -nfs, -no-fallback-scheme          probe with protocol scheme specified in input 
   -maxhr, -max-host-error int        max error count per host before skipping remaining path/s (default 30)
   -e, -exclude string[]              exclude host matching specified filter ('cdn', 'private-ips', cidr, ip, regex)
   -retries int                       number of retries
   -timeout int                       timeout in seconds (default 10)
   -delay value                       duration between each http request (eg: 200ms, 1s) (default -1ns)
   -rsts, -response-size-to-save int  max response size to save in bytes (default 2147483647)
   -rstr, -response-size-to-read int  max response size to read in bytes (default 2147483647)
```

## Examples

For this example the following [crt.sh](https://crt.sh) query was used.

```plain
curl -s https://crt.sh/\?q\=offsec.nl\&output\=json | jq -r '.[].name_value' | sed 's/\*\.//g' | sort -u
```

```plain
$ httpx -status-code -title -tech-detect -screenshot -list subdomains.offsec.nl

    __    __  __       _  __
   / /_  / /_/ /_____ | |/ /
  / __ \/ __/ __/ __ \|   /
 / / / / /_/ /_/ /_/ /   |
/_/ /_/\__/\__/ .___/_/|_|
             /_/

                projectdiscovery.io

[INF] Current httpx version v1.6.0 (latest)
https://lock.offsec.nl [200] [LOCK YOUR LAPTOP!] [Cloudflare,HSTS,HTTP/3]
https://saf.offsec.nl [200] [Search Active GitHub Forks] [Bootstrap:4.0.0,Cloudflare,HSTS,HTTP/3]
https://temp.offsec.nl [302] [] [Cloudflare,HSTS,HTTP/3]
https://dork.offsec.nl [200] [Dorking for?] [Cloudflare,HSTS,HTTP/3]
https://pw.offsec.nl [200] [Password Generator] [Cloudflare,HSTS,HTTP/3]
https://offsec.nl [200] [] [Cloudflare,HSTS,HTTP/3,Hugo:0.120.4]
https://msportals.offsec.nl [200] [Administrator Portals | MSPortals.io - Microsoft Portals] [Cloudflare,HSTS,HTTP/3,Jekyll:3.9.4,Ruby]
https://cyberchef.offsec.nl [200] [CyberChef] [Cloudflare,HSTS,HTTP/3]
https://kb.offsec.nl [200] [Home :: Knowledge Base (KB)] [Cloudflare,HSTS,HTTP/3,Hugo:0.120.4]
```

httpx by default creates a folder `output` in the location the tool is started. The `.zip` below contains the output of the above run.

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

## URL list

- [Github.com - httpx](https://github.com/projectdiscovery/httpx)
