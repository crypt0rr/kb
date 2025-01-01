---
title : "BloodHoundLoader"
# pre : ' '
description : "BloodHoundLoader, tool to set attributes in BloodHound for all the items contained in files."
date : 2023-01-04T11:54:39+01:00
# hidden : true
# draft : true
weight : 190
# tags : ['']
---

---

BloodHoundLoader, tool to set attributes in BloodHound for all the items contained in files

## Installation

```plain
wget https://raw.githubusercontent.com/CompassSecurity/BloodHoundQueries/master/BloodHound_Loader/BloodHoundLoader.py
```

## Usage

```plain
python3 BloodHoundLoader.py [-h] [--dburi DATABASEURI] [--dbuser DATABASEUSER] [--dbpassword DATABASEPASSWORD] (-m {h,o,s,u} | -o OPERATION | -e EDGE) [-c COMMENT] [-v] filePaths [filePaths ...]
```

## Flags

```plain
positional arguments:
  filePaths             Paths of files the to import

options:
  -h, --help            show this help message and exit
  --dburi DATABASEURI   Database URI (default: bolt://localhost:7687)
  --dbuser DATABASEUSER
                        Database user (default: neo4j)
  --dbpassword DATABASEPASSWORD
                        Database password (default: BloodHound)
  -m {h,o,s,u}, --mode {h,o,s,u}
                        Mode, h = set to high value, o = set to owned, s = set to no SMB signing, u = unmark as owned (default: None)
  -o OPERATION, --operation OPERATION
                        Operation to perform if the mode is not set, for instance "highvalue = true" (default: None)
  -e EDGE, --edge EDGE  Create the provided edge, file must contain exactly 2 nodes per line, comma separated (default: None)
  -c COMMENT, --comment COMMENT
                        Comment for the log (default: )
  -v, --verbose         Verbose mode (default: False)
```

## Examples

**NOTE** The input file should contain the full username including the domain.

### Setting Group Object to High Value

- `high-value-groups` contains one line with the group `NESTEDDAGROUP@OFFSEC.NL`

```plain
$ python3 BloodHoundLoader.py --dbpassword neo4j -m h high-value-groups
[*] Opened file: high-value-groups
[+] Modified: NESTEDDAGROUP@OFFSEC.NL
```

### Setting User Object(s) to Owned

- `owned-users` contains three users, `CRYPT0RR@OFFSEC.NL`, `CRYPT0RR-ADM@OFFSEC.NL` and `ADMINISTRATOR@OFFSEC.NL`

```plain
$ python3 BloodHoundLoader.py --dbpassword neo4j -m o owned-users 
[*] Opened file: owned-users
[+] Modified: CRYPT0RR@OFFSEC.NL
[+] Modified: CRYPT0RR-ADM@OFFSEC.NL
[+] Modified: ADMINISTRATOR@OFFSEC.NL
```

## URL list

- [Github.com - BloodHound_Loader](https://github.com/CompassSecurity/BloodHoundQueries/tree/master/BloodHound_Loader)
