---
title : "nmcli"
# pre : '<i class="fas fa-code"></i> '
description : "Command-line tool for controlling NetworkManager."
date : 2020-03-13T14:34:22+01:00
# hidden : true
# draft : true
weight : 680
tags : ['Unix','Networking']
---

---

## Installation

```plain
sudo apt install network-manager
```

## Usage

```plain
nmcli [OPTIONS] OBJECT { COMMAND | help }
```

## Flags

```plain
Usage: nmcli [OPTIONS] OBJECT { COMMAND | help }

OPTIONS
  -a, --ask                                ask for missing parameters
  -c, --colors auto|yes|no                 whether to use colors in output
  -e, --escape yes|no                      escape columns separators in values
  -f, --fields <field,...>|all|common      specify fields to output
  -g, --get-values <field,...>|all|common  shortcut for -m tabular -t -f
  -h, --help                               print this help
  -m, --mode tabular|multiline             output mode
  -o, --overview                           overview mode
  -p, --pretty                             pretty output
  -s, --show-secrets                       allow displaying passwords
  -t, --terse                              terse output
  -v, --version                            show program version
  -w, --wait <seconds>                     set timeout waiting for finishing operations

OBJECT
  g[eneral]       NetworkManager's general status and operations
  n[etworking]    overall networking control
  r[adio]         NetworkManager radio switches
  c[onnection]    NetworkManager's connections
  d[evice]        devices managed by NetworkManager
  a[gent]         NetworkManager secret agent or polkit agent
  m[onitor]       monitor NetworkManager changes
```

## Examples

### Show current interface status (standard)

```plain
nmcli device status

DEVICE          TYPE      STATE         CONNECTION  
wlp4s0          wifi      connected     Network-A
enp0s31f6       ethernet  unavailable   --
```

### Show current interface status (extended)

```plain
nmcli

wlp4s0: connected to WiFi
        "Intel 8265 / 8275"
        wifi (iwlwifi), AC:00:00:00:00:01, hw, mtu 1500
        ip4 default
        inet4 10.20.30.10/24
        route4 0.0.0.0/0
        route4 10.20.30.0/24
        route4 169.254.0.0/16
        inet6 fe80::fd53:581d:b57d:af7b/64
        route6 fe80::/64
        route6 ff00::/8

enp0s31f6: unavailable
        "Intel Ethernet"
        ethernet (e1000e), AC:00:00:00:00:02, hw, mtu 1500

DNS configuration:
        servers: 10.20.30.2 10.20.30.3
        domains: lan
        interface: wlp4s0
```

### Show all Wi-Fi networks in range

```plain
nmcli device wifi list
IN-USE  SSID         MODE   CHAN  RATE        SIGNAL  BARS  SECURITY  
*       Network-A    Infra  108   270 Mbit/s  62      ▂▄▆_  WPA2
        Network-B    Infra  108   270 Mbit/s  60      ▂▄▆_  WPA2
        Network-C    Infra  11    130 Mbit/s  47      ▂▄__  WPA2
        Network-D    Infra  11    130 Mbit/s  45      ▂▄__  WPA2
```

### Analyze Wi-Fi network

```plain
$ nmcli d wifi
IN-USE  BSSID              SSID                   MODE   CHAN  RATE        SIGNAL  BARS  SECURITY    
        AB:CD:EF:G9:2B:E1  Cordless-G                   Infra  11    130 Mbit/s  89      ▂▄▆█  WPA2 WPA3   
        AB:CD:EF:G9:2B:E0  Cordless                     Infra  11    130 Mbit/s  87      ▂▄▆█  WPA2        
        AB:CD:EF:G8:D7:E0  Cordless                     Infra  1     130 Mbit/s  65      ▂▄▆_  WPA2        
        AB:CD:EF:GH:IJ:E9  The Boss                     Infra  2     405 Mbit/s  65      ▂▄▆_  WPA1 WPA2   
        AB:CD:EF:G9:2B:F1  Cordless-G                   Infra  36    405 Mbit/s  60      ▂▄▆_  WPA2 WPA3   
        AB:CD:EF:G8:D7:E1  Cordless-G                   Infra  1     130 Mbit/s  59      ▂▄▆_  WPA2 WPA3   
```

## URL List

- [Linux.man.die](https://linux.die.net/man/1/nmcli)
- [Developer.gnome.org](https://developer.gnome.org/NetworkManager/stable/nmcli.html)
