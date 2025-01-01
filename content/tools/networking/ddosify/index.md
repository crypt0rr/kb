---
title : "ddosify"
# pre : ' '
description : "High-performance load testing tool, written in Golang."
date : 2022-05-29T14:56:38+02:00
# hidden : true
# draft : true
weight : 140
# tags : ['']
---

---

High-performance load testing tool, written in Golang. For distributed and Geo-targeted load testing: Ddosify Cloud - <https://ddosify.com>.

**Please read [Github](https://github.com/ddosify/ddosify) repo before use**

## Installation

`ddosify` is available via [Docker](https://hub.docker.com/r/ddosify/ddosify), [Homebrew Tap](#homebrew-tap-macos-and-linux), and downloadable pre-compiled binaries from the [releases page](https://github.com/ddosify/ddosify/releases/latest) for macOS, Linux and Windows.

### Docker

```bash
docker run -it --rm ddosify/ddosify
```

### Homebrew Tap (macOS and Linux)

```bash
brew install ddosify/tap/ddosify
```

### apk, deb, rpm, Arch Linux packages

- For arm architectures change `ddosify_amd64` to `ddosify_arm64` or `ddosify_armv6`.
- Superuser privilege is required.

```plain
# For Redhat based (Fedora, CentOS, RHEL, etc.)
rpm -i https://github.com/ddosify/ddosify/releases/latest/download/ddosify_amd64.rpm

# For Debian based (Ubuntu, Linux Mint, etc.)
wget https://github.com/ddosify/ddosify/releases/latest/download/ddosify_amd64.deb
dpkg -i ddosify_amd64.deb

# For Alpine
wget https://github.com/ddosify/ddosify/releases/latest/download/ddosify_amd64.apk
apk add --allow-untrusted ddosify_amd64.apk

# For Arch Linux
git clone https://aur.archlinux.org/ddosify.git
cd ddosify
makepkg -sri
```

### Windows exe from the [releases page](https://github.com/ddosify/ddosify/releases/latest)

- Download *.zip file for your architecture. For example download ddosify version vx.x.x with amd64 architecture: ddosify_x.x.x.zip_windows_amd64
- Unzip `ddosify_x.x.x_windows_amd64.zip`
- Open Powershell or CMD (Command Prompt) and change directory to unzipped folder: `ddosify_x.x.x_windows_amd64`
- Run ddosify:

```bash
.\ddosify.exe -t target_site.com
```

## Usage

You can configure your load test by the CLI options or a config file. Config file supports more features than the CLI. For example, you can't create a scenario-based load test with CLI options.

### CLI Flags

```plain
ddosify [FLAG]
```

## Flags

| Flag       | Description                                                                                                                                                         | Type     | Default  | Required? |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------- |
| `-t`       | Target website URL. Example: <https://ddosify.com>                                                                                                                  | `string` | -        | Yes       |
| `-n`       | Total request count                                                                                                                                                 | `int`    | `100`    | No        |
| `-d`       | Test duration in seconds.                                                                                                                                           | `int`    | `10`     | No        |
| `-p`       | Protocol of the request. Supported protocols are *HTTP, HTTPS*. HTTP/2 support is only available by using a config file as described. More protocols will be added. | `string` | `HTTPS`  | No        |
| `-m`       | Request method. Available methods for HTTP(s) are *GET, POST, PUT, DELETE, HEAD, PATCH, OPTIONS*                                                                    | `string` | `GET`    | No        |
| `-b`       | The payload of the network packet. AKA body for the HTTP.                                                                                                           | `string` | -        | No        |
| `-a`       | Basic authentication. Usage: `-a username:password`                                                                                                                 | `string` | -        | No        |
| `-h`       | Headers of the request. You can provide multiple headers with multiple `-h` flag.                                                                                   | `string` | -        | No        |
| `-T`       | Timeout of the request in seconds.                                                                                                                                  | `int`    | `5`      | No        |
| `-P`       | Proxy address as host:port. `-P http://user:pass@proxy_host.com:port'`                                                                                              | `string` | -        | No        |
| `-o`       | Test result output destination. Supported outputs are [*stdout, stdout-json*] Other output types will be added.                                                     | `string` | `stdout` | No        |
| `-l`       | Type load-types of the load test. Ddosify supports 3 load types.                                                                                                | `string` | `linear` | No        |
| `-config`  | Config File] of the load test.                                                                                                                       | `string` | -        | No        |
| `-version` | Prints version, git commit, built date (utc), go information and quit                                                                                               | -        | -        | No        |

## Examples

![Example](images/ddosify-quick-start.gif)

## URL List

- [Ddosify.com](https://ddosify.com/)
- [Github.com - ddosify](https://github.com/ddosify/ddosify)
