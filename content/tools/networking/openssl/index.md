---
title : "OpenSSL"
# pre : ' '
description : "OpenSSL."
date : 2022-05-05T14:11:10+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## OpenSSL

The OpenSSL Project develops and maintains the OpenSSL software - a robust, commercial-grade, full-featured toolkit for general-purpose cryptography and secure communication. The project's technical decision making is managed by the [OpenSSL Technical Committee](https://www.openssl.org/community/otc.html) (OTC) and the project governance is managed by the [OpenSSL Management Committee](https://www.openssl.org/community/omc.html) (OMC). The project operates under formal [Bylaws](https://www.openssl.org/policies/omc-bylaws.html).

### Usage

```plain
openssl [options]
```

### Flags

```plain
Standard commands
asn1parse         ca                certhash          ciphers           
crl               crl2pkcs7         dgst              dh                
dhparam           dsa               dsaparam          ec                
ecparam           enc               errstr            gendh             
gendsa            genpkey           genrsa            nseq              
ocsp              passwd            pkcs12            pkcs7             
pkcs8             pkey              pkeyparam         pkeyutl           
prime             rand              req               rsa               
rsautl            s_client          s_server          s_time            
sess_id           smime             speed             spkac             
ts                verify            version           x509              

Message Digest commands (see the `dgst' command for more details)
gost-mac          md4               md5               md_gost94         
ripemd160         sha1              sha224            sha256            
sha384            sha512            streebog256       streebog512       
whirlpool         

Cipher commands (see the `enc' command for more details)
aes-128-cbc       aes-128-ecb       aes-192-cbc       aes-192-ecb       
aes-256-cbc       aes-256-ecb       base64            bf                
bf-cbc            bf-cfb            bf-ecb            bf-ofb            
camellia-128-cbc  camellia-128-ecb  camellia-192-cbc  camellia-192-ecb  
camellia-256-cbc  camellia-256-ecb  cast              cast-cbc          
cast5-cbc         cast5-cfb         cast5-ecb         cast5-ofb         
chacha            des               des-cbc           des-cfb           
des-ecb           des-ede           des-ede-cbc       des-ede-cfb       
des-ede-ofb       des-ede3          des-ede3-cbc      des-ede3-cfb      
des-ede3-ofb      des-ofb           des3              desx              
rc2               rc2-40-cbc        rc2-64-cbc        rc2-cbc           
rc2-cfb           rc2-ecb           rc2-ofb           rc4               
rc4-40            
```

### Examples

Create hash(es) from input, for example SHA256.

```plain
echo -n "foobar" | openssl dgst -sha256
```

### URL list

* [OpenSSL.org](https://www.openssl.org/)
