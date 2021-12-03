---
title : "Crosslinked"
# pre : ' '
description : "Simplifies the processes of searching LinkedIn to collect valid employee names."
date : 2020-03-10T15:34:20+01:00
# hidden : true
# draft : true
weight : 0
tags: ['Other','LinkedIn']
---

## Crosslinked

Simplifies the processes of searching LinkedIn to collect valid employee names.

### Installation

```plain
git clone https://github.com/m8r0wn/CrossLinked.git
```

Install requirements

```plain
pip3 install -r requirements.txt
```

### Usage

```plain
python3 crosslinked.py [OPTIONS]
```

### Flags

```plain
positional arguments:
  company_name  Target company name

optional arguments:
  -h, --help    show this help message and exit
  -t TIMEOUT    Timeout [seconds] for search threads (Default: 25)
  -j JITTER     Jitter for scraping evasion (Default: 0)
  -o OUTFILE    Change name of output file (default: names.txt
  -f NFORMAT    Format names, ex: 'domain\{f}{last}', '{first}.{last}@domain.com'
  -s, --safe    Only parse names with company in title (Reduces false positives)
  -v            Show names and titles recovered after enumeration
```

### Examples

```plain
$ python3 crosslinked.py -f '{first}.{last}@example.com' example.com
[*] Searching google for valid employee names at example.com
[*] 0 : https://www.google.com/search?q=site:linkedin.com/in+"example.com"&num=100&start=0
[*] 94 : https://www.google.com/search?q=site:linkedin.com/in+"example.com"&num=100&start=114
[*] 170 : https://www.google.com/search?q=site:linkedin.com/in+"example.com"&num=100&start=229
[*] 224 : https://www.google.com/search?q=site:linkedin.com/in+"example.com"&num=100&start=330
[*] Searching bing for valid employee names at example.com
[*] 0 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=0
[*] 7 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=24
[*] 16 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=49
[*] 23 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=74
[*] 32 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=98
[*] 41 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=123
[*] 51 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=148
[*] 60 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=173
[*] 69 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=198
[*] 78 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=224
[*] 88 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=249
[*] 97 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=284
[*] 101 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=307
[*] 104 : https://www.bing.com/search?q=site:linkedin.com/in+"example.com"&first=341
[+] names.txt complete, 266 unique names found!
```

```plain
$ head names.txt
pornwilai.tusawan@example.com
jelle.van@example.com
eddy.example@example.com
وذوي.تبت@example.com
credential.manager@example.com
guntis.haritonovs@example.com
ahmed.ossour@example.com
ermeyas.germa@example.com
biglove.zaza@example.com
jim.bob@example.com
```

### URL list

* [GitHub.com - Crosslinked](https://github.com/m8r0wn/CrossLinked)
