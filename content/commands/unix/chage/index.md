---
title: "chage"
# pre : '<i class="fas fa-code"></i> '
description: "Change user password expiry information."
date: 2020-03-10T16:13:53+01:00
# hidden : true
# draft : true
weight: 100
# tags : [""]
---

---

## Usage

```plain
chage [options] LOGIN
```

## Flags

```plain
Options:
  -d, --lastday LAST_DAY        set date of last password change to LAST_DAY
  -E, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
  -h, --help                    display this help message and exit
  -I, --inactive INACTIVE       set password inactive after expiration
                                to INACTIVE
  -l, --list                    show account aging information
  -m, --mindays MIN_DAYS        set minimum number of days before password
                                change to MIN_DAYS
  -M, --maxdays MAX_DAYS        set maximim number of days before password
                                change to MAX_DAYS
  -R, --root CHROOT_DIR         directory to chroot into
  -W, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
```

## Examples

### Show password information

```plain
$ chage -l b
Last password change    : Jun 15, 2020
Password expires        : never
Password inactive       : never
Account expires         : never
Minimum number of days between password change    : 0
Maximum number of days between password change    : 99999
Number of days of warning before password expires : 7
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/chage)
- [Man7.org](http://man7.org/linux/man-pages/man1/chage.1.html)
