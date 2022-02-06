---
title : "ssh"
# pre : '<i class="fas fa-code"></i> '
description : "OpenSSH SSH client (remote login program)."
date : 2020-03-11T15:19:22+01:00
# hidden : true
# draft : true
weight : 0
# tags : [""]
---

## Secure Shell

### Installation

```plain
sudo apt install openssh-client
```

### Usage

```plain
ssh [OPTIONS] <target>
```

### Flags

```plain
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]
```

### Examples

#### Connect to a server (default port 22)

```plain
ssh user@server
```

#### Connect using specific port

```plain
ssh user@server -p <port>
```

#### Run script on remote server

```plain
ssh user@server <scrip_to_run>
```

#### Create public private keys

```plain
ssh-keygen -f <filename> -t rsa -b 4096
```

#### Upload SSH key to target host

```plain
ssh-copy-id -f -i <filename>.pub <user>@<target>
```

#### Disable password authentication

```plain
sudo vi /etc/ssh/sshd_config

ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
PermitRootLogin no
```

```plain
sudo systemctl reload ssh
```

#### FIDO U2F over SSH

```plain
$ ssh-keygen -t ecdsa-sk -f ~/.ssh/id_ecdsa_sk
Generating public/private ecdsa-sk key pair.
You may need to touch your authenticator to authorize key generation.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/johndo/.ssh/id_ecdsa_sk
Your public key has been saved in /home/johndo/.ssh/id_ecdsa_sk.pub
The key fingerprint is:
SHA256:f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2 johndo@example
The key's randomart image is:
+-[ECDSA-SK 256]--+
|                 |
| o     . .       |
|oA.     + o      |
|.. .   x O +     |
|a   .   R * .    |
|-  . . . P o     |
|..  o . % + .    |
|   .  .!!! o .   |
|      .---X#o    |
+----[SHA256]-----+
```

#### SSH port forward to local

```plain
ssh -L 10000:localhost:10000 <username>@<ip>
```

### URL list

* [Linux.die.net](https://linux.die.net/man/1/ssh)
