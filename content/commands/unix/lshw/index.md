---
title : "lshw"
# pre : '<i class="fas fa-code"></i> '
description : "Hardware Lister."
date : 2020-03-13T17:17:18+01:00
# hidden : true
# draft : true
weight : 510
# tags : ['']
---

---

## Usage

```plain
lshw [-format] [-options ...]
```

## Flags

```plain
Hardware Lister (lshw) -
usage: lshw [-format] [-options ...]
       lshw -version

    -version        print program version ()

format can be
    -html           output hardware tree as HTML
    -xml            output hardware tree as XML
    -json           output hardware tree as a JSON object
    -short          output hardware paths
    -businfo        output bus information

options can be
    -class CLASS    only show a certain class of hardware
    -C CLASS        same as '-class CLASS'
    -c CLASS        same as '-class CLASS'
    -disable TEST   disable a test (like pci, isapnp, cpuid, etc. )
    -enable TEST    enable a test (like pci, isapnp, cpuid, etc. )
    -quiet          don't display status
    -sanitize       sanitize output (remove sensitive information like serial numbers, etc.)
    -numeric        output numeric IDs (for PCI, USB, etc.)
    -notime         exclude volatile attributes (timestamps) from output
```

## Examples

```plain
sudo lshw
    description: Notebook
    product: 20HHS0EQ00 (LENOVO_MT_20HH_BU_Think_FM_ThinkPad P51)
    vendor: LENOVO
    version: ThinkPad P51
    serial: 12345678
    width: 64 bits
    capabilities: smbios-3.0.0 dmi-3.0.0 smp vsyscall32
    configuration: administrator_password=enabled chassis=notebook family=ThinkPad P51 power-on_password=disabled sku=LENOVO_MT_20HH_BU_Think_FM_ThinkPad P51 uuid=CCB8F061-9831-B211-A85C21346798246
  *-core
       description: Motherboard
       product: 20HHS0EQ00
       vendor: LENOVO
       physical id: 0
       version: SDK0J12345 WIN
       serial: 12345678
       slot: Not Available
     *-memory
          description: System Memory
          physical id: 3
          slot: System board or motherboard
          size: 32GiB
[...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/lshw)
