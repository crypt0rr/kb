---
title : "AdGuardHome"
# pre : ' '
description : "Network-wide ads & trackers blocking DNS server."
date : 2020-03-12T15:50:22+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'DNS']
---

## AdGuardHome

Network-wide ads & trackers blocking DNS server.

When running multiple instances of AdGuardHome you can synchronize the configuration with [AdGuardHome Sync]({{< ref "adguard-home-sync" >}})

### Installation

Download newest release from [Github.com](https://github.com/AdguardTeam/AdGuardHome/releases)

```plain
chmod +x AdGuardHome
./AdGuardHome --service install
```

### Usage

```plain
./AdGuardHome [options]
```

### AdGuard ErrorPage

{{%attachments title="Related files" fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

```plain
http://standard-block.dns.adguard.com/
```

### Flags

```plain
Options:
  -c, --config VALUE                 Path to the config file
  -w, --work-dir VALUE               Path to the working directory
  -h, --host VALUE                   Host address to bind HTTP server on
  -p, --port VALUE                   Port to serve HTTP pages on
  -s, --service VALUE                Service control action: status, install, uninstall, start, stop, restart
  -l, --logfile VALUE                Path to log file. If empty: write to stdout; if 'syslog': write to system log
  --pidfile VALUE                    Path to a file where PID is stored
  --check-config                     Check configuration and exit
  --no-check-update                  Don't check for updates
  -v, --verbose                      Enable verbose output
  --version                          Show the version and exit
  --help                             Print this help
```

### Blocklists

<https://oisd.nl/>
<https://someonewhocares.org/hosts/>
<https://github.com/DandelionSprout/adfilt>
<https://github.com/Perflyst/PiHoleBlocklist>
<https://gitlab.com/curben/urlhaus-filter>

### Examples

![Example](images/example.gif)

### API usage

#### Enable / disable AdGuard protection

Disable

```plain
curl -X POST -H "Content-Type:application/json" -d '{"protection_enabled":false}' http://<ip>/control/dns_config
```

Enable

```plain
curl -X POST -H "Content-Type:application/json" -d '{"protection_enabled":true}' http://<ip>/control/dns_config
```

### URL list

* [GitHub.com - AdGuardHome](https://github.com/adguardteam/adguardhome)
