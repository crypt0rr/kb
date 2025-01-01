---
title : "lm-sensors"
# pre : ' '
description : "Is used to show the current readings of all sensor chips."
date : 2020-03-14T14:57:46+01:00
# hidden : true
# draft : true
weight : 1090
# tags : ['']
---

---

Is used to show the current readings of all sensor chips.

## Installation

```plain
sudo apt install lm-sensors
```

## Usage

```plain
sensors [OPTION]... [CHIP]...
```

## Flags

```plain
Usage: sensors [OPTION]... [CHIP]...
  -c, --config-file     Specify a config file
  -h, --help            Display this help text
  -s, --set             Execute `set' statements (root only)
  -f, --fahrenheit      Show temperatures in degrees fahrenheit
  -A, --no-adapter      Do not show adapter for each chip
      --bus-list        Generate bus statements for sensors.conf
  -u                    Raw output
  -j                    Json output
  -v, --version         Display the program version

Use `-' after `-c' to read the config file from stdin.
If no chips are specified, all chip info will be printed.
Example chip names:
    lm78-i2c-0-2d   *-i2c-0-2d
    lm78-i2c-0-*    *-i2c-0-*
    lm78-i2c-*-2d   *-i2c-*-2d
    lm78-i2c-*-*    *-i2c-*-*
    lm78-isa-0290   *-isa-0290
    lm78-isa-*  *-isa-*
    lm78-*
```

## Examples

```plain
sensors

thinkpad-isa-0000
Adapter: ISA adapter
fan1:           0 RPM
temp1:        +46.0°C  
temp2:            N/A  
temp3:         +0.0°C  
temp4:         +0.0°C  
temp5:         +0.0°C  
temp6:         +0.0°C  
temp7:         +0.0°C  
temp8:         +0.0°C  

pch_skylake-virtual-0
Adapter: Virtual device
temp1:        +42.5°C  

BAT0-acpi-0
Adapter: ACPI interface
in0:         +11.19 V  

iwlwifi-virtual-0
Adapter: Virtual device
temp1:        +33.0°C  

coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +47.0°C  (high = +100.0°C, crit = +100.0°C)
Core 0:        +47.0°C  (high = +100.0°C, crit = +100.0°C)
Core 1:        +46.0°C  (high = +100.0°C, crit = +100.0°C)

BAT1-acpi-0
Adapter: ACPI interface
in0:         +12.75 V  

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +46.0°C  (crit = +128.0°C)
```

## URL List

- [Ubuntu.com - Sensor Install HowTo](https://help.ubuntu.com/community/SensorInstallHowto)
- [GitHub.com - LM-sensors](https://github.com/lm-sensors/lm-sensors)
