---
title : "ARRAffinity"
# pre : ' '
description : "Information Disclosure?"
date : 2021-06-22T09:53:03+02:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

## Installation

```plain
git clone https://github.com/0x454b/ARRAffinity.git
```

## Usage

```plain
python3 ARRAffinity.py value [-h] [-c COOKIE] [-s SUBNET]
```

## Flags

```plain
  -h, --help           show this help message and exit
  -c, --cookie COOKIE  Cookie value
  -s, --subnet SUBNET  Expected subnet
```

### Precomputation

```plain
$ python3 ARRAffinity.py -s 127.0.0.0/30
127.0.0.0 b1bdc9bd47ba441055db5507a6d0e73c4c0c569b343d80342bec79ca19a27844
127.0.0.1 a65017b383afe1d4c5d31a1a299b19102ba29d57d8a1d13f96ef19d7a3a64b7c
127.0.0.2 445d7f3ba4d968338f6ac82fd7a6e78eb620630da86e42e7d0105b91eec78e4f
127.0.0.3 98772e14388daf29e289ee5494c09b5086209d0e6c8ea32f6a8e35c8a14377e3
```

### Cookie and/or subnet check

```plain
$ python3 ARRAffinity.py -c c4a2a70106b7cf78b28c0ef7da0327960c3fc7fa76363fb9c937f01b04c6276f
No ARRAffinity match in subnet 127.0.0.1/32
No ARRAffinity match in subnet 192.168.0.0/16
No ARRAffinity match in subnet 172.16.0.0/12

ARRAffinity match! IP: 10.20.30.40
```

## URL List

- [Github.com - ARRAffinity](https://github.com/0x454b/ARRAffinity)
- [Blog.msdn.microsoft.com - Azure ARRAffinity Makes AFFinity cookies](https://blogs.msdn.microsoft.com/devschool/2015/06/19/azure-arraffinity-makes-affinity-cookies/)
