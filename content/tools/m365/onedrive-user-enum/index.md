---
title : "onedrive_user_enum"
# pre : ' '
description : "OneDrive user enumeration - pentest tool to enumerate valid o365 users."
date : 2022-09-22T20:07:00+02:00
# hidden : true
# draft : true
weight : 170
# tags : ['']
---

---

## Installation

```plain
git clone https://github.com/nyxgeek/onedrive_user_enum.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
onedrive_enum.py [-h] -d  [-t] [-u] [-a] [-U] [-p] [-o] [-T] [-e] [-r] [-x] [-n] [-k] [-v] [-D]
```

## Flags

```plain
  -h, --help           show this help message and exit
  -d , --domain        target domain name (required)
  -t , --tenant        tenant name
  -u , --username      user to target
  -a , --append        mutator: append a number, character, or string to a username
  -U , --userfile      file containing usernames (wordlists) -- will also take a directory
  -p , --playlist      file containing list of paths to user lists (wordlists) to try
  -o , --output        file to write output to (default: output.log)
  -T , --threads       total number of threads (defaut: 100)
  -e , --environment   Azure environment to target [commercial (default), chinese, gov]
  -r, --rerun          force re-run of previously tested tenant/domain/wordlist combination
  -x, --skip-tried     dedupe. skip any usernames from previous runs
  -n, --no-db          disable logging to db
  -k , --killafter     kill off non-productive jobs after x tries with no success
  -v, --verbose        enable verbose output
  -D, --debug          enable debug output
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

- [Github.com - onedrive_user_enum](https://github.com/nyxgeek/onedrive_user_enum)
