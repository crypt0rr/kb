---
title : "KeeFarce"
# pre : ' '
description : "KeeFarce allows for the extraction of KeePass 2.x password database information from memory. The cleartext information, including usernames, passwords, notes and url's are dumped into a CSV file in %AppData%"
date : 2022-02-02T13:48:08+01:00
# hidden : true
# draft : true
weight : 970
tags : ['Other', 'KeePass']
---

---

KeeFarce allows for the extraction of KeePass 2.x password database information from memory. The cleartext information, including usernames, passwords, notes and url's are dumped into a CSV file in %AppData%

KeeFarce uses DLL injection to execute code within the context of a running KeePass process. C# code execution is achieved by first injecting an architecture-appropriate bootstrap DLL. This spawns an instance of the dot net runtime within the appropriate app domain, subsequently executing KeeFarceDLL.dll (the main C# payload).

The KeeFarceDLL uses [CLRMD](https://github.com/Microsoft/dotnetsamples/tree/master/Microsoft.Diagnostics.Runtime/CLRMD) to find the necessary object in the KeePass processes heap, locates the pointers to some required sub-objects (using offsets), and uses reflection to call an export method.

## Installation

Download the needed files below.

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

## Usage

```plain
.\KeeFarce.exe
```

## Examples

```plain
$ .\KeeFarce.exe
[.] Injecting BootstrapDLL into 9128
CallExport: returning.
[.] Done! Check %APPDATA%/keepass_export.csv
```

## URL List

- [Github.com - KeeFarce](https://github.com/denandz/KeeFarce)
