---
title : "PEAS"
# pre : ' '
description : "PEAS is a Python 2 library and command line application for running commands on an ActiveSync server e.g. Microsoft Exchange."
date : 2021-02-11T13:43:13+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## PEAS

Is a Python 2 library and command line application for running commands on an ActiveSync server e.g. Microsoft Exchange.

Based on [research](https://labs.mwrinfosecurity.com/blog/accessing-internal-fileshares-through-exchange-activesync) into Exchange ActiveSync protocol by Adam Rutherford and David Chismon of MWR.

### Installation

```plain
git clone https://github.com/FSecureLABS/peas.git
python2 peas/peas.py
```

### Flags

```plain
Options:
  -h, --help            show this help message and exit
  -u USER               username
  -p PASSWORD           password
  --smb-user=USER       username to use for SMB operations
  --smb-pass=PASSWORD   password to use for SMB operations
  --verify-ssl          verify SSL certificates (important)
  -o FILENAME           output to file
  -O PATH               output directory (for specific commands only, not
                        combined with -o)
  -F repr,hex,b64,stdout,stderr,file
                        output formatting and encoding options
  --check               check if account can be accessed with given password
  --emails              retrieve emails
  --list-unc=UNC_PATH   list the files at a given UNC path
  --dl-unc=UNC_PATH     download the file at a given UNC path
```

### Usage

#### Check server

```plain
python -m peas 10.207.7.100
```

#### Check credentials

```plain
python -m peas --check -u luke2 -p ChangeMe123 10.207.7.100
```

#### Get emails

```plain
python -m peas --emails -u luke2 -p ChangeMe123 10.207.7.100
```

#### Save emails to directory

```plain
python -m peas --emails -O emails -u luke2 -p ChangeMe123 10.207.7.100
```

#### List file shares

```plain
python -m peas --list-unc='\\fictitious-dc' -u luke2 -p ChangeMe123 10.207.7.100
```

```plain
python -m peas --list-unc='\\fictitious-dc\guestshare' -u luke2 -p ChangeMe123 10.207.7.100
```

*Note*: Using an IP address or FQDN instead of a hostname in the UNC path may fail.

#### View file on file share

```plain
python -m peas --dl-unc='\\fictitious-dc\guestshare\fileonguestshare.txt' -u luke2 -p ChangeMe123 10.207.7.100
```

#### Save file from file share

```plain
python -m peas --dl-unc='\\fictitious-dc\guestshare\fileonguestshare.txt' -o file.txt -u luke2 -p ChangeMe123 10.207.7.100
```

### URL list

* [Github.com - PEAS](https://github.com/FSecureLABS/peas)
