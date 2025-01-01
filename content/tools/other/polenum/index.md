---
title : "Polenum"
# pre : ' '
description : "Password policy enumerator."
date : 2020-07-09T14:17:45+02:00
# hidden : true
# draft : true
weight : 1330
# tags : ['']
---

---

Request the password policy for a user(s).

## Installation

```plain
sudo apt install polenum
```

## Usage

```plain
usage: polenum [-h] [--username USERNAME] [--password PASSWORD] [--domain DOMAIN] [--protocols [PROTOCOLS [PROTOCOLS ...]]] [enum4linux]
```

## Flags

```plain
positional arguments:
  enum4linux            username:password@IPaddress

optional arguments:
  -h, --help            show this help message and exit
  --username USERNAME, -u USERNAME
                        The specified username
  --password PASSWORD, -p PASSWORD
                        The password of the user
  --domain DOMAIN, -d DOMAIN
                        The domain or IP
  --protocols [PROTOCOLS [PROTOCOLS ...]]
                        ['139/SMB', '445/SMB']
```

## Examples

```plain
$ polenum --username johndo --password Welkom1234 --domain 10.10.10.10


[+] Attaching to 10.10.10.10 using johndo:Welkom1234

[+] Trying protocol 139/SMB...

    [!] Protocol failed: Cannot request session (Called Name:10.10.10.10)

[+] Trying protocol 445/SMB...

[+] Found domain(s):

    [+] OFFSEC
    [+] Builtin

[+] Password Info for Domain: OFFSEC

    [+] Minimum password length: 7
    [+] Password history length: 24
    [+] Maximum password age: 41 days 23 hours 53 minutes
    [+] Password Complexity Flags: 000001

        [+] Domain Refuse Password Change: 0
        [+] Domain Password Store Cleartext: 0
        [+] Domain Password Lockout Admins: 0
        [+] Domain Password No Clear Change: 0
        [+] Domain Password No Anon Change: 0
        [+] Domain Password Complex: 1

    [+] Minimum password age: 1 day 4 minutes
    [+] Reset Account Lockout Counter: 30 minutes
    [+] Locked Account Duration: 30 minutes
    [+] Account Lockout Threshold: None
    [+] Forced Log off Time: Not Set
```

## URL List

- [Tools.kali.org - polenum](https://tools.kali.org/password-attacks/polenum)
