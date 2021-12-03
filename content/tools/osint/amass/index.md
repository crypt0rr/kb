---
title : "Amass"
# pre : ' '
description : "In-depth Attack Surface Mapping and Asset Discovery."
date : 2020-03-11T12:58:39+01:00
# hidden : true
# draft : true
weight : 0
# tags : [""]
---

## Amass

In-depth Attack Surface Mapping and Asset Discovery.

### Installation

Snapcraft

```plain
sudo snap install amass
```

Docker

```plain
docker build -t amass https://github.com/OWASP/Amass.git
```

### Usage

```plain
amass intel|enum|viz|track|db [options]
```

### Flags

```plain
Usage: amass intel|enum|viz|track|db [options]

  -h    Show the program usage message
  -help
        Show the program usage message
  -version
        Print the version number of this Amass binary


Subcommands:

    amass intel - Discover targets for enumerations
    amass enum  - Perform enumerations and network mapping
    amass viz   - Visualize enumeration results
    amass track - Track differences between enumerations
    amass db    - Manipulate the Amass graph database

The user's guide can be found here:
https://github.com/OWASP/Amass/blob/master/doc/user_guide.md

An example configuration file can be found here:
https://github.com/OWASP/Amass/blob/master/examples/config.ini
```

### Amass Intel

#### Reverse whois

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
[...SNIP...]
```

#### SSL Certificate Grabbing

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
[...SNIP...]
```

#### Using ASNs (Autonomous System Number)

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

#### Putting Amass intel techniques together recursively

Amass works recursively. It will take the results that it gets from one method, and feed it into the other method. It will continue to do this until no new results are returned. So, for example, we can do this:

```plain
$ amass intel -asn 394161 -whois -d tesla.com
baterias-tesla.com
darsonval-tesla.com
mc-tesla.com
tesla.com
[...SNIP...]
```

### Amass Enum

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

### Amass DB

Show domains in database

```plain
$ amass db -names
www.example.com
example.com
```

Show specific domain from database

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

### URL list

* [Github.com - Amass](https://github.com/OWASP/Amass)
* [Medium.com - Guide to amass how to use amass more effectively](https://medium.com/@hakluke/haklukes-guide-to-amass-how-to-use-amass-more-effectively-for-bug-bounties-7c37570b83f7)
