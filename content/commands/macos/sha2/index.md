---
title : "sha2"
# pre : '<i class="fas fa-code"></i> '
description : "Open source implementation of the SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512 secure has algorithms."
date : 2022-09-19T13:08:09+02:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

Open source implementation of the SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512 secure has algorithms.

## Installation

```plain
brew install sha2
```

## Usage

```plain
sha2 [options] [<file>]
```

## Flags

```plain
-256    Generate SHA-256 hash
-384    Generate SHA-284 hash
-512    Generate SHA-512 hash
-ALL    Generate all three hashes
-q      Quiet mode - only output hexadecimal hashes, one per line
```

## Examples

```plain
sha2 -256 kali-linux-2022.3-installer-netinst-amd64.iso                                                                 
SHA-256 (kali-linux-2022.3-installer-netinst-amd64.iso) = 82f702acf37771ac27355c5f9170bf365a73f0cc9e571fb422f7aa58ca218d48
```

## URL List

- [Formulae.brew.sh - sha2](https://formulae.brew.sh/formula/sha2#default)
- [Aarongifford - sha](https://aarongifford.com/computers/sha.html)
