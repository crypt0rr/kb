---
title : "head"
# pre : '<i class="fas fa-code"></i> '
description : "Print the first 10 lines of each FILE to standard output."
date : 2020-04-09T13:39:23+02:00
# hidden : true
# draft : true
weight : 370
# tags : ['']
---

---

## Usage

```plain
head [OPTION]... [FILE]...
```

## Flags

```plain
Print the first 10 lines of each FILE to standard output.
With more than one FILE, precede each with a header giving the file name.

With no FILE, or when FILE is -, read standard input.

Mandatory arguments to long options are mandatory for short options too.
  -c, --bytes=[-]NUM       print the first NUM bytes of each file;
                             with the leading '-', print all but the last
                             NUM bytes of each file
  -n, --lines=[-]NUM       print the first NUM lines instead of the first 10;
                             with the leading '-', print all but the last
                             NUM lines of each file
  -q, --quiet, --silent    never print headers giving file names
  -v, --verbose            always print headers giving file names
  -z, --zero-terminated    line delimiter is NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

NUM may have a multiplier suffix:
b 512, kB 1000, K 1024, MB 1000*1000, M 1024*1024,
GB 1000*1000*1000, G 1024*1024*1024, and so on for T, P, E, Z, Y.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/head>
or available locally via: info '(coreutils) head invocation'
```

## Examples

### Default head usage

```plain
$ head input.txt

line1
line2
line3
line4
line5
line6
line7
line8
line9
line10
```

### Set specific line amount

```plain
$ head -n7 input.txt

line1
line2
line3
line4
line5
line6
line7
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/head)
