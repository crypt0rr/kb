---
title : "touch"
# pre : '<i class="fas fa-code"></i> '
description : "Change file timestamps."
date : 2020-04-03T14:12:18+02:00
# hidden : true
# draft : true
weight : 930
# tags : ['']
---

---

## Usage

```plain
touch [OPTION]... FILE...
```

## Flags

```plain
Update the access and modification times of each FILE to the current time.

A FILE argument that does not exist is created empty, unless -c or -h
is supplied.

A FILE argument string of - is handled specially and causes touch to
change the times of the file associated with standard output.

Mandatory arguments to long options are mandatory for short options too.
  -a                     change only the access time
  -c, --no-create        do not create any files
  -d, --date=STRING      parse STRING and use it instead of current time
  -f                     (ignored)
  -h, --no-dereference   affect each symbolic link instead of any referenced
                         file (useful only on systems that can change the
                         timestamps of a symlink)
  -m                     change only the modification time
  -r, --reference=FILE   use this file's times instead of current time
  -t STAMP               use [[CC]YY]MMDDhhmm[.ss] instead of current time
      --time=WORD        change the specified time:
                           WORD is access, atime, or use: equivalent to -a
                           WORD is modify or mtime: equivalent to -m
      --help     display this help and exit
      --version  output version information and exit

Note that the -d and -t options accept different time-date formats.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/touch>
or available locally via: info '(coreutils) touch invocation'
```

## Examples

### Create non-existing file

```plain
touch <filename>
```

### Change complete timestamp of file

```plain
touch -d '1 January 1970 00:01' <filename>
```

### Change time of timestamp of file

```plain
touch -d '13:37' <filename>
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/touch)
