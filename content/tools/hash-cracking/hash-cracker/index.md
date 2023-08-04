---
title : "hash-cracker"
# pre : ' '
description : "Simple script to get some hash cracking done effectively."
date : 2021-04-12T09:27:07+02:00
# hidden : true
# draft : true
weight : 0
#tags : ['']
---

## hash-Cracker

Simple script to get some hash cracking done effectively.

## Installation

```plain
git clone https://github.com/crypt0rr/hash-cracker
```

For use with **Apple Silicon (M1/M2)** systems, please use the following repo.

```plain
git clone https://github.com/crypt0rr/hash-cracker-apple-silicon
```

## Usage

```plain
./hash-cracker [FLAG]
```

## Flags

```plain
        -l / --no-loopback
                 Disable loopback functionality
        -n / --no-limit
                 Disable the use of optimized kernels (un-limits password length)
        --hwmon-enable
                 Enable hashcat to do hardware monitoring
        --module-info
                 Display information around modules/options
        -s [hash-name] / --search [hash-name]
                 Will search local DB for hash module. E.g. '-s ntlm'
        --static
                 Use the 'hash-cracker.conf' static configuration file.
```

## Static Configuration File

By default, hash-cracker will run in 'ask you all variable' mode. When specifying `--static` the `hash-cracker.conf` file is used for some basic settings. You can specify:

- `HASHCAT` - binary path where you've installed [hashcat](https://github.com/hashcat/hashcat)
- `HASHTYPE` - mode hashcat will run in (e.g. 1000 (NTLM))
- `HASHLIST` - file containing target hashes
- `POTFILE` - specify the potfile you want to use / create

## Examples

```plain
$ ./hash-cracker.sh 
hash-cracker v3.7 by crypt0rr (https://github.com/crypt0rr)

Mandatory modules:
[+] Hashcat is executable
[+] Potfile hash-cracker.pot present

Optional modules:
[+] Common-substr is executable
[+] Python2 is executable
[+] Expander is executable
[+] CeWL is executable

Variable Parameters:
[+] Optimised kernels enabled
[+] Loopback enabled

0. Exit
1. Brute force
2. Light rules
3. Heavy rules
4. Enter specific word/name/company
5. Enter specific word/name/company (brute force)
6. Hybrid
7. Toggle-case
8. Combinator
9. Iterate results
10. Prefix suffix (advise: first run steps above)
11. Common substring (advise: first run steps above)
12. PACK rulegen
13. PACK mask
14. Fingerprint attack
15. Directory of word lists plain and then with OneRuleToRuleThemAll
16. Username iteration (only complete NTDS)
17. Markov-chain passwords generator
18. CeWL wordlist generator
19. Digit remover
20. Stacker

Please enter job number:
```

## URL List

- [Github.com - hash-cracker](https://github.com/crypt0rr/hash-cracker)
- [Github.com - hash-cracker Apple Silicon Edition](https://github.com/crypt0rr/hash-cracker-apple-silicon)
- [Google Docs - Wordlist test](https://docs.google.com/spreadsheets/d/1qQNwggWIWtL-m0EYrRg_vdwHOrZCY-SnWcYTwQN0fMk/edit)
