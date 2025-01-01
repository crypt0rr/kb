---
title : "net group"
# pre : '<i class="fas fa-code"></i> '
description : "Adds, displays, or modifies global groups in domains."
date : 2020-03-16T12:12:57+01:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

## Usage

```plain
net group [OPTIONS]
```

## Flags

```plain
net group [<GroupName> [/comment:"<Text>"]] [/domain]
net group [<GroupName>{/add [/comment:"<Text>"] | /delete} [/domain]]
net group [<GroupName> <UserName>[ ...] {/add | /delete} [/domain]]
```

## Examples

### Show all members of a specific group

```cmd
net group "Domain Admins" /DOMAIN
```

```plain
The request will be processed at a domain controller for domain example.local.

Group name     Domain Admins
Comment        Designated administrators of the domain

Members

-------------------------------------------------------------------------------
JohnDO
The command completed successfully.
```

### List all domain groups

```cmd
net group /DOMAIN
```

```plain
The request will be processed at a domain controller for domain example.local.


Group Accounts for \\example.local

-------------------------------------------------------------------------------
*Cloneable Domain Controllers
*Compliance Management
*Delegated Setup
*Discovery Management
*DnsUpdateProxy
*Domain Admins
*Domain Computers
*Domain Controllers
*Domain Guests
*Domain Users
[...]
```

## URL List

- [Docs.microsoft.com](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc754051(v=ws.11))
