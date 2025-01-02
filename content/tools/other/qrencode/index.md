---
title : "QRencode"
# pre : ' '
description : "Encode input data in a QR Code and save as a PNG or EPS image."
date : 2020-03-13T16:45:38+01:00
# hidden : true
# draft : true
weight : 1430
# tags : ['']
---

---

Encode input data in a QR Code and save as a PNG or EPS image.

## Installation

```plain
sudo apt install qrencode
```

## Usage

```plain
qrencode [OPTION]... [STRING]
```

## Flags

```plain
qrencode version 4.0.2
Copyright (C) 2006-2017 Kentaro Fukuchi
Usage: qrencode [OPTION]... [STRING]
Encode input data in a QR Code and save as a PNG or EPS image.

  -h, --help   display the help message. -h displays only the help of short
               options.

  -o FILENAME, --output=FILENAME
               write image to FILENAME. If '-' is specified, the result
               will be output to standard output. If -S is given, structured
               symbols are written to FILENAME-01.png, FILENAME-02.png, ...
               (suffix is removed from FILENAME, if specified)

  -r FILENAME, --read-from=FILENAME
               read input data from FILENAME.

  -s NUMBER, --size=NUMBER
               specify module size in dots (pixels). (default=3)

  -l {LMQH}, --level={LMQH}
               specify error correction level from L (lowest) to H (highest).
               (default=L)

  -v NUMBER, --symversion=NUMBER
               specify the minimum version of the symbol. See SYMBOL VERSIONS
               for more information. (default=auto)

  -m NUMBER, --margin=NUMBER
               specify the width of the margins. (default=4 (2 for Micro QR)))

  -d NUMBER, --dpi=NUMBER
               specify the DPI of the generated PNG. (default=72)

  -t {PNG,PNG32,EPS,SVG,XPM,ANSI,ANSI256,ASCII,ASCIIi,UTF8,ANSIUTF8},
  --type={PNG,PNG32,EPS,SVG,XPM,ANSI,ANSI256,ASCII,ASCIIi,UTF8,ANSIUTF8}
               specify the type of the generated image. (default=PNG)

  -S, --structured
               make structured symbols. Version must be specified.

  -k, --kanji  assume that the input text contains kanji (shift-jis).

  -c, --casesensitive
               encode lower-case alphabet characters in 8-bit mode. (default)

  -i, --ignorecase
               ignore case distinctions and use only upper-case characters.

  -8, --8bit   encode entire data in 8-bit mode. -k, -c and -i will be ignored.

      --rle    enable run-length encoding for SVG.

      --svg-path
               use single path to draw modules for SVG.

  -M, --micro  encode in a Micro QR Code. (experimental)

      --foreground=RRGGBB[AA]
      --background=RRGGBB[AA]
               specify foreground/background color in hexadecimal notation.
               6-digit (RGB) or 8-digit (RGBA) form are supported.
               Color output support available only in PNG, EPS and SVG.

  -V, --version
               display the version number and copyrights of the qrencode.

      --verbose
               display verbose information to stderr.

  [STRING]     input data. If it is not specified, data will be taken from
               standard input.

SYMBOL VERSIONS
               The symbol versions of QR Code range from Version 1 to Version
               40. Each version has a different module configuration or number
               of modules, ranging from Version 1 (21 x 21 modules) up to
               Version 40 (177 x 177 modules). Each higher version number
               comprises 4 additional modules per side by default. See
               http://www.qrcode.com/en/about/version.html for a detailed
               version list.
```

## Examples

Frequent used flags

```plain
Higher DPI (default 72): -d <number>
Higher size (default 3): -s <number>
```

### Embed URL

```plain
qrencode -o <output>.png <URL>
```

### Embed text

```plain
qrencode -o <output.png>
```

### Embed WiFi connection

```plain
qrencode -o <output>.png "WIFI:T:WPA;S:<SSID>;P:<PASSWORD>;;"
```

## URL List

- [Linux.die.net - qrencode](https://linux.die.net/man/1/qrencode)
