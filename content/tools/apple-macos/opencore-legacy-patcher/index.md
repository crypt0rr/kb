---
title : "Opencore Legacy Patcher"
# pre : ' '
description : "Experience macOS just like before. Patch your Mac to be compatible with the newest version of macOS when not supported natively."
date : 2022-01-27T14:51:20+01:00
# hidden : true
# draft : true
weight : 360
# tags : ['']
---

---

A python program for building and booting [OpenCore](https://github.com/acidanthera/OpenCorePkg) on both legacy and modern Macs, see our in-depth [Guide](https://dortania.github.io/OpenCore-Legacy-Patcher/) for more information.

Supported features:

- System Integrity Protection, FileVault 2, .im4m Secure Boot and Vaulting
- WPA Wifi and Personal Hotspot support
- Native OTA OS DELTA updates on all Macs
- Recovery OS, Safe Mode and Single-user Mode booting
- Zero firmware patching required (ie. APFS ROM patching)
- GPU Switching on MacBook Pro models (2012 and newer)

Note: Only clean-installs and upgrades are supported, macOS Big Sur installs already patched with other patchers, such as [Patched Sur](https://github.com/BenSova/Patched-Sur) or [bigmac](https://github.com/StarPlayrX/bigmac), cannot be used due to broken file integrity with APFS snapshots and SIP.

- You can however reinstall macOS with this patcher and retain your original data

Note 2: Currently OpenCore Legacy Patcher officially supports patching to run macOS Big Sur and Monterey installs. For older OSes, OpenCore may function however support is currently not provided from Dortania.

- For macOS Mojave and Catalina support, we recommend the use of [dosdude1's patchers](http://dosdude1.com)

### Running from source

To run the project from source, see here: [Build and run from source](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/main/SOURCE.md)

## URL List

- [Github.com - OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher)
