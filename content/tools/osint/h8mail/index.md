---
title : "H8mail"
# pre : ' '
description : "An email OSINT and breach hunting tool using different breach and reconnaissance services, or local breaches such as Troy Hunt's Collection1 and the infamous Breach Compilation torrent."
date : 2020-07-02T15:47:55+02:00
# hidden : true
# draft : true
weight : 150
# tags : ['']
---

---

An email OSINT and breach hunting tool using different breach and reconnaissance services, or local breaches such as Troy Hunt's Collection1 and the infamous Breach Compilation torrent.

## Installation

```plain
python3 -m pip install h8mail
```

## Usage

```plain
usage: h8mail [-h] [-t USER_TARGETS [USER_TARGETS ...]] [-u USER_URLS [USER_URLS ...]] [-q USER_QUERY] [--loose] [-c CONFIG_FILE [CONFIG_FILE ...]] [-o OUTPUT_FILE] [-bc BC_PATH] [-sk] [-k CLI_APIKEYS [CLI_APIKEYS ...]] [-lb LOCAL_BREACH_SRC [LOCAL_BREACH_SRC ...]]
              [-gz LOCAL_GZIP_SRC [LOCAL_GZIP_SRC ...]] [-sf] [-ch [CHASE_LIMIT]] [--power-chase] [--hide] [--debug] [--gen-config]
```

## Flags

```plain
Version 2.5.2 - "ROCKSMASSON.2"  
    ._____. ._____.     ;____________;
    | ._. | | ._. |     ;   h8mail   ;
    | !_| |_|_|_! |     ;------------;
    !___| |_______!  Heartfelt Email OSINT
    .___|_|_| |___.    Use responsibly
    | ._____| |_. | ;____________________;
    | !_! | | !_! | ; github.com/khast3x ;
    !_____! !_____! ;--------------------;

Email information and password lookup tool

optional arguments:
  -h, --help            show this help message and exit
  -t USER_TARGETS [USER_TARGETS ...], --targets USER_TARGETS [USER_TARGETS ...]
                        Either string inputs or files. Supports email pattern matching from input or file, filepath globing and multiple arguments
  -u USER_URLS [USER_URLS ...], --url USER_URLS [USER_URLS ...]
                        Either string inputs or files. Supports URL pattern matching from input or file, filepath globing and multiple arguments. Parse URLs page for emails. Requires http:// or https:// in URL.
  -q USER_QUERY, --custom-query USER_QUERY
                        Perform a custom query. Supports username, password, ip, hash, domain. Performs an implicit "loose" search when searching locally
  --loose               Allow loose search by disabling email pattern recognition. Use spaces as pattern seperators
  -c CONFIG_FILE [CONFIG_FILE ...], --config CONFIG_FILE [CONFIG_FILE ...]
                        Configuration file for API keys. Accepts keys from Snusbase, WeLeakInfo, Leak-Lookup, HaveIBeenPwned, Emailrep, Dehashed and hunterio
  -o OUTPUT_FILE, --output OUTPUT_FILE
                        File to write CSV output
  -bc BC_PATH, --breachcomp BC_PATH
                        Path to the breachcompilation torrent folder. Uses the query.sh script included in the torrent
  -sk, --skip-defaults  Skips HaveIBeenPwned and HunterIO check. Ideal for local scans
  -k CLI_APIKEYS [CLI_APIKEYS ...], --apikey CLI_APIKEYS [CLI_APIKEYS ...]
                        Pass config options. Supported format: "K=V,K=V"
  -lb LOCAL_BREACH_SRC [LOCAL_BREACH_SRC ...], --local-breach LOCAL_BREACH_SRC [LOCAL_BREACH_SRC ...]
                        Local cleartext breaches to scan for targets. Uses multiprocesses, one separate process per file, on separate worker pool by arguments. Supports file or folder as input, and filepath globing
  -gz LOCAL_GZIP_SRC [LOCAL_GZIP_SRC ...], --gzip LOCAL_GZIP_SRC [LOCAL_GZIP_SRC ...]
                        Local tar.gz (gzip) compressed breaches to scans for targets. Uses multiprocesses, one separate process per file. Supports file or folder as input, and filepath globing. Looks for 'gz' in filename
  -sf, --single-file    If breach contains big cleartext or tar.gz files, set this flag to view the progress bar. Disables concurrent file searching for stability
  -ch [CHASE_LIMIT], --chase [CHASE_LIMIT]
                        Add related emails from hunter.io to ongoing target list. Define number of emails per target to chase. Requires hunter.io private API key
  --power-chase         Add related emails from ALL API services to ongoing target list. Use with --chase. Requires a private API key
  --hide                Only shows the first 4 characters of found passwords to output. Ideal for demonstrations
  --debug               Print request debug information
  --gen-config, -g      Generates a configuration file template in the current working directory & exits. Will overwrite existing h8mail_config.ini file
```

## Examples

### Check specific email

```plain
$ h8mail -t john.smith@example.com
    Version 2.5.2 - "ROCKSMASSON.2"  

  ._____. ._____.     ;____________;
  | ._. | | ._. |     ;   h8mail   ;
  | !_| |_|_|_! |     ;------------;
  !___| |_______!  Heartfelt Email OSINT
  .___|_|_| |___.    Use responsibly
  | ._____| |_. | ;____________________;
  | !_! | | !_! | ; github.com/khast3x ;
  !_____! !_____! ;--------------------;

[>] h8mail is up to date
[~] Removing duplicates
[>] Targets:
[>] john.smith@example.com
[>] scylla.sh is up
[~] Target factory started for john.smith@example.com
[~] [john.smith@example.com]>[hunter.io public]
[>] Found 0 related emails for john.smith@example.com using hunter.io (public)
[~] [john.smith@example.com]>[scylla.sh]
[>] Found 11 entries for john.smith@example.com using scylla.sh

 __________________________________________________________________________________________

[>] Showing results for john.smith@example.com
SCYLLA_SOURCE  |   john.smith@example.com > dropbox.com
SCYLLA_HASH    |   john.smith@example.com > b8961bdcb611413c999fb03af8ad3fc83125ad54
SCYLLA_HASH    |   john.smith@example.com > $826y4$31226$dMbT2dfjeY3WbFek4N0GcIc32O4T1Y8y7M7GfR6maY2ecv9E0XbuDb01XjFJ377VdR99/BcisKyLYjy
SCYLLA_HASHSALT|   john.smith@example.com > cd6e237022925e6e61bb479c8f0fe047
SCYLLA_PASSWORD|   john.smith@example.com > John.Smith@example.com
SCYLLA_USERNAME|   john.smith@example.com > 30711075
SCYLLA_SOURCE  |   john.smith@example.com > exploit.in
SCYLLA_PASSWORD|   john.smith@example.com > lolflyline
__________________________________________________________________________________________



                                   Session Recap:  


                 Target                  |                   Status
__________________________________________________________________________________________

         john.smith@example.com          |          Breach Found (8 elements)
__________________________________________________________________________________________

Execution time (seconds):   4.0695648193359375
```

### Use list with emails

```plain
─$ h8mail -t valid_emails.txt
Official h8mail posts:
https://khast3x.club/tags/h8mail/

Version 2.5.4 - "ROCKSMASSON.4"  

  ._____. ._____.     ;____________;
  | ._. | | ._. |     ;   h8mail   ;
  | !_| |_|_|_! |     ;------------;
  !___| |_______!  Heartfelt Email OSINT
  .___|_|_| |___.    Use responsibly
  | ._____| |_. | ;____________________;
  | !_! | | !_! | ; github.com/khast3x ;
  !_____! !_____! ;--------------------;

[>] h8mail is up to date
[~] Reading from file valid_emails.txt
[~] Parsing emails fromvalid_emails.txt
[~] Removing duplicates
[>] Targets:
john@offsec.nl
jane@offsec.nl
hector@offsec.nl
james@offsec.nl
```

### Crawl site for e-mails

```plain
$ h8mail -u 'https://example.com'
      Official h8mail posts: 
      https://khast3x.club/tags/h8mail/

 
    Version 2.5.4 - "ROCKSMASSON.4"  
 
  ._____. ._____.     ;____________;
  | ._. | | ._. |     ;   h8mail   ;
  | !_| |_|_|_! |     ;------------;
  !___| |_______!  Heartfelt Email OSINT
  .___|_|_| |___.    Use responsibly
  | ._____| |_. | ;____________________;
  | !_! | | !_! | ; github.com/khast3x ;
  !_____! !_____! ;--------------------;

[>] h8mail is up to date
[~] Starting URL fetch
[~] Worker fetching https://example.com
[~] Worker done fetch url
Status code: 200
[]
[!] No targets found in URLs. Quitting
```

## URL List

- [Github.com - h8mail](https://github.com/khast3x/h8mail)
- [Github.com - Wiki](https://github.com/khast3x/h8mail/wiki)
