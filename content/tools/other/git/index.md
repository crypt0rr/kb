---
title : "Git"
# pre : ' '
description : "Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals."
date : 2020-03-10T15:34:47+01:00
# hidden : true
# draft : true
weight : 720
tags : ['Other', 'macOS', 'Windows', 'Linux']
---

---

Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.

## Installation

```plain
sudo apt install git
```

## Usage

```plain
git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
```

## Flags

```plain
These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Use binary search to find the commit that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout    Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Reapply commits on top of another base tip
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
```

## Examples

### Initial setup

Get noreply e-mail for your account from <https://github.com/settings/emails>

```plain
git config --global user.email example@users.noreply.github.com
git config --global user.name example
```

### Steps for commit

```plain
git add <file>
git commit -m '<description>'
git push
```

### SSH use

```plain
Host github.com
        User git
        Hostname github.com
        PreferredAuthentications publickey
        IdentityFile private_key
```

### New repo from existing files folder

```plain
git init
git remote add origin git@github.com:<user>/<repo>.git
git add -A
git commit -m '<description>'
git branch -M master
git push -u origin master
```

### Submodule (repo in the repo)

Create the file .gitmodules in root of repo and add something like:

```plain
git submodule add https://github.com/example/example
```

When repo is cloned, run the following two commands to clone the sub-module

```plain
git submodule init
git submodule update
```

### Remove file from git AND locally

```plain
git rm file1.txt
git commit -m "remove file1.txt"
```

### Remove file from git but NOT locally

```plain
git rm --cached file1.txt
git commit -m "remove file1.txt"
```

### Overview of contribution on repo

```plain
$ git shortlog -s -n
    74  crypt0rr
    34  johndo
     7  janedo
     5  anonymous
```

## URL List

- [Meziantou.net - Hide your email address on Github](https://www.meziantou.net/2018/04/23/hide-your-email-address-on-github)
