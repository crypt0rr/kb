---
title : "Gosecretsdump"
# pre : ' '
description : "Dump ntds.dit really fast."
date : 2022-03-11T14:42:32+01:00
# hidden : true
# draft : true
weight : 770
# tags : ['']
---

---

Have you been using Impacket to dump hashes out of (large) NTDS.dit files, and become increasingly frustrated at how long it takes? I sure have!

All credit for the original code to the impacket devs, it's much more complicated than I anticipated.

This is a conversion of the impacket secretsdump module into golang. It's not very good, but it is quite fast. Please let me know if you find bugs, I'll try and fix where I can - bonus points if you can provide sample .dit files for me to bash against.

### Features

- Dumps dits very fast. Operations that usually take hours are now done in minutes.
- Can dump SAM/SYSTEM backups
- Can dump local SAM/SYSTEM (must be run as the machine account/SYSTEM)
- A somewhat usable interface for integration other other tooling (See lib example below)

## Installation

```plain
git clone https://github.com/C-Sto/gosecretsdump.git
cd gosecretsdump
go build
```

## Usage

```plain
./gosecretsdump [OPTIONS]
```

## Flags

```plain
gosecretsdump vDEV (@C__Sto)

  -enabled
        Only output enabled accounts
  -history
        Include Password History
  -livesam
        Get hashes from live system. Only works on local machine hashes (SAM), only works on Windows.
  -noprint
        Don't print output to screen (probably use this with the -out flag)
  -ntds string
        Location of the NTDS file (required)
  -out string
        Location to export output
  -sam string
        Location of SAM registry hive
  -status
        Include status in hash output
  -stream
        Stream to files rather than writing in a block. Can be much slower.
  -system string
        Location of the SYSTEM file (required)
  -version
        Print version and exit
```

## Examples

Example `NTDS.dit` and `SYSTEM` files zipped below.

{{%resources fa_icon_class="far fa-file" pattern=".*(NTDS.DIT-SYSTEM)"/%}}

```plain
$ ./gosecretsdump -ntds ntds.dit -system SYSTEM 
gosecretsdump vDEV (@C__Sto)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Administrator:aes256-cts-hmac-sha1-96:01cf1b228b57c4eaf079d3351df334bcf29029758cd149fe9119288790a81ffe
Administrator:aes128-cts-hmac-sha1-96:e3e7702f1e80e20b809a8e5299c8aced
Administrator:des-cbc-md5:4583e037f2642f2c
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SRV2019$:1000:aad3b435b51404eeaad3b435b51404ee:8e9f10830aaa0d66e4106f5b802266db:::
SRV2019$:aes256-cts-hmac-sha1-96:1ab20a64873c23b8a9aeec473bf72062be4378e4a105e054784964d8752c2bc2
SRV2019$:aes128-cts-hmac-sha1-96:98dba42d3c49aa9a7e6ae216dbf8c765
SRV2019$:des-cbc-md5:b9add676987c16fd
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:a0b5d64d34935c8a4780b715cfb444c4:::
krbtgt:aes256-cts-hmac-sha1-96:40662b9f80673d2a9913d575a68c8e1f309c6096ee3703b712a4b03915634ee8
krbtgt:aes128-cts-hmac-sha1-96:c36124ef912856b68476fb6f8ef12fd8
krbtgt:des-cbc-md5:bf4ae5e0ade3d3d3
offsec.nl\MARSHALL_FRANKS:1103:aad3b435b51404eeaad3b435b51404ee:dacd6680af15849bb89a4f0da30e99b0:::
offsec.nl\MARSHALL_FRANKS:aes256-cts-hmac-sha1-96:4d9612a12c24eaca064b4d28485c11ddae58f65588b085896fe15fa44208cfd8
offsec.nl\MARSHALL_FRANKS:aes128-cts-hmac-sha1-96:e3f7f74334a4629e8b0dddd948349bec
offsec.nl\MARSHALL_FRANKS:des-cbc-md5:0df19bf71a6d9245
```

## URL List

- [Github.com - Gosecretsdump](https://github.com/C-Sto/gosecretsdump)
