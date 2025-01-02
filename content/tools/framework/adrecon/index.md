---
title : "ADRecon"
# pre : ' '
description : "ADRecon is a tool which gathers information about the Active Directory and generates a report which can provide a holistic picture of the current state of the target AD environment.."
date : 2023-10-29T17:20:29+01:00
# hidden : true
# draft : true
weight : 30
tags : ['Framework', 'Active Directory']
---

---

ADRecon is a tool which extracts and combines various artefacts (as highlighted below) out of an AD environment. The information can be presented in a specially formatted Microsoft Excel report that includes summary views with metrics to facilitate analysis and provide a holistic picture of the current state of the target AD environment.

The tool is useful to various classes of security professionals like auditors, DFIR, students, administrators, etc. It can also be an invaluable post-exploitation tool for a penetration tester.

It can be run from any workstation that is connected to the environment, even hosts that are not domain members. Furthermore, the tool can be executed in the context of a non-privileged (i.e. standard domain user) account. Fine Grained Password Policy, LAPS and BitLocker may require Privileged user accounts. The tool will use Microsoft Remote Server Administration Tools (RSAT) if available, otherwise it will communicate with the Domain Controller using LDAP.

The following information is gathered by the tool:

- Forest;
- Domain;
- Trusts;
- Sites;
- Subnets;
- Schema History;
- Default and Fine Grained Password Policy (if implemented);
- Domain Controllers, SMB versions, whether SMB Signing is supported and FSMO roles;
- Users and their attributes;
- Service Principal Names (SPNs);
- Groups, memberships and changes;
- Organizational Units (OUs);
- GroupPolicy objects and gPLink details;
- DNS Zones and Records;
- Printers;
- Computers and their attributes;
- PasswordAttributes (Experimental);
- LAPS passwords (if implemented);
- BitLocker Recovery Keys (if implemented);
- ACLs (DACLs and SACLs) for the Domain, OUs, Root Containers, GPO, Users, Computers and Groups objects (not included in the default collection method);
- GPOReport (requires RSAT);
- Kerberoast (not included in the default collection method); and
- Domain accounts used for service accounts (requires privileged account and not included in the default collection method).

## Installation

### Prerequisites

- .NET Framework 3.0 or later (Windows 7 includes 3.0)
- PowerShell 2.0 or later (Windows 7 includes 2.0)
  - Powershell Core on Windows is supported (Tested on PowerShell v7.2.2 running on Windows 10)
- A Windows host (Powershell for Linux/macOS is not supported)

### Optional

- Microsoft Excel (to generate the report)
- Remote Server Administration Tools (RSAT):
  - Windows 10 (October 2018 Update or 1809 and later), RSAT is included as a set of `Features on Demand`.
    - Click on Start --> Settings --> Apps --> Apps & features --> Manage optional features --> Add a feature --> Select the following:
      - RSAT: Active Directory Domain Services and Lightweight Directory Services Tools
      - RSAT: Group Policy Management Tools
  - Windows 10 (<https://www.microsoft.com/en-au/download/details.aspx?id=45520>)
  - Windows 7 (<https://www.microsoft.com/en-au/download/details.aspx?id=7887>)

### Downloading

```plain
git clone https://github.com/adrecon/ADRecon.git
```

Otherwise, you can [download a zip archive of the latest release](https://github.com/adrecon/ADRecon/archive/master.zip)

## Usage

To run ADRecon on a domain member host.

```plain
PS C:\> .\ADRecon.ps1
```

To run ADRecon on a domain member host as a different user.

```plain
PS C:\>.\ADRecon.ps1 -DomainController <IP or FQDN> -Credential <domain\username>
```

To run ADRecon on a non-member host using LDAP.

```plain
PS C:\>.\ADRecon.ps1 -Method LDAP -DomainController <IP or FQDN> -Credential <domain\username>
```

To run ADRecon with specific modules on a non-member host with RSAT. (Default OutputType is STDOUT with -Collect parameter)

```plain
PS C:\>.\ADRecon.ps1 -Method ADWS -DomainController <IP or FQDN> -Credential <domain\username> -Collect Domain, DomainControllers
```

To generate the ADRecon-Report.xlsx based on ADRecon output (CSV Files).

```plain
PS C:\>.\ADRecon.ps1 -GenExcel C:\ADRecon-Report-<timestamp>
```

## Flags

```plain
-Method <String>
    Which method to use; ADWS (default), LDAP

-DomainController <String>
    Domain Controller IP Address or Domain FQDN.

-Credential <PSCredential>
    Domain Credentials.

-GenExcel <String>
    Path for ADRecon output folder containing the CSV files to generate the ADRecon-Report.xlsx. Use it to generate the ADRecon-Report.xlsx when Microsoft Excel is not installed on the host used to run ADRecon.

-OutputDir <String>
    Path for ADRecon output folder to save the CSV/XML/JSON/HTML files and the ADRecon-Report.xlsx. (The folder specified will be created if it doesn't exist) (Default pwd)

-Collect <String>
    Which modules to run (Comma separated; e.g Forest,Domain. Default all except ACLs, Kerberoast and DomainAccountsusedforServiceLogon)
    Valid values include: Forest, Domain, Trusts, Sites, Subnets, SchemaHistory, PasswordPolicy, FineGrainedPasswordPolicy, DomainControllers, Users, UserSPNs, PasswordAttributes, Groups, GroupChanges, GroupMembers, OUs, ACLs, GPOs, gPLinks, GPOReport, DNSZones, DNSRecords, Printers, Computers, ComputerSPNs, LAPS, BitLocker, Kerberoast DomainAccountsusedforServiceLogon.

-OutputType <String>
    Output Type; Comma seperated; e.g CSV,STDOUT,Excel (Default STDOUT with -Collect parameter, else CSV and Excel).
    Valid values include: STDOUT, CSV, XML, JSON, HTML, Excel, All (excludes STDOUT).

-DormantTimeSpan <Int>
    Timespan for Dormant accounts. (Default 90 days)

-PassMaxAge <Int>
    Maximum machine account password age. (Default 30 days)

-PageSize <Int>
    The PageSize to set for the LDAP searcher object. (Default 200)

-Threads <Int>
    The number of threads to use during processing objects (Default 10)

-OnlyEnabled <Bool>
    Only collect details for enabled objects.

-Log <Switch>
    Create ADRecon Log using Start-Transcript

-Logo <String>
    Which Logo to use in the excel file? (Default ADRecon)
    Values include: ADRecon, CyberCX, Payatu.
```

## Examples

### Without Microsoft Excel Installed

Initiated from machine configured with Mandiant [commando-vm](https://github.com/mandiant/commando-vm) + all RSAT modules.

```plain
PS C:\Users\crypt0rr\Downloads\ADRecon-master > .\ADRecon.ps1 -DomainController DC01.offsec.nl -Credential offsec.nl\crypt0rr
[*] ADRecon v1.27 by Prashant Mahajan (@prashant3535)
[*] Running on WORKGROUP\COMMANDO - Standalone Workstation as offsec.nl\crypt0rr
[*] Commencing - 10/29/2023 16:23:58
[-] Domain
[-] Forest
[-] Trusts
[-] Sites
[-] Subnets
[-] SchemaHistory - May take some time
[-] Default Password Policy
[-] Fine Grained Password Policy - May need a Privileged Account
[-] Domain Controllers
[-] Users and SPNs - May take some time
[-] PasswordAttributes - Experimental
[-] Groups and Membership Changes - May take some time
[-] Group Memberships - May take some time
[-] OrganizationalUnits (OUs)
[-] GPOs
[-] gPLinks - Scope of Management (SOM)
[-] DNS Zones and Records
[-] Printers
[-] Computers and SPNs - May take some time
[-] LAPS - Needs Privileged Account to get the passwords
WARNING: [*] LAPS is not implemented.
[-] BitLocker Recovery Keys - Needs Privileged Account
[-] GPOReport - May take some time
WARNING: [*] Run the tool using RUNAS.
WARNING: [*] runas /user:<Domain FQDN>\<Username> /netonly powershell.exe
[*] Total Execution Time (mins): 1.14
[*] Output Directory: C:\Users\crypt0rr\Downloads\ADRecon-master\ADRecon-Report-20231029162358
WARNING: [Get-ADRExcelComObj] Excel does not appear to be installed. Skipping generation of ADRecon-Report.xlsx. Use the -GenExcel parameter to generate the ADRecon-Report.xslx
on a host with Microsoft Excel installed.
```

#### Results from a Run Without Excel

{{%resources fa_icon_class="far fa-file-archive" pattern="ADRecon-Report-20231029162358.(zip)"/%}}

### With Microsoft Excel Installed

Initiated from machine configured with Mandiant [commando-vm](https://github.com/mandiant/commando-vm) + all RSAT modules and the Microsoft Office Suite.

```plain
PS C:\Users\crypt0rr\Downloads\ADRecon-master > .\ADRecon.ps1 -DomainController DC01.offsec.nl -Credential offsec.nl\crypt0rr
[*] ADRecon v1.27 by Prashant Mahajan 
[*] Running on WORKGROUP\COMMANDO - Standalone Workstation as offsec.nl\crypt0rr
[*] Commencing - 10/29/2023 16:40:38
[-] Domain
[-] Forest
[-] Trusts
[-] Sites
[-] Subnets
[-] SchemaHistory - May take some time
[-] Default Password Policy
[-] Fine Grained Password Policy - May need a Privileged Account
[-] Domain Controllers
[-] Users and SPNs - May take some time
[-] PasswordAttributes - Experimental
[-] Groups and Membership Changes - May take some time
[-] Group Memberships - May take some time
[-] OrganizationalUnits (OUs)
[-] GPOs
[-] gPLinks - Scope of Management (SOM)
[-] DNS Zones and Records
[-] Printers
[-] Computers and SPNs - May take some time
[-] LAPS - Needs Privileged Account to get the passwords
WARNING: [*] LAPS is not implemented.
[-] BitLocker Recovery Keys - Needs Privileged Account
[-] GPOReport - May take some time
WARNING: [*] Run the tool using RUNAS.
WARNING: [*] runas /user:<Domain FQDN>\<Username> /netonly powershell.exe
[*] Total Execution Time (mins): 0.43
[*] Output Directory: C:\Users\crypt0rr\Downloads\ADRecon-master\ADRecon-Report-20231029164038
[*] Generating ADRecon-Report.xlsx
[+] Excelsheet Saved to: C:\Users\crypt0rr\Downloads\ADRecon-master\ADRecon-Report-20231029164038\offsec.nl-ADRecon-Report.xlsx
```

#### Results from a Run With Excel

{{%resources fa_icon_class="far fa-file-archive" pattern="ADRecon-Report-20231029164038.(zip)"/%}}

## URL list

- [Github.com - ADRecon](https://github.com/adrecon/ADRecon)
