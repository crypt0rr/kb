---
title : "Tcpreplay"
# pre : ' '
description : "Replay network traffic stored in pcap files."
date : 2024-12-09T14:30:51+01:00
# hidden : true
# draft : true
weight : 440
# tags : ['']
---

---

Replay network traffic stored in pcap files. Tcpreplay is a suite of [GPLv3] licensed utilities for UNIX (and Win32 under [Cygwin]) operating systems for editing and replaying network traffic which was previously captured by tools like [tcpdump] and [Wireshark]. It allows you to classify traffic as client or server, rewrite Layer 2, 3 and 4 packets and finally replay the traffic back onto the network and through other devices such as switches, routers, firewalls, NIDS and IPS's. Tcpreplay supports both single and dual NIC modes for testing both sniffing and in-line devices.

> Network playback products

- **tcpreplay** - replays pcap files at arbitrary speeds onto the network with an option to replay with random IP addresses
- **tcpreplay-edit** - replays pcap files at arbitrary speeds onto the network with numerous options to modify packets packets on the fly
- **tcpliveplay** - replays TCP network traffic stored in a pcap file on live networks in a manner that a remote server will respond to

> Pcap file editors and utilities

- **tcpprep** - multi-pass pcap file pre-processor which determines packets as client or server and splits them into creates output files for use by tcpreplay and tcprewrite
- **tcprewrite** - pcap file editor which rewrites TCP/IP and Layer 2 packet headers
- **tcpbridge** - bridge two network segments with the power of tcprewrite
- **tcpcapinfo** - raw pcap file decoder and debugger

## Installation

Download the newest release from [Github.com](https://github.com/appneta/tcpreplay/releases)

```plain
wget https://github.com/appneta/tcpreplay/releases/download/v4.5.1/tcpreplay-4.5.1.tar.gz
tar -xvf tcpreplay-4.5.1.tar.gz
cd tcpreplay-4.5.1
./configure
make
sudo make install
```

## Usage

```plain
tcpreplay [ -<flag> [<val>] | --<name>[{=| }<val>] ]... \
                <pcap_file(s)> | <pcap_dir(s)>
```

## Flags

```plain
tcpreplay (tcpreplay) - 
Usage:  

   -q, --quiet                Quiet mode
   -T, --timer=str            Select packet timing mode: select, ioport, gtod, nano
       --maxsleep=num         Sleep for no more then X milliseconds between packets
   -v, --verbose              Print decoded packets via tcpdump to STDOUT
   -A, --decode=str           Arguments passed to tcpdump decoder
   -K, --preload-pcap         Preloads packets into RAM before sending
   -c, --cachefile=str        Split traffic via a tcpprep cache file
   -2, --dualfile             Replay two files at a time from a network tap
   -i, --intf1=str            Client to server/RX/primary traffic output interface
   -I, --intf2=str            Server to client/TX/secondary traffic output interface
   -w, --write=str            Pcap file to receive traffic outputs
       --include=str          Send only selected packet numbers
       --exclude=str          Send all but selected packet numbers
       --listnics             List available network interfaces and exit
   -l, --loop=num             Loop through the capture file X times
       --loopdelay-ms=num     Delay between loops in milliseconds
       --loopdelay-ns=num     Delay between loops in nanoseconds
       --pktlen               Override the snaplen and use the actual packet len
   -L, --limit=num            Limit the number of packets to send
       --duration=num         Limit the number of seconds to send
   -x, --multiplier=str       Modify replay speed to a given multiple
   -p, --pps=str              Replay packets at a given packets/sec
   -M, --mbps=str             Replay packets at a given Mbps
   -t, --topspeed             Replay packets as fast as possible
   -o, --oneatatime           Replay one packet at a time for each user input
       --pps-multi=num        Number of packets to send for each time interval
       --unique-ip            Modify IP addresses each loop iteration to generate unique flows
       --unique-ip-loops=str  Number of times to loop before assigning new unique ip
       --no-flow-stats        Suppress printing and tracking flow count, rates and expirations
       --flow-expiry=num      Number of inactive seconds before a flow is considered expired
   -P, --pid                  Print the PID of tcpreplay at startup
       --stats=num            Print statistics every X seconds, or every loop if '0'
   -W, --suppress-warnings    suppress printing warning messages
   -V, --version              Print version information
   -h, --less-help            Display less usage information and exit
   -H, --help                 display extended usage information and exit
   -!, --more-help            extended usage information passed thru pager
       --save-opts[=arg]      save the option state to a config file
       --load-opts=str        load options from a config file
```

## Examples

### Basic Replay

```plain
$ sudo tcpreplay -i eth0 -tK capture.pcapng
File Cache is enabled
Warning: flow_decode: packet 24 IPv6 header version should be 6 but instead is 0
Warning: flow_decode: packet 1349 IPv6 header version should be 6 but instead is 0
Warning: flow_decode: packet 1352 IPv6 header version should be 6 but instead is 0
Warning: flow_decode: packet 42123 IPv6 header version should be 6 but instead is 0
[...SNIP...]
Warning: Unable to send packet: Error with PF_PACKET send() [71750]: Message too long (errno = 90)
Warning: Unable to send packet: Error with PF_PACKET send() [71967]: Message too long (errno = 90)
Actual: 73365 packets (58184484 bytes) sent in 0.440660 seconds
Rated: 132039404.5 Bps, 1056.31 Mbps, 166488.90 pps
Flows: 552 flows, 1252.66 fps, 66628 unique flow packets, 11467 unique non-flow packets
Statistics for network device: eth0
        Successful packets:        73365
        Failed packets:            4730
        Truncated packets:         0
        Retried packets (ENOBUFS): 0
        Retried packets (EAGAIN):  0
```

## URL list

- [Github.com - tcpreplay](https://github.com/appneta/tcpreplay)
- [Tcpreplay.appneta.com - Tcpreplay - Pcap editing and replaying utilities](https://tcpreplay.appneta.com/)
