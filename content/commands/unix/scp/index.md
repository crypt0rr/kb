---
title : "scp"
# pre : ' '
description : "Secure copy (remote file copy program)."
date : 2020-03-17T16:54:05+01:00
# hidden : true
# draft : true
weight : 750
# tags : ['']
---

---

SCP / Secure copy (remote file copy program).

## Usage

```plain
scp [OPTIONS]
```

## Flags

```plain
usage: scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file]
            [-J destination] [-l limit] [-o ssh_option] [-P port]
            [-S program] source ... target
```

## Examples

### Transfer file to target (SSH)

```plain
scp <file> <user>@<ip-address>:~/
```

### Receive file from target (SSH)

```plain
scp <user>@<ip-address>:~/<file> .
```

### Receive file with key and specific port

```plain
scp -i ~/key.pub -P2222 john@10.10.10.10:~/hashes.ntds .
```

### Send file with key

```plain
scp -i ~/key.pub hashes.zip proxy:~/
```

### Copy all files in directory

```plain
scp <user>@<ip-address>:/directory/* .
```

### Copy directory recursively from remote server

```plain
scp -r <user>@<ip-address>:/directory local_directory
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/scp)
