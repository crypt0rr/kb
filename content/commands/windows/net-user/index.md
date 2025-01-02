---
title : "net user"
# pre : '<i class="fas fa-code"></i> '
description : "Adds or modifies user accounts, or displays user account information."
date : 2020-03-16T12:04:38+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

## Usage

```plain
net user
```

## Flags

```plain
[username [password | *] [options]] [/DOMAIN]
         username {password | *} /ADD [options] [/DOMAIN]
         username [/DELETE] [/DOMAIN]
         username [/TIMES:{times | ALL}]
         username [/ACTIVE: {YES | NO}]
```

## Examples

### Show users on local system

```plain
net user
```

### Show users available in domain

```plain
net user /DOMAIN
```

### Show specific domain user information

```plain
net user JohnDo /domain
```

### Add user to domain

```plain
net user JohnDo /ADD
```

### Add user to group

```plain
net group "Domain Admins" JohnDo /ADD /DOMAIN
```

## URL List

- [Docs.microsoft.com](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc771865(v%3Dws.11))
