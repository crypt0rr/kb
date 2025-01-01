---
title : "John"
# pre : ' '
description : "Open Source password security auditing and password recovery tool available for many operating systems."
date : 2020-09-22T16:33:56+02:00
# hidden : true
# draft : true
weight : 930
# tags : ['']
---

---

John the Ripper - Open Source password security auditing and password recovery tool available for many operating systems.

## Installation

Read 'INSTALL' file in 'doc' folder for correct installation procedure after cloning the repo.

```plain
git clone https://github.com/openwall/john
```

## Usage

```plain
john [OPTIONS] [PASSWORD-FILES]
```

## Flags

```plain
John the Ripper 1.9.0-jumbo-1+bleeding-65d8222ef 2020-09-22 17:11:48 +0200 OMP [linux-gnu 64-bit x86_64 AVX2 AC]
Copyright (c) 1996-2019 by Solar Designer and others
Homepage: https://www.openwall.com/john/

--single[=SECTION[,..]]    "single crack" mode, using default or named rules
--single=:rule[,..]        same, using "immediate" rule(s)
--wordlist[=FILE] --stdin  wordlist mode, read words from FILE or stdin
                  --pipe   like --stdin, but bulk reads, and allows rules
--loopback[=FILE]          like --wordlist, but extract words from a .pot file
--dupe-suppression         suppress all dupes in wordlist (and force preload)
--prince[=FILE]            PRINCE mode, read words from FILE
--encoding=NAME            input encoding (eg. UTF-8, ISO-8859-1). See also
                           doc/ENCODINGS and --list=hidden-options.
--rules[=SECTION[,..]]     enable word mangling rules (for wordlist or PRINCE
                           modes), using default or named rules
--rules=:rule[;..]]        same, using "immediate" rule(s)
--rules-stack=SECTION[,..] stacked rules, applied after regular rules or to
                           modes that otherwise don't support rules
--rules-stack=:rule[;..]   same, using "immediate" rule(s)
--incremental[=MODE]       "incremental" mode [using section MODE]
--mask[=MASK]              mask mode using MASK (or default from john.conf)
--markov[=OPTIONS]         "Markov" mode (see doc/MARKOV)
--external=MODE            external mode or word filter
--subsets[=CHARSET]        "subsets" mode (see doc/SUBSETS)
--stdout[=LENGTH]          just output candidate passwords [cut at LENGTH]
--restore[=NAME]           restore an interrupted session [called NAME]
--session=NAME             give a new session the NAME
--status[=NAME]            print status of a session [called NAME]
--make-charset=FILE        make a charset file. It will be overwritten
--show[=left]              show cracked passwords [if =left, then uncracked]
--test[=TIME]              run tests and benchmarks for TIME seconds each
                           (if TIME is explicitly 0, test w/o benchmark)
--users=[-]LOGIN|UID[,..]  [do not] load this (these) user(s) only
--groups=[-]GID[,..]       load users [not] of this (these) group(s) only
--shells=[-]SHELL[,..]     load users with[out] this (these) shell(s) only
--salts=[-]COUNT[:MAX]     load salts with[out] COUNT [to MAX] hashes
--costs=[-]C[:M][,...]     load salts with[out] cost value Cn [to Mn]. For
                           tunable cost parameters, see doc/OPTIONS
--save-memory=LEVEL        enable memory saving, at LEVEL 1..3
--node=MIN[-MAX]/TOTAL     this node's number range out of TOTAL count
--fork=N                   fork N processes
--pot=NAME                 pot file to use
--list=WHAT                list capabilities, see --list=help or doc/OPTIONS
--devices=N[,..]           set OpenCL device(s) (see --list=opencl-devices)
--format=NAME              force hash of type NAME. The supported formats can
                           be seen with --list=formats and --list=subformats
```

## Examples

### Run benchmark

```plain
$ ./john --test  
Will run 8 OpenMP threads
Benchmarking: descrypt, traditional crypt(3) [DES 256/256 AVX2]... (8xOMP) DONE
Many salts: 39010K c/s real, 4953K c/s virtual
Only one salt:  28773K c/s real, 3642K c/s virtual

Benchmarking: bsdicrypt, BSDI crypt(3) ("_J9..", 725 iterations) [DES 256/256 AVX2]... (8xOMP) DONE
Speed for cost 1 (iteration count) of 725
Many salts: 1289K c/s real, 163295 c/s virtual
Only one salt:  1171K c/s real, 148191 c/s virtual

Benchmarking: md5crypt, crypt(3) $1$ (and variants) [MD5 256/256 AVX2 8x3]... (8xOMP) DONE
Many salts: 317568 c/s real, 40173 c/s virtual
Only one salt:  308352 c/s real, 39007 c/s virtual

Benchmarking: md5crypt-long, crypt(3) $1$ (and variants) [MD5 32/64]... (8xOMP) DONE
Raw:    38624 c/s real, 4898 c/s virtual

Benchmarking: bcrypt ("$2a$05", 32 iterations) [Blowfish 32/64 X3]... (8xOMP) DONE
Speed for cost 1 (iteration count) of 32
Raw:    5910 c/s real, 746 c/s virtual

Benchmarking: scrypt (16384, 8, 1) [Salsa20/8 128/128 AVX]... (8xOMP) DONE
Speed for cost 1 (N) of 16384, cost 2 (r) of 8, cost 3 (p) of 1
Raw:    261 c/s real, 33.4 c/s virtual

Benchmarking: LM [DES 256/256 AVX2]... (8xOMP) DONE
Raw:    87687K c/s real, 11141K c/s virtual
[...]
```

### Crack NTLM

```plain
$ ./john --format=nt ~/ntlm.txt --wordlist ~/self.txt
Using default input encoding: UTF-8
Loaded 2344522 password hashes with no different salts (NT [MD4 256/256 AVX2 8x3])
Warning: no OpenMP support for this hash type, consider --fork=8
Press 'q' or Ctrl-C to abort, almost any other key for status
123456           (?)
12345            (?)
password         (?)
[...]
527g 0:00:00:00 DONE (2020-12-01 20:42) 13175g/s 88650p/s 88650c/s 8312MC/s !@#$%..sss
Warning: passwords printed above might not be all those cracked
Use the "--show --format=NT" options to display all of the cracked passwords reliably
Session completed.
```

## URL List

- [Openwall.com](https://www.openwall.com/john/)
- [Gbhackers.com Offline Password Attack John Ripper](https://gbhackers.com/offline-password-attack-john-ripper/)
