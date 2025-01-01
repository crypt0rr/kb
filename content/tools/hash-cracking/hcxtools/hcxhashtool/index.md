---
title : "hcxhashtool"
# pre : ' '
description : "Filter hashes."
date : 2022-02-23T14:08:55+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

## Installation

Install [hcxtools]({{< ref "../hcxtools" >}}).

## Usage

```plain
hcxhashtool <options>
```

## Flags

```plain
hcxhashtool 6.0.2 (C) 2020 ZeroBeat

options:
-i <file>   : input PMKID/EAPOL hash file
-o <file>   : output PMKID/EAPOL hash file
-E <file>   : output ESSID list (autohex enabled)
-d          : download http://standards-oui.ieee.org/oui.txt
            : and save to ~/.hcxtools/oui.txt
            : internet connection required
-h          : show this help
-v          : show version

--essid-group                : convert to ESSID groups in working directory
                               full advantage of reuse of PBKDF2
                               not on old hash formats
--oui-group                  : convert to OUI groups in working directory
                               not on old hash formats
--mac-group-ap               : convert APs to MAC groups in working directory
                               not on old hash formats
--mac-group-client           : convert CLIENTs to MAC groups in working directory
                               not on old hash formats
--type                       : filter by hash type
                             : default PMKID (1) and EAPOL (2)
--essid-len                  : filter by ESSID length
                             : default ESSID length: 0...32
--essid-min                  : filter by ESSID minimum length
                             : default ESSID minimum length: 0
--essid-max                  : filter by ESSID maximum length
                             : default ESSID maximum length: 32
--essid=<ESSID>              : filter by ESSID
--essid-part=<part of ESSID> : filter by part of ESSID
--mac-ap=<MAC>               : filter AP by MAC
                             : format: 001122334455, 00:11:22:33:44:55, 00-11-22-33-44-55 (hex)
--mac-client=<MAC>           : filter CLIENT by MAC
                             : format: 001122334455, 00:11:22:33:44:55, 00-11-22-33-44-55 (hex)
--oui-ap=<OUI>               : filter AP by OUI
                             : format: 001122, 00:11:22, 00-11-22 (hex)
--oui-client=<OUI>           : filter CLIENT by OUI
                             : format: 001122, 00:11:22, 00-11-22 (hex)
--vendor=<VENDOR>            : filter by (part of) VENDOR name
--authorized                 : filter EAPOL pairs by status authorized
--notauthorized              : filter EAPOL pairs by status not authorized
--rc                         : filter EAPOL pairs by replaycount status checked
--apless                     : filter EAPOL pairs by status M1M2ROGUE (M2 requested from CLIENT)
--info=<file>                : output detailed information about content of hash file
--info=stdout                : stdout output detailed information about content of hash file
--vendorlist                 : stdout output VENDOR list sorted by OUI
--psk=<PSK>                  : pre-shared key to test
                             : due to PBKDF2 calculation this is a very slow process
                             : no nonce error corrections
--pmk=<PMK>                  : plain master key to test
                             : no nonce error corrections
--hccapx=<file>              : output to deprecated hccapx file
--hccap=<file>               : output to ancient hccap file
--hccap-single               : output to ancient hccap single files (MAC + count)
--john=<file>                : output to deprecated john file
--help                       : show this help
--version                    : show version
```

## Examples

This example uses the 'hash.hc22000' that is converted with [hcxpcapngtool]({{< ref "hcxpcapngtool" >}}) and captured with [hcxdumptool]({{< ref "hcxdumptool" >}}).

Filter a specific ESSID that you want to target.

```plain
$ hcxhashtool -i hash.hc22000 -o hash.hc22000.offsec --essid=OFFSEC

OUI information file...: N/A
total lines read.......: 5
valid hash lines.......: 5
PMKID hash lines.......: 4
EAPOL hash lines.......: 1
filter by ESSID........: CB
PMKID written..........: 2
EAPOL written..........: 1
```
