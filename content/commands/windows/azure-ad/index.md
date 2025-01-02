---
title : "azureAD/EntraID"
# pre : '<i class="fas fa-code"></i> '
description : "Microsoft Azure AD commands."
date : 2020-07-07T14:25:09+02:00
# hidden : true
# draft : true
weight : 10
tags : ['Commands', 'AzureAD/EntraID']
---

---

Please check [Roadrecon]({{< ref "roadrecon" >}}), [MFASweep]({{< ref "mfasweep" >}}), [AzureHound]({{< ref "bloodhound" >}}) and [Azure Active Directory - Rootsecdev](https://github.com/rootsecdev/Azure-Red-Team)

{{%resources title="Presentation from Antonio Formato of Cyber Saiyan" fa_icon_class="far fa-file-pdf" pattern=".*(pdf)"/%}}

## Installation

```powershell
Install-Module AzureAD
```

## Usage

First authenticate

```powershell
$AzureAdCred = Get-Credential
Connect-AzureAD -Credential $AzureAdCred
```

## Examples

### Get-AzureADUser

```powershell
PS C:\Users\Commando-B > Get-AzureADUser

ObjectId                             DisplayName               UserPrincipalName                       UserType
--------                             -----------               -----------------                       --------
cb404750-4ae1-[REDACTED]             John Do                   john.do@offsec.nl                      Member
b4e1ee94-0ad8-[REDACTED]             Jane DO                   jane.do@offsec.nl                      Member
d2a782cb-838e-[REDACTED]             Administrator             admin@offsec.nl.onmicrosoft.com           Member
```

### Get-AzureADGroup

```powershell
PS C:\Users\Commando-B > Get-AzureADGroup

ObjectId                             DisplayName                        Description
--------                             -----------                        -----------
005863b2-5fea-[REDACTED]             Testgroup 1                        Just a test group
00ad7bf9-f06d-[REDACTED]             Testgroup 2                        Just another test group
```

## URL List

- [posts.specterops.io](https://posts.specterops.io/requesting-azure-ad-request-tokens-on-azure-ad-joined-machines-for-browser-sso-2b0409caad30?gi=7d52b34697d0)
- [DirkJanM.io PrivEsc](https://dirkjanm.io/azure-ad-privilege-escalation-application-admin/)
- [DirkJanM.io RoadRecon](https://dirkjanm.io/introducing-roadtools-and-roadrecon-azure-ad-exploration-framework/)
