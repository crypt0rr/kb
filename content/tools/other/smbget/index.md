---
title : "SMBget"
# pre : ' '
description : "wget-like utility for download files over SMB."
date : 2021-06-21T10:57:08+02:00
# hidden : true
# draft : true
weight : 1640
tags : ['Other', 'SMB']
---

---

wget-like utility for download files over SMB

## Installation

```plain
sudo apt install smbclient
```

## Usage

```plain
smbget [OPTION...]
```

## Flags

```plain
  -w, --workgroup=STRING      Workgroup to use (optional)
  -U, --user=STRING           Username to use
  -a, --guest                 Work as user guest
  -n, --nonprompt             Don't ask anything (non-interactive)
  -d, --debuglevel=INT        Debuglevel to use
  -e, --encrypt               Encrypt SMB transport
  -r, --resume                Automatically resume aborted files
  -u, --update                Download only when remote file is newer than local file or local file is missing
  -R, --recursive             Recursively download files
  -b, --blocksize=INT         Change number of bytes in a block
  -o, --outputfile=STRING     Write downloaded data to specified file
  -O, --stdout                Write data to stdout
  -D, --dots                  Show dots as progress indication
  -q, --quiet                 Be quiet
  -v, --verbose               Be verbose
  -f, --rcfile=STRING         Use specified rc file

Help options:
  -?, --help                  Show this help message
      --usage                 Display brief usage message
```

## Examples

### Recursively get with `anonymous` user

```plain
# smbget -R smb://10.10.196.36/anonymous
Password for [root] connecting to //anonymous/10.10.196.36: 
Using workgroup WORKGROUP, user root
smb://10.10.196.36/anonymous/attention.txt
smb://10.10.196.36/anonymous/logs/log2.txt                                       
smb://10.10.196.36/anonymous/logs/log1.txt                                                                            
smb://10.10.196.36/anonymous/logs/log3.txt
Downloaded 634b in 2 seconds
```

### Recursively get with authentication

```plain
# smbget -R smb://10.10.196.36/johndo -U johndo
Password for [johndo] connecting to //johndo/10.10.196.36: 
Using workgroup WORKGROUP, user johndo
smb://10.10.196.36/johndo/Improving Deep Neural Networks.pdf                                                                                                                                                                              
smb://10.10.196.36/johndo/Natural Language Processing-Building Sequence Models.pdf
smb://10.10.196.36/johndo/Convolutional Neural Networks-CNN.pdf
smb://10.10.196.36/johndo/notes/3.01 Search.md
smb://10.10.196.36/johndo/notes/4.01 Agent-Based Models.md
[...]
Downloaded 45.07MB in 53 seconds
```

## URL List

- [Samba.org - smbget](https://www.samba.org/samba/docs/current/man-html/smbget.1.html)
- [Unix.com - smbget](https://www.unix.com/man-page/centos/1/smbget/)
