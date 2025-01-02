---
title : "Coercer"
pre : '<i class="far fa-window-restore"></i> '
description : "A python script to automatically coerce a Windows server to authenticate on an arbitrary machine through 9 methods."
date : 2022-09-16T11:58:17+02:00
# hidden : true
# draft : true
weight : 110
tags : ['Framework', 'Coercer']
cascade:
    tags: ['Framework', 'Coercer']
    # pre : '<i class="fas fa-terminal"></i> '
---

---

A python script to automatically coerce a Windows server to authenticate on an arbitrary machine through 9 methods.

## Features

- Core:
  - [x] Lists open SMB pipes on the remote machine (in modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) authenticated and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md) authenticated)
  - [x] Tries to connect on a list of known SMB pipes on the remote machine (in modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) unauthenticated and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md) unauthenticated)
  - [x] Calls one by one all the vulnerable RPC functions to coerce the server to authenticate on an arbitrary machine.
  - [x] Random UNC paths generation to avoid caching failed attempts (all modes)
  - [x] Configurable delay between attempts with `--delay`
- Options:
  - [x] Filter by method name with `--filter-method-name`, by protocol name with `--filter-protocol-name` or by pipe name with `--filter-pipe-name` (all modes)
  - [x] Target a single machine `--target` or a list of targets from a file with `--targets-file`
  - [x] Specify IP address OR interface to listen on for incoming authentications. (modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md))
- Exporting results
  - [x] Export results in SQLite format (modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md))
  - [x] Export results in JSON format (modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md))
  - [x] Export results in XSLX format (modes [scan](https://github.com/p0dalirius/Coercer/blob/master/documentation/Scan-mode.md) and [fuzz](https://github.com/p0dalirius/Coercer/blob/master/documentation/Fuzz-mode.md))

## Installation

```plain
sudo python3 -m pip install coercer
```

## Modules

{{% children depth="1" %}}

## URL List

- [Github.com - Coercer](https://github.com/p0dalirius/Coercer)
