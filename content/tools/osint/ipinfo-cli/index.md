---
title : "ipinfo-cli"
# pre : ' '
description : "Official Command Line Interface for the IPinfo API (IP geolocation and other types of IP data). The trusted source for IP address data. Accurate IP address data that keeps pace with secure, specific, and forward-looking use cases."
date : 2022-07-16T19:21:58+02:00
# hidden : true
# draft : true
weight : 170
# tags : ['']
---

---

This is the official CLI for the [IPinfo.io](https://ipinfo.io/) IP address API, allowing you to:

- Look up IP details in bulk or one-by-one.
- Look up ASN details.
- Summarize the details of up to 1000 IPs at a time.
- Open a map of IP locations for any set of IPs.
- Filter IPv4 & IPv6 addresses from any input.
- Print out IP lists for any CIDR or IP range.
- And more!

## Installation

### Ubuntu

PPA:

```plain
sudo add-apt-repository ppa:ipinfo/ppa
sudo apt update
sudo apt install ipinfo
```

Source:

```plain
curl -Ls https://github.com/ipinfo/cli/releases/download/ipinfo-2.8.1/deb.sh | sh
```

### Brew

```plain
brew install ipinfo-cli
```

## Usage

```plain
ipinfo <cmd> [<opts>] [<args>]
```

### Login

If you have a token, log in with it first. You can continue without a token, but there will be limited data output and some features (like bulk lookups) will not be available. Get your token for free at <https://ipinfo.io/signup>.

```plain
ipinfo login
```

## Flags

```plain
Commands:
  <ip>        look up details for an IP address, e.g. 8.8.8.8.
  <asn>       look up details for an ASN, e.g. AS123 or as123.
  myip        get details for your IP.
  bulk        get details for multiple IPs in bulk.
  summarize   get summarized data for a group of IPs.
  map         open a URL to a map showing the locations of a group of IPs.
  prips       print IP list from CIDR or range.
  grepip      grep for IPs matching criteria from any source.
  cidr2range  convert CIDRs to IP ranges.
  cidr2ip     convert CIDRs to individual IPs within those CIDRs.
  range2cidr  convert IP ranges to CIDRs.
  range2ip    convert IP ranges to individual IPs within those ranges.
  randip      Generates random IPs.
  cache       manage the cache.
  config      manage the config.
  login       save an API token session.
  logout      delete your current API token session.
  completion  install or output shell auto-completion script.
  version     show current version.

Options:
  General:
    --token <tok>, -t <tok>
      use <tok> as API token.
    --nocache
      do not use the cache.
    --version, -v
      show binary release number.
    --help, -h
      show help.

  Outputs:
    --field <field>, -f <field>
      lookup only specific fields in the output.
      field names correspond to JSON keys, e.g. 'hostname' or 'company.type'.
      multiple field names must be separated by commas.
    --nocolor
      disable colored output.

  Formats:
    --pretty, -p
      output pretty format.
    --json, -j
      output JSON format.
    --csv, -c
      output CSV format.
```

## Examples

**Note** Don't forget to login unless you want no detail.

```plain
ipinfo 1.1.1.1 
Core
- IP           1.1.1.1
- Anycast      true
- Hostname     one.one.one.one
- City         Los Angeles
- Region       California
- Country      United States (US)
- Location     34.0522,-118.2437
- Organization AS13335 Cloudflare, Inc.
- Postal       90076
- Timezone     America/Los_Angeles
```

## URL List

- [ipinfo.io](https://ipinfo.io/)
- [Github.com - ipinfo-cli](https://github.com/ipinfo/cli)
- [Formulae.brew.sh - ipinfo-cli](https://formulae.brew.sh/formula/ipinfo-cli#default)
