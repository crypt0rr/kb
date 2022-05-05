---
title : "smbserver.py"
# pre : ' '
description : "This script will launch a SMB Server and add a share specified as an argument. You need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or the NTLM hash."
date : 2022-02-14T12:02:26+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## smbserver.py

This script will launch a SMB Server and add a share specified as an argument. You need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or the NTLM hash.

### Installation

Install the [Impacket Framework]({{< ref "../" >}})

### Usage

```plain
smbserver.py [-h] [-comment COMMENT] [-username USERNAME] [-password PASSWORD] [-hashes LMHASH:NTHASH] [-ts] [-debug] [-ip INTERFACE_ADDRESS] [-port PORT] [-smb2support] shareName sharePath
```

### Flags

```plain
Impacket v0.10.1.dev1+20220504.120002.d5097759 - Copyright 2022 SecureAuth Corporation

This script will launch a SMB Server and add a share specified as an argument. You need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or the NTLM hash. 

positional arguments:
  shareName             name of the share to add
  sharePath             path of the share to add

optional arguments:
  -h, --help            show this help message and exit
  -comment COMMENT      share's comment to display when asked for shares
  -username USERNAME    Username to authenticate clients
  -password PASSWORD    Password for the Username
  -hashes LMHASH:NTHASH
                        NTLM hashes for the Username, format is LMHASH:NTHASH
  -ts                   Adds timestamp to every logging output
  -debug                Turn DEBUG output ON
  -ip INTERFACE_ADDRESS, --interface-address INTERFACE_ADDRESS
                        ip address of listening interface
  -port PORT            TCP port for listening incoming connections (default 445)
  -smb2support          SMB2 Support (experimental!)
```

### Examples

#### SMB server share without password

```plain
sudo smbserver.py -smb2support -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

#### SMB server share with password

```plain
sudo smbserver.py -smb2support -username <username> -password <password> -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

#### SMB server during assessment to catch hashes

```plain
sudo smbserver.py -smb2support share $PWD
```

### URL list

* [Github.com](https://github.com/SecureAuthCorp/impacket)
