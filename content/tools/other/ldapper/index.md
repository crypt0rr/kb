---
title : "ldapper"
# pre : ' '
description : "A GoLang tool to enumerate and abuse LDAP. Made simple."
date : 2022-09-25T12:59:17+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Other', 'LDAP', 'Active Directory']
---

## ldapper

A GoLang tool to enumerate and abuse LDAP. Made simple.

Ldapper was created with for use in offensive security engagements for targeted user enumeration, group enumeration, and more. Ldapper uses familiar "net" commands such as "net user" and "net group" to perform all its queries and its output follows the same conventions. Ldapper's user interface operates as a pseudo-interactive shell, where the user can input commands until exited. All traffic goes over the LDAP(S) protocol with a singular bind to help you better blend into the network.

Ldapper is proxy aware and supports NTLM authentication with a user's hash. Additionally, this tool can perform modification actions within LDAP. More functionality is planned for later releases, but for now additional supported command functions are:

Add Domain Computers
Add/Remove Arbitrary SPNs
Kerberoast
This tool should be considered in its beta stages. Please report any bugs, issues, or functionality ideas for future releases.

### Installation

```plain
git clone https://github.com/Synzack/ldapper
go mod tidy
go build
```

### Usage

```plain
./ldapper [OPTIONS]
```

### Flags

```plain
  -H string
        Use NTLM authentication
  -dc string
        IP address or FQDN of target DC
  -h    Display help menu
  -o string
        Log file
  -p string
        Password
  -s    Bind using LDAPS
  -socks4 string
        SOCKS4 Proxy Address (ip:port)
  -socks4a string
        SOCKS4A Proxy Address (ip:port)
  -socks5 string
        SOCKS5 Proxy Address (ip:port)
  -u string
        Username (username@domain)
Examples:
        With Password:  ./ldapper -u <username@domain> -p <password> -dc <ip/FQDN> -s
        With Hash:      ./ldapper -u <username@domain> -H <hash> -dc <ip/FQDN> -s
```

### Examples

#### Setting up connection

* Username/password authentication: `./ldapper -dc 10.0.0.20 -u crypt0rr@offsec.nl -p Welkom1234`
* NTLM Authentication: `./ldapper -dc 10.0.0.20 -u crypt0rr@offsec.nl -H 97f2592347d8fbe42be381726ff9ea83`

#### Starting LDAP-shell session running 'net user'

```plain
> net user administrator

User Information - administrator:
-------------------------------------------------------------------------------
User Name:              Administrator
Full Name:              Administrator
Comment:                Built-in account for administering the computer/domain
User Account Control:   USER_DONT_EXPIRE_PASSWORD
                        USER_NORMAL_ACCOUNT
                        (If Enabled, Check Last Lockout Time)
Last Lockout Time: 
Account Expires:        Never
Password Last Set:      08/09/2022 11:08:05 AM
Home Directory: 
Last logon:             09/16/2022 01:20:30 PM
Mail: 
SPN(s): 
```

#### Retrieve ms-DS-MachineAccountQuota

```plain
> mquota
Machine Account Quota: 10
```

#### Checking password policy

```plain
> passpol

Minimum Password Length:        7
Password History Length:        24
Lockout Threshold:              0
Lockout Duration:               30      minutes
Reset Account Lockout Counter:  30      minutes
Minimum Password Age:           1       day(s)
Maximum Password Age:           42      day(s)

Password Complexity:            DOMAIN_PASSWORD_COMPLEX
```

#### Retrieve group members 'net group'

```plain
> net group Domain Admins
Comment: Designated administrators of the domain

Primary Group Members
-------------------------------------------------------------------------------
ThisIsAGroupWithinDA (Group)    johndo-adm              KIETH_MCINTOSH
STEWART_SANDERS                 ERICH_ATKINS            GERTRUDE_KNIGHT
AUGUSTINE_PUCKETT               Administrator


> net group Account Operators
Comment: Members can administer domain user and group accounts

Primary Group Members
-------------------------------------------------------------------------------
crypt0rr        KIMBERLEY_CONTRERAS     LORENE_CLINE
1060184468SA
```

#### Get list of SPNs and perform kerberoasting

```plain
> getspns
SPN                     Username                PasswordLastSet                 LastLogon       Delegation
CIFS/AWSWVIR1000000     HAL_MURRAY              2022-07-04 15:27:52 +0200 CEST  <never>
CIFS/FINWWKS1000000     MYRON_FORD              2022-07-04 15:26:44 +0200 CEST  <never>
CIFS/TSTWDBAS1000000    SHIRLEY_RANDALL         2022-07-04 15:26:37 +0200 CEST  <never>
CIFS/TSTWVIR1000000     TANYA_DEJESUS           2022-07-04 15:19:32 +0200 CEST  <never>
ftp/AWSWAPPS1000000     HEATH_PATTON            2022-07-04 15:20:44 +0200 CEST  <never>
ftp/AWSWSECS1000000     ANGEL_WORKMAN           2022-07-04 15:25:28 +0200 CEST  <never>
ftp/BDEWWKS1000001      DIANNA_KIRBY            2022-07-04 15:27:31 +0200 CEST  <never>
ftp/FINWLPT1000003      MARVA_CLARK             2022-07-04 15:23:10 +0200 CEST  <never>
ftp/FINWWEBS1000001     RICKIE_RUSSO            2022-07-04 15:20:00 +0200 CEST  <never>
ftp/GOOWLPT1000001      ABE_MASON               2022-07-04 15:23:37 +0200 CEST  <never>
```

```plain
> roast HAL_MURRAY
$krb5tgs$23$*HAL_MURRAY$OFFSEC.NL$HAL_MURRAY*$0d2768f9c9cb33b22e338cd4e732f3dd$6e47d8cb3701126a966d0c7697b[...]091b8b73a9a1dba92d661a
```

### URL list

* [Github.com - ldapper](https://github.com/Synzack/ldapper)
