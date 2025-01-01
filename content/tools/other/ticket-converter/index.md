---
title : "ticket_converter"
# pre : ' '
description : "A little tool to convert ccache tickets into kirbi (KRB-CRED) and vice versa based on impacket."
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
git clone https://github.com/Zer1t0/ticket_converter
cd ticket_converter
pip install -r requirements.txt
```

## Usage

```plain
ticket_converter.py [-h] input_file output_file
```

## Flags

```plain
positional arguments:
  input_file
  output_file

optional arguments:
  -h, --help   show this help message and exit
```

## Examples

### kirbi to ccache

```plain
python3 ticket_converter.py johnDomainAdmin.kirbi johnDomainAdmin.ccache
Converting kirbi => ccache
```

### ccache to kirbi

```plain
python3 ticket_converter.py johnDomainAdmin.ccache johnDomainAdmin.kirbi
Converting ccache => kirbi
```

## Troubleshooting

Fixing the error message `ImportError: cannot import name 'KeyBlock' from 'impacket.krb5.ccache'`.

Open `ticket_converter.py` in a text editor and find+replace `KeyBlock` with `KeyBlockV4`.

## URL List

- [Github.com - ticket_converter](https://github.com/Zer1t0/ticket_converter)
