---
title : "free"
# pre : '<i class="fas fa-code"></i> '
description : "Display amount of free and used memory in the system."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 290
# tags : [""]
---

---

## Usage

```plain
free [options]
```

## Flags

```plain
Usage:
 free [options]

Options:
 -b, --bytes         show output in bytes
     --kilo          show output in kilobytes
     --mega          show output in megabytes
     --giga          show output in gigabytes
     --tera          show output in terabytes
     --peta          show output in petabytes
 -k, --kibi          show output in kibibytes
 -m, --mebi          show output in mebibytes
 -g, --gibi          show output in gibibytes
     --tebi          show output in tebibytes
     --pebi          show output in pebibytes
 -h, --human         show human-readable output
     --si            use powers of 1000 not 1024
 -l, --lohi          show detailed low and high memory statistics
 -t, --total         show total for RAM + swap
 -s N, --seconds N   repeat printing every N seconds
 -c N, --count N     repeat printing N times, then exit
 -w, --wide          wide output

     --help     display this help and exit
 -V, --version  output version information and exit

For more details see free(1).
```

## Examples

```plain
free -h
              total        used        free      shared  buff/cache   available
Mem:           31Gi       5,9Gi        20Gi       588Mi       4,3Gi        24Gi
Swap:         4,0Gi          0B       4,0Gi
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/free)
- [man7.org](http://man7.org/linux/man-pages/man1/free.1.html)
