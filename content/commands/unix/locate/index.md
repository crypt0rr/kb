---
title : "Locate"
# pre : '<i class="fas fa-code"></i> '
description : "Find files by name."
date : 2022-09-20T11:31:39+02:00
# hidden : true
# draft : true
weight : 470
# tags : ['']
---

---

locate reads one or more databases prepared by [updatedb](https://linux.die.net/man/8/updatedb)(8) and writes file names matching at least one of the PATTERNs to standard output, one per line.

If --regex is not specified, PATTERNs can contain globbing characters. If any PATTERN contains no globbing characters, locate behaves as if the pattern were *PATTERN*.

By default, locate does not check whether files found in database still exist. locate can never report files created after the most recent update of the relevant database.

## Usage

```plain
locate [OPTION]... PATTERN...
```

## Flags

```plain
  -b, --basename         search only the file name portion of path names
  -c, --count            print number of matches instead of the matches
  -d, --database DBPATH  search for files in DBPATH
                         (default is /var/lib/plocate/plocate.db)
  -i, --ignore-case      search case-insensitively
  -l, --limit LIMIT      stop after LIMIT matches
  -0, --null             delimit matches by NUL instead of newline
  -N, --literal          do not quote filenames, even if printing to a tty
  -r, --regexp           interpret patterns as basic regexps (slow)
      --regex            interpret patterns as extended regexps (slow)
  -w, --wholename        search the entire path name (default; see -b)
      --help             print this help
      --version          print version information
```

## Examples

### Update Locate database

```plain
sudo updatedb
```

### Using Locate to find python3 related items

```plain
$ locate python3 | head
/etc/python3
/etc/python3.10
/etc/python3.9
/etc/python3/debian_config
/etc/python3.10/sitecustomize.py
/etc/python3.9/sitecustomize.py
/usr/bin/dh_python3-ply
/usr/bin/ipython3
/usr/bin/pybabel-python3
/usr/bin/python3
```

## URL List

- [Linux.die.net - locate](https://linux.die.net/man/1/locate)
