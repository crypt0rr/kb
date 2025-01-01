---
title : "Resilio Sync"
# pre : ' '
description : "A fast, reliable, and simple file sync and share solution, powered by P2P technology."
date : 2020-03-11T14:59:09+01:00
# hidden : true
# draft : true
weight : 1500
tags : ['Other', 'macOS', 'Windows', 'Linux', 'P2P']
---

---

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

If you want the Resilio Sync Service to listen on another interface, edit `/etc/resilio-sync/config.json`.

```plain
http://localhost:8888
```

## Configuration Linux

### Enable Startup at Boot

```plain
sudo nano /usr/lib/systemd/user/resilio-sync.service
```

Change:

- Old: `WantedBy=multi-user.target`
- New: `WantedBy=default.target`

```plain
sudo systemctl enable resilio-sync.service
```

### Set Permissions

Resilio Sync will run under the `rslsync` user. To give this user the required access on specific folder(s) you can use ACLs.

```plain
sudo apt install acl
```

```plain
sudo setfacl -R -m "u:rslsync:rwx" /var/www/*
```

## Troubleshooting

### Remove GUI password

```plain
systemctl stop resilio-sync.service
sudo rm /var/lib/resilio-sync/settings.dat
sudo rm /var/lib/resilio-sync/settings.dat.old
```

## URL List

- [Resilio.com](https://www.resilio.com)
- [Resilio.com - Help Center](https://help.resilio.com/hc/en-us)
