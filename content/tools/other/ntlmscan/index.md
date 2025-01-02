---
title : "Ntlmscan"
# pre : ' '
description : "scan for NTLM directories."
date : 2022-12-02T19:21:04+01:00
# hidden : true
# draft : true
weight : 1250
tags : ['Other', 'NTLM']
---

---

scan for NTLM directories

reliable targets are:

- OWA servers
- Skype for Business/Lync servers
- Autodiscover servers (autodiscover.domain.com and lyncdiscover.domain.com)
- ADFS servers

Once identified, use nmap and the [http-ntlm-info](https://nmap.org/nsedoc/scripts/http-ntlm-info.html) script to extract internal domain/server information.

## Installation

```plain
git clone https://github.com/nyxgeek/ntlmscan
```

## Usage

```plain
ntlmscan.py [-h] [--url URL] [--host HOST] [--hostfile HOSTFILE]
            [--outfile OUTFILE] [--dictionary DICTIONARY]
```

## Flags

```plain
optional arguments:
  -h, --help              show this help message and exit
  --url URL               full url path to test
  --host HOST             a single host to search for ntlm dirs on
  --hostfile HOSTFILE     file containing ips or hostnames to test
  --outfile OUTFILE       file to write results to
  --dictionary DICTIONARY list of paths to test, default: paths.dict
  --nmap                  run nmap with http-ntlm-info after testing (requires nmap)
  --debug                 show request headers
```

## Examples

```plain
$ python3 ntlmscan.py --nmap --host mail.offsec.nl 

custom dictionary has been set to /Users/crypt0rr/tools/ntlmscan/paths.dict
[-] Testing path https://mail.offsec.nl/abs/
[-] Testing path https://mail.offsec.nl/adfs/ls/wia
[-] Testing path https://mail.offsec.nl/adfs/services/trust/2005/windowstransport
[-] Testing path https://mail.offsec.nl/aspnet_client/
[-] Testing path https://mail.offsec.nl/autodiscover/
[-] Testing path https://mail.offsec.nl/autoupdate/
[-] Testing path https://mail.offsec.nl/certenroll/
[-] Testing path https://mail.offsec.nl/certprov/
[-] Testing path https://mail.offsec.nl/certsrv/
[-] Testing path https://mail.offsec.nl/conf/
[-] Testing path https://mail.offsec.nl/debug/
[-] Testing path https://mail.offsec.nl/deviceupdatefiles_ext/
[-] Testing path https://mail.offsec.nl/deviceupdatefiles_int/
[-] Testing path https://mail.offsec.nl/dialin/
[-] Testing path https://mail.offsec.nl/ecp/
[-] Testing path https://mail.offsec.nl/etc/
[-] Testing path https://mail.offsec.nl/ews/
[-] Testing path https://mail.offsec.nl/exchange/
[-] Testing path https://mail.offsec.nl/exchweb/
[-] Testing path https://mail.offsec.nl/groupexpansion/
[-] Testing path https://mail.offsec.nl/hybridconfig/
[-] Testing path https://mail.offsec.nl/iwa/authenticated.aspx
[-] Testing path https://mail.offsec.nl/iwa/iwa_test.aspx
[-] Testing path https://mail.offsec.nl/mcx/
[-] Testing path https://mail.offsec.nl/mcx/mcxservice.svc
[-] Testing path https://mail.offsec.nl/meet/
[-] Testing path https://mail.offsec.nl/meeting/
[-] Testing path https://mail.offsec.nl/microsoft-server-activesync/
[-] Testing path https://mail.offsec.nl/oab/
[-] Testing path https://mail.offsec.nl/ocsp/
[-] Testing path https://mail.offsec.nl/owa/
[-] Testing path https://mail.offsec.nl/persistentchat/
[-] Testing path https://mail.offsec.nl/phoneconferencing/
[-] Testing path https://mail.offsec.nl/powershell/
[-] Testing path https://mail.offsec.nl/public/
[-] Testing path https://mail.offsec.nl/reach/sip.svc
[-] Testing path https://mail.offsec.nl/requesthandler/
[-] Testing path https://mail.offsec.nl/requesthandlerext/
[-] Testing path https://mail.offsec.nl/rgs/
[-] Testing path https://mail.offsec.nl/rgsclients/
[-] Testing path https://mail.offsec.nl/rpc/
[-] Testing path https://mail.offsec.nl/rpcwithcert/
[-] Testing path https://mail.offsec.nl/scheduler/
[-] Testing path https://mail.offsec.nl/ucwa/
[-] Testing path https://mail.offsec.nl/unifiedmessaging/
[-] Testing path https://mail.offsec.nl/webticket/
[-] Testing path https://mail.offsec.nl/webticket/webticketservice.svc
[-] Testing path https://mail.offsec.nl/_windows/default.aspx?ReturnUrl=/
[+] FOUND NTLM - https://mail.offsec.nl/ews/
[+] FOUND NTLM - https://mail.offsec.nl/oab/
[+] FOUND NTLM - https://mail.offsec.nl/rpc/
[+] FOUND NTLM - https://mail.offsec.nl/autodiscover/

Testing complete
Initializing nmap scan for https://mail.offsec.nl/ews/
host:   mail.offsec.nl
path:   /ews/
Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-02 19:21 CET
Nmap scan report for mail.offsec.nl (10.10.10.11)
Host is up (0.017s latency).
rDNS record for 10.10.10.11: -

PORT    STATE SERVICE
443/tcp open  https
| http-ntlm-info: 
|   Target_Name: EXCH01
|   NetBIOS_Domain_Name: EXCH01
|   NetBIOS_Computer_Name: EXCH01-2019
|   DNS_Domain_Name: EXCH01.offsec.nl
|   DNS_Computer_Name: EXCH01-2019.EXCH01.offsec.nl
|   DNS_Tree_Name: EXCH.offsec.nl
|_  Product_Version: 10.0.17763

Nmap done: 1 IP address (1 host up) scanned in 0.57 seconds
0
Initializing nmap scan for https://mail.offsec.nl/oab/
host:   mail.offsec.nl
path:   /oab/
Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-02 19:21 CET
Nmap scan report for mail.offsec.nl (10.10.10.11)
Host is up (0.014s latency).
rDNS record for 10.10.10.11: -

PORT    STATE SERVICE
443/tcp open  https
| http-ntlm-info: 
|   Target_Name: EXCH01
|   NetBIOS_Domain_Name: EXCH01
|   NetBIOS_Computer_Name: EXCH01-2019
|   DNS_Domain_Name: EXCH01.offsec.nl
|   DNS_Computer_Name: EXCH01-2019.EXCH01.offsec.nl
|   DNS_Tree_Name: EXCH.offsec.nl
|_  Product_Version: 10.0.17763

Nmap done: 1 IP address (1 host up) scanned in 0.25 seconds
0
Initializing nmap scan for https://mail.offsec.nl/rpc/
host:   mail.offsec.nl
path:   /rpc/
Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-02 19:21 CET
Nmap scan report for mail.offsec.nl (10.10.10.11)
Host is up (0.017s latency).
rDNS record for 10.10.10.11: -

PORT    STATE SERVICE
443/tcp open  https
| http-ntlm-info: 
|   Target_Name: EXCH01
|   NetBIOS_Domain_Name: EXCH01
|   NetBIOS_Computer_Name: EXCH01-2019
|   DNS_Domain_Name: EXCH01.offsec.nl
|   DNS_Computer_Name: EXCH01-2019.EXCH01.offsec.nl
|   DNS_Tree_Name: EXCH.offsec.nl
|_  Product_Version: 10.0.17763

Nmap done: 1 IP address (1 host up) scanned in 0.25 seconds
0
Initializing nmap scan for https://mail.offsec.nl/autodiscover/
host:   mail.offsec.nl
path:   /autodiscover/
Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-02 19:21 CET
Nmap scan report for mail.offsec.nl (10.10.10.11)
Host is up (0.017s latency).
rDNS record for 10.10.10.11: -

PORT    STATE SERVICE
443/tcp open  https
| http-ntlm-info: 
|   Target_Name: EXCH01
|   NetBIOS_Domain_Name: EXCH01
|   NetBIOS_Computer_Name: EXCH01-2019
|   DNS_Domain_Name: EXCH01.offsec.nl
|   DNS_Computer_Name: EXCH01-2019.EXCH01.offsec.nl
|   DNS_Tree_Name: EXCH.offsec.nl
|_  Product_Version: 10.0.17763

Nmap done: 1 IP address (1 host up) scanned in 0.25 seconds
```

## URL list

- [Github.com - ntlmscan](https://github.com/nyxgeek/ntlmscan)
