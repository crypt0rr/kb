---
title : "powershell"
# pre : '<i class="fas fa-code"></i> '
description : "Windows Powershell handy commands."
date : 2020-04-16T13:14:28+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Powershell

{{%attachments title="PowerShell and ISE executable" fa_icon_class="far fa-file-code" pattern=".*(exe)"/%}}

### Antimalware Scan Interface (AMSI) bypass generator

<https://amsi.fail>

### Active Directory PowerShell Module

This way the [Active Directory PowerShell](https://docs.microsoft.com/en-us/powershell/module/activedirectory/?view=windowsserver2019-ps) module can be used portable without administrator privileges.

```plain
mkdir C:\temp; iwr https://github.com/crypt0rr/filehosting/raw/master/Microsoft.ActiveDirectory.Management.dll -OutFile C:\temp\1234hoedjevanpapier.dll; Import-Module C:\temp\1234hoedjevanpapier.dll
```

{{%attachments title="PowerShell module" fa_icon_class="far fa-file-code" pattern=".*(dll)"/%}}

PowerShell: `Import-Module C:\ADModule\Microsoft.ActiveDirectory.Management.dll -Verbose`

### Adjust execution policy

```plain
Set-ExecutionPolicy -scope process -execution bypass
```

### Check 'ms-DS-MachineAccountQuota'

```plain
Get-ADObject -Identity ((Get-ADDomain).distinguishedname) `
             -Properties ms-DS-MachineAccountQuota
```

### Finding cpassword

```powershell
findstr /s /n /i /p cpassword $env:logonserver\sysvol\*
```

### Get members of specific group

```plain
Get-ADGroupMember “Domain Admins”
```

```plain
Get-ADGroupMember “Domain Admins” | select SamAccountName
```

### Get details

```plain
$env:logonserver
```

### Check which users home directories you have access to

```plain
gci C:\users\*\*
```

### Enable access to C-drive in Explorer

```plain
subst z: c:\
```

### Check how many computerobjects can be added by a user

```plain
Get-ADObject ((Get-ADDomain).distinguishedname) -Properties ms-DS-MachineAccountQuota
```

### Overview domain admins

Where 'Password Never Expires' is set.

```plain
Get-ADGroupMembers 'Domain Admins' | Foreach-Object {
    Get-ADUser -Filter * -Properties | Select-Object Name,DisplayName,sAMAccountName,PasswordLastSet,PasswordNeverExpires
} | Sort-Object Name, PasswordLastSet, PasswordNeverExpires | Format-Table -AutoSize
```

Where 'Password Never Expires' is NOT set.

```plain
Get-NetGroupMember 'Domain Admins' | Foreach-Object {
    Get-NetUser -Filter * | Select-Object Name,DisplayName,sAMAccountName,PwdLastSet,AccountExpires
} | Sort-Object Select-Object Name,PwdLastSet | Format-Table -AutoSize
```

### Check secureboot enabled

```powershell
Confirm-SecureBootUEFI
```

### List users with PasswordNeverExpires enabled

```powershell
Import-Module ActiveDirectory
Get-ADUser -filter * -properties Name, PasswordNeverExpires | where { $_.passwordNeverExpires -eq "true" } | where {$_.enabled -eq "true" }
```

### List Domain Admins where 'Account is sensitive an cannot be delegated' is not set

```powershell
Import-Module ActiveDirectory
Get-ADGroupMember "Domain Admins" | Get-ADUser -Properties AccountNotDelegated | Where-Object {-not $_.AccountNotDelegated} | select AccountNotDelegated,Name,SamAccountName
```

### Change user agent

```powershell
iwr -UserAgent 'Non existing user agent in use'
```

### Enable repository use

For PowerShell 4 and higher. For 5.1 and higher you can try `Register-PSRepository -default` first otherwise use code below.

```plain
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Install-PackageProvider -Name NuGet -RequiredVersion 2.8.5.208 -Force

Register-PSRepository -Name PSGallery -SourceLocation https://www.powershellgallery.com/api/v2/ -PublishLocation https://www.powershellgallery.com/api/v2/package/ -ScriptSourceLocation https://www.powershellgallery.com/api/v2/items/psscript/ -ScriptPublishLocation https://www.powershellgallery.com/api/v2/package/ -InstallationPolicy Trusted -PackageManagementProvider NuGet

Install-Module $ModuleName -scope CurrentUser
```

### Copy remote file to local (WinRM)

```plain
$ses = New-PSSession -ComputerName DC01 -Credentials $(Get-Credential)
Copy-Item -FromSession $ses C:\Users\adm-johndo\DC01\secrets.txt Z:\localdisk\secrets.txt
```
