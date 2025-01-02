---
title : "ARP-scan"
# pre : ' '
description : "Send ARP requests to target hosts and display responses."
date : 2023-01-22T16:56:14+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Target hosts must be specified on the command line unless the --file option is given, in which case the targets are read from the specified file instead, or the --localnet option is used, in which case the targets are generated from the network interface IP address and netmask.

You will need to be root, or arp-scan must be SUID root, in order to run arp-scan, because the functions that it uses to read and write packets require root privilege.

The target hosts can be specified as IP addresses or hostnames. You can also specify the target as IPnetwork/bits (e.g. 192.168.1.0/24) to specify all hosts in the given network (network and broadcast addresses included), or IPstart-IPend (e.g. 192.168.1.3-192.168.1.27) to specify all hosts in the inclusive range, or IPnetwork:NetMask (e.g. 192.168.1.0:255.255.255.0) to specify all hosts in the given network and mask.

These different options for specifying target hosts may be used both on the command line, and also in the file specified with the --file option.

## Installation

```plain
sudo apt install arp-scan
```

```plain
brew install arp-scan
```

## Usage

```plain
arp-scan [options] [hosts...]
```

## Flags

```plain
Note: where an option takes a value, that value is specified as a letter in
angle brackets. The letter indicates the type of data that is expected:

<s> A character string, e.g. --file=hostlist.txt.

<i> An integer, which can be specified as a decimal number or as a hexadecimal
    number if preceded with 0x, e.g. --arppro=2048 or --arpro=0x0800.

<f> A floating point decimal number, e.g. --backoff=1.5.

<m> An Ethernet MAC address, which can be specified either in the format
    01:23:45:67:89:ab, or as 01-23-45-67-89-ab. The alphabetic hex characters
    may be either upper or lower case. E.g. --arpsha=01:23:45:67:89:ab.

<a> An IPv4 address, e.g. --arpspa=10.0.0.1

<h> Binary data specified as a hexadecimal string, which should not
    include a leading 0x. The alphabetic hex characters may be either
    upper or lower case. E.g. --padding=aaaaaaaaaaaa

<x> Something else. See the description of the option for details.

--help or -h            Display this usage message and exit.

--file=<s> or -f <s>    Read hostnames or addresses from the specified file
                        instead of from the command line. One name or IP
                        address per line. Use "-" for standard input.

--localnet or -l        Generate addresses from network interface configuration.
                        Use the network interface IP address and network mask
                        to generate the list of target host addresses.
                        The list will include the network and broadcast
                        addresses, so an interface address of 10.0.0.1 with
                        netmask 255.255.255.0 would generate 256 target
                        hosts from 10.0.0.0 to 10.0.0.255 inclusive.
                        If you use this option, you cannot specify the --file
                        option or specify any target hosts on the command line.
                        The interface specifications are taken from the
                        interface that arp-scan will use, which can be
                        changed with the --interface option.

--retry=<i> or -r <i>   Set total number of attempts per host to <i>,
                        default=2.

--retry-send=<i> or -Y <i> Set total number of send packet attempts to <i>,
                        default=20.

--retry-send-interval=<i> or -E <i> Set interval between send packet attempts to <i>.
                        The interval specified is in milliseconds by default.
                        or in microseconds if "u" is appended to the value.
                        default=5.

--timeout=<i> or -t <i> Set initial per host timeout to <i> ms, default=500.
                        This timeout is for the first packet sent to each host.
                        subsequent timeouts are multiplied by the backoff
                        factor which is set with --backoff.

--interval=<x> or -i <x> Set minimum packet interval to <x>.
                        This controls the outgoing bandwidth usage by limiting
                        the rate at which packets can be sent. The packet
                        interval will be no smaller than this number.
                        If you want to use up to a given bandwidth, then it is
                        easier to use the --bandwidth option instead.
                        The interval specified is in milliseconds by default,
                        or in microseconds if "u" is appended to the value.

--bandwidth=<x> or -B <x> Set desired outbound bandwidth to <x>, default=256000.
                        The value is in bits per second by default. If you
                        append "K" to the value, then the units are kilobits
                        per sec; and if you append "M" to the value, the
                        units are megabits per second.
                        The "K" and "M" suffixes represent the decimal, not
                        binary, multiples. So 64K is 64000, not 65536.
                        You cannot specify both --interval and --bandwidth
                        because they are just different ways to change the
                        same underlying parameter.

--backoff=<f> or -b <f> Set timeout backoff factor to <f>, default=1.50.
                        The per-host timeout is multiplied by this factor
                        after each timeout. So, if the number of retries
                        is 3, the initial per-host timeout is 500ms and the
                        backoff factor is 1.5, then the first timeout will be
                        500ms, the second 750ms and the third 1125ms.

--verbose or -v         Display verbose progress messages.
                        Use more than once for greater effect:
                        1 - Display the network address and mask used when the
                            --localnet option is specified, display any
                            nonzero packet padding, display packets received
                            from unknown hosts, and show when each pass through
                            the list completes.
                        2 - Show each packet sent and received, when entries
                            are removed from the list, the pcap filter string,
                            and counts of MAC/Vendor mapping entries.
                        3 - Display the host list before scanning starts.

--version or -V         Display program version and exit.

--random or -R          Randomise the host list.
                        This option randomises the order of the hosts in the
                        host list, so the ARP packets are sent to the hosts in
                        a random order. It uses the Knuth shuffle algorithm.

--randomseed=<i>        Use <i> to seed the pseudo random number generator.
                        This option seeds the PRNG with the specified number,
                        which can be useful if you want to ensure that the
                        random host list is reproducible. By default, the PRNG
                        is seeded with an unpredictable value. This option is
                        only effective in conjunction with the --random (-R)
                        option.

--numeric or -N         IP addresses only, no hostnames.
                        With this option, all hosts must be specified as
                        IP addresses. Hostnames are not permitted. No DNS
                        lookups will be performed.

--snap=<i> or -n <i>    Set the pcap snap length to <i>. Default=64.
                        This specifies the frame capture length. This
                        length includes the data-link header.
                        The default is normally sufficient.

--interface=<s> or -I <s> Use network interface <s>.
                        If this option is not specified, arp-scan will search
                        the system interface list for the lowest numbered,
                        configured up interface (excluding loopback).
                        The interface specified must support ARP.

--quiet or -q           Only display minimal output. No protocol decoding.
                        If this option is specified, then only the IP address
                        and MAC address are displayed for each responding host.
                        No protocol decoding is performed and the OUI mapping
                        files are not used.

--plain or -x           Display plain output showing only responding hosts.
                        This option suppresses the printing of the header and
                        footer text, and only displays one line for each
                        responding host. Useful if the output will be
                        parsed by a script.

--resolve or -d         Resolve IP addresses to hostnames.
                        Displays the hostname instead of IP address if name
                        resolution succeeds.

--ignoredups or -g      Don't display duplicate packets.
                        By default, duplicate packets are displayed and are
                        flagged with "(DUP: n)" where n is the number of
                        times this host has responded.

--ouifile=<s> or -O <s> Use IEEE Ethernet OUI to vendor mapping file <s>.
                        If this option is not specified, the default filename
                        is ieee-oui.txt in the current directory. If that is
                        not found, then the file
                        /usr/share/arp-scan/ieee-oui.txt is used.

--iabfile=<s> or -O <s> Use IEEE Ethernet IAB to vendor mapping file <s>.
                        If this option is not specified, the default filename
                        is ieee-iab.txt in the current directory. If that is
                        not found, then the file
                        /usr/share/arp-scan/ieee-iab.txt is used.

--macfile=<s> or -O <s> Use custom Ethernet MAC to vendor mapping file <s>.
                        If this option is not specified, the default filename
                        is mac-vendor.txt in the current directory. If that is
                        not found, then the file
                        /usr/share/arp-scan/mac-vendor.txt is used.

--srcaddr=<m> or -S <m> Set the source Ethernet MAC address to <m>.
                        This sets the 48-bit hardware address in the Ethernet
                        frame header for outgoing ARP packets. It does not
                        change the hardware address in the ARP packet, see
                        --arpsha for details on how to change that address.
                        The default is the Ethernet address of the outgoing
                        interface.

--destaddr=<m> or -T <m> Send the packets to Ethernet MAC address <m>
                        This sets the 48-bit destination address in the
                        Ethernet frame header.
                        The default is the broadcast address ff:ff:ff:ff:ff:ff.
                        Most operating systems will also respond if the ARP
                        request is sent to their MAC address, or to a
                        multicast address that they are listening on.

--arpsha=<m> or -u <m>  Use <m> as the ARP source Ethernet address
                        This sets the 48-bit ar$sha field in the ARP packet
                        It does not change the hardware address in the frame
                        header, see --srcaddr for details on how to change
                        that address. The default is the Ethernet address of
                        the outgoing interface.

--arptha=<m> or -w <m>  Use <m> as the ARP target Ethernet address
                        This sets the 48-bit ar$tha field in the ARP packet
                        The default is zero, because this field is not used
                        for ARP request packets.

--prototype=<i> or -y <i> Set the Ethernet protocol type to <i>, default=0x0806.
                        This sets the 16-bit protocol type field in the
                        Ethernet frame header.
                        Setting this to a non-default value will result in the
                        packet being ignored by the target, or sent to the
                        wrong protocol stack.

--arphrd=<i> or -H <i>  Use <i> for the ARP hardware type, default=1.
                        This sets the 16-bit ar$hrd field in the ARP packet.
                        The normal value is 1 (ARPHRD_ETHER). Most, but not
                        all, operating systems will also respond to 6
                        (ARPHRD_IEEE802). A few systems respond to any value.

--arppro=<i> or -p <i>  Use <i> for the ARP protocol type, default=0x0800.
                        This sets the 16-bit ar$pro field in the ARP packet.
                        Most operating systems only respond to 0x0800 (IPv4)
                        but some will respond to other values as well.

--arphln=<i> or -a <i>  Set the hardware address length to <i>, default=6.
                        This sets the 8-bit ar$hln field in the ARP packet.
                        It sets the claimed length of the hardware address
                        in the ARP packet. Setting it to any value other than
                        the default will make the packet non RFC compliant.
                        Some operating systems may still respond to it though.
                        Note that the actual lengths of the ar$sha and ar$tha
                        fields in the ARP packet are not changed by this
                        option; it only changes the ar$hln field.

--arppln=<i> or -P <i>  Set the protocol address length to <i>, default=4.
                        This sets the 8-bit ar$pln field in the ARP packet.
                        It sets the claimed length of the protocol address
                        in the ARP packet. Setting it to any value other than
                        the default will make the packet non RFC compliant.
                        Some operating systems may still respond to it though.
                        Note that the actual lengths of the ar$spa and ar$tpa
                        fields in the ARP packet are not changed by this
                        option; it only changes the ar$pln field.

--arpop=<i> or -o <i>   Use <i> for the ARP operation, default=1.
                        This sets the 16-bit ar$op field in the ARP packet.
                        Most operating systems will only respond to the value 1
                        (ARPOP_REQUEST). However, some systems will respond
                        to other values as well.

--arpspa=<a> or -s <a>  Use <a> as the source IP address.
                        The address should be specified in dotted quad format;
                        or the literal string "dest", which sets the source
                        address to be the same as the target host address.
                        This sets the 32-bit ar$spa field in the ARP packet.
                        Some operating systems check this, and will only
                        respond if the source address is within the network
                        of the receiving interface. Others don't care, and
                        will respond to any source address.
                        By default, the outgoing interface address is used.

                        WARNING: Setting ar$spa to the destination IP address
                        can disrupt some operating systems, as they assume
                        there is an IP address clash if they receive an ARP
                        request for their own address.

--padding=<h> or -A <h> Specify padding after packet data.
                        Set the padding data to hex value <h>. This data is
                        appended to the end of the ARP packet, after the data.
                        Most, if not all, operating systems will ignore any
                        padding. The default is no padding, although the
                        Ethernet driver on the sending system may pad the
                        packet to the minimum Ethernet frame length.

--llc or -L             Use RFC 1042 LLC framing with SNAP.
                        This option causes the outgoing ARP packets to use
                        IEEE 802.2 framing with a SNAP header as described
                        in RFC 1042. The default is to use Ethernet-II
                        framing.
                        arp-scan will decode and display received ARP packets
                        in either Ethernet-II or IEEE 802.2 formats
                        irrespective of this option.

--vlan=<i> or -Q <i>    Use 802.1Q tagging with VLAN id <i>.
                        This option causes the outgoing ARP packets to use
                        802.1Q VLAN tagging with a VLAN ID of <i>, which should
                        be in the range 0 to 4095 inclusive.
                        arp-scan will always decode and display received ARP
                        packets in 802.1Q format irrespective of this option.

--pcapsavefile=<s> or -W <s>    Write received packets to pcap savefile <s>.
                        This option causes received ARP responses to be written
                        to the specified pcap savefile as well as being decoded
                        and displayed. This savefile can be analysed with
                        programs that understand the pcap file format, such as
                        "tcpdump" and "wireshark".

--rtt or -D             Display the packet round-trip time.

--limit=<i> or -M <i>   Exit after the specified number of hosts have responded.
                        When this option is used arp-scan will exit with status
                        1 if the number of responding hosts is less than the
                        specified limit. This can be used in scripts to check
                        if fewer hosts respond without having to parse the
                        program output.

Report bugs or send suggestions at https://github.com/royhills/arp-scan
See the arp-scan homepage at https://github.com/royhills/arp-scan
```

## Examples

```plain
$ sudo arp-scan -l
Interface: eth0, type: EN10MB, MAC: 08:00:27:72:d4:50, IPv4: 192.168.57.4
Starting arp-scan 1.9.8 with 256 hosts (https://github.com/royhills/arp-scan)
192.168.57.1    52:54:00:12:35:00       QEMU
192.168.57.2    52:54:00:12:35:00       QEMU
192.168.57.3    08:00:27:e6:56:7d       PCS Systemtechnik GmbH

3 packets received by filter, 0 packets dropped by kernel
Ending arp-scan 1.9.8: 256 hosts scanned in 2.198 seconds (116.47 hosts/sec). 3 responded
```

## URL list

- [Github.com - arp-scan](https://github.com/royhills/arp-scan)
