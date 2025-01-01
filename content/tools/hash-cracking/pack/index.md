---
title : "PACK"
# pre : ' '
description : "Password Analysis and Cracking Kit (PACK)."
date : 2020-12-10T15:32:24+01:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

Password Analysis and Cracking Kit (PACK).

## Installation

### Python2 based

```plain
git clone https://github.com/iphelix/pack
pip install pyenchant==3.0.0a1
```

### Python3 based

```plain
git clone https://github.com/Hydraze/pack
python3 -m pip install pyenchant
```

## Examples

### Generate statistics from found passwords

```plain
$ python statsgen.py rockyou.txt 
                       _ 
     StatsGen 0.0.3   | |
      _ __   __ _  ___| | _
     | '_ \ / _` |/ __| |/ /
     | |_) | (_| | (__|   < 
     | .__/ \__,_|\___|_|\_\
     | |                    
     |_| iphelix@thesprawl.org


[*] Analyzing passwords in [rockyou.txt]
[+] Analyzing 100% (14344390/14344390) of passwords
    NOTE: Statistics below is relative to the number of analyzed passwords, not total number of passwords

[*] Length:
[+]                         8: 20% (2966037)
[+]                         7: 17% (2506271)
[+]                         9: 15% (2191039)
[+]                        10: 14% (2013695)
[+]                         6: 13% (1947798)
[+]                        11: 06% (866035)
[...]
```

### Generate rule from found passwords

```plain
$ python rulegen.py rockyou.txt
                       _ 
     RuleGen 0.0.4    | |
      _ __   __ _  ___| | _
     | '_ \ / _` |/ __| |/ /
     | |_) | (_| | (__|   < 
     | .__/ \__,_|\___|_|\_\
     | |                    
     |_| iphelix@thesprawl.org


[*] Using Enchant 'aspell' module. For best results please install
    'aspell' module language dictionaries.
[*] Analyzing passwords file: rockyou.txt:
[*] Press Ctrl-C to end execution and generate statistical analysis.
[*] Saving rules to analysis.rule
[*] Saving words to analysis.word
[*] Processed 5000 passwords in 0.00 seconds at the rate of 1798.60 p/sec
[*] Processed 10000 passwords in 2.78 seconds at the rate of 1773.20 p/sec
[*] Processed 15000 passwords in 5.60 seconds at the rate of 1963.28 p/sec
[*] Processed 20000 passwords in 8.15 seconds at the rate of 1908.91 p/sec
[*] Processed 25000 passwords in 10.77 seconds at the rate of 1831.58 p/sec
[*] Processed 30000 passwords in 13.50 seconds at the rate of 1947.98 p/sec
[...]
```

## URL List

- [GitHub.com - PACK](https://github.com/iphelix/pack)
