---
title : "SSL-Cert-Check"
# pre : ' '
description : "SSL Certification Expiration Checker."
date : 2020-12-16T13:13:08+01:00
# hidden : true
# draft : true
weight : 1770
# tags : ['']
---

---

SSL Certification Expiration Checker.

## Installation

```plain
git clone https://github.com/Matty9191/ssl-cert-check
```

## Usage

```plain
./ssl-cert-check [ -e email address ] [-E sender email address] [ -x days ] [-q] [-a] [-b] [-h] [-i] [-n] [-N] [-v]
       { [ -s common_name ] && [ -p port] } || { [ -f cert_file ] } || { [ -c cert file ] } || { [ -d cert dir ] }
```

## Flags

```plain
-a                : Send a warning message through E-mail
-b                : Will not print header
-c cert file      : Print the expiration date for the PEM or PKCS12 formatted certificate in cert file
-d cert directory : Print the expiration date for the PEM or PKCS12 formatted certificates in cert directory
-e E-mail address : E-mail address to send expiration notices
-E E-mail sender  : E-mail address of the sender
-f cert file      : File with a list of FQDNs and ports
-h                : Print this screen
-i                : Print the issuer of the certificate
-k password       : PKCS12 file password
-n                : Run as a Nagios plugin
-N                : Run as a Nagios plugin and output one line summary (implies -n, requires -f or -d)
-p port           : Port to connect to (interactive mode)
-q                : Don't print anything on the console
-s commmon name   : Server to connect to (interactive mode)
-S                : Print validation information
-t type           : Specify the certificate type
-V                : Print version information
-x days           : Certificate expiration interval (eg. if cert_date < days)
```

## Examples

### Check single domain

```plain
$ ./ssl-cert-check -s offsec.nl 443

Host                                            Status       Expires      Days
----------------------------------------------- ------------ ------------ ----
offsec.nl:443                                   Valid        Aug 11, 2021   58
```

### Check multiple domains

```plain
$ cat domain.txt                       
google.com 443
example.com 443
facebook.com 443
linkedin.com 443
```

```plain
$ ./ssl-cert-check -f domain.txt

Host                                            Status       Expires      Days
----------------------------------------------- ------------ ------------ ----
google.com:443                                  Valid        Feb  2, 2021   48
example.com:443                                 Valid        Dec 25, 2021  374
facebook.com:443                                Valid        Jan 30, 2021   45
linkedin.com:443                                Valid        Apr  2, 2021  107
```

## URL List

- [Github.com - ssl-cert-check](https://github.com/Matty9191/ssl-cert-check)
