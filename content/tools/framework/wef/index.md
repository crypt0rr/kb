---
title : "WEF"
# pre : ' '
description : "Wi-Fi Exploitation Framework."
date : 2022-07-28T14:30:28+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## WEF - 📡 Wi-Fi Exploitation Framework 📡

<img src="https://raw.githubusercontent.com/D3Ext/WEF/main/images/WEF.png" width=1110 height=500>

A fully offensive framework to the 802.11 networks and protocols with different types of attacks for WPA/WPA2 and WEP, automated hash cracking, bluetooth hacking and much more.

Tested and supported in **Kali Linux**, **Parrot OS**, **Arch Linux** and **Ubuntu**

**However it's not finished and may have issues, try it at your own risk.**

* I recommend you my alfa adapter: **Alfa AWUS036ACM**, which works really great with both, 2.4 and 5 Ghz
* If you have any doubt, please contact me or create a issue

## ⭕ SUPPORTED ATTACKS

* Deauthentication Attack
* Authentication Attack
* Beacon Flood Attack
* PMKID Attack
* EvilTwin Attack
* Passive/Stealthy Attack
* Pixie Dust Attack
* Null Pin Attack
* Chopchop Attack
* Replay Attack
* Michael Exploitation Attack
* Caffe-Latte Attack
* Jamming, Reading and Writing bluetooth connections
* GPS Spoofing with HackRF

## ⭕ FEATURES

* Log generator
* WPA/WPA2, WPS and WEP Attacks
* Auto handshake cracking
* Multiple templates for EvilTwin attack
* Check monitor mode and it status
* 2Ghz and 5Ghz attacks
* Custom wordlist selector
* Auto detect requirements
* Bluetooth support (Jamming, Reading, Writing)

### Installation

As root.

```plain
git clone https://github.com/D3Ext/WEF
cd WEF
bash setup.sh
```

### Usage

```plain
wef -i [INTERFACE]
```

### Options

```plain
Type 'help' to view more functions

[+] The network card mode:      Monitor
[+] Your network interface:     wlan0
[+] Your actual MAC address:    00:13:37:42:0f:14

[1] Beacon Flood Attack      [10] Pixie Dust Attack
[2] Deauthentication Attack  [11] Caffe-Latte Attack
[3] Authentication Attack    [12] ChopChop Attack
[4] PMKID Attack             [13] Michael Exploitation Attack
[5] Passive Attack           [14] Replay Attack
[6] Randomize MAC address    [15] Null Pin Attack
[7] Start network card
[8] Evil Twin Attack
[9] Attacks info

[WiFi] Choose an option > help

  Command             Description
  -------             -----------
  scan                - Scan APs during 20s
  set                 - Use 'set' to define the AP name, the time or the packets before the attack
  exit/quit           - Exit from the framework
  chipsets            - List the chipsets which supports monitor mode
  modules             - Show the availables modules
  load <module_name>  - Load a different module
  hosts               - Perform a fast and stealthy host scan
  help/?              - Print this help panel
  inhibite <ap_name>  - Inhibite an AP until you press Ctrl + C
  extra               - Print a list of extra commands and utilities
  info                - Show info about your network adapter
  verbose             - Set verbose on, to see more output
  no verbose          - Set verbose off, to see a quiet interface
  check               - Check all the credentials submitted in the EvilTwin attack
  enable/disable auto - Enable/disable the automatic deletion of the EvilTwin creds every week
  attacks             - Show the info about the different attacks
  update              - Check if an update is available and ask you to install it
  version             - Print the info about the version of wef
  exec                - Allow you to execute commands without exiting
  panel               - Display the panel with the options
  clear/cls           - Clear the screen without exiting
```

### Examples

#### Scan available networks

```plain
██╗    ██╗███████╗███████╗
██║    ██║██╔════╝██╔════╝               
██║ █╗ ██║█████╗  █████╗                 
██║███╗██║██╔══╝  ██╔══╝       [WEF] WiFi Exploitation Framework 1.0
╚███╔███╔╝███████╗██║                    
 ╚══╝╚══╝ ╚══════╝╚═╝     
   

Type 'help' to view more functions

[+] The network card mode:     Monitor
[+] Your network interface:     wlan0
[+] Your actual MAC address:     00:c0:ca:a5:ff:14

[1] Beacon Flood Attack      [10] Pixie Dust Attack
[2] Deauthentication Attack  [11] Caffe-Latte Attack
[3] Authentication Attack    [12] ChopChop Attack
[4] PMKID Attack             [13] Michael Exploitation Attack
[5] Passive Attack           [14] Replay Attack
[6] Randomize MAC address    [15] Null Pin Attack
[7] Start network card
[8] Evil Twin Attack
[9] Attacks info

[WiFi] Choose an option > scan

BSSID               Ch  dBm  WPS  Lck  Vendor    ESSID
--------------------------------------------------------------------------------
DE:12:34:56:CB:E9    2  -40            AtherosC  Production
CC:32:43:56:CB:E9    2  -42  2.0  No   AtherosC  Guests
3C:23:13:51:61:7E    8  -52  2.0  No   AtherosC  MoreGuests


[+] Scan completed
```

#### PMKID Attack

```plain

 █     █░▓█████   █████▒
▓█░ █ ░█░▓█   ▀ ▓██   ▒ 
▒█░ █ ░█ ▒███   ▒████ ░     [WEF] WiFi Exploitation Framework 1.0
░█░ █ ░█ ▒▓█  ▄ ░▓█▒  ░ 
░░██▒██▓ ░▒████▒░▒█░    
░ ▓░▒ ▒  ░░ ▒░ ░ ▒ ░    
  ▒ ░ ░   ░ ░  ░ ░      
  ░   ░     ░    ░ ░    
    ░       ░  ░        


Type 'help' to view more functions

[+] The network card mode:     Monitor
[+] Your network interface:     wlan0
[+] Your actual MAC address:     00:c0:ca:a5:ff:14

[1] Beacon Flood Attack      [10] Pixie Dust Attack
[2] Deauthentication Attack  [11] Caffe-Latte Attack
[3] Authentication Attack    [12] ChopChop Attack
[4] PMKID Attack             [13] Michael Exploitation Attack
[5] Passive Attack           [14] Replay Attack
[6] Randomize MAC address    [15] Null Pin Attack
[7] Start network card
[8] Evil Twin Attack
[9] Attacks info

[WiFi] Choose an option > 4

BSSID               Ch  dBm  WPS  Lck  Vendor    ESSID
--------------------------------------------------------------------------------
DE:12:34:56:CB:E9    2  -40            AtherosC  Production
CC:32:43:56:CB:E9    2  -42  2.0  No   AtherosC  Guests
3C:23:13:51:61:7E    8  -52  2.0  No   AtherosC  MoreGuests

[*] Name of the target AP: Production

[*] Duration of the attack (default=180): 180

[*] Starting PMKID attack...

[*] Obtaining hashes...

[+] PMKID Attack completed

[*] Logs stored in: /opt/wef/main/logs/Production.log 

[*] Hashes stored in: /opt/wef/main/captures/Production/ 

[*] Do you want to crack the handshake? [y/n]: n
```

### URL list

* [Github.com - WEF](https://github.com/D3Ext/WEF)
