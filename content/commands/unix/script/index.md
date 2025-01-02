---
title : "script"
# pre : '<i class="fas fa-code"></i> '
description : "Make a typescript of a terminal session."
date : 2020-11-27T16:33:25+01:00
# hidden : true
# draft : true
weight : 760
# tags : ['']
---

---

Make a typescript of a terminal session.

## Usage

```plain
script [options] [file]
```

## Flags

```plain
Options:
 -a, --append                  append the output
 -c, --command <command>       run command rather than interactive shell
 -e, --return                  return exit code of the child process
 -f, --flush                   run flush after each write
     --force                   use output file even when it is a link
 -o, --output-limit <size>     terminate if output files exceed size
 -q, --quiet                   be quiet
 -t[<file>], --timing[=<file>] output timing data to stderr or to FILE
 -h, --help                    display this help
 -V, --version                 display version

For more details see script(1).
```

## Examples

### Start terminal logging to file

```plain
script logfile.txt
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/script)
