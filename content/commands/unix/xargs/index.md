---
title : "xargs"
# pre : '<i class="fas fa-code"></i> '
description : "Build and execute command lines from standard input."
date : 2020-05-27T11:53:40+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Xargs

## Usage

```plain
xargs [OPTION]... COMMAND [INITIAL-ARGS]...
```

## Flags

```plain
Run COMMAND with arguments INITIAL-ARGS and more arguments read from input.

Mandatory and optional arguments to long options are also
mandatory or optional for the corresponding short option.
  -0, --null                   items are separated by a null, not whitespace;
                                 disables quote and backslash processing and
                                 logical EOF processing
  -a, --arg-file=FILE          read arguments from FILE, not standard input
  -d, --delimiter=CHARACTER    items in input stream are separated by CHARACTER,
                                 not by whitespace; disables quote and backslash
                                 processing and logical EOF processing
  -E END                       set logical EOF string; if END occurs as a line
                                 of input, the rest of the input is ignored
                                 (ignored if -0 or -d was specified)
  -e, --eof[=END]              equivalent to -E END if END is specified;
                                 otherwise, there is no end-of-file string
  -I R                         same as --replace=R
  -i, --replace[=R]            replace R in INITIAL-ARGS with names read
                                 from standard input; if R is unspecified,
                                 assume {}
  -L, --max-lines=MAX-LINES    use at most MAX-LINES non-blank input lines per
                                 command line
  -l[MAX-LINES]                similar to -L but defaults to at most one non-
                                 blank input line if MAX-LINES is not specified
  -n, --max-args=MAX-ARGS      use at most MAX-ARGS arguments per command line
  -o, --open-tty               Reopen stdin as /dev/tty in the child process
                                 before executing the command; useful to run an
                                 interactive application.
  -P, --max-procs=MAX-PROCS    run at most MAX-PROCS processes at a time
  -p, --interactive            prompt before running commands
      --process-slot-var=VAR   set environment variable VAR in child processes
  -r, --no-run-if-empty        if there are no arguments, then do not run COMMAND;
                                 if this option is not given, COMMAND will be
                                 run at least once
  -s, --max-chars=MAX-CHARS    limit length of command line to MAX-CHARS
      --show-limits            show limits on command-line length
  -t, --verbose                print commands before executing them
  -x, --exit                   exit if the size (see -s) is exceeded
      --help                   display this help and exit
      --version                output version information and exit

Please see also the documentation at http://www.gnu.org/software/findutils/.
You can report (and track progress on fixing) bugs in the "xargs"
program via the GNU findutils bug-reporting page at
https://savannah.gnu.org/bugs/?group=findutils or, if
you have no web access, by sending email to <bug-findutils@gnu.org>.
```

## Examples

### Find files and copy them to folder

```plain
find . -name "*.txt" | xargs -I{} cp -u {} ~/Desktop/temp
```

## URL List

* [Linux.die.net](https://linux.die.net/man/1/xargs)
