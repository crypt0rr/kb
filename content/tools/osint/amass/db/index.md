---
title : "DB"
# pre : ' '
description : "You can use this subcommand in order to interact with an Amass graph database, either the default or the one specified with the '-dir' flag."
date : 2023-07-24T11:43:18+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

You can use this subcommand in order to interact with an Amass graph database, either the default or the one specified with the "-dir" flag.

## Installation

Install [Amass]({{< ref "amass" >}}).

## Usage

```plain
amass db [options]
```

## Flags

```plain
  -config string
        Path to the YAML configuration file. Additional details below
  -d value
        Domain names separated by commas (can be used multiple times)
  -demo
        Censor output to make it suitable for demonstrations
  -df string
        Path to a file providing root domain names
  -dir string
        Path to the directory containing the graph database
  -h    Show the program usage message
  -help
        Show the program usage message
  -ip
        Show the IP addresses for discovered names
  -ipv4
        Show the IPv4 addresses for discovered names
  -ipv6
        Show the IPv6 addresses for discovered names
  -names
        Print Just Discovered Names
  -nocolor
        Disable colorized output
  -o string
        Path to the text file containing terminal stdout/stderr
  -show
        Print the results for the enumeration index + domains provided
  -silent
        Disable all output during execution
  -summary
        Print Just ASN Table Summary
```

## Examples

### Show domains in database

```plain
$ amass db -names
www.example.com
example.com
```

### Show specific domain from database

```plain
$ amass db -show -d example.com
Could take a moment while acquiring AS network information
www.example.com
example.com

OWASP Amass v3.10.1                               https://github.com/OWASP/Amass
--------------------------------------------------------------------------------
2 names discovered - scrape: 2
--------------------------------------------------------------------------------
ASN: 3549 - HP-INTERNET-AS Hewlett Packard Europe S.
      ::/0                    2    Subdomain Name(s)
ASN: 15133 - EDGECAST - MCI Communications Services, Inc. d/b/a Verizon Business
      93.184.216.0/24         2    Subdomain Name(s)
```
