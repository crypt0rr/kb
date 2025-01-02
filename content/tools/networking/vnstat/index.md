---
title : "vnstat"
# pre : ' '
description : "A console-based network traffic monitor."
date : 2020-09-06T14:30:13+02:00
# hidden : true
# draft : true
weight : 480
# tags : ['']
---

---

A console-based network traffic monitor.

## Installation

```plain
sudo apt install vnstat
```

## Usage

Default configuration will enable service and log all network interfaces.

Check for configuration and usage [Cyberciti.biz](https://www.cyberciti.biz/faq/ubuntu-install-vnstat-console-network-traffic-monitor/)

## Flags

```plain
vnStat 2.6 by Teemu Toivola <tst at iki dot fi>

Query:
      -q,  --query                 query database
      -s,  --short                 use short output
      -5,  --fiveminutes [limit]   show 5 minutes
      -h,  --hours [limit]         show hours
      -hg, --hoursgraph            show hours graph
      -d,  --days [limit]          show days
      -m,  --months [limit]        show months
      -y,  --years [limit]         show years
      -t,  --top [limit]           show top days
      -b,  --begin <date>          set list begin date
      -e,  --end <date>            set list end date
      --oneline [mode]             show simple parsable format
      --json [mode] [limit]        show database in json format
      --xml [mode] [limit]         show database in xml format

Modify:
      --add                        add interface to database
      --remove                     remove interface from database
      --rename <name>              rename interface in database
      --setalias <alias>           set alias for interface

Misc:
      -i,  --iface <interface>     select interface
      -?,  --help                  show short help
      -D,  --debug                 show some additional debug information
      -v,  --version               show version
      -tr, --traffic [time]        calculate traffic
      -l,  --live [mode]           show transfer rate in real time
      -ru, --rateunit [mode]       swap configured rate unit
      --limit <limit>              set output entry limit
      --style <mode>               select output style (0-4)
      --iflist                     show list of available interfaces
      --dbdir <directory>          select database directory
      --locale <locale>            set locale
      --config <config file>       select config file
      --showconfig                 dump config file with current settings
      --longhelp                   show this help

See also "man vnstat" for longer descriptions of each option.
```

## Examples

```plain
$ vnstat

                      rx      /      tx      /     total    /   estimated
 enp0s31f6: Not enough data available yet.
 wlp4s0:
       2020-09      1.65 MiB  /  239.62 KiB  /    1.89 MiB  /    7.42 MiB
         today      1.65 MiB  /  239.62 KiB  /    1.89 MiB  /    3.12 MiB

```

```plain
$ vnstat -i wlp4s0
Database updated: 2020-09-06 14:35:00

   wlp4s0 since 2020-09-06

          rx:  532.96 MiB      tx:  2.97 MiB      total:  535.93 MiB

   monthly
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
       2020-09    532.96 MiB |    2.97 MiB |  535.93 MiB |    9.28 kbit/s
     ------------------------+-------------+-------------+---------------
     estimated      2.78 GiB |   14.83 MiB |    2.80 GiB |

   daily
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
         today    532.96 MiB |    2.97 MiB |  535.93 MiB |   85.63 kbit/s
     ------------------------+-------------+-------------+---------------
     estimated    877.10 MiB |    4.88 MiB |  881.98 MiB |

```

## URL List

- [Cyberciti.biz - Ubuntu install vnstat console network traffic monitor](https://www.cyberciti.biz/faq/ubuntu-install-vnstat-console-network-traffic-monitor/)
