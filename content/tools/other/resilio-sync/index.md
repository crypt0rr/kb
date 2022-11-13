---
title : "Resilio Sync"
# pre : ' '
description : "A fast, reliable, and simple file sync and share solution, powered by P2P technology."
date : 2020-03-11T14:59:09+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Other', 'macOS', 'Windows', 'Linux', 'Peer-to-Peer']
---

## Resilio Sync

A fast, reliable, and simple file sync and share solution, powered by P2P technology.

## Installation

### Windows

Download newest installer from [Resilio.com](https://download-cdn.resilio.com/stable/windows64/Resilio-Sync_x64.exe)

### Linux

Download newest release from [Resilio.com](https://help.resilio.com/hc/en-us/articles/206178924)

```plain
sudo dpkg -i <resilio-sync.deb>
```

## Usage

```plain
http://localhost:8888
```

### Configuration Linux

### Disable startup under rslsync user

```plain
sudo systemctl disable resilio-sync.service
```

### Enable startup under current user

```plain
sudo nano /usr/lib/systemd/user/resilio-sync.service

Change "WantedBy=multi-user.target" to "WantedBy=default.target"
```

```plain
systemctl enable --user resilio-sync.service
```

### Set permissions for hosting

```plain
sudo setfacl -R -m "u:rslsync:rwx" /var/www/*
```

### Remove GUI password

```plain
systemctl stop resilio-sync.service
sudo rm /var/lib/resilio-sync/settings.dat
sudo rm /var/lib/resilio-sync/settings.dat.old
```

## URL List

* [Resilio.com](https://www.resilio.com)
* [Resilio.com - Help Center](https://help.resilio.com/hc/en-us)
