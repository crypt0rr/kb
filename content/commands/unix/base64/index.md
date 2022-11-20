---
title : "base64"
# pre : '<i class="fas fa-code"></i> '
description : "Base64 encode or decode FILE, or standard input, to standard output."
date : 2020-04-03T13:50:19+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Base64

## Usage

```plain
base64 [OPTION]... [FILE]
```

## Flags

```plain
With no FILE, or when FILE is -, read standard input.

Mandatory arguments to long options are mandatory for short options too.
  -d, --decode          decode data
  -i, --ignore-garbage  when decoding, ignore non-alphabet characters
  -w, --wrap=COLS       wrap encoded lines after COLS character (default 76).
                          Use 0 to disable line wrapping

      --help     display this help and exit
      --version  output version information and exit

The data are encoded as described for the base64 alphabet in RFC 4648.
When decoding, the input may contain newlines in addition to the bytes of
the formal base64 alphabet.  Use --ignore-garbage to attempt to recover
from any other non-alphabet bytes in the encoded stream.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/base64>
or available locally via: info '(coreutils) base64 invocation'
```

## Examples

### Encode data

```plain
echo 'test-content' | base64
dGVzdC1jb250ZW50Cg==
```

### Decode data

```plain
echo 'dGVzdC1jb250ZW50Cg==' | base64 -d
test-content
```

## URL List

* [Gnu.org](https://www.gnu.org/software/coreutils/base64)
