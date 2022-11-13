---
title : "grep"
# pre : '<i class="fas fa-code"></i> '
description : "Search for PATTERNS in each FILE."
date : 2020-05-16T16:20:32+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Grep

## Usage

```plain
grep [OPTION]... PATTERNS [FILE]...
```

## Flags

```plain
Search for PATTERNS in each FILE.
Example: grep -i 'hello world' menu.h main.c
PATTERNS can contain multiple patterns separated by newlines.

Pattern selection and interpretation:
  -E, --extended-regexp     PATTERNS are extended regular expressions
  -F, --fixed-strings       PATTERNS are strings
  -G, --basic-regexp        PATTERNS are basic regular expressions
  -P, --perl-regexp         PATTERNS are Perl regular expressions
  -e, --regexp=PATTERNS     use PATTERNS for matching
  -f, --file=FILE           take PATTERNS from FILE
  -i, --ignore-case         ignore case distinctions in patterns and data
      --no-ignore-case      do not ignore case distinctions (default)
  -w, --word-regexp         match only whole words
  -x, --line-regexp         match only whole lines
  -z, --null-data           a data line ends in 0 byte, not newline

Miscellaneous:
  -s, --no-messages         suppress error messages
  -v, --invert-match        select non-matching lines
  -V, --version             display version information and exit
      --help                display this help text and exit

Output control:
  -m, --max-count=NUM       stop after NUM selected lines
  -b, --byte-offset         print the byte offset with output lines
  -n, --line-number         print line number with output lines
      --line-buffered       flush output on every line
  -H, --with-filename       print file name with output lines
  -h, --no-filename         suppress the file name prefix on output
      --label=LABEL         use LABEL as the standard input file name prefix
  -o, --only-matching       show only nonempty parts of lines that match
  -q, --quiet, --silent     suppress all normal output
      --binary-files=TYPE   assume that binary files are TYPE;
                            TYPE is 'binary', 'text', or 'without-match'
  -a, --text                equivalent to --binary-files=text
  -I                        equivalent to --binary-files=without-match
  -d, --directories=ACTION  how to handle directories;
                            ACTION is 'read', 'recurse', or 'skip'
  -D, --devices=ACTION      how to handle devices, FIFOs and sockets;
                            ACTION is 'read' or 'skip'
  -r, --recursive           like --directories=recurse
  -R, --dereference-recursive  likewise, but follow all symlinks
      --include=GLOB        search only files that match GLOB (a file pattern)
      --exclude=GLOB        skip files that match GLOB
      --exclude-from=FILE   skip files that match any file pattern from FILE
      --exclude-dir=GLOB    skip directories that match GLOB
  -L, --files-without-match  print only names of FILEs with no selected lines
  -l, --files-with-matches  print only names of FILEs with selected lines
  -c, --count               print only a count of selected lines per FILE
  -T, --initial-tab         make tabs line up (if needed)
  -Z, --null                print 0 byte after FILE name

Context control:
  -B, --before-context=NUM  print NUM lines of leading context
  -A, --after-context=NUM   print NUM lines of trailing context
  -C, --context=NUM         print NUM lines of output context
  -NUM                      same as --context=NUM
      --color[=WHEN],
      --colour[=WHEN]       use markers to highlight the matching strings;
                            WHEN is 'always', 'never', or 'auto'
  -U, --binary              do not strip CR characters at EOL (MSDOS/Windows)

When FILE is '-', read standard input.  With no FILE, read '.' if
recursive, '-' otherwise.  With fewer than two FILEs, assume -h.
Exit status is 0 if any line (or file if -L) is selected, 1 otherwise;
if any error occurs and -q is not given, the exit status is 2.

Report bugs to: bug-grep@gnu.org
GNU grep home page: <http://www.gnu.org/software/grep/>
General help using GNU software: <https://www.gnu.org/gethelp/>
```

## Examples

### Compare content of files to find matches

```plain
$ grep -f 1 2

This is the first test centence.
This is the second centence.
This is the third centence.
```

### Find lines that contain specific string

Number in front of the centences are the file names

```plain
$ grep 'the' *

1:This is the first test centence.
1:This is the second centence.
1:This is the third centence.
2:This is the first test Centence.
2:This is the second Centence.
2:This is the third Centence.
3:This is the first test centence.
3:This is the second centence.
3:This is the third centence.
```

### Ignore case

```plain
$ grep -i 'centence' *

1:This is the first test centence.
1:This is the second centence.
1:This is the third centence.
2:This is the first test CeNtEncE.
2:This is the second CEnTeNCe.
2:This is the third CenTEnCE.
3:This is the first test centence.
3:This is the second centence.
3:This is the third centence.
```

### Find IP-addresses

```plain
grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" <file>
```

### Find email addresses

```plain
grep -E -o "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b" <file>
```

### Exact matching

```plain
grep -w -Ff file1.txt file2.txt
```

### Exact matching non matching lines

For example remove lines from file 1 that are found in file 2.

```plain
grep -w -v -Ff file1.txt file2.txt
```

### Exact matching amount of chars per line

```plain
grep -E "^.{3}$" file.txt
```

### Escape special characters

```plain
grep -v '\$' file.txt
```

## URL List

* [Linux.die.net](https://linux.die.net/man/1/grep)
