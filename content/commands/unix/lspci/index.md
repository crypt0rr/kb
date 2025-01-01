---
title : "lspci"
# pre : '<i class="fas fa-code"></i> '
description : "List all PCI devices."
date : 2020-03-13T16:57:54+01:00
# hidden : true
# draft : true
weight : 530
# tags : ['']
---

---

## Usage

```plain
lspci [<switches>]
```

## Flags

```plain
Usage: lspci [<switches>]

Basic display modes:
-mm     Produce machine-readable output (single -m for an obsolete format)
-t      Show bus tree

Display options:
-v      Be verbose (-vv for very verbose)
-k      Show kernel drivers handling each device
-x      Show hex-dump of the standard part of the config space
-xxx        Show hex-dump of the whole config space (dangerous; root only)
-xxxx       Show hex-dump of the 4096-byte extended config space (root only)
-b      Bus-centric view (addresses and IRQ's as seen by the bus)
-D      Always show domain numbers
-P      Display bridge path in addition to bus and device number
-PP     Display bus path in addition to bus and device number

Resolving of device ID's to names:
-n      Show numeric ID's
-nn     Show both textual and numeric ID's (names & numbers)
-q      Query the PCI ID database for unknown ID's via DNS
-qq     As above, but re-query locally cached entries
-Q      Query the PCI ID database for all ID's via DNS

Selection of devices:
-s [[[[<domain>]:]<bus>]:][<slot>][.[<func>]]   Show only devices in selected slots
-d [<vendor>]:[<device>][:<class>]      Show only devices with specified ID's

Other options:
-i <file>   Use specified ID database instead of /usr/share/misc/pci.ids.gz
-p <file>   Look up kernel modules in a given file instead of default modules.pcimap
-M      Enable `bus mapping' mode (dangerous; root only)

PCI access options:
-A <method> Use the specified PCI access method (see `-A help' for a list)
-O <par>=<val>  Set PCI access parameter (see `-O help' for a list)
-G      Enable PCI access debugging
-H <mode>   Use direct hardware access (<mode> = 1 or 2)
-F <file>   Read PCI configuration dump from a given file
```

## Examples

### Show connected devices

```plain
sudo lspci
```

### Show connected devices human readable

```plain
sudo lspci -mm

00:00.0 "Host bridge" "Intel Corporation" "Xeon E3-1200 v6/7th Gen Core Processor Host Bridge/DRAM Registers" -r05 "Lenovo" "Xeon E3-1200 v6/7th Gen Core Processor Host Bridge/DRAM Registers"
00:01.0 "PCI bridge" "Intel Corporation" "Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor PCIe Controller (x16)" -r05 "" ""
00:08.0 "System peripheral" "Intel Corporation" "Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th Gen Core Processor Gaussian Mixture Model" "Lenovo" "Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th Gen Core Processor Gaussian Mixture Model"[...]
```

### Show specific device information

```plain
$ sudo lspci -s 3e:00.0 -v
3e:00.0 Non-Volatile memory controller: Samsung Electronics Co Ltd NVMe SSD Controller SM961/PM961 (prog-if 02 [NVM Express])
    Subsystem: Samsung Electronics Co Ltd NVMe SSD Controller SM961/PM961
    Flags: bus master, fast devsel, latency 0, IRQ 16, NUMA node 0
    Memory at ecc00000 (64-bit, non-prefetchable) [size=16K]
    Capabilities: [40] Power Management version 3
    Capabilities: [50] MSI: Enable- Count=1/32 Maskable- 64bit+
    Capabilities: [70] Express Endpoint, MSI 00
    Capabilities: [b0] MSI-X: Enable+ Count=8 Masked-
    Capabilities: [100] Advanced Error Reporting
    Capabilities: [148] Device Serial Number 00-00-00-00-00-00-00-00
    Capabilities: [158] Power Budgeting <?>
    Capabilities: [168] Secondary PCI Express <?>
    Capabilities: [188] Latency Tolerance Reporting
    Capabilities: [190] L1 PM Substates
    Kernel driver in use: nvme
    Kernel modules: nvme
```

## URL List

- [Google](https://www.google.com)
