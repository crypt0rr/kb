---
title : "PingCastle"
# pre : ' '
description : "PingCastle - Get Active Directory Security at 80% in 20% of the time."
date : 2023-04-04T18:37:35+02:00
# hidden : true
# draft : true
weight : 320
tags : ['Framework', 'Active Directory', 'AzureAD/EntraID']
---

---

The risk level regarding Active Directory security has changed. Several vulnerabilities have been made popular with tools like [mimikatz](https://github.com/gentilkiwi/mimikatz) or sites likes [adsecurity.org](http://adsecurity.org/).

PingCastle is a tool designed to assess quickly the Active Directory security level with a methodology based on risk assessment and a maturity framework.
It does not aim at a perfect evaluation but rather as an efficiency compromise.

## Installation

Download latest version from [Github.com](https://github.com/vletoux/pingcastle/releases)

## Usage

```plain
.\PingCastle.exe
```

## Flags

```plain
What do you want to do?
=======================
Using interactive mode.
Do not forget that there are other command line switches like --help that you can use
  1-healthcheck-Score the risk of a domain
  2-azuread    -Score the risk of AzureAD
  3-conso      -Aggregate multiple reports into a single one
  4-carto      -Build a map of all interconnected domains
  5-scanner    -Perform specific security checks on workstations
  6-export     -Export users or computers
  7-advanced   -Open the advanced menu
  0-Exit
==============================
This is the main functionnality of PingCastle. In a matter of minutes, it produces a report which will give you an overview of your Active Directory security. This report can be generated on other domains by using the existing trust links.
```

## Examples

### Health Check

```plain
  \==--O___      PingCastle (Version 3.0.0.0     21/02/2023 19:25:24)
   \  / \  "">   Get Active Directory Security at 80% in 20% of the time
    \/   \ ,'    End of support: 31/07/2024
     O"---O
      \ ,'       Vincent LE TOUX (contact@pingcastle.com)
       v         twitter: @mysmartlogon       https://www.pingcastle.com
Select a domain or server
=========================
Please specify the domain or server to investigate (default:offsec.nl)

Free Edition of PingCastle 3.0.0 - Not for commercial use
Starting the task: Perform analysis for offsec.nl
[16:40:48] Getting domain information (offsec.nl)
Warning: the program is running under a restricted token.
That means that the software does not have the same rights than the current user to query the Active Directory. Some information will be missing such as creation date or DNS zones.
To solve this problem, run the program elevated, aka as administrator
[16:40:50] Gathering general data
[16:40:51] This domain contains approximatively 3955 objects
[16:40:51] Gathering user data
[16:40:53] Gathering computer data
[16:40:53] Gathering trust data
[16:40:53] Gathering privileged group and permissions data
[16:40:53] - Initialize
[16:40:53] - Searching for critical and infrastructure objects
[16:40:53] - Collecting objects - Iteration 1
[16:40:56] - Collecting objects - Iteration 2
[16:40:58] - Collecting objects - Iteration 3
[16:41:04] - Collecting objects - Iteration 4
[16:41:06] - Collecting objects - Iteration 5
[16:41:07] - Collecting objects - Iteration 6
[16:41:07] - Collecting objects - Iteration 7
[16:41:07] - Completing object collection
[16:41:07] - Export completed
[16:41:08] Gathering delegation data
[16:41:09] Gathering gpo data
[16:41:09] Gathering pki data
[16:41:09] Gathering sccm data
[16:41:09] Gathering exchange data
[16:41:09] Gathering anomaly data
[16:41:10] Gathering dns data
[16:41:18] Gathering WSUS data
[16:41:18] Gathering MSOL data
[16:41:18] Gathering domain controller data (including null session)
[16:43:25] Gathering network data
[16:43:25] Computing risks
[16:43:25] Export completed
[16:43:25] Generating html report
[16:43:26] Generating xml file for consolidation report
[16:43:26] Export level is Normal
[16:43:26] Personal data will NOT be included in the .xml file (add --level Full to add it)
[16:43:27] Done
Task Perform analysis for offsec.nl completed
=============================================================================
Program launched in interactive mode - press any key to terminate the program
=============================================================================
```

## Example Report

{{%resources fa_icon_class="far fa-file" pattern=".*(html)"/%}}

## URL list

- [PingCastle.com](https://www.pingcastle.com/)
- [Github.com - Ping](https://github.com/vletoux/pingcastle/releases)
