---
title : "Katana"
# pre : ' '
description : "Katana is a fast crawler focused on execution in automation pipelines offering both headless and non-headless crawling."
date : 2024-03-11T13:30:03+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

Katana is a fast crawler focused on execution in automation pipelines offering both headless and non-headless crawling.

![image](https://user-images.githubusercontent.com/8293321/199371558-daba03b6-bf9c-4883-8506-76497c6c3a44.png)

## Features

- Fast And fully configurable web crawling
- **Standard** and **Headless** mode support
- **JavaScript** parsing / crawling
- Customizable **automatic form filling**
- **Scope control** - Preconfigured field / Regex
- **Customizable output** - Preconfigured fields
- INPUT - **STDIN**, **URL** and **LIST**
- OUTPUT - **STDOUT**, **FILE** and **JSON**

## Installation

```plain
go install github.com/projectdiscovery/katana/cmd/katana@latest
```

## Usage

```plain
katana [flags]
```

## Flags

```plain
INPUT:
   -u, -list string[]  target url / list to crawl
   -resume string      resume scan using resume.cfg

CONFIGURATION:
   -r, -resolvers string[]       list of custom resolver (file or comma separated)
   -d, -depth int                maximum depth to crawl (default 3)
   -jc, -js-crawl                enable endpoint parsing / crawling in javascript file
   -jsl, -jsluice                enable jsluice parsing in javascript file (memory intensive)
   -ct, -crawl-duration value    maximum duration to crawl the target for (s, m, h, d) (default s)
   -kf, -known-files string      enable crawling of known files (all,robotstxt,sitemapxml), a minimum depth of 3 is required to ensure all known files are properly crawled.
   -mrs, -max-response-size int  maximum response size to read (default 9223372036854775807)
   -timeout int                  time to wait for request in seconds (default 10)
   -aff, -automatic-form-fill    enable automatic form filling (experimental)
   -fx, -form-extraction         extract form, input, textarea & select elements in jsonl output
   -retry int                    number of times to retry the request (default 1)
   -proxy string                 http/socks5 proxy to use
   -H, -headers string[]         custom header/cookie to include in all http request in header:value format (file)
   -config string                path to the katana configuration file
   -fc, -form-config string      path to custom form configuration file
   -flc, -field-config string    path to custom field configuration file
   -s, -strategy string          Visit strategy (depth-first, breadth-first) (default "depth-first")
   -iqp, -ignore-query-params    Ignore crawling same path with different query-param values
   -tlsi, -tls-impersonate       enable experimental client hello (ja3) tls randomization
   -dr, -disable-redirects       disable following redirects (default false)

DEBUG:
   -health-check, -hc        run diagnostic check up
   -elog, -error-log string  file to write sent requests error log

HEADLESS:
   -hl, -headless                    enable headless hybrid crawling (experimental)
   -sc, -system-chrome               use local installed chrome browser instead of katana installed
   -sb, -show-browser                show the browser on the screen with headless mode
   -ho, -headless-options string[]   start headless chrome with additional options
   -nos, -no-sandbox                 start headless chrome in --no-sandbox mode
   -cdd, -chrome-data-dir string     path to store chrome browser data
   -scp, -system-chrome-path string  use specified chrome browser for headless crawling
   -noi, -no-incognito               start headless chrome without incognito mode
   -cwu, -chrome-ws-url string       use chrome browser instance launched elsewhere with the debugger listening at this URL
   -xhr, -xhr-extraction             extract xhr request url,method in jsonl output

SCOPE:
   -cs, -crawl-scope string[]       in scope url regex to be followed by crawler
   -cos, -crawl-out-scope string[]  out of scope url regex to be excluded by crawler
   -fs, -field-scope string         pre-defined scope field (dn,rdn,fqdn) or custom regex (e.g., '(company-staging.io|company.com)') (default "rdn")
   -ns, -no-scope                   disables host based default scope
   -do, -display-out-scope          display external endpoint from scoped crawling

FILTER:
   -mr, -match-regex string[]       regex or list of regex to match on output url (cli, file)
   -fr, -filter-regex string[]      regex or list of regex to filter on output url (cli, file)
   -f, -field string                field to display in output (url,path,fqdn,rdn,rurl,qurl,qpath,file,ufile,key,value,kv,dir,udir)
   -sf, -store-field string         field to store in per-host output (url,path,fqdn,rdn,rurl,qurl,qpath,file,ufile,key,value,kv,dir,udir)
   -em, -extension-match string[]   match output for given extension (eg, -em php,html,js)
   -ef, -extension-filter string[]  filter output for given extension (eg, -ef png,css)
   -mdc, -match-condition string    match response with dsl based condition
   -fdc, -filter-condition string   filter response with dsl based condition

RATE-LIMIT:
   -c, -concurrency int          number of concurrent fetchers to use (default 10)
   -p, -parallelism int          number of concurrent inputs to process (default 10)
   -rd, -delay int               request delay between each request in seconds
   -rl, -rate-limit int          maximum requests to send per second (default 150)
   -rlm, -rate-limit-minute int  maximum number of requests to send per minute

UPDATE:
   -up, -update                 update katana to latest version
   -duc, -disable-update-check  disable automatic katana update check

OUTPUT:
   -o, -output string                file to write output to
   -sr, -store-response              store http requests/responses
   -srd, -store-response-dir string  store http requests/responses to custom directory
   -or, -omit-raw                    omit raw requests/responses from jsonl output
   -ob, -omit-body                   omit response body from jsonl output
   -j, -jsonl                        write output in jsonl format
   -nc, -no-color                    disable output content coloring (ANSI escape codes)
   -silent                           display output only
   -v, -verbose                      display verbose output
   -debug                            display debug output
   -version                          display project version
```

## Examples

```plain
$ katana -u https://tesla.com -headless -no-incognito

   __        __                
  / /_____ _/ /____ ____  ___ _
 /  '_/ _  / __/ _  / _ \/ _  /
/_/\_\\_,_/\__/\_,_/_//_/\_,_/                                                   

                projectdiscovery.io

[INF] Current katana version v1.0.5 (latest)
[INF] Started headless crawling for => https://tesla.com
https://www.tesla.com/akam/13/38f585b7
https://www.tesla.com/modules/custom/tesla_banners/js/index.js?v=1.x
https://www.tesla.com/_flysystem/s3/js/js_tM-PUnZsSWlsw4SGqbE_P0jQgnhzr5-k0JyrcXI7GiM.js
https://www.tesla.com/_flysystem/s3/js/js_ziQ6U_MBKDHsNt0vkIi8tBQ6eY2Bvs5fTiK6f1FgQMk.js
https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-SolarRoof-Desktop-Global
https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-SolarPanels-01-Desktop
https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-X-Desktop-LHD
https://digitalassets.tesla.com/tesla-contents/image/upload/h_2400,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Global-Desktop
https://www.tesla.com/_flysystem/s3/js/js_0oDCLl1W4pXlevbCx0draTXjFWLA0w7glUGpeJIhMpk.js
https://www.tesla.com/themes/custom/tesla_frontend/assets/manifest.json
https://www.tesla.com/_flysystem/s3/css/css_JlDnfCdMVObK_ykl43bGoMeh6xocjbxc_mIBK3JTtkc.css
https://www.tesla.com/_flysystem/s3/css/css_eU4gcaMHzV0EaLh7hWtE-uFgeUZJL0jOoElc76Ko3Z0.css
https://www.tesla.com/_flysystem/s3/css/css_9JG-GCPRlzqh3qNEz0zqzkCbGmdrVzYp4nHXbLOHUVQ.css
https://tesla.com
https://www.tesla.com/
https://digitalassets.tesla.com/raw/upload/emea-market-assets/prod/%5C%27%7BCOOKIE_SETTINGS_URL%7D%5C%27
https://www.tesla.com/en_my
https://www.tesla.com/hr_hr
https://www.tesla.com/he_il
https://www.tesla.com/en_gb
https://www.tesla.com/en_ae
https://www.tesla.com/ar_ae
https://www.tesla.com/tr_tr
https://www.tesla.com/th_th
https://www.tesla.com/en_th
...
```

## URL list

- [Github.com - katana](https://github.com/projectdiscovery/katana/)
