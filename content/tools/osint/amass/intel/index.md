---
title : "Intel"
# pre : ' '
description : "The Amass intel subcommand, or module if you want, can aid with collecting open source intelligence on the organization and allow you to find further root domain names associated with the organization."
date : 2023-07-24T11:38:48+02:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

The Amass intel subcommand, or module if you want, can aid with collecting open source intelligence on the organization and allow you to find further root domain names associated with the organization.

## Installation

Install [Amass]({{< ref "amass" >}}).

## Usage

```plain
amass intel [options] [-whois -d DOMAIN] [-addr ADDR -asn ASN -cidr CIDR]
```

## Flags

```plain
  -active
        Attempt certificate name grabs
  -addr value
        IPs and ranges (192.168.1.1-254) separated by commas
  -asn value
        ASNs separated by commas (can be used multiple times)
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
  -ef string
        Path to a file providing data sources to exclude
  -exclude value
        Data source names separated by commas to be excluded
  -h    Show the program usage message
  -help
        Show the program usage message
  -if string
        Path to a file providing data sources to include
  -include value
        Data source names separated by commas to be included
  -ip
        Show the IP addresses for discovered names
  -ipv4
        Show the IPv4 addresses for discovered names
  -ipv6
        Show the IPv6 addresses for discovered names
  -list
        Print additional information
  -log string
        Path to the log file where errors will be written
  -max-dns-queries int
        Maximum number of concurrent DNS queries
  -o string
        Path to the text file containing terminal stdout/stderr
  -org string
        Search string provided against AS description information
  -p value
        Ports separated by commas (default: 80, 443)
  -r value
        IP addresses of preferred DNS resolvers (can be used multiple times)
  -rf value
        Path to a file providing preferred DNS resolvers
  -timeout int
        Number of minutes to let enumeration run before quitting
  -v    Output status / debug / troubleshooting info
  -whois
        All provided domains are run through reverse whois
```

## Examples

### Reverse whois

This method is invoked using the -whois flag. Essentially it takes the details from the specified domain's whois records, and then tries to find other domains with similar whois records.

```plain
$ amass intel -d owasp.org -whois
appseceurope.com
appseceurope.org
appsecil.com
appseclatam.org
lascon.org
owaspalooza.com
appsecasia.org
appsecla.com
appsecusa.org
onlinedistancelearningschools.com
rikarich.com
appsecasiapacific.com
appsecna.org
appsecnorthamerica.org
[...]
```

### SSL Certificate Grabbing

If you feed IP addresses to Amass and give it the -active flag, it pulls the SSL certificate from every IP address within the IP range and then spits back the domain that the SSL cert is associated with. For example, running it on a well known Paypal-owned CIDR range:

```plain
$ amass intel -active -cidr 173.0.84.0/24  
paypal.com
gejscript-paypal.com
paypal.cl
paypal.co.uk
paypal.es
venmo-experience.com
paypal.co.nz
paypalobjects.com
paypal.ca
paypal.at
[...]
```

### Using ASNs (Autonomous System Number)

```plain
$ amass intel -org "Tesla"
8911, TESLATEL-AS
50313, TESLATEL-AS
394161, TESLA - Tesla
```

I don't know what TESLATEL-AS is, but that last one looks like it is probably Tesla (the Elon Musk owned Electric Car company). Now we can use that ASN number (394161) to get some more domains, like this:

```plain
$ amass intel -active -asn 394161
zip.zayo.com
euvpn.teslamotors.com
tesla.com
solarcity.com
```

I'm not sure about zip.zayo.com, but the other domains look like they're probably owned by Tesla. So now we have 4 root domains to investigate. Nice!

### Putting Amass intel techniques together recursively

Amass works recursively. It will take the results that it gets from one method, and feed it into the other method. It will continue to do this until no new results are returned. So, for example, we can do this:

```plain
$ amass intel -asn 394161 -whois -d tesla.com
baterias-tesla.com
darsonval-tesla.com
mc-tesla.com
tesla.com
[...]
```
