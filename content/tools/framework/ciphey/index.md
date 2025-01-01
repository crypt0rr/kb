---
title : "Ciphey"
# pre : ' '
description : " Fully automated decryption/decoding/cracking tool using natural language processing & artificial intelligence, along with some common sense."
date : 2021-08-13T18:56:31+02:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Automated Decryption Tool - Fully automated decryption/decoding/cracking tool using natural language processing & artificial intelligence, along with some common sense.

## Installation

```plain
python3 -m pip install ciphey --upgrade
```

```plain
docker run -it --rm remnux/ciphey
```

## Usage

```plain
ciphey [OPTIONS] [TEXT_STDIN]
```

## Flags

```plain
Ciphey - Automated Decryption Tool

Documentation: https://github.com/Ciphey/Ciphey/wiki

Discord (support here, we're online most of the day):
https://discord.ciphey.online/

GitHub: https://github.com/ciphey/ciphey

Ciphey is an automated decryption tool using smart artificial intelligence
and natural language processing. Input encrypted text, get the decrypted
text back.

Examples:

    Basic Usage: ciphey -t "aGVsbG8gbXkgbmFtZSBpcyBiZWU="

Options:
  -t, --text TEXT            The ciphertext you want to decrypt.
  -q, --quiet                Decrease verbosity
  -g, --greppable            Only print the answer (useful for grep)
  -v, --verbose
  -C, --checker TEXT         Use the given checker
  -c, --config TEXT          Uses the given config file. Defaults to
                             appdirs.user_config_dir('ciphey',
                             'ciphey')/'config.yml'

  -w, --wordlist TEXT        Uses the given wordlist
  -p, --param TEXT           Passes a parameter to the language checker
  -l, --list-params BOOLEAN  List the parameters of the selected module
  --searcher TEXT            Select the searching algorithm to use
  -b, --bytes                Forces ciphey to use binary mode for the input
  --default-dist TEXT        Sets the default character/byte distribution
  -m, --module PATH          Adds a module from the given path
  -A, --appdirs              Print the location of where Ciphey wants the
                             settings file to be

  -f, --file FILENAME
  --help                     Show this message and exit.
```

## Examples

```plain
$ ciphey -t "aGVsbG8gbXkgbmFtZSBpcyBiZWU="
Possible plaintext: 'hello my name is bee' (y/N): y
╭──────────────────────────────────────────╮
│ Formats used:                            │
│    base64                                │
│    utf8Plaintext: "hello my name is bee" │
╰──────────────────────────────────────────╯
```

```plain
$ ciphey -t '48 6f 77 20 64 69 64 20 79 6f 75 20 64 65 76 65 6c 6f 70 20 74 68 65 20 61 64 76 65 72 73 61 72 69 61 6c 20 6d 69 6e 64 73 65 74 3f 20'
Possible plaintext: 'How did you develop the adversarial mindset? ' (y/N): y
╭──────────────────────────────────────────────────────────────────────────╮
│ Formats used:                                                            │
│    hexadecimalPlaintext: "How did you develop the adversarial mindset? " │
╰──────────────────────────────────────────────────────────────────────────╯
```

```plain
$ ciphey -t '--[----->+<]>--.+++++++++++.-.[++>---<]>++.[->+++<]>-.[---->+<]>+++.-[--->++<]>+.+++.+.++++++++.'
Possible plaintext: "don't know" (y/N): y
╭─────────────────────────────────────╮
│ Formats used:                       │
│    brainfuckPlaintext: "don't know" │
╰─────────────────────────────────────╯
```

## URL List

- [Github.com - Ciphey](https://github.com/ciphey/ciphey)
