---
title : "DNSrecon"
# pre : ' '
description : "DNS Enumeration and Scanning Tool."
date : 2020-04-14T12:30:49+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## DNSrecon

DNS Enumeration and Scanning Tool.

### Installation

```plain
sudo apt install dnsrecon
```

### Usage

```plain
dnsrecon <options>
```

### Flags

```plain
Version: 0.10.0

Options:
   -h, --help                   Show this help message and exit.
   -d, --domain      <domain>   Target domain.
   -r, --range       <range>    IP range for reverse lookup brute force in formats (first-last) or in (range/bitmask).
   -n, --name_server <name>     Domain server to use. If none is given, the SOA of the target will be used.
                                Multiple servers can be specified using a comma separated list.
   -D, --dictionary  <file>     Dictionary file of subdomain and hostnames to use for brute force.
   -f                           Filter out of brute force domain lookup, records that resolve to the wildcard defined
                                IP address when saving records.
   -t, --type        <types>    Type of enumeration to perform (comma separated):
                                std       SOA, NS, A, AAAA, MX and SRV.
                                rvl       Reverse lookup of a given CIDR or IP range.
                                brt       Brute force domains and hosts using a given dictionary.
                                srv       SRV records.
                                axfr      Test all NS servers for a zone transfer.
                                goo       Perform Google search for subdomains and hosts.
                                bing      Perform Google search for subdomains and hosts.
                                crt       Perform crt.sh search for subdomains and hosts.
                                snoop     Perform cache snooping against all NS servers for a given domain, testing
                                          all with file containing the domains, file given with -D option.
                                tld       Remove the TLD of given domain and test against all TLDs registered in IANA.
                                zonewalk  Perform a DNSSEC zone walk using NSEC records.
   -a                           Perform AXFR with standard enumeration.
   -s                           Perform a reverse lookup of IPv4 ranges in the SPF record with standard enumeration.
   -g                           Perform Google enumeration with standard enumeration.
   -b                           Perform Bing enumeration with standard enumeration.
   -k                           Perform crt.sh enumeration with standard enumeration.
   -w                           Perform deep whois record analysis and reverse lookup of IP ranges found through
                                Whois when doing a standard enumeration.
   -z                           Performs a DNSSEC zone walk with standard enumeration.
   --threads         <number>   Number of threads to use in reverse lookups, forward lookups, brute force and SRV
                                record enumeration.
   --tcp                        Force using TCP protocol when making DNS queries.
   --lifetime        <number>   Time to wait for a server to response to a query.
   --db              <file>     SQLite 3 file to save found records.
   --xml             <file>     XML file to save found records.
   --iw                         Continue brute forcing a domain even if a wildcard records are discovered.
   --disable_check_recursion    Disables check for recursion on name servers.
   --disable_check_bindversion  Disables check for BIND version on name servers.
   -c, --csv         <file>     Comma separated value file.
   -j, --json        <file>     JSON file.
   -v                           Show attempts in the brute force modes.
```

### Examples

#### Standard DNS recon

```plain
$ dnsrecon -d example.com -t std

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

### URL list

* [GitHub.com - DNSrecon](https://github.com/darkoperator/dnsrecon)
