---
title : "MSFTRecon"
# pre : ' '
description : "Enumerates valid Microsoft 365 domains, retrieves tenant name, and checks for MDI instance."
date : 2025-03-15T16:17:26+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

---

MSFTRecon is a reconnaissance tool designed for red teamers and security professionals to map Microsoft 365 and Azure tenant infrastructure. It performs comprehensive enumeration without requiring authentication, helping identify potential security misconfigurations and attack vectors.

## Installation

```plain
# Clone the repository
git clone https://github.com/Arcanum-Sec/msftrecon.git
cd msftrecon

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
chmod +x msftrecon.py
```

## Usage

```plain
msftrecon.py [-h] -d DOMAIN [-j] [--gov] [--cn]
```

## Flags

```plain
  -h, --help           show this help message and exit
  -d, --domain DOMAIN  input domain name, example format: example.com
  -j, --json           output in JSON format
  --gov                query government tenancy
  --cn                 query chinese tenancy
```

## Examples

```plain
[+] Target Organization:
Tenant Name: Contoso
Tenant ID: 1234abcd-1234-abcd-1234-1234abcd1234

[+] Federation Information:
Namespace Type: Managed
Brand Name: Contoso
Cloud Instance: microsoftonline.com

[+] Azure AD Configuration:
Tenant Region: NA

[+] Azure AD Connect Status:
  Identity Configuration: Managed (Cloud Only)
  Authentication Type: Managed

  [!] Identity Insights:
  * Cloud-only authentication detected
  * All authentication handled in Azure AD
  * Focus on cloud-based attack vectors
```

## URL list

- [Github.com - MSFTrecon](https://github.com/Arcanum-Sec/msftrecon)
