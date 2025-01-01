---
title : "Yubikey"
# pre : ' '
description : "The #1 security key, offering strong two factor authentication from industry leader Yubico."
date : 2020-12-14T17:19:33+01:00
# hidden : true
# draft : true
weight : 2130
# tags : ['']
---

---

The #1 security key, offering strong two factor authentication from industry leader Yubico.

### Ubuntu 2FA

### Install requirements

```plain
sudo add-apt-repository ppa:yubico/stable && sudo apt-get update
sudo apt-get install libu2f-udev libpam-u2f
```

### Initial configuration

```plain
mkdir ~/.config/Yubico
pamu2fcfg > ~/.config/yubico/u2f_keys
```

### Adding extra key

```plain
pamu2fcfg -n >> ~/.config/yubico/u2f_keys
```

### Testing configuration

To prompt the user to touch the key, set 'cue' at the end of the 'auth required' line

```plain
sudo nano /etc/pam.d/sudo
auth required pam_u2f.so authfile=/home/<user>/.config/yubico/u2f_keys
```

### FIDO U2F (2FA for SSH)

[Developers.yubico.com - SSH](https://developers.yubico.com/SSH/)

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

Upload new key to SSH-target server.

```plain
ssh-copy-id -f -i <filename>.pub <user>@<target>
```

Test logging in with key.

```plain
$ ssh johndo@example -i id_ecdsa_sk
Enter passphrase for key '/home/johndo/id_ecdsa_sk': 
Confirm user presence for key ECDSA-SK SHA256:f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2
Last login: Wed May 12 08:29:50 2021 from 10.10.20.107
johndo@example:~$
```

## URL List

- [Askubuntu.com - How to configure a U2F key such as Yubikey for system wide 2-factor authentication](https://askubuntu.com/questions/1071027/how-to-configure-a-u2f-keysuch-as-a-yubikey-for-system-wide-2-factor-authentic)
- [Support.yubico.com - Ubuntu Linux Login Guide U2F](https://support.yubico.com/hc/en-us/articles/360016649099-Ubuntu-Linux-Login-Guide-U2F)
- [Support.yubico.com - Enabling Yubico PPA on Ubuntu](https://support.yubico.com/hc/en-us/articles/360016649039-Enabling-the-Yubico-PPA-on-Ubuntu)
- [Support.yubico.com - Using your U2F Yubikey with Linux](https://support.yubico.com/hc/en-us/articles/360013708900-Using-Your-U2F-YubiKey-with-Linux)
- [Github.com - Yubico password less Ubuntu](https://github.com/vanderblugen/yubico_password_less_ubuntu)
- [Developers.yubico.com - SSH](https://developers.yubico.com/SSH/)
