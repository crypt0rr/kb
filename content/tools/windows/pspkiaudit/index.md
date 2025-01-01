---
title : "PSPKIAudit"
# pre : ' '
description : "PowerShell toolkit for auditing Active Directory Certificate Services (AD CS)."
date : 2021-11-16T15:49:11+01:00
# hidden : true
# draft : true
weight : 260
# tags : ['']
---

---

**NOTE** Please checkout [Abuse ADCS]({{< ref "abuse-adcs" >}}) **instead of using PSPKIAudit**.

---

PowerShell toolkit for auditing Active Directory Certificate Services (AD CS).

## Installation

Download PowerShell script from [Github.com](https://github.com/GhostPack/PSPKIAudit/blob/main/Code/Invoke-PKIAudit.ps1)

## Usage

```plain
Invoke-PKIAudit -CAName <CA-DNS>
```

## Examples

```plain
PS > Invoke-PKIAudit -CAName offsec-CA-2019

  _____   _____ _____  _  _______                   _ _ _
 |  __ \ / ____|  __ \| |/ /_   _|   /\            | (_) |
 | |__) | (___ | |__) | ' /  | |    /  \  _   _  __| |_| |_
 |  ___/ \___ \|  ___/|  <   | |   / /\ \| | | |/ `  | | __|
 | |     ____) | |    | . \ _| |_ / ____ \ |_| | (_| | | |_
 |_|    |_____/|_|    |_|\_\_____/_/    \_\__,_|\__,_|_|\__|
  v0.3.6


[*] Enumerating certificate authorities with Get-AuditCertificateAuthority...



=== Certificate Authority ===


ComputerName            : CA-2019.offsec.local
CAName                  : offsec-CA-2019
ConfigString            : CA-2019.offsec.local\offsec-CA-2019-
IsRoot                  : True
AllowsUserSuppliedSans  : False
VulnerableACL           : False
EnrollmentPrincipals    : NT AUTHORITY\Geverifieerde gebruikers
EnrollmentEndpoints     : http://CA-2019.offsec.local/certsrv/
NTLMEnrollmentEndpoints : http://CA-2019.offsec.local/certsrv/
DACL                    : NT AUTHORITY\Geverifieerde gebruikers (Allow) - Enroll
                          Built-in\Administrators (Allow) - ManageCA, ManageCertificates
                          offsec\Domain Admins (Allow) - ManageCA, ManageCertificates
                          offsec\Enterprise Admins (Allow) - ManageCA, ManageCertificates
Misconfigurations       : ESC8

[!] The above CA is misconfigured!

[*] No vulnerable certificate templates found for this CA.

[*] NOTE: this is not a guarantee that this CA environment is secure!
```

## URL List

- [Github.com - PSPKIAudit](https://github.com/GhostPack/PSPKIAudit)
