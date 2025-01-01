---
title : "nslookup"
# pre : '<i class="fas fa-code"></i> '
description : "Displays information that you can use to diagnose Domain Name System (DNS) infrastructure."
date : 2020-09-23T12:30:20+02:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

Displays information that you can use to diagnose Domain Name System (DNS) infrastructure.

## Usage

```plain
nslookup [-opt ...]             # interactive mode using default server
nslookup [-opt ...] - server    # interactive mode using 'server'
nslookup [-opt ...] host        # just look up 'host' using default server
nslookup [-opt ...] host server # just look up 'host' using 'server'
```

## Flags

```plain
Commands:   (identifiers are shown in uppercase, [] means optional)
NAME            - print info about the host/domain NAME using default server
NAME1 NAME2     - as above, but use NAME2 as server
help or ?       - print info on common commands
set OPTION      - set an option
    all                 - print options, current server and host
    [no]debug           - print debugging information
    [no]d2              - print exhaustive debugging information
    [no]defname         - append domain name to each query
    [no]recurse         - ask for recursive answer to query
    [no]search          - use domain search list
    [no]vc              - always use a virtual circuit
    domain=NAME         - set default domain name to NAME
    srchlist=N1[/N2/.../N6] - set domain to N1 and search list to N1,N2, etc.
    root=NAME           - set root server to NAME
    retry=X             - set number of retries to X
    timeout=X           - set initial time-out interval to X seconds
    type=X              - set query type (ex. A,AAAA,A+AAAA,ANY,CNAME,MX,NS,PTR,SOA,SRV)
    querytype=X         - same as type
    class=X             - set query class (ex. IN (Internet), ANY)
    [no]msxfr           - use MS fast zone transfer
    ixfrver=X           - current version to use in IXFR transfer request
server NAME     - set default server to NAME, using current default server
lserver NAME    - set default server to NAME, using initial server
root            - set current default server to the root
ls [opt] DOMAIN [> FILE] - list addresses in DOMAIN (optional: output to FILE)
    -a          -  list canonical names and aliases
    -d          -  list all records
    -t TYPE     -  list records of the given RFC record type (ex. A,CNAME,MX,NS,PTR etc.)
view FILE           - sort an 'ls' output file and view it with pg
exit            - exit the program
```

## Examples

```plain
nslookup example.com
Server:  Cloudflare
Address:  1.1.1.1

Non-authoritative answer:
Name:    example.com
Addresses:  2606:2800:220:1:248:1893:25c8:1946
          93.184.216.34
```

## URL List

- [Docs.microsoft.com](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup)
