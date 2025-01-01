---
title : "Pypykatz"
# pre : ' '
description : "Mimikatz implementation in pure Python. At least a part of it :)"
date : 2020-03-16T12:28:51+01:00
# hidden : true
# draft : true
weight : 360
tags : ['Framework', 'LSASS']
---

---

Mimikatz implementation in pure Python. At least a part of it :)

## Installation

```plain
python3 -m pip install pypykatz
```

## Usage

```plain
usage: pypykatz [-h] [-v] {live,lsa,registry,nt,lm,dcc,dcc2,gppass,dpapi,sake,version,banner} ...
```

## Flags

```plain
Pure Python implementation of Mimikatz --and more--

positional arguments:
  {live,lsa,registry,nt,lm,dcc,dcc2,gppass,dpapi,sake,version,banner}
                        commands
    live                Get secrets from live machine
    lsa                 Get secrets from memory dump
    registry            Get secrets from registry files
    nt                  Generates NT hash of the password
    lm                  Generates LM hash of the password
    dcc                 Generates DCC v1 (domain cached credentials version 1) hash of the password
    dcc2                Generates DCC v2 (domain cached credentials version 2) hash of the password
    gppass              Decrypt GP passwords
    dpapi               DPAPI (offline) related commands
    sake                sake
    version             version
    banner              banner

optional arguments:
  -h, --help            show this help message and exit
  -v, --verbose
```

## Examples

### Read LSASS dump

```plain
pypykatz lsa minidump lsass_dump.DMP
```

## URL List

- [GitHub.com - pypykatz](https://github.com/skelsec/pypykatz)
