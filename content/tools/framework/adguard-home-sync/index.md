---
title : "AdGuardHome Sync"
# pre : ' '
description : "Synchronize AdGuard Home config to replicas."
date : 2021-12-23T10:48:23+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'DNS']
---

## AdGuardHome Sync

### Current sync features

* General Settings
* Filters
* Rewrites
* Services
* Clients
* DNS Config
* DHCP Config

### Installation

```plain
go get -u github.com/bakito/adguardhome-sync
```

### Usage

```plain
adguardhome-sync [command]
```

### Flags

```plain
Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  run         Start a synchronisation from origin to replica

Flags:
      --config string   config file (default is $HOME/.adguardhome-sync.yaml)
  -h, --help            help for adguardhome-sync
  -t, --toggle          Help message for toggle

Use "adguardhome-sync [command] --help" for more information about a command.
```

### Examples

Simple configuration to synchronize two AdGuardHome instances. This configuration uses a NGINX reverse proxy for the frontend, therefor a simple change in the `/etc/hosts` file is needed.

Configuration file location: `$HOME/.adguardhome-sync.yaml`

```plain
# cron expression to run in daemon mode. (default; "" = runs only once)
cron: "0 * * * *"

# runs the synchronisation on startup
runOnStart: true

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

### URL list

* [Github.com - AdGuard Home Sync](https://github.com/bakito/adguardhome-sync)
