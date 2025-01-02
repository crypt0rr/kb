---
title : "AutoSSH"
# pre : ' '
description : "Autossh is a program to start a copy of ssh and monitor it, restarting it as necessary should it die or stop passing traffic."
date : 2022-03-06T13:19:01+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

AutoSSH is a program to start a copy of ssh and monitor it, restarting it as necessary should it die or stop passing traffic.

## Installation

```plain
sudo apt install autossh
```

## Usage

```plain
autossh [-V] [-M monitor_port[:echo_port]] [-f] [SSH_OPTIONS]
```

## Flags

```plain
    -M specifies monitor port. Overrides the environment
       variable AUTOSSH_PORT. 0 turns monitoring loop off.
       Alternatively, a port for an echo service on the remote
       machine may be specified. (Normally port 7.)
    -f run in background (autossh handles this, and does not
       pass it to ssh.)
    -V print autossh version and exit.

Environment variables are:
    AUTOSSH_GATETIME    - how long must an ssh session be established
                          before we decide it really was established
                          (in seconds). Default is 30 seconds; use of -f
                          flag sets this to 0.
    AUTOSSH_LOGFILE     - file to log to (default is to use the syslog
                          facility)
    AUTOSSH_LOGLEVEL    - level of log verbosity
    AUTOSSH_MAXLIFETIME - set the maximum time to live (seconds)
    AUTOSSH_MAXSTART    - max times to restart (default is no limit)
    AUTOSSH_MESSAGE     - message to append to echo string (max 64 bytes)
    AUTOSSH_PATH        - path to ssh if not default
    AUTOSSH_PIDFILE     - write pid to this file
    AUTOSSH_POLL        - how often to check the connection (seconds)
    AUTOSSH_FIRST_POLL  - time before first connection check (seconds)
    AUTOSSH_PORT        - port to use for monitor connection
    AUTOSSH_DEBUG       - turn logging to maximum verbosity and log to
                          stderr
```

## Examples

### Generate a keypair on client

```plain
ssh-keygen -o -a 100 -t ed25519 -C "NAME-FOR-YOUR-CLIENT"
```

Upload the public key to the server.

### Configuration

Open the following file with your preferred editor `/etc/systemd/system/autossh-tunnel.service`

The config below connects on port '2222' to the target server and creates a local forward on port '5000' routing traffic to the client on port '22' (SSH).

```plain
[Unit]
Description=AutoSSH
After=network-online.target
Wants=network-online.target

[Service]
User=<LOCAL-USER-TO-USE>
Environment="AUTOSSH_GATETIME=0"
ExecStart=/usr/bin/autossh -N -i /home/<USER>/.ssh/id_ed25519 -M 0 -o "ServerAliveInterval 5"  -o "ServerAliveCountMax 3" -R 5000:localhost:22 <USER>@<TARGET-SERVER> -p2222

[Install]
WantedBy=multi-user.target
```

After the configuration is set, test it by manually connecting the SSH tunnel and accepting the SSH signature of the server. Next enable AutoSSH it with `systemctl enable autossh-tunnel.service` and reboot to test again.

## URL List

- [Linux.die.net - AutoSSH](https://linux.die.net/man/1/autossh)
- [everythingcli.org - SSH TUNNELLING FOR FUN AND PROFIT: AUTOSSH](https://www.everythingcli.org/ssh-tunnelling-for-fun-and-profit-autossh/)
