---
title : "tr"
# pre : '<i class="fas fa-code"></i> '
description : "Translate, squeeze, and/or delete characters from standard input, writing to standard output."
date : 2020-11-24T15:44:09+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Tr - Translate, squeeze, and/or delete characters from standard input, writing to standard output

### Usage

```plain
tr [OPTION]... SET1 [SET2]
```

### Flags

```plain
  -c, -C, --complement    use the complement of SET1
  -d, --delete            delete characters in SET1, do not translate
  -s, --squeeze-repeats   replace each sequence of a repeated character
                            that is listed in the last specified SET,
                            with a single occurrence of that character
  -t, --truncate-set1     first truncate SET1 to length of SET2
      --help     display this help and exit
      --version  output version information and exit

SETs are specified as strings of characters.  Most represent themselves.
Interpreted sequences are:

  \NNN            character with octal value NNN (1 to 3 octal digits)
  \\              backslash
  \a              audible BEL
  \b              backspace
  \f              form feed
  \n              new line
  \r              return
  \t              horizontal tab
  \v              vertical tab
  CHAR1-CHAR2     all characters from CHAR1 to CHAR2 in ascending order
  [CHAR*]         in SET2, copies of CHAR until length of SET1
  [CHAR*REPEAT]   REPEAT copies of CHAR, REPEAT octal if starting with 0
  [:alnum:]       all letters and digits
  [:alpha:]       all letters
  [:blank:]       all horizontal whitespace
  [:cntrl:]       all control characters
  [:digit:]       all digits
  [:graph:]       all printable characters, not including space
  [:lower:]       all lower case letters
  [:print:]       all printable characters, including space
  [:punct:]       all punctuation characters
  [:space:]       all horizontal or vertical whitespace
  [:upper:]       all upper case letters
  [:xdigit:]      all hexadecimal digits
  [=CHAR=]        all characters which are equivalent to CHAR

Translation occurs if -d is not given and both SET1 and SET2 appear.
-t may be used only when translating.  SET2 is extended to length of
SET1 by repeating its last character as necessary.  Excess characters
of SET2 are ignored.  Only [:lower:] and [:upper:] are guaranteed to
expand in ascending order; used in SET2 while translating, they may
only be used in pairs to specify case conversion.  -s uses the last
specified SET, and occurs after translation or deletion.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/tr>
or available locally via: info '(coreutils) tr invocation'
```

### Examples

#### Remove every char you don't want in output

```plain
cat example.json
{ "subdomains": [ "docs", "blogs", "apex", "cloud", "oss", "community", "asktom", "education", "forums", "linux", "edelivery", "labs" ], "meta": { "limit_reached": true }, "endpoint": "/v1/domain/example.com" }
```

```plain
$ jq -r '.subdomains' example.json | tr -d '",[] '

docs
blogs
apex
cloud
oss
community
asktom
education
forums
linux
edelivery
labs
```

#### All lines in file to upper/lower case

```plain
$ cat da.txt | tr '[:upper:]' '[:lower:]'       
svc_connect
svc_crm365
svc_lmt
svc_curium
```

#### Delete newlines from current output/file

```plain
$ diff file1 file2
369a370
> c
698d698
< r
1075a1076
> y
1400d1400
< p
1722a1723
> t
2127d2127
< 0
2483a2484
> r
2829d2829
< r
3224a3225
> o
3586d3586
< f
3988a3989
> f
4332d4332
< s
4731a4732
> e
5096d5096
< c
```

```plain
$ diff file1 file2 | grep -v "^[0-9c0-9]" | cut -d ' ' -f2 | tr --delete '\n'
crypt0rroffsec
```

### URL list

* [Linux.die.net](https://linux.die.net/man/1/tr)
