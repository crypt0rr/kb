---
title: "Aquatone"
# pre : ' '
Description: "A tool for visual inspection of websites across a large amount of hosts and is convenient for quickly gaining an overview of HTTP-based attack surface."
date: 2020-03-10T15:32:28+01:00
# hidden : true
# draft : true
weight: 80
# tags : [""]
---

---

A tool for visual inspection of websites across a large amount of hosts and is convenient for quickly gaining an overview of HTTP-based attack surface.

[Automated version - Subdomain Visualizer](https://github.com/crypt0rr/subdomain-visualizer)

## Installation

```plain
git clone https://github.com/shelld3v/aquatone.git
go build
```

## Usage

```plain
aquatone [OPTIONS]
```

## Flags

```plain
Usage of aquatone:
  -chrome-path string
        Full path to the Chrome/Chromium executable to use. By default, aquatone will search for Chrome or Chromium
  -filter-codes string
        Filter hosts that return any of these HTTP status codes (seperated by commas)
  -filter-string string
        Filter host thats have this string in the response body
  -follow-redirect
        Follow HTTP redirects
  -full-page
        Screenshot full web pages
  -http-header value
        Optional HTTP request header (can be used multiple times for multiple headers)
  -http-timeout int
        Timeout in milliseconds for HTTP requests (default 15000)
  -input-file string
        Input file to parse hosts (Nmap or Raw) rather than STDIN
  -match-codes string
        Filter hosts that do not return any of these HTTP status codes (seperated by commas)
  -nmap
        Parse input as Nmap/Masscan XML
  -offline
        Use offline JS files to generate the template report (can be browsed without Internet)
  -out string
        Directory to write files to (default ".")
  -ports string
        Ports to scan on hosts. Supported list aliases: small, medium, large, xlarge (default "80,443,8080,8443")
  -proxy string
        Proxy to use for HTTP requests
  -save-body
        Save response bodies to files (default true)
  -scan-timeout int
        Timeout in milliseconds for port scans (default 3000)
  -screenshot-delay int
        Delay in milliseconds before taking screenshots
  -screenshot-timeout int
        Timeout in milliseconds for screenshots (default 40000)
  -session string
        Load Aquatone session file and generate HTML report
  -silent
        Suppress all output except for errors
  -similarity float
        Similarity rate for screenshots clustering (default 0.85)
  -template-path string
        Path to HTML template to use for report
  -threads int
        Number of concurrent threads (default number of logical CPUs)
  -thumbnail-size string
        Screenshot thumbnail size (format: width,height)
  -timeout int
        Generic timeout for everything. (specific timeouts will be ignored if set)
  -version
        Print current Aquatone version
```

## Examples

```plain
cat <targets> | ./aquatone -ports <flag>
```

## URL List

- [Github.com - aquatone](https://github.com/shelld3v/aquatone)
- [GitHub.com - aquatone (original, not maintained)](https://github.com/michenriksen/aquatone)
