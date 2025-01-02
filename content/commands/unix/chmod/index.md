---
title: "chmod"
# pre : '<i class="fas fa-code"></i> '
description: "Change file mode bits."
date: 2020-03-10T16:18:52+01:00
# hidden : true
# draft : true
weight: 110
# tags : [""]
---

---

## Usage

```plain
chmod [OPTION]... MODE[,MODE]... FILE...
```

## Flags

```plain
Usage: chmod [OPTION]... MODE[,MODE]... FILE...
  or:  chmod [OPTION]... OCTAL-MODE FILE...
  or:  chmod [OPTION]... --reference=RFILE FILE...
Change the mode of each FILE to MODE.
With --reference, change the mode of each FILE to that of RFILE.

  -c, --changes          like verbose but report only when a change is made
  -f, --silent, --quiet  suppress most error messages
  -v, --verbose          output a diagnostic for every file processed
      --no-preserve-root  do not treat '/' specially (the default)
      --preserve-root    fail to operate recursively on '/'
      --reference=RFILE  use RFILEs mode instead of MODE values
  -R, --recursive        change files and directories recursively
      --help     display this help and exit
      --version  output version information and exit

Each MODE is of the form '[ugoa]*([-+=]([rwxXst]*|[ugo]))+|[-+=][0-7]+'.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/chmod>
or available locally via: info '(coreutils) chmod invocation'
```

## Chmod Rights

- `r` - Read rights
- `w` - Write rights
- `x` - Execute rights

| Number | Permissions | Build-up |
| ------ | ----------- | -------- |
| 0      | - - -       | 0+0+0    |
| 1      | - - x       | 0+0+1    |
| 2      | - w -       | 0+2+0    |
| 3      | - w x       | 0+2+1    |
| 4      | r - -       | 4+0+0    |
| 5      | r - x       | 4+0+1    |
| 6      | r w -       | 4+2+0    |
| 7      | r w x       | 4+2+1    |

Example privilege string `rwxr--r--`

- First block is rights for the specific user
- Second block is rights for the specific group
- Third block is rights for everyone else

## Examples

Change permissions of 'testfile.txt'

```plain
$ ll testfile.txt
-rwxrwxrwx 1 b b 72 mrt  9 20:53 testfile.txt

$ chmod 400 testfile.txt

$ ll testfile.txt
-r-------- 1 b b 72 mrt  9 20:53 testfile.txt
```

Add execution permissions

```plain
$ ll testfile.txt
-r-------- 1 b b 72 mrt  9 20:53 testfile.txt

$ chmod +x testfile.txt

$ ll testfile.txt
-r-x--x--x 1 b b 72 mrt  9 20:53 testfile.txt
```

Add execution permissions for only the user

```plain
$ ll testfile.txt
-r-------- 1 b b 72 mrt  9 20:53 testfile.txt

$ chmod u+x testfile.txt

$ ll testfile.txt
-r-x------ 1 b b 72 mrt  9 20:53 testfile.txt
```

## URL List

- [GNU.org](https://www.gnu.org/software/coreutils/chmod)
