---
title: "tidal-dl"
# pre : ' '
description: "Tidal-Media-Downloader."
date: 2023-10-16T12:59:45+02:00
# hidden : true
# draft : true
weight: 1860
# tags : ['']
---

---

Tidal-Media-Downloader.

## Installation

```plain
pip3 install tidal-dl --upgrade
```

## Usage

```plain
tidal-dl [OPTIONS]
```

## Flags

| OPTION             | DESCRIPTION                                       |
| ------------------ | ------------------------------------------------- |
| -h or --help       | show help-message                                 |
| -v or --version    | show version                                      |
| -g or --gui        | show simple-gui                                   |
| -o or --output     | download path                                     |
| -l or --link       | url/id/filePath                                   |
| -q or --quality    | track quality('Normal','High,'HiFi','Master')     |
| -r or --resolution | video resolution('P1080', 'P720', 'P480', 'P360') |

## Examples

```plain
$ tidal-dl -l https://listen.tidal.com/album/182388811                                        
[INFO] AccessToken good for 6 days, 1 hour.
[INFO] Download path:./download/
+----------------+------------------------------------+
| ALBUM-PROPERTY | VALUE                              |
+----------------+------------------------------------+
| Title          | Brothers In Arms (Remastered 1996) |
| ID             | 182388811                          |
| Track Number   | 9                                  |
| Video Number   | 0                                  |
| Release Date   | 1985-05-01                         |
| Version        | None                               |
| Explicit       | False                              |
+----------------+------------------------------------+
Sleeping for 2.434 seconds, to mimic human behaviour and prevent too many requests error
+----------------+------------------------------------+
| TRACK-PROPERTY | VALUE                              |
+----------------+------------------------------------+
| Title          | So Far Away (Remastered 1996)      |
| ID             | 182388812                          |
| Album          | Brothers In Arms (Remastered 1996) |
| Version        | None                               |
| Explicit       | False                              |
| Max-Q          | LOSSLESS                           |
| Get-Q          | LOSSLESS                           |
| Get-Codec      | flac                               |
+----------------+------------------------------------+
[...]
```

## URL list

- [Github.com - Tidal-Media-Downloader](https://github.com/yaronzz/Tidal-Media-Downloader)
