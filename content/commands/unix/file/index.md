---
title : "file"
# pre : '<i class="fas fa-code"></i> '
description : "Determine type of FILEs."
date : 2020-08-22T14:42:49+02:00
# hidden : true
# draft : true
weight : 260
# tags : ['']
---

---

Determine file type.

## Usage

```plain
file [OPTION...] [FILE...]
```

## Flags

```plain
Options:
      --help                 display this help and exit
  -v, --version              output version information and exit
  -m, --magic-file LIST      use LIST as a colon-separated list of magic
                               number files
  -z, --uncompress           try to look inside compressed files
  -Z, --uncompress-noreport  only print the contents of compressed files
  -b, --brief                do not prepend filenames to output lines
  -c, --checking-printout    print the parsed form of the magic file, use in
                               conjunction with -m to debug a new magic file
                               before installing it
  -e, --exclude TEST         exclude TEST from the list of test to be
                               performed for file. Valid tests are:
                               apptype, ascii, cdf, compress, csv, elf,
                               encoding, soft, tar, json, text,
                               tokens
  -f, --files-from FILE      read the filenames to be examined from FILE
  -F, --separator STRING     use string as separator instead of `:'
  -i, --mime                 output MIME type strings (--mime-type and
                               --mime-encoding)
      --apple                output the Apple CREATOR/TYPE
      --extension            output a slash-separated list of extensions
      --mime-type            output the MIME type
      --mime-encoding        output the MIME encoding
  -k, --keep-going           don't stop at the first match
  -l, --list                 list magic strength
  -L, --dereference          follow symlinks (default if POSIXLY_CORRECT is set)
  -h, --no-dereference       don't follow symlinks (default if POSIXLY_CORRECT is not set) (default)
  -n, --no-buffer            do not buffer output
  -N, --no-pad               do not pad output
  -0, --print0               terminate filenames with ASCII NUL
  -p, --preserve-date        preserve access times on files
  -P, --parameter            set file engine parameter limits
                               indir        15 recursion limit for indirection
                               name         30 use limit for name/use magic
                               elf_notes   256 max ELF notes processed
                               elf_phnum   128 max ELF prog sections processed
                               elf_shnum 32768 max ELF sections processed
  -r, --raw                  don't translate unprintable chars to \ooo
  -s, --special-files        treat special (block/char devices) files as
                             ordinary ones
  -S, --no-sandbox           disable system call sandboxing
  -C, --compile              compile file specified by -m
  -d, --debug                print debugging messages

Report bugs to https://bugs.astron.com/
```

## Examples

```plain
$ file index.md
index.md: ASCII text
```

```plain
$ file picture.JPG
picture.JPG: JPEG image data
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/file)
