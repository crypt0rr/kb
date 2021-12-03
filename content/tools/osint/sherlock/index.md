---
title : "Sherlock"
# pre : ' '
description : "Hunt down social media accounts by username across social networks."
date : 2021-10-20T15:40:20+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Sherlock

Hunt down social media accounts by username across social networks.

### Installation

```plain
git clone https://github.com/sherlock-project/sherlock.git
cd sherlock
python3 -m pip install -r requirements.txt
```

### Usage

```plain
python3 sherlock [-h] [--version] [--verbose] [--folderoutput FOLDEROUTPUT] [--output OUTPUT] [--tor] [--unique-tor] [--csv] [--site SITE_NAME] [--proxy PROXY_URL] 
         [--json JSON_FILE] [--timeout TIMEOUT] [--print-all] [--print-found] [--no-color] [--browse] [--local]
         USERNAMES [USERNAMES ...]
```

### Flags

```plain
Sherlock: Find Usernames Across Social Networks (Version 0.14.0)

positional arguments:
  USERNAMES             One or more usernames to check with social networks.

optional arguments:
  -h, --help            show this help message and exit
  --version             Display version information and dependencies.
  --verbose, -v, -d, --debug
                        Display extra debugging information and metrics.
  --folderoutput FOLDEROUTPUT, -fo FOLDEROUTPUT
                        If using multiple usernames, the output of the results will be saved to this folder.
  --output OUTPUT, -o OUTPUT
                        If using single username, the output of the result will be saved to this file.
  --tor, -t             Make requests over Tor; increases runtime; requires Tor to be installed and in system path.
  --unique-tor, -u      Make requests over Tor with new Tor circuit after each request; increases runtime; requires Tor to be installed and in system path.
  --csv                 Create Comma-Separated Values (CSV) File.
  --site SITE_NAME      Limit analysis to just the listed sites. Add multiple options to specify more than one site.
  --proxy PROXY_URL, -p PROXY_URL
                        Make requests over a proxy. e.g. socks5://127.0.0.1:1080
  --json JSON_FILE, -j JSON_FILE
                        Load data from a JSON file or an online, valid, JSON file.
  --timeout TIMEOUT     Time (in seconds) to wait for response to requests. Default timeout is infinity. A longer timeout will be more likely to get results from slow sites. On the other hand, this may cause a
                        long delay to gather all results.
  --print-all           Output sites where the username was not found.
  --print-found         Output sites where the username was found.
  --no-color            Don't color terminal output
  --browse, -b          Browse to all results on default browser.
  --local, -l           Force the use of the local data.json file.
```

### Examples

![Example](images/sherlock_demo.gif)

### URL list

* [Github.com - Sherlock](https://github.com/sherlock-project/sherlock)
