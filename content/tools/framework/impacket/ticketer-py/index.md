---
title : "ticketer.py"
# pre : ' '
description : "Creates a Kerberos golden/silver tickets based on user options."
date : 2023-12-03T06:36:35+01:00
# hidden : true
# draft : true
weight : 150
# tags : ['']
---

---

Creates a Kerberos golden/silver tickets based on user options.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
ticketer.py [-h] [-spn SPN] [-request] -domain DOMAIN -domain-sid DOMAIN_SID [-aesKey hex key] [-nthash NTHASH] [-keytab KEYTAB] [-groups GROUPS] [-user-id USER_ID] [-extra-sid EXTRA_SID] [-extra-pac] [-old-pac]
                   [-duration DURATION] [-ts] [-debug] [-user USER] [-password PASSWORD] [-hashes LMHASH:NTHASH] [-dc-ip ip address] [-impersonate IMPERSONATE]
                   target
```

## Flags

```plain
Impacket v0.12.0.dev1+20240718.115833.4e0e3174 - Copyright 2023 Fortra

positional arguments:
  target                username for the newly created ticket

options:
  -h, --help            show this help message and exit
  -spn SPN              SPN (service/server) of the target service the silver ticket will be generated for. if omitted, golden ticket will be created
  -request              Requests ticket to domain and clones it changing only the supplied information. It requires specifying -user
  -domain DOMAIN        the fully qualified domain name (e.g. contoso.com)
  -domain-sid DOMAIN_SID
                        Domain SID of the target domain the ticker will be generated for
  -aesKey hex key       AES key used for signing the ticket (128 or 256 bits)
  -nthash NTHASH        NT hash used for signing the ticket
  -keytab KEYTAB        Read keys for SPN from keytab file (silver ticket only)
  -groups GROUPS        comma separated list of groups user will belong to (default = 513, 512, 520, 518, 519)
  -user-id USER_ID      user id for the user the ticket will be created for (default = 500)
  -extra-sid EXTRA_SID  Comma separated list of ExtraSids to be included inside the ticket's PAC
  -extra-pac            Populate your ticket with extra PAC (UPN_DNS)
  -old-pac              Use the old PAC structure to create your ticket (exclude PAC_ATTRIBUTES_INFO and PAC_REQUESTOR
  -duration DURATION    Amount of hours till the ticket expires (default = 24*365*10)
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -impersonate IMPERSONATE
                        Sapphire ticket. target username that will be impersonated (through S4U2Self+U2U) for querying the ST and extracting the PAC, which will be included in the new ticket

authentication:
  -user USER            domain/username to be used if -request is chosen (it can be different from domain/username
  -password PASSWORD    password for domain/username
  -hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -dc-ip ip address     IP Address of the domain controller. If ommited it use the domain part (FQDN) specified in the target parameter

Examples: 
        ./ticketer.py -nthash <krbtgt/service nthash> -domain-sid <your domain SID> -domain <your domain FQDN> baduser

        will create and save a golden ticket for user 'baduser' that will be all encrypted/signed used RC4.
        If you specify -aesKey instead of -ntHash everything will be encrypted using AES128 or AES256
        (depending on the key specified). No traffic is generated against the KDC. Ticket will be saved as
        baduser.ccache.

        ./ticketer.py -nthash <krbtgt/service nthash> -aesKey <krbtgt/service AES> -domain-sid <your domain SID> -domain <your domain FQDN> -request -user <a valid domain user> -password <valid domain user's password> baduser

        will first authenticate against the KDC (using -user/-password) and get a TGT that will be used
        as template for customization. Whatever encryption algorithms used on that ticket will be honored,
        hence you might need to specify both -nthash and -aesKey data. Ticket will be generated for 'baduser'
        and saved as baduser.ccache
```

## URL list

- [Github.com - ticketer.py](https://github.com/fortra/impacket/blob/master/examples/ticketer.py)
