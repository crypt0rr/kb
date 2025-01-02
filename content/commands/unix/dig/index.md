---
title : "dig"
# pre : '<i class="fas fa-code"></i> '
description : "DNS lookup utility."
date : 2020-03-13T15:21:58+01:00
# hidden : true
# draft : true
weight : 210
# tags : ['']
---

---

## Usage

```plain
dig [OPTIONS] <target>
```

## Flags

```plain
Usage:  dig [@global-server] [domain] [q-type] [q-class] {q-opt}
            {global-d-opt} host [@local-server] {local-d-opt}
            [ host [@local-server] {local-d-opt} [...]]

Use "dig -h" (or "dig -h | more") for complete list of options
```

## Examples

### Generic information

```plain
dig google.com

; <<>> DiG 9.11.5-P4-5.1ubuntu2.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31511
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;google.com.        IN  A

;; ANSWER SECTION:
google.com.     49  IN  A   216.58.208.110

;; Query time: 11 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: vr mrt 13 15:22:09 CET 2020
;; MSG SIZE  rcvd: 55
```

### CAA-record

```plain
dig caa google.com

; <<>> DiG 9.11.5-P4-5.1ubuntu2.1-Ubuntu <<>> caa google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 8305
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;google.com.            IN  CAA

;; ANSWER SECTION:
google.com.     7189    IN  CAA 0 issue "pki.goog"

;; Query time: 0 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: vr mrt 13 15:24:17 CET 2020
;; MSG SIZE  rcvd: 66
```

### TXT-record

```plain
dig txt google.com

; <<>> DiG 9.11.5-P4-5.1ubuntu2.1-Ubuntu <<>> txt google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 53064
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;google.com.            IN  TXT

;; ANSWER SECTION:
google.com.     3600    IN  TXT "globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8="
google.com.     3600    IN  TXT "v=spf1 include:_spf.google.com ~all"
google.com.     3600    IN  TXT "facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"
google.com.     300 IN  TXT "docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e"
google.com.     300 IN  TXT "docusign=1b0a6754-49b1-4db5-8540-d2c12664b289"

;; Query time: 16 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: vr mrt 13 15:24:38 CET 2020
;; MSG SIZE  rcvd: 352
```

### Use external DNS resolver

```plain
dig @1.1.1.1 google.com

; <<>> DiG 9.11.5-P4-5.1ubuntu2.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5547
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;google.com.        IN  A

;; ANSWER SECTION:
google.com.     44  IN  A   216.58.208.110

;; Query time: 9 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: vr mrt 13 15:27:37 CET 2020
;; MSG SIZE  rcvd: 55
```

### DNS zone transfer testing

```plain
$ dig axfr @1.1.1.1 offsec.nl

; <<>> DiG 9.16.1-Ubuntu <<>> axfr @1.1.1.1 offsec.nl
; (1 server found)
;; global options: +cmd
; Transfer failed.
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/dig)
