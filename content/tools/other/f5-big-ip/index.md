---
title : "F5-BigIP-decoder"
# pre : ' '
description : "Detecting and decoding F5 BIG IP cookies in bash."
date : 2020-03-10T15:34:44+01:00
# hidden : true
# draft : true
weight : 620
# tags : [""]
---

---

Detecting and decoding F5 BIG IP cookies in bash.

## Installation

```plain
git clone https://github.com/drwetter/F5-BIGIP-Decoder.git
```

```plain
chmod +x f5_bigip_decoder.sh
```

## Usage

```plain
./f5_bigip_decoder.sh '<cookie>'
```

## Examples

```plain
./f5_bigip_decoder.sh TEST

Standard / non-encrypted cookies

   172.18.234.134:50443                          | default IPv4 pool members            | BIGipServer_foo=2263487148.3013.0000
   8.140.74.177:4180                             | default IPv4 pool members            | BIGipServer_bar=185903296.21520.0000
   10.65.98.22:8194                              | default IPv4 pool members            | dr_who=375537930.544.0000
   14.164.0.65:8080                              | IPv4 pool members in routed domain 20 | BIGipServer~lv-us_pub=rd20o00000000000000000000ffff0ea40041o8080
   192.0.2.1:80                                  | IPv4 pool members in routed domain 5 | BIGipServer_ipv4r=rd5o00000000000000000000ffffc0000201o80
   [2001:0112:0000:0000.0000:0000:0000:0011]:80  | IPv6 pool members                    | BIGipServer_ipv6=vi20010112000000000000000000000011.20480
   [2001:0221:0000:0000.0000:0000:0000:0022]:80  | IPv6 pool members in routed domain 3 | drwho_bar6=rd3o20010221000000000000000000000022o80

A total of 7x non-encrypted cookies found


AES encrypted Cookies

   <IP address and port cannot be determined>    | <pool info cannot be determined>     | foobar_LB=!VPyexJn/769hVyb9FVTnmPYOSADbxpddXoz+VcGjdpv7+MdiHxdFdc7OgVGeKLfKY/RlKPU7JJYcHwA=

A total of 1x AES encrypted cookies found


In total:
8 cookies -- 8 F5 BIG IP cookie(s) of which 5 cookie(s) named "BIGipServer"
```

## URL List

- [GitHub.com - F5-BigIP-Decoder](https://github.com/drwetter/F5-BIGIP-Decoder)
