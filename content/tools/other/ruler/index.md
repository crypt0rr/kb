---
title : "Ruler"
# pre : ' '
description : "A tool to abuse Exchange Services."
date : 2020-03-13T22:28:30+01:00
# hidden : true
# draft : true
weight : 1530
tags : ['Other', 'O365', 'Passwordspray']
---

---

A tool to abuse Exchange Services.

## Installation

Download newest release from [Github.com](https://github.com/sensepost/ruler/releases)

## Usage

```plain
./ruler-linux64 [global options] command [command options] [arguments...]
```

## Flags

```plain
NAME:
   ruler - A tool to abuse Exchange Services

USAGE:
   ruler [global options] command [command options] [arguments...]

VERSION:
   2.4.0

DESCRIPTION:
            _
 _ __ _   _| | ___ _ __
| '__| | | | |/ _ \ '__|
| |  | |_| | |  __/ |
|_|   \__,_|_|\___|_|

A tool by @_staaldraad and @sensepost to abuse Exchange Services.


AUTHORS:
   Etienne Stalmans <@_staaldraad>
   Roman Maksimov <@rmaksimov>

COMMANDS:
     add, a           add a new rule
     delete, r        delete an existing rule
     display, d       display all existing rules
     check, c         Check if the credentials work and we can interact with the mailbox
     send, s          Send an email to trigger an existing rule. This uses the target user's own account.
     autodiscover, u  Just run the autodiscover service to find the authentication point
     brute, b         Do a bruteforce attack against the autodiscover service to find valid username/passwords
     abk              Interact with the Global Address Book
     form             Interact with the forms function.
     homepage         Interact with the homepage function.
     search           Search for items
     help, h          Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --domain value, -d value       A domain for the user (optional in most cases. Otherwise allows: domain\username)
   --o365                         We know the target is on Office365, so authenticate directly against that.
   --username value, -u value     A valid username
   --password value, -p value     A valid password
   --hash value                   A NT hash for pass the hash
   --email value, -e value        The target's email address
   --cookie value                 Any third party cookies such as SSO that are needed
   --config value                 The path to a config file to use
   --url value                    If you know the Autodiscover URL or the autodiscover service is failing. Requires full URI, https://autodisc.d.com/autodiscover/autodiscover.xml
   --proxy value                  If you need to use an upstream proxy. Works with https://user:pass@ip:port or https://ip:port
   --useragent value, --ua value  Custom User-Agent string (default: "ruler")
   --insecure, -k                 Ignore server SSL certificate errors
   --noencrypt                    Don't use encryption the RPC level - some environments require this
   --basic, -b                    Force Basic authentication
   --admin                        Login as an admin
   --nocache                      Don't use the cached autodiscover record
   --rpc                          Force RPC/HTTP rather than MAPI/HTTP
   --hostname value, -n value     Custom Hostname value (default: "RULER")
   --verbose                      Be verbose and show some of the inner workings
   --debug                        Be print debug info
   --help, -h                     show help
   --version, -v                  print the version
```

## Examples

### Office365 password spray

```plain
./ruler --o365 b --userpass <file> --verbose
```

## URL List

- [GitHub](https://github.com/sensepost/ruler/)
- [ired.team](https://www.ired.team/offensive-security/initial-access/password-spraying-outlook-web-access-remote-shell)
