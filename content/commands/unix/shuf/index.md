---
title : "Shuf"
# pre : ' '
description : "Write a random permutation of the input lines to standard output."
date : 2023-10-09T09:53:30+02:00
# hidden : true
# draft : true
weight : 800
# tags : ['']
---

---

Write a random permutation of the input lines to standard output.

## Installation

```plain
sudo apt install shuf
```

## Usage

```plain
shuf [OPTION]... [FILE]
  or:  shuf -e [OPTION]... [ARG]...
  or:  shuf -i LO-HI [OPTION]...
```

## Flags

```plain
With no FILE, or when FILE is -, read standard input.

Mandatory arguments to long options are mandatory for short options too.
  -e, --echo                treat each ARG as an input line
  -i, --input-range=LO-HI   treat each number LO through HI as an input line
  -n, --head-count=COUNT    output at most COUNT lines
  -o, --output=FILE         write result to FILE instead of standard output
      --random-source=FILE  get random bytes from FILE
  -r, --repeat              output lines can be repeated
  -z, --zero-terminated     line delimiter is NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report any translation bugs to <https://translationproject.org/team/>
Full documentation <https://www.gnu.org/software/coreutils/shuf>
or available locally via: info '(coreutils) shuf invocation'
```

## Examples

- `passwords` contains 5264448 passwords

```plain
$ shuf -n 5 passwords 
November2020,
LaPalma2023!
Christ1@1
Zaq.xsw23
Willies011
```

## URL list

- [Linux.die.net - Shuf](https://linux.die.net/man/1/shuf)
