---
title : "SMTP"
# pre : ' '
description : "smtp description."
date : 2020-03-14T19:29:07+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## SMTP

### Installation

```plain
# SMTP - Email protocol
% Testing for open relay
- $ telnet <ip> 25
- $ EHLO
- $ MAIL FROM:<from-mail>
- $ RCPT TO:<to-mail>
- $ DATA
- $ .
```
