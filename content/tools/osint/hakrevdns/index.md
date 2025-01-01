---
title : "Hakrevdns"
# pre : ' '
description : "Small, fast tool for performing reverse DNS lookups en masse."
date : 2023-06-04T18:31:02+02:00
# hidden : true
# draft : true
weight : 160
tags : ['OSINT', 'DNS']
---

---

Small, fast, simple tool for performing reverse DNS lookups en masse. You feed it IP addresses, it returns hostnames.

This can be a useful way of finding domains and subdomains belonging to a company from their IP addresses.

## Installation

```plain
go install github.com/hakluke/hakrevdns@latest
```

## Usage

```plain
hakrevdns [OPTIONS]
```

## Flags

```plain
  -t, --threads=           How many threads should be used (default: 8)
  -r, --resolver=          IP of the DNS resolver to use for lookups
  -P, --protocol=[tcp|udp] Protocol to use for lookups (default: udp)
  -p, --port=              Port to bother the specified DNS resolver on (default: 53)
  -d, --domain             Output only domains

Help Options:
  -h, --help               Show this help message
```

## Examples

### Basic Usage with prips

Used in combination with [prips]({{< ref "prips" >}}).

```plain
$ prips 173.0.84.0/24 | hakrevdns 
173.0.84.110    he.paypal.com.
173.0.84.109    twofasapi.paypal.com.
173.0.84.114    www-carrier.paypal.com.
173.0.84.77    twofasapi.paypal.com.
173.0.84.102    pointofsale.paypal.com.
173.0.84.104    slc-a-origin-pointofsale.paypal.com.
173.0.84.111    smsapi.paypal.com.
173.0.84.203    m.paypal.com.
173.0.84.105    prm.paypal.com.
173.0.84.113    mpltapi.paypal.com.
173.0.84.8    ipnpb.paypal.com.
173.0.84.2    active-www.paypal.com.
173.0.84.4    securepayments.paypal.com.
```

### Using non-system DNS

```plain
$ echo "173.0.84.110" | hakrevdns -r 1.1.1.1
173.0.84.110     he.paypal.com.
```

### Only DNS without IP

```plain
$ echo "173.0.84.110" | hakrevdns -d        
he.paypal.com
```

## URL list

- [Github.com - hakrevdns](https://github.com/hakluke/hakrevdns)
