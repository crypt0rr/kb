---
title : "EyeWitness"
# pre : ' '
description : "Is a tool used to capture screenshots from a list of URLs."
date : 2020-03-10T15:34:38+01:00
# hidden : true
# draft : true
weight : 600
# tags : [""]
---

---

Is a tool used to capture screenshots from a list of URLs.

## Installation

```plain
git clone https://github.com/FortyNorthSecurity/EyeWitness.git
```

Navigate into the setup directory and run setup.sh

```plain
chmod +x setup.sh
./setup.sh
```

## Usage

```plain
python3 EyeWitness.py [OPTION]
```

## Flags

```plain
usage: EyeWitness.py [--web] [-f Filename] [-x Filename.xml]
                     [--single Single URL] [--no-dns] [--timeout Timeout]
                     [--jitter # of Seconds] [--delay # of Seconds]
                     [--threads # of Threads]
                     [--max-retries Max retries on a timeout]
                     [-d Directory Name] [--results Hosts Per Page]
                     [--no-prompt] [--user-agent User Agent]
                     [--difference Difference Threshold]
                     [--proxy-ip 127.0.0.1] [--proxy-port 8080]
                     [--proxy-type socks5] [--show-selenium] [--resolve]
                     [--add-http-ports ADD_HTTP_PORTS]
                     [--add-https-ports ADD_HTTPS_PORTS]
                     [--only-ports ONLY_PORTS] [--prepend-https]
                     [--resume ew.db] [--ocr]

EyeWitness is a tool used to capture screenshots from a list of URLs

Protocols:
  --web                 HTTP Screenshot using Selenium

Input Options:
  -f Filename           Line-separated file containing URLs to capture
  -x Filename.xml       Nmap XML or .Nessus file
  --single Single URL   Single URL/Host to capture
  --no-dns              Skip DNS resolution when connecting to websites

Timing Options:
  --timeout Timeout     Maximum number of seconds to wait while requesting a
                        web page (Default: 7)
  --jitter # of Seconds
                        Randomize URLs and add a random delay between requests
  --delay # of Seconds  Delay between the opening of the navigator and taking
                        the screenshot
  --threads # of Threads
                        Number of threads to use while using file based input
  --max-retries Max retries on a timeout
                        Max retries on timeouts

Report Output Options:
  -d Directory Name     Directory name for report output
  --results Hosts Per Page
                        Number of Hosts per page of report
  --no-prompt           Don't prompt to open the report

Web Options:
  --user-agent User Agent
                        User Agent to use for all requests
  --difference Difference Threshold
                        Difference threshold when determining if user agent
                        requests are close "enough" (Default: 50)
  --proxy-ip 127.0.0.1  IP of web proxy to go through
  --proxy-port 8080     Port of web proxy to go through
  --proxy-type socks5   Proxy type (socks5/http)
  --show-selenium       Show display for selenium
  --resolve             Resolve IP/Hostname for targets
  --add-http-ports ADD_HTTP_PORTS
                        Comma-separated additional port(s) to assume are http
                        (e.g. '8018,8028')
  --add-https-ports ADD_HTTPS_PORTS
                        Comma-separated additional port(s) to assume are https
                        (e.g. '8018,8028')
  --only-ports ONLY_PORTS
                        Comma-separated list of exclusive ports to use (e.g.
                        '80,8080')
  --prepend-https       Prepend http:// and https:// to URLs without either

Resume Options:
  --resume ew.db        Path to db file if you want to resume

RDP Options:
  --ocr                 Use OCR to determine RDP usernames
```

## Examples

Parse [Nessus](https://www.tenable.com/products/nessus) file

```plain
python3 EyeWitness.py --web -x <file>.nessus
```

## URL List

- [GitHub.com - EyeWitness](https://github.com/FortyNorthSecurity/EyeWitness)
