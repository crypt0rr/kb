---
title : "adPEAS"
# pre : ' '
description : "adPEAS is a Powershell tool to automate Active Directory enumeration."
date : 2022-02-10T13:51:12+01:00
# hidden : true
# draft : true
weight : 50
tags : ['Other', 'Active Directory']
---

---

adPEAS is a Powershell tool to automate Active Directory enumeration. In fact, adPEAS is like a wrapper for different other cool projects like

- PowerView
- Empire
- Bloodhound
- and some own written lines of code

As said, adPEAS is a wrapper for other tools. They are almost all written in pure Powershell but some of them are included as compressed binary blob or C# code.

adPEAS-Light is a version without Bloodhound and vulnerability checks and it is more likely that it will not blocked by an AV solution.

### How It Works

adPEAS can be run simply by starting the script via 'invoke-adPEAS' if it is started on a domain joined computer. If the system you are running adPEAS from is not domain joined or you want to enumerate another domain, use a certain domain controller to connect to, use different credentials or just to enumerate for credential exposure only, you can do it by using defined parameters.

### adPEAS Modules

adPEAS consists of the following enumeration modules:

- Domain - Searching for basic Active Directory information, like Domain Controllers, Sites und Subnets, Trusts and DCSync rights
- CA - Searching for basic Enterprise Certificate Authority information, like CA Name, CA Server and Templates
- Creds - Searching for different kind of credential exposure, like ASREPRoast, Kerberoasting, GroupPolicies, Netlogon scripts, LAPS, gMSA, certain account attributes, e.g. UnixPassword, etc.
- Delegation - Searching for delegation issues, like 'Constrained Delegation', 'Unconstrained Delegation' and 'Resource Based Unconstrained Delegation', for computer and user accounts
- Accounts - Searching for high privileged user accounts in predefined groups, account issues like e.g. password not expire
- Computer - Enumerating Domain Controllers, CA and Exchange server, with the switch -Vulns it checks the systems for EternalBlue, BlueKeep, ZeroLogon and critical Exchange vulnerabilities
- Bloodhound - Enumerating Active Directory with BloodHound

## Installation

Download newest `.zip` file from [Github.com](https://github.com/61106960/adPEAS/archive/refs/heads/main.zip).

## Usage

```plain
Import-Module .\adPEAS.ps1
Invoke-adPEAS -Domain 'contoso.com' | Out-File output.txt
```

## Flags

Check the [Github repo](https://github.com/61106960/adPEAS).

## Examples

```plain
PS > Invoke-adPEAS -Domain 'contoso.com' | Out-File output.txt

adPEAS version 0.7.9
Checking Domain - Details for Domain 'offsec.nl':


Domain Name             : offsec.nl
Domain SID              : S-1-5-21-3509477529-2169914037-1395257886
Domain Functional Level : Windows 2016
Forest Name             : offsec.nl
Forest Children         : No Subdomain[s] available
Domain Controller       : SRV2019.offsec.nl
                          SRV2022.offsec.nl

Checking Password Policy - Details for Domain 'offsec.nl':
Minimum Password Age    : 1 days
Maximum Password Age    : 42 days
Minimum Password Length : 7 character
Password Complexity     : Enabled
Lockout Account         : Disabled
Reversible Encryption   : Disabled

Checking Kerberos Policy - Details for Domain 'offsec.nl':
Maximum Age of TGT            : 10 hours
Maximum Age of TGS            : 600 minutes
Maximum Clock Time Difference : 5 minutes
Krbtgt Password Last Set      : 2/5/2022 9:36:56 AM

Checking Domain Controller - Details for Domain 'offsec.nl':
DC Host Name  : SRV2019.offsec.nl
DC IP Address : 10.20.30.10
Site Name     : Default-First-Site-Name
Domain        : offsec.nl
[...]
```

{{%resources title="Example output" fa_icon_class="far fa-file" pattern=".*(txt)"/%}}

## URL List

- [Github.com - adPEAS](https://github.com/61106960/adPEAS)
