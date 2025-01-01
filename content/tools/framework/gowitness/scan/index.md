---
title : "Scan"
# pre : ' '
description : "Perform various scans using sources such as a file, Nmap XMLs, Nessus exports, or by scanning network CIDR ranges."
date : 2024-09-18T14:55:33+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Perform various scans using sources such as a file, Nmap XMLs, Nessus exports, or by scanning network CIDR ranges.

By default, gowitness will only take screenshots. However, that is only half the fun! You can add multiple writers that will collect information such as response codes, content, and more. You can specify multiple writers using the  `--writer-*` flags (see --help).

Note: By default, no metadata is saved except for screenshots that are stored in the configured --screenshot-path. For later parsing (i.e., using the  gowitness reporting feature), you need to specify where to write results (db, csv, jsonl) using the --write-* set of flags. See --help for available flags.

## Installation

Install [GoWitness]({{< ref "../gowitness" >}})

## Usage

```plain
gowitness scan [OPTIONS]
```

## Available Commands

- `cidr` - Scan CIDR targets on a network
- `file` - Scan targets sourced from a file or stdin
- `nessus` - Scan targets from a Nessus XML file
- `nmap` - Scan targets from an Nmap XML file
- `single` - Scan a single URL target

## Flags

```plain
      --chrome-header strings      Extra headers to add to requests. Supports multiple --header flags
      --chrome-path string         The path to a Google Chrome binary to use (downloads a platform-appropriate binary by default)
      --chrome-proxy string        An HTTP/SOCKS5 proxy server to use. Specify the proxy using this format: proto://address:port
      --chrome-user-agent string   The user-agent string to use (default "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36")
      --chrome-window-x int        The Chrome browser window width, in pixels (default 1920)
      --chrome-window-y int        The Chrome browser window height, in pixels (default 1080)
      --chrome-wss-url string      A websocket URL to connect to a remote, already running Chrome DevTools instance (i.e., Chrome started with --remote-debugging-port)
      --delay int                  Number of seconds delay between navigation and screenshotting (default 3)
      --driver string              The scan driver to use. Can be one of [gorod, chromedp] (default "chromedp")
  -h, --help                       help for scan
      --javascript string          A JavaScript function to evaluate on every page, before a screenshot. Note: It must be a JavaScript function! e.g., () => console.log('gowitness');
      --javascript-file string     A file containing a JavaScript function to evaluate on every page, before a screenshot. See --javascript
      --log-scan-errors            Log scan errors (timeouts, DNS errors, etc.) to stderr (warning: can be verbose!)
      --save-content               Save content from network requests to the configured writers. WARNING: This flag has the potential to make your storage explode in size
      --screenshot-format string   Format to save screenshots as. Valid formats are: jpeg, png (default "jpeg")
      --screenshot-fullpage        Do full-page screenshots, instead of just the viewport
  -s, --screenshot-path string     Path to store screenshots (default "./screenshots")
      --skip-html                  Don't include the first request's HTML response when writing results
  -t, --threads int                Number of concurrent threads (goroutines) to use (default 6)
  -T, --timeout int                Number of seconds before considering a page timed out (default 60)
      --uri-filter strings         Valid URIs to pass to the scanning process (default [http,https])
      --write-csv                  Write results as CSV (has limited columns)
      --write-csv-file string      The file to write CSV rows to (default "gowitness.csv")
      --write-db                   Write results to a SQLite database
      --write-db-enable-debug      Enable database query debug logging (warning: verbose!)
      --write-db-uri string        The database URI to use. Supports SQLite, Postgres, and MySQL (e.g., postgres://user:pass@host:port/db) (default "sqlite://gowitness.sqlite3")
      --write-jsonl                Write results as JSON lines
      --write-jsonl-file string    The file to write JSON lines to (default "gowitness.jsonl")
      --write-screenshots          Store screenshots with writers in addition to filesystem storage
      --write-stdout               Write successful results to stdout (usefull in a shell pipeline)

Global Flags:
  -D, --debug-log   Enable debug logging
  -q, --quiet       Silence (almost all) logging
```

## Examples

### Single URL

- Screenshots are saved within `$PWD\screenshots`

```plain
$ gowitness scan single -u https://kb.offsec.nl
2024/09/18 15:00:37 WARN no writers have been configured. only saving screenshots. add writers using --write-* flags
2024/09/18 15:00:43 INFO result 🤖 target=https://kb.offsec.nl status-code=200 title="Home :: Knowledge Base (KB)" have-screenshot=true
```

### Single URL with DB

- Screenshots are saved within `$PWD\screenshots`
- `gowitness.sqlite3` will be created in `$PWD` - for later use with GoWitness Report

```plain
$ gowitness scan single -u https://kb.offsec.nl --write-db  
2024/09/18 15:03:24 INFO result 🤖 target=https://kb.offsec.nl status-code=200 title="Home :: Knowledge Base (KB)" have-screenshot=true
```
