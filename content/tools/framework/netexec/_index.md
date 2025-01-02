---
title : "NetExec"
pre : '<i class="far fa-window-restore"></i> '
description : "The Network Execution Tool."
date : 2023-10-05T12:20:14+02:00
# hidden : true
# draft : true
weight : 270
tags : ["Framework"]
### a map of Front Matter keys whose values are passed down to the page's descendants unless overwritten by self or a closer ancestor's cascade. 
cascade:
    tags: ['Framework', 'NetExec']
    # pre : '<i class="fas fa-terminal"></i> '
---

---

This project was initially created in 2015 by @byt3bl33d3r, known as CrackMapExec. In 2019 @mpgn_x64 started maintaining the project for the next 4 years, adding a lot of great tools and features. In September 2023 he retired from maintaining the project.

Along with many other contributers, we (NeffIsBack, Marshall-Hallenbeck, and zblurx) developed new features, bugfixes, and helped maintain the original project CrackMapExec. During this time, with both a private and public repository, community contributions were not easily merged into the project. The 6-8 month discrepancy between the code bases caused many development issues and heavily reduced community-driven development. With the end of mpgn's maintainer role, we (the remaining most active contributors) decided to maintain the project together as a fully free and open source project under the new name NetExec 🚀 Going forward, our intent is to maintain a community-driven and maintained project with regular updates for everyone to use.

You are on the latest up-to-date repository of the project NetExec (nxc) !

## Installation via pipx

```plain
python3 -m pip install pipx
pipx install git+https://github.com/Pennyw0rth/NetExec
```

On error uninstall `pipx python3 -m pip uninstall` pipx and remove local folder `sudo rm .local/pipx`. Then reinstall as listed above.

### Upgrading current installation

```plain
pipx upgrade NetExec
```

## Modules

{{% children depth="1" %}}

## URL List

- [NetExec.wiki](https://www.netexec.wiki/)
