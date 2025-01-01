---
title : "Proxychains"
# pre : ' '
description : "ProxyChains is a UNIX program, that hooks network-related libc functions in dynamically linked programs via a preloaded DLL and redirects the connections through SOCKS4a/5 or HTTP proxies."
date : 2022-02-04T15:28:07+01:00
# hidden : true
# draft : true
weight : 300
tags : ['Networking', 'Proxy', 'Pivoting']
---

---

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

Default location of the config file is `/etc/proxychains4.conf`. For example use  SSH to build a Dynamic Port Forward.

```plain
[ProxyList]
# add proxy here ...
#socks4     127.0.0.1 9050
socks4      127.0.0.1 8080
```

Routing of traffic through proxychains in combination with SSH Dynamic Port Forward.

```plain
$ proxychains nmap 10.10.10.2 -Pn -p22
Starting Nmap 7.93 ( https://nmap.org ) at 2022-11-15 10:14 CET
Nmap scan report for 10.10.10.2
Host is up (0.0046s latency).

PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 6.08 seconds
```

## URL List

- [Linuxhint.com - Proxychains Tutorial](https://linuxhint.com/proxychains-tutorial/)
- [Github.com - Proxychains](https://github.com/haad/proxychains)
