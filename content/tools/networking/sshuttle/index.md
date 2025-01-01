---
title : "sshuttle"
# pre : ' '
description : "Transparent proxy server that works as a poor man's VPN. Forwards over ssh. Doesn't require admin. Works with Linux and MacOS. Supports DNS tunneling."
date : 2022-05-31T11:03:47+02:00
# hidden : true
# draft : true
weight : 400
tags : ['Networking', 'VPN', 'SSH', 'Pivoting']
---

---

Transparent proxy server that works as a poor man's VPN. Forwards over ssh. Doesn't require admin. Works with Linux and MacOS. Supports DNS tunneling.

As far as I know, sshuttle is the only program that solves the following common case:

- Your client machine (or router) is Linux, FreeBSD, or MacOS.
- You have access to a remote network via ssh.
- You don't necessarily have admin access on the remote network.
- The remote network has no VPN, or only stupid/complex VPN protocols (IPsec, PPTP, etc). Or maybe you are the admin and you just got frustrated with the awful state of VPN tools.
- You don't want to create an ssh port forward for every single host/port on the remote network.
- You hate openssh's port forwarding because it's randomly slow and/or stupid.
- You can't use openssh's PermitTunnel feature because it's disabled by default on openssh servers; plus it does TCP-over-TCP, which has terrible performance.

## Installation

```plain
git clone https://github.com/sshuttle/sshuttle.git
cd sshuttle
sudo ./setup.py install
```

### Brew

```plain
brew install sshuttle
```

## Usage

```plain
sshuttle [-l [ip:]port] -r [user@]sshserver[:port] <subnets...>
```

## Flags

```plain
positional arguments:
  IP/MASK[:PORT[-PORT]]...
                        capture and forward traffic to these subnets (whitespace separated)

options:
  -h, --help            show this help message and exit
  -l [IP:]PORT, --listen [IP:]PORT
                        transproxy to this ip address and port number
  -H, --auto-hosts      continuously scan for remote hostnames and update local /etc/hosts as they are found
  -N, --auto-nets       automatically determine subnets to route
  --dns                 capture local DNS requests and forward to the remote DNS server
  --ns-hosts IP[,IP]    capture and forward DNS requests made to the following servers (comma separated)
  --to-ns IP[:PORT]     the DNS server to forward requests to; defaults to servers in /etc/resolv.conf on remote side if not given.
  --method TYPE         auto, nat, nft, tproxy, pf, ipfw
  --python PATH         path to python interpreter on the remote server
  -r [USERNAME[:PASSWORD]@]ADDR[:PORT], --remote [USERNAME[:PASSWORD]@]ADDR[:PORT]
                        ssh hostname (and optional username and password) of remote sshuttle server
  -x IP/MASK[:PORT[-PORT]], --exclude IP/MASK[:PORT[-PORT]]
                        exclude this subnet (can be used more than once)
  -X PATH, --exclude-from PATH
                        exclude the subnets in a file (whitespace separated)
  -v, --verbose         increase debug message verbosity (can be used more than once)
  -V, --version         print the sshuttle version number and exit
  -e CMD, --ssh-cmd CMD
                        the command to use to connect to the remote [ssh]
  --seed-hosts HOSTNAME[,HOSTNAME]
                        comma-separated list of hostnames for initial scan (may be used with or without --auto-hosts)
  --no-latency-control  sacrifice latency to improve bandwidth benchmarks
  --latency-buffer-size SIZE
                        size of latency control buffer
  --wrap NUM            restart counting channel numbers after this number (for testing)
  --disable-ipv6        disable IPv6 support
  -D, --daemon          run in the background as a daemon
  -s PATH, --subnets PATH
                        file where the subnets are stored, instead of on the command line
  --syslog              send log messages to syslog (default if you use --daemon)
  --pidfile PATH        pidfile name (only if using --daemon) [./sshuttle.pid]
  --user USER           apply all the rules only to this linux user
  --firewall            (internal use only)
  --hostwatch           (internal use only)
  --sudoers             Add sshuttle to the sudoers for this user
  --sudoers-no-modify   Prints the sudoers config to STDOUT and DOES NOT modify anything.
  --sudoers-user SUDOERS_USER
                        Set the user name or group with %group_name for passwordless operation. Default is the current user.set ALL for all users. Only works with --sudoers or --sudoers-no-modify option.
  --sudoers-filename SUDOERS_FILENAME
                        Set the file name for the sudoers.d file to be added. Default is "sshuttle_auto". Only works with --sudoers or --sudoers-no-modify option.
  --no-sudo-pythonpath  do not set PYTHONPATH when invoking sudo
  -t [MARK], --tmark [MARK]
                        tproxy optional traffic mark with provided MARK value in hexadecimal (default '0x01')
```

## Examples

Tunnel all traffic thru SSH.

```plain
sshuttle -r username@sshserver 0.0.0.0/0 -vv
```

To use key authentication add `--ssh-cmd 'ssh -i /home/crypt0rr/myprivatekey.key'`

## URL List

- [Sshuttle.readthedocs.org - documentation](https://sshuttle.readthedocs.org/)
- [Formulae.brew.sh - sshuttle](https://formulae.brew.sh/formula/sshuttle#default)
- [Github.com - sshuttle](https://github.com/sshuttle/sshuttle)
