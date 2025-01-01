---
title : "Crosslinked"
# pre : ' '
description : "Simplifies the processes of searching LinkedIn to collect valid employee names."
date : 2020-03-10T15:34:20+01:00
# hidden : true
# draft : true
weight : 70
tags: ['Other','LinkedIn']
---

---

CrossLinked is a LinkedIn enumeration tool that uses search engine scraping to collect valid employee names from an organization. This technique provides accurate results without the use of API keys, credentials, or accessing LinkedIn directly!

In the latest version CrossLinked now includes a names.csv output file, which stores all scraping data including: first name, last name, job title, and url. This can be ingested and parsed to reformat user accounts as needed.

### Prerequisite

CrossLinked assumes the organization's account naming convention has already been identified. This is required for execution and should be added to the CMD args based on your expected output. See the [Naming Format](https://github.com/m8sec/CrossLinked#naming-format) and [Example Usage](https://github.com/m8sec/CrossLinked#example-usage-1) sections.

## Installation

```plain
git clone https://github.com/m8r0wn/CrossLinked.git
```

Install requirements

```plain
python3 -m pip install -r requirements.txt
```

## Usage

```plain
python3 crosslinked.py [OPTIONS]
```

## Flags

```plain
positional arguments:
  company_name        Target company name

options:
  -h, --help          show this help message and exit
  -t TIMEOUT          Max timeout per search (Default=15)
  -j JITTER           Jitter between requests (Default=1)

Search arguments:
  --search ENGINE     Search Engine (Default='google,bing')

Output arguments:
  -f NFORMAT          Format names, ex: 'domain\{f}{last}', '{first}.{last}@domain.com'
  -o OUTFILE          Change name of output file (omit_extension)

Proxy arguments:
  --proxy PROXY       Proxy requests (IP:Port)
  --proxy-file PROXY  Load proxies from file for rotation
```

## Examples

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

## URL List

- [GitHub.com - Crosslinked](https://github.com/m8r0wn/CrossLinked)
