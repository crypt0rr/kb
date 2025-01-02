---
title : "networkQuality"
# pre : '<i class="fas fa-code"></i> '
description : "Network quality testing tool."
date : 2022-01-13T10:32:57+01:00
# hidden : true
# draft : true
weight : 50
# tags : ['']
---

---

networkQuality allows for measuring the different aspects of Network Quality, including:

- Maximal capacity (often described as speed)
- The responsiveness of the connection. Responsiveness measures the quality of your network by the number of roundtrips completed per minute (RPM) under working conditions. See <https://support.apple.com/kb/HT212313>
- Other aspects of the connection that affect the quality of experience.

NOTE: This tool will connect to the Internet to perform its tests. This will use data on your Internet service plan.

## Usage

```plain
networkQuality [-C <configuration_url>] [-c] [-h] [-I <interfaceName>] [-s] [-v]
```

## Flags

```plain
    -C: override Configuration URL
    -c: Produce computer-readable output
    -h: Show help (this message)
    -I: Bind test to interface (e.g., en0, pdp_ip0,...)
    -s: Run tests sequentially instead of parallel upload/download
    -v: Verbose output
```

## Examples

```plain
$ networkQuality -v
==== SUMMARY ====                                                                                         
Upload capacity: 7.531 Mbps
Download capacity: 230.944 Mbps
Upload flows: 20
Download flows: 12
Responsiveness: Low (42 RPM)
Base RTT: 1075
Start: 13/01/2022, 10:32:07
End: 13/01/2022, 10:32:30
OS Version: Version 12.1 (Build 21C52)
```

## URL List

- [Support.apple.com - Test Wi-Fi networks with Apple Network Responsiveness](https://support.apple.com/kb/HT212313)
