---
title : "Vaultwarden"
# pre : ' '
description : "Alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients*, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal."
date : 2021-05-19T13:43:02+02:00
# hidden : true
# draft : true
weight : 2000
# tags : ['']
---

---

Alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients*, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal.

## Installation

```plain
docker pull vaultwarden/server:latest
docker run -d --name vaultwarden -v /vw-data/:/data/ -p 80:80 vaultwarden/server:latest
```

## Usage

```plain
docker start vaultwarden
docker stop vaultwarden
```

## Examples

![Example](images/example.png)

## URL List

- [Github.com - Vaultwarden](https://github.com/dani-garcia/vaultwarden)
