---
title : "tail"
# pre : '<i class="fas fa-code"></i> '
description : "Print the last 10 lines of each FILE to standard output."
date : 2020-04-09T13:43:14+02:00
# hidden : true
# draft : true
weight : 880
# tags : ['']
---

---

## Usage

```plain
tail [OPTION]... [FILE]...
```

## Flags

```plain
Print the last 10 lines of each FILE to standard output.
With more than one FILE, precede each with a header giving the file name.

With no FILE, or when FILE is -, read standard input.

Mandatory arguments to long options are mandatory for short options too.
  -c, --bytes=[+]NUM       output the last NUM bytes; or use -c +NUM to
                             output starting with byte NUM of each file
  -f, --follow[={name|descriptor}]
                           output appended data as the file grows;
                             an absent option argument means 'descriptor'
  -F                       same as --follow=name --retry
  -n, --lines=[+]NUM       output the last NUM lines, instead of the last 10;
                             or use -n +NUM to output starting with line NUM
      --max-unchanged-stats=N
                           with --follow=name, reopen a FILE which has not
                             changed size after N (default 5) iterations
                             to see if it has been unlinked or renamed
                             (this is the usual case of rotated log files);
                             with inotify, this option is rarely useful
      --pid=PID            with -f, terminate after process ID, PID dies
  -q, --quiet, --silent    never output headers giving file names
      --retry              keep trying to open a file if it is inaccessible
  -s, --sleep-interval=N   with -f, sleep for approximately N seconds
                             (default 1.0) between iterations;
                             with inotify and --pid=P, check process P at
                             least once every N seconds
  -v, --verbose            always output headers giving file names
  -z, --zero-terminated    line delimiter is NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

NUM may have a multiplier suffix:
b 512, kB 1000, K 1024, MB 1000*1000, M 1024*1024,
GB 1000*1000*1000, G 1024*1024*1024, and so on for T, P, E, Z, Y.

With --follow (-f), tail defaults to following the file descriptor, which
means that even if a tail'ed file is renamed, tail will continue to track
its end.  This default behavior is not desirable when you really want to
track the actual name of the file, not the file descriptor (e.g., log
rotation).  Use --follow=name in that case.  That causes tail to track the
named file in a way that accommodates renaming, removal and creation.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/tail>
or available locally via: info '(coreutils) tail invocation'
```

## Examples

### Default tail usage

```plain
$ tail input.txt

line245
line246
line247
line248
line249
line250
line251
line252
line253
line254
```

### Set specific amount of lines

```plain
$ tail -n 7 input.txt

line248
line249
line250
line251
line252
line253
line254
```

### Follow the end of a file when it is dynamically filled

```plain
$ tail -n 7 input.txt

line248
line249
line250
line251
line252
line253
line254
...
...
...
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/tail)
