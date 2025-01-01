---
title: "nmap"
# pre : ' '
description: "Network exploration tool and security / port scanner."
date: 2020-03-11T11:41:35+01:00
# hidden : true
# draft : true
weight: 250
# tags : [""]
---

---

Network exploration tool and security / port scanner.

**NOTE:** The preferred way of using nmap should be SYN mode. This is stealth mode, since this mode (TCP) will not complete the three-way handshake, the port scan is not passed to the application layer. (`sudo nmap -sS`)

## Installation

```plain
git clone https://github.com/nmap/nmap.git
```

```plain
cd nmap
sudo ./configure
sudo make
sudo make install
```

## Usage

```plain
nmap [Scan Type(s)] [Options] {target specification}
```

## Flags

```plain
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254
  -iL <inputfilename>: Input from list of hosts/networks
  -iR <num hosts>: Choose random targets
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
HOST DISCOVERY:
  -sL: List Scan - simply list targets to scan
  -sn: Ping Scan - disable port scan
  -Pn: Treat all hosts as online -- skip host discovery
  -PS/PA/PU/PY[portlist]: TCP SYN/ACK, UDP or SCTP discovery to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -PO[protocol list]: IP Protocol Ping
  -n/-R: Never do DNS resolution/Always resolve [default: sometimes]
  --dns-servers <serv1[,serv2],...>: Specify custom DNS servers
  --system-dns: Use OS's DNS resolver
  --traceroute: Trace hop path to each host
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  --scanflags <flags>: Customize TCP scan flags
  -sI <zombie host[:probeport]>: Idle scan
  -sY/sZ: SCTP INIT/COOKIE-ECHO scans
  -sO: IP protocol scan
  -b <FTP relay host>: FTP bounce scan
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080,S:9
  --exclude-ports <port ranges>: Exclude the specified ports from scanning
  -F: Fast mode - Scan fewer ports than the default scan
  -r: Scan ports sequentially - don't randomize
  --top-ports <number>: Scan <number> most common ports
  --port-ratio <ratio>: Scan ports more common than <ratio>
SERVICE/VERSION DETECTION:
  -sV: Probe open ports to determine service/version info
  --version-intensity <level>: Set from 0 (light) to 9 (try all probes)
  --version-light: Limit to most likely probes (intensity 2)
  --version-all: Try every single probe (intensity 9)
  --version-trace: Show detailed version scan activity (for debugging)
SCRIPT SCAN:
  -sC: equivalent to --script=default
  --script=<Lua scripts>: <Lua scripts> is a comma separated list of
           directories, script-files or script-categories
  --script-args=<n1=v1,[n2=v2,...]>: provide arguments to scripts
  --script-args-file=filename: provide NSE script args in a file
  --script-trace: Show all data sent and received
  --script-updatedb: Update the script database.
  --script-help=<Lua scripts>: Show help about scripts.
           <Lua scripts> is a comma-separated list of script-files or
           script-categories.
OS DETECTION:
  -O: Enable OS detection
  --osscan-limit: Limit OS detection to promising targets
  --osscan-guess: Guess OS more aggressively
TIMING AND PERFORMANCE:
  Options which take <time> are in seconds, or append 'ms' (milliseconds),
  's' (seconds), 'm' (minutes), or 'h' (hours) to the value (e.g. 30m).
  -T<0-5>: Set timing template (higher is faster)
  --min-hostgroup/max-hostgroup <size>: Parallel host scan group sizes
  --min-parallelism/max-parallelism <numprobes>: Probe parallelization
  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <time>: Specifies
      probe round trip time.
  --max-retries <tries>: Caps number of port scan probe retransmissions.
  --host-timeout <time>: Give up on target after this long
  --scan-delay/--max-scan-delay <time>: Adjust delay between probes
  --min-rate <number>: Send packets no slower than <number> per second
  --max-rate <number>: Send packets no faster than <number> per second
FIREWALL/IDS EVASION AND SPOOFING:
  -f; --mtu <val>: fragment packets (optionally w/given MTU)
  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys
  -S <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --proxies <url1,[url2],...>: Relay connections through HTTP/SOCKS4 proxies
  --data <hex string>: Append a custom payload to sent packets
  --data-string <string>: Append a custom ASCII string to sent packets
  --data-length <num>: Append random data to sent packets
  --ip-options <options>: Send packets with specified ip options
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address
  --badsum: Send packets with a bogus TCP/UDP/SCTP checksum
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt kIddi3,
     and Grepable format, respectively, to the given filename.
  -oA <basename>: Output in the three major formats at once
  -v: Increase verbosity level (use -vv or more for greater effect)
  -d: Increase debugging level (use -dd or more for greater effect)
  --reason: Display the reason a port is in a particular state
  --open: Only show open (or possibly open) ports
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
  --noninteractive: Disable runtime interactions via keyboard
  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML
  --webxml: Reference stylesheet from Nmap.Org for more portable XML
  --no-stylesheet: Prevent associating of XSL stylesheet w/XML output
MISC:
  -6: Enable IPv6 scanning
  -A: Enable OS detection, version detection, script scanning, and traceroute
  --datadir <dirname>: Specify custom Nmap data file location
  --send-eth/--send-ip: Send using raw ethernet frames or IP packets
  --privileged: Assume that the user is fully privileged
  --unprivileged: Assume the user lacks raw socket privileges
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  nmap -v -A scanme.nmap.org
  nmap -v -sn 192.168.0.0/16 10.0.0.0/8
  nmap -v -iR 10000 -Pn -p 80
SEE THE MAN PAGE (https://nmap.org/book/man.html) FOR MORE OPTIONS AND EXAMPLES
```

## Port Status Meaning

| Port State     | Description                                                                                                                                         | Implication                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Open           | An application is actively accepting connections or packets                                                                                         | A service is running and accessible                                                                     |
| Filtered       | The port might be open or closed, but a firewall/filter is preventing determination of the state                                                    | The network is protected by some kind of filtering mechanism                                            |
| Closed         | No application is listening, but the port is reachable                                                                                              | No service is running on this port, but it's not behind a filter                                        |
| Open\|Filtered | nmap cannot determine whether a port is open or filtered. This for example is due to no response to probes or the scan technique used (UDP/SYN/FIN) | Further investigation needed, other nmap techniques or tools required. Potential false positive result. |

## Examples

Scan ports on target system

```plain
nmap <target>
```

Scan specific port on target

```plain
nmap -p <port> <target>
```

Scan all ports on target

```plain
nmap -p- <target>
```

### Specific scan scripts

### Dynamic DNS server record injection

```plain
sudo nmap -sU -p 53 --script=dns-update --script-args=dns-update.hostname=<subdomain>.<client-domain>,dns-update.ip=192.0.2.1 <target>
```

To manually validate with dig use

{{%resources fa_icon_class="far fa-file-pdf" pattern=".*(zip)"/%}}

```plain
Add record
    sudo nmap -sU -p 53 --script=dns-update-add --script-args=dns-update.hostname=<subdomain>.<client-domain>,dns-update.ip=192.0.2.1 <target>

dig @<target> <subdomain>.<client-domain>

Delete record
    sudo nmap -sU -p 53 --script=dns-update-delete --script-args=dns-update.hostname=<subdomain>.<client-domain>,dns-update.ip=192.0.2.1 <target>
```

### FTP Anonymous login

```plain
nmap -p21 -oA ftp_test --script ftp-anon <target>
```

### MS17-010 Eternalblue

```plain
nmap -p445 --script smb-vuln-ms17-010 --open -Pn <target>
```

### RDP Security

```plain
nmap -p3389 --script rdp-enum-encryption <target>
```

### rsync list modules

```plain
nmap -p873 --script rsync-list-modules <target>
```

### SMB signing

```plain
nmap -p445 --script smb-security-mode <target>
```

### SMBv2 signing

```plain
nmap -p445 --script smb2-security-mode <target>
```

### SMB security + protocols

```plain
nmap -p445 --script smb-security-mode,smb-protocols <target>
```

### SMB OS Discovery

```plain
nmap -p445 --script smb-os-discovery <target>
```

### SMB share enumeration

```plain
nmap -p445 --script=smb-enum-shares.nse,smb-enum-users.nse <target>
```

### IIS Tilde

```plain
nmap -p80,443 --script http-iis-short-name-brute <target>
```

### NTLM challenger

```plain
nmap --script http-ntlm-info <target>
```

### SSH hostkey reuse

```plain
nmap -p22 --script ssh-hostkey <target>
```

### MS-SQL version

```plain
nmap -p1433 --script ms-sql-info,ms-sql-ntlm-info <target>
```

### SSH authentication methods

```plain
nmap -p22 --script ssh-auth-methods <target>
```

### TFTP enum

```plain
sudo nmap -p69 -sU -Pn --script tftp-enum <target>
```

### VNC authentication

```plain
nmap -Pn -p5900 --script vnc-info <target>
```

### Vmware ESXi version

```plain
nmap -p443 --script vmware-version <target>
```

### NTP information

```plain
nmap -sU -p 123 --script ntp-info <target>
```

### SMTP

Commands supported.

```plain
nmap --script smtp-commands.nse [--script-args smtp-commands.domain=<domain>] -pT:25,465,587 <host>
```

Open Relay checking.

```plain
nmap --script smtp-open-relay.nse [--script-args smtp-open-relay.domain=<domain>,smtp-open-relay.ip=<address>,...] -p 25,465,587 <host>
```

### LDAP anonymous bind

```plain
nmap -p 389 --script ldap-search --script-args 'ldap.qfilter=users,ldap.attrib=sAMAccountName' <target>
```

### Modbus protocol

```plain
nmap -p502 --script modbus-discover <target>
```

### XMPP

```plain
nmap -p5222 --script xmpp-info <target>
```

### AMQP

```plain
nmap -p5672 --script amqp-info <target>
```

### WinRM detection

{{%resources fa_icon_class="far fa-file-code" pattern=".*(nse)"/%}}
[Github.com - winRM.nse](https://github.com/RicterZ/My-NSE-Scripts/blob/master/scripts/winrm.nse)

```plain
nmap -p5985 -Pn -n -sV -v --script=winrm.nse <target>
```

### MSRPC

```plain
nmap -Pn --script=msrpc-enum
```

### Elasticsearch NSE

NSE script for enumerating indices, plugins and cluster nodes on an elasticsearch target

[Github.com - nmap-elasticsearch.nse](https://github.com/theMiddleBlue/nmap-elasticsearch-nse)

```plain
git clone https://github.com/theMiddleBlue/nmap-elasticsearch-nse.git
cp nmap-elasticsearch-nse/elasticsearch.nse /usr/share/nmap/scripts/
```

```plain
nmap --script=elasticsearch <target>
```

### X11 access check

```plain
nmap -p6000 --script x11-access <target>
```

### DNS Server Zone Transfer Information Disclosure (AXFR)

```plain
nmap -p53 --script dns-zone-transfer <target>
```

### Check for vulnerabilities

```plain
nmap --script vuln <target>
```

### Scripts location

```plain
/usr/share/nmap/scripts
```

## URL List

- [Nmap.org](https://nmap.org/)
- [Github.com - nmap](https://github.com/nmap/nmap)
