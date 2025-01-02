---
title : "Omnispray"
# pre : ' '
description : "Omnispray aims to replace tools such as o365spray and provide a modular framework to expand enumeration and spraying beyond just a single target/application."
date : 2022-09-20T10:00:04+02:00
# hidden : true
# draft : true
weight : 160
tags : ['M365', 'AzureAD/EntraID', 'Passwordspray']
---

---

Omnispray aims to replace tools such as [o365spray](https://github.com/0xZDH/o365spray) and provide a modular framework to expand enumeration and spraying beyond just a single target/application.

The primary goal is to provide a framework to allow for the easy development and implementation of user enumeration and password spraying techniques for a variety of targets/applications. While there are currently several prebuilt modules included, this tool provides module templates to give users the tools needed to extend the tools usage for non-standard cases. The goal is also to provide a central tool to handle all enumeration and spraying.

## Installation

```plain
git clone https://github.com/0xZDH/Omnispray.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
omnispray.py [-h] [-m MODULE] [-d DOMAIN] [-tenant TENANT] [-t {enum,spray}] [--url URL] [-u USER | -us USERS [USERS ...] | -uf USERFILE] [-p PASSWORD | -ps PASSWORDS [PASSWORDS ...] | -pf PASSWORDFILE] [-c COUNT] [-l LOCKOUT] [-s SPLIT] [-w WAIT] [--timeout TIMEOUT] [--proxy PROXY]
                    [--proxy-url PROXY_URL] [--proxy-headers PROXY_HEADERS [PROXY_HEADERS ...]] [--outdir OUTDIR] [--logdir LOGDIR] [--pause PAUSE] [--rate RATE] [--version] [--debug]
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  -m MODULE, --module MODULE
                        Specify the module to run via the modules/ directory.
  -d DOMAIN, --domain DOMAIN
                        Target domain for enumeration/spraying.
  -tenant TENANT, --tenant TENANT
                        Target tenant name in case it differs with domain for enumeration/spraying.
  -t {enum,spray}, --type {enum,spray}
                        Module type. If left blank, Omnispray will attempt to autodetect the module type based on the module name.
  --url URL             Target URL.
  -u USER, --user USER  Single username/email to process.
  -us USERS [USERS ...], --users USERS [USERS ...]
                        Multiple users/emails to process.
  -uf USERFILE, --userfile USERFILE
                        File containing multiple users/emails to process.
  -p PASSWORD, --password PASSWORD
                        Single password to process.
  -ps PASSWORDS [PASSWORDS ...], --passwords PASSWORDS [PASSWORDS ...]
                        Multiple passwords to process.
  -pf PASSWORDFILE, --passwordfile PASSWORDFILE
                        File containing multiple passwords to process.
  -c COUNT, --count COUNT
                        When password spraying, number of password attempts to run before resetting lockout timer. Default: 1 password per spray rotation
  -l LOCKOUT, --lockout LOCKOUT
                        Password spraying lockout policy reset time (in minutes). Default: 15 minutes
  -s SPLIT, --split SPLIT
                        When enumerating, number of usernames to group by during execution
  -w WAIT, --wait WAIT  If splitting user enumeration via --split, time to wait between group runs (in minutes). Default: 5 minutes
  --timeout TIMEOUT     Request timeout in seconds. Default: 25 seconds
  --proxy PROXY         Proxy to pass traffic through (e.g. http://127.0.0.1:8080).
  --proxy-url PROXY_URL
                        URL of proxy to request instead of the module URL. This is to be used with tools such as FireProx.
  --proxy-headers PROXY_HEADERS [PROXY_HEADERS ...]
                        Custom headers to use when a --proxy-url has been provided
  --outdir OUTDIR       Directory for results and tested files. Default: results/
  --logdir LOGDIR       Directory for log files. Default: logs/
  --pause PAUSE         Sleep (jitter) time before each task is executed in seconds. If set to '-1', a random pause, between 0.250 and 0.750, will occur before each task execution. Default: 0.250 seconds
  --rate RATE           Number of concurrent connections during enumeration/spraying. Default: 10 threads
  --version             Print the tool version.
  --debug               Debug output
```

## Examples

```plain
$ cat users.txt
info@offsec.nl
sales@offsec.nl
security@offsec.nl
crypt0rr@offsec.nl
hr@offsec.nl
finance@offsec.nl
marketing@offsec.nl
```

```plain
$ python3 omnispray.py --type enum -uf users.txt  --module o365_enum_office --proxy-url https://096l9qrvcb.execute-api.eu-west-1.amazonaws.com/fireprox/ --pause -1

            *** Omnispray ***            

>---------------------------------------<

   > version        :  0.1.4
   > module         :  o365_enum_office
   > type           :  enum
   > userfile       :  users.txt
   > count          :  1 passwords/spray
   > lockout        :  15.0 minutes
   > wait           :  5.0
   > timeout        :  25 seconds
   > proxy_url      :  https://096l9qrvcb.execute-api.eu-west-1.amazonaws.com/fireprox/
   > pause          :  -1.0 seconds
   > rate           :  10 threads
   > start          :  2022-09-19 16:20:43

>---------------------------------------<

[2022-09-19 16:20:43,126] INFO : Generating prerequisite data via office.com...
[2022-09-19 16:20:43,893] INFO : Enumerating 7 users via 'o365_enum_office' module
[2022-09-19 16:20:44,768] INFO : [ + ] crypt0rr@offsec.nl
[2022-09-19 16:23:13,156] INFO : Results can be found in: '/home/crypt0rr/results/'
[2022-09-19 16:23:13,157] INFO : Valid user accounts: 1
```

## URL List

- [Github.com - Omnispray](https://github.com/0xZDH/Omnispray)
