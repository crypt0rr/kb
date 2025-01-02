---
title : "CDPsnarf"
# pre : ' '
description : "A network sniffer exclusively written to extract information from CDP packets."
date : 2020-03-11T11:14:30+01:00
# hidden : true
# draft : true
weight : 90
# tags : [""]
---

---

A network sniffer exclusively written to extract information from CDP packets.

## Installation

Default installed in [Kali Linux](https://www.kali.org/)

## Usage

```plain
cdpsnarf -i <dev> [-h] [-w savefile] [-r dumpfile] [-d]
```

## Flags

```plain
CDPSnarf v0.1.6 [$Rev: 797 $] initiated.
   Author: Tasos "Zapotek" Laskos
           <tasos.laskos@gmail.com>
              <zapotek@segfault.gr>
   Website: http://github.com/Zapotek/cdpsnarf

cdpsnarf -i <dev> [-h] [-w savefile] [-r dumpfile] [-d]

   -i      define the interface to sniff on
   -w      write packets to PCAP dump file
   -r      read packets from PCAP dump file
   -d      show debugging information
   -h      show help message and exit
```

## Examples

Sniffer with output in CLI

```plain
cdpsnarf -i <interface>
```

Sniffer output to PCAP

```plain
cdpsnarf -i <interface> -w <output>.pcap
```

## URL List

- [Kali.org - CDPsnarf](https://tools.kali.org/information-gathering/cdpsnarf)
