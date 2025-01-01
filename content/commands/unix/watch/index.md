---
title : "watch"
# pre : '<i class="fas fa-code"></i> '
description : "Execute a program periodically, showing output fullscreen."
date : 2020-03-10T16:18:54+01:00
# hidden : true
# draft : true
weight : 980
# tags : [""]
---

---

## Usage

```plain
watch [options] command
```

## Flags

```plain
Usage:
 watch [options] command

Options:
  -b, --beep             beep if command has a non-zero exit
  -c, --color            interpret ANSI color and style sequences
  -d, --differences[=<permanent>]
                         highlight changes between updates
  -e, --errexit          exit if command has a non-zero exit
  -g, --chgexit          exit when output from command changes
  -n, --interval <secs>  seconds to wait between updates
  -p, --precise          attempt run command in precise intervals
  -t, --no-title         turn off header
  -x, --exec             pass command to exec instead of "sh -c"

 -h, --help     display this help and exit
 -v, --version  output version information and exit

For more details see watch(1)
```

## Examples

Watch every 1 second the 'free -h' command

```plain
watch -n1 free -h

Every 1,0s: free -h                                      lo: Wed Mar 11 10:15:33 2020

              total        used        free      shared  buff/cache   available
Mem:           31Gi       7,0Gi       7,9Gi       383Mi        16Gi        23Gi
Swap:         4,0Gi          0B       4,0Gi
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/watch)
