---
title : "hash-cracker"
# pre : ' '
description : "Simple script to get some hash cracking done effectively."
date : 2021-04-12T09:27:07+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## hash-Cracker

Simple script to get some hash cracking done effectively.

### Installation

```plain
git clone https://github.com/crypt0rr/hash-cracker
```

For use with Apple Silicon (M1/M2) systems, please use the following repo.

```plain
git clone https://github.com/crypt0rr/hash-cracker-apple-silicon
```

### Usage

```plain
./hash-cracker.sh
```

### Flags

```plain
hash-cracker v2.9.3 by crypt0rr (https://github.com/crypt0rr)

Checking if requirements are met:
[+] Hashcat is installed
[+] common-substr is executable
[+] Python2 available
[+] expander is executable
[+] Potfile "hash-cracker.pot" present

0. Exit
1. Brute force
2. Light rules
3. Heavy rules
4. Enter specific word/name/company
5. Enter specific word/name/company (bruteforce)
6. Hybrid
7. Toggle-case
8. Combinator
9. Iterate results
10. Prefix suffix (advise: first run steps above)
11. Common substring (advise: first run steps above)
12. PACK rulegen (read option 99)
13. PACK mask (read option 99)
14. Fingerprint attack
15. Directory of wordlists plain and then with OneRuleToRuleThemAll
16. Username iteration (read option 99, only NTLM)
99. Show info about modules

Please enter number OR type 'search' to find hashtypes:
```

### Examples

```plain
$ ./hash-cracker.sh       
hash-cracker v2.0 by crypt0rr (https://github.com/crypt0rr)

Checking if requirements are met:
[+] Hashcat is installed
[+] common-substr is executable
[+] Python2 available

0. Exit
1. Brute force
2. Light rules
3. Heavy rules
4. Enter specific word/name/company
5. Enter specific word/name/company (bruteforce)
6. Hybrid
7. Toggle-case
8. Combinator
9. Iterate results
10. Prefix suffix (advise: first run steps above)
11. Common substring (advise: first run steps above)
12. PACK rulegen (read option 99)
99. Show info about modules

Please enter number OR type 'search' to find hashtypes: 2
Enter hashtype (number): 1000
Hashtype 1000 | NTLM selected.
Enter full path to hashlist: ntlm-hashes
Hashlist ntlm-hashes selected.
Enter full path to wordlist: wordlist/ignis-1M.txt
Wordlist wordlist/ignis-1M.txt selected.
hashcat (v6.2.4-131-ga9cdd4cef) starting

[...]
```

### URL list

* [Github.com - hash-cracker](https://github.com/crypt0rr/hash-cracker)
* [Github.com - hash-cracker Apple Silicon Edition](https://github.com/crypt0rr/hash-cracker-apple-silicon)
* [Google Docs - Wordlist test](https://docs.google.com/spreadsheets/d/1qQNwggWIWtL-m0EYrRg_vdwHOrZCY-SnWcYTwQN0fMk/edit)
