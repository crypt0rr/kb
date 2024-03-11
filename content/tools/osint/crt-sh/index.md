---
title : "crt.sh"
# pre : ' '
description : "Certificate Search."
date : 2020-07-06T15:34:48+02:00
# hidden : true
# draft : true
weight : 0
tags : ['OSINT', 'DNS', 'Certificates']
---

## crt.sh

Certificate search.

[crt.sh](https://crt.sh)

## API

Replace `offsec.nl` with the target domain.

```plain
$ curl -s https://crt.sh/\?q\=offsec.nl\&output\=json | jq -r '.[].name_value' | sed 's/\*\.//g' | sort -u
cyberchef.offsec.nl
dork.offsec.nl
dorks.offsec.nl
googledorks.offsec.nl
kb.offsec.nl
lock.offsec.nl
mha.offsec.nl
msportals.offsec.nl
offsec.nl
pw.offsec.nl
saf.offsec.nl
temp.offsec.nl
temp2.offsec.nl
test.offsec.nl
```

## Examples

![Example](images/example1.png)
![Example](images/example2.png)
![Example](images/example3.png)

## URL List

- [Github.com - crtsh](https://github.com/crtsh)
- [Sectigo.com](https://sectigo.com/)
