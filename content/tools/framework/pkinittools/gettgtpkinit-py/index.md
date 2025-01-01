---
title : "gettgtpkinit.py"
# pre : ' '
description : "Requests a TGT using Kerberos PKINIT and either a PEM or PFX based certificate+key."
date : 2023-12-03T06:11:55+01:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

Requests a TGT using Kerberos PKINIT and either a PEM or PFX based certificate+key.

## Installation

Install [PKINITtools]({{< ref "pkinittools" >}}).

## Usage

```plain
gettgtpkinit.py [-h] [-cert-pfx file] [-pfx-pass password] [-pfx-base64 BASE64] [-cert-pem file] [-key-pem file] [-dc-ip DC_IP] [-v] domain/username ccache
```

## Flags

```plain
positional arguments:
  domain/username     Domain and username in the cert
  ccache              ccache file to store the TGT in

options:
  -h, --help          show this help message and exit
  -cert-pfx file      PFX file
  -pfx-pass password  PFX file password
  -pfx-base64 BASE64  PFX file as base64 string
  -cert-pem file      Certificate in PEM format
  -key-pem file       Private key file in PEM format
  -dc-ip DC_IP        DC IP or hostname to use as KDC
  -v, --verbose
```

## Examples

```plain
(PKINITtools) user@localhost:~/PKINITtools$ python gettgtpkinit.py testsegment.local/s2019dc\$ -cert-pfx ~/impacket-py3/cert.pfx -pfx-pass hoi s2019dc.ccache
2021-07-27 21:25:24,299 minikerberos INFO     Loading certificate and key from file
2021-07-27 21:25:24,316 minikerberos INFO     Requesting TGT
2021-07-27 21:25:24,333 minikerberos INFO     AS-REP encryption key (you might need this later):
2021-07-27 21:25:24,333 minikerberos INFO     5769dff44ebeaa5a37b4e9f7005f63063ffd7c198b747ae72021901e8063b0e3
2021-07-27 21:25:24,336 minikerberos INFO     Saved TGT to file
```
