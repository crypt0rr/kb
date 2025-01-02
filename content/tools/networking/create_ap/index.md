---
title : "Create_ap"
# pre : ' '
description : "This script creates a NATed or Bridged WiFi Access Point."
date : 2023-08-22T09:17:01+02:00
# hidden : true
# draft : true
weight : 130
tags : ['Networking', 'WiFi']
---

---

This script creates a NATed or Bridged WiFi Access Point.

## Features

Features

- Create an AP (Access Point) at any channel.
- Choose one of the following encryptions: WPA, WPA2, WPA/WPA2, Open (no encryption).
- Hide your SSID.
- Disable communication between clients (client isolation).
- IEEE 802.11n & 802.11ac support
- Internet sharing methods: NATed or Bridged or None (no Internet sharing).
- Choose the AP Gateway IP (only for 'NATed' and 'None' Internet sharing methods).
- You can create an AP with the same interface you are getting your Internet connection.
- You can pass your SSID and password through pipe or through arguments (see examples).

## Installation

### Kali

```plain
sudo apt-get install haveged hostapd git util-linux procps iproute2 iw dnsmasq iptables
git clone https://github.com/oblique/create_ap
cd create_ap
sudo make install
cd .. && rm -rf create_ap
```

### Linux (Debian, Mint, Ubuntu)

```plain
sudo apt-get install haveged hostapd git util-linux procps iproute2 iw dnsmasq iptables
git clone https://github.com/oblique/create_ap
cd create_ap
sudo make install
cd .. && rm -rf create_ap
```

## Usage

```plain
create_ap [options] <wifi-interface> [<interface-with-internet>] [<access-point-name> [<passphrase>]]
```

## Flags

```plain
Options:
  -h, --help              Show this help
  --version               Print version number
  -c <channel>            Channel number (default: 1)
  -w <WPA version>        Use 1 for WPA, use 2 for WPA2, use 1+2 for both (default: 1+2)
  -n                      Disable Internet sharing (if you use this, don't pass
                          the <interface-with-internet> argument)
  -m <method>             Method for Internet sharing.
                          Use: 'nat' for NAT (default)
                               'bridge' for bridging
                               'none' for no Internet sharing (equivalent to -n)
  --psk                   Use 64 hex digits pre-shared-key instead of passphrase
  --hidden                Make the Access Point hidden (do not broadcast the SSID)
  --mac-filter            Enable MAC address filtering
  --mac-filter-accept     Location of MAC address filter list (defaults to /etc/hostapd/hostapd.accept)
  --redirect-to-localhost If -n is set, redirect every web request to localhost (useful for public information networks)
  --hostapd-debug <level> With level between 1 and 2, passes arguments -d or -dd to hostapd for debugging.
  --isolate-clients       Disable communication between clients
  --ieee80211n            Enable IEEE 802.11n (HT)
  --ieee80211ac           Enable IEEE 802.11ac (VHT)
  --ht_capab <HT>         HT capabilities (default: [HT40+])
  --vht_capab <VHT>       VHT capabilities
  --country <code>        Set two-letter country code for regularity (example: US)
  --freq-band <GHz>       Set frequency band. Valid inputs: 2.4, 5 (default: 2.4)
  --driver                Choose your WiFi adapter driver (default: nl80211)
  --no-virt               Do not create virtual interface
  --no-haveged            Do not run 'haveged' automatically when needed
  --fix-unmanaged         If NetworkManager shows your interface as unmanaged after you
                          close create_ap, then use this option to switch your interface
                          back to managed
  --mac <MAC>             Set MAC address
  --dhcp-dns <IP1[,IP2]>  Set DNS returned by DHCP
  --daemon                Run create_ap in the background
  --pidfile <pidfile>     Save daemon PID to file
  --logfile <logfile>     Save daemon messages to file
  --stop <id>             Send stop command to an already running create_ap. For an <id>
                          you can put the PID of create_ap or the WiFi interface. You can
                          get them with --list-running
  --list-running          Show the create_ap processes that are already running
  --list-clients <id>     List the clients connected to create_ap instance associated with <id>.
                          For an <id> you can put the PID of create_ap or the WiFi interface.
                          If virtual WiFi interface was created, then use that one.
                          You can get them with --list-running
  --mkconfig <conf_file>  Store configs in conf_file
  --config <conf_file>    Load configs from conf_file

Non-Bridging Options:
  --no-dns                Disable dnsmasq DNS server
  --no-dnsmasq            Disable dnsmasq server completely
  -g <gateway>            IPv4 Gateway for the Access Point (default: 192.168.12.1)
  -d                      DNS server will take into account /etc/hosts
  -e <hosts_file>         DNS server will take into account additional hosts file

Useful informations:
  * If you're not using the --no-virt option, then you can create an AP with the same
    interface you are getting your Internet connection.
  * You can pass your SSID and password through pipe or through arguments (see examples).
  * On bridge method if the <interface-with-internet> is not a bridge interface, then
    a bridge interface is created automatically.

Examples:
  create_ap wlan0 eth0 MyAccessPoint MyPassPhrase
  echo -e 'MyAccessPoint\nMyPassPhrase' | create_ap wlan0 eth0
  create_ap wlan0 eth0 MyAccessPoint
  echo 'MyAccessPoint' | create_ap wlan0 eth0
  create_ap wlan0 wlan0 MyAccessPoint MyPassPhrase
  create_ap -n wlan0 MyAccessPoint MyPassPhrase
  create_ap -m bridge wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap -m bridge wlan0 br0 MyAccessPoint MyPassPhrase
  create_ap --driver rtl871xdrv wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap --daemon wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap --stop wlan0
```

## Examples

### Basic OPEN Network

```plain
sudo create_ap wlan0 eth0 OpenWiFiNetwork
```

### Basic Protected Network (WPA1+2)

To only use WPA2, which is recommended, use the `-w2` flag.

```plain
sudo create_ap wlan0 eth0 MyProtectedNetwork 1337Password420
```

### Routing Traffic Through PortSwigger BurpSuite

In BurpSuite proxy settings: Enable "Support invisible proxying"

```plain
sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 53 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 443 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 443 -j REDIRECT --to-port 8080
```

## URL list

- [Github.com - create_ap](https://github.com/oblique/create_ap)
- [Kali.tools - create_ap](https://en.kali.tools/?p=270)
