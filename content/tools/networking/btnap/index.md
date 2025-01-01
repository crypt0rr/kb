---
title : "BTNAP"
# pre : ' '
description : "Bluetooth Network Access Point for Raspberry Pi."
date : 2020-03-11T11:14:24+01:00
# hidden : true
# draft : true
weight : 80
tags : ['Networking', 'Bluetooth']
---

---

Bluetooth Network Access Point for Raspberry Pi.

## Installation

Dependencies

```plain
sudo apt install pulseaudio pulseaudio-module-zeroconf alsa-utils avahi-daemon pulseaudio-module-bluetooth
```

Server installation

```plain
git clone https://github.com/bablokb/pi-btnap.git
```

```plain
./pi-btnap/tools/install-btnap server
```

## Examples

Bluetooth startup configuration

```plain
vi /etc/systemd/system/bluetooth.target.wants/bluetooth.service
    ExecStart=/usr/lib/bluetooth/bluetoothd --noplugin=sap
```

Edit bluetooth device name

```plain
vi /etc/bluetooth/main.conf
```

Edit btnap configuration

```plain
vi /etc/btnap.conf
    ADD_IF="lo"
Remove IP from gateway
```

Enable required services

```plain
systemctl enable bluetooth
systemctl enable btnap
systemctl enable dnsmasq
reboot
```

Pair device

```plain
bluetoothctl
agent on
scan on
pair aa:bb:cc:dd:ee:ff
trust aa:bb:cc:dd:ee:ff
quit
```

Remove paired device

```plain
bluetoothctl
untrust aa:bb:cc:dd:ee:ff
remove aa:bb:cc:dd:ee:ff
```

### Install bluetooth Raspberry Pi 3

Show device

```plain
hciconfig -a
```

Install bluetooth manager

```plain
apt install blueman
```

Install bluetooth drivers

```plain
apt install bluetooth
```

Start bluetooth service

```plain
systemctl enable bluetooth
systemctl start bluetooth
```

## URL List

- [GitHub.com - pi-btnap](https://github.com/bablokb/pi-btnap)
