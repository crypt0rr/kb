---
title: "Chntpw"
# pre : ' '
description: "Change password of a user in a Windows SAM file."
date: 2020-03-10T15:32:54+01:00
# hidden : true
# draft : true
weight: 340
tags: ['Other', 'Windows']
---

---

Change password of a user in a Windows SAM file.

## Installation

{{%resources title="Bootable CD image. (md5sum: f274127bf8be9a7ed48b563fd951ae9e)" fa_icon_class="far fa-file-archive" pattern="cd.*(zip)"/%}}
{{%resources title="Files for USB install (md5sum: a60dbb91016d93ec5f11e64650394afb)" fa_icon_class="far fa-file-archive" pattern="usb.*(zip)"/%}}

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

## Examples

```plain
$ sudo chntpw -i SAM
chntpw version 1.00 140201, (c) Petter N Hagen
Hive <SAM> name (from header): <\SystemRoot\System32\Config\SAM>
ROOT KEY at offset: 0x001020 * Subkey indexing type is: 686c <lh>
File size 65536 [10000] bytes, containing 7 pages (+ 1 headerpage)
Used for data: 315/30544 blocks/bytes, unused: 63/14288 blocks/bytes.



<>========<> chntpw Main Interactive Menu <>========<>

Loaded hives: <SAM>

  1 - Edit user data and passwords
  2 - List groups
      - - -
  9 - Registry editor, now with full write support!
  q - Quit (you will be asked if there is something to save)


What to do? [1] -> 1


===== chntpw Edit User Info & Passwords ====

| RID -|---------- Username ------------| Admin? |- Lock? --|
| 01f4 | Administrator                  | ADMIN  | dis/lock |
| 03e9 | NotYourLocalAdmin              | ADMIN  |          |
| 01f7 | DefaultAccount                 |        | dis/lock |
| 01f5 | Gast                           |        | dis/lock |
| 01f8 | WDAGUtilityAccount             |        | dis/lock |

Please enter user number (RID) or 0 to exit: [3e9] 03e9 
================= USER EDIT ====================

RID     : 0501 [03e9]
Username: NotYourLocalAdmin
fullname: 
comment : Ingebouwd account voor beheer van de computer of het domein
homedir : 

00000220 = Administrators (which has 2 members)

Account bits: 0x0211 =
[X] Disabled        | [ ] Homedir req.    | [ ] Passwd not req. | 
[ ] Temp. duplicate | [X] Normal account  | [ ] NMS account     | 
[ ] Domain trust ac | [ ] Wks trust act.  | [ ] Srv trust act   | 
[X] Pwd don't expir | [ ] Auto lockout    | [ ] (unknown 0x08)  | 
[ ] (unknown 0x10)  | [ ] (unknown 0x20)  | [ ] (unknown 0x40)  | 

Failed login count: 0, while max tries is: 0
Total  login count: 4

- - - - User Edit Menu:
 1 - Clear (blank) user password
 2 - Unlock and enable user account [probably locked now]
 3 - Promote user (make user an administrator)
 4 - Add user to a group
 5 - Remove user from a group
 q - Quit editing user, back to user select
Select: [q] > 2
Unlocked!
================= USER EDIT ====================

RID     : 0501 [03e9]
Username: NotYourLocalAdmin
fullname: 
comment : Ingebouwd account voor beheer van de computer of het domein
homedir : 

00000220 = Administrators (which has 2 members)

Account bits: 0x0210 =
[ ] Disabled        | [ ] Homedir req.    | [ ] Passwd not req. | 
[ ] Temp. duplicate | [X] Normal account  | [ ] NMS account     | 
[ ] Domain trust ac | [ ] Wks trust act.  | [ ] Srv trust act   | 
[X] Pwd don't expir | [ ] Auto lockout    | [ ] (unknown 0x08)  | 
[ ] (unknown 0x10)  | [ ] (unknown 0x20)  | [ ] (unknown 0x40)  | 

Failed login count: 0, while max tries is: 0
Total  login count: 4

- - - - User Edit Menu:
 1 - Clear (blank) user password
(2 - Unlock and enable user account) [seems unlocked already]
 3 - Promote user (make user an administrator)
 4 - Add user to a group
 5 - Remove user from a group
 q - Quit editing user, back to user select
Select: [q] > 1
Password cleared!

- - - - User Edit Menu:
 1 - Clear (blank) user password
(2 - Unlock and enable user account) [seems unlocked already]
 3 - Promote user (make user an administrator)
 4 - Add user to a group
 5 - Remove user from a group
 q - Quit editing user, back to user select
Select: [q] > q


<>========<> chntpw Main Interactive Menu <>========<>

Loaded hives: <SAM>

  1 - Edit user data and passwords
  2 - List groups
      - - -
  9 - Registry editor, now with full write support!
  q - Quit (you will be asked if there is something to save)


What to do? [1] -> q

Hives that have changed:
 #  Name
 0  <SAM>
Write hive files? (y/n) [n] : y
 0  <SAM> - OK
```

## URL List

- [chntpw.com](http://www.chntpw.com/download/)
