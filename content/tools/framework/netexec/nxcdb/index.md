---
title : "nxcdb"
# pre : ' '
description : "Database containing credentials captured."
date : 2023-10-05T12:44:28+02:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

nxcdb is default installed with your installation of [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
nxcdb
```

### Switch protocols

```plain
proto smb
proto ldap
```

### Dump captured passwords plaintext

```plain
nxcdb (default)(smb) > export creds plaintext plain.txt
[+] creds exported
nxcdb (default)(smb) >
```
