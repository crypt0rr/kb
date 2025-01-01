---
title : "passwd"
# pre : '<i class="fas fa-code"></i> '
description : "Change user password."
date : 2020-03-13T17:48:29+01:00
# hidden : true
# draft : true
weight : 710
# tags : ['']
---

---

## Usage

```plain
passwd [options] [LOGIN]
```

## Flags

```plain
Usage: passwd [options] [LOGIN]

Options:
  -a, --all                     report password status on all accounts
  -d, --delete                  delete the password for the named account
  -e, --expire                  force expire the password for the named account
  -h, --help                    display this help message and exit
  -k, --keep-tokens             change password only if expired
  -i, --inactive INACTIVE       set password inactive after expiration
                                to INACTIVE
  -l, --lock                    lock the password of the named account
  -n, --mindays MIN_DAYS        set minimum number of days before password
                                change to MIN_DAYS
  -q, --quiet                   quiet mode
  -r, --repository REPOSITORY   change password in REPOSITORY repository
  -R, --root CHROOT_DIR         directory to chroot into
  -S, --status                  report password status on the named account
  -u, --unlock                  unlock the password of the named account
  -w, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
  -x, --maxdays MAX_DAYS        set maximum number of days before password
                                change to MAX_DAYS
```

## Examples

### Set/reset password of current user

```plain
passwd

Changing password for John
Current password:
New password:
Retype new password:
Password changed successfully
```

### Set/reset password of other user

```plain
sudo passwd <user>

Changing password for Jane
New password:
Retype new password:
Password changed successfully
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/passwd)
- [Linux.die.net passwd file](https://linux.die.net/man/5/passwd)
