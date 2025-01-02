---
title : "IPSW"
# pre : ' '
description : "Download and Parse IPSWs (and SO much more)."
date : 2022-08-15T14:41:44+02:00
# hidden : true
# draft : true
weight : 220
# tags : ['macOS', 'iOS']
---

---

Download and Parse IPSWs (and SO much more)

## Installation

Check [documentation](https://blacktop.github.io/ipsw/docs/install/) for latest installation methods.

## Usage

```plain
ipsw [command]
```

## Flags

```plain
Available Commands:
  device-list     List all iOS devices
  download        Download Apple Firmware files (and more)
  dtree           Parse DeviceTree
  dyld            Parse dyld_shared_cache
  ent             Search IPSW filesystem DMG for MachOs with a given entitlement
  extract         Extract kernelcache, dyld_shared_cache or DeviceTree from IPSW/OTA
  help            Help about any command
  iboot           Dump firmwares
  idev            USB connected device commands
  img4            Parse Img4
  info            Display IPSW/OTA Info
  kernel          Parse kernelcache
  macho           Parse MachO
  ota             Extract file(s) from OTA
  sepfw           Dump MachOs
  shsh            Get shsh blobs from device
  symbolicate     Symbolicate ARM 64-bit crash logs (similar to Apple's symbolicatecrash)
  update          Download an ipsw update if one exists
  version         Print the version number of ipsw

Flags:
      --config string   config file (default is $HOME/.ipsw.yaml)
  -h, --help            help for ipsw
  -V, --verbose         verbose output

Use "ipsw [command] --help" for more information about a command.
```

## Examples

### Download macOS

Also see [documentation](https://blacktop.github.io/ipsw/docs/commands/download/#download-macos).

```plain
ipsw download macos   
? Choose installer(s):  [Use arrows to move, space to select, <right> to all, <left> to none, type to filter]
  [ ]  Install macOS High Sierra Beta     10.13.5  17F66a   23Oct2019 14:41:18
  [ ]  macOS Mojave                       10.14.4  18E2034  23Oct2019 14:41:18
  [ ]  macOS Catalina                     10.15.3  19D2064  23Mar2020 21:41:00
  [ ]  macOS Catalina                     10.15.4  19E2269  04May2020 15:32:04
  [ ]  macOS Catalina                     10.15.5  19F2200  15Jun2020 18:52:41
  [ ]  macOS Catalina                     10.15.6  19G2006  06Aug2020 23:39:24
  [ ]  macOS Catalina                     10.15.6  19G2021  12Aug2020 20:04:02
  [ ]  macOS Catalina                     10.15.7  19H2     24Sep2020 17:09:31
  [ ]  macOS Catalina                     10.15.7  19H4     27Oct2020 17:28:13
  [ ]  macOS Catalina                     10.15.7  19H15    11Nov2020 17:48:09
  [ ]  macOS Big Sur                      11.5.2   20G95    18Aug2021 18:28:53
  [ ]  macOS Big Sur                      11.6.1   20G224   01Dec2021 21:44:37
  [ ]  macOS Big Sur                      11.6.2   20G314   14Jan2022 18:44:26
  [ ]  macOS Big Sur                      11.6.3   20G415   26Jan2022 18:26:15
  [ ]  macOS Big Sur                      11.6.4   20G417   17Feb2022 18:41:29
  [ ]  macOS Monterey                     12.3.1   21E258   11Apr2022 17:10:33
  [ ]  macOS Big Sur                      11.6.5   20G527   11Apr2022 17:12:53
  [ ]  macOS Monterey                     12.4     21F79    24May2022 20:21:06
  [ ]  macOS Big Sur                      11.6.6   20G624   24May2022 20:25:04
  [ ]  macOS Monterey                     12.4     21F2092  16Jun2022 17:07:46
  [ ]  macOS Big Sur                      11.6.7   20G630   16Jun2022 18:06:21
  [ ]  macOS Monterey beta                12.5     21G5063a 07Jul2022 17:04:05
> [x]  macOS Monterey                     12.5     21G72    28Jul2022 17:13:57
  [ ]  macOS Big Sur                      11.6.8   20G730   28Jul2022 17:15:02
  [ ]  macOS Ventura beta                 13.0     22A5321d 09Aug2022 17:07:06

? Choose installer(s): ✅
? You are about to download 1 installer(s). Continue? (y/N) y

? You are about to download 1 installer(s). Continue? Yes
   • Downloading packages     
   • Getting Package           destName=BaseSystem.dmg size=480 MB
        457.80 MiB / 457.80 MiB [==========================================================| ✅  ] 20.77 MiB/s
   • Getting Package           destName=AppleDiagnostics.dmg size=3.0 MB
        2.84 MiB / 2.84 MiB [==========================================================| ✅  ] 
   • Getting Package           destName=AppleDiagnostics.chunklist size=328 B
        328.00 b / 328.00 b [==========================================================| ✅  ] 
   • Getting Package           destName=InstallInfo.plist size=1.6 kB
        1.55 KiB / 1.55 KiB [==========================================================| ✅  ] 
   • Getting Package           destName=InstallESDDmg.chunklist size=19 kB
        18.88 KiB / 18.88 KiB [==========================================================| ✅  ] 
   • Getting Package           destName=BaseSystem.chunklist size=1.9 kB
        1.90 KiB / 1.90 KiB [==========================================================| ✅  ] 
   • Getting Package           destName=InstallESDDmg.pkg size=5.5 GB
        343.16 MiB / 5.16 GiB [===>------------------------------------------------------| 4m3s ] 20.50 MiB/s
        [...]
```

## URL List

- [Blacktop.github.io - Documentation IPSW](https://blacktop.github.io/ipsw/)
- [Github.com - IPSW](https://github.com/blacktop/ipsw)
