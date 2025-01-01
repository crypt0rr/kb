---
title : "ipconfig"
# pre : '<i class="fas fa-code"></i> '
description : "Displays all current TCP/IP network configuration values and refreshes Dynamic Host Configuration Protocol (DHCP) and Domain Name System (DNS) settings."
date : 2020-03-16T11:39:44+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

## Usage

```cmd
ipconfig [OPTIONS]
```

## Flags

```plain
USAGE:
    ipconfig [/allcompartments] [/? | /all |
                                 /renew [adapter] | /release [adapter] |
                                 /renew6 [adapter] | /release6 [adapter] |
                                 /flushdns | /displaydns | /registerdns |
                                 /showclassid adapter |
                                 /setclassid adapter [classid] |
                                 /showclassid6 adapter |
                                 /setclassid6 adapter [classid] ]

where
    adapter             Connection name
                       (wildcard characters * and ? allowed, see examples)

    Options:
       /?               Display this help message
       /all             Display full configuration information.
       /release         Release the IPv4 address for the specified adapter.
       /release6        Release the IPv6 address for the specified adapter.
       /renew           Renew the IPv4 address for the specified adapter.
       /renew6          Renew the IPv6 address for the specified adapter.
       /flushdns        Purges the DNS Resolver cache.
       /registerdns     Refreshes all DHCP leases and re-registers DNS names
       /displaydns      Display the contents of the DNS Resolver Cache.
       /showclassid     Displays all the dhcp class IDs allowed for adapter.
       /setclassid      Modifies the dhcp class id.
       /showclassid6    Displays all the IPv6 DHCP class IDs allowed for adapter.
       /setclassid6     Modifies the IPv6 DHCP class id.


The default is to display only the IP address, subnet mask and
default gateway for each adapter bound to TCP/IP.

For Release and Renew, if no adapter name is specified, then the IP address
leases for all adapters bound to TCP/IP will be released or renewed.

For Setclassid and Setclassid6, if no ClassId is specified, then the ClassId is removed.

Examples:
    > ipconfig                       ... Show information
    > ipconfig /all                  ... Show detailed information
    > ipconfig /renew                ... renew all adapters
    > ipconfig /renew EL*            ... renew any connection that has its
                                         name starting with EL
    > ipconfig /release *Con*        ... release all matching connections,
                                         eg. "Wired Ethernet Connection 1" or
                                             "Wired Ethernet Connection 2"
    > ipconfig /allcompartments      ... Show information about all
                                         compartments
    > ipconfig /allcompartments /all ... Show detailed information about all
                                         compartments
```

## Examples

### Show current network configuration (basic)

```cmd
ipconfig
```

```plain
Ethernet adapter Ethernet:
   Connection-specific DNS Suffix  . : lan
   Link-local IPv6 Address . . . . . : fe80::a8b0:ed16:90ce:2784%4
   IPv4 Address. . . . . . . . . . . : 10.0.2.15
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.0.2.2
```

### Show current network configuration (extended)

```cmd
ipconfig /all
```

```plain
Ethernet adapter Ethernet:
   Connection-specific DNS Suffix  . : lan
   Description . . . . . . . . . . . : Intel(R) PRO/1000 MT Desktop Adapter
   Physical Address. . . . . . . . . : 08-00-27-AC-0B-24
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   Link-local IPv6 Address . . . . . : fe80::a8b0:ed16:90ce:2784%4(Preferred)
   IPv4 Address. . . . . . . . . . . : 10.0.2.15(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Monday, 16 March 2020 11:34:11
   Lease Expires . . . . . . . . . . : Tuesday, 17 March 2020 11:36:08
   Default Gateway . . . . . . . . . : 10.0.2.2
   DHCP Server . . . . . . . . . . . : 10.0.2.2
   DHCPv6 IAID . . . . . . . . . . . : 50855975
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-24-17-EF-A1-08-00-27-AC-0B-24
   DNS Servers . . . . . . . . . . . : 10.0.2.3
   NetBIOS over Tcpip. . . . . . . . : Enabled
```

### Release current configuration

```cmd
ipconfig /release
```

### Request new configuration (DHCP)

```cmd
ipconfig /renew
```

### Clear DNS-cache

```cmd
ipconfig /flushdns
```

## URL List

- [Docs.microsoft.com](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig)
