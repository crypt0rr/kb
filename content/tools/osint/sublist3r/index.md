---
title : "Sublist3r"
# pre : ' '
description : "Python tool designed to enumerate subdomains of websites using OSINT."
date : 2021-01-27T12:57:59+01:00
# hidden : true
# draft : true
weight : 340
tags : ['OSINT', 'DNS']
---

---

Python tool designed to enumerate subdomains of websites using OSINT.

## Installation

```plain
git clone https://github.com/aboul3la/Sublist3r.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
usage: sublist3r.py [-h] -d DOMAIN [-b [BRUTEFORCE]] [-p PORTS] [-v [VERBOSE]]
                    [-t THREADS] [-e ENGINES] [-o OUTPUT] [-n]
```

## Flags

```plain
OPTIONS:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Domain name to enumerate it's subdomains
  -b [BRUTEFORCE], --bruteforce [BRUTEFORCE]
                        Enable the subbrute bruteforce module
  -p PORTS, --ports PORTS
                        Scan the found subdomains against specified tcp ports
  -v [VERBOSE], --verbose [VERBOSE]
                        Enable Verbosity and display results in realtime
  -t THREADS, --threads THREADS
                        Number of threads to use for subbrute bruteforce
  -e ENGINES, --engines ENGINES
                        Specify a comma-separated list of search engines
  -o OUTPUT, --output OUTPUT
                        Save the results to text file
  -n, --no-color        Output without color

Example: python ./sublist3r.py -d google.com
```

## Examples

```plain
$ ./sublist3r.py -d example.com

                 ____        _     _ _     _   _____
                / ___| _   _| |__ | (_)___| |_|___ / _ __
                \___ \| | | | '_ \| | / __| __| |_ \| '__|
                 ___) | |_| | |_) | | \__ \ |_ ___) | |
                |____/ \__,_|_.__/|_|_|___/\__|____/|_|

                # Coded By Ahmed Aboul-Ela - @aboul3la
    
[-] Enumerating subdomains now for example.com
[-] Searching now in Baidu..
[-] Searching now in Yahoo..
[-] Searching now in Google..
[-] Searching now in Bing..
[-] Searching now in Ask..
[-] Searching now in Netcraft..
[-] Searching now in DNSdumpster..
[-] Searching now in Virustotal..
[-] Searching now in ThreatCrowd..
[-] Searching now in SSL Certificates..
[-] Searching now in PassiveDNS..
[!] Error: Virustotal probably now is blocking our requests
[-] Total Unique Subdomains Found: 16267
www.example.com
*.example.com
servers2.0.example.com
servers21.0.example.com
sabelfeld.00.example.com
testovyy1.yashchik.00.example.com
tread.000001.example.com
001.example.com
007.example.com
nadyia.00745.example.com
lesha.ermakov.01.example.com
[...REDACTED...]
```

## URL List

- [Github.com - Sublist3r](https://github.com/aboul3la/Sublist3r)
