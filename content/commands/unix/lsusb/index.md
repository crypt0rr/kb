---
title : "lsusb"
# pre : '<i class="fas fa-code"></i> '
description : "List USB devices."
date : 2020-03-13T17:00:36+01:00
# hidden : true
# draft : true
weight : 540
# tags : ['']
---

---

## Usage

```plain
lsusb [options]...
```

## Flags

```plain
Usage: lsusb [options]...
List USB devices
  -v, --verbose
      Increase verbosity (show descriptors)
  -s [[bus]:][devnum]
      Show only devices with specified device and/or
      bus numbers (in decimal)
  -d vendor:[product]
      Show only devices with the specified vendor and
      product ID numbers (in hexadecimal)
  -D device
      Selects which device lsusb will examine
  -t, --tree
      Dump the physical USB device hierarchy as a tree
  -V, --version
      Show version of program
  -h, --help
      Show usage and help
```

## Examples

### List connected USB devices

```plain
lsusb

Bus 002 Device 002: ID 0781:5581 SanDisk Corp. Ultra
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 005: ID 046d:c534 Logitech, Inc. Unifying Receiver
Bus 001 Device 002: ID 0765:5010 X-Rite, Inc. X-Rite Pantone Color Sensor
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

### Show specific connected device (device id)

```plain
sudo lsusb -v -d 0765:5010

Bus 001 Device 002: ID 0765:5010 X-Rite, Inc. X-Rite Pantone Color Sensor
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass            0
  bDeviceSubClass         0
  bDeviceProtocol         0
  bMaxPacketSize0         8
  idVendor           0x0765 X-Rite, Inc.
  idProduct          0x5010 X-Rite Pantone Color Sensor
  bcdDevice            0.00
  iManufacturer           0
  iProduct                0
  iSerial                 0
```

### Verbose list all connected USB devices

```plain
sudo lsusb -v

Bus 002 Device 002: ID 0781:5581 SanDisk Corp. Ultra
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               3.00
  bDeviceClass            0
  bDeviceSubClass         0
  bDeviceProtocol         0
  bMaxPacketSize0         9
  idVendor           0x0781 SanDisk Corp.
  idProduct          0x5581 Ultra
  bcdDevice            1.00
  iManufacturer           1 SanDisk
  iProduct                2 Ultra
  iSerial                 3 040156557d5110d1f
[...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/lsusb)
