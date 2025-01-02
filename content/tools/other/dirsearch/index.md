---
title : "Dirsearch"
# pre : ' '
description : "An advanced web path brute-forcer."
date : 2023-08-17T10:54:02+02:00
# hidden : true
# draft : true
weight : 470
tags : ['Other', 'Brute Force', 'Web Application', 'Directory Brute Force']
---

---

An advanced web path brute-forcer.

## Installation

**Requirement:** python 3.7 or higher

Choose one of these installation options:

- Install with **git**: `git clone https://github.com/maurosoria/dirsearch.git --depth 1` (**RECOMMENDED**)
- Install with ZIP file: [Download here](https://github.com/maurosoria/dirsearch/archive/master.zip)
- Install with Docker: `docker build -t "dirsearch:v0.4.3" .` (more information can be found [here](https://github.com/maurosoria/dirsearch#support-docker))
- Install with PyPi: `pip3 install dirsearch` or `pip install dirsearch`
- Install with Kali Linux: `sudo apt-get install dirsearch` (deprecated)

## Usage

Please check [README.md](https://github.com/maurosoria/dirsearch/blob/master/README.md) for further configurations.

```plain
dirsearch.py [-u|--url] target [-e|--extensions] extensions [options]
```

## Flags

```plain
  --version             show program's version number and exit
  -h, --help            show this help message and exit

  Mandatory:
    -u URL, --url=URL   Target URL(s), can use multiple flags
    -l PATH, --url-file=PATH
                        URL list file
    --stdin             Read URL(s) from STDIN
    --cidr=CIDR         Target CIDR
    --raw=PATH          Load raw HTTP request from file (use '--scheme' flag
                        to set the scheme)
    -s SESSION_FILE, --session=SESSION_FILE
                        Session file
    --config=PATH       Path to configuration file (Default:
                        'DIRSEARCH_CONFIG' environment variable, otherwise
                        'config.ini')

  Dictionary Settings:
    -w WORDLISTS, --wordlists=WORDLISTS
                        Customize wordlists (separated by commas)
    -e EXTENSIONS, --extensions=EXTENSIONS
                        Extension list separated by commas (e.g. php,asp)
    -f, --force-extensions
                        Add extensions to the end of every wordlist entry. By
                        default dirsearch only replaces the %EXT% keyword with
                        extensions
    -O, --overwrite-extensions
                        Overwrite other extensions in the wordlist with your
                        extensions (selected via `-e`)
    --exclude-extensions=EXTENSIONS
                        Exclude extension list separated by commas (e.g.
                        asp,jsp)
    --remove-extensions
                        Remove extensions in all paths (e.g. admin.php ->
                        admin)
    --prefixes=PREFIXES
                        Add custom prefixes to all wordlist entries (separated
                        by commas)
    --suffixes=SUFFIXES
                        Add custom suffixes to all wordlist entries, ignore
                        directories (separated by commas)
    -U, --uppercase     Uppercase wordlist
    -L, --lowercase     Lowercase wordlist
    -C, --capital       Capital wordlist

  General Settings:
    -t THREADS, --threads=THREADS
                        Number of threads
    -r, --recursive     Brute-force recursively
    --deep-recursive    Perform recursive scan on every directory depth (e.g.
                        api/users -> api/)
    --force-recursive   Do recursive brute-force for every found path, not
                        only directories
    -R DEPTH, --max-recursion-depth=DEPTH
                        Maximum recursion depth
    --recursion-status=CODES
                        Valid status codes to perform recursive scan, support
                        ranges (separated by commas)
    --subdirs=SUBDIRS   Scan sub-directories of the given URL[s] (separated by
                        commas)
    --exclude-subdirs=SUBDIRS
                        Exclude the following subdirectories during recursive
                        scan (separated by commas)
    -i CODES, --include-status=CODES
                        Include status codes, separated by commas, support
                        ranges (e.g. 200,300-399)
    -x CODES, --exclude-status=CODES
                        Exclude status codes, separated by commas, support
                        ranges (e.g. 301,500-599)
    --exclude-sizes=SIZES
                        Exclude responses by sizes, separated by commas (e.g.
                        0B,4KB)
    --exclude-text=TEXTS
                        Exclude responses by text, can use multiple flags
    --exclude-regex=REGEX
                        Exclude responses by regular expression
    --exclude-redirect=STRING
                        Exclude responses if this regex (or text) matches
                        redirect URL (e.g. '/index.html')
    --exclude-response=PATH
                        Exclude responses similar to response of this page,
                        path as input (e.g. 404.html)
    --skip-on-status=CODES
                        Skip target whenever hit one of these status codes,
                        separated by commas, support ranges
    --min-response-size=LENGTH
                        Minimum response length
    --max-response-size=LENGTH
                        Maximum response length
    --max-time=SECONDS  Maximum runtime for the scan
    --exit-on-error     Exit whenever an error occurs

  Request Settings:
    -m METHOD, --http-method=METHOD
                        HTTP method (default: GET)
    -d DATA, --data=DATA
                        HTTP request data
    --data-file=PATH    File contains HTTP request data
    -H HEADERS, --header=HEADERS
                        HTTP request header, can use multiple flags
    --header-file=PATH  File contains HTTP request headers
    -F, --follow-redirects
                        Follow HTTP redirects
    --random-agent      Choose a random User-Agent for each request
    --auth=CREDENTIAL   Authentication credential (e.g. user:password or
                        bearer token)
    --auth-type=TYPE    Authentication type (basic, digest, bearer, ntlm, jwt,
                        oauth2)
    --cert-file=PATH    File contains client-side certificate
    --key-file=PATH     File contains client-side certificate private key
                        (unencrypted)
    --user-agent=USER_AGENT
    --cookie=COOKIE

  Connection Settings:
    --timeout=TIMEOUT   Connection timeout
    --delay=DELAY       Delay between requests
    --proxy=PROXY       Proxy URL (HTTP/SOCKS), can use multiple flags
    --proxy-file=PATH   File contains proxy servers
    --proxy-auth=CREDENTIAL
                        Proxy authentication credential
    --replay-proxy=PROXY
                        Proxy to replay with found paths
    --tor               Use Tor network as proxy
    --scheme=SCHEME     Scheme for raw request or if there is no scheme in the
                        URL (Default: auto-detect)
    --max-rate=RATE     Max requests per second
    --retries=RETRIES   Number of retries for failed requests
    --ip=IP             Server IP address

  Advanced Settings:
    --crawl             Crawl for new paths in responses

  View Settings:
    --full-url          Full URLs in the output (enabled automatically in
                        quiet mode)
    --redirects-history
                        Show redirects history
    --no-color          No colored output
    -q, --quiet-mode    Quiet mode

  Output Settings:
    -o PATH, --output=PATH
                        Output file
    --format=FORMAT     Report format (Available: simple, plain, json, xml,
                        md, csv, html, sqlite)
    --log=PATH          Log file
```

## Configuration File (config.ini)

By default the `config.ini` file is used to configure the settings. The default configuration is as follows.

```plain
# If you want to edit dirsearch default configurations, you can
# edit values in this file. Everything after `#` is a comment
# and won't be applied

[general]
threads = 25
recursive = False
deep-recursive = False
force-recursive = False
recursion-status = 200-399,401,403
max-recursion-depth = 0
exclude-subdirs = %%ff/,.;/,..;/,;/,./,../,%%2e/,%%2e%%2e/
random-user-agents = False
max-time = 0
exit-on-error = False
# subdirs = /,api/
# include-status = 200-299,401
# exclude-status = 400,500-999
# exclude-sizes = 0b,123gb
# exclude-texts = [
#   "Not found",
#   "404"
# ]
# exclude-regex = "^403$"
# exclude-redirect = "*/error.html"
# exclude-response = 404.html
# skip-on-status = 429,999

[dictionary]
default-extensions = php,aspx,jsp,html,js
force-extensions = False
overwrite-extensions = False
lowercase = False
uppercase = False
capitalization = False
# exclude-extensions = old,log
# prefixes = .,admin
# suffixes = ~,.bak
# wordlists = /path/to/wordlist1.txt,/path/to/wordlist2.txt

[request]
http-method = get
follow-redirects = False
# headers = [
#   "Header1: Value",
#   "Header2: Value"
# ]
# headers-file = /path/to/headers.txt
# user-agent = MyUserAgent
# cookie = SESSIONID=123

[connection]
timeout = 7.5
delay = 0
max-rate = 0
max-retries = 1
## By disabling `scheme` variable, dirsearch will automatically identify the URI scheme
# scheme = http
# proxies = ["localhost:8080"]
# proxies-file = /path/to/proxies.txt
# replay-proxy = localhost:8000

[advanced]
crawl = False

[view]
full-url = False
quiet-mode = False
color = True
show-redirects-history = False

[output]
## Support: plain, simple, json, xml, md, csv, html, sqlite, mysql, postgresql
report-format = plain
autosave-report = True
autosave-report-folder = reports/
# log-file = /path/to/dirsearch.log
# log-file-size = 50000000
```

## Examples

In the example below the parameter `--exclude-status 401,403,404` can be helpful filtering out specific status codes.

```plain
$ python3 dirsearch.py -u https://kb.offsec.nl

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11713

Output: /Users/crypt0rr/tools/dirsearch/reports/https_kb.offsec.nl/_23-08-17_10-59-02.txt

Target: https://kb.offsec.nl/

[10:59:02] Starting: 
[10:59:14] 404 -    2KB - /php.txt
[10:59:15] 404 -    2KB - /html.txt
[10:59:15] 404 -    2KB - /jsp.txt
[10:59:15] 404 -    2KB - /aspx.txt
[10:59:15] 404 -    2KB - /js.txt
[...SNIP...]
[11:13:59] 404 -    2KB - /zeroclipboard.swf

Task Completed
```

```plain
$ python3 dirsearch.py -u https://kb.offsec.nl --exclude-status 401,403,404 -r

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11713

Output: /Users/crypt0rr/tools/dirsearch/reports/https_kb.offsec.nl/_23-08-17_11-41-31.txt

Target: https://kb.offsec.nl/

[11:41:31] Starting: 

Task Completed
```

## URL list

- [Github.com - dirsearch](https://github.com/maurosoria/dirsearch/)
