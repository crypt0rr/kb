---
title : "tldr"
# pre : ' '
description : "A collection of simplified and community-driven man pages."
date : 2022-10-11T10:58:14+02:00
# hidden : true
# draft : true
weight : 1900
# tags : ['']
---

---

The tldr-pages project is a collection of community-maintained help pages for command-line tools, that aims to be a simpler, more approachable complement to traditional man pages.

Maybe you're new to the command-line world? Perhaps you're just a little rusty or can't always recall the arguments for commands like lsof, or tar?

It certainly doesn't help that the first option explained in man tar is:

```plain
-b blocksize
   Specify the block size, in 512-byte records, for tape drive I/O.
   As a rule, this argument is only needed when reading from or writing to tape drives,
   and usually not even then as the default block size of 20 records (10240 bytes) is very common.
```

## Installation

```plain
pip3 install tldr
```

```plain
brew install tldr
```

## Usage

```plain
tldr [-v] [OPTION]... SEARCH
```

## Flags

```plain
available commands:
    -v                   print verbose output          
    --version            print version and exit        
    -h, --help           print this help and exit      
    -u, --update         update local database         
    -c, --clear-cache    clear local database          
    -l, --list           list all entries in the local database
    -p, --platform=PLATFORM select platform, supported are linux / osx / sunos / windows / common
    --linux              show command page for Linux   
    --osx                show command page for OSX     
    --sunos              show command page for SunOS   
    -r, --render=PATH    render a local page for testing purposes
```

## Examples

```plain
$ tldr tar             

tar

Archiving utility.
Often combined with a compression method, such as gzip or bzip2.
More information: <https://www.gnu.org/software/tar>.

- [c]reate an archive and write it to a [f]ile:
    tar cf target.tar file1 file2 file3

- [c]reate a g[z]ipped archive and write it to a [f]ile:
    tar czf target.tar.gz file1 file2 file3

- [c]reate a g[z]ipped archive from a directory using relative paths:
    tar czf target.tar.gz --directory=path/to/directory .

- E[x]tract a (compressed) archive [f]ile into the current directory [v]erbosely:
    tar xvf source.tar[.gz|.bz2|.xz]

- E[x]tract a (compressed) archive [f]ile into the target directory:
    tar xf source.tar[.gz|.bz2|.xz] --directory=directory

- [c]reate a compressed archive and write it to a [f]ile, using [a]rchive suffix to determine the compression program:
    tar caf target.tar.xz file1 file2 file3

- Lis[t] the contents of a tar [f]ile [v]erbosely:
    tar tvf source.tar

- E[x]tract files matching a pattern from an archive [f]ile:
    tar xf source.tar --wildcards "*.html"
```

## URL list

- [tldr.sh](https://tldr.sh/)
- [Github.com - tldr](https://github.com/tldr-pages/tldr)
- [Formulae.brew.sh](https://formulae.brew.sh/formula/tldr#default)
