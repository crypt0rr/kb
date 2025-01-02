---
title : "chsh"
# pre : '<i class="fas fa-code"></i> '
description : "Change login shell."
date : 2020-05-01T12:37:23+02:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

## Usage

```plain
chsh [options] [LOGIN]
```

## Flags

```plain
Options:
  -h, --help                    display this help message and exit
  -R, --root CHROOT_DIR         directory to chroot into
  -s, --shell SHELL             new login shell for the user account
```

## Examples

### Change default shell

```plain
$ chsh -s /bin/zsh

Password:
Changing the login shell for <user>
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/chsh)
