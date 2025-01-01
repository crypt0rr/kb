---
title: "crontab"
# pre : '<i class="fas fa-code"></i> '
description: "Maintain crontab files for individual users, used for execution of recurring tasks."
date: 2020-03-10T16:18:52+01:00
# hidden : true
# draft : true
weight: 140
# tags : [""]
---

---

## Usage

```plain
crontab [-u user] file
```

## Flags

```plain
usage: crontab [-u user] file
crontab [ -u user ][ -i ] { -e | -l | -r }
(default operation is replace, per 1003.2)
-e (edit user's crontab)
-l (list user's crontab)
-r (delete user's crontab)
-i (prompt before deleting users crontab)
```

## Examples

List tasks for current user

```plain
crontab -l
```

List tasks for other user

```plain
sudo crontab -l -u <user>
```

Edit tasks for current user

```plain
crontab -e
```

Edit tasks for other user

```plain
sudo crontab -e -u <user>
```

### crontab time notation

```plain
Five asterix * * * * *
First   * : minutes (0-59)
Second  * : hours (0-23)
Third   * : day of the month (1-31)
Fourth  * : month (1-12)
Fifth   * : day of the week (0-6 or 1-7)
```

## URL List

- [Crontab.guru](https://crontab.guru/)
