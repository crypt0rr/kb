---
title : "SAMdump2"
# pre : ' '
description : "Retrieves syskey and extract hashes from Windows 2k/NT/XP/Vista SAM."
date : 2021-02-12T09:49:19+01:00
# hidden : true
# draft : true
weight : 1540
# tags : ['']
---

---

Retrieves syskey and extract hashes from Windows 2k/NT/XP/Vista SAM.

**NOTE** Please check [secretsdump.py - SAM dump]({{< ref "secretsdump-py" >}}) if you are getting empty hashes (`31d6cfe0d16ae931b73c59d7e0c089c0`).

## Installation

```plain
sudo apt install samdump2
```

## Usage

```plain
samdump2 [OPTION]... SYSTEM_FILE SAM_FILE
```

## Flags

```plain
Retrieves syskey and extract hashes from Windows 2k/NT/XP/Vista SAM

  -d        enable debugging
  -h        display this information
  -o file   write output to file
```

## Examples

```plain
samdump2 -o out /mnt/ntfs/WINDOWS/system32/config/SYSTEM /mnt/ntfs/WINDOWS/system32/config/sam
```

```plain
ubuntu@ubuntu:~$ cd /media/ubuntu/Windows/Windows/System32/config
ubuntu@ubuntu:/media/ubuntu/Windows/Windows/System32/config$ samdump2 SYSTEM SAM
*disabled* Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
*disabled* Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
*disabled* :503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
*disabled* :504:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Admin1:1000:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Admin2:1001:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
```

## URL List

- [Linux.die.net - samdump2](https://linux.die.net/man/1/samdump2)
- [Traviswhitney - Using samdump2](https://traviswhitney.com/2016/12/30/using-samdump2/)
- [ComputerSecurityStudent.com - Password Cracking using samdump2](https://www.computersecuritystudent.com/SECURITY_TOOLS/PASSWORD_CRACKING/lesson2/index.html)
