---
title : "Wireshark"
# pre : ' '
description : "Is the world's foremost and widely-used network protocol analyzer."
date : 2020-03-12T15:52:58+01:00
# hidden : true
# draft : true
weight : 500
tags : ['Networking', 'Wirehark']
---

---

Is the world's foremost and widely-used network protocol analyzer.

## Installation

```plain
sudo apt install wireshark
```

## Usage

```plain
wireshark [options] ... [ <infile> ]
```

## Flags

```plain
Capture interface:
  -i <interface>           name or idx of interface (def: first non-loopback)
  -f <capture filter>      packet filter in libpcap filter syntax
  -s <snaplen>             packet snapshot length (def: appropriate maximum)
  -p                       don't capture in promiscuous mode
  -k                       start capturing immediately (def: do nothing)
  -S                       update packet display when new packets are captured
  -l                       turn on automatic scrolling while -S is in use
  -I                       capture in monitor mode, if available
  -B <buffer size>         size of kernel buffer (def: 2MB)
  -y <link type>           link layer type (def: first appropriate)
  --time-stamp-type <type> timestamp method for interface
  -D                       print list of interfaces and exit
  -L                       print list of link-layer types of iface and exit
  --list-time-stamp-types  print list of timestamp types for iface and exit

Capture stop conditions:
  -c <packet count>        stop after n packets (def: infinite)
  -a <autostop cond.> ...  duration:NUM - stop after NUM seconds
                           filesize:NUM - stop this file after NUM KB
                              files:NUM - stop after NUM files
Capture output:
  -b <ringbuffer opt.> ... duration:NUM - switch to next file after NUM secs
                           filesize:NUM - switch to next file after NUM KB
                              files:NUM - ringbuffer: replace after NUM files
Input file:
  -r <infile>              set the filename to read from (no pipes or stdin!)

Processing:
  -R <read filter>         packet filter in Wireshark display filter syntax
  -n                       disable all name resolutions (def: all enabled)
  -N <name resolve flags>  enable specific name resolution(s): "mnNtdv"
  -d <layer_type>==<selector>,<decode_as_protocol> ...
                           "Decode As", see the man page for details
                           Example: tcp.port==8888,http
  --enable-protocol <proto_name>
                           enable dissection of proto_name
  --disable-protocol <proto_name>
                           disable dissection of proto_name
  --enable-heuristic <short_name>
                           enable dissection of heuristic protocol
  --disable-heuristic <short_name>
                           disable dissection of heuristic protocol

User interface:
  -C <config profile>      start with specified configuration profile
  -Y <display filter>      start with the given display filter
  -g <packet number>       go to specified packet number after "-r"
  -J <jump filter>         jump to the first packet matching the (display)
                           filter
  -j                       search backwards for a matching packet after "-J"
  -m <font>                set the font name used for most text
  -t a|ad|d|dd|e|r|u|ud    output format of time stamps (def: r: rel. to first)
  -u s|hms                 output format of seconds (def: s: seconds)
  -X <key>:<value>         eXtension options, see man page for details
  -z <statistics>          show various statistics, see man page for details

Output:
  -w <outfile|->           set the output filename (or '-' for stdout)

Miscellaneous:
  -h                       display this help and exit
  -v                       display version info and exit
  -P <key>:<path>          persconf:path - personal configuration files
                           persdata:path - personal data files
  -o <name>:<value> ...    override preference or recent setting
  -K <keytab>              keytab file to use for kerberos decryption
  --display=DISPLAY        X display to use
  --fullscreen             start Wireshark in full screen
```

## Cheat Sheet

### Common Filtering Commands

| USAGE                        | FILTER SYNTAX                                     |
| ---------------------------- | ------------------------------------------------- |
| Wireshark Filter by IP       | ip.add == 10.10.50.1                              |
| Filter by Destination IP     | ip.dest == 10.10.50.1                             |
| Filter by Source IP          | ip.src == 10.10.50.1                              |
| Filter by IP range           | ip.addr >= 10.10.50.1 and ip.addr <=10.10.50.100  |
| Filter by Multiple Ips       | ip.addr == 10.10.50.1 and ip.addr == 10.10.50.100 |
| Filter out IP adress         | ! (ip.addr == 10.10.50.1)                         |
| Filter subnet                | ip.addr == 10.10.50.1/24                          |
| Filter by port               | tcp.port == 25                                    |
| Filter by destination port   | tcp.dstport == 23                                 |
| Filter by ip adress and port | ip.addr == 10.10.50.1 and Tcp.port == 25          |
| Filter by URL                | http.host == “host name”                          |
| Filter by time stamp         | frame.time >= “June 02, 2019 18:04:00”            |
| Filter SYN flag              | Tcp.flags.syn == 1 and tcp.flags.ack ==0          |
| Wireshark Beacon Filter      | wlan.fc.type_subtype = 0x08                       |
| Wireshark broadcast filter   | eth.dst == ff:ff:ff:ff:ff:ff                      |
| Wireshark multicast filter   | (eth.dst[0] & 1)                                  |
| Host name filter             | ip.host = hostname                                |
| MAC address filter           | eth.addr == 00:70:f4:23:18:c4                     |
| RST flag filter              | tcp.flag.reset == 1                               |

### Default Columns In a Packet Capture Output

| NAME              | DESCRIPTION                                                   |
| ----------------- | ------------------------------------------------------------- |
| No.               | Frame number from the beginning of the packet capture         |
| Time              | Seconds from the first frame                                  |
| Source (src)      | Source address, commonly an IPv4, IPv6 or Ethernet address    |
| Destination (dst) | Destination address                                           |
| Protocol          | Protocol used in the Ethernet frame, IP packet, or TC segment |
| Length            | Length of the frame in bytes                                  |

### Logical Operators

| OPERATOR    | DESCRIPTION        | EXAMPLE                                                                      |
| ----------- | ------------------ | ---------------------------------------------------------------------------- |
| and or &&   | Logical AND        | All the conditions should match                                              |
| or or \|\|  | Logical OR         | Either all or one of the conditions should match                             |
| xor or ^^   | Logical XOR        | Exclusive alterations – only one of the two conditions should match not both |
| not or !    | Not (Negation)     | Not equal to                                                                 |
| [ n ] [ … ] | Substring operator | Filter a specific word or text                                               |

### Filtering Packets (Display Filters)

| OPERATOR | DESCRIPTION           | EXAMPLE                   |
| -------- | --------------------- | ------------------------- |
| eq or == | Equal                 | ip.dest  ==  192.168.1.1  |
| ne or != | Not equal             | ip.dest  !=   192.168.1.1 |
| gt or >  | Greater than          | frame.len   >   10        |
| it or <  | less than             | frame.len  <   10         |
| ge or >= | Greater than or equal | frame.len  >=   10        |
| le or <= | Less than or equal    | frame.len  <=   10        |

### Filter Types

| NAME           | DESCRIPTION                         |
| -------------- | ----------------------------------- |
| Capture filter | Filter packets during capture       |
| Display filter | Hide packets from a capture display |

### Wireshark Capturing Modes

| NAME             | DESCRIPTION                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| Promiscuous mode | Sets interface to capture all packets on a network segment to which it is associated to |
| Monitor mode     | Setup the wireless interface to capture all traffic it can receive (Unix/ Linux only)   |

### Miscellaneous

| NAME                | DESCRIPTION             |
| ------------------- | ----------------------- |
| Slice Operator      | [ … ] – Range of values |
| Membership Operator | {} – In                 |
| CTRL+E              | Start/Stop Capturing    |

### Capture Filter Syntax

| SYNTAX  | PROTOCOL | DIRECTION | HOSTS       | VALUE | LOGICAL OPERATOR | EXPRESSIONS          |
| ------- | -------- | --------- | ----------- | ----- | ---------------- | -------------------- |
| Example | tcp      | src       | 192.168.1.1 | 80    | and              | tcp dst 202.164.30.1 |

### Display Filter Syntax

| SYNTAX  | PROTOCOL | STRING 1 | STRING 2 | COMPARISON OPERATOR | VALUE       | LOGICAL OPERATOR | EXPRESSIONS |
| ------- | -------- | -------- | -------- | ------------------- | ----------- | ---------------- | ----------- |
| Example | http     | dest     | ip       | ==                  | 192.168.1.1 | and              | tcp port    |

### Keyboard Shortcuts – Main Display Window

| ACCELERATOR      | DESCRIPTION                                                                                   | ACCELERATOR      | DESCRIPTION                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| Tab or Shift+Tab | Move between screen elements, e.g. from the toolbars to the packet list to the packet detail. | Alt+→ or Option→ | Move to the next packet in the selection history.                            |
| ↓                | Move to the next packet or detail item.                                                       | →                | In the packet detail, opens the selected tree item.                          |
| ↑                | Move to the previous packet or detail item.                                                   | Shift+→          | In the packet detail, opens the selected tree items and all of its subtrees. |
| Ctrl+ ↓ or F8    | Move to the next packet, even if the packet list isn’t focused.                               | Ctrl+→           | In the packet detail, opens all tree items.                                  |
| Ctrl+ ↑ Or F7    | Move to the previous packet, even if the packet list isn’t focused                            | Ctrl+←           | In the packet detail, closes all the tree                                    |
| Ctrl+.           | Move to the next packet of the conversation (TCP, UDP or IP).                                 | Backspace        | In the packet detail, jumps to the parent node.                              |
| Ctrl+,           | Move to the previous packet of the conversation (TCP, UDP or IP).                             | Return or Enter  | In the packet detail, toggles the selected tree item.                        |

## Examples

### Filter IPs from PCAP

Command to extract IPs from captured PCAP-file.

```plain
$ tcpdump -r capture.pcapng 'ip' -n | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | sort -u

reading from file capture.pcapng, link-type EN10MB (Ethernet)
0.0.0.0
10.30.100.204
104.26.10.153
13.107.18.11
140.82.112.26
140.82.121.4
```

## URL List

- [Wireshark.org](https://www.wireshark.org/)
- [Github.com - wireshark](https://github.com/wireshark/wireshark)
