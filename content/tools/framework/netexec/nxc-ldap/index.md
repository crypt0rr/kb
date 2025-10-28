---
title : "LDAP"
# pre : ' '
description : "Own stuff using LDAP."
date : 2023-10-05T12:26:30+02:00
# hidden : true
# draft : true
weight : 20
tags : ['Framework', 'LDAP']
---

---

## Installation

Install [NetExec]({{< ref "../netexec" >}}).

## Usage

```plain
netexec ldap [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp] [--dns-timeout DNS_TIMEOUT]
                    [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce] [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT]
                    [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST] [--pfx-cert PFXCERT] [--pfx-base64 PFXB64] [--pfx-pass PFXPASS] [--pem-cert PEMCERT] [--pem-key PEMKEY]
                    [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L [LIST_MODULES]] [--options] [-H HASH [HASH ...]] [--port PORT] [-d DOMAIN | --local-auth] [--asreproast ASREPROAST]
                    [--kerberoasting KERBEROASTING] [--kerberoast-account KERBEROAST_ACCOUNT [KERBEROAST_ACCOUNT ...]] [--no-preauth-targets NO_PREAUTH_TARGETS] [--base-dn BASE_DN] [--query QUERY QUERY]
                    [--find-delegation] [--trusted-for-delegation] [--password-not-required] [--admin-count] [--users [USERS ...]] [--users-export USERS_EXPORT] [--groups [GROUPS]] [--computers] [--dc-list] [--get-sid]
                    [--active-users [ACTIVE_USERS ...]] [--pso] [--pass-pol] [--gmsa] [--gmsa-convert-id GMSA_CONVERT_ID] [--gmsa-decrypt-lsa GMSA_DECRYPT_LSA] [--bloodhound] [-c COLLECTION]
                    target [target ...]
```

## Flags

```plain
positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

options:
  -h, --help            show this help message and exit
  -H, --hash HASH [HASH ...]
                        NTLM hash(es) or file(s) containing NTLM hashes
  --port PORT           LDAP port (default: 389)
  -d DOMAIN             domain to authenticate to
  --local-auth          authenticate locally to each target

Generic:
  Generic options for nxc across protocols

  --version             Display nxc version
  -t, --threads THREADS
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

  -u, --username USERNAME [USERNAME ...]
                        username(s) or file(s) containing usernames
  -p, --password PASSWORD [PASSWORD ...]
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

Certificate:
  Options for certificate authentication

  --pfx-cert PFXCERT    Use certificate authentication from pfx file .pfx
  --pfx-base64 PFXB64   Use certificate authentication from pfx file encoded in base64
  --pfx-pass PFXPASS    Password of the pfx certificate
  --pem-cert PEMCERT    Use certificate authentication from PEM file
  --pem-key PEMKEY      Private key for the PEM format

Modules:
  Options for nxc modules

  -M, --module MODULE   module to use
  -o MODULE_OPTION [MODULE_OPTION ...]
                        module options
  -L, --list-modules [LIST_MODULES]
                        list available modules
  --options             display module options

Retrieve hash on the remote DC:
  Options to get hashes from Kerberos

  --asreproast ASREPROAST
                        Output AS_REP response to crack with hashcat to file
  --kerberoasting, --kerberoast KERBEROASTING
                        Output TGS ticket to crack with hashcat to file
  --kerberoast-account KERBEROAST_ACCOUNT [KERBEROAST_ACCOUNT ...]
                        Target specific accounts for kerberoasting (sAMAccountNames or file containing sAMAccountNames)
  --no-preauth-targets NO_PREAUTH_TARGETS
                        Targeted kerberoastable users

Retrieve useful information on the domain:
  --base-dn BASE_DN     base DN for search queries
  --query QUERY QUERY   Query LDAP with a custom filter and attributes
  --find-delegation     Finds delegation relationships within an Active Directory domain. (Enabled Accounts only)
  --trusted-for-delegation
                        Get the list of users and computers with flag TRUSTED_FOR_DELEGATION
  --password-not-required
                        Get the list of users with flag PASSWD_NOTREQD
  --admin-count         Get user that had the value adminCount=1
  --users [USERS ...]   Enumerate domain users
  --users-export USERS_EXPORT
                        Enumerate domain users and export them to the specified file
  --groups [GROUPS]     Enumerate domain groups, if a group is specified than its members are enumerated
  --computers           Enumerate domain computers
  --dc-list             Enumerate Domain Controllers
  --get-sid             Get domain sid
  --active-users [ACTIVE_USERS ...]
                        Get Active Domain Users Accounts
  --pso                 Get Fine Grained Password Policy/PSOs
  --pass-pol            Dump password policy

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
  -c, --collection COLLECTION
                        Which information to collect. Supported: Group, LocalAdmin, Session, Trusts, Default, DCOnly, DCOM, RDP, PSRemote, LoggedOn, Container, ObjectProps, ACL, All. You can specify more than one by
                        separating them with a comma (default: Default)
```

## Low Privilege Modules

```plain
ENUMERATION
[*] adcs                      Find PKI Enrollment Services in Active Directory and Certificate Templates Names
[*] badsuccessor              Check if vulnerable to bad successor attack (DMSA)
[*] certipy-find              certipy find command with options to export the result to text/csv/json. Default: Show only vulnerable templates
[*] daclread                  Read and backup the Discretionary Access Control List of objects. Be careful, this module cannot read the DACLS recursively, see more explanation in the options.
[*] dump-computers            Dumps all computers in the domain
[*] entra-id                  Find the Entra ID sync server
[*] enum_trusts               [REMOVED] Extract all Trust Relationships, Trusting Direction, and Trust Transitivity
[*] find-computer             Finds computers in the domain via the provided text
[*] get-network               Query all DNS records with the corresponding IP from the domain.
[*] group-mem                 [REMOVED] Retrieves all the members within a Group
[*] groupmembership           Query the groups to which a user belongs.
[*] ldap-checker              [REMOVED] Checks whether LDAP signing and channel binding are required and / or enforced
[*] maq                       Retrieves the MachineAccountQuota domain-level attribute
[*] obsolete                  Extract all obsolete operating systems from LDAP
[*] pso                       Module to get the Fine Grained Password Policy/PSOs
[*] sccm                      Find a SCCM infrastructure in the Active Directory
[*] subnets                   Retrieves the different Sites and Subnets of an Active Directory
[*] whoami                    Get details of provided user

CREDENTIAL_DUMPING
[*] get-desc-users            Get description of the users. May contain password
[*] get-info-users            Get the info field of all users. May contain password
[*] get-unixUserPassword      Get unixUserPassword attribute from all users in ldap
[*] get-userPassword          Get userPassword attribute from all users in ldap
[*] laps                      Retrieves all LAPS passwords which the account has read permissions for.
[*] user-desc                 Get user descriptions stored in Active Directory

PRIVILEGE_ESCALATION
[*] pre2k                     Identify pre-created computer accounts, save the results to a file, and obtain TGTs for each
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
