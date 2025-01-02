---
title : "UFW"
# pre : ' '
description : "This program is for managing a Linux firewall and aims to provide an easy to use interface for the user."
date : 2020-03-13T15:56:11+01:00
# hidden : true
# draft : true
weight : 460
# tags : ['']
---

---

This program is for managing a Linux firewall and aims to provide an easy to use interface for the user.

## Installation

```plain
sudo apt install ufw
```

## Usage

```plain
ufw COMMAND
```

## Flags

```plain
Usage: ufw COMMAND

Commands:
 enable                          enables the firewall
 disable                         disables the firewall
 default ARG                     set default policy
 logging LEVEL                   set logging to LEVEL
 allow ARGS                      add allow rule
 deny ARGS                       add deny rule
 reject ARGS                     add reject rule
 limit ARGS                      add limit rule
 delete RULE|NUM                 delete RULE
 insert NUM RULE                 insert RULE at NUM
 route RULE                      add route RULE
 route delete RULE|NUM           delete route RULE
 route insert NUM RULE           insert route RULE at NUM
 reload                          reload firewall
 reset                           reset firewall
 status                          show firewall status
 status numbered                 show firewall status as numbered list of RULES
 status verbose                  show verbose firewall status
 show ARG                        show firewall report
 version                         display version information

Application profile commands:
 app list                        list application profiles
 app info PROFILE                show information on PROFILE
 app update PROFILE              update PROFILE
 app default ARG                 set default application policy
```

## Examples

### Enable/disable UFW

```plain
sudo ufw enable/disable
```

### Check current UFW status

```plain
sudo ufw status verbose
```

### Allow/deny incomming tcp/udp traffic

```plain
sudo ufw allow/deny <port>
```

### Allow/deny incomming TCP traffic

```plain
sudo ufw allow/deny <port>/tcp
```

### Allow/deny incomming UDP traffic

```plain
sudo ufw allow/deny <port>/udp
```

### Allow/deny from specific ip

```plain
sudo ufw allow/deny from <ip-address>
```

### Allow/deny from specific subnet

```plain
sudo ufw allow/deny from 192.168.0.0/24
```

### Allow/deny from specific IP to specific port

```plain
sudo ufw allow/deny from <ip> to any port <port>
```

### Delete existing rule

```plain
sudo ufw delete allow/deny <port>/udp-or-tcp
```

### Easy delete rules

```plain
$ sudo ufw status numbered

Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 80                         ALLOW IN    10.10.10.0/24
[ 2] 443                        ALLOW IN    10.10.10.0/24
```

```plain
$ sudo ufw delete 1

Deleting:
 allow from 10.10.10.0/24 to any port 80
Proceed with operation (y|n)? y
Rule deleted
```

## URL List

- [Ubuntu.com - UFW](https://help.ubuntu.com/community/UFW)
