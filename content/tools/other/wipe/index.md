---
title : "Wipe"
# pre : ' '
description : "The wipe command can be used to securely erase files from magnetic media."
date : 2020-03-13T15:42:10+01:00
# hidden : true
# draft : true
weight : 2060
tags : ['Other', 'Harddisk']
---

---

The wipe command can be used to securely erase files from magnetic media.

## Installation

```plain
sudo apt install wipe
```

## Usage

```plain
wipe [options] <target>
```

## Flags

```plain
Usage: wipe [options] files...
Options:
    -a Abort on error
    -b <buffer-size-lg2> Set the size of the individual i/o buffers
        by specifying its logarithm in base 2. Up to 30 of these
        buffers might be allocated
    -c Do a chmod() on write-protected files
    -D Dereference symlinks (conflicts with -r)
    -e Use exact file size: do not round up file size to wipe
        possible junk remaining on the last block
    -f Force, i.e. don't ask for confirmation
    -F Do not attempt to wipe filenames
    -h Display this help
    -i Informative (verbose) mode
    -k Keep files, i.e. do not remove() them after overwriting
    -l <length> Set wipe length to <length> bytes, where <length> is
        an integer followed by K (Kilo:1024), M (Mega:K^2) or G (Giga:K^3)
    -M (l|r) Set PRNG algorithm for filling blocks (and ordering passes)
        l Use libc's random() library call
        a Use arcfour encryption algorithm
    -o <offset> Set wipe offset to <offset>, where <offset> has the
        same format as <length>
    -P <passes> Set number of passes for filename wiping.
        Default is 1.
    -Q <number> set number of passes for quick wipe
    -q Quick wipe, less secure, 4 random passes by default
    -r Recurse into directories -- symlinks will not be followed
    -R Set random device (or random seed command with -S c)
    -S (r|c|p) Random seed method
        r Read from random device (strong)
        c Read from output of random seed command
        p Use pid(), clock() etc. (weakest)
    -s Silent mode -- suppresses all output
    -T <tries> Set maximum number of tries for free
        filename search; default is 10
    -v Show version information
    -Z Do not attempt to wipe file size
    -X <number> Skip this number of passes (useful for continuing a wiping operation)
    -x <pass1,pass2,...> Define pass order
```

## Examples

```plain
wipe -r /media/b/1GB-USB
Okay to WIPE 1 directory ? (Yes/No) yes
Wiping 1.h2w, pass 0  (0 )  4305 /    60718]  ETA 3h08m
```

## URL List

- [Linux.die.net - wipe](https://linux.die.net/man/1/wipe)
