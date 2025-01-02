---
title : "MSOLSpray"
# pre : ' '
description : "A password spraying tool for Microsoft Online accounts (Azure/O365)."
date : 2020-04-02T11:48:31+02:00
# hidden : true
# draft : true
weight : 130
tags : ['M365', 'Passwordspray']
---

---

A password spraying tool for Microsoft Online accounts (Azure/O365).

## Installation

Download newest release from [Github.com](https://github.com/dafthack/MSOLSpray/archive/master.zip)

## Usage

```plain
Import-Module MSOLSpray.ps1
Invoke-MSOLSpray -UserList .\userlist.txt -Password Winter2020
```

## Flags

```plain
UserList  - UserList file filled with usernames one-per-line in the format "user@domain.com"
Password  - A single password that will be used to perform the password spray.
OutFile   - A file to output valid results to.
Force     - Forces the spray to continue and not stop when multiple account lockouts are detected.
URL       - The URL to spray against. Potentially useful if pointing at an API Gateway URL generated with something like FireProx to randomize the IP address you are authenticating from.
```

## URL List

- [GitHub.com - MSOLSpray](https://github.com/dafthack/MSOLSpray)
