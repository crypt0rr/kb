---
title : "hashcat"
# pre : ' '
description : "World's fastest and most advanced password recovery utility."
date : 2020-03-11T14:16:57+01:00
# hidden : true
# draft : true
weight : 60
#tags : ['Other']
---

---

World's fastest and most advanced password recovery utility.

## Installation

For automation of hash-cracking process use [hash-cracker]({{< ref "hash-cracker" >}})

```plain
git clone https://github.com/hashcat/hashcat.git
```

Navigate to hashcat directory

```plain
sudo make
```

```plain
sudo make install
```

Uninstalling can be done from the same folder with `sudo make uninstall`

For devices running a NVIDIA card with CUDA support.

```plain
sudo apt install nvidia-cuda-toolkit
```

## Usage

```plain
hashcat [options]... hash|hashfile|hccapxfile [dictionary|mask|directory]...
```

### Built-in charsets (brute-force)

```plain
  ?l | abcdefghijklmnopqrstuvwxyz [a-z]
  ?u | ABCDEFGHIJKLMNOPQRSTUVWXYZ [A-Z]
  ?d | 0123456789                 [0-9]
  ?h | 0123456789abcdef           [0-9a-f]
  ?H | 0123456789ABCDEF           [0-9A-F]
  ?s |  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  ?a | ?l?u?d?s
  ?b | 0x00 - 0xff
```

## Flags

```plain
hashcat (v6.0.0) starting...

Usage: hashcat [options]... hash|hashfile|hccapxfile [dictionary|mask|directory]...

- [ Options ] -

 Options Short / Long           | Type | Description                                          | Example
================================+======+======================================================+=======================
 -m, --hash-type                | Num  | Hash-type, see references below                      | -m 1000
 -a, --attack-mode              | Num  | Attack-mode, see references below                    | -a 3
 -V, --version                  |      | Print version                                        |
 -h, --help                     |      | Print help                                           |
     --quiet                    |      | Suppress output                                      |
     --hex-charset              |      | Assume charset is given in hex                       |
     --hex-salt                 |      | Assume salt is given in hex                          |
     --hex-wordlist             |      | Assume words in wordlist are given in hex            |
     --force                    |      | Ignore warnings                                      |
     --status                   |      | Enable automatic update of the status screen         |
     --status-json              |      | Enable JSON format for status ouput                  |
     --status-timer             | Num  | Sets seconds between status screen updates to X      | --status-timer=1
     --stdin-timeout-abort      | Num  | Abort if there is no input from stdin for X seconds  | --stdin-timeout-abort=300
     --machine-readable         |      | Display the status view in a machine-readable format |
     --keep-guessing            |      | Keep guessing the hash after it has been cracked     |
     --self-test-disable        |      | Disable self-test functionality on startup           |
     --loopback                 |      | Add new plains to induct directory                   |
     --markov-hcstat2           | File | Specify hcstat2 file to use                          | --markov-hcstat2=my.hcstat2
     --markov-disable           |      | Disables markov-chains, emulates classic brute-force |
     --markov-classic           |      | Enables classic markov-chains, no per-position       |
 -t, --markov-threshold         | Num  | Threshold X when to stop accepting new markov-chains | -t 50
     --runtime                  | Num  | Abort session after X seconds of runtime             | --runtime=10
     --session                  | Str  | Define specific session name                         | --session=mysession
     --restore                  |      | Restore session from --session                       |
     --restore-disable          |      | Do not write restore file                            |
     --restore-file-path        | File | Specific path to restore file                        | --restore-file-path=x.restore
 -o, --outfile                  | File | Define outfile for recovered hash                    | -o outfile.txt
     --outfile-format           | Str  | Outfile format to use, separated with commas         | --outfile-format=1,3
     --outfile-autohex-disable  |      | Disable the use of $HEX[] in output plains           |
     --outfile-check-timer      | Num  | Sets seconds between outfile checks to X             | --outfile-check=30
     --wordlist-autohex-disable |      | Disable the conversion of $HEX[] from the wordlist   |
 -p, --separator                | Char | Separator char for hashlists and outfile             | -p :
     --stdout                   |      | Do not crack a hash, instead print candidates only   |
     --show                     |      | Compare hashlist with potfile; show cracked hashes   |
     --left                     |      | Compare hashlist with potfile; show uncracked hashes |
     --username                 |      | Enable ignoring of usernames in hashfile             |
     --remove                   |      | Enable removal of hashes once they are cracked       |
     --remove-timer             | Num  | Update input hash file each X seconds                | --remove-timer=30
     --potfile-disable          |      | Do not write potfile                                 |
     --potfile-path             | File | Specific path to potfile                             | --potfile-path=my.pot
     --encoding-from            | Code | Force internal wordlist encoding from X              | --encoding-from=iso-8859-15
     --encoding-to              | Code | Force internal wordlist encoding to X                | --encoding-to=utf-32le
     --debug-mode               | Num  | Defines the debug mode (hybrid only by using rules)  | --debug-mode=4
     --debug-file               | File | Output file for debugging rules                      | --debug-file=good.log
     --induction-dir            | Dir  | Specify the induction directory to use for loopback  | --induction=inducts
     --outfile-check-dir        | Dir  | Specify the outfile directory to monitor for plains  | --outfile-check-dir=x
     --logfile-disable          |      | Disable the logfile                                  |
     --hccapx-message-pair      | Num  | Load only message pairs from hccapx matching X       | --hccapx-message-pair=2
     --nonce-error-corrections  | Num  | The BF size range to replace AP's nonce last bytes   | --nonce-error-corrections=16
     --keyboard-layout-mapping  | File | Keyboard layout mapping table for special hash-modes | --keyb=german.hckmap
     --truecrypt-keyfiles       | File | Keyfiles to use, separated with commas               | --truecrypt-keyf=x.png
     --veracrypt-keyfiles       | File | Keyfiles to use, separated with commas               | --veracrypt-keyf=x.txt
     --veracrypt-pim-start      | Num  | VeraCrypt personal iterations multiplier start       | --veracrypt-pim-start=450
     --veracrypt-pim-stop       | Num  | VeraCrypt personal iterations multiplier stop        | --veracrypt-pim-stop=500
 -b, --benchmark                |      | Run benchmark of selected hash-modes                 |
     --benchmark-all            |      | Run benchmark of all hash-modes (requires -b)        |
     --speed-only               |      | Return expected speed of the attack, then quit       |
     --progress-only            |      | Return ideal progress step size and time to process  |
 -c, --segment-size             | Num  | Sets size in MB to cache from the wordfile to X      | -c 32
     --bitmap-min               | Num  | Sets minimum bits allowed for bitmaps to X           | --bitmap-min=24
     --bitmap-max               | Num  | Sets maximum bits allowed for bitmaps to X           | --bitmap-max=24
     --cpu-affinity             | Str  | Locks to CPU devices, separated with commas          | --cpu-affinity=1,2,3
     --hook-threads             | Num  | Sets number of threads for a hook (per compute unit) | --hook-threads=8
     --example-hashes           |      | Show an example hash for each hash-mode              |
     --backend-ignore-cuda      |      | Do not try to open CUDA interface on startup         |
     --backend-ignore-opencl    |      | Do not try to open OpenCL interface on startup       |
 -I, --backend-info             |      | Show info about detected backend API devices         | -I
 -d, --backend-devices          | Str  | Backend devices to use, separated with commas        | -d 1
 -D, --opencl-device-types      | Str  | OpenCL device-types to use, separated with commas    | -D 1
 -O, --optimized-kernel-enable  |      | Enable optimized kernels (limits password length)    |
 -w, --workload-profile         | Num  | Enable a specific workload profile, see pool below   | -w 3
 -n, --kernel-accel             | Num  | Manual workload tuning, set outerloop step size to X | -n 64
 -u, --kernel-loops             | Num  | Manual workload tuning, set innerloop step size to X | -u 256
 -T, --kernel-threads           | Num  | Manual workload tuning, set thread count to X        | -T 64
     --backend-vector-width     | Num  | Manually override backend vector-width to X          | --backend-vector=4
     --spin-damp                | Num  | Use CPU for device synchronization, in percent       | --spin-damp=10
     --hwmon-disable            |      | Disable temperature and fanspeed reads and triggers  |
     --hwmon-temp-abort         | Num  | Abort if temperature reaches X degrees Celsius       | --hwmon-temp-abort=100
     --scrypt-tmto              | Num  | Manually override TMTO value for scrypt to X         | --scrypt-tmto=3
 -s, --skip                     | Num  | Skip X words from the start                          | -s 1000000
 -l, --limit                    | Num  | Limit X words from the start + skipped words         | -l 1000000
     --keyspace                 |      | Show keyspace base:mod values and quit               |
 -j, --rule-left                | Rule | Single rule applied to each word from left wordlist  | -j 'c'
 -k, --rule-right               | Rule | Single rule applied to each word from right wordlist | -k '^-'
 -r, --rules-file               | File | Multiple rules applied to each word from wordlists   | -r rules/best64.rule
 -g, --generate-rules           | Num  | Generate X random rules                              | -g 10000
     --generate-rules-func-min  | Num  | Force min X functions per rule                       |
     --generate-rules-func-max  | Num  | Force max X functions per rule                       |
     --generate-rules-seed      | Num  | Force RNG seed set to X                              |
 -1, --custom-charset1          | CS   | User-defined charset ?1                              | -1 ?l?d?u
 -2, --custom-charset2          | CS   | User-defined charset ?2                              | -2 ?l?d?s
 -3, --custom-charset3          | CS   | User-defined charset ?3                              |
 -4, --custom-charset4          | CS   | User-defined charset ?4                              |
 -i, --increment                |      | Enable mask increment mode                           |
     --increment-min            | Num  | Start mask incrementing at X                         | --increment-min=4
     --increment-max            | Num  | Stop mask incrementing at X                          | --increment-max=8
 -S, --slow-candidates          |      | Enable slower (but advanced) candidate generators    |
     --brain-server             |      | Enable brain server                                  |
     --brain-server-timer       | Num  | Update the brain server dump each X seconds (min:60) | --brain-server-timer=300
 -z, --brain-client             |      | Enable brain client, activates -S                    |
     --brain-client-features    | Num  | Define brain client features, see below              | --brain-client-features=3
     --brain-host               | Str  | Brain server host (IP or domain)                     | --brain-host=127.0.0.1
     --brain-port               | Port | Brain server port                                    | --brain-port=13743
     --brain-password           | Str  | Brain server authentication password                 | --brain-password=bZfhCvGUSjRq
     --brain-session            | Hex  | Overrides automatically calculated brain session     | --brain-session=0x2ae611db
     --brain-session-whitelist  | Hex  | Allow given sessions only, separated with commas     | --brain-session-whitelist=0x2ae611db

- [ Hash modes ] -

      # | Name                                             | Category
  ======+==================================================+======================================
    900 | MD4                                              | Raw Hash
      0 | MD5                                              | Raw Hash
    100 | SHA1                                             | Raw Hash
   1300 | SHA2-224                                         | Raw Hash
   1400 | SHA2-256                                         | Raw Hash
  10800 | SHA2-384                                         | Raw Hash
   1700 | SHA2-512                                         | Raw Hash
  17300 | SHA3-224                                         | Raw Hash
  17400 | SHA3-256                                         | Raw Hash
  17500 | SHA3-384                                         | Raw Hash
  17600 | SHA3-512                                         | Raw Hash
   6000 | RIPEMD-160                                       | Raw Hash
    600 | BLAKE2b-512                                      | Raw Hash
  11700 | GOST R 34.11-2012 (Streebog) 256-bit, big-endian | Raw Hash
  11800 | GOST R 34.11-2012 (Streebog) 512-bit, big-endian | Raw Hash
   6900 | GOST R 34.11-94                                  | Raw Hash
   5100 | Half MD5                                         | Raw Hash
  18700 | Java Object hashCode()                           | Raw Hash
  17700 | Keccak-224                                       | Raw Hash
  17800 | Keccak-256                                       | Raw Hash
  17900 | Keccak-384                                       | Raw Hash
  18000 | Keccak-512                                       | Raw Hash
  21400 | sha256(sha256_bin($pass))                        | Raw Hash
   6100 | Whirlpool                                        | Raw Hash
  10100 | SipHash                                          | Raw Hash
  21000 | BitShares v0.x - sha512(sha512_bin(pass))        | Raw Hash
     10 | md5($pass.$salt)                                 | Raw Hash, Salted and/or Iterated
     20 | md5($salt.$pass)                                 | Raw Hash, Salted and/or Iterated
   3800 | md5($salt.$pass.$salt)                           | Raw Hash, Salted and/or Iterated
   3710 | md5($salt.md5($pass))                            | Raw Hash, Salted and/or Iterated
   4110 | md5($salt.md5($pass.$salt))                      | Raw Hash, Salted and/or Iterated
   4010 | md5($salt.md5($salt.$pass))                      | Raw Hash, Salted and/or Iterated
  21300 | md5($salt.sha1($salt.$pass))                     | Raw Hash, Salted and/or Iterated
     40 | md5($salt.utf16le($pass))                        | Raw Hash, Salted and/or Iterated
   2600 | md5(md5($pass))                                  | Raw Hash, Salted and/or Iterated
   3910 | md5(md5($pass).md5($salt))                       | Raw Hash, Salted and/or Iterated
   4400 | md5(sha1($pass))                                 | Raw Hash, Salted and/or Iterated
  20900 | md5(sha1($pass).md5($pass).sha1($pass))          | Raw Hash, Salted and/or Iterated
  21200 | md5(sha1($salt).md5($pass))                      | Raw Hash, Salted and/or Iterated
   4300 | md5(strtoupper(md5($pass)))                      | Raw Hash, Salted and/or Iterated
     30 | md5(utf16le($pass).$salt)                        | Raw Hash, Salted and/or Iterated
    110 | sha1($pass.$salt)                                | Raw Hash, Salted and/or Iterated
    120 | sha1($salt.$pass)                                | Raw Hash, Salted and/or Iterated
   4900 | sha1($salt.$pass.$salt)                          | Raw Hash, Salted and/or Iterated
   4520 | sha1($salt.sha1($pass))                          | Raw Hash, Salted and/or Iterated
    140 | sha1($salt.utf16le($pass))                       | Raw Hash, Salted and/or Iterated
  19300 | sha1($salt1.$pass.$salt2)                        | Raw Hash, Salted and/or Iterated
  14400 | sha1(CX)                                         | Raw Hash, Salted and/or Iterated
   4700 | sha1(md5($pass))                                 | Raw Hash, Salted and/or Iterated
   4710 | sha1(md5($pass).$salt)                           | Raw Hash, Salted and/or Iterated
  21100 | sha1(md5($pass.$salt))                           | Raw Hash, Salted and/or Iterated
  18500 | sha1(md5(md5($pass)))                            | Raw Hash, Salted and/or Iterated
   4500 | sha1(sha1($pass))                                | Raw Hash, Salted and/or Iterated
    130 | sha1(utf16le($pass).$salt)                       | Raw Hash, Salted and/or Iterated
   1410 | sha256($pass.$salt)                              | Raw Hash, Salted and/or Iterated
   1420 | sha256($salt.$pass)                              | Raw Hash, Salted and/or Iterated
  22300 | sha256($salt.$pass.$salt)                        | Raw Hash, Salted and/or Iterated
   1440 | sha256($salt.utf16le($pass))                     | Raw Hash, Salted and/or Iterated
  20800 | sha256(md5($pass))                               | Raw Hash, Salted and/or Iterated
  20710 | sha256(sha256($pass).$salt)                      | Raw Hash, Salted and/or Iterated
   1430 | sha256(utf16le($pass).$salt)                     | Raw Hash, Salted and/or Iterated
   1710 | sha512($pass.$salt)                              | Raw Hash, Salted and/or Iterated
   1720 | sha512($salt.$pass)                              | Raw Hash, Salted and/or Iterated
   1740 | sha512($salt.utf16le($pass))                     | Raw Hash, Salted and/or Iterated
   1730 | sha512(utf16le($pass).$salt)                     | Raw Hash, Salted and/or Iterated
  19500 | Ruby on Rails Restful-Authentication             | Raw Hash, Salted and/or Iterated
     50 | HMAC-MD5 (key = $pass)                           | Raw Hash, Authenticated
     60 | HMAC-MD5 (key = $salt)                           | Raw Hash, Authenticated
    150 | HMAC-SHA1 (key = $pass)                          | Raw Hash, Authenticated
    160 | HMAC-SHA1 (key = $salt)                          | Raw Hash, Authenticated
   1450 | HMAC-SHA256 (key = $pass)                        | Raw Hash, Authenticated
   1460 | HMAC-SHA256 (key = $salt)                        | Raw Hash, Authenticated
   1750 | HMAC-SHA512 (key = $pass)                        | Raw Hash, Authenticated
   1760 | HMAC-SHA512 (key = $salt)                        | Raw Hash, Authenticated
  11750 | HMAC-Streebog-256 (key = $pass), big-endian      | Raw Hash, Authenticated
  11760 | HMAC-Streebog-256 (key = $salt), big-endian      | Raw Hash, Authenticated
  11850 | HMAC-Streebog-512 (key = $pass), big-endian      | Raw Hash, Authenticated
  11860 | HMAC-Streebog-512 (key = $salt), big-endian      | Raw Hash, Authenticated
  11500 | CRC32                                            | Raw Checksum
  14100 | 3DES (PT = $salt, key = $pass)                   | Raw Cipher, Known-Plaintext attack
  14000 | DES (PT = $salt, key = $pass)                    | Raw Cipher, Known-Plaintext attack
  15400 | ChaCha20                                         | Raw Cipher, Known-Plaintext attack
  14900 | Skip32 (PT = $salt, key = $pass)                 | Raw Cipher, Known-Plaintext attack
  11900 | PBKDF2-HMAC-MD5                                  | Generic KDF
  12000 | PBKDF2-HMAC-SHA1                                 | Generic KDF
  10900 | PBKDF2-HMAC-SHA256                               | Generic KDF
  12100 | PBKDF2-HMAC-SHA512                               | Generic KDF
   8900 | scrypt                                           | Generic KDF
    400 | phpass                                           | Generic KDF
  16900 | Ansible Vault                                    | Generic KDF
  12001 | Atlassian (PBKDF2-HMAC-SHA1)                     | Generic KDF
  20200 | Python passlib pbkdf2-sha512                     | Generic KDF
  20300 | Python passlib pbkdf2-sha256                     | Generic KDF
  20400 | Python passlib pbkdf2-sha1                       | Generic KDF
  16100 | TACACS+                                          | Network Protocols
  11400 | SIP digest authentication (MD5)                  | Network Protocols
   5300 | IKE-PSK MD5                                      | Network Protocols
   5400 | IKE-PSK SHA1                                     | Network Protocols
   2500 | WPA-EAPOL-PBKDF2                                 | Network Protocols
   2501 | WPA-EAPOL-PMK                                    | Network Protocols
  22000 | WPA-PBKDF2-PMKID+EAPOL                           | Network Protocols
  22001 | WPA-PMK-PMKID+EAPOL                              | Network Protocols
  16800 | WPA-PMKID-PBKDF2                                 | Network Protocols
  16801 | WPA-PMKID-PMK                                    | Network Protocols
   7300 | IPMI2 RAKP HMAC-SHA1                             | Network Protocols
  10200 | CRAM-MD5                                         | Network Protocols
   4800 | iSCSI CHAP authentication, MD5(CHAP)             | Network Protocols
  16500 | JWT (JSON Web Token)                             | Network Protocols
  22600 | Telegram Desktop App Passcode (PBKDF2-HMAC-SHA1) | Network Protocols
  22301 | Telegram Mobile App Passcode (SHA256)            | Network Protocols
   7500 | Kerberos 5, etype 23, AS-REQ Pre-Auth            | Network Protocols
  13100 | Kerberos 5, etype 23, TGS-REP                    | Network Protocols
  18200 | Kerberos 5, etype 23, AS-REP                     | Network Protocols
  19600 | Kerberos 5, etype 17, TGS-REP                    | Network Protocols
  19700 | Kerberos 5, etype 18, TGS-REP                    | Network Protocols
  19800 | Kerberos 5, etype 17, Pre-Auth                   | Network Protocols
  19900 | Kerberos 5, etype 18, Pre-Auth                   | Network Protocols
   5500 | NetNTLMv1 / NetNTLMv1+ESS                        | Network Protocols
   5600 | NetNTLMv2                                        | Network Protocols
     23 | Skype                                            | Network Protocols
  11100 | PostgreSQL CRAM (MD5)                            | Network Protocols
  11200 | MySQL CRAM (SHA1)                                | Network Protocols
   8500 | RACF                                             | Operating System
   6300 | AIX {smd5}                                       | Operating System
   6700 | AIX {ssha1}                                      | Operating System
   6400 | AIX {ssha256}                                    | Operating System
   6500 | AIX {ssha512}                                    | Operating System
   3000 | LM                                               | Operating System
  19000 | QNX /etc/shadow (MD5)                            | Operating System
  19100 | QNX /etc/shadow (SHA256)                         | Operating System
  19200 | QNX /etc/shadow (SHA512)                         | Operating System
  15300 | DPAPI masterkey file v1                          | Operating System
  15900 | DPAPI masterkey file v2                          | Operating System
   7200 | GRUB 2                                           | Operating System
  12800 | MS-AzureSync PBKDF2-HMAC-SHA256                  | Operating System
  12400 | BSDi Crypt, Extended DES                         | Operating System
   1000 | NTLM                                             | Operating System
    122 | macOS v10.4, macOS v10.5, MacOS v10.6            | Operating System
   1722 | macOS v10.7                                      | Operating System
   7100 | macOS v10.8+ (PBKDF2-SHA512)                     | Operating System
   9900 | Radmin2                                          | Operating System
   5800 | Samsung Android Password/PIN                     | Operating System
   3200 | bcrypt $2*$, Blowfish (Unix)                     | Operating System
    500 | md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5)        | Operating System
   1500 | descrypt, DES (Unix), Traditional DES            | Operating System
   7400 | sha256crypt $5$, SHA256 (Unix)                   | Operating System
   1800 | sha512crypt $6$, SHA512 (Unix)                   | Operating System
  13800 | Windows Phone 8+ PIN/password                    | Operating System
   2410 | Cisco-ASA MD5                                    | Operating System
   9200 | Cisco-IOS $8$ (PBKDF2-SHA256)                    | Operating System
   9300 | Cisco-IOS $9$ (scrypt)                           | Operating System
   5700 | Cisco-IOS type 4 (SHA256)                        | Operating System
   2400 | Cisco-PIX MD5                                    | Operating System
   8100 | Citrix NetScaler (SHA1)                          | Operating System
  22200 | Citrix NetScaler (SHA512)                        | Operating System
   1100 | Domain Cached Credentials (DCC), MS Cache        | Operating System
   2100 | Domain Cached Credentials 2 (DCC2), MS Cache 2   | Operating System
   7000 | FortiGate (FortiOS)                              | Operating System
    125 | ArubaOS                                          | Operating System
    501 | Juniper IVE                                      | Operating System
     22 | Juniper NetScreen/SSG (ScreenOS)                 | Operating System
  15100 | Juniper/NetBSD sha1crypt                         | Operating System
    131 | MSSQL (2000)                                     | Database Server
    132 | MSSQL (2005)                                     | Database Server
   1731 | MSSQL (2012, 2014)                               | Database Server
     12 | PostgreSQL                                       | Database Server
   3100 | Oracle H: Type (Oracle 7+)                       | Database Server
    112 | Oracle S: Type (Oracle 11+)                      | Database Server
  12300 | Oracle T: Type (Oracle 12+)                      | Database Server
   7401 | MySQL $A$ (sha256crypt)                          | Database Server
    200 | MySQL323                                         | Database Server
    300 | MySQL4.1/MySQL5                                  | Database Server
   8000 | Sybase ASE                                       | Database Server
   1421 | hMailServer                                      | FTP, HTTP, SMTP, LDAP Server
   8300 | DNSSEC (NSEC3)                                   | FTP, HTTP, SMTP, LDAP Server
  16400 | CRAM-MD5 Dovecot                                 | FTP, HTTP, SMTP, LDAP Server
   1411 | SSHA-256(Base64), LDAP {SSHA256}                 | FTP, HTTP, SMTP, LDAP Server
   1711 | SSHA-512(Base64), LDAP {SSHA512}                 | FTP, HTTP, SMTP, LDAP Server
  10901 | RedHat 389-DS LDAP (PBKDF2-HMAC-SHA256)          | FTP, HTTP, SMTP, LDAP Server
  15000 | FileZilla Server >= 0.9.55                       | FTP, HTTP, SMTP, LDAP Server
  12600 | ColdFusion 10+                                   | FTP, HTTP, SMTP, LDAP Server
   1600 | Apache $apr1$ MD5, md5apr1, MD5 (APR)            | FTP, HTTP, SMTP, LDAP Server
    141 | Episerver 6.x < .NET 4                           | FTP, HTTP, SMTP, LDAP Server
   1441 | Episerver 6.x >= .NET 4                          | FTP, HTTP, SMTP, LDAP Server
    101 | nsldap, SHA-1(Base64), Netscape LDAP SHA         | FTP, HTTP, SMTP, LDAP Server
    111 | nsldaps, SSHA-1(Base64), Netscape LDAP SSHA      | FTP, HTTP, SMTP, LDAP Server
   7700 | SAP CODVN B (BCODE)                              | Enterprise Application Software (EAS)
   7701 | SAP CODVN B (BCODE) from RFC_READ_TABLE          | Enterprise Application Software (EAS)
   7800 | SAP CODVN F/G (PASSCODE)                         | Enterprise Application Software (EAS)
   7801 | SAP CODVN F/G (PASSCODE) from RFC_READ_TABLE     | Enterprise Application Software (EAS)
  10300 | SAP CODVN H (PWDSALTEDHASH) iSSHA-1              | Enterprise Application Software (EAS)
    133 | PeopleSoft                                       | Enterprise Application Software (EAS)
  13500 | PeopleSoft PS_TOKEN                              | Enterprise Application Software (EAS)
  21500 | SolarWinds Orion                                 | Enterprise Application Software (EAS)
   8600 | Lotus Notes/Domino 5                             | Enterprise Application Software (EAS)
   8700 | Lotus Notes/Domino 6                             | Enterprise Application Software (EAS)
   9100 | Lotus Notes/Domino 8                             | Enterprise Application Software (EAS)
  20600 | Oracle Transportation Management (SHA256)        | Enterprise Application Software (EAS)
   4711 | Huawei sha1(md5($pass).$salt)                    | Enterprise Application Software (EAS)
  20711 | AuthMe sha256                                    | Enterprise Application Software (EAS)
  12200 | eCryptfs                                         | Full-Disk Encryption (FDE)
  22400 | AES Crypt (SHA256)                               | Full-Disk Encryption (FDE)
  14600 | LUKS                                             | Full-Disk Encryption (FDE)
  13711 | VeraCrypt RIPEMD160 + XTS 512 bit                | Full-Disk Encryption (FDE)
  13712 | VeraCrypt RIPEMD160 + XTS 1024 bit               | Full-Disk Encryption (FDE)
  13713 | VeraCrypt RIPEMD160 + XTS 1536 bit               | Full-Disk Encryption (FDE)
  13741 | VeraCrypt RIPEMD160 + XTS 512 bit + boot-mode    | Full-Disk Encryption (FDE)
  13742 | VeraCrypt RIPEMD160 + XTS 1024 bit + boot-mode   | Full-Disk Encryption (FDE)
  13743 | VeraCrypt RIPEMD160 + XTS 1536 bit + boot-mode   | Full-Disk Encryption (FDE)
  13751 | VeraCrypt SHA256 + XTS 512 bit                   | Full-Disk Encryption (FDE)
  13752 | VeraCrypt SHA256 + XTS 1024 bit                  | Full-Disk Encryption (FDE)
  13753 | VeraCrypt SHA256 + XTS 1536 bit                  | Full-Disk Encryption (FDE)
  13761 | VeraCrypt SHA256 + XTS 512 bit + boot-mode       | Full-Disk Encryption (FDE)
  13762 | VeraCrypt SHA256 + XTS 1024 bit + boot-mode      | Full-Disk Encryption (FDE)
  13763 | VeraCrypt SHA256 + XTS 1536 bit + boot-mode      | Full-Disk Encryption (FDE)
  13721 | VeraCrypt SHA512 + XTS 512 bit                   | Full-Disk Encryption (FDE)
  13722 | VeraCrypt SHA512 + XTS 1024 bit                  | Full-Disk Encryption (FDE)
  13723 | VeraCrypt SHA512 + XTS 1536 bit                  | Full-Disk Encryption (FDE)
  13771 | VeraCrypt Streebog-512 + XTS 512 bit             | Full-Disk Encryption (FDE)
  13772 | VeraCrypt Streebog-512 + XTS 1024 bit            | Full-Disk Encryption (FDE)
  13773 | VeraCrypt Streebog-512 + XTS 1536 bit            | Full-Disk Encryption (FDE)
  13731 | VeraCrypt Whirlpool + XTS 512 bit                | Full-Disk Encryption (FDE)
  13732 | VeraCrypt Whirlpool + XTS 1024 bit               | Full-Disk Encryption (FDE)
  13733 | VeraCrypt Whirlpool + XTS 1536 bit               | Full-Disk Encryption (FDE)
  16700 | FileVault 2                                      | Full-Disk Encryption (FDE)
  20011 | DiskCryptor SHA512 + XTS 512 bit                 | Full-Disk Encryption (FDE)
  20012 | DiskCryptor SHA512 + XTS 1024 bit                | Full-Disk Encryption (FDE)
  20013 | DiskCryptor SHA512 + XTS 1536 bit                | Full-Disk Encryption (FDE)
  22100 | BitLocker                                        | Full-Disk Encryption (FDE)
  12900 | Android FDE (Samsung DEK)                        | Full-Disk Encryption (FDE)
   8800 | Android FDE <= 4.3                               | Full-Disk Encryption (FDE)
  18300 | Apple File System (APFS)                         | Full-Disk Encryption (FDE)
   6211 | TrueCrypt RIPEMD160 + XTS 512 bit                | Full-Disk Encryption (FDE)
   6212 | TrueCrypt RIPEMD160 + XTS 1024 bit               | Full-Disk Encryption (FDE)
   6213 | TrueCrypt RIPEMD160 + XTS 1536 bit               | Full-Disk Encryption (FDE)
   6241 | TrueCrypt RIPEMD160 + XTS 512 bit + boot-mode    | Full-Disk Encryption (FDE)
   6242 | TrueCrypt RIPEMD160 + XTS 1024 bit + boot-mode   | Full-Disk Encryption (FDE)
   6243 | TrueCrypt RIPEMD160 + XTS 1536 bit + boot-mode   | Full-Disk Encryption (FDE)
   6221 | TrueCrypt SHA512 + XTS 512 bit                   | Full-Disk Encryption (FDE)
   6222 | TrueCrypt SHA512 + XTS 1024 bit                  | Full-Disk Encryption (FDE)
   6223 | TrueCrypt SHA512 + XTS 1536 bit                  | Full-Disk Encryption (FDE)
   6231 | TrueCrypt Whirlpool + XTS 512 bit                | Full-Disk Encryption (FDE)
   6232 | TrueCrypt Whirlpool + XTS 1024 bit               | Full-Disk Encryption (FDE)
   6233 | TrueCrypt Whirlpool + XTS 1536 bit               | Full-Disk Encryption (FDE)
  10400 | PDF 1.1 - 1.3 (Acrobat 2 - 4)                    | Documents
  10410 | PDF 1.1 - 1.3 (Acrobat 2 - 4), collider #1       | Documents
  10420 | PDF 1.1 - 1.3 (Acrobat 2 - 4), collider #2       | Documents
  10500 | PDF 1.4 - 1.6 (Acrobat 5 - 8)                    | Documents
  10600 | PDF 1.7 Level 3 (Acrobat 9)                      | Documents
  10700 | PDF 1.7 Level 8 (Acrobat 10 - 11)                | Documents
   9400 | MS Office 2007                                   | Documents
   9500 | MS Office 2010                                   | Documents
   9600 | MS Office 2013                                   | Documents
   9700 | MS Office <= 2003 $0/$1, MD5 + RC4               | Documents
   9710 | MS Office <= 2003 $0/$1, MD5 + RC4, collider #1  | Documents
   9720 | MS Office <= 2003 $0/$1, MD5 + RC4, collider #2  | Documents
   9800 | MS Office <= 2003 $3/$4, SHA1 + RC4              | Documents
   9810 | MS Office <= 2003 $3, SHA1 + RC4, collider #1    | Documents
   9820 | MS Office <= 2003 $3, SHA1 + RC4, collider #2    | Documents
  18400 | Open Document Format (ODF) 1.2 (SHA-256, AES)    | Documents
  18600 | Open Document Format (ODF) 1.1 (SHA-1, Blowfish) | Documents
  16200 | Apple Secure Notes                               | Documents
  15500 | JKS Java Key Store Private Keys (SHA1)           | Password Managers
   6600 | 1Password, agilekeychain                         | Password Managers
   8200 | 1Password, cloudkeychain                         | Password Managers
   9000 | Password Safe v2                                 | Password Managers
   5200 | Password Safe v3                                 | Password Managers
   6800 | LastPass + LastPass sniffed                      | Password Managers
  13400 | KeePass 1 (AES/Twofish) and KeePass 2 (AES)      | Password Managers
  11300 | Bitcoin/Litecoin wallet.dat                      | Password Managers
  16600 | Electrum Wallet (Salt-Type 1-3)                  | Password Managers
  21700 | Electrum Wallet (Salt-Type 4)                    | Password Managers
  21800 | Electrum Wallet (Salt-Type 5)                    | Password Managers
  12700 | Blockchain, My Wallet                            | Password Managers
  15200 | Blockchain, My Wallet, V2                        | Password Managers
  18800 | Blockchain, My Wallet, Second Password (SHA256)  | Password Managers
  16300 | Ethereum Pre-Sale Wallet, PBKDF2-HMAC-SHA256     | Password Managers
  15600 | Ethereum Wallet, PBKDF2-HMAC-SHA256              | Password Managers
  15700 | Ethereum Wallet, SCRYPT                          | Password Managers
  22500 | MultiBit Classic .key (MD5)                      | Password Managers
  22700 | MultiBit HD (scrypt)                             | Password Managers
  11600 | 7-Zip                                            | Archives
  12500 | RAR3-hp                                          | Archives
  13000 | RAR5                                             | Archives
  17200 | PKZIP (Compressed)                               | Archives
  17220 | PKZIP (Compressed Multi-File)                    | Archives
  17225 | PKZIP (Mixed Multi-File)                         | Archives
  17230 | PKZIP (Mixed Multi-File Checksum-Only)           | Archives
  17210 | PKZIP (Uncompressed)                             | Archives
  20500 | PKZIP Master Key                                 | Archives
  20510 | PKZIP Master Key (6 byte optimization)           | Archives
  14700 | iTunes backup < 10.0                             | Archives
  14800 | iTunes backup >= 10.0                            | Archives
  23001 | SecureZIP AES-128                                | Archives
  23002 | SecureZIP AES-192                                | Archives
  23003 | SecureZIP AES-256                                | Archives
  13600 | WinZip                                           | Archives
  18900 | Android Backup                                   | Archives
  13200 | AxCrypt                                          | Archives
  13300 | AxCrypt in-memory SHA1                           | Archives
   8400 | WBB3 (Woltlab Burning Board)                     | Forums, CMS, E-Commerce
   2611 | vBulletin < v3.8.5                               | Forums, CMS, E-Commerce
   2711 | vBulletin >= v3.8.5                              | Forums, CMS, E-Commerce
   2612 | PHPS                                             | Forums, CMS, E-Commerce
    121 | SMF (Simple Machines Forum) > v1.1               | Forums, CMS, E-Commerce
   3711 | MediaWiki B type                                 | Forums, CMS, E-Commerce
   4521 | Redmine                                          | Forums, CMS, E-Commerce
     11 | Joomla < 2.5.18                                  | Forums, CMS, E-Commerce
  13900 | OpenCart                                         | Forums, CMS, E-Commerce
  11000 | PrestaShop                                       | Forums, CMS, E-Commerce
  16000 | Tripcode                                         | Forums, CMS, E-Commerce
   7900 | Drupal7                                          | Forums, CMS, E-Commerce
     21 | osCommerce, xt:Commerce                          | Forums, CMS, E-Commerce
   4522 | PunBB                                            | Forums, CMS, E-Commerce
   2811 | MyBB 1.2+, IPB2+ (Invision Power Board)          | Forums, CMS, E-Commerce
  18100 | TOTP (HMAC-SHA1)                                 | One-Time Passwords
   2000 | STDOUT                                           | Plaintext
  99999 | Plaintext                                        | Plaintext
  21600 | Web2py pbkdf2-sha512                             | Framework
  10000 | Django (PBKDF2-SHA256)                           | Framework
    124 | Django (SHA-1)                                   | Framework

- [ Brain Client Features ] -

  # | Features
 ===+========
  1 | Send hashed passwords
  2 | Send attack positions
  3 | Send hashed passwords and attack positions

- [ Outfile Formats ] -

  # | Format
 ===+========
  1 | hash[:salt]
  2 | plain
  3 | hex_plain
  4 | crack_pos
  5 | timestamp absolute
  6 | timestamp relative

- [ Rule Debugging Modes ] -

  # | Format
 ===+========
  1 | Finding-Rule
  2 | Original-Word
  3 | Original-Word:Finding-Rule
  4 | Original-Word:Finding-Rule:Processed-Word

- [ Attack Modes ] -

  # | Mode
 ===+======
  0 | Straight
  1 | Combination
  3 | Brute-force
  6 | Hybrid Wordlist + Mask
  7 | Hybrid Mask + Wordlist

- [ Built-in Charsets ] -

  ? | Charset
 ===+=========
  l | abcdefghijklmnopqrstuvwxyz
  u | ABCDEFGHIJKLMNOPQRSTUVWXYZ
  d | 0123456789
  h | 0123456789abcdef
  H | 0123456789ABCDEF
  s |  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  a | ?l?u?d?s
  b | 0x00 - 0xff

- [ OpenCL Device Types ] -

  # | Device Type
 ===+=============
  1 | CPU
  2 | GPU
  3 | FPGA, DSP, Co-Processor

- [ Workload Profiles ] -

  # | Performance | Runtime | Power Consumption | Desktop Impact
 ===+=============+=========+===================+=================
  1 | Low         |   2 ms  | Low               | Minimal
  2 | Default     |  12 ms  | Economic          | Noticeable
  3 | High        |  96 ms  | High              | Unresponsive
  4 | Nightmare   | 480 ms  | Insane            | Headless

- [ Basic Examples ] -

  Attack-          | Hash- |
  Mode             | Type  | Example command
 ==================+=======+==================================================================
  Wordlist         | $P$   | hashcat -a 0 -m 400 example400.hash example.dict
  Wordlist + Rules | MD5   | hashcat -a 0 -m 0 example0.hash example.dict -r rules/best64.rule
  Brute-Force      | MD5   | hashcat -a 3 -m 0 example0.hash ?a?a?a?a?a?a
  Combinator       | MD5   | hashcat -a 1 -m 0 example0.hash example.dict example.dict

If you still have no idea what just happened, try the following pages:

- https://hashcat.net/wiki/#howtos_videos_papers_articles_etc_in_the_wild
- https://hashcat.net/faq/
```

### Rules

Please check [hash-cracker - rules](https://github.com/crypt0rr/hash-cracker/tree/master/scripts/rules)

## Examples

### Start hashcat with session

```plain
hashcat -m <hash-number> --session=<NAME>
```

Restore the session

```plain
hashcat --session <NAME> --restore
```

### Dictionary

```plain
hashcat -m <hash-number> <fileWithHash> <wordlist>
```

### Dictionary + rules

```plain
hashcat -m <hash-number> <fileWithHash> <wordlist> -r <rulefile>.rule
```

### Mask

```plain
hashcat -m <hash-number> <fileWithHash> -a3 'Welkom?1?1?1' --increment -1 '?l?d?u'
```

### Specific word and brute force combined

```plain
hashcat --bitmap-max=24 -m0 md5s -a6 <file-containing-word> '?1?1?1?1?1?1?1?1?1' -1 '?l?u'
```

```plain
hashcat --bitmap-max=24 -m0 md5s -a7 '?1?1?1?1?1?1?1?1?1' -1 '?l?u' <file-containing-word>
```

### Show username, hash and password

```plain
hashcat -m <hash-number> <fileWithHash> --username --show
```

### Filter password reuse

```plain
sort <file-with-passwords>.txt | uniq -c | sort -rn | head -n10
```

### Match users versus cracked hashes, for example domain admins

```plain
grep -wif <domain-admins>.txt <username-hash-password>.txt
```

### Kerberoast hashes John to hashcat

```plain
sed 's/\$krb5tgs\$\(.*\):\(.*\)/\$krb5tgs\$23\$\*\1\*\$\2/' <file-with-hashes>
```

### HEX to readable

Content of $HEX[517765a737383972]

```plain
$ echo 517765a737383972 | xxd -ps -r | iconv -f cp1252 -t utf8
Qwe§789r
```

For a list of HEX to readable use [this script](https://github.com/crypt0rr/hex-to-readable)

### Keepass database to hashcat format

You need to use -m13400 and --username for hashcat

```plain
$ ./keepass2john keepass_database.kdbx > keepassdb.hash

$ cat keepassdb.hash
keepassdb:$keepass$*2*6000*0*2fff26de592b5a4b46b7d34f189c203c2b7af9ad9fb67ccc4a7cfa610bdc8b12*d999503fcf704ff552[...]392dbb91a7cc*595dc8b80fd152d8dd1d5da9c6b0a91f*226abde9df48c4c9ae84caa8e91d29a41ffea7ae828b87e3c12efc6fddfde567*062a5db59aafdeee2e1fcc4cd93dc4d6723cb143cefa36f6eee548d2d14e07e7
```

### Calculate your own NTLM hash

Please see [NThasher]({{< ref "nthasher" >}})

### Creating rules from found clears / cracked hashes

[PACK - Password Analysis and Cracking Kit]({{< ref "pack" >}})

### Create custom wordlist

To create a custom wordlist from a input-wordlist combined with rule(s).

```plain
hashcat --force words-input -r scripts/rules/10krules.rule  --stdout > customwordlist
```

Also, this can be used for other attack methods. For example creating a list with 3 numbers is done as shown below.

```plain
$ hashcat -a3 '?d?d?d' --stdout -o output.txt

$ head output.txt                            
123
023
223
323
923
423
523
823
723
623
```

### Wordlists

- [Github.com - FlameOfIgnis Pwdb-Public](https://github.com/FlameOfIgnis/Pwdb-Public.git)
- [Github.com - DanielMiessler - Seclists](https://github.com/danielmiessler/SecLists.git)
- [Weakpass.com](https://weakpass.com/)
- [Hashes.org](https://hashes.org/)
- [Github.com - Wikiraider](https://github.com/NorthwaveSecurity/wikiraider)
- [En.wikipedia.org - RockYou](https://en.wikipedia.org/wiki/RockYou#Data_breach)

## URL List

- [Hashcat.net](https://hashcat.net/hashcat/)
- [Hashcat.net Example Hashlist](https://hashcat.net/wiki/doku.php?id=example_hashes)
- [GitHub.com - hashcat](https://github.com/hashcat/hashcat)
- [Github.com - hash-cracker](https://github.com/crypt0rr/hash-cracker)
- [Hashmob.net Community](https://hashmob.net/)
- [Hashmob.net - CTF writeups](https://hashmob.net/writeups/)
- [i-disclose.net - Search though the billions of email address, hashes & find passwords using the public API](https://i-disclose.net/main/login/)
- [Sensepost.com - Cracking efficiency measurements common substring attack](https://sensepost.com/blog/2018/cracking-efficiency-measurements-common-substring-attack/)
- [Asecuritysite.com - NTLM calculator](https://asecuritysite.com/encryption/lmhash)
- [Browserling.com - NTLM calculator](https://www.browserling.com/tools/ntlm-hash)
- [Weakpasswords.net](http://www.weakpasswords.net/)
- [Haveibeenpwned password collections NTLM](https://haveibeenpwned.com/Passwords)
