---
title: "Aquatone"
# pre : ' '
Description: "A tool for visual inspection of websites across a large amount of hosts and is convenient for quickly gaining an overview of HTTP-based attack surface."
date: 2020-03-10T15:32:28+01:00
# hidden : true
# draft : true
weight: 0
# tags : [""]
---

## Aquatone

A tool for visual inspection of websites across a large amount of hosts and is convenient for quickly gaining an overview of HTTP-based attack surface.

[Automated version - Subdomain Visualizer](https://github.com/crypt0rr/subdomain-visualizer)

### Installation

Download latest binary from [Github.com](https://github.com/michenriksen/aquatone/releases)

### Usage

```plain
aquatone [OPTIONS]
```

### Flags

```plain
Usage of aquatone:
  -chrome-path string
        Full path to the Chrome/Chromium executable to use. By default, aquatone will search for Chrome or Chromium
  -debug
        Print debugging information
  -http-timeout int
        Timeout in miliseconds for HTTP requests (default 3000)
  -nmap
        Parse input as Nmap/Masscan XML
  -out string
        Directory to write files to (default ".")
  -ports string
        Ports to scan on hosts. Supported list aliases: small, medium, large, xlarge (default "80,443,8000,8080,8443")
  -proxy string
        Proxy to use for HTTP requests
  -resolution string
        screenshot resolution (default "1440,900")
  -save-body
        Save response bodies to files (default true)
  -scan-timeout int
        Timeout in miliseconds for port scans (default 100)
  -screenshot-timeout int
        Timeout in miliseconds for screenshots (default 30000)
  -session string
        Load Aquatone session file and generate HTML report
  -silent
        Suppress all output except for errors
  -template-path string
        Path to HTML template to use for report
  -threads int
        Number of concurrent threads (default number of logical CPUs)
  -version
        Print current Aquatone version
```

### Examples

```plain
cat <targets> | ./aquatone -ports <flag>
```

### URL list

- [GitHub.com - Aquatone](https://github.com/michenriksen/aquatone)
