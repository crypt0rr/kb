---
title : "HAITI"
# pre : ' '
description : "A CLI tool to identify the hash type of a given hash."
date : 2022-01-31T11:12:37+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## HAITI - HAsh IdenTifIer

A CLI tool to identify the hash type of a given hash.

Homepage / Documentation: <https://noraj.github.io/haiti/>

### Features

* 442+ hash types detected
* Modern algorithms supported (SHA3, Keccak, Blake2, etc.)
* Hashcat and John the Ripper references
* CLI tool & library
* Hackable

### Installation

```plain
gem install haiti-hash
```

### Usage

```plain
haiti [options] <hash>
haiti -h | --help
haiti --version
```

### Flags

```plain
Options:
  --no-color      Disable colorized output
  -e, --extended  List all possible hash algorithms including ones using salt
  --short         Display in a short format: do not display hashcat and john the ripper references
  --hashcat-only  Show only hashcat references
  --john-only     Show only john the ripper references
  --debug         Display arguments
  -h, --help      Show this screen
  --version       Show version

Examples:
  haiti -e d41d8cd98f00b204e9800998ecf8427e
  haiti --no-color --short d41d8cd98f00b204e9800998ecf8427e
```

### Examples

```plain
$ haiti 786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce
SHA-512 [HC: 1700] [JtR: raw-sha512]
SHA3-512 [HC: 17600] [JtR: raw-sha3]
SHA3-512 [HC: 17600] [JtR: dynamic_400]
Keccak-512 [HC: 18000] [JtR: raw-keccak]
BLAKE2-512 [JtR: raw-blake2]
Whirlpool [HC: 6100] [JtR: whirlpool]
Salsa10
Salsa20
Skein-512 [JtR: skein-512]
Skein-1024(512)
```

### URL list

* [Github.com - Noraj - HAITI](https://github.com/noraj/haiti)
* [Github.com - Orange-Cyberdefense - HAITI](https://github.com/Orange-Cyberdefense/haiti)
