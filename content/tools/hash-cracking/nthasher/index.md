---
title : "nthasher"
# pre : ' '
description : "A fast wordlist to nthash converter."
date : 2021-11-25T13:50:33+01:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

A fast wordlist to nthash converter

## Installation

It's a vanilla rust cargo program that can be compiled with:

```plain
cargo build --release
```

You'll need rust and cargo. The easiest way to get it is from <https://rustup.rs>

## Usage

Pass it a UTF8 encoded wordlist on stdin, and write the output to a file.

```plain
./nthasher < wordlist > wordlist.nthashes
```

## UTF8 Encoding

You can use `iconv`

```plain
iconv -t utf8 -c <wordlist.in> > <wordlist.out>
```

## Examples

```plain
$ ./nthasher < input > output

$ cat output                       
1c72ec33dcd8413a552d6563d7bb6452
03866b8ec379364adaf45a62569aa865
1d863479e1ab3bd62a2bfafa1abaa2dd
938d7eff72c85ed654a7bc5f2211a46d
0aad3e6a4d627a4dbafe24df580cb2e8
cb30eb57a626946c7e70f4232f677bb2
1c72ec33dcd8413a552d6563d7bb6452
03866b8ec379364adaf45a62569aa865
1d863479e1ab3bd62a2bfafa1abaa2dd
938d7eff72c85ed654a7bc5f2211a46d
0aad3e6a4d627a4dbafe24df580cb2e8
cb30eb57a626946c7e70f4232f677bb2
225d6726ae74413a263b2c4e8ca29bd5
7ed2bf607de282835ac7b3b455298fda
3cbb677e98ca0e9005acb599398958ef
95def6c091616d651b1c1fd7c208866a
2a32ece59b41943e4c641a9388b74fb3
```

## URL List

- [Github.com - nthasher](https://github.com/singe/nthasher)
