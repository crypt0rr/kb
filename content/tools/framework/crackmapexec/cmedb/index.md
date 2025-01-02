---
title : "cmedb"
# pre : ' '
description : "Database containing credentials captured."
date : 2022-02-14T18:33:53+01:00
# hidden : true
# draft : true
weight : 80
# tags : ['']
---

---

cmedb is default installed with your installation of [CrackMapExec]({{< ref "../" >}}).

## Usage

```plain
cmedb
```

### Switch protocols

```plain
proto smb
proto ldap
```

### Dump captured passwords plaintext

```plain
cmedb (default)(smb) > export creds plaintext plain.txt
[+] creds exported
cmedb (default)(smb) >
```
