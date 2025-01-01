---
title : "Spctl"
# pre : '<i class="fas fa-code"></i> '
description : "SecAssessment system policy security."
date : 2021-12-10T14:39:05+01:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

This subsystem maintains and evaluates rules that determine whether the system allows the installation, execution, and other operations on files on the system.

## Usage

```plain
spctl --assess [--type type] [-v] path ... # assessment
spctl --add [--type type] [--path|--requirement|--anchor|--hash] spec ... # add rule(s)
spctl [--enable|--disable|--remove] [--type type] [--path|--requirement|--anchor|--hash|--rule] spec # change rule(s)
spctl --status | --global-enable | --global-disable # system global switch
```

## Flags

```plain
Developer Mode Usage:
    spctl developer-mode <action>
        enable-terminal
            Add Terminal as a developer tool.
Kernel Extension User Consent Usage:
    spctl kext-consent <action>         ** Modifications only available in Recovery OS **
        status
            Print whether kernel extension user consent is enabled or disabled.
        enable
            Enable requiring user consent for kernel extensions.
        disable
            Disable requiring user consent for kernel extensions.
        add <team-id>
            Insert a new Team Identifier into the list allowed to load kernel extensions without user consent.
        list
            Print the list of Team Identifiers allowed to load without user consent.
        remove <team-id>
            Remove a Team Identifier from the list allowed to load kernel extensions without user consent.
```

## Examples

### Check app signing

```plain
crypt0rr@mba /Applications % spctl -a -vv Numbers.app 
Numbers.app: accepted
source=Mac App Store
origin=Apple Mac OS Application Signing
```

```plain
crypt0rr@mba /Applications % codesign -vv --deep-verify Numbers.app 
Numbers.app: valid on disk
Numbers.app: satisfies its Designated Requirement
```

## URL List

- [Medium.com - How to verify app signatures](https://medium.com/@andrew.perfiliev/how-to-verify-app-signatures-43fd5cd1bd3d)
