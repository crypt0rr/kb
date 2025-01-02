---
title : "Scan"
# pre : ' '
description : "Assess the Remote Procedure Calls (RPC) listening."
date : 2023-05-04T08:54:31+02:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

You want to assess the Remote Procedure Calls listening on a machine to see if they can be leveraged to coerce an authentication?

## Installation

Install [Coercer]({{< ref "../coercer" >}}).

## Usage

```plain
coercer scan [-h] [-v] [--export-json EXPORT_JSON] [--export-xlsx EXPORT_XLSX] [--export-sqlite EXPORT_SQLITE] [--delay DELAY] [--min-http-port MIN_HTTP_PORT] [--max-http-port MAX_HTTP_PORT] [--http-port HTTP_PORT] [--smb-port SMB_PORT] [--auth-type AUTH_TYPE] [--filter-method-name FILTER_METHOD_NAME]
                    [--filter-protocol-name FILTER_PROTOCOL_NAME] [--filter-pipe-name FILTER_PIPE_NAME] [-u USERNAME] [-p PASSWORD] [-d DOMAIN] [--hashes [LMHASH]:NTHASH] [--no-pass] [--dc-ip ip address] (-t TARGET_IP | -f TARGETS_FILE) [-i INTERFACE | -I IP_ADDRESS]
```

## Flags

```plain
  -h, --help            show this help message and exit
  -v, --verbose         Verbose mode (default: False)
  -t TARGET_IP, --target-ip TARGET_IP
                        IP address or hostname of the target machine
  -f TARGETS_FILE, --targets-file TARGETS_FILE
                        File containing a list of IP address or hostname of the target machines
  -i INTERFACE, --interface INTERFACE
                        Interface to listen on incoming authentications.
  -I IP_ADDRESS, --ip-address IP_ADDRESS
                        IP address to listen on incoming authentications.

Advanced options:
  --export-json EXPORT_JSON
                        Export results to specified JSON file.
  --export-xlsx EXPORT_XLSX
                        Export results to specified XLSX file.
  --export-sqlite EXPORT_SQLITE
                        Export results to specified SQLITE3 database file.
  --delay DELAY         Delay between attempts (in seconds)
  --min-http-port MIN_HTTP_PORT
                        Verbose mode (default: False)
  --max-http-port MAX_HTTP_PORT
                        Verbose mode (default: False)
  --http-port HTTP_PORT
                        HTTP port (default: 80)
  --smb-port SMB_PORT   SMB port (default: 445)
  --auth-type AUTH_TYPE
                        Desired authentication type ('smb' or 'http').

Filtering:
  --filter-method-name FILTER_METHOD_NAME
  --filter-protocol-name FILTER_PROTOCOL_NAME
  --filter-pipe-name FILTER_PIPE_NAME

Credentials:
  -u USERNAME, --username USERNAME
                        Username to authenticate to the remote machine.
  -p PASSWORD, --password PASSWORD
                        Password to authenticate to the remote machine. (if omitted, it will be asked unless -no-pass is specified)
  -d DOMAIN, --domain DOMAIN
                        Windows domain name to authenticate to the machine.
  --hashes [LMHASH]:NTHASH
                        NT/LM hashes (LM hash can be empty)
  --no-pass             Don't ask for password (useful for -k)
  --dc-ip ip address    IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
```

## Examples

### Unauthenticated

```plain
$ coercer scan -t 10.10.20.52
       ______
      / ____/___  ___  _____________  _____
     / /   / __ \/ _ \/ ___/ ___/ _ \/ ___/
    / /___/ /_/ /  __/ /  / /__/  __/ /      v2.4-blackhat-edition
    \____/\____/\___/_/   \___/\___/_/       by @podalirius_

[info] Starting scan mode
[info] Scanning target 10.10.20.52
[+] SMB named pipe '\PIPE\lsarpc' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\netlogon' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\samr' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] All done! Bye Bye!
```

### Authenticated

```plain
$ coercer scan -t 10.10.20.52 -u crypt0rr -p Welkom1234
       ______
      / ____/___  ___  _____________  _____
     / /   / __ \/ _ \/ ___/ ___/ _ \/ ___/
    / /___/ /_/ /  __/ /  / /__/  __/ /      v2.4-blackhat-edition
    \____/\____/\___/_/   \___/\___/_/       by @podalirius_

[info] Starting scan mode
[info] Scanning target 10.10.20.52
[+] SMB named pipe '\PIPE\eventlog' is accessible!
   [+] Successful bind to interface (82273fdc-e32a-18c3-3f78-827929dc23ea, 0.0)!
[+] SMB named pipe '\PIPE\lsarpc' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\lsass' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\netdfs' is accessible!
   [+] Successful bind to interface (4fc742e0-4a10-11cf-8273-00aa004ae673, 3.0)!
[+] SMB named pipe '\PIPE\netlogon' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\samr' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
[+] SMB named pipe '\PIPE\spoolss' is accessible!
   [+] Successful bind to interface (12345678-1234-abcd-ef00-0123456789ab, 1.0)!
[+] All done! Bye Bye!
```
