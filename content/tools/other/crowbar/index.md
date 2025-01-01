---
title : "Crowbar"
# pre : ' '
description : "Crowbar is a brute force tool which supports OpenVPN, Remote Desktop Protocol, SSH Private Keys and VNC Keys.."
date : 2022-12-04T14:47:30+01:00
# hidden : true
# draft : true
weight : 350
tags : ['Other', 'Brute Force', 'RDP', 'SSH']
---

---

Crowbar (formally known as Levye) is a brute forcing tool that can be used during penetration tests. It was developed to brute force some protocols in a different manner according to other popular brute forcing tools. As an example, while most brute forcing tools use username and password for SSH brute force, Crowbar uses SSH key(s). This allows for any private keys that have been obtained during penetration tests, to be used to attack other SSH servers.

## Installation

```plain
git clone https://github.com/galkan/crowbar
python3 -m pip install -r requirements.txt
```

## Usage

```plain
python3 crowbar.py [OPTIONS]
```

## Flags

```plain
  -h, --help            show this help message and exit
  -b {openvpn,rdp,sshkey,vnckey}, --brute {openvpn,rdp,sshkey,vnckey}
                        Target service
  -s SERVER, --server SERVER
                        Static target
  -S SERVER_FILE, --serverfile SERVER_FILE
                        Multiple targets stored in a file
  -u USERNAME [USERNAME ...], --username USERNAME [USERNAME ...]
                        Static name to login with
  -U USERNAME_FILE, --usernamefile USERNAME_FILE
                        Multiple names to login with, stored in a file
  -n THREAD, --number THREAD
                        Number of threads to be active at once
  -l FILE, --log FILE   Log file (only write attempts)
  -o FILE, --output FILE
                        Output file (write everything else)
  -c PASSWD, --passwd PASSWD
                        Static password to login with
  -C FILE, --passwdfile FILE
                        Multiple passwords to login with, stored in a file
  -t TIMEOUT, --timeout TIMEOUT
                        [SSH] How long to wait for each thread (seconds)
  -p PORT, --port PORT  Alter the port if the service is not using the default value
  -k KEY_FILE, --keyfile KEY_FILE
                        [SSH/VNC] (Private) Key file or folder containing multiple files
  -m CONFIG, --config CONFIG
                        [OpenVPN] Configuration file
  -d, --discover        Port scan before attacking open ports
  -v, --verbose         Enable verbose output (-vv for more)
  -D, --debug           Enable debug mode
  -q, --quiet           Only display successful logins
```

## Examples

```plain
$ crowbar -b rdp -s 10.10.10.2/32 -u admin -C rockyou.txt -n 1
2022-12-04 04:20:12 START
2022-12-04 04:20:12 Crowbar v4.2
2022-12-04 04:20:12 Trying 10.10.10.2:3389
2022-12-04 04:20:13 RDP-SUCCESS : 10.10.10.2:3389 - admin:Welkom1234
2022-12-04 04:20:13 STOP
```

## URL list

- [Github.com - crowbar](https://github.com/galkan/crowbar)
