---
title : "sha256sum"
# pre : '<i class="fas fa-code"></i> '
description : "Compute and check SHA256 message digest."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 790
tags : ['Unix', 'Hashing']
---

---

## Usage

```plain
sha256sum [OPTION]... [FILE]...
```

## Flags

```plain
Usage: sha256sum [OPTION]... [FILE]...
Print or check SHA256 (256-bit) checksums.

With no FILE, or when FILE is -, read standard input.

  -b, --binary         read in binary mode
  -c, --check          read SHA256 sums from the FILEs and check them
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

The sums are computed as described in FIPS-180-2.  When checking, the input
should be a former output of this program.  The default mode is to print a
line with checksum, a space, a character indicating input mode ('*' for binary,
' ' for text or where binary is insignificant), and name for each FILE.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/sha256sum>
or available locally via: info '(coreutils) sha2 utilities'
```

## Examples

Create sha256sum of a file

```plain
$ sha256sum testfile.txt
1010a7e761610980ac591359c871f724de150f23440ebb5959ac4c0724c91d91  testfile.txt
```

Create sha256sum of a file

```plain
$ sha256sum testfile.txt > testfile.hash
$ sha256sum -c testfile.hash
testfile.txt: OK
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/sha256sum)
