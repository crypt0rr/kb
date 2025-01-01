---
title : "sed"
# pre : '<i class="fas fa-code"></i> '
description : "Stream editor for filtering and transforming text."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 770
# tags : [""]
---

---

## Usage

```plain
sed [OPTION]... {script-only-if-no-other-script} [input-file]...
```

## Flags

```plain
Usage: sed [OPTION]... {script-only-if-no-other-script} [input-file]...

  -n, --quiet, --silent
                 suppress automatic printing of pattern space
      --debug
                 annotate program execution
  -e script, --expression=script
                 add the script to the commands to be executed
  -f script-file, --file=script-file
                 add the contents of script-file to the commands to be executed
  --follow-symlinks
                 follow symlinks when processing in place
  -i[SUFFIX], --in-place[=SUFFIX]
                 edit files in place (makes backup if SUFFIX supplied)
  -l N, --line-length=N
                 specify the desired line-wrap length for the `l' command
  --posix
                 disable all GNU extensions.
  -E, -r, --regexp-extended
                 use extended regular expressions in the script
                 (for portability use POSIX -E).
  -s, --separate
                 consider files as separate rather than as a single,
                 continuous long stream.
      --sandbox
                 operate in sandbox mode (disable e/r/w commands).
  -u, --unbuffered
                 load minimal amounts of data from the input files and flush
                 the output buffers more often
  -z, --null-data
                 separate lines by NUL characters
      --help     display this help and exit
      --version  output version information and exit

If no -e, --expression, -f, or --file option is given, then the first
non-option argument is taken as the sed script to interpret.  All
remaining arguments are names of input files; if no input files are
specified, then the standard input is read.

GNU sed home page: <https://www.gnu.org/software/sed/>.
General help using GNU software: <https://www.gnu.org/gethelp/>.
E-mail bug reports to: <bug-sed@gnu.org>.
```

## Examples

Replace string with new string

```plain
sed 's/<string-to-replace>/<new-string>' <file>
```

Replace one occurrence per line

```plain
$ cat testfile.txt
This is first line test content for a test file.
This is second line test content for a test file.

$ cat testfile.txt | sed 's/test/real/'
This is first line real content for a test file.
This is second line real content for a test file.
```

Replace all occurrences per line, add 'g', can also be a number of occurrences per line

```plain
$ cat testfile.txt
This is first line test content for a test file.
This is second line test content for a test file.

$ cat testfile.txt | sed 's/test/real/g'
This is first line real content for a real file.
This is second line real content for a real file.
```

### Remove specific lines from file(s)

```plain
find -type f -name "*.md" | xargs sed -i '2d;4,6d;8,10d;12d;14,26d;28d;30,31d;33,34d'
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/sed)
- [Gnu.org - sed](https://www.gnu.org/software/sed/manual/sed.html)
