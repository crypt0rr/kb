---
title : "Grouper2"
# pre : ' '
description : "Tool for pentesters to help find security-related misconfigurations in Active Directory Group Policy."
date : 2021-01-20T10:26:34+01:00
# hidden : true
# draft : true
weight : 110
tags : ['Other', 'Active Directory']
---

---

Tool for pentesters to help find security-related misconfigurations in Active Directory Group Policy.

## Installation

Download newest release from [GitHub.com](https://github.com/l0ss/Grouper2/releases)

### Obfuscated

{{%resources fa_icon_class="far fa-file-pdf" pattern=".*(exe)"/%}}
{{%resources fa_icon_class="far fa-file-pdf" pattern=".*(zip)"/%}}

## Usage

```plain
Grouper2.exe
```

## Flags

```plain
-u username - Username to use for LDAP operations.
-p password - Password to use for LDAP operations.
-v verbose - Enables debug mode. Probably quite noisy and rarely necessary. Will also show you the names of any categories of policies that Grouper saw but didn't have any means of processing. I eagerly await your pull request.
-i interestlevel - The minimum interest level to display. i.e. findings with an interest level lower than x will not be seen in output. Defaults to 1, i.e. show everything except some extremely dull defaults. If you want to see those too, do -i 0.
-s sysvol - Set the path to a domain SYSVOL directory.
-o offline - Disables checks that require LDAP comms with a DC or SMB comms with file shares found in policy settings. Requires that you define a value for -s.
-t threads - Max number of threads. Defaults to 10.
-h help - Displays this help.
-g pretty - Switches output from the raw Json to a prettier format.
-m nomess - Avoids file writes at all costs. May find less stuff.
-c currentonly - Only checks current policies, ignoring stuff in those Policies_NTFRS_* directories that result from replication failures.
-n nogrepscripts - Don't grep through the files in the "Scripts" subdirectory
-d domain - Domain to query for Group Policy Goodies.
-f html - Path for html output file.
-q quiet - Enables quiet mode. Turns off progress counter.
```

## Examples

```plain
$ Grouper2.exe -u johndo -p Welkom1234 -f output.html

Running as user: offsec.nl\johndo

All online checks will be performed in the context of this user.
  .,-:::::/::::::..      ..     ...   ::::::::::::..,::::::::::::..  ,;'``;.
,;;-'````' ;;;``;;;;  .;;;;;;.  ;;    ;;;`;;;```.;;;;;;'''';;;``;;;; ''  ,[[
[[[   [[[[[[[[,/[[[' ,[[    \[[[['    [[[ `]]nnn]]' [[cccc  [[,/[[['  .c$P'
'$$c.    '$$$$$$$c   $$$,    $$$$     $$$  $$$''    $$''''  $$$$$c   d8MMMUP*
 `Y8bo,,,o8888b '88bo'888,__,8888   .d888  888o     888oo,__88b '88bo
   `'YMUP'YMMMM   'W'  'YMMMMP' 'YmMMMM''  YMMMb    ''''YUMMMMM   'W'
                                                    Now even Grouperer.
                                                    github.com/l0ss/Grouper2
                                                    @mikeloss

Trying to figure out what AD domain we're working with.

Current AD Domain is: offsec.nl

Targeting SYSVOL at: \\offsec.nl\sysvol\offsec.nl\

I found all these directories in SYSVOL...
###############################
\\offsec.nl\sysvol\offsec.nl\DfsrPrivate
\\offsec.nl\sysvol\offsec.nl\Policies
\\offsec.nl\sysvol\offsec.nl\scripts
###############################
... and I'm going to find all the goodies I can in all of them.

230 GPOs to process.

Starting processing GPOs with 10 threads.
229/229 GPOs processed. 100% complete.

Processing SYSVOL script dirs.

Errors in processing GPOs:
{}


Grouper2 took 0:1:1:418 to run.
```

## URL List

- [Github.com - Grouper2](https://github.com/l0ss/Grouper2)
