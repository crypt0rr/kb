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

### Prerequisites

Install PowerShell Azure Module `Install-Module -Name Az`

{{%attachments title="Related files" fa_icon_class="far fa-file-code" pattern=".*(ps1)"/%}}

### Usage

Import the `.ps1`

```plain
. .\AzureHound.ps1
```

Connect to AzureAD.

```plain
Connect-AZAccount
```

Run AzureHound

```plain
Invoke-AzureHound -Install
```

### Examples

```plain
PS C:\Users\ops > . .\AzureHound.ps1
PS C:\Users\ops > Connect-AZAccount

Account                        SubscriptionName    TenantId                             Environment
-------                        ----------------    --------                             -----------
johndo@example.com             example-prd         1cd4303[...SNIP...]2d6530b           AzureCloud

PS C:\Users\ops > Invoke-AzureHound -Install

Untrusted repository
You are installing the modules from an untrusted repository. If you trust this repository, change its InstallationPolicy value by running the Set-PSRepository cmdlet. Are you sure you want to install the modules from 'PSGallery'?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): A

[...SNIP...]
Writing JSON chunk 1/1
Done processing application to service principal relations
Processing Application Admins
Writing output for applicationadmins
Chunking output in 250 item sections
Done processing Application Admins
Processing Cloud Application Admins
Writing output for cloudappadmins
Chunking output in 250 item sections
Done processing Cloud Application Admins
Compressing files
Zip file created: C:\Users\ops\2021112345634-azurecollection.zip
Done! Drag and drop the zip into the BloodHound GUI to import data.
Account                Environment      TenantId                          TenantDomain                      AccountType
-------                -----------      --------                          ------------                      -----------
johndo@example.com     AzureCloud       1cd4303[...SNIP...]2d6530         1cd4303[...SNIP...]2d6530         AccessToken
```

### URL list

* [Github.com - BloodHound](https://github.com/BloodHoundAD/BloodHound/)
* [Github.com - AzureHound Collector](https://github.com/BloodHoundAD/BloodHound/blob/master/Collectors/AzureHound.ps1)
* [Github.com - Bloodhound-CustomQueries - Azure](https://github.com/ZephrFish/Bloodhound-CustomQueries/blob/main/customqueries.json)
