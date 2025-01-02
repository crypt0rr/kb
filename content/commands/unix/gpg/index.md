---
title : "gpg"
# pre : '<i class="fas fa-code"></i> '
description : "OpenPGP encryption and signing tool - Sign, check, encrypt or decrypt."
date : 2020-08-19T12:10:48+02:00
# hidden : true
# draft : true
weight : 320
# tags : ['']
---

---

OpenPGP encryption and signing tool - Sign, check, encrypt or decrypt.

## Usage

```plain
gpg [options] [files]
```

## Flags

```plain
gpg (GnuPG) 2.2.19
libgcrypt 1.8.5
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2

Syntax: gpg [options] [files]
Sign, check, encrypt or decrypt
Default operation depends on the input data

Commands:
 -s, --sign                  make a signature
     --clear-sign            make a clear text signature
 -b, --detach-sign           make a detached signature
 -e, --encrypt               encrypt data
 -c, --symmetric             encryption only with symmetric cipher
 -d, --decrypt               decrypt data (default)
     --verify                verify a signature
 -k, --list-keys             list keys
     --list-signatures       list keys and signatures
     --check-signatures      list and check key signatures
     --fingerprint           list keys and fingerprints
 -K, --list-secret-keys      list secret keys
     --generate-key          generate a new key pair
     --quick-generate-key    quickly generate a new key pair
     --quick-add-uid         quickly add a new user-id
     --quick-revoke-uid      quickly revoke a user-id
     --quick-set-expire      quickly set a new expiration date
     --full-generate-key     full featured key pair generation
     --generate-revocation   generate a revocation certificate
     --delete-keys           remove keys from the public keyring
     --delete-secret-keys    remove keys from the secret keyring
     --quick-sign-key        quickly sign a key
     --quick-lsign-key       quickly sign a key locally
     --sign-key              sign a key
     --lsign-key             sign a key locally
     --edit-key              sign or edit a key
     --change-passphrase     change a passphrase
     --export                export keys
     --send-keys             export keys to a keyserver
     --receive-keys          import keys from a keyserver
     --search-keys           search for keys on a keyserver
     --refresh-keys          update all keys from a keyserver
     --import                import/merge keys
     --card-status           print the card status
     --edit-card             change data on a card
     --change-pin            change a card's PIN
     --update-trustdb        update the trust database
     --print-md              print message digests
     --server                run in server mode
     --tofu-policy VALUE     set the TOFU policy for a key

Options:
 -a, --armor                 create ascii armored output
 -r, --recipient USER-ID     encrypt for USER-ID
 -u, --local-user USER-ID    use USER-ID to sign or decrypt
 -z N                        set compress level to N (0 disables)
     --textmode              use canonical text mode
 -o, --output FILE           write output to FILE
 -v, --verbose               verbose
 -n, --dry-run               do not make any changes
 -i, --interactive           prompt before overwriting
     --openpgp               use strict OpenPGP behavior

(See the man page for a complete listing of all commands and options)

Examples:

 -se -r Bob [file]          sign and encrypt for user Bob
 --clear-sign [file]        make a clear text signature
 --detach-sign [file]       make a detached signature
 --list-keys [names]        show keys
 --fingerprint [names]      show fingerprints

Please report bugs to <https://bugs.gnupg.org>.
```

## Examples

### Encrypt files (password based)

```plain
gpg -c <file>
```

### Decrypt files  (password based)

```plain
gpg <file>
```

### Key based

### Create keys

```plain
gpg --gen-key
```

### List available keys

```plain
$ gpg --list-keys
/home/johndo/.gnupg/pubring.kbx
--------------------------
pub   rsa3072 2020-11-12 [SC] [expires: 2022-11-12]
      EE1234567ABCDEFG0AE6ABCDEF17C01873DDA13D37
uid           [ultimate] John Do <john.do@offsec.nl>
sub   rsa3072 2020-11-12 [E] [expires: 2022-11-12]
```

### Export public key

```plain
gpg --export -a "<certificate-name-user>" > public.key
```

### Export private key

```plain
gpg --export-secret-key -a "<certificate-name-user>" > private.key
```

### Import public key

```plain
gpg --import public.key
```

### Import private key

```plain
gpg --allow-secret-key-import --import private.key
```

### Generate fingerprint

```plain
gpg --fingerprint
```

### Encrypt data using key

```plain
gpg -e -u "Sender (Your) Real Name" -r "Receiver User Name" file.txt
```

### Decrypt data using key

Will automatically select the corresponding key (if you have one)

```plain
gpg -d file.txt.gpg
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/gpg)
- [Rtcamp.com Tutorial GPG keys](https://rtcamp.com/tutorials/linux/gpg-keys/)
- [Techrepublic.com](https://www.techrepublic.com/article/how-to-easily-encryptdecrypt-a-file-in-linux-with-gpg/)
- [HowToGeek.com](https://www.howtogeek.com/427982/how-to-encrypt-and-decrypt-files-with-gpg-on-linux/)
