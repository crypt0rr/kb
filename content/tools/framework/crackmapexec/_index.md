---
title : "CrackMapExec"
pre : '<i class="far fa-window-restore"></i> '
description : "A swiss army knife for pentesting networks."
date : 2022-02-14T15:18:21+01:00
# hidden : true
# draft : true
weight : 120
tags : ["Framework"]
### a map of Front Matter keys whose values are passed down to the page's descendants unless overwritten by self or a closer ancestor's cascade. 
cascade:
    tags: ['Framework', 'CrackMapExec']
    # pre : '<i class="fas fa-terminal"></i> '
---

---

A swiss army knife for pentesting networks.

## Installation via pipx

```plain
python3 -m pip install pipx
python3 -m pipx ensurepath
git clone https://github.com/byt3bl33d3r/CrackMapExec
cd CrackMapExec
pipx install .
```

On error uninstall `pipx python3 -m pip uninstall` pipx and remove local folder `sudo rm .local/pipx`. Then reinstall as listed above.

### Upgrading current installation

```plain
pipx upgrade crackmapexec
```

## Modules

{{% children depth="1" %}}

## URL List

- [GitHub.com - CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec)
- [PtestMethod.readthedocs.io - CME](https://ptestmethod.readthedocs.io/en/latest/cme.html)
