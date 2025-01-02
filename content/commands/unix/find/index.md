---
title : "find"
# pre : '<i class="fas fa-code"></i> '
description : "Search for files in a directory hierarchy."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 270
# tags : [""]
---

---

## Usage

```plain
find [-H] [-L] [-P] [-Olevel] [-D debugopts] [path...] [expression]
```

## Flags

```plain
Usage: find [-H] [-L] [-P] [-Olevel] [-D debugopts] [path...] [expression]

default path is the current directory; default expression is -print
expression may consist of: operators, options, tests, and actions:
operators (decreasing precedence; -and is implicit where no others are given):
      ( EXPR )   ! EXPR   -not EXPR   EXPR1 -a EXPR2   EXPR1 -and EXPR2
      EXPR1 -o EXPR2   EXPR1 -or EXPR2   EXPR1 , EXPR2
positional options (always true): -daystart -follow -regextype

normal options (always true, specified before other expressions):
      -depth --help -maxdepth LEVELS -mindepth LEVELS -mount -noleaf
      --version -xdev -ignore_readdir_race -noignore_readdir_race
tests (N can be +N or -N or N): -amin N -anewer FILE -atime N -cmin N
      -cnewer FILE -ctime N -empty -false -fstype TYPE -gid N -group NAME
      -ilname PATTERN -iname PATTERN -inum N -iwholename PATTERN -iregex PATTERN
      -links N -lname PATTERN -mmin N -mtime N -name PATTERN -newer FILE
      -nouser -nogroup -path PATTERN -perm [-/]MODE -regex PATTERN
      -readable -writable -executable
      -wholename PATTERN -size N[bcwkMG] -true -type [bcdpflsD] -uid N
      -used N -user NAME -xtype [bcdpfls]      -context CONTEXT

actions: -delete -print0 -printf FORMAT -fprintf FILE FORMAT -print
      -fprint0 FILE -fprint FILE -ls -fls FILE -prune -quit
      -exec COMMAND ; -exec COMMAND {} + -ok COMMAND ;
      -execdir COMMAND ; -execdir COMMAND {} + -okdir COMMAND ;

Valid arguments for -D:
exec, opt, rates, search, stat, time, tree, all, help
Use '-D help' for a description of the options, or see find(1)

Please see also the documentation at http://www.gnu.org/software/findutils/.
You can report (and track progress on fixing) bugs in the "find"
program via the GNU findutils bug-reporting page at
https://savannah.gnu.org/bugs/?group=findutils or, if
you have no web access, by sending email to <bug-findutils@gnu.org>.
```

## Examples

Find all files in the current path and underlying folders

```plain
find .
```

Find files but limit path depth

```plain
find <location> -maxdepth <number-of-folder-depth>
```

Find files with specific name or extensions

```plain
find <location> -name "*.zip"
```

Find files with specific filesize greater then 5MB

```plain
find <location> -size +5M
```

Find files with specific filesize less then 5MB

```plain
find <location> -size -5M
```

Find files between specific filesize range (more then 5MB, less then 10MB)

```plain
find <location> -size +5M -size -10M
```

Copy all found files to specific location - example of all .zip files

```plain
find <location> -name "*.zip" | xargs cp -t <target-folder>
```

Find all files of type .zip greater then 50MB, smaller then 100MB and list them with ls -l

```plain
find <location> -name "*.zip" -size +50M -size -100M -exec ls -l {} \;
```

Find file(s) with specific permissions

```plain
find <location> -perm <permission> 2> /dev/null
```

Find all files with SGID set

```plain
find / -perm -2000 2> /dev/null
```

Find all files with SUID set

```plain
find / -perm -4000 2> /dev/null
```

Find all files with permisson 777

```plain
find / -perm -777 2> /dev/null
```

Find all files modified in the last 7 days

```plain
find . -mtime -7 -ls
```

To find all files modified longer than 7 days ago, use the `+7` instead of `-7` switch.

```plain
find . -mtime +7 -ls
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/find)
