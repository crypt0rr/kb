---
title : "regedit"
# pre : '<i class="fas fa-code"></i> '
description : "Registry Editor."
date : 2021-09-09T09:52:27+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Registry Editor

### Disable Remote User Account Control (UAC)

1. Open regedit.exe (as Administrator)
2. Navigate to "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System"
3. Right-click in the blank area in the right pane and select New > DWORD Value
4. Name the new value "LocalAccountTokenFilterPolicy"
5. Double-click on the newly created "LocalAccountTokenFilterPolicy" value
6. Type 1 into the "Value data" entry and click OK
7. Reboot the computer

If you want to change the value via CMD/PowerShell:

```plain
reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v LocalAccountTokenFilterPolicy /t REG_DWORD /d 1
```

### URL list

* [Support.accessdata.com - Disable Remote UAC](https://support.accessdata.com/hc/en-us/articles/204150405-Disable-Remote-UAC)
