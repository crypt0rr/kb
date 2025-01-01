---
title : "ADIDNSdump"
# pre : ' '
description : "Query/modify DNS records for Active Directory integrated DNS via LDAP."
date : 2020-07-24T12:57:59+02:00
#  hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

Query/modify DNS records for Active Directory integrated DNS via LDAP.

## Installation

```plain
git clone https://github.com/dirkjanm/adidnsdump.git
cd adidnsdump
pip install .
```

## Usage

```plain
adidnsdump [-h] [-u USERNAME] [-p PASSWORD] [--forest] [--legacy] [--zone ZONE] [--print-zones] [-v] [-d] [-r] [--dns-tcp]
            [--include-tombstoned] [--ssl] [--referralhosts] [--dcfilter] [--sslprotocol SSLPROTOCOL]
            HOSTNAME
```

## Flags

```plain
Query/modify DNS records for Active Directory integrated DNS via LDAP

Required options:
  HOSTNAME              Hostname/ip or ldap://host:port connection string to connect to

Main options:
  -h, --help            show this help message and exit
  -u USERNAME, --user USERNAME
                        DOMAIN\username for authentication.
  -p PASSWORD, --password PASSWORD
                        Password or LM:NTLM hash, will prompt if not specified
  --forest              Search the ForestDnsZones instead of DomainDnsZones
  --legacy              Search the System partition (legacy DNS storage)
  --zone ZONE           Zone to search in (if different than the current domain)
  --print-zones         Only query all zones on the DNS server, no other modifications are made
  -v, --verbose         Show verbose info
  -d, --debug           Show debug info
  -r, --resolve         Resolve hidden recoreds via DNS
  --dns-tcp             Use DNS over TCP
  --include-tombstoned  Include tombstoned (deleted) records
  --ssl                 Connect to LDAP server using SSL
  --referralhosts       Allow passthrough authentication to all referral hosts
  --dcfilter            Use an alternate filter to identify DNS record types
  --sslprotocol SSLPROTOCOL
                        SSL version for LDAP connection, can be SSLv23, TLSv1, TLSv1_1 or TLSv1_2
```

## Examples

### Check amount of records

```plain
$ adidnsdump -u offsec\\janedo  10.10.10.10
Password:
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Querying zone for records
[+] Found 20 records
```

### View records found

```plain
$ adidnsdump -u offsec\\janedo -v 10.10.10.10
Password:
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Querying zone for records
[+] Found record WS7
[+] Found record WS10
[+] Found record ForestDnsZones
[+] Found record EX2016
[+] Found record DomainDnsZones
[+] Found record DC2019
[+] Found record DC2016
[+] Found record dc2008r2
[+] Found record _msdcs
[+] Found record _ldap._tcp.ForestDnsZones
[+] Found record _ldap._tcp.DomainDnsZones
[+] Found record _ldap._tcp.Default-First-Site-Name._sites.ForestDnsZones
[+] Found record _ldap._tcp.Default-First-Site-Name._sites.DomainDnsZones
[+] Found record _ldap._tcp.Default-First-Site-Name._sites
[+] Found record _ldap._tcp
[+] Found record _kpasswd._udp
[+] Found record _kpasswd._tcp
[+] Found record _kerberos._udp
[+] Found record _kerberos._tcp.Default-First-Site-Name._sites
[+] Found record _kerberos._tcp
[+] Found record _gc._tcp.Default-First-Site-Name._sites
[+] Found hidden record _gc._tcp
[+] Found record @
[+] Found 20 records
```

### Print DNS zones

```plain
$ adidnsdump -u offsec\\janedo 10.10.10.10 --print-zones
Password:
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Found 2 domain DNS zones:
    offsec.nl
    RootDNSServers
[-] Found 1 forest DNS zones:
    _msdcs.offsec.nl
[-] Found 1 legacy DNS zones:
    RootDNSServers
```

## URL List

- [Github.com - adidnsdump](https://github.com/dirkjanm/adidnsdump)
- [Dirkjan.io - Getting in the zone dumping active directory DNS with adidnsdump](https://dirkjanm.io/getting-in-the-zone-dumping-active-directory-dns-with-adidnsdump/)
