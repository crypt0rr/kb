---
title : "Mattermost"
# pre : ' '
description : "Mattermost is a messaging and collaboration platform. With Mattermost, you can integrate the tools you use every day into one place and never miss a notification or task."
date : 2021-04-21T13:12:06+02:00
# hidden : true
# draft : true
weight : 1120
tags : ['Other', 'macOS', 'Windows', 'Linux']
---

---

A messaging and collaboration platform. With Mattermost, you can integrate the tools you use every day into one place and never miss a notification or task.

## Installation

Download from [Mattermost.com](https://mattermost.com/download/)
Follow the [installation guide](https://docs.mattermost.com/help/getting-started/light-install.html)

## Usage

```plain
Usage:
  mattermost [flags]
  mattermost [command]
```

## Flags

```plain
Available Commands:
  channel     Management of channels
  command     Management of slash commands
  config      Configuration
  db          Commands related to the database
  export      Export data from Mattermost
  group       Management of groups
  help        Help about any command
  import      Import data.
  integrity   Check database data integrity
  jobserver   Start the Mattermost job server
  ldap        LDAP related utilities
  license     Licensing commands
  logs        Display logs in a human-readable format
  permissions Management of the Permissions system
  plugin      Management of plugins
  reset       Reset the database to initial state
  roles       Management of user roles
  sampledata  Generate sample data
  server      Run the Mattermost server
  team        Management of teams
  user        Management of users
  version     Display version information
  webhook     Management of webhooks

Flags:
  -c, --config string        Configuration file to use.
      --disableconfigwatch   When set config.json will not be loaded from disk when the file is changed.
  -h, --help                 help for mattermost

Use "mattermost [command] --help" for more information about a command.
```

## Examples

### Upgrade server

- [Docs.mattermost.com - Upgrading to the latest version](https://docs.mattermost.com/administration/upgrade.html?src=dl#upgrading-to-the-latest-version)

```plain
cd /tmp
```

```plain
wget https://releases.mattermost.com/X.X.X/mattermost-X.X.X-linux-amd64.tar.gz
```

```plain
sudo systemctl stop nginx.service
```

```plain
sudo systemctl stop mattermost.service
```

```plain
tar -xf mattermost*.gz --transform='s,^[^/]\+,\0-upgrade,'
```

```plain
cd {install-path}
```

```plain
sudo find mattermost/ mattermost/client/ -mindepth 1 -maxdepth 1 \! \( -type d \( -path mattermost/client -o -path mattermost/client/plugins -o -path mattermost/config -o -path mattermost/logs -o -path mattermost/plugins -o -path mattermost/data \) -prune \) | sort | sudo xargs rm -r
```

```plain
sudo chown -hR mattermost:mattermost /tmp/mattermost-upgrade/
```

```plain
sudo cp -an /tmp/mattermost-upgrade/. /{install-path}/mattermost
```

```plain
sudo systemctl start nginx.service
```

```plain
sudo systemctl start mattermost.service
```

### Change user password

```plain
sudo ./mattermost user password 'user@example.com' 'new-password'
```

## URL List

- [Mattermost.com](https://mattermost.com/)
- [Docs.mattermost.com - Wiki](https://docs.mattermost.com/)
