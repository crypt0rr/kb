---
title : "Hexyl"
# pre : ' '
description : "A command-line hex viewer."
date : 2023-06-17T21:49:35+02:00
# hidden : true
# draft : true
weight : 810
# tags : ['']
---

---

`hexyl` is a simple hex viewer for the terminal. It uses a colored output to distinguish different categories of bytes (NULL bytes, printable ASCII characters, ASCII whitespace characters, other ASCII characters and non-ASCII).

## Color Reference

| Type of Byte     | Color                                                                 | ANSI Code |
| ---------------- | --------------------------------------------------------------------- | --------- |
| NULL             | ![#555753](https://placehold.co/10x10/555753/555753.png) Bright Black | 90        |
| OFFSET           | ![#555753](https://placehold.co/10x10/555753/555753.png) Bright Black | 90        |
| ASCII Printable  | ![#06989a](https://placehold.co/10x10/06989a/06989a.png) Cyan         | 36        |
| ASCII Whitespace | ![#4e9a06](https://placehold.co/10x10/4e9a06/4e9a06.png) Green        | 32        |
| ASCII Other      | ![#4e9a06](https://placehold.co/10x10/4e9a06/4e9a06.png) Green        | 32        |
| Non-ASCII        | ![#c4a000](https://placehold.co/10x10/c4a000/c4a000.png) Yellow       | 33        |

## Installation

Please look at the [installation page](https://github.com/sharkdp/hexyl#installation).

## Usage

```plain
hexyl [OPTIONS] [FILE]
```

## Flags

```plain
Arguments:
  [FILE]  The file to display. If no FILE argument is given, read from STDIN.

Options:
  -n, --length <N>           Only read N bytes from the input. The N argument can also
                             include a unit with a decimal prefix (kB, MB, ..) or binary
                             prefix (kiB, MiB, ..), or can be specified using a hex
                             number. The short option '-l' can be used as an alias.
                             Examples: --length=64, --length=4KiB, --length=0xff
  -c, --bytes <N>            An alias for -n/--length
  -s, --skip <N>             Skip the first N bytes of the input. The N argument can also
                             include a unit (see `--length` for details)
                             A negative value is valid and will seek from the end of the
                             file.
      --block-size <SIZE>    Sets the size of the `block` unit to SIZE (default is 512).
                             Examples: --block-size=1024, --block-size=4kB
  -v, --no-squeezing         Displays all input data. Otherwise any number of groups of
                             output lines which would be identical to the preceding group
                             of lines, are replaced with a line comprised of a single
                             asterisk.
      --color <WHEN>         When to use colors. The auto-mode only displays colors if the
                             output goes to an interactive terminal [default: always]
                             [possible values: always, auto, never]
      --border <STYLE>       Whether to draw a border with Unicode characters, ASCII
                             characters, or none at all [default: unicode] [possible
                             values: unicode, ascii, none]
  -p, --plain                Display output with --no-characters, --no-position,
                             --border=none, and --color=never.
      --no-characters        Do not show the character panel on the right.
  -C, --characters           Show the character panel on the right. This is the default,
                             unless --no-characters has been specified.
  -P, --no-position          Whether to display the position panel on the left.
  -o, --display-offset <N>   Add N bytes to the displayed file position. The N argument
                             can also include a unit (see `--length` for details)
                             A negative value is valid and calculates an offset relative
                             to the end of the file.
      --panels <N>           Sets the number of hex data panels to be displayed.
                             `--panels=auto` will display the maximum number of hex data
                             panels based on the current terminal width. By default, hexyl
                             will show two panels, unless the terminal is not wide enough
                             for that.
  -g, --group-size <N>       Number of bytes/octets that should be grouped together.
                             Possible group sizes are 1, 2, 4, 8. The default is 1. You
                             can use the '--endianness' option to control the ordering of
                             the bytes within a group. '--groupsize' can be used as an
                             alias (xxd-compatibility).
      --endianness <FORMAT>  Whether to print out groups in little-endian or big-endian
                             format. This option only has an effect if the '--group-size'
                             is larger than 1. '-e' can be used as an alias for
                             '--endianness=little'. [default: big] [possible values: big,
                             little]
  -b, --base <B>             Sets the base used for the bytes. The possible options are
                             binary, octal, decimal, and hexadecimal. The default base is
                             hexadecimal.
      --terminal-width <N>   Sets the number of terminal columns to be displayed.
                             Since the terminal width may not be an evenly divisible by
                             the width per hex data column, this will use the greatest
                             number of hex data panels that can fit in the requested width
                             but still leave some space to the right.
                             Cannot be used with other width-setting options.
  -h, --help                 Print help information
  -V, --version              Print version information
```

## Examples

![example](https://i.imgur.com/MWO9uSL.png)

![example](https://i.imgur.com/Dp7Wncz.png)

![example](https://i.imgur.com/ln3TniI.png)

![example](https://i.imgur.com/f8nm8g6.png)

## URL list

- [Github.com - hexyl](https://github.com/sharkdp/hexyl)
