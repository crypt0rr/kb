---
title : "smbserver.py"
# pre : ' '
description : "This script will launch a SMB Server and add a share specified as an argument. You need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or the NTLM hash."
date : 2022-02-14T12:02:26+01:00
# hidden : true
# draft : true
weight : 140
# tags : ['']
---

---

This script will launch a SMB Server and add a share specified as an argument. You need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or the NTLM hash.

## Installation

Install [Impacket]({{< ref "../impacket" >}}).

## Usage

```plain
smbserver.py [-h] [-comment COMMENT] [-username USERNAME] [-password PASSWORD] [-hashes LMHASH:NTHASH] [-ts] [-debug] [-ip INTERFACE_ADDRESS] [-port PORT] [-dropssp] [-smb2support] [-outputfile OUTPUTFILE]
                    shareName sharePath
```

## Flags

```plain
Impacket v0.13.0.dev0+20250820.203717.835623ae - Copyright Fortra, LLC and its affiliated companies 

This script will launch a SMB Server and add a share specified as an argument. Usually, you need to be root in order to bind to port 445. For optional authentication, it is possible to specify username and password or
the NTLM hash. Example: smbserver.py -comment 'My share' TMP /tmp

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
  -dropssp              Disable NTLM ESS/SSP during negotiation
  -smb2support          SMB2 Support (experimental!)
  -outputfile OUTPUTFILE
                        Output file to log smbserver output messages
```

## Examples

### SMB server share without password

```plain
sudo smbserver.py -smb2support -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

### SMB server share with password

```plain
sudo smbserver.py -smb2support -username <username> -password <password> -ip <ip-to-bind> <share-name> <local-folder-to-share>
```

### SMB server during assessment to catch hashes

```plain
sudo smbserver.py -smb2support share $PWD
```

## URL List

- [Github.com - smbserver.py](https://github.com/fortra/impacket/blob/master/examples/smbserver.py)
