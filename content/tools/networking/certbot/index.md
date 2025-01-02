---
title : "Certbot"
# pre : ' '
description : "Certbot can obtain and install HTTPS/TLS/SSL certificates thru LetsEncrypt."
date : 2020-05-19T11:49:40+02:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Certbot can obtain and install HTTPS/TLS/SSL certificates thru LetsEncrypt.

## Installation

```plain
sudo apt install certbot
```

Plugin for nginx

```plain
sudo apt install python3-certbot-nginx
```

## Usage

```plain
certbot [SUBCOMMAND] [options] [-d DOMAIN] [-d DOMAIN] ...
```

## Flags

```plain
Certbot can obtain and install HTTPS/TLS/SSL certificates.  By default,
it will attempt to use a webserver both for obtaining and installing the
certificate. The most common SUBCOMMANDS and flags are:

obtain, install, and renew certificates:
    (default) run   Obtain & install a certificate in your current webserver
    certonly        Obtain or renew a certificate, but do not install it
    renew           Renew all previously obtained certificates that are near
expiry
    enhance         Add security enhancements to your existing configuration
   -d DOMAINS       Comma-separated list of domains to obtain a certificate for

  (the certbot apache plugin is not installed)
  --standalone      Run a standalone webserver for authentication
  (the certbot nginx plugin is not installed)
  --webroot         Place files in a server's webroot folder for authentication
  --manual          Obtain certificates interactively, or using shell script
hooks

   -n               Run non-interactively
  --test-cert       Obtain a test certificate from a staging server
  --dry-run         Test "renew" or "certonly" without saving any certificates
to disk

manage certificates:
    certificates    Display information about certificates you have from Certbot
    revoke          Revoke a certificate (supply --cert-path or --cert-name)
    delete          Delete a certificate

manage your account:
    register        Create an ACME account
    unregister      Deactivate an ACME account
    update_account  Update an ACME account
  --agree-tos       Agree to the ACME server's Subscriber Agreement
   -m EMAIL         Email address for important account notifications

More detailed help:

  -h, --help [TOPIC]    print this message, or detailed help on a topic;
                        the available TOPICS are:

   all, automation, commands, paths, security, testing, or any of the
   subcommands or plugins (certonly, renew, install, register, nginx,
   apache, standalone, webroot, etc.)
  -h all                print a detailed help page including all topics
  --version             print the version number

```

## Examples

### Requesting certificate (with nginx plugin)

```plain
$ sudo certbot
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx

Which names would you like to activate HTTPS for?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: site1.example.com
2: site2.example.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):
```

### Certificate via DNS-challenge specific sub-domain

```plain
sudo certbot certonly -d test.example.com --preferred-challenges=dns --manual
```

### Certificate via DNS-challenge wildcard

```plain
sudo certbot certonly --preferred-challenges=dns --manual
```

### List certificates on server managed by Certbot

```plain
sudo certbot certificates
```

### Remove certificate managed by Certbot

```plain
sudo certbot delete --cert-name <certificate>
```

## URL List

- [Certbot.eff.org](https://certbot.eff.org/)
