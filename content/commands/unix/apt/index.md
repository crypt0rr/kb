---
title : "apt"
# pre : '<i class="fas fa-code"></i> '
description: "A commandline package manager and provides commands for searching and managing as well as querying information about packages"
date : 2020-03-10T14:13:26+01:00
# hidden : true
# draft : true
weight : 20
# tags : [""]
---

---

## Usage

```plain
apt [options] command
```

## Flags

```plain
apt is a commandline package manager and provides commands for
searching and managing as well as querying information about packages.
It provides the same functionality as the specialized APT tools,
like apt-get and apt-cache, but enables options more suitable for
interactive use by default.

Most used commands:
  list - list packages based on package names
  search - search in package descriptions
  show - show package details
  install - install packages
  reinstall - reinstall packages
  remove - remove packages
  autoremove - Remove automatically all unused packages
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  full-upgrade - upgrade the system by removing/installing/upgrading packages
  edit-sources - edit the source information file
  satisfy - satisfy dependency strings

See apt(8) for more information about the available commands.
Configuration options and syntax is detailed in apt.conf(5).
Information about how to configure sources can be found in sources.list(5).
Package and version choices can be expressed via apt_preferences(5).
Security details are available in apt-secure(8).
                                        This APT has Super Cow Powers.
```

## Examples

### Update local repositories with online mirrors

```plain
$ sudo apt update
Hit:1 http://ppa.launchpad.net/system76/pop/ubuntu eoan InRelease
Ign:2 http://dl.google.com/linux/chrome/deb stable InRelease
Hit:3 http://dl.google.com/linux/chrome/deb stable Release
Hit:4 http://linux.teamviewer.com/deb stable InRelease
Hit:5 http://us.archive.ubuntu.com/ubuntu eoan InRelease
Get:7 http://us.archive.ubuntu.com/ubuntu eoan-security InRelease [97,5 kB]
Hit:8 http://apt.pop-os.org/proprietary eoan InRelease
Get:9 http://us.archive.ubuntu.com/ubuntu eoan-updates InRelease [97,5 kB]
Get:10 http://us.archive.ubuntu.com/ubuntu eoan-backports InRelease [88,8 kB]
Get:11 http://us.archive.ubuntu.com/ubuntu eoan-security/main amd64 DEP-11 Metadata [204 B]
Get:12 http://us.archive.ubuntu.com/ubuntu eoan-security/universe amd64 DEP-11 Metadata [1.676 B]
Get:13 http://us.archive.ubuntu.com/ubuntu eoan-security/universe DEP-11 48x48 Icons [7.096 B]
Get:14 http://us.archive.ubuntu.com/ubuntu eoan-security/universe DEP-11 64x64 Icons [6.242 B]
Get:15 http://us.archive.ubuntu.com/ubuntu eoan-security/universe DEP-11 128x128 Icons [12,6 kB]
Get:16 http://us.archive.ubuntu.com/ubuntu eoan-updates/main amd64 DEP-11 Metadata [72,9 kB]
Get:17 http://us.archive.ubuntu.com/ubuntu eoan-updates/main DEP-11 48x48 Icons [9.944 B]
Get:18 http://us.archive.ubuntu.com/ubuntu eoan-updates/main DEP-11 64x64 Icons [15,1 kB]
Get:19 http://us.archive.ubuntu.com/ubuntu eoan-updates/main DEP-11 128x128 Icons [34,8 kB]
Get:20 http://us.archive.ubuntu.com/ubuntu eoan-updates/universe amd64 DEP-11 Metadata [27,8 kB]
Get:21 http://us.archive.ubuntu.com/ubuntu eoan-updates/universe DEP-11 48x48 Icons [18,5 kB]
Get:22 http://us.archive.ubuntu.com/ubuntu eoan-updates/universe DEP-11 64x64 Icons [30,2 kB]
Get:23 http://us.archive.ubuntu.com/ubuntu eoan-updates/universe DEP-11 128x128 Icons [120 kB]
Get:24 http://us.archive.ubuntu.com/ubuntu eoan-backports/universe amd64 DEP-11 Metadata [7.760 B]
Fetched 649 kB in 1s (521 kB/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done
92 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

### Install all available upgrades

```plain
sudo apt upgrade
```

### Fix broken dependencies

```plain
sudo apt --fix-broken install
```

### Install .deb file with apt and fix dependency issues

```plain
sudo apt install -f <file>.deb
```

### Fully remove program with dependencies

```plain
sudo apt purge <package>
```

### Upgrade specific package

```plain
sudo apt --only-upgrade install <package>
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/apt-get)
- [Ubuntu.com](https://help.ubuntu.com/lts/serverguide/apt.html)
