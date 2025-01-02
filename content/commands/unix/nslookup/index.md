---
title: "nslookup"
# pre : '<i class="fas fa-code"></i> '
description: "Query Internet name servers interactively."
date: 2020-04-07T09:11:48+02:00
# hidden : true
# draft : true
weight: 690
# tags : ['']
---

---

## Usage

```plain
nslookup [-option] [name | -] [server]
```

## Examples

### A-record lookup

```plain
$ nslookup example.com

Server:     127.0.0.53
Address:    127.0.0.53#53

Non-authoritative answer:
Name:       example.com
Address:    93.184.216.34
Name:       example.com
Address:    2606:2800:220:1:248:1893:25c8:1946
```

### Reverse DNS lookup

```plain
$ nslookup 209.132.183.181

181.183.132.209.in-addr.arpa    name = origin-www2.redhat.com.
```

### Lookup CAA-record

```plain
$ nslookup -type=caa google.com

Server:     127.0.0.53
Address:    127.0.0.53#53

Non-authoritative answer:
google.com  rdata_257 = 0 issue "pki.goog"
```

### Lookup NS-record (nameserver)

```plain
$ nslookup -type=ns google.com
Server:     127.0.0.53
Address:    127.0.0.53#53

Non-authoritative answer:
google.com  nameserver = ns3.google.com.
google.com  nameserver = ns1.google.com.
google.com  nameserver = ns4.google.com.
google.com  nameserver = ns2.google.com.
```

### Lookup using other DNS-server

```plain
$ nslookup example.com 1.1.1.1

Server:     1.1.1.1
Address:    1.1.1.1#53

Non-authoritative answer:
Name:   example.com
Address: 93.184.216.34
Name:   example.com
Address: 2606:2800:220:1:248:1893:25c8:1946
```

### Lookup all records for a domain

```plain
$ nslookup -type=any example.com

Server:     127.0.0.53
Address:    127.0.0.53#53

Non-authoritative answer:
example.com rdata_43 = 31406 8 2 F78CF3344F72137235098ECBBD08947C2C9001C7F6A085A17F518B5D 8F6B916D
example.com rdata_43 = 43547 8 1 B6225AB2CC613E0DCA7962BDC2342EA4F1B56083
example.com rdata_48 = 257 3 8 AwEAAZ0aqu1rJ6orJynrRfNpPmayJZoAx9Ic2/Rl9VQWLMHyjxxem3VU SoNUIFXERQbj0A9Ogp0zDM9YIccKLRd6LmWiDCt7UJQxVdD+heb5Ec4q lqGmyX9MDabkvX2NvMwsUecbYBq8oXeTT9LRmCUt9KUt/WOi6DKECxoG /bWTykrXyBR8elD+SQY43OAVjlWrVltHxgp4/rhBCvRbmdflunaPIgu2 7eE2U4myDSLT8a4A0rB5uHG4PkOa9dIRs9y00M2mWf4lyPee7vi5few2 dbayHXmieGcaAHrx76NGAABeY393xjlmDNcUkF1gpNWUla4fWZbbaYQz A93mLdrng+M=
Name:   example.com
Address: 93.184.216.34
Name:   example.com
Address: 2606:2800:220:1:248:1893:25c8:1946
example.com rdata_43 = 31589 8 2 CDE0D742D6998AA554A92D890F8184C698CFAC8A26FA59875A990C03 E576343C
example.com rdata_43 = 31589 8 1 3490A6806D47F17A34C29E2CE80E8A999FFBE4BE
example.com nameserver = a.iana-servers.net.
example.com rdata_48 = 257 3 8 AwEAAbOFAxl+Lkt0UMglZizKEC1AxUu8zlj65KYatR5wBWMrh18TYzK/ ig6Y1t5YTWCO68bynorpNu9fqNFALX7bVl9/gybA0v0EhF+dgXmoUfRX 7ksMGgBvtfa2/Y9a3klXNLqkTszIQ4PEMVCjtryl19Be9/PkFeC9ITjg MRQsQhmB39eyMYnal+f3bUxKk4fq7cuEU0dbRpue4H/N6jPucXWOwiMA kTJhghqgy+o9FfIp+tR/emKao94/wpVXDcPf5B18j7xz2SvTTxiuqCzC MtsxnikZHcoh1j4g+Y1B8zIMIvrEM+pZGhh/Yuf4RwCBgaYCi9hpiMWV vS4WBzx0/lU=
example.com nameserver = b.iana-servers.net.
example.com rdata_48 = 256 3 8 AwEAAZwFriJkoJNeuGMKKlaveDswD9WMqZw62ibDT6jV8jN5fUSd0IGj N93SJJM2kIxQNFQw5JLO8qHp0KuvVVdgMHo4GANAbR1OG655/0dfYshL obN0jfU+JmiSDpgzI2k2M7imRvHuo/287+t+oHHMb2M+uLADzEeX4yhE 7HpHhZe/
example.com rdata_43 = 31406 8 1 189968811E6EBA862DD6C209F75623D8D9ED9142
example.com rdata_43 = 43547 8 2 615A64233543F66F44D68933625B17497C89A70E858ED76A2145997E DF96A918
example.com rdata_46 = DS 8 2 86400 20200414042324 20200407031324 56311 com. XYGro5Yso+qUMpnVVa9iyybt6JHpAD9dK2vOibAtiC8uEHNDRlcXigH/ XJu9aOsnobe18IYfR5tv+LBnQrdlatxsGOAIf1qkPmSVnqZTEk+oz3aQ mADvnbnlJaiFuMIJp2DLs0/T0slbZHG77p04fNNVikuBYgK+/juOaPHU D0Cav+zpkSBFPSRI6TMKxqUsApOIqm7PxQD9QVHYXqd2uA==
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/nslookup)
