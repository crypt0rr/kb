---
title : "LDAP"
# pre : ' '
description : "LDAP mode."
date : 2022-12-07T10:36:59+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## LDEEP - LDAP Mode

## Installation

Install [LDEEP]({{< ref "../" >}}).

## Usage

```plain
ldeep ldap [-h] -d DOMAIN -s LDAPSERVER [-b BASE] [-t {ntlm,simple}] [-u USERNAME] [-p PASSWORD] [-H NTLM] [-k] [--pfx-file PFX_FILE] [--cert-pem CERT_PEM] [--key-pem KEY_PEM] [-a]
                  {computers,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,subnets,trusts,users,zones,from_guid,from_sid,memberships,membersof,object,sddl,zone,all,enum_users,search,add_to_group,modify_password,remove_from_group,unlock} ...
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        The domain as NetBIOS or FQDN
  -s LDAPSERVER, --ldapserver LDAPSERVER
                        The LDAP path (ex : ldap://corp.contoso.com:389)
  -b BASE, --base BASE  LDAP base for query (by default, this value is pulled from remote Ldap)
  -t {ntlm,simple}, --type {ntlm,simple}
                        Authentication type: ntlm (default) or simple

NTLM authentication:
  -u USERNAME, --username USERNAME
                        The username
  -p PASSWORD, --password PASSWORD
                        The password used for the authentication
  -H NTLM, --ntlm NTLM  NTLM hashes, format is LMHASH:NTHASH

Kerberos authentication:
  -k, --kerberos        For Kerberos authentication, ticket file should be pointed by $KRB5NAME env variable

Certificate authentication:
  --pfx-file PFX_FILE   PFX file
  --cert-pem CERT_PEM   User certificate
  --key-pem KEY_PEM     User private key

Anonymous authentication:
  -a, --anonymous       Perform anonymous binds

commands:
  available commands

  {computers,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,subnets,trusts,users,zones,from_guid,from_sid,memberships,membersof,object,sddl,zone,all,enum_users,search,add_to_group,modify_password,remove_from_group,unlock}
    computers           List the computer hostnames and resolve them if --resolve is specify.
    domain_policy       Return the domain policy.
    gmsa                List the gmsa accounts and retrieve NT hash if possible.
    gpo                 Return the list of Group policy objects.
    groups              List the groups.
    machines            List the machine accounts.
    ou                  Return the list of organizational units with linked GPO.
    pkis                List pkis.
    pso                 List the Password Settings Objects.
    subnets             List sites and associated subnets.
    trusts              List the domain's trust relationships.
    users               List users according to a filter.
    zones               List the DNS zones configured in the Active Directory.
    from_guid           Return the object associated with the given `guid`.
    from_sid            Return the object associated with the given `sid`.
    memberships         List the group for which `account` belongs to.
    membersof           List the members of `group`.
    object              Return the records containing `object` in a CN.
    sddl                Returns the SDDL of an object given it's CN.
    zone                Return the records of a DNS zone.
    all                 Collect and store computers, domain_policy, zones, gpo, groups, ou, users, trusts, pso information
    enum_users          Anonymously enumerate users with LDAP pings.
    search              Query the LDAP with `filter` and retrieve ALL or `attributes` if specified.
    add_to_group        Add `user` to `group`.
    modify_password     Change `user`'s password.
    remove_from_group   Remove `user` from `group`.
    unlock              Unlock `user`.
```

## Examples

### Enumerate All Domain Information

This can be used with the [cache]({{< ref "../cache" >}}) functionality.

```plain
$ ldeep ldap -d offsec.nl -s ldap://172.16.0.123:389 -u administrator -p Welkom1234 all output_cache
[+] Retrieving computers output
[+] Retrieving domain_policy output
[+] Retrieving gmsa output
[+] Retrieving gpo output
[+] Retrieving groups output
[+] Retrieving groups verbose output
[+] Retrieving machines output
[+] Retrieving machines verbose output
[+] Retrieving ou output
[+] Retrieving pkis output
[+] Retrieving pkis verbose output
[+] Retrieving pso output
[+] Retrieving subnets output
[+] Retrieving subnets verbose output
[+] Retrieving trusts output
[+] Retrieving users output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving users verbose output
[+] Retrieving zones output
[+] Retrieving zones verbose output
```

### Request Domain Password Policy

```plain
$ ldeep ldap -d offsec.nl -s ldap://172.16.0.123:389 -u administrator -p Welkom1234 domain_policy
dc: offsec
distinguishedName: DC=offsec,DC=nl
lockOutObservationWindow: 10 mins
lockoutDuration: 10 mins
lockoutThreshold: 0
maxPwdAge: 42 days
minPwdAge: 0 days
minPwdLength: 0
pwdHistoryLength: 0
pwdProperties: DOMAIN_PASSWORD_COMPLEX
ms-DS-MachineAccountQuota: 10
msDS-Behavior-Version: Windows Server 2016
```

### Enumerate Domain Computers

```plain
$ ldeep ldap -d offsec.nl -s ldap://172.16.0.123:389 -u administrator -p Welkom1234 computers             
DC01.offsec.nl
CL01.offsec.nl
```

### Enumerate Users

```plain
$ ldeep ldap -d offsec.nl -s ldap://172.16.0.123:389 -u administrator -p Welkom1234 users    
SERGIO_BLAKE
MURIEL_MEYER
PAULETTE_BARRETT
TOMMIE_GRAVES
DEWEY_DOTSON
STACEY_SWANSON
MONIQUE_BRUCE
LORRIE_JOYCE
CHELSEA_HORNE
ANGELICA_MURPHY
BRIANA_SALAS
ALPHONSE_LEACH
JONAS_CARROLL
5262354759SA
LINCOLN_HARRINGTON
[...]
```

### Enumerate Group Membership

```plain
$ ldeep ldap -d offsec.nl -s ldap://172.16.0.123:389 -u administrator -p Welkom1234 membersof 'Domain Admins'
NestedDAGroup (group)
Administrator
```
