---
title : "Proxychains"
# pre : ' '
description : "ProxyChains is a UNIX program, that hooks network-related libc functions in dynamically linked programs via a preloaded DLL and redirects the connections through SOCKS4a/5 or HTTP proxies."
date : 2022-02-04T15:28:07+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Proxychains

ProxyChains is a UNIX program, that hooks network-related libc functions in dynamically linked programs via a preloaded DLL and redirects the connections through SOCKS4a/5 or HTTP proxies.

## Installation

```plain
sudo apt-get install -y proxychains
```

## Usage

```plain
proxychains4 -q -f config_file program_name [arguments]
    -q makes proxychains quiet - this overrides the config setting
    -f allows one to manually specify a configfile to use
    for example : proxychains telnet somehost.com
```

## Examples

Default location of the config file is `/etc/proxychains4.conf`

```plain
[ProxyList]
# add proxy here ...
#socks4     127.0.0.1 9050
socks4      127.0.0.1 1080
```

## URL List

* [Linuxhint.com - Proxychains Tutorial](https://linuxhint.com/proxychains-tutorial/)
* [Github.com - Proxychains](https://github.com/haad/proxychains)
