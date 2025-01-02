---
title : "Enum"
# pre : ' '
description : "Amass enum allows you to perform DNS enumeration and mapping of the target to determine the attack surface exposed by organizations."
date : 2023-07-24T11:43:16+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Let's move to Amass enum, which is where most of Amass' powerful capabilities reside. Amass enum allows you to perform DNS enumeration and mapping of the target to determine the attack surface exposed by organizations. The enumeration findings are stored in a graph database, which will be located in Amass' default output folder or the specified output directory with "-dir" flag. This is also the case with other Amass subcommands.

## Installation

Install [Amass]({{< ref "amass" >}}).

## Usage

```plain
amass enum [options] -d DOMAIN
```

## Flags

```plain
  -active
        Attempt zone transfers and certificate name grabs
  -addr value
        IPs and ranges (192.168.1.1-254) separated by commas
  -alts
        Enable generation of altered names
  -asn value
        ASNs separated by commas (can be used multiple times)
  -aw value
        Path to a different wordlist file for alterations
  -awm value
        "hashcat-style" wordlist masks for name alterations
  -bl value
        Blacklist of subdomain names that will not be investigated
  -blf string
        Path to a file providing blacklisted subdomains
  -brute
        Execute brute forcing after searches
  -cidr value
        CIDRs separated by commas (can be used multiple times)
  -config string
        Path to the YAML configuration file. Additional details below
  -d value
        Domain names separated by commas (can be used multiple times)
  -demo
        Censor output to make it suitable for demonstrations
  -df value
        Path to a file providing root domain names
  -dir string
        Path to the directory containing the output files
  -dns-qps int
        Maximum number of DNS queries per second across all resolvers
  -ef string
        Path to a file providing data sources to exclude
  -exclude value
        Data source names separated by commas to be excluded
  -h    Show the program usage message
  -help
        Show the program usage message
  -if string
        Path to a file providing data sources to include
  -iface string
        Provide the network interface to send traffic through
  -include value
        Data source names separated by commas to be included
  -list
        Print the names of all available data sources
  -log string
        Path to the log file where errors will be written
  -max-depth int
        Maximum number of subdomain labels for brute forcing
  -max-dns-queries int
        Deprecated flag to be replaced by dns-qps in version 4.0
  -min-for-recursive int
        Subdomain labels seen before recursive brute forcing (Default: 1) (default 1)
  -nf value
        Path to a file providing already known subdomain names (from other tools/sources)
  -nocolor
        Disable colorized output
  -norecursive
        Turn off recursive brute forcing
  -o string
        Path to the text file containing terminal stdout/stderr
  -oA string
        Path prefix used for naming all output files
  -p value
        Ports separated by commas (default: 80, 443)
  -passive
        Disable DNS resolution of names and dependent features
  -r value
        IP addresses of untrusted DNS resolvers (can be used multiple times)
  -rf value
        Path to a file providing untrusted DNS resolvers
  -rqps int
        Maximum number of DNS queries per second for each untrusted resolver
  -scripts string
        Path to a directory containing ADS scripts
  -silent
        Disable all output during execution
  -timeout int
        Number of minutes to let enumeration run before quitting
  -tr value
        IP addresses of trusted DNS resolvers (can be used multiple times)
  -trf value
        Path to a file providing trusted DNS resolvers
  -trqps int
        Maximum number of DNS queries per second for each trusted resolver
  -v    Output status / debug / troubleshooting info
  -w value
        Path to a different wordlist file for brute forcing
  -wm value
        "hashcat-style" wordlist masks for DNS brute forcing
```

## Examples

```plain
$ amass enum -d example.com
www.example.com
example.com

OWASP Amass v3.10.1                               https://github.com/OWASP/Amass
--------------------------------------------------------------------------------
2 names discovered - cert: 2
--------------------------------------------------------------------------------
ASN: 15133 - EDGECAST - MCI Communications Services, Inc. d/b/a Verizon Business
      2606:2800:220::/48      2    Subdomain Name(s)
      93.184.216.0/24         2    Subdomain Name(s)

The enumeration has finished
Discoveries are being migrated into the local database
```
