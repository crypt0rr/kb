---
title : "BloodHound.py"
# pre : ' '
description : "Python based ingestor for BloodHound."
date : 2022-02-10T13:12:39+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## BloodHound.py

### Installation

```plain
git clone https://github.com/fox-it/BloodHound.py.git
cd BloodHound.py
pip3 install .
```

Or via Python-PIP.

```plain
pip3 install bloodhound
```

### Usage

```plain
bloodhound-python [-h] [-c COLLECTIONMETHOD] [-u USERNAME] [-p PASSWORD] [-k] [--hashes HASHES] [-ns NAMESERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-d DOMAIN] [-dc HOST] [-gc HOST] [-w WORKERS] [-v] [--disable-pooling] [--disable-autogc] [--zip]
```

### Flags

```plain
Python based ingestor for BloodHound
For help or reporting issues, visit https://github.com/Fox-IT/BloodHound.py

optional arguments:
  -h, --help            show this help message and exit
  -c COLLECTIONMETHOD, --collectionmethod COLLECTIONMETHOD
                        Which information to collect. Supported: Group, LocalAdmin, Session, Trusts, Default (all previous), DCOnly (no computer connections), DCOM, RDP,PSRemote, LoggedOn, ObjectProps, ACL, All (all except LoggedOn). You can specify more than one by separating them with a comma. (default:
                        Default)
  -u USERNAME, --username USERNAME
                        Username. Format: username[@domain]; If the domain is unspecified, the current domain is used.
  -p PASSWORD, --password PASSWORD
                        Password
  -k, --kerberos        Use kerberos
  --hashes HASHES       LM:NLTM hashes
  -ns NAMESERVER, --nameserver NAMESERVER
                        Alternative name server to use for queries
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds (default: 3)
  -d DOMAIN, --domain DOMAIN
                        Domain to query.
  -dc HOST, --domain-controller HOST
                        Override which DC to query (hostname)
  -gc HOST, --global-catalog HOST
                        Override which GC to query (hostname)
  -w WORKERS, --workers WORKERS
                        Number of workers for computer enumeration (default: 10)
  -v                    Enable verbose output
  --disable-pooling     Don't use subprocesses for ACL parsing (only for debugging purposes)
  --disable-autogc      Don't automatically select a Global Catalog (use only if it gives errors)
  --zip                 Compress the JSON output files into a zip archive
```

### Examples

```plain

```

### URL list

* [Github.com - BloodHound.py](https://github.com/fox-it/BloodHound.py)
