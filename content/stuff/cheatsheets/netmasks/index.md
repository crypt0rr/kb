---
title: "Netmasks / Subnetting"
pre: '<i class="fas fa-network-wired"></i> '
description: "Overview of network CIDR, Addresses, Hosts, Netmask and amount of clients."
date: 2020-11-26T15:39:37+01:00
# hidden : true
# draft : true
weight: 90
tags: ["Stuff", "CIDR", "Netmask", "Subnetting"]
---

---

## Network classes (private ranges)

| Class                                        | Short noted | Address Range                 | Default Subnet Mask | Available Hosts |
| -------------------------------------------- | ----------- | ----------------------------- | ------------------- | --------------- |
| A                                            | 10/8        | 10.0.0.0 - 10.255.255.255     | 255.0.0.0 (/8)      | 16.777.214      |
| B                                            | 172.16/12   | 172.16.0.0 - 172.31.255.255   | 255.240.0.0 (/12)   | 1.048.574       |
| C                                            | 192.168/16  | 192.168.0.0 - 192.168.255.255 | 255.255.0.0 (/16)   | 65.534          |
| LOCALHOST                                    | -           | 127.0.0.0 - 127.255.255.255   | -                   | -               |
| [CGNAT](https://tools.ietf.org/html/rfc6598) | -           | 100.64.0.0 - 100.127.255.255  | 255.192.0.0 (/10)   | 4.194.302       |

## Netmasks / Subnetting

Overview of network CIDR, Addresses, Hosts, Netmask and amount of clients

| CIDR | Addresses |  Hosts   |     Netmask     | Amount of a Class C |
| :--- | :-------: | :------: | :-------------: | ------------------: |
| /32  |     1     |    1     | 255.255.255.255 |                   - |
| /31  |     2     |    2     | 255.255.255.254 |                   - |
| /30  |     4     |    2     | 255.255.255.252 |                1/64 |
| /29  |     8     |    6     | 255.255.255.248 |                1/32 |
| /28  |    16     |    14    | 255.255.255.240 |                1/16 |
| /27  |    32     |    30    | 255.255.255.224 |                 1/8 |
| /26  |    64     |    62    | 255.255.255.192 |                 1/4 |
| /25  |    128    |   126    | 255.255.255.128 |                 1/2 |
| /24  |    256    |   254    |  255.255.255.0  |                   1 |
| /23  |    512    |   510    |  255.255.254.0  |                   2 |
| /22  |   1024    |   1022   |  255.255.252.0  |                   4 |
| /21  |   2048    |   2046   |  255.255.248.0  |                   8 |
| /20  |   4096    |   4094   |  255.255.240.0  |                  16 |
| /19  |   8192    |   8190   |  255.255.224.0  |                  32 |
| /18  |   16384   |  16382   |  255.255.192.0  |                  64 |
| /17  |   32768   |  32766   |  255.255.128.0  |                 128 |
| /16  |   65536   |  65534   |   255.255.0.0   |                 256 |
| /15  |  131072   |  131070  |   255.254.0.0   |                 512 |
| /14  |  262144   |  262142  |   255.252.0.0   |                1024 |
| /13  |  524288   |  524286  |   255.248.0.0   |                2048 |
| /12  |  1048576  | 1048574  |   255.240.0.0   |                4096 |
| /11  |  2097152  | 2097150  |   255.224.0.0   |                8192 |
| /10  |  4194304  | 4194302  |   255.192.0.0   |               16384 |
| /9   |  8388608  | 8388606  |   255.128.0.0   |               32768 |
| /8   | 16777216  | 16777214 |    255.0.0.0    |               65536 |
