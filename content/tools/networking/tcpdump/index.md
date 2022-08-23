---
title : "tcpdump"
# pre : ' '
description : "Is the world’s premier network analysis tool—combining both power and simplicity into a single command-line interface."
date : 2022-08-23T11:36:50+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## tcpdump

tcpdump is the world’s premier network analysis tool—combining both power and simplicity into a single command-line interface.

### Installation

#### Debian

```plain
sudo apt install tcpdump
```

#### macOS

```plain
brew install tcpdump
```

### Usage

#### Linux

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

#### macOS

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

### Examples

#### Creating dump with specific maximum filesize

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

#### Reading tcpdump file finding unique IP + port combinations

```plain
tcpdump -n -r client-lan.pcapng | awk -F" " '{print $3}' | sort | uniq -c | head 
reading from PCAP-NG file client-lan.pcapng
 110 10.10.14.100.53
   5 10.10.14.101.53
   2 10.10.12.1.67
   4 10.10.12.50.60167
   1 10.10.12.51.138
   2 10.10.12.54.51397
   5 10.10.12.54.5353
   3 10.10.12.54.55460
   2 10.10.12.54.59462
```

#### Source / Destination / Port host search

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
tcpdump -n dst host 10.10.12.1 -r client-lan.pcapng
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
tcpdump -n port 53 -r client-lan.pcapng
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

### URL list

* [Tcpdump.org](https://www.tcpdump.org/)
* [Danielmeissler.com - A tcpdump Tutorial with Examples — 50 Ways to Isolate Traffic](https://danielmiessler.com/study/tcpdump/)
