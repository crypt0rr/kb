---
title : "SSHScan"
# pre : ' '
description : "A testing tool that enumerates SSH Ciphers. Using SSHScan, weak ciphers can be easily detected."
date : 2020-03-11T15:21:44+01:00
# hidden : true
# draft : true
weight : 1760
tags : ['Other', 'SSH']
---

---

A testing tool that enumerates SSH Ciphers. Using SSHScan, weak ciphers can be easily detected.

## Installation

```plain
git clone https://github.com/evict/SSHScan.git
```

## Usage

```plain
python sshscan.py [options]
```

## Flags

```plain
Usage: usage sshscan.py [options]

Options:
  --version             show program's version number and exit
  -h, --help            show this help message and exit

  Options:
    -t TARGET, --target=TARGET
                        Specify target as 'target' or 'target:port' (port 22 is default)
    -l TARGETLIST, --target-list=TARGETLIST
                        File with targets: 'target' or 'target:port' seperated by a newline (port 22 is default)
```

## Examples

```plain
python sshscan.py -t <target>:22

[*] Initiating scan for <target> on port 22
[*] Connected to <target> on port 22...
    [+] Target SSH version is: SSH-2.0-OpenSSH_7.6p1 Ubuntu-4ubuntu0.3
    [+] Retrieving ciphers...
    [+] Detected the following ciphers:
            aes128-ctr                           aes128-gcm@openssh.com
            aes192-ctr                           aes256-gcm@openssh.com
            aes256-ctr                           chacha20-poly1305@openssh.com

    [+] Detected the following KEX algorithms:
            curve25519-sha256                    ecdh-sha2-nistp256
            curve25519-sha256@libssh.org         ecdh-sha2-nistp384
            diffie-hellman-group14-sha1          ecdh-sha2-nistp521
            diffie-hellman-group-exchange-sha256

    [+] Detected the following MACs:
            hmac-sha1                            hmac-sha2-256-etm@openssh.com
            hmac-sha2-256                        hmac-sha2-512-etm@openssh.com
            hmac-sha2-512                        umac-64-etm@openssh.com
            umac-64                              umac-128-etm@openssh.com
            hmac-sha1-etm@openssh.com

    [+] Detected the following HostKey algorithms:
            ecdsa-sha2-nistp256                  ssh-rsa
            ssh-ed25519

    [+] No weak ciphers detected!
    [+] Detected the following weak KEX algorithms:
            diffie-hellman-group14-sha1          ecdh-sha2-nistp384
            ecdh-sha2-nistp256                   ecdh-sha2-nistp521


    [+] Detected the following weak MACs:
            hmac-sha1                            hmac-sha1-etm@openssh.com
            umac-64                              umac-64-etm@openssh.com


    [+] Detected the following weak HostKey algorithms:
            ecdsa-sha2-nistp256
```

## URL List

- [GitHub.com - SSHscan](https://github.com/evict/SSHScan)
