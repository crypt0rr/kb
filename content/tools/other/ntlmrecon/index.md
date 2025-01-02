---
title : "NTLMRecon"
# pre : ' '
description : "A fast and flexible NTLM reconnaissance tool without external dependencies. Useful to find out information about NTLM endpoints when working with a large set of potential IP addresses and domains."
date : 2021-06-03T11:47:01+02:00
# hidden : true
# draft : true
weight : 1240
tags : ['Other', 'NTLM']
---

---

A fast and flexible NTLM reconnaissance tool without external dependencies. Useful to find out information about NTLM endpoints when working with a large set of potential IP addresses and domains.

## Installation

```plain
git clone https://github.com/pwnfoo/NTLMRecon.git
cd NTLMRecon
sudo python3 setup.py install
```

## Usage

```plain
ntlmrecon [-h] [--input INPUT | --infile INFILE] [--wordlist WORDLIST] [--threads THREADS] [--output-type] [--outfile OUTFILE] [--random-user-agent] [--force-all] [--shuffle] [-f]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  --input INPUT, -i INPUT
                        Pass input as an IP address, URL or CIDR to enumerate NTLM endpoints
  --infile INFILE, -I INFILE
                        Pass input from a local file
  --wordlist WORDLIST   Override the internal wordlist with a custom wordlist
  --threads THREADS     Set number of threads (Default: 10)
  --output-type, -o     Set output type. JSON (TODO) and CSV supported (Default: CSV)
  --outfile OUTFILE, -O OUTFILE
                        Set output file name (Default: ntlmrecon.csv)
  --random-user-agent   TODO: Randomize user agents when sending requests (Default: False)
  --force-all           Force enumerate all endpoints even if a valid endpoint is found for a URL (Default : False)
  --shuffle             Break order of the input files
  -f, --force           Force replace output file if it already exists
```

## Examples

```plain
$ ntlmrecon --input https://example.com

         _   _ _____ _     ___  _________                     
        | \ | |_   _| |    |  \/  || ___ \                    
        |  \| | | | | |    | .  . || |_/ /___  ___ ___  _ __  
        | . ` | | | | |    | |\/| ||    // _ \/ __/ _ \| '_ \ 
        | |\  | | | | |____| |  | || |\ \  __/ (_| (_) | | | |
        \_| \_/ \_/ \_____/\_|  |_/\_| \_\___|\___\___/|_| |_| - @pwnfoo

             v.0.4 beta - Y'all still exposing NTLM endpoints?

 Bug Reports, Feature Requests : https://git.io/JIR5z


[+] Brute-forcing 49 endpoints on https://example.com
[+] https://example.com/EWS/ has NTLM authentication enabled!
[+] https://example.com/OAB/ has NTLM authentication enabled!
[+] https://example.com/Microsoft-Server-ActiveSync/ requires authentication but the method was found to be Basic realm="example.com"
[+] https://example.com/PowerShell/ requires authentication but the method was found to be Kerberos
[+] https://example.com/Rpc/ requires authentication but the method was found to be Basic realm="example.com"
[+] Output for https://example.com saved to ntlmrecon.csv
```

```plain
$ cat ntlmrecon.csv                      
URL,AD Domain Name,Server Name,DNS Domain Name,FQDN,Parent DNS Domain
https://example.com/EWS/,EXAMPLE,EX01,EXAMPLE.COM,EX01.EXAMPLE.COM,EXAMPLE.COM
https://example.com/OAB/,EXAMPLE,EX01,EXAMPLE.COM,EX01.EXAMPLE.COM,EXAMPLE.COM
```

## URL List

- [Github.com - NTLMRecon](https://github.com/pwnfoo/NTLMRecon)
