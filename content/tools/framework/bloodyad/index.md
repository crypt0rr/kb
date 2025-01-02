---
title : "bloodyAD"
# pre : ' '
description : "Active Directory Privilege Escalation Framework."
date : 2022-09-16T11:39:56+02:00
# hidden : true
# draft : true
weight : 80
# tags : ['']
---

---

bloodyAD.py is an Active Directory privilege escalation swiss army knife.

This tool can perform specific LDAP/SAMR calls to a domain controller in order to perform AD privesc.

`bloodyAD` supports authentication using cleartext passwords, pass-the-hash, pass-the-ticket or certificates and binds to LDAP services of a domain controller to perform AD privesc.

It is designed to be used transparently with a SOCKS proxy.

## Installation

```plain
git clone https://github.com/CravateRouge/bloodyAD
python3 -m pip install .
```

## Usage

```plain
bloodyAD [-h] [-d DOMAIN] [-u USERNAME] [-p PASSWORD] [-k] [-c CERTIFICATE] [-s] [--host HOST]
        {getObjectAttributes,setAttribute,addUser,addComputer,delObject,changePassword,addObjectToGroup,addForeignObjectToGroup,delObjectFromGroup,getChildObjects,search,setShadowCredentials,setGenericAll,setOwner,setRbcd,setDCSync,setUserAccountControl} ...
```

## Flags

```plain
Main options:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        Domain used for NTLM authentication
  -u USERNAME, --username USERNAME
                        Username used for NTLM authentication
  -p PASSWORD, --password PASSWORD
                        Cleartext password or LMHASH:NTHASH for NTLM authentication
  -k, --kerberos
  -c CERTIFICATE, --certificate CERTIFICATE
                        Certificate authentication, e.g: "path/to/key:path/to/cert"
  -s, --secure          Try to use LDAP over TLS aka LDAPS (default is LDAP)
  --host HOST           Hostname or IP of the DC (ex: my.dc.local or 172.16.1.3)

Commands:
  {getObjectAttributes,setAttribute,addUser,addComputer,delObject,changePassword,addObjectToGroup,addForeignObjectToGroup,delObjectFromGroup,getChildObjects,search,setShadowCredentials,setGenericAll,setOwner,setRbcd,setDCSync,setUserAccountControl}
                        Function to call
```

## Examples

Other useful commands can be found [here](https://github.com/CravateRouge/bloodyAD#useful-commands)

### Get group members

**Note:** As shown in the example below, groups (ThisIsAGroupWithinDA) that are part of the 'Domain Admins' group, are shown but not distinguished in any form.

```plain
$ bloodyAD -u crypt0rr -d offsec.nl -p Welkom1234 --host 10.0.0.20 getObjectAttributes 'Domain Admins' member                 
{
    "member": [
        "CN=ThisIsAGroupWithinDA,OU=HRE,OU=People,DC=offsec,DC=nl",
        "CN=JOHN Do,OU=T0-Accounts,OU=Tier 0,OU=Admin,DC=offsec,DC=nl",
        "CN=KIETH_MCINTOSH,OU=T0-Permissions,OU=Tier 0,OU=Admin,DC=offsec,DC=nl",
        "CN=STEWART_SANDERS,OU=ServiceAccounts,OU=AWS,OU=Tier 1,DC=offsec,DC=nl",
        "CN=ERICH_ATKINS,OU=Test,OU=ITS,OU=Tier 1,DC=offsec,DC=nl",
        "CN=GERTRUDE_KNIGHT,OU=BDE,OU=Tier 2,DC=offsec,DC=nl",
        "CN=AUGUSTINE_PUCKETT,OU=ServiceAccounts,OU=GOO,OU=Tier 2,DC=offsec,DC=nl",
        "CN=Administrator,CN=Users,DC=offsec,DC=nl"
    ]
}
```

### Get all users of the domain

```plain
$ bloodyAD -u crypt0rr -d offsec.nl -p Welkom1234 --host 10.0.0.20 getChildObjects 'DC=offsec,DC=nl' user
CN=Administrator,CN=Users,DC=offsec,DC=nl
CN=Guest,CN=Users,DC=offsec,DC=nl
CN=DC19,OU=Domain Controllers,DC=offsec,DC=nl
CN=krbtgt,CN=Users,DC=offsec,DC=nl
CN=PHILIP_ROSALES,OU=SEC,OU=Tier 1,DC=offsec,DC=nl
CN=KATHIE_HARRELL,OU=AZR,OU=Tier 1,DC=offsec,DC=nl
CN=MISTY_DELACRUZ,OU=Devices,OU=AZR,OU=Tier 1,DC=offsec,DC=nl
CN=MARCELO_ROACH,OU=Tier 1,OU=Admin,DC=offsec,DC=nl
CN=PERRY_MILES,OU=Test,OU=ESM,OU=Tier 2,DC=offsec,DC=nl
CN=MARGRET_LEONARD,OU=FIN,OU=People,DC=offsec,DC=nl
CN=MOHAMMAD_HANSEN,OU=Devices,OU=AWS,OU=Tier 1,DC=offsec,DC=nl
CN=SEYMOUR_VEGA,OU=Devices,OU=ESM,OU=Tier 1,DC=offsec,DC=nl
[...]
```

### Get AD functional level

```plain
$ bloodyAD -u crypt0rr -d offsec.nl -p Welkom1234 --host 10.0.0.20 getObjectAttributes 'DC=offsec,DC=nl' msDS-Behavior-Version
{
    "msDS-Behavior-Version": "DS_BEHAVIOR_WIN2016"
}
```

### Get quota for adding computer objects to the domain

```plain
$ bloodyAD -u crypt0rr -d offsec.nl -p Welkom1234 --host 10.0.0.20 getObjectAttributes 'DC=offsec,DC=nl' ms-DS-MachineAccountQuota
{
    "ms-DS-MachineAccountQuota": 10
}
```

## URL List

- [Github.com - bloodyAD](https://github.com/CravateRouge/bloodyAD)
