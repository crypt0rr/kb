---
title : "hash-cracker"
# pre : ' '
description : "Simple script to get some hash cracking done effectively."
date : 2021-04-12T09:27:07+02:00
# hidden : true
# draft : true
weight : 50
#tags : ['']
---

---

Simple script to get some hash cracking done effectively.

## Installation

Compatible with both Linux and macOS (ARM/M-series)

```plain
git clone https://github.com/crypt0rr/hash-cracker
```

## Usage

```plain
./hash-cracker [FLAG]
```

## Flags

```plain
Note: flags are optional, by default hash-cracker will run with optimized kernels enabled and perform loopback actions.

Flags:
        -l / --no-loopback
                 Disable loopback functionality
        -n / --no-limit
                 Disable the use of optimized kernels (un-limits password length)
        --hwmon-enable
                 Enable hashcat to do hardware monitoring
        -m / --module-info
                 Display information around modules/options
        -s [hash-name] / --search [hash-name]
                 Will search local DB for hash module. E.g. '-s ntlm'
        --static
                 Use the 'hash-cracker.conf' static configuration file.
        -d / --disable-cracked
                 Will stop output cracked hashes directly on screen.
```

## Static Configuration File

By default, hash-cracker will run in 'ask you all variable' mode. When specifying `--static` the `hash-cracker.conf` file is used for some basic settings. You can specify:

- `HASHCAT` - binary path where you've installed [hashcat](https://github.com/hashcat/hashcat)
- `HASHTYPE` - mode hashcat will run in (e.g. 1000 (NTLM))
- `HASHLIST` - file containing target hashes
- `POTFILE` - specify the potfile you want to use / create
- `WORDLIST` - specify the first static word list
- `WORDLIST2` - specify the second static word list

## Examples

### 'Normal' mode

```plain
$ ./hash-cracker.sh
hash-cracker v4.2.1 by crypt0rr (https://github.com/crypt0rr)

Mandatory modules:
[+] Hashcat is executable
[+] Potfile hash-cracker.pot present

Optional Modules:
[+] common-substr-mac is executable
[+] Expander is executable
[-] CeWL is not executable or found (option 18)

Variable Parameters:
[+] Optimised kernels enabled
[+] Loopback enabled
[-] Hardware monitoring disabled
[+] STDOUT cracked hashes enabled

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
21. Custom brute force
22. Directory of word lists plain and then with buka_400k

Please enter job number or type exit:
```

### Static Configuration

hash-cracker can be used with a static configuration. An example configuration is supplied with hash-cracker.

Default static configuration:

```plain
# Hashcat path
HASHCAT=(/usr/local/bin/hashcat)

# Hashtype
HASHTYPE=1000

# File containing target hashes
HASHLIST=input

# Potfile you want to use
POTFILE=hash-cracker.pot

# Wordlist(s)
WORDLIST=wordlists/ignis-1M.txt
WORDLIST2=wordlists/ignis-1K.txt
```

```plain
$ ./hash-cracker.sh --static

hash-cracker v4.2.1 by crypt0rr (https://github.com/crypt0rr)

Mandatory modules:
[+] Hashcat is executable
[+] Potfile hash-cracker.pot present

Optional Modules:
[+] common-substr-mac is executable
[+] Expander is executable
[-] CeWL is not executable or found (option 18)

Variable Parameters:
[+] Optimised kernels enabled
[+] Loopback enabled
[-] Hardware monitoring disabled
[+] STDOUT cracked hashes enabled

Static parameters:
[+] Potfile: hash-cracker.pot
[+] Hashlist: input
[+] Hashtype: 1000
[+] Wordlist 1: wordlists/ignis-1M.txt
[+] Wordlist 2: wordlists/ignis-1M.txt

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
21. Custom brute force
22. Directory of word lists plain and then with buka_400k

Please enter job number or type exit:
```

## URL List

- [Github.com - hash-cracker](https://github.com/crypt0rr/hash-cracker)
- [Github.com - hash-cracker Apple Silicon Edition](https://github.com/crypt0rr/hash-cracker-apple-silicon)
- [Google Docs - Wordlist test](https://docs.google.com/spreadsheets/d/1qQNwggWIWtL-m0EYrRg_vdwHOrZCY-SnWcYTwQN0fMk/edit)
- [Sensepost.com - hash-cracker – password cracking done effectively](https://sensepost.com/blog/2023/hash-cracker-password-cracking-done-effectively/)
