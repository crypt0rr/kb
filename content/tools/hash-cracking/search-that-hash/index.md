---
title : "Search-That-Hash"
# pre : ' '
description : "The Fastest Hash Cracking System."
date : 2021-03-08T14:09:50+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

Tired of going to every website to crack your hash? Search-That-Hash automates this process in less than 2 seconds. Search-That-Hash searches the most popular hash cracking sites and automatically inputs your hash(s) for cracking.

## Installation

```plain
python3 -m pip install search-that-hash && sth
```

## Usage

```plain
sth [OPTIONS]
```

## Flags

```plain
  Search-That-Hash - The fastest way to crack any hash.

  GitHub:

          https://github.com/HashPals/Search-That-Hash

  Discord:

          https://discord.gg/CswayhQ8Ru

  Usage:

          sth --text "5f4dcc3b5aa765d61d8327deb882cf99"

Options:
  -t, --text TEXT        Crack a single hash.
  -f, --file FILENAME    The file of hashes, seperated by newlines.
  -w, --wordlist TEXT    The wordlist you want to use for Hashcat.
  --timeout INTEGER      Choose timeout in seconds.
  -g, --greppable        Prints as JSON, use this to grep.
  --hashcat_binary TEXT  Location of hashcat folder (if using windows).
  -o, --offline          Use offline mode. Does not search for hashes in APIs.
  -v, --verbose          Turn on debugging logs. -vv for max.
  --accessible           Makes the output accessible.
  --no-banner            Doesn't print banner.
  --help                 Show this message and exit.

```

## Examples

### Searching NTLM hash

```plain
$ sth -t 'b6adc1c00024a2e4456de1e3d065af41'

  _____                     _        _______ _           _          _    _           _
 / ____|                   | |      |__   __| |         | |        | |  | |         | |
| (___   ___  __ _ _ __ ___| |__ ______| |  | |__   __ _| |_ ______| |__| | __ _ ___| |__
 \___ \ / _ \/ _` | '__/ __| '_ \______| |  | '_ \ / _` | __|______|  __  |/ _` / __| '_ \
 ____) |  __/ (_| | | | (__| | | |     | |  | | | | (_| | |_       | |  | | (_| \__ \ | | |
|_____/ \___|\__,_|_|  \___|_| |_|     |_|  |_| |_|\__,_|\__|      |_|  |_|\__,_|___/_| |_|
        
https://twitter.com/bee_sec_san
https://github.com/HashPals/Name-That-Hash
https://twitter.com/Jayy_2004


b6adc1c00024a2e4456de1e3d065af41

Text : Welcome0
```

## URL List

- [Github.com - Search That Hash](https://github.com/HashPals/Search-That-Hash)
