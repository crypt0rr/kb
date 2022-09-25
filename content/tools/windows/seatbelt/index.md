---
title : "Seatbelt"
# pre : ' '
description : "A C# project that performs a number of security oriented host-survey 'safety checks' relevant from both offensive and defensive security perspectives."
date : 2021-04-15T09:09:38+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Other', 'Active Directory']
---

## Seatbelt

A C# project that performs a number of security oriented host-survey "safety checks" relevant from both offensive and defensive security perspectives.

### Installation

Pre-build binary (15-04-2021) available below, or [compile](https://github.com/GhostPack/Seatbelt#compile-instructions) yourself to get the latest release.

Obfuscated version is tested against Windows Defender and Cylance.

{{%attachments title="Related files" fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

### Usage

```plain
.\Seatbelt.exe [OPTIONS]
```

### Flags

```plain
                        %&&@@@&&
                        &&&&&&&%%%,                       #&&@@@@@@%%%%%%###############%
                        &%&   %&%%                        &////(((&%%%%%#%################//((((###%%%%%%%%%%%%%%%
%%%%%%%%%%%######%%%#%%####%  &%%**#                      @////(((&%%%%%%######################(((((((((((((((((((
#%#%%%%%%%#######%#%%#######  %&%,,,,,,,,,,,,,,,,         @////(((&%%%%%#%#####################(((((((((((((((((((
#%#%%%%%%#####%%#%#%%#######  %%%,,,,,,  ,,.   ,,         @////(((&%%%%%%%######################(#(((#(#((((((((((
#####%%%####################  &%%......  ...   ..         @////(((&%%%%%%%###############%######((#(#(####((((((((
#######%##########%#########  %%%......  ...   ..         @////(((&%%%%%#########################(#(#######((#####
###%##%%####################  &%%...............          @////(((&%%%%%%%%##############%#######(#########((#####
#####%######################  %%%..                       @////(((&%%%%%%%################
                        &%&   %%%%%      Seatbelt         %////(((&%%%%%%%%#############*
                        &%%&&&%%%%%        v1.1.1         ,(((&%%%%%%%%%%%%%%%%%,
                         #%%%%##,


Available commands (+ means remote usage is supported):

    + AMSIProviders          - Providers registered for AMSI
    + AntiVirus              - Registered antivirus (via WMI)
    + AppLocker              - AppLocker settings, if installed
      ARPTable               - Lists the current ARP table and adapter information (equivalent to arp -a)
      AuditPolicies          - Enumerates classic and advanced audit policy settings
    + AuditPolicyRegistry    - Audit settings via the registry
    + AutoRuns               - Auto run executables/scripts/programs
      Certificates           - Finds user and machine personal certificate files
      CertificateThumbprints - Finds thumbprints for all certificate store certs on the systen
    + ChromiumBookmarks      - Parses any found Chrome/Edge/Brave/Opera bookmark files
    + ChromiumHistory        - Parses any found Chrome/Edge/Brave/Opera history files
    + ChromiumPresence       - Checks if interesting Chrome/Edge/Brave/Opera files exist
    + CloudCredentials       - AWS/Google/Azure/Bluemix cloud credential files
    + CloudSyncProviders     - All configured Office 365 endpoints (tenants and teamsites) which are synchronised by OneDrive.
      CredEnum               - Enumerates the current user's saved credentials using CredEnumerate()
    + CredGuard              - CredentialGuard configuration
      dir                    - Lists files/folders. By default, lists users' downloads, documents, and desktop folders (arguments == [directory] [maxDepth] [regex] [boolIgnoreErrors]
    + DNSCache               - DNS cache entries (via WMI)
    + DotNet                 - DotNet versions
    + DpapiMasterKeys        - List DPAPI master keys
      Dsregcmd               - Return Tenant information - Replacement for Dsregcmd /status
      EnvironmentPath        - Current environment %PATH$ folders and SDDL information
    + EnvironmentVariables   - Current environment variables
    + ExplicitLogonEvents    - Explicit Logon events (Event ID 4648) from the security event log. Default of 7 days, argument == last X days.
      ExplorerMRUs           - Explorer most recently used files (last 7 days, argument == last X days)
    + ExplorerRunCommands    - Recent Explorer "run" commands
      FileInfo               - Information about a file (version information, timestamps, basic PE info, etc. argument(s) == file path(s)
    + FileZilla              - FileZilla configuration files
    + FirefoxHistory         - Parses any found FireFox history files
    + FirefoxPresence        - Checks if interesting Firefox files exist
    + Hotfixes               - Installed hotfixes (via WMI)
      IdleTime               - Returns the number of seconds since the current user's last input.
    + IEFavorites            - Internet Explorer favorites
      IETabs                 - Open Internet Explorer tabs
    + IEUrls                 - Internet Explorer typed URLs (last 7 days, argument == last X days)
    + InstalledProducts      - Installed products via the registry
      InterestingFiles       - "Interesting" files matching various patterns in the user's folder. Note: takes non-trivial time.
    + InterestingProcesses   - "Interesting" processes - defensive products and admin tools
      InternetSettings       - Internet settings including proxy configs and zones configuration
    + KeePass                - Finds KeePass configuration files
    + LAPS                   - LAPS settings, if installed
    + LastShutdown           - Returns the DateTime of the last system shutdown (via the registry).
      LocalGPOs              - Local Group Policy settings applied to the machine/local users
    + LocalGroups            - Non-empty local groups, "-full" displays all groups (argument == computername to enumerate)
    + LocalUsers             - Local users, whether they're active/disabled, and pwd last set (argument == computername to enumerate)
    + LogonEvents            - Logon events (Event ID 4624) from the security event log. Default of 10 days, argument == last X days.
    + LogonSessions          - Windows logon sessions
      LOLBAS                 - Locates Living Off The Land Binaries and Scripts (LOLBAS) on the system. Note: takes non-trivial time.
    + LSASettings            - LSA settings (including auth packages)
    + MappedDrives           - Users' mapped drives (via WMI)
      McAfeeConfigs          - Finds McAfee configuration files
      McAfeeSiteList         - Decrypt any found McAfee SiteList.xml configuration files.
      MicrosoftUpdates       - All Microsoft updates (via COM)
      NamedPipes             - Named pipe names and any readable ACL information.
    + NetworkProfiles        - Windows network profiles
    + NetworkShares          - Network shares exposed by the machine (via WMI)
    + NTLMSettings           - NTLM authentication settings
      OfficeMRUs             - Office most recently used file list (last 7 days)
      OracleSQLDeveloper     - Finds Oracle SQLDeveloper connections.xml files
    + OSInfo                 - Basic OS info (i.e. architecture, OS version, etc.)
    + OutlookDownloads       - List files downloaded by Outlook
    + PoweredOnEvents        - Reboot and sleep schedule based on the System event log EIDs 1, 12, 13, 42, and 6008. Default of 7 days, argument == last X days.
    + PowerShell             - PowerShell versions and security settings
    + PowerShellEvents       - PowerShell script block logs (4104) with sensitive data.
    + PowerShellHistory      - Searches PowerShell console history files for sensitive regex matches.
      Printers               - Installed Printers (via WMI)
    + ProcessCreationEvents  - Process creation logs (4688) with sensitive data.
      Processes              - Running processes with file info company names that don't contain 'Microsoft', "-full" enumerates all processes
    + ProcessOwners          - Running non-session 0 process list with owners. For remote use.
    + PSSessionSettings      - Enumerates PS Session Settings from the registry
    + PuttyHostKeys          - Saved Putty SSH host keys
    + PuttySessions          - Saved Putty configuration (interesting fields) and SSH host keys
      RDCManFiles            - Windows Remote Desktop Connection Manager settings files
    + RDPSavedConnections    - Saved RDP connections stored in the registry
    + RDPSessions            - Current incoming RDP sessions (argument == computername to enumerate)
    + RDPsettings            - Remote Desktop Server/Client Settings
      RecycleBin             - Items in the Recycle Bin deleted in the last 30 days - only works from a user context!
      reg                    - Registry key values (HKLM\Software by default) argument == [Path] [intDepth] [Regex] [boolIgnoreErrors]
      RPCMappedEndpoints     - Current RPC endpoints mapped
    + SCCM                   - System Center Configuration Manager (SCCM) settings, if applicable
    + ScheduledTasks         - Scheduled tasks (via WMI) that aren't authored by 'Microsoft', "-full" dumps all Scheduled tasks
      SearchIndex            - Query results from the Windows Search Index, default term of 'passsword'. (argument(s) == <search path> <pattern1,pattern2,...>
      SecPackageCreds        - Obtains credentials from security packages
      SecurityPackages       - Enumerates the security packages currently available using EnumerateSecurityPackagesA()
      Services               - Services with file info company names that don't contain 'Microsoft', "-full" dumps all processes
    + SlackDownloads         - Parses any found 'slack-downloads' files
    + SlackPresence          - Checks if interesting Slack files exist
    + SlackWorkspaces        - Parses any found 'slack-workspaces' files
    + SuperPutty             - SuperPutty configuration files
    + Sysmon                 - Sysmon configuration from the registry
    + SysmonEvents           - Sysmon process creation logs (1) with sensitive data.
      TcpConnections         - Current TCP connections and their associated processes and services
      TokenGroups            - The current token's local and domain groups
      TokenPrivileges        - Currently enabled token privileges (e.g. SeDebugPrivilege/etc.)
    + UAC                    - UAC system policies via the registry
      UdpConnections         - Current UDP connections and associated processes and services
      UserRightAssignments   - Configured User Right Assignments (e.g. SeDenyNetworkLogonRight, SeShutdownPrivilege, etc.) argument == computername to enumerate
    + WindowsAutoLogon       - Registry autologon information
      WindowsCredentialFiles - Windows credential DPAPI blobs
    + WindowsDefender        - Windows Defender settings (including exclusion locations)
    + WindowsEventForwarding - Windows Event Forwarding (WEF) settings via the registry
    + WindowsFirewall        - Non-standard firewall rules, "-full" dumps all (arguments == allow/deny/tcp/udp/in/out/domain/private/public)
      WindowsVault           - Credentials saved in the Windows Vault (i.e. logins from Internet Explorer and Edge).
      WMIEventConsumer       - Lists WMI Event Consumers
      WMIEventFilter         - Lists WMI Event Filters
      WMIFilterBinding       - Lists WMI Filter to Consumer Bindings
    + WSUS                   - Windows Server Update Services (WSUS) settings, if applicable


Seatbelt has the following command groups: All, User, System, Slack, Chromium, Remote, Misc

    You can invoke command groups with "Seatbelt.exe <group>"

   "Seatbelt.exe -group=all" runs all commands

   "Seatbelt.exe -group=user" runs the following commands:

        Certificates, CertificateThumbprints, ChromiumPresence, CloudCredentials, CloudSyncProviders,
        CredEnum, dir, DpapiMasterKeys, Dsregcmd,
        ExplorerMRUs, ExplorerRunCommands, FileZilla, FirefoxPresence,
        IdleTime, IEFavorites, IETabs, IEUrls,
        KeePass, MappedDrives, OfficeMRUs, OracleSQLDeveloper,
        PowerShellHistory, PuttyHostKeys, PuttySessions, RDCManFiles,
        RDPSavedConnections, SecPackageCreds, SlackDownloads, SlackPresence,
        SlackWorkspaces, SuperPutty, TokenGroups, WindowsCredentialFiles,
        WindowsVault

   "Seatbelt.exe -group=system" runs the following commands:

        AMSIProviders, AntiVirus, AppLocker, ARPTable, AuditPolicies,
        AuditPolicyRegistry, AutoRuns, Certificates, CertificateThumbprints,
        CredGuard, DNSCache, DotNet, EnvironmentPath,
        EnvironmentVariables, Hotfixes, InterestingProcesses, InternetSettings,
        LAPS, LastShutdown, LocalGPOs, LocalGroups,
        LocalUsers, LogonSessions, LSASettings, McAfeeConfigs,
        NamedPipes, NetworkProfiles, NetworkShares, NTLMSettings,
        OSInfo, PoweredOnEvents, PowerShell, Processes,
        PSSessionSettings, RDPSessions, RDPsettings, SCCM,
        Services, Sysmon, TcpConnections, TokenPrivileges,
        UAC, UdpConnections, UserRightAssignments, WindowsAutoLogon,
        WindowsDefender, WindowsEventForwarding, WindowsFirewall, WMIEventConsumer,
        WMIEventFilter, WMIFilterBinding, WSUS

   "Seatbelt.exe -group=slack" runs the following commands:

        SlackDownloads, SlackPresence, SlackWorkspaces

   "Seatbelt.exe -group=chromium" runs the following commands:

        ChromiumBookmarks, ChromiumHistory, ChromiumPresence

   "Seatbelt.exe -group=remote" runs the following commands:

        AMSIProviders, AntiVirus, AuditPolicyRegistry, ChromiumPresence, CloudCredentials,
        DNSCache, DotNet, DpapiMasterKeys, EnvironmentVariables,
        ExplicitLogonEvents, ExplorerRunCommands, FileZilla, Hotfixes,
        InterestingProcesses, KeePass, LastShutdown, LocalGroups,
        LocalUsers, LogonEvents, LogonSessions, LSASettings,
        MappedDrives, NetworkProfiles, NetworkShares, NTLMSettings,
        OSInfo, PoweredOnEvents, PowerShell, ProcessOwners,
        PSSessionSettings, PuttyHostKeys, PuttySessions, RDPSavedConnections,
        RDPSessions, RDPsettings, Sysmon, WindowsDefender,
        WindowsEventForwarding, WindowsFirewall

   "Seatbelt.exe -group=misc" runs the following commands:

        ChromiumBookmarks, ChromiumHistory, ExplicitLogonEvents, FileInfo, FirefoxHistory,
        InstalledProducts, InterestingFiles, LogonEvents, LOLBAS,
        McAfeeSiteList, MicrosoftUpdates, OutlookDownloads, PowerShellEvents,
        Printers, ProcessCreationEvents, ProcessOwners, RecycleBin,
        reg, RPCMappedEndpoints, ScheduledTasks, SearchIndex,
        SecurityPackages, SysmonEvents


Examples:
    'Seatbelt.exe <Command> [Command2] ...' will run one or more specified checks only
    'Seatbelt.exe <Command> -full' will return complete results for a command without any filtering.
    'Seatbelt.exe "<Command> [argument]"' will pass an argument to a command that supports it (note the quotes).
    'Seatbelt.exe -group=all' will run ALL enumeration checks, can be combined with "-full".
    'Seatbelt.exe <Command> -computername=COMPUTER.DOMAIN.COM [-username=DOMAIN\USER -password=PASSWORD]' will run an applicable check remotely
    'Seatbelt.exe -group=remote -computername=COMPUTER.DOMAIN.COM [-username=DOMAIN\USER -password=PASSWORD]' will run remote specific checks
    'Seatbelt.exe -group=system -outputfile="C:\Temp\out.txt"' will run system checks and output to a .txt file.
    'Seatbelt.exe -group=user -q -outputfile="C:\Temp\out.json"' will run in quiet mode with user checks and output to a .json file.
```

### Examples

#### Check which Antivirus is installed / active

```plain
 .\Seatbelt.exe Antivirus
[...]
====== AntiVirus ======

  Engine                         : Windows Defender
  ProductEXE                     : windowsdefender://
  ReportingEXE                   : %ProgramFiles%\Windows Defender\MsMpeng.exe

[*] Completed collection in 0.109 seconds
```

#### Check logon evens for last 30 days

```plain
 .\Seatbelt.exe "LogonEvents 30"
[...]
====== LogonEvents ======

Listing 4624 Account Logon Events for the last 30 days.

  TimeCreated,TargetUser,LogonType,IpAddress,SubjectUsername,AuthenticationPackageName,LmPackageName,TargetOutboundUser
  4/15/2021 9:23:21 AM,DESKTOP-F27HA3K\TESTING,Interactive,127.0.0.1,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,
  4/15/2021 9:23:21 AM,DESKTOP-F27HA3K\TESTING,Interactive,127.0.0.1,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,
  4/15/2021 9:23:19 AM,NT AUTHORITY\IUSR,Service,-,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,
  4/15/2021 9:11:08 AM,DESKTOP-F27HA3K\TESTING,Interactive,127.0.0.1,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,
  4/15/2021 9:11:08 AM,DESKTOP-F27HA3K\TESTING,Interactive,127.0.0.1,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,
  4/15/2021 9:11:04 AM,NT AUTHORITY\IUSR,Service,-,WORKGROUP\DESKTOP-F27HA3K$,Negotiate,,

[*] Completed collection in 0.122 seconds
```

#### Run all modules available (local and remote)

```plain
.\Seatbelt.exe -group=all -outputfile="C:\Path\file.txt"
[...]
====== AMSIProviders ======

  GUID                           : {2781761E-28E0-4109-99FE-B9D127C57AFE}
  ProviderPath                   : "C:\ProgramData\Microsoft\Windows Defender\platform\4.18.1911.3-0\MpOav.dll"

====== AntiVirus ======

  Engine                         : Windows Defender
  ProductEXE                     : windowsdefender://
  ReportingEXE                   : %ProgramFiles%\Windows Defender\MsMpeng.exe

====== AppLocker ======

  [*] AppIDSvc service is Stopped

    [*] Applocker is not running because the AppIDSvc is not running

  [*] AppLocker not configured
====== ARPTable ======

  Loopback Pseudo-Interface 1 --- Index 1
    Interface Description : Software Loopback Interface 1
    Interface IPs      : ::1, 127.0.0.1
    DNS Servers        : fec0:0:0:ffff::1%1, fec0:0:0:ffff::2%1, fec0:0:0:ffff::3%1

    Internet Address      Physical Address      Type
    224.0.0.22            00-00-00-00-00-00     Static
    239.255.255.250       00-00-00-00-00-00     Static


  Ethernet --- Index 7
    Interface Description : Intel(R) PRO/1000 MT Desktop Adapter
    Interface IPs      : fe80::309f:2bb6:5980:a2d8%7, 10.0.2.15
    DNS Servers        : 10.0.2.3

    Internet Address      Physical Address      Type
    10.0.2.2              52-54-00-12-35-02     Dynamic
    10.0.2.3              52-54-00-12-35-03     Dynamic
    10.0.2.255            FF-FF-FF-FF-FF-FF     Static
    224.0.0.22            01-00-5E-00-00-16     Static
    224.0.0.251           01-00-5E-00-00-FB     Static
    224.0.0.252           01-00-5E-00-00-FC     Static
    239.255.255.250       01-00-5E-7F-FF-FA     Static
    255.255.255.255       FF-FF-FF-FF-FF-FF     Static


====== AuditPolicies ======

====== AuditPolicyRegistry ======

====== AutoRuns ======


  HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run :
    C:\WINDOWS\system32\SecurityHealthSystray.exe
    C:\WINDOWS\system32\VBoxTray.exe
====== Certificates ======
```

### URL list

* [Github.com - Seatbelt](https://github.com/GhostPack/Seatbelt)
