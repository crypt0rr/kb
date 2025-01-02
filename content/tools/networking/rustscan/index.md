---
title : "RustScan"
# pre : ' '
description : "Fast Port Scanner built in Rust. RustScans only job is to reduce the friction between finding open ports and inputting them into nmap."
date : 2020-08-31T14:17:57+02:00
# hidden : true
# draft : true
weight : 330
# tags : ['']
---

---

Find all open ports fast with RustScan, automatically pipe them into Nmap.

Fast Port Scanner built in Rust. WARNING Do not use this program against sensitive infrastructure since the specified
server may not be able to handle this many socket connections at once. - [Discord](https://discord.gg/GFrQsGy) - [GitHub](https://github.com/RustScan/RustScan)

## Installation

Download newest release from [Github.com](https://github.com/brandonskerritt/RustScan/releases)

```plain
sudo dpkg -i rustscan_x.x.x_amd64.deb
```

## Usage

```plain
rustscan [FLAGS] [OPTIONS] <ips-or-hosts>... [-- <command>...]
```

## Flags

```plain
FLAGS:
    -a, --accessible
    -h, --help          Prints help information
    -q, --quiet         Quiet mode. Only output the ports. No Nmap. Useful for grep or outputting to a file
    -V, --version       Prints version information

OPTIONS:
    -b, --batch-size <batch-size>    The batch size for port scanning, it increases or slows the speed of scanning.
                                     Depends on the open file limit of your OS.  If you do 65535 it will do every port
                                     at the same time. Although, your OS may not support this [default: 4500]
    -p, --ports <ports>...           A list of comma separed ports to be scanned. Example: 80,443,8080
    -r, --range <range>              A range of ports with format start-end. Example: 1-1000
        --scan-order <scan-order>    The order of scanning to be performed. The "serial" option will scan ports in
                                     ascending order while the "random" option will scan ports randomly [default:
                                     serial]  [possible values: Serial, Random]
    -t, --timeout <timeout>          The timeout in milliseconds before a port is assumed to be closed [default: 1500]
    -u, --ulimit <ulimit>            Automatically ups the ULIMIT with the value you provided

ARGS:
    <ips-or-hosts>...    A list of comma separated IP addresses or hosts to be scanned
    <command>...         The Nmap arguments to run. To use the argument -A, end RustScan's args with '-- -A'.
                         Example: 'rustscan -t 1500 127.0.0.1 -- -A -sC'. This command adds -Pn -vvv -p $PORTS
                         automatically to nmap. For things like --script '(safe and vuln)' enclose it in quotations
                         marks \"'(safe and vuln)'\"")

```

## Examples

Normal run with extra NMAP flag (-Pn)

```plain
$ rustscan -a 10.10.10.10 -- -Pn
Open 10.10.10.10:22
Open 10.10.10.10:53
[~] Starting Nmap
[>] The Nmap command to be run is nmap -Pn -vvv -p 22,53 10.10.10.10

Starting Nmap 7.80 ( https://nmap.org ) at 2020-09-07 16:18 CEST
[...]
Scanned at 2020-09-07 16:18:27 CEST for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
53/tcp open  domain  syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
```

## URL List

- [Github.com - RustScan](https://github.com/RustScan/RustScan)
