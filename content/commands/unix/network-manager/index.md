---
title : "network-manager"
# pre : '<i class="fas fa-code"></i> '
description : "NetworkManager monitors all network connections and automatically."
date : 2020-04-16T10:43:57+02:00
# hidden : true
# draft : true
weight : 660
# tags : ['']
---

---

## Installation

```plain
sudo apt install network-manager
```

## Nm-connection-editor

## Usage

```plain
nm-connection-editor [OPTION…]
```

## Flags

```plain
Usage:
  nm-connection-editor [OPTION…]

Allows users to view and edit network connection settings

Help Options:
  -h, --help                    Show help options

Application Options:
  -t, --type=802-3-ethernet     Type of connection to show or create
  -c, --create                  Create a new connection
  -s, --show                    Show a given connection type page
  -e, --edit=UUID               Edit an existing connection with a given UUID
  -i, --import                  Import a VPN connection from given file
```

## URL List

- [Ubuntu.com](https://help.ubuntu.com/community/NetworkManager)
- [Unix.com](https://www.unix.com/man-page/centos/1/nm-connection-editor/)
