---
title : "snapd"
description : "The snap command lets you install, configure, refresh and remove snaps.  Snaps are packages that work across many different Linux distributions, enabling secure delivery and operation of the latest apps and utilities."
date : 2020-03-13T17:53:39+01:00
# hidden : true
# draft : true
weight : 1660
# tags : ['']
---

---

The snap command lets you install, configure, refresh and remove snaps.  Snaps are packages that work across many different Linux distributions, enabling secure delivery and operation of the latest apps and utilities.

## Installation

```plain
sudo apt install snapd
```

## Usage

```plain
snap <command> [<options>...]
```

## Flags

```plain
The snap command lets you install, configure, refresh and remove snaps.
Snaps are packages that work across many different Linux distributions,
enabling secure delivery and operation of the latest apps and utilities.

Usage: snap <command> [<options>...]

Commands can be classified as follows:

         Basics: find, info, install, list, remove
        ...more: refresh, revert, switch, disable, enable
        History: changes, tasks, abort, watch
        Daemons: services, start, stop, restart, logs
       Commands: alias, aliases, unalias, prefer
  Configuration: get, set, unset, wait
        Account: login, logout, whoami
    Permissions: connections, interface, connect, disconnect
      Snapshots: saved, save, check-snapshot, restore, forget
          Other: version, warnings, okay, ack, known, model, create-cohort
    Development: run, pack, try, download, prepare-image

For more information about a command, run 'snap help <command>'.
For a short summary of all commands, run 'snap help --all'.
```

## Examples

### Install snap package

```plain
sudo snap install <package>
```

### Remove snap package

```plain
sudo snap remove <package>
```

### Find snap package

```plain
snap search <package>
```

## URL List

- [Snapcraft.io](https://snapcraft.io/)
- [Snapcraft.io - Store](https://snapcraft.io/store)
