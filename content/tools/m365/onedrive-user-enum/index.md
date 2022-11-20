---
title : "onedrive_user_enum"
# pre : ' '
description : "OneDrive user enumeration - pentest tool to enumerate valid o365 users."
date : 2022-09-22T20:07:00+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## onedrive_user_enum

## Installation

```plain
git clone https://github.com/nyxgeek/onedrive_user_enum.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
onedrive_enum.py [-h] -d DOMAIN [-t TENANT] [-u USERNAME] [-U USERFILE] [-o OUTPUT] [-v] [-T THREADS]
```

## Flags

```plain
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        target domain name
  -t TENANT, --tenant TENANT
                        tenant name (default: based off domain name)
  -u USERNAME, --username USERNAME
                        user to target
  -U USERFILE, --userfile USERFILE
                        file containing users to target
  -o OUTPUT, --output OUTPUT
                        file to write output to (default: output.log)
  -v, --verbose         enable verbose output
  -T THREADS, --threads THREADS
                        total number of threads (defaut: 10)
```

## Examples

```plain
$ python3 onedrive_enum.py -U users.txt -d offsec.nl

+-----------------------------------------+
|           OneDrive Enumerator           |
|       2019 @nyxgeek - TrustedSec        |
+-----------------------------------------+

Reading users from file: users.txt
Connection to https://offsec-my.sharepoint.com was successful...
Beginning enumeration of https://offsec-my.sharepoint.com/personal/USER_offsec_com/
[-] [404] not found offsec.nl - johndoe
[-] [404] not found offsec.nl - janedoe
[+] [403] VALID ONEDRIVE FOR offsec.nl - crypt0rr
[+] [403] VALID ONEDRIVE FOR offsec.nl - crypt0rr-adm
[+] [403] VALID ONEDRIVE FOR offsec.nl - attacker
```

## URL List

* [Github.com - onedrive_user_enum](https://github.com/nyxgeek/onedrive_user_enum)
