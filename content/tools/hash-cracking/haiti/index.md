---
title : "HAITI"
# pre : ' '
description : "A CLI tool to identify the hash type of a given hash."
date : 2022-01-31T11:12:37+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

A CLI tool to identify the hash type of a given hash.

Homepage / Documentation: <https://noraj.github.io/haiti/>

### Features

- 442+ hash types detected
- Modern algorithms supported (SHA3, Keccak, Blake2, etc.)
- Hashcat and John the Ripper references
- CLI tool & library
- Hackable

## Why HAITI?

| Tool                                                                  | Maintained    | Color | Ref. | Library | Lang | #   | 🔢    |
| --------------------------------------------------------------------- | ------------- | ----- | ---- | ------- | ---- | --- | ---- |
| [haiti](https://github.com/noraj/haiti)                               | ✅ (2019-now)  | ✅     | ✅    | ✅       | 💎    | ✅   | 483+ |
| [hashID](https://github.com/psypanda/hashID)                          | ❌ (2013-2015) | ❌     | ✅    | ❌       | 🐍    | ⭕️   | 275  |
| [hash-identifier](https://code.google.com/archive/p/hash-identifier/) | ❌ (2011-2011) | ❌     | ❌    | ❌       | 🐍    | ❌   | ~126 |
| [Dagon](https://github.com/Ekultek/Dagon)                             | ❌ (2017-2018) | ⭕️     | ❌    | ❌       | 🐍    | ⭕️   | ~48  |
| [findmyhash](https://code.google.com/archive/p/findmyhash)            | ❌ (2011-2011) | ❌     | ❌    | ❌       | 🐍    | ❌   | ~17  |
| [Name-That-Hash](https://github.com/HashPals/Name-That-Hash)          | ✅ (2021-now)  | ✅     | ✅    | ✅       | 🐍    | ✅   | 365  |
| [HashTag](https://github.com/SmeegeSec/HashTag)                       | ❌ (2013-2013) | ❌     | ❌    | ❌       | 🐍    | ⭕   | ~137 |
| [houndsniff](https://github.com/MichaelDim02/houndsniff)              | ✅ (2020-now)  | ✅     | ❌    | ❌       | 🇨    | ❌   | 51   |

Legend:

- Ref.: hashcat and john the ripper matching reference
- ✅: feature supported
- ❌: feature not supported
- ⭕️: feature partially supported
- Programming langage:
  - 💎: Ruby
  - 🐍: Python
  - 🇨 : C
- \# correct modern hashes support
- 🔢 number of hash types supported

## Installation

```plain
gem install haiti-hash
```

## Usage

```plain
haiti [options] <hash>
haiti samples (<ref> | <name>)
haiti -h | --help
haiti --version
```

## Flags

```plain
Commands:
  samples         Display hash samples for the given type

Parameters:
  <hash>          Hash string to identify, read from STDIN if equal to "-"
  <ref>           hashcat or john the ripper reference
  <name>          Hash type name

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
  b2sum /etc/os-release | awk '{print $1}' | haiti -
  haiti samples crc32
```

## Examples

```plain
$ haiti 786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce
SHA3-512 [HC: 17600] [JtR: raw-sha3]
SHA3-512 [HC: 17600] [JtR: dynamic_400]
Keccak-512 [HC: 18000] [JtR: raw-keccak]
BLAKE2-512 [JtR: raw-blake2]
SHA-512 [HC: 1700] [JtR: raw-sha512]
MD6-512
Umbraco HMAC-SHA1 [HC: 24800]
Whirlpool [HC: 6100] [JtR: whirlpool]
Salsa10
Salsa20
Skein-512 [JtR: skein-512]
```

## URL List

- [Github.com - Noraj - HAITI](https://github.com/noraj/haiti)
- [Noraj.github.com - Documentation](https://noraj.github.io/haiti/#/)
- [Github.com - Orange-Cyberdefense - HAITI](https://github.com/Orange-Cyberdefense/haiti)
