---
title : "Breacher"
# pre : ' '
description : "A script to find admin login pages and EAR vulnerabilities."
date : 2021-05-24T16:58:06+02:00
# hidden : true
# draft : true
weight : 200
# tags : ['']
---

---

A script to find admin login pages and EAR vulnerabilities.

## Installation

```plain
git clone https://github.com/crypt0rr/Breacher.git
```

## Usage

```plain
breacher.py [-h] [-u TARGET] [--path PREFIX] [--type TYPE] [--fast]
```

## Flags

```plain
optional arguments:
  -h, --help     show this help message and exit
  -u TARGET      target url
  --path PREFIX  custom path prefix
  --type TYPE    set the type i.e. html, asp, php
  --fast         uses multithreading
```

## Examples

```plain
$ python3 breacher.py -u https://example.com/
______   ______ _______ _______ _______ _     _ _______  ______
|_____] |_____/ |______ |_____| |       |_____| |______ |_____/
|_____] |    \_ |______ |     | |_____  |     | |______ |    \_
                        Made with <3 By D3V

  I am not responsible for your shit and if you get some error while
 running Breacher, there are good chances that target isn't responding.

--------------------------------------------------------------------------

  [+] Robots.txt found. Check for any interesting entry

User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://example.com/wp-sitemap.xml

--------------------------------------------------------------------------

[...]
  [-] http://example.com/websvn/
  [-] http://example.com/wizmysqladmin/
  [+] Admin panel found: http://example.com/wp-admin/
  [-] http://example.com/wp-login/
  [-] http://example.com/wplogin/
  [+] Admin panel found: http://example.com/wp-login.php
[...]
```

## URL List

- [Github.com - breacher](https://github.com/crypt0rr/Breacher.git)
