---
title : "Ghostscript"
# pre : '<i class="fas fa-code"></i> '
description : "Ghostscript (PostScript and PDF language interpreter and previewer)."
date : 2022-11-13T17:02:29+01:00
# hidden : true
# draft : true
weight : 310
# tags : ['']
---

---

Ghostscript is an interpreter for the [PostScript®](https://en.wikipedia.org/wiki/PostScript) language and [PDF](https://en.wikipedia.org/wiki/PDF) files. It is available under either the [GNU GPL Affero license](https://www.gnu.org/licenses/agpl-3.0.html) or [licensed for commercial](https://artifex.com/licensing/commercial/) use from [Artifex Software, Inc.](https://artifex.com/) It has been under active development for over 30 years and has been ported to several different systems during this time. Ghostscript consists of a PostScript interpreter layer and a graphics library.

## Usage

```plain
gs [switches] [file1.ps file2.ps ...]
```

## Flags

```plain
Most frequently used switches: (you can use # in place of =)
 -dNOPAUSE           no pause after page   | -q       `quiet', fewer messages
 -g<width>x<height>  page size in pixels   | -r<res>  pixels/inch resolution
 -sDEVICE=<devname>  select device         | -dBATCH  exit after last file
 -sOutputFile=<file> select output file: - for stdout, |command for pipe, embed %d or %ld for page #
```

## Examples

### PDF to Text conversion

```plain
$ gs -sDEVICE=txtwrite -o pdf_dump.txt LOG.pdf 
GPL Ghostscript 10.0.0 (2022-09-21)
Copyright (C) 2022 Artifex Software, Inc.  All rights reserved.
This software is supplied under the GNU AGPLv3 and comes with NO WARRANTY:
see the file COPYING for details.
Processing pages 1 through 2.
Page 1
Page 2
```

### Other examples

- PDF To JPEG `gs -q -dBATCH -dNOPAUSE -dFirstPage=1 -dLastPage=1 -sDEVICE=jpeg -r<OUTPUT RESOLUTION> -sOutputFile=<OUTPUT>.jpg <INPUT>.pdf`
- 'Normalize' PDF `gs -dSAFER -dBATCH -dNOPAUSE -dNOCACHE -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=output.pdf input.pdf`
- Color PDF to greyscale `gs -dSAFER -dBATCH -dNOPAUSE -dNOCACHE -sDEVICE=pdfwrite -sColorConversionStrategy=Gray -dProcessColorModel=/DeviceGray -sOutputFile=output.pdf input.pdf`

## URL list

- [GhostScript.com](https://www.ghostscript.com/)
- [GhostScript.com - ReadMe](https://ghostscript.com/docs/9.56.1/Readme.htm)
