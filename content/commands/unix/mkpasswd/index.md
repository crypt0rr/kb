---
title : "mkpasswd"
# pre : '<i class="fas fa-code"></i> '
description : "Encrypts the given password with the crypt(3) libc function, using the given salt.."
date : 2020-08-04T15:17:48+02:00
# hidden : true
# draft : true
weight : 580
# tags : ['']
---

---

Crypts the PASSWORD using crypt(3).

## Usage

```plain
mkpasswd [OPTIONS]... [PASSWORD [SALT]]
```

## Flags

```plain
Crypts the PASSWORD using crypt(3).

      -m, --method=TYPE     select method TYPE
      -5                    like --method=md5crypt
      -S, --salt=SALT       use the specified SALT
      -R, --rounds=NUMBER   use the specified NUMBER of rounds
      -P, --password-fd=NUM read the password from file descriptor NUM
                            instead of /dev/tty
      -s, --stdin           like --password-fd=0
      -h, --help            display this help and exit
      -V, --version         output version information and exit

If PASSWORD is missing then it is asked interactively.
If no SALT is specified, a random one is generated.
If TYPE is 'help', available methods are printed.

Report bugs to <md+whois@linux.it>.

```

## Examples

### Password 'test'

```plain
$ mkpasswd
Password:
eph5h94RsO71E
```

### Password 'test' using SHA-512

```plain
$ mkpasswd --method=sha-512
Password:
$6$ONAmo76fZnYT4hQD$tAhBUefxumKisUGH87kRmOChJ7fVdVMGpYTGxNFwSwn7bOVEXs9qIHY8TVqtAudc4xm3zOh5sIGloiQK/zWcZ1
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/mkpasswd)
