---
title : "ntcrack"
# pre : ' '
description : "Left To My Own Devices - NT cracker."
date : 2022-06-02T11:42:44+02:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Left To My Own Devices - NT cracker

A full writeup of how it works is available at [the SensePost blog](https://sensepost.com/blog/2022/left-to-my-own-devices-fast-ntcracking-in-rust/)

## Installation

```plain
git clone https://github.com/sensepost/ntcrack.git
cd ntcrack
cargo build --release
```

## Usage

It expects the hashes to be NT hashes one per line, with nothing else. So strip out hashcat or john mode information.

```plain
./ntcrack <input hashlist> <wordlist>
```

## Examples

```plain
$ ./ntcrack crackme.hashes rockyou.txt 
[+] Wordlist is 139921497 bytes and 8541 pages, currently 96.72% cached
Successfully cached wordlist
cfed54356240eb62c790ff9a50afe9a4:Dragons1
bb4100e9eb5bebb6ba6f80f161a57ecc:Welkom1
7100a909c7ff05b266af3c42ec058c33:Password01
baeeb91fda70031e460d4dde44a2f755:Gabriel1
be9bff02f626363706760756d709730d:A123456789
1d863479e1ab3bd62a2bfafa1abaa2dd:Welcome01
0aad3e6a4d627a4dbafe24df580cb2e8:Welkom01
2b143626a5aef2ed6dafa27fdebe92a4:Vanessa12
08d7a47a6f9f66b97b1bae4178747494:Flowers1
de05278f8a78c5db97adfd44d919aff1:Welcome08
5b75998843875b121e1e114f810e36ef:Wachtwoord01
b9e0cfceaf6d077970306a2fd88a7c0a:Test1234
5d84e6111d11a4ab796e0d3151c77b52:Miguel123
84904ba80fb75035f26b56c4774e8347:Lifetime1
d7d95ad619cb0ad7ad3464acbb17047f:Winter00
281d28366612990c03979c4e5c88e6fb:Thierry14
258fefc3756e7da2c22f4fad7a9f817a:Tessa1996
55449a6e166bbcea5be16c9ca1292486:0Xbcy678!*
cb30eb57a626946c7e70f4232f677bb2:Welkom123
6c2cd1dc9e697afec47425f72b34d1c2:Sexylove1
54fed91ebb5617503951d41406d5774b:Max12345
cec952be4f2f1e0efd42d09804e4c90c:Marlb0r0
e070a89a30931a0577e3ffa851902fb6:Secure01
c4e07ca741fa696f6337679e5bcf01c6:Abc12345!
7c451851ea87b63ec7692126416d01eb:topsecret
e19ccf75ee54e06b06a5907af13cef42:P@ssw0rd
6371c2a75c479e37f5e3ecbbe6f673fb:Liverpool1
64de6f310a3c26b02f11c901efa0cd34:stargatesg1
89551acff8895768e489bb3054af94fd:P@ssw0rd123
09238831b1af5edab93c773f56409d96:P4$$w0rd
644913fdd7c5b0871e9c591b3b2f761a:Hallo123
06c91877036c79166b9e1ac0dc2d52f0:Leonie01
3039e622b073b457f5b5df086d0f37dd:Spiderman1
7facdc498ed1680c4fd1448319a8c04f:Password1!
316c5ae8a7b5dfce4a5604d17d9e976e:Welcome123
f00138d9f5b0157931896bece8a25897:Raiders99
c7932f078531d1e98fb8b3af969d98fa:Jupiter30
38d210cd68beb6e7428076a4c4e21e2c:AAaa11!!
97d72c431bf886c4f0d75c9e653e4c96:Chris1234
cc74d9e2446cd4ff8fb4c8fca1d93df1:Berlin01
4eaf020b272be2c426875888abeb4511:B0ll0cks
775e71cdcab9c4e88dd337142d21f7e4:Amsterdam01
e45a314c664d40a227f9540121d1a29d:Admin123
[+] Stats:
  Time: 0.28 s
  Hashed: 14344390, Cracked: 43, Crack Speed: 49965.53 kH/s
  Read: 136463 kB, Read Speed: 475.34 MB/s
  Thread Waits: 28 Wait Speed: 99.87 w/s
```

## URL List

- [Github.com - ntcrack](https://github.com/sensepost/ntcrack)
- [Sensepost.com - Left To My Own Devices – Fast NTCracking in Rust](https://sensepost.com/blog/2022/left-to-my-own-devices-fast-ntcracking-in-rust/)
