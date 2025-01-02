---
title : "ipconfig"
# pre : '<i class="fas fa-code"></i> '
description : "View and control IP configuration state."
date : 2022-07-20T10:21:51+02:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

View and control IP configuration state.

## Usage

```plain
ipconfig <command> <args>
```

## Flags

```plain
where <command> is one of waitall, getifaddr, ifcount, getoption, getiflist, getsummary, getpacket, getv6packet, getra, set, setverbose
```

## Examples

### Get list of interfaces

```plain
ipconfig getiflist                                     
en4 en5 en6 en0 bridge0 en7
```

### Get address of specific interface

```plain
ipconfig getifaddr en7   
10.10.13.37
```
