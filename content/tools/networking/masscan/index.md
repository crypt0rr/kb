---
title : "MASSCAN"
# pre : ' '
description : "MASSCAN is a fast port scanner. The primary input parameters are the IP addresses/ranges you want to scan, and the port numbers.."
date : 2022-10-08T12:40:43+02:00
# hidden : true
# draft : true
weight : 200
# tags : ['']
---

---

MASSCAN is a fast port scanner. The primary input parameters are the IP addresses/ranges you want to scan, and the port numbers. The program auto-detects network interface/adapter settings. If this fails, you'll have to set these manually. Parameters can be set either via the command-line or config-file. The names are the same for both. All single-dash parameters have a spelled out double-dash equivalent, so `-p80` is the same as `--ports 80` (or `ports = 80` in config file). To generate a config-file from the current settings, use the `--echo` option. This stops the program from actually running, and just echoes the current configuration instead. This is a useful way to generate your first config file, or see a list of parameters you didn't know about.

## Installation

```plain
git clone https://github.com/robertdavidgraham/masscan
make
```

```plain
brew install masscan
```

## Usage

```plain
masscan [OPTIONS]
```

## Flags

```plain
masscan -p80,8000-8100 10.0.0.0/8 --rate=10000
 scan some web ports on 10.x.x.x at 10kpps
masscan --nmap
 list those options that are compatible with nmap
masscan -p80 10.0.0.0/8 --banners -oB <filename>
 save results of scan in binary format to <filename>
masscan --open --banners --readscan <filename> -oX <savefile>
 read binary scan results in <filename> and save them as xml in <savefile>
```

## Examples

Scanning port 80 with a rate limit of 1000 packets/second. Default rate limit is 100.

```plain
$ sudo masscan -p80 10.10.10.0/24 --rate=1000  --router-ip 10.10.20.254
Starting masscan 1.3.2 (http://bit.ly/14GZzcT) at 2022-10-08 10:45:15 GMT
Initiating SYN Stealth Scan
Scanning 256 hosts [1 port/host]
Discovered open port 80/tcp on 10.10.10.3 
```

## URL List

- [Github.com - MASSCAN](https://github.com/robertdavidgraham/masscan)
- [Kali.org - MASSCAN](https://www.kali.org/tools/masscan/)
