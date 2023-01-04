---
title : "Cache"
# pre : ' '
description : "Cache mode."
date : 2022-12-07T10:37:02+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## LDEEP - Cache Mode

## Installation

Install [LDEEP]({{< ref "../" >}}).

## Usage

```plain
ldeep cache [-h] [-d DIR] -p PREFIX {computers,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,subnets,trusts,users,zones,from_guid,from_sid,memberships,membersof,object,sddl,zone} ...
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

  {computers,domain_policy,gmsa,gpo,groups,machines,ou,pkis,pso,subnets,trusts,users,zones,from_guid,from_sid,memberships,membersof,object,sddl,zone}
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
```

## Example dataset

{{%attachments fa_icon_class="far fa-file-archive" pattern=".*(gz)"/%}}

## Examples

The cache module depends on the collected data with the [LDAP]({{< ref "../LDAP" >}}) module.

```plain
$ ldeep cache -p cache membersof 'Domain Admins'
Administrator
NestedDAGroup (group)
```
