---
title : "FCrackZip"
# pre : ' '
description : "fcrackzip is a zip password cracker, similar to fzc, zipcrack and others."
date : 2022-05-29T20:01:45+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

fcrackzip version 1.0, a fast/free zip password cracker written by Marc Lehmann <pcg@goof.com>.

## Installation

Download latest source (2008) from the [website](http://oldhome.schmorp.de/marc/fcrackzip.html).

Or use Brew.

```plain
brew install fcrackzip
```

## Usage

```plain
fcrackzip [OPTIONS]
```

## Flags

```plain
    [-b|--brute-force]            use brute force algorithm
    [-D|--dictionary]             use a dictionary
    [-B|--benchmark]              execute a small benchmark
    [-c|--charset characterset]   use characters from charset
    [-h|--help]                   show this message
    [--version]                   show the version of this program
    [-V|--validate]               sanity-check the algortihm
    [-v|--verbose]                be more verbose
    [-p|--init-password string]   use string as initial password/file
    [-l|--length min-max]         check password with length min to max
    [-u|--use-unzip]              use unzip to weed out wrong passwords
    [-m|--method num]             use method number "num" (see below)
    [-2|--modulo r/m]             only calculcate 1/m of the password
    file...                    the zipfiles to crack

methods compiled in (* = default):

 0: cpmask
 1: zip1
*2: zip2, USE_MULT_TAB
```

## Examples

```plain
$ fcrackzip -D -p rockyou.txt -v -u archive.zip
found file 'secretfile.txt', (size cp/uc     35/    23, flags 1, chk f8e7)


PASSWORD FOUND!!!!: pw == thisisapassword
```

{{%resources title="Example archive used" fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

## URL List

- [Oldhome.schmorp.de - fcrackzip](http://oldhome.schmorp.de/marc/fcrackzip.html)
- [Formulae.brew.sh - fcrackzip](https://formulae.brew.sh/formula/fcrackzip#default)
