---
title : "ldapsearch-ad.py"
# pre : ' '
description : "Active Directory LDAP Enumerator - Python3 script to quickly get various information from a domain controller through his LDAP service."
date : 2022-03-18T15:06:07+01:00
# hidden : true
# draft : true
weight : 1060
tags : ['Other', 'LDAP', 'Active Directory']
---

---

Python3 script to quickly get various information from a domain controller through his LDAP service.

## Installation

```plain
git clone https://github.com/yaap7/ldapsearch-ad.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
ldapsearch-ad.py [-h] -l LDAP_SERVER [-ssl] -t REQUEST_TYPE [-d DOMAIN] [-u USERNAME] [-p PASSWORD] [-H HASHES] [-s SEARCH_FILTER] [-z SIZE_LIMIT] [-o OUTPUT_FILE] [-v] [search_attributes ...]
```

## Flags

```plain
Active Directory LDAP Enumerator

positional arguments:
  search_attributes     LDAP attributes to look for (default is all).

optional arguments:
  -h, --help            show this help message and exit
  -l LDAP_SERVER, --server LDAP_SERVER
                        IP address of the LDAP server.
  -ssl, --ssl           Force an SSL connection?.
  -t REQUEST_TYPE, --type REQUEST_TYPE
                        Request type: info, whoami, search, search-large, trusts, pass-pols, show-admins, show-user, show-user-list, kerberoast, createsid, all
  -d DOMAIN, --domain DOMAIN
                        Authentication account's FQDN. Example: "contoso.local".
  -u USERNAME, --username USERNAME
                        Authentication account's username.
  -p PASSWORD, --password PASSWORD
                        Authentication account's password.
  -H HASHES, -hashes HASHES
                        NTLM hashes, format is LMHASH:NTHASH
  -s SEARCH_FILTER, --search-filter SEARCH_FILTER
                        Search filter (use LDAP format).
  -z SIZE_LIMIT, --size_limit SIZE_LIMIT
                        Size limit (default is 100, or server' own limit).
  -o OUTPUT_FILE, --output OUTPUT_FILE
                        Write results in specified file too.
  -v, --verbose         Turn on debug mode
```

## Examples

### Get basic information (unauthenticated)

```plain
$ ./ldapsearch-ad.py -l 10.20.30.10 -t info
### Server infos ###
[+] Forest functionality level = Windows 2016
[+] Domain functionality level = Windows 2016
[+] Domain controller functionality level = Windows 2016
[+] rootDomainNamingContext = DC=offsec,DC=nl
[+] defaultNamingContext = DC=offsec,DC=nl
[+] ldapServiceName = offsec.nl:srv2019$@OFFSEC.NL
[+] naming_contexts = ['DC=offsec,DC=nl', 'CN=Configuration,DC=offsec,DC=nl', 'CN=Schema,CN=Configuration,DC=offsec,DC=nl', 'DC=DomainDnsZones,DC=offsec,DC=nl', 'DC=ForestDnsZones,DC=offsec,DC=nl']
```

### Get all information (authenticated)

```plain
$ ./ldapsearch-ad.py -l 10.20.30.10 -d offsec -u johndo -p Welkom1234 -t all    
### Server infos ###
[+] Forest functionality level = Windows 2016
[+] Domain functionality level = Windows 2016
[+] Domain controller functionality level = Windows 2016
[+] rootDomainNamingContext = DC=offsec,DC=nl
[+] defaultNamingContext = DC=offsec,DC=nl
[+] ldapServiceName = offsec.nl:srv2019$@OFFSEC.NL
[+] naming_contexts = ['DC=offsec,DC=nl', 'CN=Configuration,DC=offsec,DC=nl', 'CN=Schema,CN=Configuration,DC=offsec,DC=nl', 'DC=DomainDnsZones,DC=offsec,DC=nl', 'DC=ForestDnsZones,DC=offsec,DC=nl']
### Result of "admins" command ###
All members of group "Domain Admins":
[*]     Administrator (DONT_EXPIRE_PASSWORD)
[+]     CLARENCE_WILSON
[+]     DON_ROBERTS
All members of group "Administrators":
[*]     Administrator (DONT_EXPIRE_PASSWORD)
[+]     MEAGAN_POTTER
[+]     CLARENCE_WILSON
[+]     DON_ROBERTS
[+]     5566221347SA
[+]     ISIDRO_HAYS
All members of group "Enterprise Admins":
[*]     Administrator (DONT_EXPIRE_PASSWORD)
### Result of "pass-pols" command ###
Default password policy:
[+] |___Minimum password length = 7
[+] |___Password complexity = Enabled
[*] |___Lockout threshold = Disabled
[+] No fine grained password policy found (high privileges are required).
### Result of "trusts" command ###
### Result of "kerberoast" command ###
[*] DN: CN=ROB_GOULD,OU=OGC,OU=Tier 2,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.234731
    cn: ROB_GOULD
    sAMAccountName: ROB_GOULD
    servicePrincipalName: https/FSRWAPPS1000000

[*] DN: CN=CONRAD_CRAWFORD,OU=SEC,OU=Tier 1,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.234772
    cn: CONRAD_CRAWFORD
    sAMAccountName: CONRAD_CRAWFORD
    servicePrincipalName: ftp/TSTWWEBS1000000

[*] DN: CN=GENA_FLYNN,OU=Groups,OU=ESM,OU=Tier 1,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.234802
    cn: GENA_FLYNN
    sAMAccountName: GENA_FLYNN
    servicePrincipalName: MSSQL/SECWLPT1000000
[...]

### Result of "asreqroast" command ###
[*] DN: CN=EDDY_MILES,OU=Groups,OU=ITS,OU=Stage,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.453337
    cn: EDDY_MILES
    sAMAccountName: EDDY_MILES

[*] DN: CN=MARCIA_HOLCOMB,OU=Groups,OU=HRE,OU=Tier 2,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.453406
    cn: MARCIA_HOLCOMB
    sAMAccountName: MARCIA_HOLCOMB
[...]

### Result of "goldenticket" command ###
[+] [DN: CN=krbtgt,CN=Users,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.468006
    whenChanged: 2022-02-05 08:52:08+00:00
]
### Result of "search-delegation" command ###
[*] DN: CN=SRV2019,OU=Domain Controllers,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.703956
    cn: SRV2019
    sAMAccountName: SRV2019$

[*] DN: CN=SRV2022,OU=Domain Controllers,DC=offsec,DC=nl - STATUS: Read - READ TIME: 2022-03-18T15:16:14.704213
    cn: SRV2022
    sAMAccountName: SRV2022$

### Result of "creatorsid" command ###
```

## URL List

- [Github.com - ldapsearch-ad](https://github.com/yaap7/ldapsearch-ad)
