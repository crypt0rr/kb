---
title : "ReconFTW"
# pre : ' '
description : "reconftw description."
date : 2021-11-17T20:52:26+01:00
# hidden : true
# draft : true
weight : 270
# tags : ['']
---

---

ReconFTW automates the entire process of reconnaisance for you. It outperforms the work of subdomain enumeration along with various vulnerability checks and obtaining maximum information about your target.

ReconFTW uses lot of techniques (passive, bruteforce, permutations, certificate transparency, source code scraping, analytics, DNS records...) for subdomain enumeration which helps you getting the maximum and the most interesting subdomains so that you be ahead of the competition.

It also performs various vulnerability checks like XSS, Open Redirects, SSRF, CRLF, LFI, SQLi, SSL tests, SSTI, DNS zone transfers, and much more. Along with these, it performs OSINT techniques, directory fuzzing, dorking, ports scanning, screenshots, nuclei scan on your target.

So, what are you waiting for Go! Go! Go! boom

### Features

### OSINT

- Domain information parser ([domainbigdata](https://domainbigdata.com/))
- Emails addresses and users ([theHarvester](https://github.com/laramies/theHarvester), [emailfinder](https://github.com/Josue87/EmailFinder))
- Password leaks ([pwndb](https://github.com/davidtavarez/pwndb) and [H8mail](https://github.com/khast3x/h8mail))
- Metadata finder ([MetaFinder](https://github.com/Josue87/MetaFinder))
- Google Dorks ([uDork](https://github.com/m3n0sd0n4ld/uDork))
- Github Dorks ([GitDorker](https://github.com/obheda12/GitDorker))

### Subdomains

- Passive ([subfinder](https://github.com/projectdiscovery/subfinder), [assetfinder](https://github.com/tomnomnom/assetfinder), [amass](https://github.com/OWASP/Amass), [findomain](https://github.com/Findomain/Findomain), [crobat](https://github.com/cgboal/sonarsearch), [waybackurls](https://github.com/tomnomnom/waybackurls), [github-subdomains](https://github.com/gwen001/github-subdomains), [Anubis](https://jldc.me), [gauplus](https://github.com/bp0lr/gauplus))
- Certificate transparency ([ctfr](https://github.com/UnaPibaGeek/ctfr), [tls.bufferover](tls.bufferover.run) and [dns.bufferover](dns.bufferover.run)))
- Bruteforce ([puredns](https://github.com/d3mondev/puredns))
- Permutations ([Gotator](https://github.com/Josue87/gotator))
- JS files & Source Code Scraping ([gospider](https://github.com/jaeles-project/gospider))
- DNS Records ([dnsx](https://github.com/projectdiscovery/dnsx))
- Google Analytics ID ([AnalyticsRelationships](https://github.com/Josue87/AnalyticsRelationships))
- Recursive search.
- Subdomains takeover ([nuclei](https://github.com/projectdiscovery/nuclei))
- DNS takeover ([dnstake](https://github.com/pwnesia/dnstake))
- DNS Zone Transfer ([dnsrecon](https://github.com/darkoperator/dnsrecon))

### Hosts

- IP and subdomains WAF checker ([cf-check](https://github.com/dwisiswant0/cf-check) and [wafw00f](https://github.com/EnableSecurity/wafw00f))
- Port Scanner (Active with [nmap](https://github.com/nmap/nmap) and passive with [shodan-cli](https://cli.shodan.io/), Subdomains IP resolution with[resolveDomains](https://github.com/Josue87/resolveDomains))
- Port services vulnerability checks ([searchsploit](https://github.com/offensive-security/exploitdb))
- Password spraying ([brutespray](https://github.com/x90skysn3k/brutespray))
- Cloud providers check ([clouddetect](https://github.com/99designs/clouddetect))

### Webs

- Web Prober ([httpx](https://github.com/projectdiscovery/httpx) and [unimap](https://github.com/Edu4rdSHL/unimap))
- Web screenshot ([webscreenshot](https://github.com/maaaaz/webscreenshot) or [gowitness](https://github.com/sensepost/gowitness))
- Web templates scanner ([nuclei](https://github.com/projectdiscovery/nuclei) and [nuclei geeknik](https://github.com/geeknik/the-nuclei-templates.git))
- Url extraction ([waybackurls](https://github.com/tomnomnom/waybackurls), [gauplus](https://github.com/bp0lr/gauplus), [gospider](https://github.com/jaeles-project/gospider), [github-endpoints](https://gist.github.com/six2dez/d1d516b606557526e9a78d7dd49cacd3) and [JSA](https://github.com/w9w/JSA))
- URLPatterns Search ([gf](https://github.com/tomnomnom/gf) and [gf-patterns](https://github.com/1ndianl33t/Gf-Patterns))
- XSS ([dalfox](https://github.com/hahwul/dalfox))
- Open redirect ([Oralyzer](https://github.com/r0075h3ll/Oralyzer))
- SSRF (headers [interactsh](https://github.com/projectdiscovery/interactsh) and param values with [ffuf](https://github.com/ffuf/ffuf))
- CRLF ([crlfuzz](https://github.com/dwisiswant0/crlfuzz))
- Favicon Real IP ([fav-up](https://github.com/pielco11/fav-up))
- Javascript analysis ([subjs](https://github.com/lc/subjs), [JSA](https://github.com/w9w/JSA), [LinkFinder](https://github.com/GerbenJavado/LinkFinder), [getjswords](https://github.com/m4ll0k/BBTz))
- Fuzzing ([ffuf](https://github.com/ffuf/ffuf))
- Cors ([Corsy](https://github.com/s0md3v/Corsy))
- LFI Checks ([ffuf](https://github.com/ffuf/ffuf))
- SQLi Check ([SQLMap](https://github.com/sqlmapproject/sqlmap))
- SSTI ([ffuf](https://github.com/ffuf/ffuf))
- CMS Scanner ([CMSeeK](https://github.com/Tuhinshubhra/CMSeeK))
- SSL tests ([testssl](https://github.com/drwetter/testssl.sh))
- Broken Links Checker ([gospider](https://github.com/jaeles-project/gospider))
- S3 bucket finder ([S3Scanner](https://github.com/sa7mon/S3Scanner))
- Prototype Pollution ([ppfuzz](https://github.com/dwisiswant0/ppfuzz))
- URL sorting by extension
- Wordlist generation
- Passwords dictionary creation ([pydictor](https://github.com/LandGrey/pydictor))

### Extras

- Multithread ([Interlace](https://github.com/codingo/Interlace))
- Custom resolvers generated list ([dnsvalidator](https://github.com/vortexau/dnsvalidator))
- Docker container included and [DockerHub](https://hub.docker.com/r/six2dez/reconftw) integration
- Allows IP/CIDR as target
- Resume the scan from last performed step
- Custom output folder option
- All in one installer/updater script compatible with most distros
- Diff support for continuous running (cron mode)
- Support for targets with multiple domains
- Raspberry Pi/ARM support
- 6 modes (recon, passive, subdomains, web, osint and all)
- Out of Scope Support
- Notification system with Slack, Discord and Telegram ([notify](https://github.com/projectdiscovery/notify)) and sending zipped results support

## Installation

> You can check out our wiki for the installation guide [Installation Guide](https://github.com/six2dez/reconftw/wiki/0.-Installation-Guide).

Requires [Golang](https://golang.org/dl/) > 1.15.0+ installed and paths correctly set ($GOPATH, $GOROOT)

```plain
git clone https://github.com/six2dez/reconftw
cd reconftw/
./install.sh
./reconftw.sh -d target.com -r
```

### Config file

> A detailed explaintion of config file can be found here [Configuration file](https://github.com/six2dez/reconftw/wiki/3.-Configuration-file)

- Through ```reconftw.cfg``` file the whole execution of the tool can be controlled.
- Hunters can set various scanning modes, execution preferences, tools, config files, APIs/TOKENS, personalized wordlists and much more.

## Usage

```plain
./reconftw.sh -d <domain> -p
```

## Flags

### Target Options

- Your Target could be a root domain or a subdomain.
- It's mandatory to specify a target for a scan.
- Also reconFTW has ability to import a list of targets from a text file. (The targets must be specified one on each line)

| Subcommand | Description                                                                            | Example                                     |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| -d         | Single target domain                                                                   | `./reconftw.sh -d target.com -r`            |
| -l         | Specify a list of target domains (targets.txt), reconFTW runs one time for each target | `./reconftw.sh -l targets.txt -r`           |
| -m         | For one target with multiple domains (tesla.com, teslamotors.com...)                   | `./reconftw.sh -m target -l domains.txt -r` |
| -i         | Force include subdomain list (in.txt)                                                  | `./reconftw.sh -d target.com -i in.txt -r`  |
| -x         | Out of scope subdomain list (oos.txt)                                                  | `./reconftw.sh -d target.com -x oos.txt -r` |

### Mode Options

- reconFTW supports several mode options. It's best preferred to use -r. But depending on your needs you can select the required mode.
- Changes in the mode options results in varying execution time of the script.

| Subcommand | Description                                              | Example                              |
| ---------- | -------------------------------------------------------- | ------------------------------------ |
| -r         | Recon - Full recon process (only recon without attacks)  | `./reconftw.sh -d target.com -r`     |
| -s         | Subdomains - Search subdomains, check tko and web probe  | `./reconftw.sh -d target.com -s`     |
| -p         | Passive - Performs only passive steps                    | `./reconftw.sh -d target.com -p`     |
| -w         | Web - Just web checks from list provided                 | `./reconftw.sh -l targetlist.txt -w` |
| -a         | All - Perform all checks and exploitations (a.k.a. YOLO) | `./reconftw.sh -d target.com -a`     |
| -n         | Osint - Just checks for public intel info                | `./reconftw.sh -d target.com -n`     |
| -h         | Help - Show this help                                    | `./reconftw.sh -h`                   |

### General Options

- Some checks/tasks of reconFTW take a longer time and generate a lot of web traffic.
- You can enable these tasks by using the following options.
- The --deep flag is a VPS intended option.

| Subcommand      | Description                                          | Example                                             |
| --------------- | ---------------------------------------------------- | --------------------------------------------------- |
| --deep          | Deep scan (Enable some slow options for deeper scan) | `./reconftw.sh -d target.com [mode] --deep`         |
| -v              | VPS - Run reconftw with Axiom distributed VPS fleet  | `./reconftw.sh -d target.com [mode] -v`             |
| -f confile_file | Alternate reconftw.cfg file                          | `./reconftw.sh -d target.com [mode] -f config_file` |

### Output Options

- Supports option for user-defined output directory of the results.

| Subcommand | Description              | Example                                                |
| ---------- | ------------------------ | ------------------------------------------------------ |
| -o         | Define the output folder | `./reconftw.sh -d target.com -r -o /output/directory/` |

## Examples

To perform a full recon on single target

```bash
./reconftw.sh -d target.com -r
```

To perform a full recon on a list of targets

```bash
./reconftw.sh -l sites.txt -r -o /output/directory/
```

Perform full recon with more time intense tasks *(VPS intended only)*

```bash
./reconftw.sh -d target.com -r --deep -o /output/directory/
```

Perform recon in a multi domain target

```bash
./reconftw.sh -m company -l domains_list.txt -r
```

Perform recon with axiom integration

```bash
./reconftw.sh -d target.com -r -v
```

 Perform all steps (whole recon + all attacks) a.k.a. YOLO mode

```bash
./reconftw.sh -d target.com -a
```

Show help section

```bash
./reconftw.sh -h
```

## URL List

- [Github.com - reconFTW](https://github.com/six2dez/reconftw/)
