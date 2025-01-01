---
title : "HWinfo"
# pre : ' '
description : "Probe for hardware."
date : 2020-04-24T14:29:04+02:00
# hidden : true
# draft : true
weight : 850
# tags : ['']
---

---

Probe for hardware.

## Installation

```plain
sudo apt install hwinfo
```

## Usage

```plain
hwinfo [OPTIONS]
```

## Flags

```plain
Options:
    --<HARDWARE_ITEM>
        This option can be given more than once. Probe for a particular
        HARDWARE_ITEM. Available hardware items are:
        all, arch, bios, block, bluetooth, braille, bridge, camera,
        cdrom, chipcard, cpu, disk, dsl, dvb, fingerprint, floppy,
        framebuffer, gfxcard, hub, ide, isapnp, isdn, joystick, keyboard,
        memory, mmc-ctrl, modem, monitor, mouse, netcard, network, partition,
        pci, pcmcia, pcmcia-ctrl, pppoe, printer, redasd,
        reallyall, scanner, scsi, smp, sound, storage-ctrl, sys, tape,
        tv, uml, usb, usb-ctrl, vbe, wlan, xen, zip
    --short
        Show only a summary. Use this option in addition to a hardware
        probing option.
    --listmd
        Normally hwinfo does not report RAID devices. Add this option to
        see them.
    --only DEVNAME
        This option can be given more than once. If you add this option
        only entries in the device list matching DEVNAME will be shown.
        Note that you also have to specify --<HARDWARE_ITEM> to trigger
        any device probing.
    --save-config SPEC
        Store config  for a particular device below /var/lib/hardware.
        SPEC can be a device name, an UDI, or 'all'. This option must be
        given in addition to a hardware probing option.
    --show-config UDI
        Show saved config data for a particular device.
    --map
        If disk names have  changed (e.g. after a kernel update) this
        prints a list of disk name mappings. Note  that  you must have
        used --save-config at some point before for this can work.
    --debug N
        Set debug level to N. The debug info is shown only in the log
        file. If you specify a log file, the debug level is implicitly
        set to a reasonable value (N is a bitmask of individual flags).
    --verbose
        Increase verbosity. Only together with --map.
    --log FILE
        Write log info to FILE.
        Don't forget to also specify --<HARDWARE_ITEM> to trigger any
        device probing.
    --dump-db N
        Dump hardware data base. N is either 0 for the external data
        base in /var/lib/hardware, or 1 for the internal data base.
    --version
        Print libhd version.
    --help
        Print usage.
```

## Examples

### Short overview of hardware

```plain
$ hwinfo --short

cpu:
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3539 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3528 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3496 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3525 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3513 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3566 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3558 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3563 MHz
keyboard:
  /dev/input/event5    Lenovo Calliope USB Keyboard
  /dev/input/event3    AT Translated Set 2 keyboard
mouse:
  /dev/input/mice      SynPS/2 Synaptics TouchPad
  /dev/input/mice      TPPS/2 IBM TrackPoint
  /dev/input/mice      MX Ergo Mouse
joystick:
  /dev/input/event7    Lenovo Calliope USB Keyboard
monitor:
                       LG Display LCD Monitor
                       DELL U2719DC
graphics card:
                       nVidia GM107GLM [Quadro M1200 Mobile]
sound:
                       Intel CM238 HD Audio Controller
                       nVidia Audio device
storage:
                       Samsung Electronics NVMe SSD Controller SM981/PM981
                       Samsung Electronics NVMe SSD Controller SM961/PM961
network:
  enp0s31f6            Intel Ethernet Connection (5) I219-V
  wlp4s0               Intel Dual Band Wireless-AC 8265
network interface:
  wlp4s0               Ethernet network interface
  enp0s31f6            Ethernet network interface
  lo                   Loopback network interface
disk:
  /dev/nvme0n1         Samsung Electronics NVMe SSD Controller SM981/PM981
  /dev/nvme1n1         Samsung Electronics NVMe SSD Controller SM961/PM961
[...]
```

### Show specific device info

```plain
$ hwinfo --cpu --short

cpu:
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3115 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 2928 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3095 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 2980 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 2975 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 2950 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3047 MHz
                       Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz, 3080 MHz
```

## URL List

- [Linuxintro.org - hwinfo](http://www.linuxintro.org/wiki/Hwinfo)
