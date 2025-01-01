---
title : "sha1sum"
# pre : '<i class="fas fa-code"></i> '
description : "Compute and check SHA1 message digest."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 780
tags : ['Unix', 'Hashing']
---

---

## Usage

```plain
sha1sum [OPTION]... [FILE]...
```

## Flags

```plain
Usage: sha1sum [OPTION]... [FILE]...
Print or check SHA1 (160-bit) checksums.

With no FILE, or when FILE is -, read standard input.

  -b, --binary         read in binary mode
  -c, --check          read SHA1 sums from the FILEs and check them
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

The sums are computed as described in FIPS-180-1.  When checking, the input
should be a former output of this program.  The default mode is to print a
line with checksum, a space, a character indicating input mode ('*' for binary,
' ' for text or where binary is insignificant), and name for each FILE.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/sha1sum>
or available locally via: info '(coreutils) sha1sum invocation'
```

## Examples

Create sha1sum of a file

```plain
$ sha1sum testfile.txt
8c723a0fa70b111017b4a6f06afe1c0dbcec14e3  testfile.txt
```

Create and check sha1sum

```plain
$ sha1sum testfile.txt > testfile.hash
$ sha1sum -c testfile.hash
testfile.txt: OK
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/sha1sum)
- [GNU.org](https://www.gnu.org/software/coreutils/sha1sum)
