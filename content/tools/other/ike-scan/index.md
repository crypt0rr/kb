---
title : "IKE-scan"
# pre : ' '
description : "Discover and fingerprint IKE hosts (IPsec VPN Servers)."
date : 2020-03-13T21:52:51+01:00
# hidden : true
# draft : true
weight : 900
# tags : ['']
---

---

Discover and fingerprint IKE hosts (IPsec VPN Servers).

## Installation

```plain
git clone https://github.com/royhills/ike-scan.git
```

```plain
cd ike-scan
autoreconf --install
./configure
make
make check
sudo make install
```

## Usage

```plain
sudo ike-scan <target-ip> -M -A --id=groupnamedoesnotexist -P
```

To directly save the hash in crackable format.

```plain
sudo ike-scan <target-ip> -M -A --id=groupnamedoesnotexist -P --pskcrack=hash.txt
```

## Examples

```plain
$ sudo ike-scan 10.10.10.10 -M -A --id=CISCO-DELETE-REASON -P
Starting ike-scan 1.9.4 with 1 hosts (http://www.nta-monitor.com/tools/ike-scan/)
10.10.10.10  Aggressive Mode Handshake returned
    HDR=(CKY-R=00fa00fc000b000c)
    SA=(Enc=3DES Hash=SHA1 Group=2:modp1024 Auth=PSK LifeType=Seconds LifeDuration=28800)
    KeyExchange(128 bytes)
    Nonce(20 bytes)
    ID(Type=ID_IPV4_ADDR, Value=10.10.10.10)
    Hash(20 bytes)
    VID=12[...REDACTED...] (Cisco Unity)
    VID=09[...REDACTED...] (XAUTH)
    VID=af[...REDACTED...] (Dead Peer Detection v1.0)
    VID=40[...REDACTED...] (IKE Fragmentation)
    VID=1f[...REDACTED...] (Cisco VPN Concentrator)

IKE PSK parameters (g_xr:g_xi:cky_r:cky_i:sai_b:idir_b:ni_b:nr_b:hash_r):
53f3[...REDACTED...]29f
Ending ike-scan 1.9.4: 1 hosts scanned in 0.024 seconds (40.93 hosts/sec).  1 returned handshake; 0 returned notify
```

## URL List

- [GitHub.com - IKE-scan](https://github.com/royhills/ike-scan)
