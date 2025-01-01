---
title : "AdGuardHome Sync"
# pre : ' '
description : "Synchronize config from one AdGuardHome instance to another."
date : 2021-12-23T10:48:23+01:00
# hidden : true
# draft : true
weight : 20
tags : ['Framework', 'DNS']
---

---

Synchronize config from one AdGuardHome instance to another.

### Current sync features

- General Settings
- Filters
- Rewrites
- Services
- Clients
- DNS Config
- DHCP Config

By default, all features are enabled. Single features can be disabled in the config.

## Installation

```plain
go install github.com/bakito/adguardhome-sync@latest
```

## Usage

```plain
adguardhome-sync [command]
```

## Flags

```plain
Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  run         Start a synchronisation from origin to replica

Flags:
      --config string   config file (default is $HOME/.adguardhome-sync.yaml)
  -h, --help            help for adguardhome-sync
  -t, --toggle          Help message for toggle
  -v, --version         version for adguardhome-sync

Use "adguardhome-sync [command] --help" for more information about a command.
```

## Examples

Simple configuration to synchronize two AdGuardHome instances. This configuration uses a NGINX reverse proxy for the frontend, therefor a simple change in the `/etc/hosts` file is needed.

Configuration file location: `$HOME/.adguardhome-sync.yaml`

```plain
# cron expression to run in daemon mode. (default; "" = runs only once)
cron: "0 */2 * * *"

# runs the synchronisation on startup
runOnStart: true

# If enabled, the synchronisation task will not fail on single errors, but will log the errors and continue
continueOnError: false

origin:
  # url of the origin instance
  url: https://ns1.offsec.nl
  # apiPath: define an api path if other than "/control"
  insecureSkipVerify: true # disable tls check
  username: adguard
  password: MyStrongPassword

# replica instance (optional, if only one)
replica:
  # url of the replica instance
  url: https://ns2.offsec.nl
  username: adguard
  password: MyStrongPassword
```

```plain
$ cat /etc/hosts
127.0.0.1 localhost
127.0.1.1 ns2
10.10.10.3 ns1.offsec.nl # 10.10.10.3 == NGINX proxy
10.10.10.3 ns2.offsec.nl # 10.10.10.3 == NGINX proxy
```

## Crontab

Running the service automatically on reboot in a tmux session.

The following is the content of `/opt/adguardhome-sync.sh`

```plain
#!/bin/bash
tmux new-session -d -s "sync" "/home/crypt0rr/go/bin/adguardhome-sync run --config /home/crypt0rr/.adguardhome-sync.yaml"
```

```plain
@reboot sleep 60 && /opt/adguardhome-sync.sh
```

## URL List

- [Github.com - AdGuard Home Sync](https://github.com/bakito/adguardhome-sync)
