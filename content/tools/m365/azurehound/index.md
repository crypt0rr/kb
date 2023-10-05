---
title : "AzureHound"
# pre : ' '
description : "AzureAD focused module to gather information."
date : 2021-12-20T14:51:22+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## AzureHound

Please go to [BloodHound]({{< ref "bloodhound" >}}) after gathering information with AzureHound.

Custom queries for finding interesting stuff <https://hausec.com/2020/11/23/azurehound-cypher-cheatsheet/>.

## Prerequisites

- Download newest release of AzureHound from [Github.com](https://github.com/BloodHoundAD/AzureHound/releases)
- Download `pre-AzureHound.ps1` from below

{{%attachments fa_icon_class="far fa-file-code" pattern=".*(ps1)"%}}

## Usage

```plain
PS > .\pre-AzureHound.ps1 -FQDN "offsec.onmicrosoft.com"
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code 1234 to authenticate.

Press any key to continue ...
Ready to run AzureHound.exe:
.\AzureHound.exe -r '0.AUc[...]A6Tw' list --tenant 'offsec.onmicrosoft.com' -o output.json
```

## URL List

- [Github.com - BloodHound](https://github.com/BloodHoundAD/BloodHound/)
- [Github.com - AzureHound Collector](https://github.com/BloodHoundAD/BloodHound/blob/master/Collectors/AzureHound.ps1)
- [Github.com - Bloodhound-CustomQueries - Azure](https://github.com/ZephrFish/Bloodhound-CustomQueries/blob/main/customqueries.json)
