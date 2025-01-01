---
title : "smbrelayx.py"
# pre : ' '
description : "Relay SMB traffic."
date : 2022-02-14T12:19:44+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

Relay SMB traffic.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
smbrelayx.py [--help] [-ts] [-debug] [-h HOST] [-s {denied,logon_failure,success}] [-e FILE] [-c COMMAND] [-socks] [-one-shot] [-codec CODEC] [-outputfile OUTPUTFILE] [-machine-account MACHINE_ACCOUNT]
                    [-machine-hashes LMHASH:NTHASH] [-domain DOMAIN]
```

## Examples

Requires SMB-signing disabled or not required.

[Byt3bl33d3r.github.io - Practical guide to NTLM relaying](https://byt3bl33d3r.github.io/practical-guide-to-ntlm-relaying-in-2017-aka-getting-a-foothold-in-under-5-minutes.html)

## URL List

- [Github.com - smbrelayx.py](https://github.com/fortra/impacket/blob/master/examples/smbrelayx.py)
