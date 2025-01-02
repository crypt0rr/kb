---
title : "O365creeper"
# pre : ' '
description : "Enumerates valid email addresses from Office 365 without submitting login attempts."
date : 2020-05-01T08:49:21+02:00
# hidden : true
# draft : true
weight : 140
tags : ['Other', 'O365']
---

---

Enumerates valid email addresses from Office 365 without submitting login attempts.

## Installation

```plain
git clone https://github.com/LMGsec/o365creeper.git
```

Requirements

```plain
pip install requests
```

## Usage

```plain
o365creeper.py [-h] [-e EMAIL] [-f FILE] [-o OUTPUT]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -e EMAIL, --email EMAIL
                        Single email address to validate.
  -f FILE, --file FILE  List of email addresses to validate, one per line.
  -o OUTPUT, --output OUTPUT
                        Output valid email addresses to the specified file.
```

## Examples

### Check single email

```plain
$ python o365creeper.py -e john.do@example.com

john.do@example.com - INVALID
```

## URL List

- [Github.com - o365creeper](https://github.com/LMGsec/o365creeper)
