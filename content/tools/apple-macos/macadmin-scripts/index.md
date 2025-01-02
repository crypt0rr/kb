---
title : "macAdmin Scripts"
# pre : ' '
description : "Some scripts that might be of use to macOS admins. Might be related to Munki; might not."
date : 2022-02-05T14:41:03+01:00
# hidden : true
# draft : true
weight : 250
# tags : ['macOS', 'iOS']
---

---

Some scripts that might be of use to macOS admins. Might be related to Munki;
might not.

These are currently only supported using Apple's Python on macOS. There is no support for running these on Windows or Linux.

In macOS 12.3, Apple will be removing its Python 2.7 install. You'll need to provide your own Python to use these scripts. You may also need to install additional Python modules.

## Installation

```plain
git clone https://github.com/munki/macadmin-scripts.git
```

## Usage

```plain
python3 getmacosipsws.py
```

```plain
sudo python3 installinstallmacos.py
```

## Examples

### getmacosipsws.py

Quick-and-dirty tool to download the macOS IPSW files currently advertised by Apple in the <https://mesu.apple.com/assets/macos/com_apple_macOSIPSW/com_apple_macOSIPSW.xml> feed.

```plain
$ python3 getmacosipsws.py                                                                                                          
Downloading https://mesu.apple.com/assets/macos/com_apple_macOSIPSW/com_apple_macOSIPSW.xml...
 #             Model    Version    Build    Checksum
 1        Macmini9,1       12.2    21D49      ef21ed
 2        Macmini9,1       12.2    21D49      ef21ed
 3    MacBookPro17,1       12.2    21D49      ef21ed
 4    MacBookPro17,1       12.2    21D49      ef21ed
 5    MacBookAir10,1       12.2    21D49      ef21ed
 6    MacBookAir10,1       12.2    21D49      ef21ed
 7          iMac21,1       12.2    21D49      ef21ed
 8          iMac21,1       12.2    21D49      ef21ed
 9          iMac21,2       12.2    21D49      ef21ed
10          iMac21,2       12.2    21D49      ef21ed
11    MacBookPro18,1       12.2    21D49      ef21ed
12    MacBookPro18,1       12.2    21D49      ef21ed
13    MacBookPro18,2       12.2    21D49      ef21ed
14    MacBookPro18,2       12.2    21D49      ef21ed
15    MacBookPro18,3       12.2    21D49      ef21ed
16    MacBookPro18,3       12.2    21D49      ef21ed
17    MacBookPro18,4       12.2    21D49      ef21ed
18    MacBookPro18,4       12.2    21D49      ef21ed

Choose a product to download (1-18): 
```

### installinstallmacos.py (Create .DMG installer)

This script can create disk images containing macOS Installer applications available via Apple's softwareupdate catalogs. Please check [support.apple.com](https://support.apple.com/en-us/HT201372) for the commands to create a bootable USB stick.

Run `python ./installinstallmacos.py --help` to see the available options.

The tool assembles "Install macOS" applications by downloading the packages from Apple's softwareupdate servers and then installing them into a new empty disk image.

If `/usr/bin/installer` returns errors during this process, it can be useful to examine `/var/log/install.log` for clues.

Since it is using Apple's installer, any install check or volume check scripts are run. This means that you can only use this tool to create a diskimage containing the versions of macOS that will run on the exact machine you are running the script on.

For example, to create a diskimage containing the version 10.13.6 that runs on 2018 MacBook Pros, you must run this script on a 2018 MacBook Pro, and choose the proper version.

Typically "forked" OS build numbers are 4 digits, so when this document was last updated, build 17G2208 was the correct build for 2018 MacBook Pros; 17G65 was the correct build for all other Macs that support High Sierra.

If you attempt to install an incompatible version of macOS, you'll see an error similar to the following:

```plain
Making empty sparseimage...
installer: Error - ERROR_B14B14D9B7
Command '['/usr/sbin/installer', '-pkg', './content/downloads/07/20/091-95774/awldiototubemmsbocipx0ic9lj2kcu0pt/091-95774.English.dist', '-target', '/private/tmp/dmg.Hf0PHy']' returned non-zero exit status 1
Product installation failed.
```

Use a compatible Mac or select a different build compatible with your current hardware and try again. You may also have success running the script in a VM; the InstallationCheck script in versions of the macOS installer to date skips the checks (and returns success) when run on a VM.

```plain
$ sudo python3 installinstallmacos.py
Downloading https://swscan.apple.com/content/catalogs/others/index-12-10.16-10.15-10.14-10.13-10.12-10.11-10.10-10.9-mountainlion-lion-snowleopard-leopard.merged-1.sucatalog...
[...]
 #      ProductID    Version    Build   Post Date  Title
 1      061-26578    10.14.5  18F2059  2019-10-14  macOS Mojave
 2      061-26589    10.14.6   18G103  2019-10-14  macOS Mojave
 3      041-91758    10.13.6    17G66  2019-10-19  macOS High Sierra
 4      041-88800    10.14.4  18E2034  2019-10-23  macOS Mojave
 5      041-90855    10.13.5   17F66a  2019-10-23  Install macOS High Sierra Beta
 6      061-86291    10.15.3  19D2064  2020-03-23  macOS Catalina
 7      001-04366    10.15.4  19E2269  2020-05-04  macOS Catalina
 8      001-15219    10.15.5  19F2200  2020-06-15  macOS Catalina
 9      001-36735    10.15.6  19G2006  2020-08-06  macOS Catalina
10      001-36801    10.15.6  19G2021  2020-08-12  macOS Catalina
11      001-51042    10.15.7     19H2  2020-09-24  macOS Catalina
12      001-57224    10.15.7     19H4  2020-10-27  macOS Catalina
13      001-68446    10.15.7    19H15  2020-11-11  macOS Catalina
14      071-78704     11.5.2    20G95  2021-08-18  macOS Big Sur
15      002-23774     12.0.1   21A559  2021-12-01  macOS Monterey
16      002-23589     11.6.1   20G224  2021-12-01  macOS Big Sur
17      002-42435       12.1    21C52  2022-01-14  macOS Monterey
18      002-42341     11.6.2   20G314  2022-01-14  macOS Big Sur
19      002-57041       12.2    21D49  2022-01-26  macOS Monterey
20      002-57023     11.6.3   20G415  2022-01-26  macOS Big Sur

Choose a product to download (1-20):
```

#### Important note for Catalina+

Catalina privacy protections might interfere with the operation of this tool if you run it from ~/Desktop, ~/Documents, ~/Downloads or other directories protected in Catalina. Consider using /Users/Shared (or subdirectory) as the "working space" for this tool.

#### Alternate implementations

Graham Pugh has a fork with a lot more features and bells and whistles. Check it out if your needs aren't met by this tool.
<https://github.com/grahampugh/macadmin-scripts>

## URL List

- [Github.com - macadmin-scripts](https://github.com/munki/macadmin-scripts/)
- [Github.com - grahampugh - macadmin-scripts (fork)](https://github.com/grahampugh/macadmin-scripts)
