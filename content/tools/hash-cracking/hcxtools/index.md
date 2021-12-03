---
title : "hcxtools"
# pre : ' '
description : "Small set of tools convert packets from captures (h = hash, c = capture, convert and calculate candidates, x = different hashtypes) for the use with latest hashcat or John the Ripper."
date : 2021-01-25T09:33:55+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Hcxtools

Small set of tools convert packets from captures (h = hash, c = capture, convert and calculate candidates, x = different hashtypes) for the use with latest hashcat or John the Ripper.

Pre-build binaries (build on Kali 2021, 19-04-2021)

{{%attachments title="Related files" fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

### Installation

```plain
git clone https://github.com/ZerBea/hcxtools
make
make install
```

### Usage

```plain
./hcxpcapngtool <options>
```

### Flags

```plain
hcxpcapngtool 6.1.5-8-g7ac7564 (C) 2021 ZeroBeat
convert pcapng, pcap and cap files to hash formats that hashcat and JtR use
usage:
hcxpcapngtool <options>
hcxpcapngtool <options> input.pcapng
hcxpcapngtool <options> *.pcapng
hcxpcapngtool <options> *.pcap
hcxpcapngtool <options> *.cap
hcxpcapngtool <options> *.*

short options:
-o <file> : output WPA-PBKDF2-PMKID+EAPOL (hashcat -m 22000)hash file
            get full advantage of reuse of PBKDF2 over PMKID and EAPOL
-E <file> : output wordlist (autohex enabled on non ASCII characters) to use as input wordlist for cracker
            retrieved from every frame that contain an ESSID
-R <file> : output wordlist (autohex enabled on non ASCII characters) to use as input wordlist for cracker
            retrieved from PROBEREQUEST frames only
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
--eapleap=<file>                   : output EAP LEAP and MSCHAPV2 CHALLENGE (hashcat -m 5500, john netntlm)
--tacacs-plus=<file>               : output TACACS PLUS (hashcat -m 16100, john tacacs-plus)
--nmea=<file>                      : output GPS data in NMEA format
                                     format: NMEA 0183 $GPGGA, $GPRMC, $GPWPL
                                     to convert it to gpx, use GPSBabel:
                                     gpsbabel -i nmea -f hcxdumptool.nmea -o gpx,gpxver=1.1 -F hcxdumptool.gpx
                                     to display the track, open file.gpx with viking
--csv=<file>                       : output ACCESS POINT information in CSV format
                                     delimiter: tabulator (0x08)
                                     columns:
                                     YYYY-MM-DD HH:MM:SS MAC_AP ESSID ENC_TYPE CIPHER AKM COUNTRY_INFO CHANNEL RSSI
                                     to convert it to other formats, use bash tools or scripting languages
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
                                      -o <file.22000>           : output PMKID/EAPOL hash file
                                      -E <file.essid>           : output wordlist (autohex enabled on non ASCII characters) to use as input wordlist for cracker
                                      -I <file.identitiy>       : output unsorted identity list to use as input wordlist for cracker
                                      -U <file.username>        : output unsorted username list to use as input wordlist for cracker
                                     --eapmd5=<file.4800>       : output EAP MD5 CHALLENGE (hashcat -m 4800)
                                     --eapleap=<file.5500>      : output EAP LEAP and MSCHAPV2 CHALLENGE (hashcat -m 5500, john netntlm)
                                     --tacacs-plus=<file.16100> : output TACACS+ (hashcat -m 16100, john tacacs-plus)
                                     --nmea=<file.nmea>         : output GPS data in NMEA format
--help                             : show this help
--version                          : show version

bitmask for message pair field:
bit 0-2
 000 = M1+M2, EAPOL from M2 (challenge)
 001 = M1+M4, EAPOL from M4 if not zeroed (authorized)
 010 = M2+M3, EAPOL from M2 (authorized)
 011 = M2+M3, EAPOL from M3 (authorized) - unused
 100 = M3+M4, EAPOL from M3 (authorized) - unused
 101 = M3+M4, EAPOL from M4 if not zeroed (authorized)
3: reserved
4: ap-less attack (set to 1) - no nonce-error-corrections necessary
5: LE router detected (set to 1) - nonce-error-corrections only for LE necessary
6: BE router detected (set to 1) - nonce-error-corrections only for BE necessary
7: not replaycount checked (set to 1) - replaycount not checked, nonce-error-corrections definitely necessary

Do not edit, merge or convert pcapng files! This will remove optional comment fields!
Detection of bit errors does not work on cleaned dump files!
Do not use hcxpcapngtool in combination with third party cap/pcap/pcapng cleaning tools (except: tshark and/or Wireshark)!
It is much better to run gzip to compress the files. Wireshark, tshark and hcxpcapngtool will understand this.
Recommended tool to convert to hash formats accepted by hashcat and john: hcxpcapngtool
Recommended tools to show additional 802.11 fields or to decrypt WiFi traffic: Wireshark and/or tshark
```

### Examples

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

### URL list

* [Github.com - hcxtools](https://github.com/ZerBea/hcxtools)
