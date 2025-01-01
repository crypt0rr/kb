---
title : "LDAP Relay Scan"
# pre : ' '
description : "A tool to check Domain Controllers for LDAP server protections regarding the relay of NTLM authentication."
date : 2022-01-19T09:39:19+01:00
# hidden : true
# draft : true
weight : 1050
tags : ['Other', 'LDAP', 'Active Directory']
---

---

A tool to check Domain Controllers for LDAP server protections regarding the relay of NTLM authentication. If you're interested in the specifics of the error-based enumeration, see [below](https://github.com/zyn3rgy/LdapRelayScan#error-based-enumeration-specifics). For details regarding what can be done when you identify a lack of LDAP protections, see the [references section](https://github.com/zyn3rgy/LdapRelayScan#references).

### Summary

There are a couple server-side protections when attempting to relay NTLM authentication LDAP on Domain Controllers. The LDAP protections this tools attempts to enumerate include:

- LDAPS - [channel binding](https://support.microsoft.com/en-us/topic/use-the-ldapenforcechannelbinding-registry-entry-to-make-ldap-authentication-over-ssl-tls-more-secure-e9ecfa27-5e57-8519-6ba3-d2c06b21812e)
- LDAP - [server signing requirements](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/domain-controller-ldap-server-signing-requirements)

The enforcement of channel binding for LDAP over SSL/TLS can be determined from an unauthenticated perspective. This is because the error associated with an LDAP client lacking the ability to conduct channel binding properly will occur before credentials are validated during the LDAP bind process.

However, to determine if the server-side protection of standard LDAP is enforced (server signing integrity requirements) the clients credential's must first be validated during the LDAP bind. The potential error identifying the enforcement of this protection is identified from an authenticated perspective.

**TL;DR - LDAPS can be checked unauthenticated, but checking LDAP requires authentication.**

## Installation

```plain
git clone https://github.com/zyn3rgy/LdapRelayScan.git
```

## Usage

The tool has two methods, LDAPS (the default), and BOTH. LDAPS only requires a domain controller IP address, because this check can be preformed unauthenticated. The BOTH method will require a username and password or NT hash. The Active Directory domain is not required, it will be determine via anonymous LDAP bind.

```plain
python3.9 LdapRelayScan.py -method LDAPS -dc-ip 10.0.0.20
python3.9 LdapRelayScan.py -method BOTH -dc-ip 10.0.0.20 -u domainuser1 
python3.9 LdapRelayScan.py -method BOTH -dc-ip 10.0.0.20 -u domainuser1 -p badpassword2
python3.9 LdapRelayScan.py -method BOTH -dc-ip 10.0.0.20 -u domainuser1 -nthash e6ee750a1feb2c7ee50d46819a6e4d25
```

## Flags

```plain
[-h] [-method method] -dc-ip DC_IP [-u username] [-p password] [-nthash nthash]
```

## Examples

### Checking LDAPS Channel Binding

```plain
$ python3 LdapRelayScan.py -dc-ip 10.10.10.10

~Domain Controllers identifed~
   pddc01.offsec.nl
   sdc02c.offsec.nl
   loc2dc.offsec.nl
   loc3dc.offsec.nl

~Checking DCs for LDAP NTLM relay protections~
   pddc01.offsec.nl
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   sdc02c.offsec.nl
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   loc2dc.offsec.nl
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   loc3dc.offsec.nl
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
```

### Checking both LDAP and LDAPS

```plain
$ python3 LdapRelayScan.py -method BOTH -dc-ip 10.10.10.10 -u johndo
Password:

~Domain Controllers identifed~
   pddc01.offsec.nl
   sdc02c.offsec.nl
   loc2dc.offsec.nl
   loc3dc.offsec.nl

~Checking DCs for LDAP NTLM relay protections~
   pddc01.offsec.nl
      [+] (LDAP) SERVER SIGNING REQUIREMENTS NOT ENFORCED! 
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   sdc02c.offsec.nl
      [+] (LDAP) SERVER SIGNING REQUIREMENTS NOT ENFORCED! 
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   loc2dc.offsec.nl
      [+] (LDAP) SERVER SIGNING REQUIREMENTS NOT ENFORCED! 
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
   loc3dc.offsec.nl
      [+] (LDAP) SERVER SIGNING REQUIREMENTS NOT ENFORCED! 
      [+] (LDAPS) CHANNEL BINDING NOT REQUIRED! PARTY TIME!
```

## URL List

- [Github.com - LdapRelayScan](https://github.com/zyn3rgy/LdapRelayScan)
