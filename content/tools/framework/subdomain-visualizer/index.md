---
title : "Subdomain Visualizer"
# pre : ' '
description : "Script that visualizes subdomains for the domain you want."
date : 2021-03-09T13:11:38+01:00
# hidden : true
# draft : true
weight : 400
# tags : ['']
---

---

Script that visualizes subdomains for the domain you want.

## Installation

```plain
git clone https://github.com/crypt0rr/subdomain-visualizer.git
```

## Usage

```plain
chmod +x subdomain-visualizer.sh
./subdomain-visualizer.sh
```

## Examples

```plain
$ ./subdomain-visualizer.sh 
Subdomain-visualizer v0.3 by crypt0rr

For educational purposes only! Do not use against domains you don't own / allowed to scan.

Checking requirements...
[+] aquatone is installed
[+] crobat is installed
[+] nmap is installed
[+] Internet connection up


Folder recon-folder will be created, this will contain results
Please enter a domain to harvest (e.g. example.com): example.com
1. SonarSearch Crobat
2. SecurityTrails.com (APIKEY required)
3. You own file containing subdomains
What source should be used for subdomains: 1
Total subdomains found by crobat: 2

Running nmap agains found subdomains
Starting Nmap 7.80 ( https://nmap.org ) at 2021-03-09 15:15 CET

[...]
```

## URL List

- [Github.com - Subdomain Visualizer](https://github.com/crypt0rr/subdomain-visualizer)
