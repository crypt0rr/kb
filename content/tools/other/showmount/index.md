---
title: "Showmount"
# pre : ' '
description: "Show mount information for an NFS server."
date: 2020-03-10T19:48:37+01:00
# hidden : true
# draft : true
weight: 1600
tags : ['Other', 'Tools']
---

---

Show mount information for an NFS server.

## Installation

```plain
sudo apt install nfs-common
```

## Usage

```plain
showmount
```

## Flags

```plain
Usage: showmount [-adehv]
       [--all] [--directories] [--exports]
       [--no-headers] [--help] [--version] [host]

OPTIONS
       -a or --all
              List both the client hostname or IP address and mounted directory in host:dir format. This info should not be considered reliable. See the notes on rmtab in rpc.mountd(8).

       -d or --directories
              List only the directories mounted by some client.

       -e or --exports
              Show the NFS servers export list.

       -h or --help
              Provide a short help summary.

       -v or --version
              Report the current version number of the program.

       --no-headers
              Suppress the descriptive headings from the output.
```

## Examples

### List shares available

```plain
showmount -e <target>
Export list for <target>:
/Public
/Download
/Private
```

### Mount available share

```plain
sudo mount -t nfs <ip>:/share temp
```

## URL List

- [Linux.die.net - showmount](https://linux.die.net/man/8/showmount)
