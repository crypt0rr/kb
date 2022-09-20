---
title : "mkdir"
# pre : '<i class="fas fa-code"></i> '
description : "Make directories."
date : 2022-09-20T11:21:43+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## mkdir

Create the DIRECTORY(ies), if they do not already exist.

### Usage

```plain
mkdir [OPTION] directory
```

### Examples

#### Create two separate directories

```plain
$ mkdir one two

$ ls
one two
```

#### Create directories in a directory

```plain
$ mkdir -p test/{one,two,three}

$ ls     
test 

$ ls test 
one   three two
```

### URL list

* [Linux.die.net - mkdir](https://linux.die.net/man/1/mkdir)
