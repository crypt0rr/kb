---
title : "tcpdump"
# pre : ' '
description : "Is the world’s premier network analysis tool—combining both power and simplicity into a single command-line interface."
date : 2022-08-23T11:36:50+02:00
# hidden : true
# draft : true
weight : 430
# tags : ['']
---

---

tcpdump is the world’s premier network analysis tool—combining both power and simplicity into a single command-line interface.

## Installation

### Debian

```plain
sudo apt install tcpdump
```

### Apple macOS

```plain
brew install tcpdump
```

## Usage

### Linux

```plain
tcpdump [-aAbdDefhHIJKlLnNOpqStuUvxX#] [ -B size ] [ -c count ]
                [ -C file_size ] [ -E algo:secret ] [ -F file ] [ -G seconds ]
                [ -i interface ] [ -j tstamptype ] [ -M secret ] [ --number ]
                [ -Q in|out|inout ]
                [ -r file ] [ -s snaplen ] [ --time-stamp-precision precision ]
                [ --immediate-mode ] [ -T type ] [ --version ] [ -V file ]
                [ -w file ] [ -W filecount ] [ -y datalinktype ] [ -z postrotate-command ]
                [ -Z user ] [ expression ]
```

### macOS

```plain
tcpdump [-aAbdDefhHIJKlLnNOpqStuUvxX#] [ -B size ] [ -c count ]
                [ -C file_size ] [ -E algo:secret ] [ -F file ] [ -G seconds ]
                [ -i interface ] [ -j tstamptype ] [ -M secret ] [ --number ]
                [ -Q in|out|inout ]
                [ -r file ] [ -s snaplen ] [ --time-stamp-precision precision ]
                [ --immediate-mode ] [ -T type ] [ --version ] [ -V file ]
                [ -w file ] [ -W filecount ] [ -y datalinktype ] [ -z postrotate-command ]
                [ -g ] [ -k (flags) ] [ -o ] [ -P ] [ -Q meta-data-expression ]
                [ --apple-tzo offset ] [--apple-truncate ]
                [ -Z user ] [ expression ]
```

## Examples

### Creating dump with specific maximum filesize

`-C 1` states the files captured are capped to 1MB. It will create as many separate files as long as the capture is ran.

```plain
$ sudo tcpdump -w output.pcapng -i en0 -C 1
Password:
tcpdump: listening on en0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C
36146 packets captured
36553 packets received by filter
0 packets dropped by kernel
```

### Reading tcpdump file finding unique IP + port combinations

**Source IP + port:** `tcpdump -n -r client-lan.pcapng | awk -F" " '{print $3}' | sort | uniq -c | head`

**Destination IP + port:** `tcpdump -n -r client-lan.pcapng | awk -F" " '{print $5}' | sort | uniq -c | head`

### Source / Destination / Port host search

Source:

```plain
$ tcpdump -n src host 10.10.12.1 -r client-lan.pcapng
reading from PCAP-NG file client-lan.pcapng
10:21:56.800415 ARP, Request who-has 10.10.12.53 tell 10.10.12.1, length 46
10:21:56.864395 ARP, Request who-has 10.10.12.82 tell 10.10.12.1, length 46
10:21:57.824351 ARP, Request who-has 10.10.12.53 tell 10.10.12.1, length 46
10:21:57.896454 ARP, Request who-has 10.10.12.82 tell 10.10.12.1, length 46
10:21:58.182822 IP 10.10.12.1.67 > 10.10.12.84.68: BOOTP/DHCP, Reply, length 306
```

Destination:

```plain
$ tcpdump -n dst host 10.10.12.1 -r client-lan.pcapng

reading from PCAP-NG file client-lan.pcapng
10:21:59.441300 ARP, Request who-has 10.10.12.1 (ff:ff:ff:ff:ff:ff) tell 0.0.0.0, length 46
10:22:00.812698 ARP, Request who-has 10.10.12.1 tell 10.10.12.84, length 28
10:22:00.855522 ARP, Request who-has 10.10.12.1 tell 10.10.12.84, length 28
10:22:06.230773 ARP, Reply 10.10.12.84 is-at 00:0e:c6:30:c6:d0, length 28
10:22:26.380885 ARP, Request who-has 10.10.12.1 (ff:ff:ff:ff:ff:ff) tell 0.0.0.0, length 46
10:22:37.488705 ARP, Reply 10.10.12.84 is-at 00:0e:c6:30:c6:d0, length 28
```

Port:

```plain
$ tcpdump -n port 53 -r client-lan.pcapng

reading from PCAP-NG file client-lan.pcapng
10:22:00.855764 IP 10.10.12.84.62815 > 10.10.10.1.53: 38381+ PTR? lb._dns-sd._udp.0.124.1.10.in-addr.arpa. (57)
10:22:00.855765 IP 10.10.12.84.50436 > 10.10.10.1.53: 9984+ PTR? lb._dns-sd._udp.offsec.nl. (47)
10:22:00.856550 IP 10.10.10.1.53 > 10.10.12.84.50436: 9984 NXDomain* 0/1/0 (120)
10:22:00.859071 IP 10.10.10.1.53 > 10.10.12.84.62815: 38381 NXDomain 0/0/0 (57)
10:22:01.316965 IP 10.10.12.84.57656 > 10.10.10.1.53: 56524+ A? www.apple.com. (31)
10:22:01.317088 IP 10.10.12.84.59358 > 10.10.10.1.53: 47512+ A? gateway.discord.gg. (36)
10:22:01.317394 IP 10.10.12.84.56831 > 10.10.10.1.53: 35737+ A? api.apple-cloudkit.com. (40)
10:22:01.318354 IP 10.10.12.84.55147 > 10.10.10.1.53: 6850+ A? time.euro.apple.com. (37)
10:22:01.320708 IP 10.10.10.1.53 > 10.10.12.84.56831: 35737 9/0/0 CNAME api.apple-cloudkit.fe.apple-dns.net., A 17.248.177.45, A 17.248.176.241, A 17.248.176.36, A 17.248.176.42, A 17.248.177.41, A 17.248.176.37, A 17.248.177.10, A 17.248.176.49 (217)
10:22:01.322309 IP 10.10.12.84.58583 > 10.10.10.1.53: 36876+ A? 1-courier.push.apple.com. (42)
10:22:01.322466 IP 10.10.12.84.64223 > 10.10.10.1.53: 42426+ A? 1-courier.sandbox.push.apple.com. (50)
```

### Dumping traffic

```plain
$ tcpdump -nX -r client-lan.pcapng

reading from file client-lan.pcapng, link-type EN10MB (Ethernet)
14:51:20.800917 IP 208.68.234.99.60509 > 172.16.40.10.81: Flags [S], seq 1855084074, win 14600, options [mss 1460,sackOK,TS val 25538253 ecr 0,nop,wscale 7], length 0
        0x0000:  4500 003c f8e7 4000 3906 ba11 d044 ea63  E..<..@.9....D.c
        0x0010:  ac10 280a ec5d 0051 6e92 562a 0000 0000  ..(..].Qn.V*....
        0x0020:  a002 3908 1e77 0000 0204 05b4 0402 080a  ..9..w..........
        0x0030:  0185 aecd 0000 0000 0103 0307            ............
14:51:20.800953 IP 172.16.40.10.81 > 208.68.234.99.60509: Flags [S.], seq 4166855389, ack 1855084075, win 14480, options [mss 1460,sackOK,TS val 71430591 ecr 25538253,nop,wscale 4], length 0
        0x0000:  4500 003c 0000 4000 4006 abf9 ac10 280a  E..<..@.@.....(.
        0x0010:  d044 ea63 0051 ec5d f85d 2add 6e92 562b  .D.c.Q.].]*.n.V+
        0x0020:  a012 3890 8ef1 0000 0204 05b4 0402 080a  ..8.............
        0x0030:  0441 f1bf 0185 aecd 0103 0304            .A..........
[...]
```

### ACK/PSH

```plain
$ tcpdump -A -n 'tcp[13] = 24' -r client-lan.pcapng

reading from file client-lan.pcapng, link-type EN10MB (Ethernet)
14:51:20.802032 IP 208.68.234.99.60509 > 172.16.40.10.81: Flags [P.], seq 1855084075:1855084163, ack 4166855390, win 115, options [nop,nop,TS val 25538253 ecr 71430591], length 88
E.....@.9....D.c..(
.].Qn.V+.]*....s1......
.....A..GET //admin HTTP/1.1
Host: admin.offsec.nl:81
User-Agent: Joe
[...]
```

## URL List

- [Tcpdump.org](https://www.tcpdump.org/)
- [Danielmeissler.com - A tcpdump Tutorial with Examples — 50 Ways to Isolate Traffic](https://danielmiessler.com/study/tcpdump/)
