---
title : "osslsigncode"
# pre : ' '
description : "OpenSSL based Authenticode signing for PE/MSI/Java CAB files."
date : 2022-07-22T20:31:36+02:00
# hidden : true
# draft : true
weight : 1280
tags : ['Other', 'Certificates']
---

---

osslsigncode is a small tool that implements part of the functionality of the Microsoft tool signtool.exe - more exactly the Authenticode signing and timestamping. But osslsigncode is based on OpenSSL and cURL, and thus should be able to compile on most platforms where these exist.

## Installation

### Linux

Check [github.com](https://github.com/mtrojnar/osslsigncode) for installation instructions.

### macOS

```plain
brew install osslsigncode
```

## Usage

```plain
osslsigncode [OPTIONS]
```

## Flags

```plain
Commands:
add                    = add an unauthenticated blob or a timestamp to a previously-signed file
attach-signature       = sign file using a given signature
extract-signature      = extract signature from a previously-signed file
remove-signature       = remove sections of the embedded signature on a file
sign                   = digitally sign a file
verify                 = verifies the digital signature of a file

For help on a specific command, enter osslsigncode <command> --help

Usage: 

 [ --version | -v ]
 [ --help ]

 [ sign ] ( -certs | -spc <certfile> -key <keyfile> | -pkcs12 <pkcs12file> |
              [ -pkcs11engine <engine> ] -pkcs11module <module> -pkcs11cert <pkcs11 cert id> |
              -certs <certfile> -key <pkcs11 key id>)
            [ -pass <password>  [ -askpass ] [ -readpass <file> ]
            [ -ac <crosscertfile> ]
            [ -h {md5,sha1,sha2(56),sha384,sha512} ]
            [ -n <desc> ] [ -i <url> ] [ -jp <level> ] [ -comm ]
            [ -ph ]
            [ -t <timestampurl> [ -t ... ] [ -p <proxy> ] [ -noverifypeer  ]
            [ -ts <timestampurl> [ -ts ... ] [ -p <proxy> ] [ -noverifypeer ] ]
            [ -st <unix-time> ]
            [ -addUnauthenticatedBlob ]
            [ -nest ]
            [ -verbose ]
            [ -add-msi-dse ]
            [ -in ] <infile> [-out ] <outfile>

 add [-addUnauthenticatedBlob]
            [ -t <timestampurl> [ -t ... ] [ -p <proxy> ] [ -noverifypeer  ]
            [ -ts <timestampurl> [ -ts ... ] [ -p <proxy> ] [ -noverifypeer ] ]
            [ -verbose ]
            [ -add-msi-dse ]
            [ -in ] <infile> [ -out ] <outfile>

 attach-signature [ -sigin ] <sigfile>
            [ -CAfile <infile> ]
            [ -CRLfile <infile> ]
            [ -TSA-CAfile <infile> ]
            [ -TSA-CRLfile <infile> ]
            [ -nest ]
            [ -add-msi-dse ]
            [ -in ] <infile> [ -out ] <outfile>

 extract-signature [ -pem ]
            [ -in ] <infile> [ -out ] <sigfile>

 remove-signature [ -in ] <infile> [ -out ] <outfile>

 verify [ -in ] <infile>
            [ -c | -catalog <infile> ]
            [ -CAfile <infile> ]
            [ -CRLfile <infile> ]
            [ -TSA-CAfile <infile> ]
            [ -TSA-CRLfile <infile> ]
            [ -require-leaf-hash {md5,sha1,sha2(56),sha384,sha512}:XXXXXXXXXXXX... ]
            [ -timestamp-expiration ]
            [ -verbose ]
```

## Examples

```plain
osslsigncode verify PsExec64.exe 
Current PE checksum   : 0008B793
Calculated PE checksum: 0008B793

Signature Index: 0  (Primary Signature)
Message digest algorithm  : SHA256
Current message digest    : BD7E69C22664A04B7B0E4C6A7B154E6E01C6CE9599B694BC19179AC7E2B77EE3
Calculated message digest : BD7E69C22664A04B7B0E4C6A7B154E6E01C6CE9599B694BC19179AC7E2B77EE3

Signer's certificate:
        Signer #0:
                Subject: /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Corporation
                Issuer : /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Code Signing PCA 2011
                Serial : 33000002528B33AAF895F339DB000000000252
                Certificate expiration date:
                        notBefore : Sep  2 18:32:59 2021 GMT
                        notAfter : Sep  1 18:32:59 2022 GMT

Number of certificates: 2
        Signer #0:
                Subject: /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Corporation
                Issuer : /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Code Signing PCA 2011
                Serial : 33000002528B33AAF895F339DB000000000252
                Certificate expiration date:
                        notBefore : Sep  2 18:32:59 2021 GMT
                        notAfter : Sep  1 18:32:59 2022 GMT
        ------------------
        Signer #1:
                Subject: /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Code Signing PCA 2011
                Issuer : /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Root Certificate Authority 2011
                Serial : 610E90D2000000000003
                Certificate expiration date:
                        notBefore : Jul  8 20:59:09 2011 GMT
                        notAfter : Jul  8 21:09:09 2026 GMT

Authenticated attributes:
        Message digest algorithm: SHA256
        Message digest: 75704792B1FA7A2BB1AA671436E1C8139CA9F8BAB822E666E1EBBB014847B7CE
        Signing time: N/A
        Microsoft Individual Code Signing purpose
        URL description: https://www.sysinternals.com
        Text description: psexec

The signature is timestamped: Jul 19 14:50:05 2022 GMT
Hash Algorithm: sha256
Timestamp Verified by:
                Issuer : /C=US/ST=Washington/L=Redmond/O=Microsoft Corporation/CN=Microsoft Time-Stamp PCA 2010
                Serial : 330000018A3E388DD20E02FAE800010000018A

CAfile: /etc/ssl/cert.pem
TSA's certificates file: /etc/ssl/cert.pem
CRL distribution point: http://www.microsoft.com/pkiops/crl/MicCodSigPCA2011_2011-07-08.crl
```

## URL List

- [Github.com - osslsigncode](https://github.com/mtrojnar/osslsigncode)
