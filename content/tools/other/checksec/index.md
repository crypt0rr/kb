---
title : "Checksec"
# pre : ' '
description : "Checksec tool in Python, Rich output, based on LIEF. A simple tool to verify the security properties of your binaries."
date : 2020-10-07T19:34:42+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Checksec

A simple tool to verify the security properties of your binaries.

## Installation

```plain
virtualenv -p python3 venv
source venv/bin/activate
(venv) pip install checksec.py
```

## Usage

```plain
checksec.py [options] <file/directory>...
```

## Flags

```plain
Options:
    -r --recursive                  Walk directories recursively
    -w WORKERS --workers=WORKERS    Specify the number of process pool workers [default: 4]
    -j --json                       Display results as JSON
    -d --debug                      Enable debug output
    -h --help                       Display this message
```

## Examples

![Example](images/example.png)

## URL List

- [GitHub.com - Checksec](https://github.com/Wenzel/checksec.py)
