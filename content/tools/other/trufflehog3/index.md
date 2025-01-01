---
title : "Trufflehog3"
# pre : ' '
description : "Searches through git repositories for secrets, digging deep into commit history and branches. This is effective at finding secrets accidentally committed."
date : 2021-11-30T14:02:05+01:00
# hidden : true
# draft : true
weight : 1950
tags : ['Other', 'Git']
---

---

Searches through git repositories for secrets, digging deep into commit history and branches. This is effective at finding secrets accidentally committed.

## Installation

```plain
pip install trufflehog3
```

## Usage

```plain
trufflehog3 [arguments] targets
```

## Flags

```plain
Find secrets in your codebase

positional arguments:
  targets                 Search targets, defaults to current directory

optional arguments:
  -h, --help              show this help message and exit
  -z, --zero              always exit with zero status code
  -v, --verbose           enable verbose logging {-v, -vv, -vvv}
  -o, --output file       path to output file
  -c, --config file       path to config file
  -r, --rules file        path to rules file
  -i, --incremental file  path to previous scan
  -p, --processes int     number of subprocesses to run (8)

search arguments:
  -e, --exclude str       exclude matching issues
  -s, --severity {LOW, MEDIUM, HIGH}
                          minimum severity filter (LOW)
  --ignore-nosecret       ignore inline 'nosecret' annotations
  --no-entropy            disable entropy checks
  --no-pattern            disable pattern checks

source arguments:
  --branch str            name of the repo branch to scan
  --depth int             max commits depth for searching (10000)
  --since                 scan from the given commit hash
  --no-current            disable current status check
  --no-history            disable commit history check

render arguments:
  -f, --format {TEXT, JSON, HTML}
                          output format (TEXT)
  --context int           number of context lines to include

other commands:
  -R, --render-html       render HTML report from JSON
  -V, --version           show version message and exit

learn more:
  https://github.com/feeltheajf/trufflehog3

version:
  3.0.3
```

## Examples

If ran locally just press 'enter' twice for username/password (leave blank).

```plain
trufflehog3 --format json --output report.json
```

### Create report from JSON

```plain
trufflehog3 -R report.json > report.html
```

## URL List

- [Github.com - TruffleHog3](https://github.com/feeltheajf/truffleHog3)
