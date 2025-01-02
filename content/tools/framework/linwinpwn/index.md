---
title : "linWinPwn"
#pre : '<i class="far fa-window-restore"></i> '
description : "Swiss-Army knife for Active Directory Pentesting using Linux."
date : 2024-05-08T10:37:03+02:00
# hidden : true
# draft : true
weight : 200
tags : ['Framework', 'Active Directory' ,'NTLM', 'Coercer', 'LSASS', 'Windows', 'Passwordspray']
---

---

linWinPwn is a bash script that wraps a number of Active Directory tools for enumeration (LDAP, RPC, ADCS, MSSQL, Kerberos), vulnerability checks (noPac, ZeroLogon, MS17-010, MS14-068), object modifications (password change, add user to group, RBCD, Shadow Credentials) and password dumping (secretsdump, lsassy, nanodump, DonPAPI). The script streamlines the use of a large number of tools: impacket, bloodhound, netexec, enum4linux-ng, ldapdomaindump, lsassy, smbmap, kerbrute, adidnsdump, certipy, silenthound, bloodyAD, DonPAPI and many others.

## Installation

Clone repository:

```plain
git clone https://github.com/lefayjey/linWinPwn
cd linWinPwn; chmod +x linWinPwn.sh
```

Install requirements:

```plain
chmod +x install.sh
./install.sh
```

## Usage

```plain
./linWinPwn.sh -t dc_ip (No password for anonymous login)
```

```plain
./linWinPwn.sh -t dc_ip -d domain -u user [-p password or -H hash or -K kerbticket]
```

## Flags

```plain
-h/--help         Show the help message
-t/--target       IP Address of Target Domain Controller [MANDATORY]
-d/--domain       Domain of user (default: empty)
-u/--username     Username (default: empty)
-p                Password (NTLM authentication only) (default: empty)
-H                LM:NT (NTLM authentication only) (default: empty)
-K                Location to Kerberos ticket './krb5cc_ticket' (Kerberos authentication only) (default: empty)
-A                AES Key (Kerberos authentication only) (default: empty)
-C                Location to PFX Certificate './cert.pfx' (default: empty)
--cert-pass       Password of provided PFX Certificate (optional)
--auto            Run automatic enumeration
-o/--output       Output directory (default: current dir)
--auto-config     Run NTP sync with target DC and adds entry to /etc/hosts
--ldaps           Use LDAPS instead of LDAP (port 636)
--force-kerb      Use Kerberos authentication instead of NTLM when possible (requires password or NTLM hash)
--verbose         Enable all verbose and debug outputs
-I/--interface    Attacker's network interface (default: eth0)
-T/--targets      Target systems for Vuln Scan, SMB Scan and Pwd Dump (default: Domain Controllers)
     Choose between: DC (Domain Controllers), All (All domain servers), File='path_to_file' (File containing list of servers), IP='IP_or_hostname' (IP or hostname)
```

## Examples

### Unauthenticated

```plain
$ ./linWinPwn.sh -t 100.70.60.50

       _        __        ___       ____                  
      | |(_)_ __\ \      / (_)_ __ |  _ \__      ___ __   
      | || | '_  \ \ /\ / /| | '_ \| |_) \ \ /\ / | '_ \  
      | || | | | |\ V  V / | | | | |  __/ \ V  V /| | | | 
      |_||_|_| |_| \_/\_/  |_|_| |_|_|     \_/\_/ |_| |_| 

      linWinPwn: version 1.0.7 
      https://github.com/lefayjey/linWinPwn
      Author: lefayjey
      Inspired by: S3cur3Th1sSh1t's WinPwn

[+] Wed May  8 10:46:35 CEST 2024
[-] Users list file not found
[-] Passwords list file not found

[i] Target domain: offsec.nl
[i] Domain Controller's FQDN: DC1.offsec.nl
[i] Domain Controller's IP: 100.70.60.50
[i] Domain Controller's ports: RPC filtered|closed, SMB filtered|closed, LDAP filtered|closed, LDAPS filtered|closed
[i] Output folder: /home/crypt0rr/tools/linWinPwn/linWinPwn_offsec.nl_null
[i] User wordlist file: /opt/lwp-wordlists/cirt-default-usernames.txt
[i] Password wordlist file: /opt/lwp-wordlists/rockyou.txt
[i] Attacker's IP: 
[i] Attacker's Interface: eth0
[i] Current target(s): Domain Controllers 
[i] Authentication method: null session 
[i] SID of Domain: 


[Init menu] Please choose from the following options:
----------------------------------------------------
ENTER) Launch linWinPwn in interactive mode
A) Authentication Menu
C) Configuration Menu
exit) Exit
> 
[*] DNS dump using adidnsdump
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Querying zone for records
[+] Found 0 records


[Main menu] Please choose from the following options:
-----------------------------------------------------
1) Re-run DNS Enumeration using adidnsdump
2) Active Directory Enumeration Menu
3) ADCS Enumeration Menu
4) Brute Force Attacks Menu
5) Kerberos Attacks Menu
6) SMB shares Enumeration Menu
7) Vulnerability Checks Menu
8) MSSQL Enumeration Menu
9) Password Dump Menu
10) AD Objects or Attributes Modification Menu
11) Command Execution Menu
back) Go back to Init Menu
```

### Authenticated

```plain
$ ./linWinPwn.sh -t 100.70.60.50 -d offsec.nl -u johndoe -p Welkom1234

       _        __        ___       ____                  
      | |(_)_ __\ \      / (_)_ __ |  _ \__      ___ __   
      | || | '_  \ \ /\ / /| | '_ \| |_) \ \ /\ / | '_ \  
      | || | | | |\ V  V / | | | | |  __/ \ V  V /| | | | 
      |_||_|_| |_| \_/\_/  |_|_| |_|_|     \_/\_/ |_| |_| 

      linWinPwn: version 1.0.7 
      https://github.com/lefayjey/linWinPwn
      Author: lefayjey
      Inspired by: S3cur3Th1sSh1t's WinPwn

[+] Wed May  8 10:51:11 CEST 2024
[-] Users list file not found
[-] Passwords list file not found

[i] Target domain: offsec.nl
[i] Domain Controller's FQDN: DC1.offsec.nl
[i] Domain Controller's IP: 100.70.60.50
[i] Domain Controller's ports: RPC filtered|closed, SMB filtered|closed, LDAP filtered|closed, LDAPS filtered|closed
[i] Output folder: /home/crypt0rr/tools/linWinPwn/linWinPwn_offsec.nl_johndoe
[i] User wordlist file: /opt/lwp-wordlists/cirt-default-usernames.txt
[i] Password wordlist file: /opt/lwp-wordlists/rockyou.txt
[i] Attacker's IP: 
[i] Attacker's Interface: eth0
[i] Current target(s): Domain Controllers 
[i] Authentication method: password of johndoe
[i] SID of Domain: 

[Init menu] Please choose from the following options:
----------------------------------------------------
ENTER) Launch linWinPwn in interactive mode
A) Authentication Menu
C) Configuration Menu
exit) 
> 
[*] DNS dump using adidnsdump
[-] Connecting to host...
[-] Binding to host
[+] Bind OK
[-] Querying zone for records
[+] Found 21 records


[Main menu] Please choose from the following options:
-----------------------------------------------------
1) Re-run DNS Enumeration using adidnsdump
2) Active Directory Enumeration Menu
3) ADCS Enumeration Menu
4) Brute Force Attacks Menu
5) Kerberos Attacks Menu
6) SMB shares Enumeration Menu
7) Vulnerability Checks Menu
8) MSSQL Enumeration Menu
9) Password Dump Menu
10) AD Objects or Attributes Modification Menu
11) Command Execution Menu
back) Go back to Init Menu
exit)
```

## URL list

- [Github.com - linWinPwn](https://github.com/lefayjey/linWinPwn)
