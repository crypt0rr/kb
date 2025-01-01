---
title : "groupadd"
# pre : '<i class="fas fa-code"></i> '
description : "Create a new group."
date : 2020-03-10T16:18:53+01:00
# hidden : true
# draft : true
weight : 340
# tags : [""]
---

---

## Usage

```plain
groupadd [options] GROUP
```

## Flags

```plain
Usage: groupadd [options] GROUP
Options:
  -f, --force                   exit successfully if the group already exists,
                                and cancel -g if the GID is already used
  -g, --gid GID                 use GID for the new group
  -h, --help                    display this help message and exit
  -K, --key KEY=VALUE           override /etc/login.defs defaults
  -o, --non-unique              allow to create groups with duplicate
                                (non-unique) GID
  -p, --password PASSWORD       use this encrypted password for the new group
  -r, --system                  create a system account
  -R, --root CHROOT_DIR         directory to chroot into
      --extrausers              Use the extra users database
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/groupadd)
