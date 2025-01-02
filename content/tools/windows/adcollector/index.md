---
title : "ADCollector"
# pre : ' '
description : "ADCollector is a lightweight tool that enumerates the Active Directory environment to identify possible attack vectors. It will give you a basic understanding of the configuration/deployment of the environment as a starting point."
date : 2021-10-18T16:05:15+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Is a lightweight tool that enumerates the Active Directory environment to identify possible attack vectors. It will give you a basic understanding of the configuration/deployment of the environment as a starting point

### Enumeration

- Current Domain/Forest information
- Domains in the current forest (with domain SIDs)
- Domain Controllers in the current domain \[GC/RODC]
- Domain/Forest trusts as well as trusted domain objects[SID filtering status]
- Privileged users (currently in DA and EA group)
- Unconstrained delegation accounts (Excluding DCs)
- Constrained Delegation (S4U2Self, S4U2Proxy)
- Resources-based constrained delegation
- MSSQL/Exchange(/RDP/PS) Remoting SPN accounts
- User accounts with SPN set & password does not expire account
- Protected Users
- Confidential attributes
- ASREQROAST (DontRequirePreAuth accounts)
- AdminSDHolder protected accounts
- Domain attributes (MAQ, minPwdLength, maxPwdAge lockoutThreshold, gpLink[group policies that linked to the current domain object])
- LDAP basic info(supportedLDAPVersion, supportedSASLMechanisms, domain/forest/DC Functionality)
- Kerberos Policy
- Interesting ACLs on the domain object, resolving GUIDs (User defined object in the future)
- Unusual DCSync Accounts
- Interesting ACLs on GPOs
- Interesting descriptions on user objects
- Sensitive & Not delegate account
- Group Policy Preference cpassword in SYSVOL/Cache
- Effective GPOs on the current user/computer
- Nested Group Membership
- Restricted Group
- LAPS Password View Access
- ADCS Configurations
- Machine Owner
- ACL Scan

## Installation

{{%resources fa_icon_class="far fa-file-code" pattern=".*(exe)"/%}}

## Usage

```plain
ADCollector.exe [OPTIONS]
```

## Flags

```plain
      _    ____   ____      _ _             _
     / \  |  _ \ / ___|___ | | | ___  ___ _| |_ ___  _ __
    / _ \ | | | | |   / _ \| | |/ _ \/ __|_  __/ _ \| '__|
   / ___ \| |_| | |__| (_) | | |  __/ (__  | || (_) | |
  /_/   \_\____/ \____\___/|_|_|\___|\___| |__/\___/|_|

  v2.1.1  by dev2null

Usage: ADCollector.exe -h

    --Domain (Default: current domain)
            Enumerate the specified domain
    --Ldaps (Default: LDAP)
            Use LDAP over SSL/TLS
    --DiableSigning (Default: Enabled)
            With --Ldaps
    --DC (IP Address of the Domain Controller)
    --OU (Search under an Organizational Unit)
    --ADCS (Only enumerate certificate services)
    --ACLScan (Perform ACL scan against all objects in Domain/Configuration/Schema partitions if no OU is provided)
    --Identity (The Identity used for ACL Scan)
    --UserName (Alternative UserName to Connect LDAP)
    --Password (Alternative LDAP Credential)
    --Interactive (Enter Interactive Menu)
    --Choice (Command Line Option For Interactive Menu)
    --Param (Parameter Value For Options in Interactive Menu)
Example: .\ADCollector.exe
         .\ADCollector.exe --LDAPs --DisableSigning
         .\ADCollector.exe --OU IT
         .\ADCollector.exe --OU OU=IT,DC=domain,DC=local
         .\ADCollector.exe --ADCS
         .\ADCollector.exe --ACLScan --Identity user --OU OU=IT,DC=domain,DC=local
         .\ADCollector.exe --Domain domain.local --Username user --Password pass
         .\ADCollector.exe --Domain domain.local --DC 10.10.10.1
         .\ADCollector.exe --Domain domain.local --Choice 1
         .\ADCollector.exe --Domain domain.local --Choice 3 --Param mssql*

Interactive Menu:
    ===================================
                Interative Menu
    0.  - EXIT
    1.  - Collect LDAP DNS Records
    2.  - Find Single LDAP DNS Record
    3.  - SPN Scan
    4.  - Find Nested Group Membership
    5.  - Search Interesting Term on User Description Fields
    6.  - Enumerate Interesting ACLs on an Object
    7.  - NetSessionEnum
    8.  - NetLocalGroupGetMembers
    9.  - NetWkstaUserEnum
    ===================================
```

## Examples

```plain
PS > .\ADCollector_new.exe

      _    ____   ____      _ _             _
     / \  |  _ \ / ___|___ | | | ___  ___ _| |_ ___  _ __
    / _ \ | | | | |   / _ \| | |/ _ \/ __|_  __/ _ \| '__|
   / ___ \| |_| | |__| (_) | | |  __/ (__  | || (_) | |
  /_/   \_\____/ \____\___/|_|_|\___|\___| |__/\___/|_|

   v2.1.1  by dev2null
[-] Current Domain:        OFFSEC.NL
[-] Current Forest:        OFFSEC.NL
[-] LDAP basic Info:
    serverName:              CN=DC01,CN=Servers,CN=OFFSEC,CN=Sites,CN=Configuration,DC=offsec,DC=local
    isSynchronized:          TRUE
    isGlobalCatalogReady:    TRUE
    dnsHostName:             DC01.OFFSEC.NL
    ldapServiceName:         OFFSEC.NL:DC01$@OFFSEC.NL

    supportedLDAPVersion:    3
    supportedLDAPVersion:    2

    supportedSASLMechanisms:    GSSAPI
    supportedSASLMechanisms:    GSS-SPNEGO
    supportedSASLMechanisms:    EXTERNAL
    supportedSASLMechanisms:    DIGEST-MD5

    namingContexts:    DC=offsec,DC=local
    namingContexts:    CN=Configuration,DC=offsec,DC=local
    namingContexts:    CN=Schema,CN=Configuration,DC=offsec,DC=local

    domainFunctionality:              DS_BEHAVIOR_WIN2016
    forestFunctionality:              DS_BEHAVIOR_WIN2016
    domainControllerFunctionality:    DS_BEHAVIOR_WIN2016
[-] Domain Controllers:
  * DN: CN=DC02,OU=Domain Controllers,DC=offsec,DC=local
    whencreated :              05/06/2018 09:40:42
    logoncount :               68
    whenchanged :              11/10/2021 20:54:01
    cn :                       DC02
    operatingsystem :          Windows Server 2016 Standard
    operatingsystemversion :   10.0 (14393)
    name :                     DC02
    dnshostname :              DC02.OFFSEC.NL
[...]
```

## URL List

- [Github.com - ADCollector](https://github.com/dev-2null/ADCollector)
