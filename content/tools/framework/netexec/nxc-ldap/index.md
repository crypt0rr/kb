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

Install [NetExec]({{< ref "../netexec" %}}).

## Usage

```plain
netexec ldap [-h] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]]
                    [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache]
                    [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                    [-H HASH [HASH ...]] [--port PORT] [--no-smb] [-d DOMAIN | --local-auth] [--asreproast ASREPROAST] [--kerberoasting KERBEROASTING] [--query QUERY QUERY] [--trusted-for-delegation] [--password-not-required]
                    [--admin-count] [--users [USERS ...]] [--groups] [--dc-list] [--get-sid] [--active-users [ACTIVE_USERS ...]] [--gmsa] [--gmsa-convert-id GMSA_CONVERT_ID] [--gmsa-decrypt-lsa GMSA_DECRYPT_LSA] [--bloodhound]
                    [-c COLLECTION]
                    target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -H HASH [HASH ...], --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           LDAP port (default: 389)
  --no-smb              No smb connection
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Generic:
  Generic options for nxc across protocols

  -t THREADS, --threads THREADS
                        set how many concurrent threads to use (default: 256)
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output:
  Options to set verbosity levels and control output

  --verbose             enable verbose output
  --debug               enable debug level information
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds (default: 3)

Authentication:
  Options for authenticating

  -u USERNAME [USERNAME ...], --username USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p PASSWORD [PASSWORD ...], --password PASSWORD [PASSWORD ...]
                        password(s) or file(s) containing passwords
  -id CRED_ID [CRED_ID ...]
                        database credential ID(s) to use for authentication
  --ignore-pw-decoding  Ignore non UTF-8 characters when decoding the password file
  --no-bruteforce       No spray when using file for username and password (user1 => password1, user2 => password2)
  --continue-on-success
                        continues authentication attempts even after successes
  --gfail-limit LIMIT   max number of global failed login attempts
  --ufail-limit LIMIT   max number of failed login attempts per username
  --fail-limit LIMIT    max number of failed login attempts per host

Kerberos:
  Options for Kerberos authentication

  -k, --kerberos        Use Kerberos authentication
  --use-kcache          Use Kerberos authentication from ccache file (KRB5CCNAME)
  --aesKey AESKEY [AESKEY ...]
                        AES key to use for Kerberos Authentication (128 or 256 bits)
  --kdcHost KDCHOST     FQDN of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter

Servers:
  Options for nxc servers

  --server {http,https}
                        use the selected server (default: https)
  --server-host HOST    IP to bind the server to (default: 0.0.0.0)
  --server-port PORT    start the server on the specified port
  --connectback-host CHOST
                        IP for the remote system to connect back to

Modules:
  Options for nxc modules

  -M MODULE, --module MODULE
                        module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules    list available modules
  --options             display module options

Retrieve hash on the remote DC:
  Options to get hashes from Kerberos

  --asreproast ASREPROAST
                        Output AS_REP response to crack with hashcat to file
  --kerberoasting KERBEROASTING
                        Output TGS ticket to crack with hashcat to file

Retrieve useful information on the domain:
  Options to to play with Kerberos

  --query QUERY QUERY   Query LDAP with a custom filter and attributes
  --trusted-for-delegation
                        Get the list of users and computers with flag TRUSTED_FOR_DELEGATION
  --password-not-required
                        Get the list of users with flag PASSWD_NOTREQD
  --admin-count         Get objets that had the value adminCount=1
  --users [USERS ...]   Enumerate enabled domain users
  --groups              Enumerate domain groups
  --dc-list             Enumerate Domain Controllers
  --get-sid             Get domain sid
  --active-users [ACTIVE_USERS ...]
                        Get Active Domain Users Accounts

Retrieve gmsa on the remote DC:
  Options to play with gmsa

  --gmsa                Enumerate GMSA passwords
  --gmsa-convert-id GMSA_CONVERT_ID
                        Get the secret name of specific gmsa or all gmsa if no gmsa provided
  --gmsa-decrypt-lsa GMSA_DECRYPT_LSA
                        Decrypt the gmsa encrypted value from LSA

Bloodhound Scan:
  Options to play with Bloodhoud

  --bloodhound          Perform a Bloodhound scan
  -c COLLECTION, --collection COLLECTION
                        Which information to collect. Supported: Group, LocalAdmin, Session, Trusts, Default, DCOnly, DCOM, RDP, PSRemote, LoggedOn, Container, ObjectProps, ACL, All. You can specify more than one by separating them
                        with a comma (default: Default)
```

## Modules

```plain
LOW PRIVILEGE MODULES
[*] adcs                      Find PKI Enrollment Services in Active Directory and Certificate Templates Names
[*] daclread                  Read and backup the Discretionary Access Control List of objects. Be careful, this module cannot read the DACLS recursively, see more explanation in the options.
[*] enum_trusts               Extract all Trust Relationships, Trusting Direction, and Trust Transitivity
[*] find-computer             Finds computers in the domain via the provided text
[*] get-desc-users            Get description of the users. May contained password
[*] get-network               Query all DNS records with the corresponding IP from the domain.
[*] get-unixUserPassword      Get unixUserPassword attribute from all users in ldap
[*] get-userPassword          Get userPassword attribute from all users in ldap
[*] group-mem                 Retrieves all the members within a Group
[*] groupmembership           Query the groups to which a user belongs.
[*] laps                      Retrieves all LAPS passwords which the account has read permissions for.
[*] ldap-checker              Checks whether LDAP signing and binding are required and / or enforced
[*] maq                       Retrieves the MachineAccountQuota domain-level attribute
[*] obsolete                  Extract all obsolete operating systems from LDAP
[*] pso                       Module to get the Fine Grained Password Policy/PSOs
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
