---
title : "Swaks"
# pre : ' '
description : "Swiss Army Knife for SMTP."
date : 2022-04-08T12:09:03+02:00
# hidden : true
# draft : true
weight : 420
tags : ['Networking', 'SMTP']
---

---

Swaks is a featureful, flexible, scriptable, transaction-oriented SMTP test tool written and maintained by John Jetmore.  It is free to use and licensed under the GNU GPLv2. Features include:

- SMTP extensions including TLS, authentication, pipelining, PROXY, PRDR, and XCLIENT
- Protocols including SMTP, ESMTP, and LMTP
- Transports including UNIX-domain sockets, internet-domain sockets (IPv4 and IPv6), and pipes to spawned processes
- Completely scriptable configuration, with option specification via environment variables, configuration files, and command line

The official project page is <https://jetmore.org/john/code/swaks/>.

## Installation

Download newest release from [Github.com](https://github.com/jetmore/swaks/releases).

## Usage

```plain
./swaks [OPTIONS]
```

## Flags

Please run `./swaks --help` or check the help file below.

{{% resources fa_icon_class="far fa-file" pattern="ref.*(txt)" /%}}

## Examples

```plain
$ ./swaks --to john.do@offsec.nl --from karel@example.com –-server 10.10.10.10
=== Trying 10.10.10.10:25...
=== Connected to 10.10.10.10.
<-  220 exch-01.offsec.nl ESMTP
 -> EHLO EXCH-01
<-  250-exch-01.offsec.nl
<-  250-SIZE 20480000
<-  250-AUTH LOGIN
<-  250 HELP
 -> MAIL FROM:<karel@example.com>
<-  250 OK
 -> RCPT TO:<john.do@offsec.nl>
<-  250 OK
 -> DATA
<-  354 OK, send.
 -> Date: Fri, 8 Apr 2022 12:14:14 +0100
 -> To: john.do@offsec.nl
 -> From: karel@example.com
 -> Subject: test Fri, 8 Apr 2022 12:14:14 +0100
 -> Message-Id: <12355.098765433@ABCDEF>
 -> X-Mailer: swaks v20201014.0 jetmore.org/john/code/swaks/
 ->
 -> This is a test mailing
-> .
<-  250 Queued (0.000 seconds)
 -> QUIT
<-  221 goodbye
=== Connection closed with remote host.
```

To for example insert own body text, use the `--body` flag.

```plain
swaks -t john.do@offsec.nl --server 10.10.10.10 --body "This is test body text, you can put whatever you want in here."
```

## URL List

- [Github.com - Swaks](https://github.com/jetmore/swaks)
