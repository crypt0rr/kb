---
title : "hcxtools"
pre : '<i class="far fa-window-restore"></i> '
description : "Small set of tools convert packets from captures (h = hash, c = capture, convert and calculate candidates, x = different hashtypes) for the use with latest hashcat or John the Ripper."
date : 2022-02-23T12:00:34+01:00
# hidden : true
# draft : true
weight : 90
tags : ["hash-cracking"]
### a map of Front Matter keys whose values are passed down to the page's descendants unless overwritten by self or a closer ancestor's cascade. 
cascade:
    tags: ['hcxtools', 'WiFi']
    # pre : '<i class="fas fa-terminal"></i> '
---

---

**Note**: the tools can be used stand-alone but also in combination with each other. The steps would be:

1. [hcxdumptool]({{< ref "hcxdumptool" >}}) - capturing needed things
2. [hcxpcapngtool]({{< ref "hcxpcapngtool" >}}) - converting to hash file
3. [hcxhashtool]({{< ref "hcxhashtool" >}}) - selecting specific network to crack

Small set of tools convert packets from captures (h = hash, c = capture, convert and calculate candidates, x = different hashtypes) for the use with latest hashcat or John the Ripper. The tools are 100% compatible to hashcat and John the Ripper and recommended by hashcat. This branch is pretty closely synced to hashcat git and John the Ripper git.

- Support of hashcat hash-modes: 4800, 5500, 2200x, 16100, 250x (deprecated), 1680x (deprecated)
- Support of John the Ripper hash-modes: WPAPSK-PMK, PBKDF2-HMAC-SHA1, chap, netntlm, tacacs-plus
- Support of gzip (.gz) single file compression

Main purpose is to detect weak points within own WiFi networks by analyzing the hashes. Therefore convert the dump file to WPA-PBKDF2-PMKID+EAPOL hash file and check if wlan-key or plainmasterkey was transmitted unencrypted. Or upload the "uncleaned" dump file (pcapng, pcap, cap) here <https://wpa-sec.stanev.org/?submit> to find out if your ap or the client is vulnerable by using common wordlists or a weak password generation algorithm.

## Installation

```plain
sudo apt install hcxtools
```

Or from [Github repo](https://github.com/ZerBea/hcxtools).

```plain
git clone https://github.com/ZerBea/hcxtools
make
make install
```

## Modules

{{% children depth="1" %}}

## URL List

- [Github.com - hcxtools](https://github.com/ZerBea/hcxtools)
- [Kali.org - hcxtools](https://www.kali.org/tools/hcxtools/)
