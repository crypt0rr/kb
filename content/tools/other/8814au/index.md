---
title : "8814au"
# pre : ' '
description : "Linux Driver for USB WiFi Adapters that are based on the RTL8814AU Chipset."
date : 2022-01-03T16:32:22+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Linux Driver for USB WiFi Adapters that are based on the RTL8814AU Chipset.

- v5.8.5.1 (Realtek) (20191029)
- Plus updates from the Linux community

### Features

- IEEE 802.11 b/g/n/ac WiFi compliant
- 802.1x, WEP, WPA TKIP and WPA2 AES/Mixed mode for PSK and TLS (Radius)
- IEEE 802.11b/g/n/ac Client mode
  - Supports wireless security for WEP, WPA TKIP and WPA2 AES PSK
  - Supports site survey scan and manual connect
  - Supports power saving mode
- Supported interface modes
  - IBSS
  - Managed
  - AP (see *Bridged Wireless Access Point- located in the main directory of this repo)
  - Monitor
- USB mode control
- Log level control
- LED control
- Power saving control
- VHT control (allows 80 MHz channel width in AP mode)
- SU Beamformee control
- SU Beamformer control

Please check [repo](https://github.com/morrownr/8814au) for more information and current support.

### Tested Hardware

- [Wireless USB WiFi Adapter, 1900Mbps Dual Band 2.4GHz/600Mbps 5.8GHz/1300Mbps High Gain 5dBi Antennas USB 3.0](https://www.amazon.com/gp/product/B07VCKN83P)
- [ASUS USB-AC68 AC1900 Dual-Band USB 3.0 WiFi Adapter](https://www.amazon.com/dp/B01I7QFR10)

### Compatible Devices

- ALFA AWUS1900
- ASUS USB-AC68 AC1900 Dual-Band USB 3.0 WiFi Adapter
- Edimax EW-7833 UAC AC1750 Dual-Band Wi-Fi USB 3.0 Adapter
- Numerous products that are based on the supported chipset

## Installation

### Debian (Ubuntu , Kali, Linux Mint etc.)

```plain
sudo apt update
```

```plain
sudo apt install -y linux-headers-$(uname -r) build-essential dkms git libelf-dev
```

```plain
mkdir ~/src && cd ~/src
```

```plain
git clone https://github.com/morrownr/8814au.git
```

```plain
sudo ./install-driver.sh
```

**Note:*- please reboot after installation

### Driver Options

A file called `8814au.conf` will be installed in `/etc/modprobe.d` by default.

`/etc/modprobe.d/8814au.conf`

This file will be read and applied to the driver on each system boot.

To edit the driver options file, run the `edit-options.sh` script.

```plain
sudo ./edit-options.sh
```

Documentation for Driver Options is included in the file `8814au.conf`.

## URL List

- [Github.com - 8814au](https://github.com/morrownr/8814au)
