---
title: "Chntpw"
# pre : ' '
description: "Change password of a user in a Windows SAM file."
date: 2020-03-10T15:32:54+01:00
# hidden : true
# draft : true
weight: 0
tags: ["Other", "Windows", "Password"]
---

## Chntpw

Change password of a user in a Windows SAM file.

## Installation

{{%attachments title="Bootable CD image. (md5sum: f274127bf8be9a7ed48b563fd951ae9e)" fa_icon_class="far fa-file-archive" pattern="cd.*(zip)"/%}}
{{%attachments title="Files for USB install (md5sum: a60dbb91016d93ec5f11e64650394afb)" fa_icon_class="far fa-file-archive" pattern="usb.*(zip)"/%}}

Or install from repo.

```plain
sudo apt install chntpw
```

## Usage

```plain
sudo chntpw -i <device>/Windows/System32/Config/SAM
```

Or cd to folder /Windows/System32/Config

```plain
sudo chntpw -i SAM
```

## Flags

```plain
chntpw version 1.00 140201, (c) Petter N Hagen
chntpw: change password of a user in a Windows SAM file,
or invoke registry editor. Should handle both 32 and 64 bit windows and
all version from NT3.x to Win8.1
chntpw [OPTIONS] <samfile> [systemfile] [securityfile] [otherreghive] [...]
 -h          This message
 -u <user>   Username or RID (0x3e9 for example) to interactively edit
 -l          list all users in SAM file and exit
 -i          Interactive Menu system
 -e          Registry editor. Now with full write support!
 -d          Enter buffer debugger instead (hex editor),
 -v          Be a little more verbose (for debuging)
 -L          For scripts, write names of changed files to /tmp/changed
 -N          No allocation mode. Only same length overwrites possible (very safe mode)
 -E          No expand mode, do not expand hive file (safe mode)

Usernames can be given as name or RID (in hex with 0x first)

See readme file on how to get to the registry files, and what they are.
Source/binary freely distributable under GPL v2 license. See README for details.
NOTE: This program is somewhat hackish! You are on your own!
```

## URL List

- [chntpw.com](http://www.chntpw.com/download/)
