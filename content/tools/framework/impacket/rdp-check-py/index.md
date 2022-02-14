---
title : "rdp_check.py"
# pre : ' '
description : "Test whether an account is valid on the target host using the RDP protocol."
date : 2022-02-14T12:22:19+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## rdp_check.py

Test whether an account is valid on the target host using the RDP protocol.

### Installation

Install the [Impacket Framework]({{< ref "../" >}})

### Usage

```plain
rdp_check.py [-h] [-hashes LMHASH:NTHASH] target
```

### Flags

```plain
Impacket v0.9.25.dev1+20220201.191645.d8679837 - Copyright 2021 SecureAuth Corporation

Test whether an account is valid on the target host using the RDP protocol.

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
```

### Examples

```plain
$ rdp_check.py offsec/johndo:Welkom1234@10.10.10.10
Impacket v0.9.21 - Copyright 2020 SecureAuth Corporation

[*] Access Granted
```

### URL list

* [Github.com](https://github.com/SecureAuthCorp/impacket)
