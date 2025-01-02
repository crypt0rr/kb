---
title : "ln"
# pre : '<i class="fas fa-code"></i> '
description : "Make links between files."
date : 2021-03-17T11:45:31+01:00
# hidden : true
# draft : true
weight : 460
# tags : ['']
---

---

Make links between files.

## Usage

```plain
Usage: ln [OPTION]... [-T] TARGET LINK_NAME
  or:  ln [OPTION]... TARGET
  or:  ln [OPTION]... TARGET... DIRECTORY
  or:  ln [OPTION]... -t DIRECTORY TARGET...

In the 1st form, create a link to TARGET with the name LINK_NAME.
In the 2nd form, create a link to TARGET in the current directory.
In the 3rd and 4th forms, create links to each TARGET in DIRECTORY.
```

## Flags

```plain
Create hard links by default, symbolic links with --symbolic.
By default, each destination (name of new link) should not already exist.
When creating hard links, each TARGET must exist.  Symbolic links
can hold arbitrary text; if later resolved, a relative link is
interpreted in relation to its parent directory.

Mandatory arguments to long options are mandatory for short options too.
      --backup[=CONTROL]      make a backup of each existing destination file
  -b                          like --backup but does not accept an argument
  -d, -F, --directory         allow the superuser to attempt to hard link
                                directories (note: will probably fail due to
                                system restrictions, even for the superuser)
  -f, --force                 remove existing destination files
  -i, --interactive           prompt whether to remove destinations
  -L, --logical               dereference TARGETs that are symbolic links
  -n, --no-dereference        treat LINK_NAME as a normal file if
                                it is a symbolic link to a directory
  -P, --physical              make hard links directly to symbolic links
  -r, --relative              create symbolic links relative to link location
  -s, --symbolic              make symbolic links instead of hard links
  -S, --suffix=SUFFIX         override the usual backup suffix
  -t, --target-directory=DIRECTORY  specify the DIRECTORY in which to create
                                the links
  -T, --no-target-directory   treat LINK_NAME as a normal file always
  -v, --verbose               print name of each linked file
      --help     display this help and exit
      --version  output version information and exit

The backup suffix is '~', unless set with --suffix or SIMPLE_BACKUP_SUFFIX.
The version control method may be selected via the --backup option or through
the VERSION_CONTROL environment variable.  Here are the values:

  none, off       never make backups (even if --backup is given)
  numbered, t     make numbered backups
  existing, nil   numbered if numbered backups exist, simple otherwise
  simple, never   always make simple backups

Using -s ignores -L and -P.  Otherwise, the last option specified controls
behavior when a TARGET is a symbolic link, defaulting to -P.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/ln>
or available locally via: info '(coreutils) ln invocation'
```

## Examples

### Make symbolic link

Symbolic links are essentially shortcuts that reference to a file instead of its inode value. This method can be applied to directories and can reference across different hard disks/volumes. Since the symbolic link is referring to the original file and not its inode value, then replacing the original file into a different folder will break the symbolic link, or create a dangling link.

```plain
$ cat file1      
abcd
efgh

$ ln -s file1 sym-link-test

$ cat sym-link-test     
abcd
efgh

$ ll sym-link-test   
lrwxrwxrwx 1 johndo johndo 5 Mar 17 11:47 sym-link-test -> file1
```

### Hardlink

A hard link is a direct reference to a file via its inode. You can also only hardlink files and not directories. By using a hardlink, you can change the original file's contents or location and the hardlink will still point to the original file because its inode is still pointing to that file. There is no referencing to the original file. In addition, hardlinks can only refer to files within the same volume otherwise symbolic links will be needed.

```plain
$ cat file1      
abcd
efgh

$ ln file1 hardlink-test

$ cat hardlink-test  
abcd
efgh

$ ll hardlink-test 
-rw-rw-r-- 2 b b 10 Mar 17 11:39 hardlink-test
```

## URL List

- [Linux.die.net - ln](https://linux.die.net/man/1/ln)
- [Medium.com - Hard links and Symbolic links — A comparison](https://medium.com/@307/hard-links-and-symbolic-links-a-comparison-7f2b56864cdd)
