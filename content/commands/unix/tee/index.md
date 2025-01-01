---
title : "tee"
# pre : '<i class="fas fa-code"></i> '
description : "Read from standard input and write to standard output and files."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 900
# tags : [""]
---

---

## Usage

```plain
tee [OPTION]... [FILE]...
```

## Flags

```plain
Usage: tee [OPTION]... [FILE]...
Copy standard input to each FILE, and also to standard output.

  -a, --append              append to the given FILEs, do not overwrite
  -i, --ignore-interrupts   ignore interrupt signals
  -p                        diagnose errors writing to non pipes
      --output-error[=MODE]   set behavior on write error.  See MODE below
      --help     display this help and exit
      --version  output version information and exit

MODE determines behavior with write errors on the outputs:
  'warn'         diagnose errors writing to any output
  'warn-nopipe'  diagnose errors writing to any output not a pipe
  'exit'         exit on error writing to any output
  'exit-nopipe'  exit on error writing to any output not a pipe
The default MODE for the -p option is 'warn-nopipe'.
The default operation when --output-error is not specified, is to
exit immediately on error writing to a pipe, and diagnose errors
writing to non pipe outputs.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/tee>
or available locally via: info '(coreutils) tee invocation'
```

## Examples

```plain
$ cat testfile.txt | tee output.txt
abcdefghijklmnopqrstuvwxyz
```

Suppress tee console output

```plain
$ cat testfile.txt | tee output.txt &>/dev/null
<nothing-shown>
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/tee)
- [GNU.org](https://www.gnu.org/software/coreutils/tee)
