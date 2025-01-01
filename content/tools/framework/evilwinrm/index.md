---
title : "Evil-WinRM"
# pre : ' '
description : "This shell is the ultimate WinRM shell for hacking/pentesting."
date : 2020-05-12T13:08:16+02:00
# hidden : true
# draft : true
weight : 140
# tags : ['']
---

---

This shell is the ultimate WinRM shell for hacking/pentesting.

## Installation (kali)

```plain
gem install evil-winrm
```

## Usage

```plain
evil-winrm -i IP -u USER [-s SCRIPTS_PATH] [-e EXES_PATH] [-P PORT] [-p PASS] [-H HASH] [-U URL] [-S] [-c PUBLIC_KEY_PATH ] [-k PRIVATE_KEY_PATH ] [-r REALM]
```

## Flags

```plain
Evil-WinRM shell v2.3
    -S, --ssl                        Enable ssl
    -c, --pub-key PUBLIC_KEY_PATH    Local path to public key certificate
    -k, --priv-key PRIVATE_KEY_PATH  Local path to private key certificate
    -r, --realm DOMAIN               Kerberos auth, it has to be set also in /etc/krb5.conf file using this format -> CONTOSO.COM = { kdc = fooserver.contoso.com }
    -s, --scripts PS_SCRIPTS_PATH    Powershell scripts local path
    -e, --executables EXES_PATH      C# executables local path
    -i, --ip IP                      Remote host IP or hostname. FQDN for Kerberos auth (required)
    -U, --url URL                    Remote url endpoint (default /wsman)
    -u, --user USER                  Username (required)
    -p, --password PASS              Password
    -H, --hash HASH                  NTHash
    -P, --port PORT                  Remote host port (default 5985)
    -V, --version                    Show version
    -n, --no-colors                  Disable colors
    -h, --help                       Display this help message
```

## Examples

### Connect to remote system

```plain
$ evil-winrm -i 10.10.10.10 -u administrator -p Welkom1234

Evil-WinRM shell v2.3
Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> whoami
offsec\administrator
*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> hostname
DC2016
*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> menu

   ,.   (   .      )               "            ,.   (   .      )       .
  ("  (  )  )'     ,'             (`     '`    ("     )  )'     ,'   .  ,)  
.; )  ' (( (" )    ;(,      .     ;)  "  )"  .; )  ' (( (" )   );(,   )((
_".,_,.__).,) (.._( ._),     )  , (._..( '.._"._, . '._)_(..,_(_".) _( _')  
\_   _____/__  _|__|  |    ((  (  /  \    /  \__| ____\______   \  /     \  
 |    __)_\  \/ /  |  |    ;_)_') \   \/\/   /  |/    \|       _/ /  \ /  \
 |        \\   /|  |  |__ /_____/  \        /|  |   |  \    |   \/    Y    \
/_______  / \_/ |__|____/           \__/\  / |__|___|  /____|_  /\____|__  /
        \/                               \/          \/       \/         \/
              By: CyberVaca, OscarAkaElvis, Laox @Hackplayers  

[+] Bypass-4MSI
[+] Dll-Loader
[+] Donut-Loader
[+] Invoke-Binary
```

### Use folder with scripts as PowerUp.ps1

```plain
$ evil-winrm -i 10.10.10.10 -u administrator -p Welkom1234 -s ~/PowerSploit/Privesc/

Evil-WinRM shell v2.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> menu

   ,.   (   .      )               "            ,.   (   .      )       .
  ("  (  )  )'     ,'             (`     '`    ("     )  )'     ,'   .  ,)  
.; )  ' (( (" )    ;(,      .     ;)  "  )"  .; )  ' (( (" )   );(,   )((
_".,_,.__).,) (.._( ._),     )  , (._..( '.._"._, . '._)_(..,_(_".) _( _')  
\_   _____/__  _|__|  |    ((  (  /  \    /  \__| ____\______   \  /     \  
 |    __)_\  \/ /  |  |    ;_)_') \   \/\/   /  |/    \|       _/ /  \ /  \
 |        \\   /|  |  |__ /_____/  \        /|  |   |  \    |   \/    Y    \
/_______  / \_/ |__|____/           \__/\  / |__|___|  /____|_  /\____|__  /
        \/                               \/          \/       \/         \/
              By: CyberVaca, OscarAkaElvis, Laox @Hackplayers  

[+] Bypass-4MSI
[+] Dll-Loader
[+] Donut-Loader
[+] Invoke-Binary

*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> PowerUp.ps1
*Evil-WinRM* PS C:\Users\administrator.OFFSEC\Documents> menu

   ,.   (   .      )               "            ,.   (   .      )       .
  ("  (  )  )'     ,'             (`     '`    ("     )  )'     ,'   .  ,)  
.; )  ' (( (" )    ;(,      .     ;)  "  )"  .; )  ' (( (" )   );(,   )((
_".,_,.__).,) (.._( ._),     )  , (._..( '.._"._, . '._)_(..,_(_".) _( _')  
\_   _____/__  _|__|  |    ((  (  /  \    /  \__| ____\______   \  /     \  
 |    __)_\  \/ /  |  |    ;_)_') \   \/\/   /  |/    \|       _/ /  \ /  \
 |        \\   /|  |  |__ /_____/  \        /|  |   |  \    |   \/    Y    \
/_______  / \_/ |__|____/           \__/\  / |__|___|  /____|_  /\____|__  /
        \/                               \/          \/       \/         \/
              By: CyberVaca, OscarAkaElvis, Laox @Hackplayers  

[+] Add-ServiceDacl
[+] Add-Win32Type
[+] Bypass-4MSI
[+] Dll-Loader
[+] Donut-Loader
[+] field
[+] Find-PathDLLHijack
[+] Find-ProcessDLLHijack
[+] func
[+] Get-ApplicationHost
[+] Get-CachedGPPPassword
[+] Get-CurrentUserTokenGroupSid
[+] Get-ModifiablePath
[+] Get-ModifiableRegistryAutoRun
[+] Get-ModifiableScheduledTaskFile
[+] Get-ModifiableService
[+] Get-ModifiableServiceFile
[+] Get-RegistryAlwaysInstallElevated
[+] Get-RegistryAutoLogon
[+] Get-ServiceDetail
[+] Get-ServiceUnquoted
[+] Get-SiteListPassword
[+] Get-UnattendedInstallFile
[+] Get-WebConfig
[+] Install-ServiceBinary
[+] Invoke-AllChecks
[+] Invoke-Binary
[+] Invoke-ServiceAbuse
[+] New-InMemoryModule
[+] psenum
[+] Restore-ServiceBinary
[+] Set-ServiceBinPath
[+] struct
[+] Test-ServiceDaclPermission
[+] Write-HijackDll
[+] Write-ServiceBinary
[+] Write-UserAddMSI
```

## URL List

- [GitHub.com - evil-winrm](https://github.com/Hackplayers/evil-winrm)
