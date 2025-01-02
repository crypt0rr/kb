---
title : "DNSrecon"
# pre : ' '
description : "DNS Enumeration and Scanning Tool."
date : 2020-04-14T12:30:49+02:00
# hidden : true
# draft : true
weight : 110
tags : ['OSINT', 'DNS', 'Subdomain', 'DNS Zone Transfer']
---

---

DNS Enumeration and Scanning Tool.

## Installation

```plain
git clone https://github.com/darkoperator/dnsrecon.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
dnsrecon.py [-h] [-d DOMAIN] [-n NS_SERVER] [-r RANGE] [-D DICTIONARY] [-f] [-a] [-s] [-b] [-y] [-k] [-w] [-z] [--threads THREADS] [--lifetime LIFETIME] [--tcp] [--db DB] [-x XML] [-c CSV] [-j JSON] [--iw]
                   [--disable_check_recursion] [--disable_check_bindversion] [-V] [-v] [-t TYPE]
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Target domain.
  -n NS_SERVER, --name_server NS_SERVER
                        Domain server to use. If none is given, the SOA of the target will be used. Multiple servers can be specified using a comma separated list.
  -r RANGE, --range RANGE
                        IP range for reverse lookup brute force in formats   (first-last) or in (range/bitmask).
  -D DICTIONARY, --dictionary DICTIONARY
                        Dictionary file of subdomain and hostnames to use for brute force.
  -f                    Filter out of brute force domain lookup, records that resolve to the wildcard defined IP address when saving records.
  -a                    Perform AXFR with standard enumeration.
  -s                    Perform a reverse lookup of IPv4 ranges in the SPF record with standard enumeration.
  -b                    Perform Bing enumeration with standard enumeration.
  -y                    Perform Yandex enumeration with standard enumeration.
  -k                    Perform crt.sh enumeration with standard enumeration.
  -w                    Perform deep whois record analysis and reverse lookup of IP ranges found through Whois when doing a standard enumeration.
  -z                    Performs a DNSSEC zone walk with standard enumeration.
  --threads THREADS     Number of threads to use in reverse lookups, forward lookups, brute force and SRV record enumeration.
  --lifetime LIFETIME   Time to wait for a server to respond to a query. default is 3.0
  --tcp                 Use TCP protocol to make queries.
  --db DB               SQLite 3 file to save found records.
  -x XML, --xml XML     XML file to save found records.
  -c CSV, --csv CSV     Save output to a comma separated value file.
  -j JSON, --json JSON  save output to a JSON file.
  --iw                  Continue brute forcing a domain even if a wildcard record is discovered.
  --disable_check_recursion
                        Disables check for recursion on name servers
  --disable_check_bindversion
                        Disables check for BIND version on name servers
  -V, --version         Show DNSrecon version
  -v, --verbose         Enable verbose
  -t TYPE, --type TYPE  Type of enumeration to perform.
                        Possible types:
                            std:      SOA, NS, A, AAAA, MX and SRV.
                            rvl:      Reverse lookup of a given CIDR or IP range.
                            brt:      Brute force domains and hosts using a given dictionary.
                            srv:      SRV records.
                            axfr:     Test all NS servers for a zone transfer.
                            bing:     Perform Bing search for subdomains and hosts.
                            yand:     Perform Yandex search for subdomains and hosts.
                            crt:      Perform crt.sh search for subdomains and hosts.
                            snoop:    Perform cache snooping against all NS servers for a given domain, testing
                                      all with file containing the domains, file given with -D option.
                        
                            tld:      Remove the TLD of given domain and test against all TLDs registered in IANA.
                            zonewalk: Perform a DNSSEC zone walk using NSEC records.
```

## Examples

### Standard DNS recon

```plain
$ python3 dnsrecon.py -d example.com -t std

[*] Performing General Enumeration of Domain:example.com
[-] All nameservers failed to answer the DNSSEC query for example.com
[*]      SOA ns.icann.org 199.4.138.53
[*]      NS a.iana-servers.net 199.43.135.53
[*]      NS a.iana-servers.net 2001:500:8f::53
[*]      NS b.iana-servers.net 199.43.133.53
[*]      NS b.iana-servers.net 2001:500:8d::53
[*]      A example.com 93.184.216.34
[*]      AAAA example.com 2606:2800:220:1:248:1893:25c8:1946
[*]      TXT example.com v=spf1 -all
[*] Enumerating SRV Records
[-] No SRV Records Found for example.com
[+] 0 Records Found
```

### DNS Zone Transfer

```plain
$ python3 dnsrecon.py -d megacorpone.com -t axfr
[*] Checking for Zone Transfer for megacorpone.com name servers
[*] Resolving SOA Record
[+]      SOA ns1.megacorpone.com 51.79.37.18
[*] Resolving NS Records
[*] NS Servers found:
[+]      NS ns1.megacorpone.com 51.79.37.18
[+]      NS ns3.megacorpone.com 66.70.207.180
[+]      NS ns2.megacorpone.com 51.222.39.63
[*] Removing any duplicate NS server IP Addresses...
[*]  
[*] Trying NS server 66.70.207.180
[+] 66.70.207.180 Has port 53 TCP Open
[-] Zone Transfer Failed (Zone transfer error: REFUSED)
[*]  
[*] Trying NS server 51.222.39.63
[+] 51.222.39.63 Has port 53 TCP Open
[+] Zone Transfer was successful!!
[*]      NS ns1.megacorpone.com 51.79.37.18
[*]      NS ns2.megacorpone.com 51.222.39.63
[*]      NS ns3.megacorpone.com 66.70.207.180
[*]      TXT Try Harder
[*]      TXT google-site-verification=U7B_b0HNeBtY4qYGQZNsEYXfCJ32hMNV3GtC0wWq5pA
[*]      MX @.megacorpone.com fb.mail.gandi.net 217.70.178.216
[*]      MX @.megacorpone.com fb.mail.gandi.net 217.70.178.217
[*]      MX @.megacorpone.com fb.mail.gandi.net 217.70.178.215
[*]      MX @.megacorpone.com spool.mail.gandi.net 217.70.178.1
[*]      A admin.megacorpone.com 51.222.169.208
[*]      A beta.megacorpone.com 51.222.169.209
[*]      A fs1.megacorpone.com 51.222.169.210
[*]      A intranet.megacorpone.com 51.222.169.211
[*]      A mail.megacorpone.com 51.222.169.212
[*]      A mail2.megacorpone.com 51.222.169.213
[*]      A ns1.megacorpone.com 51.79.37.18
[*]      A ns2.megacorpone.com 51.222.39.63
[*]      A ns3.megacorpone.com 66.70.207.180
[*]      A router.megacorpone.com 51.222.169.214
[*]      A siem.megacorpone.com 51.222.169.215
[*]      A snmp.megacorpone.com 51.222.169.216
[*]      A support.megacorpone.com 51.222.169.218
[*]      A syslog.megacorpone.com 51.222.169.217
[*]      A test.megacorpone.com 51.222.169.219
[*]      A vpn.megacorpone.com 51.222.169.220
[*]      A www.megacorpone.com 149.56.244.87
[*]      A www2.megacorpone.com 149.56.244.87
[*]  
[*] Trying NS server 51.79.37.18
[+] 51.79.37.18 Has port 53 TCP Open
[-] Zone Transfer Failed (Zone transfer error: REFUSED)
```

### DNS BruteForce

Discovery of subdomains via brute force.

Download your desired list to use as input, for example at [Github.com - SecLists](https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS)

```plain
$ dnsrecon -d megacorpone.com -D ~/list.txt -t brt
[*] Performing host and subdomain brute force against megacorpone.com
[*]     A www.megacorpone.com 38.100.193.76
[*]     A mail.megacorpone.com 38.100.193.84
[*]     A router.megacorpone.com 38.100.193.71
[+] 3 Records Found
```

## URL List

- [GitHub.com - DNSrecon](https://github.com/darkoperator/dnsrecon)
