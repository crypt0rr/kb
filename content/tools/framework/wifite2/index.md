---
title : "Wifite2"
# pre : ' '
description : "Rewrite of the popular wireless network auditor, 'wifite' - automated wireless auditor."
date : 2022-02-21T12:10:24+01:00
# hidden : true
# draft : true
weight : 420
tags : ['Framework', 'WiFi']
---

---

This repo is a complete re-write of [wifite](https://github.com/derv82/wifite), a Python script for auditing wireless networks.

Wifite runs existing wireless-auditing tools for you. Stop memorizing command arguments & switches!

Wifite is designed to use all known methods for retrieving the password of a wireless access point (router). These methods include:

1. WPS: The [Offline Pixie-Dust attack](https://en.wikipedia.org/wiki/Wi-Fi_Protected_Setup#Offline_brute-force_attack)
2. WPS: The [Online Brute-Force PIN attack](https://en.wikipedia.org/wiki/Wi-Fi_Protected_Setup#Online_brute-force_attack)
3. WPA: The [WPA Handshake Capture](https://hashcat.net/forum/thread-7717.html) + offline crack.
4. WPA: The [PMKID Hash Capture](https://hashcat.net/forum/thread-7717.html) + offline crack.
5. WEP: Various known attacks against WEP, including *fragmentation*, *chop-chop*, *aireplay*, etc.

Run wifite, select your targets, and Wifite will automatically start trying to capture or crack the password.

## Installation

```plain
git clone https://github.com/derv82/wifite2.git
```

### Requirements

```plain
sudo apt install aircrack-ng reaver bully tshark hcxtools
```

## Usage

```plain
sudo ./Wifite.py
```

### Reset after use

```plain
sudo airmon-ng stop <device>mon
```

## Flags

```plain
   .               .    
 .´  ·  .     .  ·  `.  wifite 2.2.5
 :  :  :  (¯)  :  :  :  automated wireless auditor
 `.  ·  ` /¯\ ´  ·  .´  https://github.com/derv82/wifite2
   `     /¯¯¯\     ´    

optional arguments:
  -h, --help             show this help message and exit

SETTINGS:
  -v, --verbose          Shows more options (-h -v). Prints commands and outputs. (default: quiet)
  -i [interface]         Wireless interface to use, e.g. wlan0mon (default: ask)
  -c [channel]           Wireless channel to scan (default: all 2Ghz channels)
  -mac, --random-mac     Randomize wireless card MAC address (default: off)
  -p [scan_time]         Pillage: Attack all targets after scan_time (seconds)
  --kill                 Kill processes that conflict with Airmon/Airodump (default: off)
  --clients-only         Only show targets that have associated clients (default: off)
  --nodeauths            Passive mode: Never deauthenticates clients (default: deauth targets)

WEP:
  --wep                  Show only WEP-encrypted networks
  --require-fakeauth     Fails attacks if fake-auth fails (default: off)
  --keep-ivs             Retain .IVS files and reuse when cracking (default: off)

WPA:
  --wpa                  Show only WPA-encrypted networks (includes WPS)
  --new-hs               Captures new handshakes, ignores existing handshakes in hs (default: off)
  --dict [file]          File containing passwords for cracking (default: ./wordlist-top4800-probable.txt)

WPS:
  --wps                  Show only WPS-enabled networks
  --wps-only             Only use WPS PIN & Pixie-Dust attacks (default: off)
  --bully                Use bully program for WPS PIN & Pixie-Dust attacks (default: reaver)
  --ignore-locks         Do not stop WPS PIN attack if AP becomes locked (default: stop)

PMKID:
  --pmkid                Only use PMKID capture, avoids other WPS & WPA attacks (default: off)
  --pmkid-timeout [sec]  Time to wait for PMKID capture (default: 30 seconds)

COMMANDS:
  --cracked              Print previously-cracked access points
  --check [file]         Check a .cap file (or all hs/*.cap files) for WPA handshakes
  --crack                Show commands to crack a captured handshake
```

## Examples

```plain
$ sudo ./Wifite.py             
   .               .    
 .´  ·  .     .  ·  `.  wifite 2.2.5
 :  :  :  (¯)  :  :  :  automated wireless auditor
 `.  ·  ` /¯\ ´  ·  .´  https://github.com/derv82/wifite2
   `     /¯¯¯\     ´    

 [!] Warning: Recommended app pyrit was not found. install @ https://github.com/JPaulMora/Pyrit/wiki
 [!] Conflicting processes: avahi-daemon (PID 1816), NetworkManager (PID 1824), wpa_supplicant (PID 1868), avahi-daemon (PID 1889)
 [!] If you have problems: kill -9 PID or re-run wifite with --kill)

    Interface   PHY   Driver              Chipset                                                                                                                                                                                                                                                                         
-----------------------------------------------------------------------
 1. wlp4s0      phy0  iwlwifi             Intel Corporation Wireless 8265 / 8275 (rev 78)

 [+] enabling monitor mode on wlp4s0... enabled wlp4s0mon

   NUM                      ESSID   CH  ENCR  POWER  WPS?  CLIENT
   ---  -------------------------  ---  ----  -----  ----  ------
     1                     OFFSEC    11   WPA   42db    no    1
     2               OFFSEC-GUEST    11   WPA   42db    no    3

 [+] select target(s) (1-28) separated by commas, dashes or all: 2                              
 [+] (1/1) Starting attacks against C8:12:34:56:78:E1 (OFFSEC-GUEST)
 [+] OFFSEC-GUEST (42db) PMKID CAPTURE: Failed to capture PMKID 
 [+] OFFSEC-GUEST (43db) WPA Handshake capture: Discovered new client: 70:12:34:56:78:EC                                
 [+] OFFSEC-GUEST (43db) WPA Handshake capture: Captured handshake                                              
 [+] saving copy of handshake to hs/handshake_OFFSECGUEST_C8:12:34:56:78:E1_2022-02-21T12-22-55.cap saved
 [+] analysis of captured handshake file:
 [+]   tshark: .cap file contains a valid handshake for C8:12:34:56:78:E1
 [!] aircrack: .cap file does not contain a valid handshake

 [+] Cracking WPA Handshake: Running aircrack-ng with wordlist-top4800-probable.txt wordlist

 [!] Failed to crack handshake: wordlist-top4800-probable.txt did not contain password
 [+] Finished attacking 1 target(s), exiting
 [!] Note: Leaving interface in Monitor Mode!
 [!] To disable Monitor Mode when finished: airmon-ng stop wlp4s0mon
```

## URL List

- [Github.com - Wifite2](https://github.com/derv82/wifite2)
