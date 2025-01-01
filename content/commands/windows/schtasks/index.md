---
title : "Schtasks"
# pre : '<i class="fas fa-code"></i> '
description : "Enables an administrator to create, delete, query, change, run and end scheduled tasks on a local or remote system."
date : 2022-11-13T16:28:04+01:00
# hidden : true
# draft : true
weight : 150
# tags : ['']
---

---

Enables an administrator to create, delete, query, change, run and end scheduled tasks on a local or remote system.

## Usage

```plain
SCHTASKS /parameter [arguments]
```

## Flags

```plain
Parameter List:
    /Create         Creates a new scheduled task.

    /Delete         Deletes the scheduled task(s).

    /Query          Displays all scheduled tasks.

    /Change         Changes the properties of scheduled task.

    /Run            Runs the scheduled task on demand.

    /End            Stops the currently running scheduled task.

    /ShowSid        Shows the security identifier corresponding to a scheduled task name.

    /?              Displays this help message.

Examples:
    SCHTASKS
    SCHTASKS /?
    SCHTASKS /Run /?
    SCHTASKS /End /?
    SCHTASKS /Create /?
    SCHTASKS /Delete /?
    SCHTASKS /Query  /?
    SCHTASKS /Change /?
    SCHTASKS /ShowSid /?
```

## Examples

### Query all scheduled tasks

- `/query` - displays tasks
- `/fo` - will list everything as list
- `/v` - verbose output

```plain
schtasks /query /fo LIST /v

Folder: \
INFO: There are no scheduled tasks presently available at your access level.

Folder: \Apple
HostName:                             VM7
TaskName:                             \Apple\AppleSoftwareUpdate
Next Run Time:                        11/16/2022 10:18:00 AM
Status:                               Ready
Logon Mode:                           Interactive/Background
Last Run Time:                        11/30/1999 12:00:00 AM
Last Result:                          267011
Author:                               N/A
Task To Run:                          C:\Program Files (x86)\Apple Software Update\SoftwareUpdate.exe -task
Start In:                             N/A
Comment:                              N/A
Scheduled Task State:                 Enabled
Idle Time:                            Disabled
Power Management:                     Stop On Battery Mode, No Start On Batteries
Run As User:                          Users
Delete Task If Not Rescheduled:       Disabled
Stop Task If Runs X Hours and X Mins: 72:00:00
Schedule:                             Scheduling data is not available in this format.
Schedule Type:                        Weekly
Start Time:                           10:18:00 AM
Start Date:                           8/16/2022
End Date:                             N/A
[...]
```

## URL list

- [Learn.microsoft.com - schtasks](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks)
