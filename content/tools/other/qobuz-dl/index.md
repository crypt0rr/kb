---
title : "qobuz-dl"
# pre : ' '
description : "Search, explore and download Lossless and Hi-Res music from Qobuz. The ultimate Qobuz music downloader."
date : 2021-07-17T21:24:15+02:00
# hidden : true
# draft : true
weight : 1420
# tags : ['']
---

---

Search, explore and download Lossless and Hi-Res music from Qobuz - The ultimate Qobuz music downloader.

### Features

- Download FLAC and MP3 files from Qobuz
- Explore and download music directly from your terminal with interactive or lucky mode
- Download albums, tracks, artists, playlists and labels with download mode
- Download music from last.fm playlists (Spotify, Apple Music and Youtube playlists are also supported through this method)
- Queue support on interactive mode
- Effective duplicate handling with own portable database
- Support for albums with multiple discs
- Support for M3U playlists
- Downloads URLs from text file
- Extended tags
- And more

## Installation

```plain
python3 -m pip install --upgrade qobuz-dl
```

## Usage

```plain
qobuz-dl [-h] [-r] [-p] {fun,dl,lucky} ...
```

## Flags

```plain
The ultimate Qobuz music downloader.
See usage examples on https://github.com/vitiko98/qobuz-dl

optional arguments:
  -h, --help      show this help message and exit
  -r, --reset     create/reset config file
  -p, --purge     purge/delete downloaded-IDs database

commands:
  run qobuz-dl <command> --help for more info
  (e.g. qobuz-dl fun --help)

  {fun,dl,lucky}
    fun           interactive mode
    dl            input mode
    lucky         lucky mode
```

## Examples

### Download specific album

```plain
qobuz-dl dl https://play.qobuz.com/album/qxjbxh1dc3xyb
```

### Download multiple URLs from text file

```plain
qobuz-dl dl this_txt_file_has_urls.txt
```

## URL List

- [Github.com - qobuz-dl](https://github.com/vitiko98/qobuz-dl)
