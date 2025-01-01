---
title : "Axel"
# pre : ' '
description : "Lightweight CLI download accelerator."
date : 2022-08-15T10:26:54+02:00
# hidden : true
# draft : true
weight : 140
tags : ['Other', 'macOS', 'Linux', 'FTP', 'HTTP']
---

---

Axel tries to accelerate the download process by using multiple connections per file, and can also balance the load between different servers. Axel tries to be as light as possible, so it might be useful on byte-critical systems.

Axel supports:

- HTTP
- HTTPS
- FTP
- FTPS

## Installation

### Debian

```plain
sudo apt install axel
```

### macOS

```plain
brew install axel
```

## Usage

```plain
axel [options] url1 [url2] [url...]
```

## Flags

```plain
--max-speed=x           -s x    Specify maximum speed (bytes per second)
--num-connections=x     -n x    Specify maximum number of connections
--max-redirect=x                Specify maximum number of redirections
--output=f              -o f    Specify local output file
--search[=n]            -S[n]   Search for mirrors and download from n servers
--ipv4                  -4      Use the IPv4 protocol
--ipv6                  -6      Use the IPv6 protocol
--header=x              -H x    Add HTTP header string
--user-agent=x          -U x    Set user agent
--no-proxy              -N      Just don't use any proxy server
--insecure              -k      Don't verify the SSL certificate
--no-clobber            -c      Skip download if file already exists
--quiet                 -q      Leave stdout alone
--verbose               -v      More status information
--alternate             -a      Alternate progress indicator
--percentage            -p      Print simple percentages instead of progress bar (0-100)
--help                  -h      This information
--timeout=x             -T x    Set I/O and connection timeout
--version               -V      Version information

Visit  to report bugs
```

## Examples

```plain
$ axel https://mirror.nl.datapacket.com/ubuntu-releases/22.04.1/ubuntu-22.04.1-desktop-amd64.iso
Initializing download: https://mirror.nl.datapacket.com/ubuntu-releases/22.04.1/ubuntu-22.04.1-desktop-amd64.iso
File size: 3.56401 Gigabyte(s) (3826831360 bytes)
Opening output file ubuntu-22.04.1-desktop-amd64.iso
Starting download

Connection 3 finished
Connection 2 finished
Connection 0 finished
Connection 2 finished
Connection 3 finished
Connection 1 finished
[100%] [.................................................................................................] [   3.2MB/s] [00:00]

Downloaded 3.56401 Gigabyte(s) in 18:49 minute(s). (3309.93 KB/s)
```

## URL List

- [Github.com - Axel](https://github.com/axel-download-accelerator/axel)
