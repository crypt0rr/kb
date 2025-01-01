---
title : "Invoke-AADIntReconAsOutsider"
# pre : ' '
description : "Starts tenant recon of the given domain."
date : 2024-01-06T14:02:06+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Starts tenant recon of the given domain.

## Installation

Install [AADInternals]({{< ref "aadinternals" >}})

## Usage

```plain
Invoke-AADIntReconAsOutsider
```

## Flags

```plain
SYNTAX
    Invoke-AADIntReconAsOutsider -DomainName <String> [-Single] [-GetRelayingParties] [<CommonParameters>]

    Invoke-AADIntReconAsOutsider -UserName <String> [-Single] [-GetRelayingParties] [<CommonParameters>]


DESCRIPTION
    Starts tenant recon of the given domain. Gets all verified domains of the tenant and extracts information such as their type.
    Also checks whether Desktop SSO (aka Seamless SSO) is enabled for the tenant.

    DNS:     Does the DNS record exists?
    MX:      Does the MX point to Office 365?
    SPF:     Does the SPF contain Exchange Online?
    Type:    Federated or Managed
    DMARC:   Is the DMARC record configured?
    DKIM:    Is the DKIM record configured?
    MTA-STS: Is the MTA-STS record configured?
    STS:     The FQDN of the federated IdP's (Identity Provider) STS (Security Token Service) server
    RPS:     Relaying parties of STS (AD FS)


RELATED LINKS

REMARKS
    To see the examples, type: "get-help Invoke-AADIntReconAsOutsider -examples".
    For more information, type: "get-help Invoke-AADIntReconAsOutsider -detailed".
    For technical information, type: "get-help Invoke-AADIntReconAsOutsider -full".
```

## Examples

```plain
PS C:\Users\crypt0rr> Invoke-AADIntReconAsOutsider -DomainName offsec.nl | Format-Table
Tenant brand:       Offensive Security NL
Tenant name:        offsecnl.onmicrosoft.com
Tenant id:          b5133793-0a6b-4865-4301-12345aa567890
Tenant region:      EU
DesktopSSO enabled: False

Name                             DNS    MX   SPF DMARC  DKIM MTA-STS Type    STS
----                             ---    --   --- -----  ---- ------- ----    ---
offsec.nl                       True  True  True False False   False Managed
offsecnl.onmicrosoft.com        True  True  True False False   False Managed
```

## URL list

- [Trustedsec.com - Azure AD Kerberos Tickets: Pivoting to the Cloud](https://trustedsec.com/blog/azure-ad-kerberos-tickets-pivoting-to-the-cloud)
