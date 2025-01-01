---
title : "Pwndb"
# pre : ' '
description : "pwndb.py is a python command-line tool for searching leaked credentials using the Onion service with the same name."
date : 2021-02-08T10:41:37+01:00
# hidden : true
# draft : true
weight : 240
# tags : ['']
---

---

`pwndb.py` is a python command-line tool for searching leaked credentials using the Onion service with the same name.

## Installation

```plain
$ git clone https://github.com/davidtavarez/pwndb
Cloning into 'pwndb'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 10 (delta 2), reused 4 (delta 0), pack-reused 0
Unpacking objects: 100% (10/10), done.

$ cd pwndb

$ virtualenv venv
New python executable in /Users/davidtavarez/pwndb/venv/bin/python
Installing setuptools, pip, wheel...done.

$ source venv/bin/activate

(venv) $ pip install -r requirements.txt
Collecting PySocks==1.6.8 (from -r requirements.txt (line 1))
...

(venv) $ python pwndb.py -h

usage: pwndb.py [-h] [--target TARGET] [--list LIST] [--output OUTPUT]

optional arguments:
  -h, --help       show this help message and exit
  --target TARGET  Target email/domain to search for leaks.
  --list LIST      A list of emails in a file to search for leaks.
  --output OUTPUT  Return results as json/txt
```

## Usage

```plain
pwndb.py [-h] [--target TARGET] [--list LIST] [--output OUTPUT]
```

## Flags

```plain
optional arguments:
  -h, --help       show this help message and exit
  --target TARGET  Target email/domain to search for leaks.
  --list LIST      A list of emails in a file to search for leaks.
  --output OUTPUT  Return results as json/txt
```

## URL List

- [Github.com - pwndb](https://github.com/davidtavarez/pwndb)
