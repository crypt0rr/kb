---
title : "LDAP"
# pre : ' '
description : "Own stuff using LDAP."
date : 2023-10-05T12:26:30+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'LDAP']
---

## NetExec - LDAP

## Installation

Install [NetExec]({{< ref "netexec" >}}).

## Usage

```plain
nxc ldap [-h] [-id CRED_ID [CRED_ID ...]] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [--ignore-pw-decoding] [-k] [--no-bruteforce] [--continue-on-success] [--use-kcache] [--log LOG]
                [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--gfail-limit LIMIT | --ufail-limit LIMIT | --fail-limit LIMIT] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-H HASH [HASH ...]] [--port {636,389}] [--no-smb] [-d DOMAIN | --local-auth] [--asreproast ASREPROAST]
                [--kerberoasting KERBEROASTING] [--trusted-for-delegation] [--password-not-required] [--admin-count] [--users] [--groups] [--dc-list] [--get-sid] [--gmsa] [--gmsa-convert-id GMSA_CONVERT_ID]
                [--gmsa-decrypt-lsa GMSA_DECRYPT_LSA] [--bloodhound] [-ns NAMESERVER] [-c COLLECTION]
                target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -id CRED_ID [CRED_ID ...]
                        database credential ID(s) to use for authentication
  -u USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p PASSWORD [PASSWORD ...]
                        password(s) or file(s) containing passwords
  --ignore-pw-decoding  Ignore non UTF-8 characters when decoding the password file
  -k, --kerberos        Use Kerberos authentication
  --no-bruteforce       No spray when using file for username and password (user1 => password1, user2 => password2
  --continue-on-success
                        continues authentication attempts even after successes
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --log LOG             Export result into a custom file
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  --gfail-limit LIMIT   max number of global failed login attempts
  --ufail-limit LIMIT   max number of failed login attempts per username
  --fail-limit LIMIT    max number of failed login attempts per host
  -M MODULE, --module MODULE
                        module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules    list available modules
  --options             display module options
  --server {http,https}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to (default: same as server-host)
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port {636,389}      LDAP port (default: 389)
  --no-smb              No smb connection
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Retrevie hash on the remote DC:
  Options to get hashes from Kerberos

  --asreproast ASREPROAST
                        Get AS_REP response ready to crack with hashcat
  --kerberoasting KERBEROASTING
                        Get TGS ticket ready to crack with hashcat

Retrieve useful information on the domain:
  Options to to play with Kerberos

  --trusted-for-delegation
                        Get the list of users and computers with flag TRUSTED_FOR_DELEGATION
  --password-not-required
                        Get the list of users with flag PASSWD_NOTREQD
  --admin-count         Get objets that had the value adminCount=1
  --users               Enumerate enabled domain users
  --groups              Enumerate domain groups
  --dc-list             Enumerate Domain Controllers
  --get-sid             Get domain sid

Retrevie gmsa on the remote DC:
  Options to play with gmsa

  --gmsa                Enumerate GMSA passwords
  --gmsa-convert-id GMSA_CONVERT_ID
                        Get the secret name of specific gmsa or all gmsa if no gmsa provided
  --gmsa-decrypt-lsa GMSA_DECRYPT_LSA
                        Decrypt the gmsa encrypted value from LSA

Bloodhound scan:
  Options to play with bloodhoud

  --bloodhound          Perform bloodhound scan
  -ns NAMESERVER, --nameserver NAMESERVER
                        Custom DNS IP
  -c COLLECTION, --collection COLLECTION
                        Which information to collect. Supported: Group, LocalAdmin, Session, Trusts, Default, DCOnly, DCOM, RDP, PSRemote, LoggedOn, Container, ObjectProps, ACL, All. You can specify more than one by
                        separating them with a comma. (default: Default)'
```

## Modules

```plain
[*] adcs                      Find PKI Enrollment Services in Active Directory and Certificate Templates Names
[*] daclread                  Read and backup the Discretionary Access Control List of objects. Based on the work of @_nwodtuhs and @BlWasp_. Be carefull, this module cannot read the DACLS recursively, more explains in the  options.
[*] enum_trusts               Extract all Trust Relationships, Trusting Direction, and Trust Transitivity
[*] find-computer             Finds computers in the domain via the provided text
[*] get-desc-users            Get description of the users. May contained password
[*] get-network               
[*] group-mem                 Retrieves all the members within a Group
[*] groupmembership           Query the groups to which a user belongs.
[*] laps                      Retrieves the LAPS passwords
[*] ldap-checker              Checks whether LDAP signing and binding are required and / or enforced
[*] maq                       Retrieves the MachineAccountQuota domain-level attribute
[*] pso                       Query to get PSO from LDAP
[*] subnets                   Retrieves the different Sites and Subnets of an Active Directory
[*] user-desc                 Get user descriptions stored in Active Directory
[*] whoami                    Get details of provided user
```

## Examples

### Active Directory Certificate Services (ADCS)

Finding ADCS-server(s) in the environment.

```plain
nxc ldap 100.120.137.43 -u crypt0rr -p Welkom1234 -M adcs
SMB         100.120.137.43  445    DC01        [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
LDAP        100.120.137.43  389    DC01        [+] offsec.nl\crypt0rr:Welkom1234!
ADCS                                           Found PKI Enrollment Server: ADCS01.offsec.nl
ADCS                                           Found CN: offsec-ADCS01-CA
```
