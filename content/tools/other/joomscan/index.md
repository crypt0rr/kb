---
title : "JoomScan"
# pre : ' '
description : "OWASP JoomScan (short for [Joom]la Vulnerability [Scan]ner) is an opensource project in perl programming language to detect Joomla CMS vulnerabilities and analysis them."
date : 2021-06-18T19:12:50+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Joomscan

OWASP JoomScan (short for [Joom]la Vulnerability [Scan]ner) is an opensource project in perl programming language to detect Joomla CMS vulnerabilities and analysis them.

## Installation

```plain
git clone https://github.com/rezasp/joomscan.git
cd joomscan
perl joomscan.pl
```

## Usage

```plain
joomscan [options]
```

## Flags

```plain
    ____  _____  _____  __  __  ___   ___    __    _  _ 
   (_  _)(  _  )(  _  )(  \/  )/ __) / __)  /__\  ( \( )
  .-_)(   )(_)(  )(_)(  )    ( \__ \( (__  /(__)\  )  ( 
  \____) (_____)(_____)(_/\/\_)(___/ \___)(__)(__)(_)\_)
            (1337.today)
   
    --=[OWASP JoomScan
    +---++---==[Version : 0.0.7
    +---++---==[Update Date : [2018/09/23]
    +---++---==[Authors : Mohammad Reza Espargham , Ali Razmjoo
    --=[Code name : Self Challenge
    @OWASP_JoomScan , @rezesp , @Ali_Razmjo0 , @OWASP

--url | -u <URL>                |   The Joomla URL/domain to scan.
--enumerate-components | -ec    |   Try to enumerate components.

--cookie <String>               |   Set cookie.
--user-agent | -a <User-Agent>  |   Use the specified User-Agent.
--random-agent | -r             |   Use a random User-Agent.
--timeout <Time-Out>            |   Set timeout.
--proxy=PROXY                   |   Use a proxy to connect to the target URL
           Proxy example: --proxy http://127.0.0.1:8080
                                  https://127.0.0.1:443
                                  socks://127.0.0.1:414
                                  
--about                         |   About Author
--help | -h                     |   This help screen.
--version                       |   Output the current version and exit.
```

## Examples

```plain
$ joomscan -u http://10.10.10.10
    ____  _____  _____  __  __  ___   ___    __    _  _ 
   (_  _)(  _  )(  _  )(  \/  )/ __) / __)  /__\  ( \( )
  .-_)(   )(_)(  )(_)(  )    ( \__ \( (__  /(__)\  )  ( 
  \____) (_____)(_____)(_/\/\_)(___/ \___)(__)(__)(_)\_)
            (1337.today)
   
    --=[OWASP JoomScan
    +---++---==[Version : 0.0.7
    +---++---==[Update Date : [2018/09/23]
    +---++---==[Authors : Mohammad Reza Espargham , Ali Razmjoo
    --=[Code name : Self Challenge
    @OWASP_JoomScan , @rezesp , @Ali_Razmjo0 , @OWASP

Processing http://10.10.10.10 ...



[+] FireWall Detector
[++] Firewall not detected

[+] Detecting Joomla Version
[++] Joomla 3.7.0

[+] Core Joomla Vulnerability
[++] Target Joomla core is not vulnerable

[+] Checking Directory Listing
[++] directory has directory listing : 
http://10.10.10.10/administrator/components
http://10.10.10.10/administrator/modules
http://10.10.10.10/administrator/templates
http://10.10.10.10/images/banners


[+] Checking apache info/status files
[++] Readable info/status files are not found

[+] admin finder
[++] Admin page : http://10.10.10.10/administrator/

[+] Checking robots.txt existing
[++] robots.txt is found
path : http://10.10.10.10/robots.txt 

Interesting path found from robots.txt
http://10.10.10.10/joomla/administrator/
http://10.10.10.10/administrator/
http://10.10.10.10/bin/
http://10.10.10.10/cache/
http://10.10.10.10/cli/
http://10.10.10.10/components/
http://10.10.10.10/includes/
http://10.10.10.10/installation/
http://10.10.10.10/language/
http://10.10.10.10/layouts/
http://10.10.10.10/libraries/
http://10.10.10.10/logs/
http://10.10.10.10/modules/
http://10.10.10.10/plugins/
http://10.10.10.10/tmp/


[+] Finding common backup files name
[++] Backup files are not found

[+] Finding common log files name
[++] error log is not found

[+] Checking sensitive config.php.x file
[++] Readable config files are not found


Your Report : reports/10.10.10.10/

```

## URL List

* [Github.com - JoomScan](https://github.com/OWASP/joomscan)
* [Tools.kali.org - JoomScan](https://tools.kali.org/web-applications/joomscan)
