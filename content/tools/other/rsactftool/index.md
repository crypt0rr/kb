---
title : "RsaCtfTool"
# pre : ' '
description : "RSA multi attacks tool : uncipher data from weak public key and try to recover private key Automatic selection of best attack for the given public key."
date : 2020-04-28T12:50:20+02:00
# hidden : true
# draft : true
weight : 1520
# tags : ['']
---

---

RSA multi attacks tool : uncipher data from weak public key and try to recover private key Automatic selection of best attack for the given public key.

## Installation

```plain
git clone https://github.com/Ganapati/RsaCtfTool.git
sudo apt-get install libgmp3-dev libmpc-dev
python3 -m pip install -r "requirements.txt"
python3 RsaCtfTool.py
```

## Usage

```plain
usage: RsaCtfTool.py [-h] [--publickey PUBLICKEY] [--timeout TIMEOUT]
                     [--createpub] [--dumpkey] [--ext]
                     [--uncipherfile UNCIPHERFILE] [--uncipher UNCIPHER]
                     [--verbosity {CRITICAL,ERROR,WARNING,DEBUG,INFO}]
                     [--private] [--ecmdigits ECMDIGITS] [-n N] [-p P] [-q Q]
                     [-e E] [--key KEY]
                     [--attack {mersenne_primes,pollard_p_1,smallfraction,smallq,boneh_durfee,noveltyprimes,ecm,factordb,wiener,siqs,pastctfprimes,partial_q,comfact_cn,hastads,fermat,nullattack,primefac,commonfactors,same_n_huge_e,all}]
```

```plain
Mode 1 : Attack RSA (specify --publickey or n and e)

- publickey : public rsa key to crack. You can import multiple public keys with wildcards.
- uncipher : cipher message to decrypt
- private : display private rsa key if recovered

Mode 2 : Create a Public Key File Given n and e (specify --createpub)

- n : modulus
- e : public exponent

Mode 3 : Dump the public and/or private numbers (optionally including CRT parameters in extended mode) from a PEM/DER format public or private key (specify --dumpkey)

- key : the public or private key in PEM or DER format
```

## Examples

### Uncipher file

```plain
./RsaCtfTool.py --publickey ./key.pub --uncipherfile ./ciphered\_file
```

### Print private key

```plain
./RsaCtfTool.py --publickey ./key.pub --private
```

### Attempt to break multiple public keys with common factor attacks or individually- use quotes around wildcards to stop bash expansion

```plain
./RsaCtfTool.py --publickey "*.pub" --private
```

### Generate a public key

```plain
./RsaCtfTool.py --createpub -n 7828374823761928712873129873981723...12837182 -e 65537
```

### Dump the parameters from a key

```plain
./RsaCtfTool.py --dumpkey --key ./key.pub
```

### Factor with ECM when you know the approximate length in digits of a prime

```plain
./RsaCtfTool.py --publickey key.pub --ecmdigits 25 --verbose --private`
```

## URL List

- [Github.com - RSACtfTool](https://github.com/Ganapati/RsaCtfTool)
