---
title : "Scutil"
# pre : '<i class="fas fa-code"></i> '
description : "Interactive access to the dynamic store."
date : 2022-12-08T08:47:11+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

Interactive access to the dynamic store.

## Usage

```plain
scutil [OPTIONS]
```

## Flags

```plain
    scutil --prefs [preference-file]
        interactive access to the [raw] stored preferences.

   or: scutil [-W] -r nodename
   or: scutil [-W] -r address
   or: scutil [-W] -r local-address remote-address
        check reachability of node, address, or address pair (-W to "watch").

   or: scutil -w dynamic-store-key [ -t timeout ]
        -w      wait for presense of dynamic store key
        -t      time to wait for key

   or: scutil --get pref
   or: scutil --set pref [newval]
   or: scutil --get filename path key  
        pref    display (or set) the specified preference.  Valid preferences
                include:
                        ComputerName, LocalHostName, HostName
        newval  New preference value to be set.  If not specified,
                the new value will be read from standard input.

   or: scutil --dns
        show DNS configuration.

   or: scutil --proxy
        show "proxy" configuration.

   or: scutil --nwi
        show network information

   or: scutil --nc
        show VPN network configuration information. Use --nc help for full command list

   or: scutil --allow-new-interfaces [off|on]
        manage new interface creation with screen locked.

   or: scutil --error err#
        display a descriptive message for the given error code
```

## Examples

### Change System Hostname / Bonjour and Computer Name

System Hostname:

```plain
sudo scutil --set HostName crypt0rr.local
```

Bonjour Hostname:

```plain
sudo scutil --set LocalHostName crypt0rr
```

Computer Name:

```plain
sudo scutil --set ComputerName crypt0rr
```

### Show DNS Configuration

```plain
scutil --dns
```

### Show Network Information

```plain
scutil --nwi
```

## URL list

- [ss64.com - scutil](https://ss64.com/osx/scutil.html)
