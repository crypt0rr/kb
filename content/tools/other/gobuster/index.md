---
title : "Gobuster"
# pre : ' '
description : "Directory/File, DNS and VHost busting tool written in Go."
date : 2020-03-10T15:34:50+01:00
# hidden : true
# draft : true
weight : 760
tags : ['Other', 'Brute Force', 'Web Application', 'Directory Brute Force']
---

---

Directory/File, DNS and VHost busting tool written in Go.

## Installation

Download newest release from [Github.com](https://github.com/OJ/gobuster/releases)

## Usage

```plain
gobuster [command]
```

## Flags

```plain
Usage:
  gobuster [command]

Available Commands:
  dir         Uses directory/file brutceforcing mode
  dns         Uses DNS subdomain bruteforcing mode
  help        Help about any command
  vhost       Uses VHOST bruteforcing mode

Flags:
  -h, --help              help for gobuster
  -z, --noprogress        Don't display progress
  -o, --output string     Output file to write results to (defaults to stdout)
  -q, --quiet             Don't print the banner and other noise
  -t, --threads int       Number of concurrent threads (default 10)
  -v, --verbose           Verbose output (errors)
  -w, --wordlist string   Path to the wordlist

Use "gobuster [command] --help" for more information about a command.
```

## Examples

### Start gobuster with directory list only showing status code 200 OK

```plain
./gobuster dir -u <url> -w <directory-list>.txt -k --statuscodes 200
```

### Append extension after every entry in wordlist

```plain
./gobuster dir -u <url> -w <directory-list>.txt -x php
```

Will result in:
test.php
test1.php

### Start gobuster through proxy

```plain
./gobuster dir -u <url> -w <directory-list>.txt -k --statuscodes 200 --proxy http://127.0.0.1:8080
```

### Wordlists

- [Github.com - Bo0om - fuzz.txt](https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt)
- [Github.com - daviddias - lists](https://github.com/daviddias/node-dirbuster/tree/master/lists)

## URL List

- [GitHub.com - gobuster](https://github.com/OJ/gobuster)
