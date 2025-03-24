---
title : "ticketConverter.py"
# pre : ' '
description : "This script will convert kirbi files (commonly used by mimikatz) into ccache files used by impacket, and vice versa."
date : 2022-01-20T10:19:30+01:00
# hidden : true
# draft : true
weight : 1850
# tags : ['']
---

---

A little tool to convert ccache tickets into kirbi (KRB-CRED) and vice versa based on impacket.

As input you must provide a ccache or kirbi file. The script will detect the format and convert it.

## Installation

```plain
wget https://raw.githubusercontent.com/fortra/impacket/refs/heads/master/examples/ticketConverter.py
```

## Usage

```plain
ticketConverter.py [-h] input_file output_file
```

## Flags

```plain
positional arguments:
  input_file    File in kirbi (KRB-CRED) or ccache format
  output_file   Output file

optional arguments:
  -h, --help   show this help message and exit
```

## Examples

### kirbi to ccache

```plain
$ python3 ticketConverter.py johnDomainAdmin.kirbi johnDomainAdmin.ccache                     
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] converting kirbi to ccache...
[+] done
```

### ccache to kirbi

```plain
$ python3 ticketConverter.py johnDomainAdmin.ccache johnDomainAdmin.kirbi
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] converting ccache to kirbi...
[+] done
```

## Troubleshooting

Fixing the error message `ImportError: cannot import name 'KeyBlock' from 'impacket.krb5.ccache'`.

Open `ticket_converter.py` in a text editor and find+replace `KeyBlock` with `KeyBlockV4`.

## URL List

- [Github.com - ticket_converter](https://github.com/Zer1t0/ticket_converter)
