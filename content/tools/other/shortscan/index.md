---
title : "Shortscan"
# pre : ' '
description : "An IIS short filename enumeration tool."
date : 2024-05-05T20:34:05+02:00
# hidden : true
# draft : true
weight : 1590
tags : ['Other', 'IIS']
---

---

An IIS short filename enumeration tool.

> Functionality

Shortscan is designed to quickly determine which files with short filenames exist on an IIS webserver. Once a short filename has been identified the tool will try to automatically identify the full filename.

In addition to standard discovery methods Shortscan also uses a unique checksum matching approach to attempt to find the long filename where the short filename is based on Windows' proprietary shortname collision avoidance checksum algorithm (more on this research at a later date).

## Installation

```plain
go install github.com/bitquark/shortscan/cmd/shortscan@latest
```

### Manual install

To build (and optionally install) locally:

```plain
go get && go build
go install
```

## Usage

```plain
shortscan [--wordlist FILE] [--header HEADER] [--concurrency CONCURRENCY] [--timeout SECONDS] [--output format] [--verbosity VERBOSITY] [--fullurl] [--norecurse] [--stabilise] [--patience LEVEL] [--characters CHARACTERS] [--autocomplete mode] [--isvuln] URL [URL ...]
```

## Flags

```plain
Positional arguments:
  URL                    url to scan (multiple URLs can be specified)

Options:
  --wordlist FILE, -w FILE
                         combined wordlist + rainbow table generated with shortutil
  --header HEADER, -H HEADER
                         header to send with each request (use multiple times for multiple headers)
  --concurrency CONCURRENCY, -c CONCURRENCY
                         number of requests to make at once [default: 20]
  --timeout SECONDS, -t SECONDS
                         per-request timeout in seconds [default: 10]
  --output format, -o format
                         output format (human = human readable; json = JSON) [default: human]
  --verbosity VERBOSITY, -v VERBOSITY
                         how much noise to make (0 = quiet; 1 = debug; 2 = trace) [default: 0]
  --fullurl, -F          display the full URL for confirmed files rather than just the filename [default: false]
  --norecurse, -n        don't detect and recurse into subdirectories (disabled when autocomplete is disabled) [default: false]
  --stabilise, -s        attempt to get coherent autocomplete results from an unstable server (generates more requests) [default: false]
  --patience LEVEL, -p LEVEL
                         patience level when determining vulnerability (0 = patient; 1 = very patient) [default: 0]
  --characters CHARACTERS, -C CHARACTERS
                         filename characters to enumerate [default: JFKGOTMYVHSPCANDXLRWEBQUIZ8549176320-_()&'!#$%@^{}~]
  --autocomplete mode, -a mode
                         autocomplete detection mode (auto = autoselect; method = HTTP method magic; status = HTTP status; distance = Levenshtein distance; none = disable) [default: auto]
  --isvuln, -V           bail after determining whether the service is vulnerable [default: false]
  --help, -h             display this help and exit
  --version              display version and exit
```

## URL list

- [Github.com - shortscan](https://github.com/bitquark/shortscan)
