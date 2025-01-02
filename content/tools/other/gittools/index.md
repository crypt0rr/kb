---
title : "Gittools"
# pre : ' '
description : "This repository contains three small python/bash scripts used for the Git research."
date : 2021-06-20T17:22:59+02:00
# hidden : true
# draft : true
weight : 750
tags : ['Other', 'Git']
---

---

This repository contains three small python/bash scripts used for the Git research.

## Installation

```plain
git clone https://github.com/internetwache/GitTools.git
```

## Finder

You can use this tool to find websites with their .git repository available to the public

## Usage (finder)

This python script identifies websites with publicly accessible `.git` repositories. It checks if the `.git/HEAD` file contains `refs/heads`.

```plain
$ ./gitfinder.py -h

#########
# Finder is part of https://github.com/internetwache/GitTools
#
# Developed and maintained by @gehaxelt from @internetwache
#
# Use at your own risk. Usage might be illegal in certain circumstances.
# Only for educational purposes!
#########

usage: gitfinder.py [-h] [-i INPUTFILE] [-o OUTPUTFILE] [-t THREADS]

optional arguments:
  -h, --help            show this help message and exit
  -i INPUTFILE, --inputfile INPUTFILE
                        input file
  -o OUTPUTFILE, --outputfile OUTPUTFILE
                        output file
  -t THREADS, --threads THREADS
                        threads
```

The input file should contain the targets one per line. The script will output discovered domains in the form of `[*] Found: DOMAIN` to stdout.

## Dumper

This tool can be used to download as much as possible from the found .git repository from webservers which do not have directory listing enabled.

## Usage (dumper)

```plain
$ ./gitdumper.sh -h

[*] USAGE: http://target.tld/.git/ dest-dir [--git-dir=otherdir]
        --git-dir=otherdir      Change the git folder name. Default: .git
```

Note: This tool has no 100% guaranty to completely recover the .git repository. Especially if the repository has been compressed into `pack`-files, it may fail.

## Extractor

A small bash script to extract commits and their content from a broken repository.

This script tries to recover incomplete git repositories:

- Iterate through all commit-objects of a repository
- Try to restore the contents of the commit
- Commits are not sorted by date

## Usage

```plain
./extractor.sh /tmp/mygitrepo /tmp/mygitrepodump
```

where

- `/tmp/mygitrepo` contains a .git directory
- `/tmp/mygitrepodump` is the destination directory

This can be used in combination with the Git Dumper in case the downloaded repository is incomplete.

## Demo

[Asciinema.org](https://asciinema.org/a/24072)

## URL List

- [Github.com - GitTools](https://github.com/internetwache/GitTools)
