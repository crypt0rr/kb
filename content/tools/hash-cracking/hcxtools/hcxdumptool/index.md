---
title : "hcxdumptool"
# pre : ' '
description : "Attack and capture everything (depending on options)."
date : 2022-02-23T12:01:07+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

## Installation

Install [hcxtools]({{< ref "../hcxtools" >}}).

## Usage

```plain
hcxdumptool <options>
```

## Flags

```plain
hcxdumptool 6.0.5  (C) 2020 ZeroBeat
         press the switch to terminate hcxdumptool
         hardware modification is necessary, read more:
         https://github.com/ZerBea/hcxdumptool/tree/master/docs

         do not run hcxdumptool on logical (NETLINK) interfaces (monx, wlanxmon)
         do not use hcxdumptool in combination with 3rd party tools, which take access to the interface (except: tshark, wireshark, tcpdump)

short options:
-i <interface> : interface (monitor mode will be enabled by hcxdumptool)
                 some Realtek interfaces require NETLINK to set monitor mode
                 in this case try iw:
                 ip link set <interface> down
                 iw dev <interface> set type monitor
                 ip link set <interface> up
                 WARNING:
                  hcxdumptool may not work as expected on virtual NETLINK interfaces
                  do not report issues related to iw
-o <dump file> : output file in pcapng format
                 including radiotap header (LINKTYPE_IEEE802_11_RADIOTAP)
-f <frames>    : frames to save
                 bitmask:
                  0: clear default values
                  1: MANAGEMENT frames (default)
                  2: EAP and EAPOL frames (default)
                  4: IPV4 frames
                  8: IPV6 frames
                 16: WEP encrypted frames
                 32: WPA encrypted frames
                 to clear default values use -f 0 first, followed by desired frame type (e.g. -f 0 -f 4)
-c <digit>     : set scan list (1,2,3, ...)
                 default scan list: 1...13
                 maximum entries: 127
                 allowed channels (depends on the device):
                 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
                 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 68, 96
                 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128
                 132, 134, 136, 138, 140, 142, 144, 149, 151, 153, 155, 157, 159
                 161, 165, 169, 173
-t <seconds>   : stay time on channel before hopping to the next channel
                 default 4 seconds
-m <interface> : set monitor mode by ioctl() system call and quit
-I             : show WLAN interfaces and quit
-C             : show available channels and quit
                 if no channels are available, interface is probably in use or doesn't support monitor mode

long options:
--do_rcascan                       : show radio channel assignment (scan for target access points)
                                     this can be used to test that ioctl() calls and packet injection is working
                                     if you got no HIT, packet injection is possible not working
                                     also it can be used to get information about the target
                                     and to determine that the target is in range
                                     use this mode to collect data for the filter list
                                     run this mode at least for 2 minutes
                                     to save all received raw packets use option -o
--reason_code=<digit>              : deauthentication reason code
                                      recommended codes:
                                      1 WLAN_REASON_UNSPECIFIED
                                      2 WLAN_REASON_PREV_AUTH_NOT_VALID
                                      4 WLAN_REASON_DISASSOC_DUE_TO_INACTIVITY
                                      5 WLAN_REASON_DISASSOC_AP_BUSY
                                      6 WLAN_REASON_CLASS2_FRAME_FROM_NONAUTH_STA
                                      7 WLAN_REASON_CLASS3_FRAME_FROM_NONASSOC_STA (default)
                                      9 WLAN_REASON_STA_REQ_ASSOC_WITHOUT_AUTH
--disable_client_attacks           : do not attack clients
                                     affected: ap-less (EAPOL 2/4 - M2) attack
--disable_ap_attacks               : do not attack access points
                                     affected: connected clients and client-less (PMKID) attack
--stop_ap_attacks=<digit>          : stop attacks against ACCESS POINTs if <n> BEACONs received
                                     default: stop after 600 BEACONs
--resume_ap_attacks=<digit>        : resume attacks against ACCESS POINTs after <n> BEACONs received
                                     default: 864000 BEACONs
--disable_deauthentication         : do not send deauthentication or disassociation frames
                                     affected: conntected clients
--silent                           : do not transmit!
                                     hcxdumptool is acting like a passive dumper
                                     expect possible packet loss
--eapoltimeout=<digit>             : set EAPOL TIMEOUT (microseconds)
                                     default: 20000 usec
--bpfc=<file>                      : input Berkeley Packet Filter (BPF) code
                                     steps to create a BPF (it only has to be done once):
                                      set hcxdumptool monitormode
                                       $ hcxumptool -m <interface>
                                      create BPF to protect a MAC
                                       $ tcpdump -i <interface> not wlan addr1 11:22:33:44:55:66 and not wlan addr2 11:22:33:44:55:66 -ddd > protect.bpf
                                       recommended to protect own devices
                                      or create BPF to attack a MAC
                                       $ tcpdump -i <interface> wlan addr1 11:22:33:44:55:66 or wlan addr2 11:22:33:44:55:66 -ddd > attack.bpf
                                       not recommended, because important pre-authentication frames will be lost due to MAC randomization of the CLIENTs
                                      use the BPF code
                                       $ hcxumptool -i <interface> --bpfc=attack.bpf ...
                                     see man pcap-filter for a list of all filter options
--filterlist_ap=<file>             : ACCESS POINT MAC filter list
                                     format: 112233445566 + comment
                                     maximum entries 256
                                     run first --do_rcascan to retrieve information about the target
--filterlist_client=<file>         : CLIENT MAC filter list
                                     format: 112233445566 # comment
                                     maximum entries 256
                                     due to MAC randomization of the CLIENT, it does not always work!
--filtermode=<digit>               : mode for filter list
                                     mandatory in combination with --filterlist_ap and/or --filterlist_client
                                     0: ignore filter list (default)
                                     1: use filter list as protection list
                                        do not interact with ACCESS POINTs and CLIENTs from this list
                                     2: use filter list as target list
                                        only interact with ACCESS POINTs and CLIENTs from this list
                                        not recommended, because important pre-authentication frames will be lost due to MAC randomization of the CLIENTs
--weakcandidate=<password>         : use this pre shared key (8...63 characters) for weak candidate alert
                                     will be saved to pcapng to inform hcxpcaptool
                                     default: 
--mac_ap                           : use this MAC as ACCESS POINT MAC instead of a randomized one
                                     format: 112233445566
--mac_client                       : use this MAC as CLIENT MAC instead of a randomized one
                                     format: 112233445566
--essidlist=<file>                 : transmit beacons from this ESSID list
                                     maximum entries: 256 ESSIDs
--active_beacon                    : transmit beacon once every 200000 usec
                                     affected: ap-less
--flood_beacon                     : transmit beacon on every received beacon
                                     affected: ap-less
--infinity                         : prevent that a CLIENT can establish a connection to an assigned ACCESS POINT
                                     affected: ACCESS POINTs and CLIENTs
--use_gps_device=<device>          : use GPS device
                                     /dev/ttyACM0, /dev/ttyUSB0, ...
                                     NMEA 0183 $GPGGA $GPGGA
--use_gpsd                         : use GPSD device
                                     NMEA 0183 $GPGGA, $GPRMC
--nmea=<file>                      : save track to file
                                     format: NMEA 0183 $GPGGA, $GPRMC, $GPWPL
                                     to convert it to gpx, use GPSBabel:
                                     gpsbabel -i nmea -f hcxdumptool.nmea -o gpx -F file.gpx
                                     to display the track, open file.gpx with viking
--gpio_button=<digit>              : Raspberry Pi GPIO pin number of button (2...27)
                                     default = GPIO not in use
--gpio_statusled=<digit>           : Raspberry Pi GPIO number of status LED (2...27)
                                     default = GPIO not in use
--tot=<digit>                      : enable timeout timer in minutes (minimum = 2 minutes)
                                   : hcxdumptool will terminate if tot reached (EXIT code = 2)
--error_max=<digit>                : terminate hcxdumptool if error maximum reached
                                     default: 100 errors
--reboot                           : once hcxdumptool terminated, reboot system
--poweroff                         : once hcxdumptool terminated, power off system
--enable_status=<digit>            : enable real-time display (waterfall)
                                     only incoming traffic
                                     only once at the first occurrence due to MAC randomization of CLIENTs
                                     bitmask:
                                        0: no status (default)
                                        1: EAP and EAPOL
                                        2: ASSOCIATION and REASSOCIATION
                                        4: AUTHENTICATION
                                        8: BEACON and PROBERESPONSE
                                       16: ROGUE AP
                                       32: GPS (once a minute)
                                       64: internal status (once a minute)
                                      128: run as server
                                      256: run as client
                                     characters < 0x20 && > 0x7e are replaced by .
                                     example: show everything but don't run as server or client (1+2+4+8+16 = 31)
                                              show only EAP and EAPOL and ASSOCIATION and REASSOCIATION (1+2 = 3)
--server_port=<digit>              : define port for server status output (1...65535)
                                   : default IP: 224.0.0.255
                                   : default port: 60123
--client_port=<digit>              : define port for client status read (1...65535)
                                   : default IP: 224.0.0.255
                                   : default port: 60123
--check_driver                     : run several tests to determine that driver support all(!) required ioctl() system calls
--check_injection                  : run packet injection test to determine that driver support full packet injection
                                     the driver must support monitor mode and full packet injection
                                     otherwise hcxdumptool will not work as expected
--help                             : show this help
--version                          : show version

Run hcxdumptool -i interface --do_rcascan for at least 30 seconds, to get information about the target!
Do not edit, merge or convert this pcapng files, because it will remove optional comment fields!
It is much better to run gzip to compress the files. Wireshark, tshark and hcxpcapngtool will understand this.
If hcxdumptool captured your password from WiFi traffic, you should check all your devices immediately!
If you use GPS, make sure GPS device is inserted and has a GPS FIX, before you start hcxdumptool!
```

## Examples

To start you have to stop both 'NetworkManager' and 'wpa_supplicant' service. After you're done, reverse this process by starting the services.

To start:

```plain
sudo systemctl stop NetworkManager.service
sudo systemctl stop wpa_supplicant.service
```

To stop:

```plain
sudo systemctl start NetworkManager.service
sudo systemctl start wpa_supplicant.service
```

### Capture of PMKID (all networks around)

```plain
$ sudo hcxdumptool -i wlp4s0 -o dumpfile.pcapng --active_beacon --enable_status=15
initialization...

start capturing (stop with ctrl+c)
NMEA 0183 SENTENCE........: N/A
INTERFACE NAME............: wlp4s0
INTERFACE HARDWARE MAC....: ac12345698c14
DRIVER....................: iwlwifi
DRIVER VERSION............: 5.15.11-76051511-generic
DRIVER FIRMWARE VERSION...: 36.ca7b901d.0 8265-36.ucode
ERRORMAX..................: 100 errors
BPF code blocks...........: 0
FILTERLIST ACCESS POINT...: 0 entries
FILTERLIST CLIENT.........: 0 entries
FILTERMODE................: unused
WEAK CANDIDATE............: 12345678
ESSID list................: 0 entries
ROGUE (ACCESS POINT)......: 8ce7481dfb97 (BROADCAST HIDDEN)
ROGUE (ACCESS POINT)......: 8ce74800fb98 (BROADCAST OPEN)
ROGUE (ACCESS POINT)......: 8ce7481dfb99 (incremented on every new client)
ROGUE (CLIENT)............: e80410d52f0c
EAPOLTIMEOUT..............: 20000 usec
REPLAYCOUNT...............: 64387
ANONCE....................: 2d27c84b6a739c47f0f42e5e038712d1c3add44a516b5972d144b424e3346035
SNONCE....................: 8eeedb3d57ab1b059ffa4da4c07bb43f790cf83f3d6d32c9e77fa3b82b768624

11:59:17   1 ffffffffffff c8[REDACTED]e0 OFFSEC [BEACON]
11:59:17   1 e80410d52f0c c8[REDACTED]e0 OFFSEC [PMKIDROGUE:2e48084[REDACTED]48b418e6e5 KDV:2]
11:59:18   1 ffffffffffff c8[REDACTED]e1 OFFSEC-G [BEACON]
11:59:19   1 e80410d52f0c c8[REDACTED]e1 OFFSEC-G [PMKIDROGUE:576f36[REDACTED]cedfef KDV:2]
11:59:24  11 ffffffffffff c8[REDACTED]e0 OFFSEC [BEACON]
11:59:24  11 ffffffffffff c8[REDACTED]e1 OFFSEC-G [BEACON]
11:59:25  11 e80410d52f0c c8[REDACTED]e1 OFFSEC-G [PMKIDROGUE:61fa5d[REDACTED]2585f44 KDV:2]
^C
terminating...
```

Use [hcxpcapngtool]({{< ref "hcxpcapngtool" >}}) to convert the `.pcap` to crackable hashes.

### Scan Wi-Fi networks in range

```plain
$ sudo hcxdumptool -i wlp4s0 --do_rcascan

 BSSID         CH COUNT   HIT ESSID                 [16:00:50]
---------------------------------------------------------------
 c8[REDACTED]e1  11    67     7 OFFSEC-G
 c8[REDACTED]e0  11    64     6 OFFSEC
 c8[REDACTED]e1   1    17     3 OFFSEC-G
```
