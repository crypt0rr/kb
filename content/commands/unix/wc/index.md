---
title : "wc"
# pre : '<i class="fas fa-code"></i> '
description : "Print newline, word, and byte counts for each file."
date : 2020-05-11T09:51:12+02:00
# hidden : true
# draft : true
weight : 990
# tags : ['']
---

---

## Usage

```plain
Usage: wc [OPTION]... [FILE]...
  or:  wc [OPTION]... --files0-from=F
```

## Flags

```plain
Print newline, word, and byte counts for each FILE, and a total line if
more than one FILE is specified.  A word is a non-zero-length sequence of
characters delimited by white space.

With no FILE, or when FILE is -, read standard input.

The options below may be used to select which counts are printed, always in
the following order: newline, word, character, byte, maximum line length.
  -c, --bytes            print the byte counts
  -m, --chars            print the character counts
  -l, --lines            print the newline counts
      --files0-from=F    read input from the files specified by
                           NUL-terminated names in file F;
                           If F is - then read names from standard input
  -L, --max-line-length  print the maximum display width
  -w, --words            print the word counts
      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/wc>
or available locally via: info '(coreutils) wc invocation'
```

## Examples

### Count amount of lines in a file

```plain
$ wc -l hostlist.txt

35 hostlist.txt
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/wc)
