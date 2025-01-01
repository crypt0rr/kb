---
title : "MFade"
# pre : ' '
description : "A tool to find failure points in Microsoft Multi Factor Authentication configurations from an attacker's perspective but with some extra OPSEC features."
date : 2023-12-14T20:27:42+01:00
# hidden : true
# draft : true
weight : 100
tags : ['M365', 'AzureAD/EntraID', 'MFA']
---

---

A tool to find failure points in Microsoft Multi Factor Authentication configurations from an attacker's perspective but with some extra OPSEC features.

## Installation

```plain
git clone https://github.com/ibaiC/MFade.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
MFade.py [-h] [--username USERNAME] [--password PASSWORD] [--recon] [--adfs] [--sleep SLEEP] [--jitter JITTER] [--ioc] [--exclude EXCLUDE]
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  --username USERNAME, -u USERNAME
                        target email address (e.g e.alderson@evilcorp.com)
  --password PASSWORD, -p PASSWORD
                        target's password
  --recon, -r           script will attempt to locate ADFS configurations
  --adfs                script will attempt to login to ADFS in addition to the other Microsoft protocols
  --sleep SLEEP, -s SLEEP
                        OPSEC: how long to sleep between authentication attempts (in seconds)
  --jitter JITTER, -j JITTER
                        OPSEC: percentage change added to sleep value for further sleep randomisation (0-100)
  --ioc                 OPSEC: Print a report with the generated HTTP request times and their corresponding target URLs
  --exclude EXCLUDE, -e EXCLUDE
                        OPSEC: Exclude given checks. Provide the checks to exclude as a comma-separated list. Possible values are: gapi,asm,ews,as,mwp-W,mwp-L,mwp-M,mwp-A,mwp-I,mwp-wp. Check the source
                        code for mappings

This program is made for use in authorised environments. Please do not use it for evil.
```

## Examples

```plain
$ python3 MFade.py --username "mfatest@offsec.nl" --password "Welcome1234"

___  _________        _      
|  \/  ||  ___|      | |     
| .  . || |_ __ _  __| | ___ 
| |\/| ||  _/ _` |/ _` |/ _ \
| |  | || || (_| | (_| |  __/
\_|  |_/\_| \__,_|\__,_|\___|
                             
########## MICROSOFT API CHECKS ##########
[i] === Logging into Microsoft Graph API ===
[*] Success! mfatest@offsec.nl is able to authenticate to the Microsoft Graph API
[*] The MSOnline PowerShell module can be used to leverage this.
[i] === Logging into Microsoft Service Management API ===
[*] Success! mfatest@offsec.nl is able to authenticate to the Microsoft Service Management API
[*] The Az PowerShell module can be used to leverage this.


########## MICROSOFT WEB PORTAL CHECKS ##########
[i] === Logging into Microsoft Web Portal with Windows User Agent ===
[-] Login failed.
[i] === Logging into Microsoft Web Portal with Linux User Agent ===
[-] Login failed.
[i] === Logging into Microsoft Web Portal with Mac OS User Agent ===
[*] SUCCESS! mfatest@offsec.nl was able to authenticate to the Microsoft 365 Web Portal. Checking MFA now...
[-] Login failed.
[i] === Logging into Microsoft Web Portal with Android User Agent ===
[-] Login failed.
[i] === Logging into Microsoft Web Portal with iPhone User Agent ===
[*] SUCCESS! mfatest@offsec.nl was able to authenticate to the Microsoft 365 Web Portal. Checking MFA now...
[-] Login failed.
[i] === Logging into Microsoft Web Portal with Windows Phone User Agent ===
[*] SUCCESS! mfatest@offsec.nl was able to authenticate to the Microsoft 365 Web Portal. Checking MFA now...
[-] Login failed.


########## LEGACY AUTH CHECKS ##########
=== Logging into Exchange Web Services ===
[-] Login failed to Exchange Web Services
=== Logging into Microsoft Active Sync ===
[-] Login failed to Microsoft Active Sync


[i] === SINGLE FACTOR ACCESS RESULTS: ===

    Microsoft Graph API                                 YES
    Microsoft Service Management API                    YES
    Microsoft 365 Web Portal w/ Windows User Agent      NO
    Microsoft 365 Web Portal w/ Linux User Agent        NO
    Microsoft 365 Web Portal w/ Mac OS User Agent       NO
    Microsoft 365 Web Portal w/ Android User Agent      NO
    Microsoft 365 Web Portal w/ iPhone User Agent       NO
    Microsoft 365 Web Portal w/ Win Phone User Agent    NO
    Exchange Web Services                               NO
    Active Sync                                         NO
    ADFS found                                          NO
    ADFS Auth                                           NO
```

## URL list

- [Github.com - MFade](https://github.com/ibaiC/MFade)
