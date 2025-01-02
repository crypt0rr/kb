---
title : "xxd"
# pre : '<i class="fas fa-code"></i> '
description : "Make a hexdump or do the reverse."
date : 2020-04-03T17:17:25+02:00
# hidden : true
# draft : true
weight : 1020
# tags : ['']
---

---

Make a hexdump or do the reverse.

## Usage

```plain
xxd [options] [infile [outfile]]
```

## Flags

```plain
or
    xxd -r [-s [-]offset] [-c cols] [-ps] [infile [outfile]]
Options:
    -a          toggle autoskip: A single '*' replaces nul-lines. Default off.
    -b          binary digit dump (incompatible with -ps,-i,-r). Default hex.
    -C          capitalize variable names in C include file style (-i).
    -c cols     format <cols> octets per line. Default 16 (-i: 12, -ps: 30).
    -E          show characters in EBCDIC. Default ASCII.
    -e          little-endian dump (incompatible with -ps,-i,-r).
    -g          number of octets per group in normal output. Default 2 (-e: 4).
    -h          print this summary.
    -i          output in C include file style.
    -l len      stop after <len> octets.
    -o off      add <off> to the displayed file position.
    -ps         output in postscript plain hexdump style.
    -r          reverse operation: convert (or patch) hexdump into binary.
    -r -s off   revert with <off> added to file positions found in hexdump.
    -s [+][-]seek  start at <seek> bytes abs. (or +: rel.) infile offset.
    -u          use upper case hex letters.
    -v          show version: "xxd V1.10 27oct98 by Juergen Weigert".
```

## Examples

```plain
xxd test.txt

00000000: 4e6f 2e7c 436f 756e 7472 797c 5965 732f  No.|Country|Yes/
00000010: 4e6f 0a30 317c 496e 6469 617c 590a 3032  No.01|India|Y.02
00000020: 7c55 537c 590a 3033 7c41 7573 7472 616c  |US|Y.03|Austral
00000030: 6961 7c59 0a0a 3034 7c43 6869 6e61 7c4e  ia|Y..04|China|N
00000040: 0a30 357c 5275 7373 6961 7c59 0a30 367c  .05|Russia|Y.06|
00000050: 4a61 7061 6e7c 590a 0a30 377c 5369 6e67  Japan|Y..07|Sing
00000060: 7061 6f72 657c 590a 3038 7c53 6f75 7468  paore|Y.08|South
00000070: 204b 6f72 6561 7c4e 0a30 397c 4669 6e61   Korea|N.09|Fina
00000080: 6c61 6e64 7c59 0a31 307c 4972 656c 616e  land|Y.10|Irelan
00000090: 647c 590a                                d|Y.
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/xxd)
