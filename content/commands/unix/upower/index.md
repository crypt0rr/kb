---
title : "upower"
# pre : '<i class="fas fa-code"></i> '
description : "Battery information."
date : 2020-08-22T19:46:52+02:00
# hidden : true
# draft : true
weight : 960
# tags : ['']
---

---

UPower tool - System-wide Power Management.

## Usage

```plain
upower [OPTION…]
```

## Flags

```plain
Help Options:
  -h, --help           Show help options

Application Options:
  -e, --enumerate      Enumerate objects paths for devices
  -d, --dump           Dump all parameters for all objects
  -w, --wakeups        Get the wakeup data
  -m, --monitor        Monitor activity from the power daemon
  --monitor-detail     Monitor with detail
  -i, --show-info      Show information about object path
  -v, --version        Print version of client and daemon

```

## Examples

```plain
$ upower -d
Device: /org/freedesktop/UPower/devices/line_power_AC
  native-path:          AC
  power supply:         yes
  updated:              Sat 22 Aug 2020 07:33:17 PM CEST (794 seconds ago)
  has history:          no
  has statistics:       no
  line-power
    warning-level:       none
    online:              yes
    icon-name:          'ac-adapter-symbolic'

Device: /org/freedesktop/UPower/devices/battery_BAT0
  native-path:          BAT0
  vendor:               LGC
  model:                01AV489
  serial:               471
  power supply:         yes
  updated:              Sat 22 Aug 2020 07:45:47 PM CEST (44 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               charging
    warning-level:       none
    energy:              8.3 Wh
    energy-empty:        0 Wh
    energy-full:         18.74 Wh
    energy-full-design:  23.94 Wh
    energy-rate:         0 W
    voltage:             11.47 V
    percentage:          44%
    capacity:            78.279%
    technology:          lithium-polymer
    icon-name:          'battery-good-charging-symbolic'

Device: /org/freedesktop/UPower/devices/battery_BAT1
  native-path:          BAT1
  vendor:               LGC
  model:                01AV490
  serial:               821
  power supply:         yes
  updated:              Sat 22 Aug 2020 07:45:47 PM CEST (44 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               charging
    warning-level:       none
    energy:              14.88 Wh
    energy-empty:        0 Wh
    energy-full:         21.64 Wh
    energy-full-design:  23.94 Wh
    energy-rate:         21.031 W
    voltage:             12.609 V
    time to full:        19.3 minutes
    percentage:          68%
    capacity:            90.3926%
    technology:          lithium-polymer
    icon-name:          'battery-full-charging-symbolic'
  History (charge):
    1598118347  68.000  charging
  History (rate):
    1598118347  21.031  charging

Device: /org/freedesktop/UPower/devices/mouse_dev_E3_FA_54_FF_5A_86
  native-path:          /org/bluez/hci0/dev_E3_FA_54_FF_5A_86
  model:                MX Ergo
  serial:               E3:FA:54:FF:5A:86
  power supply:         no
  updated:              Thu 01 Jan 1970 01:00:00 AM CET (1598118391 seconds ago)
  has history:          yes
  has statistics:       no
  mouse
    present:             yes
    rechargeable:        no
    state:               unknown
    warning-level:       none
    percentage:          100%
    icon-name:          'battery-missing-symbolic'

Device: /org/freedesktop/UPower/devices/DisplayDevice
  power supply:         yes
  updated:              Sat 22 Aug 2020 07:45:47 PM CEST (44 seconds ago)
  has history:          no
  has statistics:       no
  battery
    present:             yes
    state:               charging
    warning-level:       none
    energy:              23.18 Wh
    energy-full:         40.38 Wh
    energy-rate:         21.031 W
    time to full:        49.1 minutes
    percentage:          57.4047%
    icon-name:          'battery-good-charging-symbolic'

Daemon:
  daemon-version:  0.99.11
  on-battery:      no
  lid-is-closed:   no
  lid-is-present:  yes
  critical-action: HybridSleep
```

## URL List

- [Manpages.ubuntu.com](https://manpages.ubuntu.com/manpages/trusty/man1/upower.1.html)
