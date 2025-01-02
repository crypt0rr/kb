---
title : "AzurEnum"
# pre : ' '
description : "Enumerate Microsoft Entra ID (Azure AD) fast."
date : 2024-03-18T13:47:26+01:00
# hidden : true
# draft : true
weight : 50
tags : ['M365', 'AzureAD/EntraID']
---

---

Enumerate some Entra ID (formerly Azure AD) stuff fast, including:

- General information such as number of users, groups, apps, Entra ID license, tenant ID ...
- General security settings such as group creation, consent policy, guest access ...
- Administrative Entra ID roles
- PIM assignments
- Sync status of administrative users
- MFA status of administrative users
- Administrative units
- Dynamic groups
- Named locations
- Conditional access policies
- Credentials in object attributes

The amount of output of the tool will depend on the privileges of your Azure user and the configuration of the target tenant. Although AzurEnum can run as any user, you will get the most out of it when running with global reader privileges or greater reader access.

## Installation

Prerequisite:

```plain
python3 -m pip install msal
```

```plain
git clone https://github.com/SySS-Research/azurenum
```

## Usage

```plain
python3 azurenum.py [-h] [-o OUTPUT_TEXT] [-j OUTPUT_JSON] [-nc] [-ua USER_AGENT] [-t TENANT_ID]
```

## Flags

```plain
  -h, --help                                 show this help message and exit
  -o OUTPUT_TEXT, --output-text OUTPUT_TEXT  specify filename to save TEXT output
  -j OUTPUT_JSON, --output-json OUTPUT_JSON  specify filename to save JSON output (only findings related to insecure settings will be written!)
  -nc, --no-color                            don't use colors
  -ua USER_AGENT, --user-agent USER_AGENT    specify user agent (default is MS-Edge on Windows 10)
  -t TENANT_ID, --tenant-id TENANT_ID        specify tenant to authenticate to
```

## Examples

```plain
$ python3 azurenum.py   
        
[+] To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code DG8UKC4U9 to authenticate.
[+] Got access token for Microsoft Graph with client ID d3590ed6-52b3-4102-aeff-1337
[+] Gathering additional access tokens for other FOCI clients and resources ...
[+] In order to grab the PIM assignments later, you need to authenticate a second time
[+] To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code CB442ENW8 to authenticate.
[+] Got access token for Microsoft Graph with client ID 386ce8c0-7421-48c9-a1df-1337
[+] Running as johndoe@offsec.nl
[+] Gathering information ............

#################################################
# Basic information
#################################################

[+] TenantID: b5d74793-0a6b-4865-aeeb-1337
[+] License: Microsoft Entra ID Free
[+] Size quota: 199/300000
[+] Display name: OffsecNL
[+] On Premises Sync: Disabled
[+] Users: 1
[+] Guest Users: 0/1 (0.0 %)
[+] Pending invitations: 0
[+] Users with no MFA methods: 0/1 (0.0 %) - Experimental, may flag 100% of users!
[+] Groups: 0
[+] Modifiable groups: 0 (Get them with `az ad group list | jq '.[] | select(.visibility == "Public").displayName'`)
[+] Service Principals: 161 (aka. "Enterprise applications")
[+] Service Principals with AppRegs in this tenant: 0
[+] Application Definitions: 0 (aka. "App registrations")
[+] Subscriptions: 0

[+] Lockout Threshold: 10
[+] Lockout Duration Seconds: 60

[+] Check if "Security Defaults" are enabled: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Properties

#################################################
# General user settings
#################################################

[+] Portal: https://portal.azure.com/?feature.msaljs=false#view/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/~/UserSettings
[M] Allow user consent for apps
[+] Portal: https://portal.azure.com/?feature.msaljs=false#view/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/~/AdminConsentSettings
[+] Users can request admin consent to apps they are unable to consent to: false

[+] Portal: NOT visible in the Portal!
[+] Users can read other users information (You can actually block this with the Graph API!)

[+] Portal: https://portal.azure.com/?feature.msaljs=false#view/Microsoft_AAD_UsersAndTenants/UserManagementMenuBlade/~/UserSettings
[L] Users can register applications
[L] Users can create tenants

[+] Portal: https://portal.azure.com/?feature.msaljs=false#view/Microsoft_AAD_IAM/AllowlistPolicyBlade
[M] Anyone in the organization can invite guest users including guests and non-admins (most inclusive)
[L] Guest users have limited access to properties and memberships of directory objects

[+] Portal: https://portal.azure.com/?feature.msaljs=false#view/Microsoft_AAD_IAM/GroupsManagementMenuBlade/~/General
[L] Users can create m365 groups
[L] Users can create security groups


#################################################
# Device Settings
#################################################

[+] Portal: https://portal.azure.com/#view/Microsoft_AAD_Devices/DevicesMenuBlade/~/DeviceSettings/menuId~/null
[+] If "Users may join devices to Azure AD" is enabled you may be able to create BPRT users, bypass the device quota, and provoke DoS: https://aadinternals.com/post/bprt/
[M] Users can recover Bitlocker Keys of owned devices
```

## URL list

- [Github.com - AzureEnum](https://github.com/SySS-Research/azurenum)
- [Blog.syss.com - Introducing AzurEnum](https://blog.syss.com/posts/introducing-azurenum)
