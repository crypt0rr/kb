---
title : "hcxpcapngtool"
# pre : ' '
description : "Convert everything."
date : 2022-02-23T12:01:03+01:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

## Installation

Install [hcxtools]({{< ref "../hcxtools" >}}).

## Usage

```plain
hcxpcapngtool <options>
hcxpcapngtool <options> input.pcapng
hcxpcapngtool <options> *.pcapng
hcxpcapngtool <options> *.pcap
hcxpcapngtool <options> *.cap
hcxpcapngtool <options> *.*
```

## Flags

```plain
hcxpcapngtool 6.0.2 (C) 2020 ZeroBeat

short options:
-o <file> : output PMKID/EAPOL hash file
            hashcat -m 22000/22001 and JtR wpapsk-opencl/wpapsk-pmk-opencl
-E <file> : output wordlist (autohex enabled on non ASCII characters) to use as input wordlist for cracker
-I <file> : output unsorted identity list to use as input wordlist for cracker
-U <file> : output unsorted username list to use as input wordlist for cracker
-h        : show this help
-v        : show version

long options:
--all                              : convert all possible hashes instead of only the best one
                                     that can lead to much overhead hashes
                                     use hcxhashtool to filter hashes
                                     need hashcat --nonce-error-corrections >= 8
--eapoltimeout=<digit>             : set EAPOL TIMEOUT (milliseconds)
                                   : default: 5000 ms
--nonce-error-corrections=<digit>  : set nonce error correction
                                     warning: values > 0 can lead to uncrackable handshakes
                                   : default: 0
--ignore-ie                        : do not use CIPHER and AKM information
                                     this will convert all frames regadless of
                                     CIPHER and/OR AKM information,
                                     and can lead to uncrackable hashes
--max-essids=<digit>               : maximum allowed ESSIDs
                                     default: 1 ESSID
                                     disregard ESSID changes and take ESSID with highest ranking
--eapmd5=<file>                    : output EAP MD5 CHALLENGE (hashcat -m 4800)
--eapmd5-john=<file>               : output EAP MD5 CHALLENGE (john chap)
--eapleap=<file>                   : output EAP LEAP CHALLENGE (hashcat -m 5500, john netntlm)
--nmea=<file>                      : output GPS data in NMEA format
                                     format: NMEA 0183 $GPGGA, $GPRMC, $GPWPL
                                     to convert it to gpx, use GPSBabel:
                                     gpsbabel -i nmea -f hcxdumptool.nmea -o gpx -F file.gpx
                                     to display the track, open file.gpx with viking
--log=<file>                       : output logfile
--raw-out=<file>                   : output frames in HEX ASCII
                                   : format: TIMESTAMP*LINKTYPE*FRAME*CHECKSUM
--raw-in=<file>                    : input frames in HEX ASCII
                                   : format: TIMESTAMP*LINKTYPE*FRAME*CHECKSUM
--pmkid=<file>                     : output deprecated PMKID file (delimter *)
--hccapx=<file>                    : output deprecated hccapx v4 file
--hccap=<file>                     : output deprecated hccap file
--john=<file>                      : output deprecated PMKID/EAPOL (JtR wpapsk-opencl/wpapsk-pmk-opencl)
--prefix=<file>                    : convert everything to lists using this prefix (overrides single options):
                                      -o <file.22000>      : output PMKID/EAPOL hash file
                                      -E <file.essid>      : output wordlist (autohex enabled on non ASCII characters) to use as input wordlist for cracker
                                      -I <file.identitiy>  : output unsorted identity list to use as input wordlist for cracker
                                      -U <file.username>   : output unsorted username list to use as input wordlist for cracker
                                     --eapmd5=<file.4800>  : output EAP MD5 CHALLENGE (hashcat -m 4800)
                                     --eapleap=<file.5500> : output EAP LEAP CHALLENGE (hashcat -m 5500, john netntlm)
                                     --nmea=<file.nmea>    : output GPS data in NMEA format
--help                             : show this help
--version                          : show version

bitmask for message pair field:
0: MP info (https://hashcat.net/wiki/doku.php?id=hccapx)
1: MP info (https://hashcat.net/wiki/doku.php?id=hccapx)
2: MP info (https://hashcat.net/wiki/doku.php?id=hccapx)
3: x (unused)
4: ap-less attack (set to 1) - no nonce-error-corrections necessary
5: LE router detected (set to 1) - nonce-error-corrections only for LE necessary
6: BE router detected (set to 1) - nonce-error-corrections only for BE necessary
7: not replaycount checked (set to 1) - replaycount not checked, nonce-error-corrections definitely necessary

Do not edit, merge or convert pcapng files! This will remove optional comment fields!
Detection of bit errors does not work on cleaned dump files!
Do not use hcxpcapngtool in combination with third party cap/pcap/pcapng cleaning tools (except: tshark and/or Wireshark)!
It is much better to run gzip to compress the files. Wireshark, tshark and hcxpcapngtool will understand this.
```

## Examples

This example uses the 'dumpfile.pcapng' that is captured with [hcxdumptool]({{< ref "hcxdumptool" >}}).

It will output two files in this case:

1. `hash.hc22000` - Directly crackable with [hashcat]({{< ref "hashcat" >}}) (`-m22000`)
2. `essidlist` - List of SSID's that were observed during capture

To filter a specific ESSID, have a look at [hcxhashtool]({{< ref "hcxhashtool" >}}).

```plain
$ hcxpcapngtool -o hash.hc22000 -E essidlist dumpfile.pcapng
reading from dumpfile.pcapng...

summary capture file
--------------------
file name................................: dumpfile.pcapng
version (pcapng).........................: 1.0
operating system.........................: Linux 5.15.11-76051511-generic
application..............................: hcxdumptool 6.0.5
interface name...........................: wlp4s0
interface vendor.........................: aced5c
weak candidate...........................: 12345678
MAC ACCESS POINT.........................: 8ce7481dfb99 (incremented on every new client)
MAC CLIENT...............................: e80410d52f0c
REPLAYCOUNT..............................: 64387
ANONCE...................................: 2d27c84b6a739c47f0f42e5e038712d1c3add44a516b5972d144b424e3346035
SNONCE...................................: 8eeedb3d57ab1b059ffa4da4c07bb43f790cf83f3d6d32c9e77fa3b82b768624
timestamp minimum (GMT)..................: 23.02.2022 11:59:17
timestamp maximum (GMT)..................: 23.02.2022 12:07:36
used capture interfaces..................: 1
link layer header type...................: DLT_IEEE802_11_RADIO (127)
endianess (capture system)...............: little endian
packets inside...........................: 109
frames with correct FCS..................: 93
WIRELESS DISTRIBUTION SYSTEM.............: 4
BEACON (total)...........................: 27
PROBEREQUEST.............................: 3
PROBERESONSE.............................: 11
AUTHENTICATION (total)...................: 13
AUTHENTICATION (OPEN SYSTEM).............: 13
ASSOCIATIONREQUEST (total)...............: 1
ASSOCIATIONREQUEST (PSK).................: 1
REASSOCIATIONREQUEST (total).............: 2
REASSOCIATIONREQUEST (PSK)...............: 2
EAPOL messages (total)...................: 43
EAPOL RSN messages.......................: 43
ESSID (total unique).....................: 14
EAPOL ANONCE error corrections (NC)......: not detected
EAPOL M1 messages........................: 29
EAPOL M2 messages........................: 14
EAPOL pairs (total)......................: 112
EAPOL pairs (best).......................: 2
EAPOL ROGUE pairs........................: 2
EAPOL pairs written to combi hash file...: 2 (RC checked)
EAPOL M12E2..............................: 2
PMKID (total)............................: 4
PMKID (best).............................: 4
PMKID ROGUE..............................: 4
PMKID written to combi hash file.........: 4
```

### Cracking the hashes

Cracking is done with [hashcat]({{< ref "hashcat" >}}) (`-m22000`)

```plain
$ hashcat -m22000 hash.hc22000 wordlist        
hashcat (v6.2.4-131-ga9cdd4cef) starting
[...]
7bff708[REDACTED]31e5ed1:c8b5adf92be0:e80410d52f0c:OFFSEC:CompanyNetworkPassword
2e48084[REDACTED]418e6e5:c8b5adf8d7e0:e80410d52f0c:OFFSEC:CompanyNetworkPassword
ec42192[REDACTED]4d32ad18:8ce7481dfb9a:ac49dbada3b8:OFFSEC:CompanyNetworkPassword
576f360[REDACTED]665cedfef:c8b5adf8d7e1:e80410d52f0c:OFFSEC-G:welkom@offsec
8b9901e[REDACTED]8d0edc21672:8ce7481dfb99:703c69cd5fec:OFFSEC-G:welkom@offsec
61fa5d2[REDACTED]07d2585f44:c8b5adf92be1:e80410d52f0c:OFFSEC-G:welkom@offsec
                                                          
Session..........: hashcat
Status...........: Cracked
[...]
```

### Bettercap

You can also capture handshakes / PMKID with [bettercap]({{< ref "bettercap" >}})

```plain
$ ./hcxpcapngtool -o output bettercap-wifi-handshakes.pcap 
reading from bettercap-wifi-handshakes.pcap...

summary capture file
--------------------
file name................................: bettercap-wifi-handshakes.pcap
version (pcap/cap).......................: 2.4 (very basic format without any additional information)
timestamp minimum (GMT)..................: 25.01.2021 09:55:58
timestamp maximum (GMT)..................: 25.01.2021 10:12:44
used capture interfaces..................: 1
link layer header type...................: DLT_IEEE802_11_RADIO (127)
endianess (capture system)...............: little endian
packets inside...........................: 11
frames with correct FCS..................: 11
BEACON (total)...........................: 2
REASSOCIATIONREQUEST (total).............: 1
REASSOCIATIONREQUEST (PSK)...............: 1
EAPOL messages (total)...................: 8
EAPOL RSN messages.......................: 8
ESSID (total unique).....................: 2
EAPOLTIME gap (measured maximum usec)....: 31667
EAPOL ANONCE error corrections (NC)......: not detected
EAPOL M1 messages (total)................: 2
EAPOL M2 messages (total)................: 3
EAPOL M3 messages (total)................: 3
EAPOL pairs (total)......................: 5
EAPOL pairs (best).......................: 3
EAPOL pairs written to combi hash file...: 3 (RC checked)
EAPOL M32E2 (authorized).................: 3

Warning: out of sequence timestamps!
This dump file contains frames with out of sequence timestamps.
That is a bug of the capturing tool.

Warning: missing frames!
This dump file does not contain undirected proberequest frames.
An undirected proberequest may contain information about the PSK.
It always happens if the capture file was cleaned or
it could happen if filter options are used during capturing.
That makes it hard to recover the PSK.


session summary
---------------
processed cap files...................: 1
```
