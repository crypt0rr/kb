---
title : "bike-scan"
# pre : ' '
description : "Brute force wrapper for ike-scan."
date : 2022-05-17T11:56:16+02:00
# hidden : true
# draft : true
weight : 170
# tags : ['']
---

---

bike-scan is a wrapper to turn [ike-scan]({{< ref "ike-scan" >}}) into a brute-force tool. It does this by testing a remote host with every possible combination of transforms, in the chosen order of 'rarity'. Eg. all DES, 3DES, AES, MD5, SHA1, PSK, MOD1 types before testing less common combinations. By default, bike-scan will try and brute-force transforms in main mode first, then move onto aggressive mode.

## Installation

bike-scan requires a working installation of [ike-scan]({{< ref "ike-scan" >}}).

```plain
git clone https://github.com/yaap7/bike-scan
chmod +x bike-scan.sh
```

## Usage

```plain
./bike-scan.sh [options] [host]
```

## Flags

```plain
_     _ _                                 
| |__ (_) | _____       ___  ___ __ _ _ __  
| '_ \| | |/ / _ \_____/ __|/ __/ _` | '_ \ 
| |_) | |   <  __/_____\__ \ (_| (_| | | | |
|_.__/|_|_|\_\___|     |___/\___\__,_|_| |_|
Brute force using ike-scan              v1.1
                       www.interspective.net

bike-scan is a wrapper to turn ike-scan into a brute-force tool.
It does this by testing a remote host with every possible combination of
transforms, in the chosen order of 'rarity'. Eg. all DES, 3DES, AES, MD5,
SHA1, PSK, MOD768 types before testing less common combinations.
By default, bike-scan will try and brute-force transforms in main mode
first, then move onto aggressive mode.

Options:

--help or -h              Display this usage message and exit.

--main or -M              Main mode scan only.

--aggressive or -A        Aggressive mode scan only.

-AM                       Switch the mode order to Aggressive then Main

--rarity=<r> or -R<r>     Specify transform 'rarity' and order.
                          Options include, c, r and v, for Common, Rare
                          and Very rare. Default --rarity=cr

 Example: ./bike-scan.sh -Rcr -AM [host]
                          Scan Common and Rare transform combinations
                          in Aggressive mode, then Main mode.
```

## Examples

```plain
$ ./bike-scan.sh vpn.offsec.nl
 _     _ _                                 
| |__ (_) | _____       ___  ___ __ _ _ __  
| '_ \| | |/ / _ \_____/ __|/ __/ _` | '_ \ 
| |_) | |   <  __/_____\__ \ (_| (_| | | | |
|_.__/|_|_|\_\___|     |___/\___\__,_|_| |_|
Brute force using ike-scan              v1.1
                       www.interspective.net

[+] Building transform list using rarity order: common rare 

[+] Done. List contains 7560 transform combinations.

Successful command: ike-scan -r 1 -M  -a 1,2,1,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=DES Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 1,2,3,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=DES Hash=SHA1 Group=2:modp1024 Auth=RSA_Sig LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 1,2,65001,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=DES Hash=SHA1 Group=2:modp1024 Auth=XAUTH_PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 5,2,1,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=3DES Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 5,2,3,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=3DES Hash=SHA1 Group=2:modp1024 Auth=RSA_Sig LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 5,2,65001,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=3DES Hash=SHA1 Group=2:modp1024 Auth=XAUTH_PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 7/128,2,1,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=AES KeyLength=128 Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 7/192,2,1,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=AES KeyLength=192 Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 7/256,2,1,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=AES KeyLength=256 Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 7/128,2,3,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=AES KeyLength=128 Hash=SHA1 Group=2:modp1024 Auth=RSA_Sig LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
   
Successful command: ike-scan -r 1 -M  -a 7/192,2,3,2 vpn.offsec.nl
vpn.offsec.nl   Main Mode Handshake returned
   HDR=(CKY-R=1234567890)
   SA=(Enc=AES KeyLength=192 Hash=SHA1 Group=2:modp1024 Auth=RSA_Sig LifeType=Seconds LifeDuration=28800)
   VID=1234567898525e712345678900000 (IKE Fragmentation)
```

## URL List

- [Github.com - bike-scan](https://github.com/yaap7/bike-scan)
