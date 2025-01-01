---
title : "Stegseek"
# pre : ' '
description : "Stegseek is a lightning fast steghide cracker that can be used to extract hidden data from files. It is built as a fork of the original steghide project and, as a result, it is thousands of times faster than other crackers and can run through the entirety of rockyou.txt* in under 2 seconds."
date : 2021-07-01T16:11:13+02:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Is a lightning fast steghide cracker that can be used to extract hidden data from files. It is built as a fork of the original steghide project and, as a result, it is thousands of times faster than other crackers and can run through the entirety of rockyou.txt* in under 2 seconds

## Installation

Download newest release at [Github.com](https://github.com/RickdeJager/stegseek/releases).

```plain
sudo dpkg -i stegseek*
```

## Usage

```plain
stegseek [stegofile.jpg] [wordlist.txt]
```

## Flags

```plain
Commands:
 --crack                 Crack a stego file using a wordlist. This is the default mode.
 --seed                  Crack a stego file by attempting all embedding patterns.
                         This mode can be used to detect a file encoded by steghide.
                         In case the file was encoded without encryption, this mode will
                         even recover the embedded file.
Positional arguments:
 --crack [stegofile.jpg] [wordlist.txt] [output.txt]
 --seed  [stegofile.jpg] [output.txt]

Keyword arguments:
 -sf, --stegofile        select stego file
 -wl, --wordlist         select the wordlist file
 -xf, --extractfile      select file name for extracted data
 -t, --threads           set the number of threads. Defaults to the number of cores.
 -f, --force             overwrite existing files
 -v, --verbose           display detailed information
 -q, --quiet             hide performance metrics (can improve performance)
 -s, --skipdefault       don't add guesses to the wordlist (empty password, filename, ...)
 -n, --nocolor           disable colors in output
 -c, --continue          continue cracking after a result has been found.
                         (A stego file might contain multiple embedded files)
 -a, --accessible        simplify the output to be more screen reader friendly

Use "stegseek --help -v" to include steghide's help.
```

## Examples

### Cracking

The most important feature of stegseek is wordlist cracking:

```plain
stegseek [stegofile.jpg] [wordlist.txt]
```

This mode will simply try all passwords in the provided wordlist against the provided stegofile.

### Detection and passwordless extraction (CVE-2021-27211)

Stegseek can also be used to detect and extract any unencrypted (meta) data from a steghide image. This exploits the fact that the random number generator used in steghide only has 2^32 possible seeds, which can be bruteforced in a matter of minutes.

```plain
stegseek --seed [stegofile.jpg]
```

This command will tell you:

- Whether this file actually contains steghide content.
- How much hidden content the file contains.
- How the content was encrypted.

If you're (very) lucky and the file was encoded without encryption, this mode will even recover the encoded file for you!

The below demo features a challenge from X-MAS CTF 2020. A flag was hidden using a secure random password, but without encryption enabled. Within a few minutes, Stegseek is able to recover the embedded file without needing to guess the correct password.

![Example](images/seed.gif)

## URL List

- [Github.com - Stegseek](https://github.com/RickdeJager/stegseek)
