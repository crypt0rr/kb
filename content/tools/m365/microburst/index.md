---
title : "MicroBurst"
# pre : ' '
description : "A PowerShell Toolkit for Attacking Azure."
date : 2021-12-01T11:29:53+01:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

MicroBurst includes functions and scripts that support Azure Services discovery, weak configuration auditing, and post exploitation actions such as credential dumping. It is intended to be used during penetration tests where Azure is in use.

## Installation

```plain
Import-Module .\MicroBurst.psm1
dir -Recurse .\MicroBurst-master | Unblock-File
```

Recommended Modules to install:

- [Az](https://docs.microsoft.com/en-us/powershell/azure/new-azureps-module-az?view=azps-3.6.1) - `Install-Module -Name Az`
- [AzureAd](https://docs.microsoft.com/en-us/powershell/module/azuread/?view=azureadps-2.0) - `Install-Module -Name AzureAD`
- [MSOnline](https://docs.microsoft.com/en-us/powershell/module/msonline/?view=azureadps-1.0) - `Install-Module -Name MSOnline`

If you haven't configured the use of PowerShell Gallery, please look at [PowerShell - Enable repository use]({{< ref "powershell#enable-repository-use" >}})

## Examples

### EnumerateAzureSubDomains

Enumeration script for Azure subdomains.

```plain
. .\InvokeEnumerateAzureSubDomains.ps1
Invoke-EnumerateAzureSubDomains -Base <TENANT NAME> -Verbose
```

```plain
PS > Invoke-EnumerateAzureSubDomains -Base offsec -Verbose
VERBOSE: No permutations file found
VERBOSE: Found offsec.onmicrosoft.com
VERBOSE: Found offsec.mail.protection.outlook.com
VERBOSE: Found offsec.sharepoint.com

Subdomain                                       Service                
---------                                       -------                
offsec.mail.protection.outlook.com              Email                  
offsec.onmicrosoft.com                          Microsoft Hosted Domain
offsec.sharepoint.com                           SharePoint
```

## URL List

- [Github.com - MicroBurst](https://github.com/NetSPI/MicroBurst)
- [Github.com - Invoke-EnumerateAzureSubDomains.ps1](https://github.com/NetSPI/MicroBurst/blob/master/Misc/Invoke-EnumerateAzureSubDomains.ps1)

### Related blogs

- [A Beginners Guide to Gathering Azure Passwords](https://blog.netspi.com/a-beginners-guide-to-gathering-azure-passwords/)
- [Anonymously Enumerating Azure Services](https://blog.netspi.com/enumerating-azure-services/)
- [Anonymously Enumerating Azure File Resources](https://blog.netspi.com/anonymously-enumerating-azure-file-resources/)
- [Get-AzurePasswords: Exporting Azure RunAs Certificates for Persistence](https://blog.netspi.com/exporting-azure-runas-certificates/)
- [Using Azure Automation Accounts to Access Key Vaults](https://blog.netspi.com/azure-automation-accounts-key-stores)
- [Running PowerShell on Azure VMs at Scale](https://blog.netspi.com/running-powershell-scripts-on-azure-vms)
- [Maintaining Azure Persistence via Automation Accounts](https://blog.netspi.com/maintaining-azure-persistence-via-automation-accounts/)
- [Decrypting Azure VM Extension Settings with Get-AzureVMExtensionSettings](https://blog.netspi.com/decrypting-azure-vm-extension-settings-with-get-azurevmextensionsettings/)
- [Attacking Azure with Custom Script Extensions](https://blog.netspi.com/attacking-azure-with-custom-script-extensions/)
- [Lateral Movement in Azure App Services](https://blog.netspi.com/lateral-movement-azure-app-services/)
- [Get-AzPasswords: Encrypting Automation Password Data](https://blog.netspi.com/encrypting-password-data-in-get-azpasswords/)
- [Azure Privilege Escalation Using Managed Identities](https://blog.netspi.com/azure-privilege-escalation-using-managed-identities/)
- [Giving Azure a REST – Expanding REST API Capabilities](https://www.netspi.com/blog/technical/cloud-penetration-testing/giving-azure-a-rest/)
- [Azure Persistence with Desired State Configurations](https://www.netspi.com/blog/technical/cloud-penetration-testing/azure-persistence-with-desired-state-configurations/)

### Presentations

- [Adventures in Azure Privilege Escalation - DerbyCon 9](https://www.youtube.com/watch?v=EYtw-XPml0w)
  - [DerbyCon 9 (2019) Slides](https://notpayloads.blob.core.windows.net/slides/Azure-PrivEsc-DerbyCon9.pdf)
- [Attacking Azure Environments with PowerShell - DerbyCon 8](https://www.youtube.com/watch?v=IdORwgxDpkw)
  - [DerbyCon 8 (2018) Slides](https://www.slideshare.net/kfosaaen/derbycon-8-attacking-azure-environments-with-powershell)
  - [BSidesPDX (2018) Slides](https://www.slideshare.net/kfosaaen/bsides-portland-attacking-azure-environments-with-powershell)
