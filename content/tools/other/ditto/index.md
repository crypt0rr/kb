---
title : "Ditto"
# pre : ' '
description : "Ditto is a small tool that accepts a domain name as input and generates all its variants for an homograph attack as output, checking which ones are available and which are already registered."
date : 2021-01-29T15:09:32+01:00
# hidden : true
# draft : true
weight : 480
# tags : ['']
---

---

A small tool that accepts a domain name as input and generates all its variants for an homograph attack as output, checking which ones are available and which are already registered.

## Installation

```plain
GO111MODULE=on go get github.com/evilsocket/ditto/cmd/ditto
```

## Usage

```plain
ditto [options]
```

## Flags

```plain
  -available
        Only display available domain names.
  -csv string
        If set ditto will save results to this CSV file.
  -domain string
        Domain name or url. (default "https://www.ice.gov")
  -limit int
        Limit the number of permutations.
  -live
        Only display registered domain names that also resolve to an IP.
  -registered
        Only display registered domain names.
  -string string
        Generate variations of a string.
  -throttle int
        Throttle requests by a given amount of milliseconds. (default 500)
  -tld
        Try different permutations by replacing the TLD.
  -whois
        Show whois information.
  -workers int
        Number of concurrent workers, set to 0 to use one per logical CPU core. (default 1)

```

## Examples

### Transform a string

```plain
$ ditto -string google
ǵoogle (xn--oogle-72b)
ğoogle (xn--oogle-j1a)
ĝoogle (xn--oogle-60a)
ǧoogle (xn--oogle-t0b)
ġoogle (xn--oogle-v1a)
ģoogle (xn--oogle-71a)
ḡoogle (xn--oogle-kf1b)
ǥoogle (xn--oogle-h0b)
ᶃoogle (xn--oogle-hn0b)
google (xn--oogle-dq33a)
```

### Transform a domain

```plain
$ ditto -domain facebook.com
checking 280 variations for 'facebook.com', please wait ...

280 / 280 [--------------------------------------------------------------------------------------------------------------------------------] 100.00% 2 p/s

Ḟacebook.com (xn--acebook-bs3c.com) : available
ḟacebook.com (xn--acebook-js3c.com) registered : ips=165.160.13.20,165.160.15.20
Ƒacebook.com (xn--acebook-o1b.com) : available
ƒacebook.com (xn--acebook-w1b.com) registered : ips=34.102.136.180 names=180.136.102.34.bc.googleusercontent.com.
ᵮacebook.com (xn--acebook-2m2c.com) : available
ᶂacebook.com (xn--acebook-nr2c.com) : available
ꜰacebook.com (xn--acebook-vx2z.com) : available
Ｆacebook.com (xn--acebook-uz93b.com) : available
ｆacebook.com (xn--acebook-5693b.com) : available
fácebook.com (xn--fcebook-hwa.com) registered : ips=165.160.15.20,165.160.13.20
[...]
```

## URL List

- [GitHub.com - Ditto](https://github.com/evilsocket/ditto)
