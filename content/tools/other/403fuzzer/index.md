---
title : "403fuzzer"
# pre : ' '
description : "Fuzz 403ing endpoints for bypasses - use this script to fuzz endpoints that return a 401/403."
date : 2021-06-04T09:39:37+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## 403fuzzer

Fuzz 403ing endpoints for bypasses - use this script to fuzz endpoints that return a 401/403.

## Installation

```plain
git clone https://github.com/intrudir/403fuzzer.git
```

## Usage

```plain
./403fuzzer.py [-h] [-u URL] [-m {GET,POST,PUT,PATCH}] [-d DATA_PARAMS] [-c COOKIES] [-H HEADER] [-p PROXY] [-hc HC] [-hl HL] [-sf]
             [--save SAVE] [-sh] [-su]
```

## Flags

```plain
use this script to fuzz endpoints that return a 401/403

optional arguments:
  -h, --help            show this help message and exit
  -u URL, --url URL     Specify the target URL
  -m {GET,POST,PUT,PATCH}, --method {GET,POST,PUT,PATCH}
                        Specify the HTTP method/verb
  -d DATA_PARAMS, --data DATA_PARAMS
                        Specify data to send with the request.
  -c COOKIES, --cookies COOKIES
                        Specify cookies to use in requests. (e.g., --cookies "cookie1=blah; cookie2=blah")
  -H HEADER, --header HEADER
                        Add headers to your request (e.g., --header "Accept: application/json" --header "Host: example.com"
  -p PROXY, --proxy PROXY
                        Specify a proxy to use for requests (e.g., http://127.0.0.1:8080)
  -hc HC                Hide response code from output, single or comma separated
  -hl HL                Hide response length from output, single or comma separated
  -sf, --smart          Enable the smart filter
  --save SAVE           Saves stuff to a file when you get your specified response code
  -sh, --skip-headers   Skip testing bypass headers
  -su, --skip-urls      Skip testing path payloads
```

## Examples

```plain
./403fuzzer.py -u http://example.com/test1/test2/test3/forbidden.html
```

#### Use Burp Proxy

```plain
./403fuzzer.py -u https://example.com --proxy http://127.0.0.1:8080
```

## URL List

* [Github.com - 403fuzzer](https://github.com/intrudir/403fuzzer)
