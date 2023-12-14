---
title : "MFASweep"
# pre : ' '
description : "MFASweep is a PowerShell script that attempts to log in to various Microsoft services using a provided set of credentials and will attempt to identify if MFA is enabled."
date : 2021-11-03T13:28:24+01:00
# hidden : true
# draft : true
weight : 0
tags : ['M365', 'AzureAD', 'MFA']
---

## MFASweep

MFASweep is a PowerShell script that attempts to log in to various Microsoft services using a provided set of credentials and will attempt to identify if MFA is enabled. Depending on how conditional access policies and other multi-factor authentication settings are configured some protocols may end up being left single factor. It also has an additional check for ADFS configurations and can attempt to log in to the on-prem ADFS server if detected.

Currently MFASweep has the ability to login to the following services:

- Microsoft Graph API
- Azure Service Management API
- Microsoft 365 Exchange Web Services
- Microsoft 365 Web Portal
- Microsoft 365 Web Portal Using a Mobile User Agent
- Microsoft 365 Active Sync
- ADFS

**WARNING: This script attempts to login to the provided account SIX (6) different times (7 if you include ADFS). If you entered an incorrect password this may lock the account out.**

For more information check out the blog post here: [Exploiting MFA Inconsistencies on Microsoft Services.](https://www.blackhillsinfosec.com/exploiting-mfa-inconsistencies-on-microsoft-services/)

## Installation

```plain
git clone https://github.com/dafthack/MFASweep.git
```

[Python3 port of MFASweep](https://github.com/CasperGN/MFASweep.py).

```plain
python3 -m pip install MFASweep.py
```

## Usage

This command will use the provided credentials and attempt to authenticate to the Microsoft Graph API, Azure Service Management API, Microsoft 365 Exchange Web Services, Microsoft 365 Web Portal with both a desktop browser and mobile, and Microsoft 365 Active Sync.

```PowerShell
Invoke-MFASweep -Username targetuser@targetdomain.com -Password Winter2020 
```

This command runs with the default auth methods and checks for ADFS as well.

```PowerShell
Invoke-MFASweep -Username targetuser@targetdomain.com -Password Winter2020 -Recon -IncludeADFS
```

Python port:

```plain
python3 -m mfasweep username domain.com
```

### Individual Modules

Each individual module can be run separately if needed as well.

Microsoft Graph API

```PowerShell
Invoke-GraphAPIAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

Azure Service Management API

```PowerShell
Invoke-AzureManagementAPIAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

Microsoft 365 Exchange Web Services

```PowerShell
Invoke-EWSAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

Microsoft 365 Web Portal

```PowerShell
Invoke-O365WebPortalAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

Microsoft 365 Web Portal w/ Mobile User Agent

```PowerShell
Invoke-O365WebPortalAuthMobile -Username targetuser@targetdomain.com -Password Winter2020 
```

Microsoft 365 Active Sync

```PowerShell
Invoke-O365ActiveSyncAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

ADFS

```PowerShell
Invoke-ADFSAuth -Username targetuser@targetdomain.com -Password Winter2020 
```

## Examples

```plain
$ python3 -m mfasweep john.do example.com
[==  MFASweep.py  ==]
~~: Reconnaissance
[+] example.com uses ADFS on URL: https://example.okta-emea.com/
~~: Office 365 Portal Auth via Browser
[-] Unsuccessful login to O365 Web portal
~~: Office 365 Portal Auth via Mobile
[-] Unsuccessful login to O365 Web portal
~~: Graph API
[-] Unsuccessful login to GraphAPI
~~: Azure Management API
[-] Unsuccessful login to Azure Management API
~~: Office 365 ActiveSync
[!] Valid login to ActiveSync successful
[!] Note: Windows 10 Mail app can connect this way
```

![Example](images/example1.jpg)

## URL List

- [Github.com - MFASweep](https://github.com/dafthack/MFASweep)
- [Github.com - Python port of MFASweep by @dafthack](https://github.com/CasperGN/MFASweep.py)
