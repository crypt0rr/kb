---
title : "Emailfinder"
# pre : ' '
description : "Search emails through Search Engines."
date : 2021-06-16T13:21:52+02:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

Search emails through Search Engines.

## Installation

```plain
python3 -m pip install emailfinder
```

## Usage

```plain
emailfinder [-h] -d DOMAIN [-v]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Domain to search
  -v, --version         Show Emailfinder version
```

## Examples

```plain
$ emailfinder -d example.com
      ___________    ________ __________ 
  ____\_   _____/___ \______ \\______   \
_/ __ \|    __)/    \ |    |  \|       _/
\  ___/|     \|   |  \|    `   \    |   \
 \___  >___  /|___|  /_______  /____|_  /
     \/    \/      \/        \/       \/ 

|_ Author: @JosueEncinar
|_ Description: Search emails from a domain through search engines.
|_ Version: 0.2.3b
|_ Usage: emailfinder -d domain.com

Searching in google...
Searching in bing...
Searching in baidu...
Searching in yandex...
[!]  Error: not well-formed (invalid token): line 1, column 137
[!]  Error: not well-formed (invalid token): line 1, column 173
[+] bing done!
[+] google done!

Total emails: 20
-----------------
susan@example.com
name@example.com
foo-bar@example.com
someone@example.com
contact@example.com
janedoe@example.com
office@example.com
odoobot@example.com
johnsmith@example.com
example@example.com
abc@example.com
jemand@example.com
user@example.com
email@example.com
joe@example.com
youremail@example.com
john.smith@example.com
hey@example.com
jsmith@example.com
admin@example.com
```

## URL List

- [Github.com - EmailFinder](https://github.com/Josue87/EmailFinder)
