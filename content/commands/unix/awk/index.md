---
title: "awk"
# pre : '<i class="fas fa-code"></i> '
description: "Pattern scanning and text processing language - Awk puts every input into a list of objects."
date: 2020-03-10T16:18:52+01:00
# hidden : true
# draft : true
weight: 30
# tags : [""]
---

---

## Usage

```plain
awk OPTIONS PROGRAM FILE
```

## Flags

```plain
OFS=""                      Add seperator between ""
$NF                         End of file
'BEGIN {print "SomeText"}'  Start with text
```

## Examples

Pipe who command to awk and print the first and third object in a line

```plain
who | awk '{print $1,$3}'
```

Cat a file and print first, second and last word of the file

```plain
cat <file> | awk '{print $1,$2,$NF}'
```

Get date, month year

```plain
date | awk '{print $2,$3,$4}'
Result: 28 feb 2020
```

Use a file with seperator : in items

```plain
awk -F: '{print $1,$6}' /etc/passwd
```

Grab first and last word per line in file

```plain
$ cat testfile.txt
This is a test file.
Or not this kind of test file.
Where are the cats.

$ cat testfile.txt | awk '{print $1,$NF}'
This file.
Or file.
Where cats.
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/awk)
