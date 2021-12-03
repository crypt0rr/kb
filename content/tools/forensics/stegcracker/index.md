---
title : "StegCracker"
# pre : ' '
description : "Steganography brute-force utility to uncover hidden data inside files."
date : 2021-07-01T16:07:59+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## StegCracker

Steganography brute-force utility to uncover hidden data inside files.

Please use [Stegeek]({{< ref "stegseek" >}}), newer and quicker.

### Installation

```plain
pip3 install stegcracker
```

### Usage

```plain
stegcracker <file> [<wordlist>]
```

### Flags

```plain
StegCracker 2.1.0 - (https://github.com/Paradoxis/StegCracker)
Copyright (c) 2021 - Luke Paris (Paradoxis)

StegCracker has been retired following the release of StegSeek, which 
will blast through the rockyou.txt wordlist within 1.9 second as opposed 
to StegCracker which takes ~5 hours.

StegSeek can be found at: https://github.com/RickdeJager/stegseek

Steganography brute-force utility to uncover hidden data inside files

positional arguments:
  file
       Input file you think contains hidden information and wish to crack. Note: Stegcracker only accepts the following file types: jpg, jpeg, bmp, wav, au

  wordlist
       Wordlist containing the one or more passwords (one password per line). If no password list is supplied, this will default to the rockyou.txt wordlist on Kali Linux.

optional arguments:
  -h, --help
       Show this help message and exit

  -o OUTPUT, --output OUTPUT
       Output file location, this will be the file the data will be written to on a successful cracked password. If no output location is specified, the default location will be the same filename with ".out" appended to the name.

  -t THREADS, --threads THREADS
       Number of concurrent threads used to crack passwords with, increasing this number might lead to better performance. Default: 16

  -c CHUNK_SIZE, --chunk-size CHUNK_SIZE
       Number of passwords loaded into memory per thread cycle. After each password of the chunk has been depleted a status update will be printed to the console with the attempted password. Default: 64

  -q, --quiet, --stfu
       Runs the program in "quiet mode", meaning no status updates or other output besides the cracked password will be echoed to the terminal. By default, all logging / error messages are printed to stderr (making piping to other processes easier).

  -v, --version
       Print the current version number and exit.

  -V, --verbose
       Runs the program in "verbose mode", this will print additional debugging information (include this output when submitting bug reports). Cannot be used in conjunction with the "--quiet" argument.

```

### Examples

![Example](images/stegcracker.gif)

### URL list

* [Github.com - StegCracker](https://github.com/Paradoxis/StegCracker)
