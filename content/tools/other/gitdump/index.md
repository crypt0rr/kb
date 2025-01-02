---
title : "GitDump"
# pre : ' '
description : "GitDump dumps the source code from .git when the directory traversal is disabled."
date : 2021-07-10T15:06:22+02:00
# hidden : true
# draft : true
weight : 740
tags : ['Other', 'macOS', 'Windows', 'Linux']
---

---

Dumps the source code from .git when the directory traversal is disabled.

## Installation

```plain
git clone https://github.com/Ebryx/GitDump.git
```

Requirements:

- Python3

Tested on:

- Windows
- Kali Linux

How it works:

- Fetch all common files (.git/index, .git/HEAD, .git/ORIG_HEAD, etc.).
- Find as many objects (sha1) as possible by analyzing .git/packed-refs, .git/index, etc.
- Download idx and pack files.
- Now you can run git checkout -- . to retrieve source code.

## Usage

```plain
$ python3 git-dump.py   
Please provide website URL with /.git/ directory e.g. example.com/.git/
```

- python3 git-dump.py <https://website.com/.git/>
- Create the output directory and dump all the .git files in it.
- After running above script type: `cd output && git checkout -- .`
- It will recover all source code.

## URL List

- [Github.com - GitDump](https://github.com/Ebryx/GitDump)
