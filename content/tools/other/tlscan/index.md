---
title : "TLScan"
# pre : ' '
description : "Scanner to enumerate SSL/TLS encryption protocol support."
date : 2020-03-23T16:50:07+01:00
# hidden : true
# draft : true
weight : 1920
tags : ['Other', 'SSL/TLS', 'Certificates', 'FTP', 'RDP', 'SMTP']
---

---

Scanner to enumerate SSL/TLS encryption protocol support.

## Installation

```plain
pip install tlscan
```

```plain
pipx install tlscan
```

## Usage

```plain
python3 TLScan3.py [OPTIONS] target
```

## Flags

```plain
usage: TLScan3 [-h] [--version]
               [--smtp | --pop | --imap | --mssql | --ftp | --rdp] [--sni SNI]
               target

Scanner to enumerate encryption protocol support

positional arguments:
  target      specify target as: host:port e.g. www.example.com:443 or
              [::1]:443 for IPv6

optional arguments:
  -h, --help  show this help message and exit
  --version   show program's version number and exit
  --smtp      Use SMTP as protocol layer
  --pop       Use POP as protocol layer
  --imap      Use IMAP as protocol layer
  --mssql     Use MSSQL as protocol layer
  --ftp       Use FTP as protocol layer
  --rdp       Use RDP as protocol layer
  --sni SNI   SNI name to use in the handshake
```

## Examples

### Scan SSL/TLS, CipherSuites and certificate

```plain
python3 TLScan3.py offsec.nl:443

Starting enumeration at: 23-03-2020 16:52:56
  [*] Using SNI: 'offsec.nl'
Enumerating TLS/SSL protocol version support for: offsec.nl port 443
  [+] TLSv1_3
  [+] TLSv1_2
      Compression: null
  [+] TLS_FALLBACK_SCSV supported (received Alert).
Enumerating supported ciphers for: TLSv1_3
  [+] TLS_AES_256_GCM_SHA384 (256 bits)
  [+] TLS_CHACHA20_POLY1305_SHA256 (256 bits)
  [+] TLS_AES_128_GCM_SHA256 (128 bits)
Enumerating supported ciphers for: TLSv1_2
  [+] TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 (256 bits) - ECDH ecdh_x25519
  [+] TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (256 bits) - ECDH ecdh_x25519
Subject certificate details
  Signature Algorithm: sha256WithRSAEncryption
    Subject: CN=offsec.nl
    Validity
        Not before: 2020-02-03 18:18:00
        Not after : 2020-05-03 18:18:00
    Issuer: C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X3
    Subject Public Key Info:
        Public Key Algorithm: rsaEncryption
            Public-Key: 2048 bit
```

### Scan target using specific SNI name

```plain
python3 TLScan3.py 10.10.10.10 --sni example.com

Starting enumeration at: 23-03-2020 16:52:56
  [*] Using SNI: 'example.com'
```

## URL List

- [GitHub.com - TLScan](https://github.com/ThreatLabsNL/TLScan)
- [Ciphersuite.info](https://ciphersuite.info/)
