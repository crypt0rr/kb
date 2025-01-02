---
title : "Cache"
# pre : ' '
description : "Cache mode."
date : 2022-12-07T10:37:02+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

## Installation

Install [LDEEP]({{< ref "ldeep" >}}).

## Usage

```plain
ldeep cache [-h] [-d DIR] -p PREFIX
                   {auth_policies,computers,conf,delegations,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,shadow_principals,silos,smsa,subnets,trusts,users,zones,from_guid,from_sid,laps,memberships,membersof,object,sddl,silo,zone}
                   ...
```

## Flags

```plain
options:
  -h, --help            show this help message and exit
  -d DIR, --dir DIR     Use saved JSON files in specified directory as cache
  -p PREFIX, --prefix PREFIX
                        Prefix of ldeep saved files

commands:
  available commands

  {auth_policies,computers,conf,delegations,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,shadow_principals,silos,smsa,subnets,trusts,users,zones,from_guid,from_sid,laps,memberships,membersof,object,sddl,silo,zone}
    auth_policies       List the authentication policies configured in the Active Directory.
    computers           List the computer hostnames and resolve them if --resolve is specify.
    conf                Dump the configuration partition of the Active Directory.
    delegations         List accounts configured for any kind of delegation.
    domain_policy       Return the domain policy.
    gmsa                List the gmsa accounts and retrieve NT hash if possible.
    gpo                 Return the list of Group policy objects.
    groups              List the groups.
    machines            List the machine accounts.
    ou                  Return the list of organizational units with linked GPO.
    pkis                List pkis.
    pso                 List the Password Settings Objects.
    shadow_principals   List the shadow principals and the groups associated with.
    silos               List the silos configured in the Active Directory.
    smsa                List the smsa accounts and the machines they are associated with.
    subnets             List sites and associated subnets.
    trusts              List the domain's trust relationships.
    users               List users according to a filter.
    zones               List the DNS zones configured in the Active Directory.
    from_guid           Return the object associated with the given `guid`.
    from_sid            Return the object associated with the given `sid`.
    laps                Return the LAPS passwords. If a target is specified, only retrieve the LAPS password for this one.
    memberships         List the group for which `account` belongs to.
    membersof           List the members of `group`.
    object              Return the records containing `object` in a CN.
    sddl                Returns the SDDL of an object given it's CN.
    silo                Get information about a specific `silo`.
    zone                Return the records of a DNS zone.
```

## Example dataset

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(gz)"/%}}

## Examples

The cache module depends on the collected data with the LDAP module.

```plain
$ ldeep cache -p cache membersof 'Domain Admins'
Administrator
NestedDAGroup (group)
```
