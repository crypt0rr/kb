---
title : "TLP"
# pre : ' '
description : "Apply power saving settings manually and control ThinkPad battery features."
date : 2021-07-20T09:59:54+02:00
# hidden : true
# draft : true
weight : 1910
# tags : ['']
---

---

Apply power saving settings manually and control ThinkPad battery features.

## Installation

```plain
sudo apt install tlp
```

For ThinkPads install:

```plain
sudo apt install acpi-call-dkms
```

## Usage

```plain
tlp start|true|bat|false|ac|usb|bayoff|chargeonce|discharge|setcharge|fullcharge|recalibrate|diskid
```

## Examples

### Set threshold

```plain
sudo tlp setcharge 75 80 BAT0
```

Check statistics

```plain
sudo tlp-stat -b
```

### Recalibrate cycle

```plain
$ sudo tlp recalibrate

Currently discharging battery BAT0:
voltage            =  11750 [mV]
remaining capacity =  62340 [mWh]
remaining percent  =     77 [%]
remaining time     =    192 [min]
power              =  19411 [mW]
state              = Discharging
force discharge    = 1
Press Ctrl+C to cancel.
```

### Temporarily fully charge

```plain
$ sudo tlp fullcharge
Setting temporary charge thresholds for BAT0:
  stop  = 100
  start =  96
Charging starts now, keep AC connected.
```

## URL List

- [Linrunner.de - TLP](https://linrunner.de/tlp/)
- [Github.com - TLP](https://github.com/linrunner/TLP)
