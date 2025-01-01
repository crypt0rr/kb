---
title : "df"
# pre : '<i class="fas fa-code"></i> '
description : "Show information about the file system on which each FILE resides, or all file systems by default."
date : 2020-08-22T14:30:21+02:00
# hidden : true
# draft : true
weight : 190
# tags : ['']
---

---

Show information about the file system on which each FILE resides, or all file systems by default.

## Usage

```plain
df [OPTION]... [FILE]...
```

## Flags

```plain
Mandatory arguments to long options are mandatory for short options too.
  -a, --all             include pseudo, duplicate, inaccessible file systems
  -B, --block-size=SIZE  scale sizes by SIZE before printing them; e.g.,
                           '-BM' prints sizes in units of 1,048,576 bytes;
                           see SIZE format below
  -h, --human-readable  print sizes in powers of 1024 (e.g., 1023M)
  -H, --si              print sizes in powers of 1000 (e.g., 1.1G)
  -i, --inodes          list inode information instead of block usage
  -k                    like --block-size=1K
  -l, --local           limit listing to local file systems
      --no-sync         do not invoke sync before getting usage info (default)
      --output[=FIELD_LIST]  use the output format defined by FIELD_LIST,
                               or print all fields if FIELD_LIST is omitted.
  -P, --portability     use the POSIX output format
      --sync            invoke sync before getting usage info
      --total           elide all entries insignificant to available space,
                          and produce a grand total
  -t, --type=TYPE       limit listing to file systems of type TYPE
  -T, --print-type      print file system type
  -x, --exclude-type=TYPE   limit listing to file systems not of type TYPE
  -v                    (ignored)
      --help     display this help and exit
      --version  output version information and exit

Display values are in units of the first available SIZE from --block-size,
and the DF_BLOCK_SIZE, BLOCK_SIZE and BLOCKSIZE environment variables.
Otherwise, units default to 1024 bytes (or 512 if POSIXLY_CORRECT is set).

The SIZE argument is an integer and optional unit (example: 10K is 10*1024).
Units are K,M,G,T,P,E,Z,Y (powers of 1024) or KB,MB,... (powers of 1000).

FIELD_LIST is a comma-separated list of columns to be included.  Valid
field names are: 'source', 'fstype', 'itotal', 'iused', 'iavail', 'ipcent',
'size', 'used', 'avail', 'pcent', 'file' and 'target' (see info page).

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/df>
or available locally via: info '(coreutils) df invocation'
```

## Examples

### Show all devices human readable

```plain
$ df -h
Filesystem             Size  Used Avail Use% Mounted on
udev                   7.7G     0  7.7G   0% /dev
tmpfs                  1.6G  2.3M  1.6G   1% /run
/dev/mapper/data-root  461G  132G  306G  31% /
tmpfs                  7.8G  140M  7.6G   2% /dev/shm
tmpfs                  5.0M     0  5.0M   0% /run/lock
tmpfs                  7.8G     0  7.8G   0% /sys/fs/cgroup
[...]
```

### Show specific folder, usage and mountpoint

```plain
$ df -h /home
Filesystem             Size  Used Avail Use% Mounted on
/dev/mapper/data-root  461G  132G  306G  31% /
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/df)
- [Tecmint.com](https://www.tecmint.com/how-to-check-disk-space-in-linux/)
