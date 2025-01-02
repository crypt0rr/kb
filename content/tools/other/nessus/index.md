---
title : "Nessus"
# pre : ' '
description : "#1 Vulnerability Assessment Solution."
date : 2020-03-11T14:54:35+01:00
# hidden : true
# draft : true
weight : 1170
# tags : [""]
---

---

'#1' Vulnerability Assessment Solution.

## Installation

Download newest version from [Github.com](https://www.tenable.com/downloads/nessus)

```plain
sudo dpkg -i Nessus.x.deb
```

## Usage

Start Nessus service

```plain
sudo systemctl start nessusd.service
```

Stop Nesus service

```plain
sudo systemctl stop nessusd.service
```

Login page

```plain
https://localhost:8834
```

### Update procedure

```plain
cd /opt/nessus/sbin
```

```plain
sudo systemctl stop nessusd.service
```

```plain
sudo ./nessuscli update --all
```

```plain
sudo systemctl start nessusd.service
```

## URL List

- [Tenable.com - Nessus Professional](https://www.tenable.com/products/nessus/nessus-professional)
- [Tenable.com - Docs](https://docs.tenable.com)
