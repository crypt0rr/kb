---
title : "Postfix"
# pre : ' '
description : "postfix description."
date : 2020-03-13T22:22:53+01:00
# hidden : true
# draft : true
weight : 1350
# tags : ['']
---

---

- Add domain to /etc/postfix/virtual
- Apply config: $ postmap /etc/postfix/virtual
- Add domain to "mydestination" in /etc/postfix/main.cf
- $ systemctl restart postfix
