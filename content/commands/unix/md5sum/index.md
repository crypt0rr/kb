---
title : "md5sum"
# pre : '<i class="fas fa-code"></i> '
description : "Compute and check MD5 message digest."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 560
tags : ['Unix', 'Hashing']
---

---

## Usage

```plain
md5sum [OPTION]... [FILE]...
```

## Flags

```plain
Usage: md5sum [OPTION]... [FILE]...
Print or check MD5 (128-bit) checksums.

With no FILE, or when FILE is -, read standard input.

  -b, --binary         read in binary mode
  -c, --check          read MD5 sums from the FILEs and check them
      --tag            create a BSD-style checksum
  -t, --text           read in text mode (default)
  -z, --zero           end each output line with NUL, not newline,
                       and disable file name escaping

The following five options are useful only when verifying checksums:
      --ignore-missing  don't fail or report status for missing files
      --quiet          don't print OK for each successfully verified file
      --status         don't output anything, status code shows success
      --strict         exit non-zero for improperly formatted checksum lines
  -w, --warn           warn about improperly formatted checksum lines

      --help     display this help and exit
      --version  output version information and exit

The sums are computed as described in RFC 1321.  When checking, the input
should be a former output of this program.  The default mode is to print a
line with checksum, a space, a character indicating input mode ('*' for binary,
' ' for text or where binary is insignificant), and name for each FILE.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/md5sum>
or available locally via: info '(coreutils) md5sum invocation'
```

## Examples

Create md5sum of a file

```plain
$ md5sum testfile.txt
e302f9ecd2d189fa80aac1c3392e9b9c  testfile.txt
```

Create and check md5sum

```plain
$ md5sum testfile.txt > testfile.hash
$ md5sum -c testfile.hash
testfile.txt: OK
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/md5sum)
- [GNU.org](https://www.gnu.org/software/coreutils/md5sum)
