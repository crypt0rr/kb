---
title : "comm"
# pre : '<i class="fas fa-code"></i> '
description : "Compare sorted files FILE1 and FILE2 line by line."
date : 2021-03-17T11:36:29+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

Compare sorted files FILE1 and FILE2 line by line.

## Usage

```plain
comm [OPTION]... FILE1 FILE2
```

## Flags

```plain
When FILE1 or FILE2 (not both) is -, read standard input.

With no options, produce three-column output.  Column one contains
lines unique to FILE1, column two contains lines unique to FILE2,
and column three contains lines common to both files.

  -1              suppress column 1 (lines unique to FILE1)
  -2              suppress column 2 (lines unique to FILE2)
  -3              suppress column 3 (lines that appear in both files)

  --check-order     check that the input is correctly sorted, even
                      if all input lines are pairable
  --nocheck-order   do not check that the input is correctly sorted
  --output-delimiter=STR  separate columns with STR
  --total           output a summary
  -z, --zero-terminated    line delimiter is NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

Note, comparisons honor the rules specified by 'LC_COLLATE'.

Examples:
  comm -12 file1 file2  Print only lines present in both file1 and file2.
  comm -3 file1 file2  Print lines in file1 not in file2, and vice versa.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/comm>
or available locally via: info '(coreutils) comm invocation'

```

## Examples

It outputs three space-offset columns:

- The first contains lines that are unique to the first file or argument
- The second contains lines that are unique to the second file or argument
- The third column contains lines that are shared by both files

### Compare normally

Content file 1 and 2

```plain
$ cat file1
192.168.1.1
192.168.1.2
192.168.1.3
192.168.1.4
192.168.1.5

$ cat file2
192.168.1.1
192.168.1.3
192.168.1.4
192.168.1.5
192.168.1.6
```

```plain
$ comm file1 file2                
                192.168.1.1
192.168.1.2
                192.168.1.3
                192.168.1.4
                192.168.1.5
        192.168.1.6
```

When only the matching lines are at interest, use the `-n` switch, where `n` is the field number(s).

```plain
$ comm -12 file1 file2
192.168.1.1
192.168.1.3
192.168.1.4
192.168.1.5
```

### Compare where content of lines do not directly match but are matched at other lines in file

```plain
$ cat file1      
abcd
efgh

$ cat file2
abcd
aaaa
efgh
```

```plain
$ comm file1 file2
        abcd
    aaaa
        efgh
```

## URL List

- [Linux.die.net - comm](https://linux.die.net/man/1/comm)
- [Geeksforgeeks.org - Comm command in Linux with examples](https://www.geeksforgeeks.org/comm-command-in-linux-with-examples/)
- [Howtoforge.com - Linux comm command tutorial for beginners (5 examples)](https://www.howtoforge.com/linux-comm-command/)
