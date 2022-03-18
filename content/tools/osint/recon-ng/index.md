---
title : "recon-ng"
# pre : ' '
description : "A full-featured reconnaissance framework designed with the goal of providing a powerful environment to conduct open source web-based reconnaissance quickly and thoroughly."
date : 2021-05-31T09:26:27+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## recon-ng

A full-featured reconnaissance framework designed with the goal of providing a powerful environment to conduct open source web-based reconnaissance quickly and thoroughly

### Installation

#### APT

```plain
sudo apt install recon-ng
```

#### Github

```plain
git clone https://github.com/lanmaster53/recon-ng.git
cd recon-ng
python3 -m pip install -r REQUIREMENTS
```

### Usage (recon-ng)

```plain
recon-ng [-h] [-w workspace] [-r filename] [--no-version] [--no-analytics] [--no-marketplace] [--stealth] [--accessible] [--version]
```

### Flags (recon-ng)

```plain
recon-ng - Tim Tomes (@lanmaster53)

optional arguments:
  -h, --help        show this help message and exit
  -w workspace      load/create a workspace
  -r filename       load commands from a resource file
  --no-version      disable version check. Already disabled by default in Debian
  --no-analytics    disable analytics reporting. Already disabled by default in Debian
  --no-marketplace  disable remote module management
  --stealth         disable all passive requests (--no-*)
  --accessible      Use accessible outputs when available
  --version         displays the current version
```

### Examples (recon-ng)

#### Install modules

```plain
$ recon-ng
[...SNIP...]
[*] No modules enabled/installed.

[recon-ng][default] > marketplace install all
[*] Module installed: discovery/info_disclosure/cache_snoop
[*] Module installed: discovery/info_disclosure/interesting_files
[*] Module installed: exploitation/injection/command_injector
[*] Module installed: exploitation/injection/xpath_bruter
[*] Module installed: import/csv_file
[*] Module installed: import/list
[...SNIP...]
```

## recon-cli

### Usage (recon-cli)

```plain
recon-cli [-h] [-w workspace] [-C command] [-c command] [-G] [-g name=value] [-M] [-m module] [-O] [-o name=value] [-x] [--no-version] [--no-analytics] [--no-marketplace] [--stealth] [--version] [--analytics]
```

### Flags (recon-cli)

```plain
recon-cli - Tim Tomes (@lanmaster53)

optional arguments:
  -h, --help        show this help message and exit
  -w workspace      load/create a workspace
  -C command        runs a command at the global context
  -c command        runs a command at the module context (pre-run)
  -G                show available global options
  -g name=value     set a global option (can be used more than once)
  -M                show modules
  -m module         specify the module
  -O                show available module options
  -o name=value     set a module option (can be used more than once)
  -x                run the module
  --no-version      disable version check. Already disabled by default in Debian
  --no-analytics    disable analytics reporting. Already disabled by default in Debian
  --no-marketplace  disable remote module management
  --stealth         disable all passive requests (--no-*)
  --version         displays the current version
  --analytics       enable analytics reporting. Send analytics to google
```

## recon-web

### Usage (recon-web)

```plain
recon-web [-h] [--host HOST] [--port PORT]
```

### Flags (recon-web)

```plain
  -h, --help   show this help message and exit
  --host HOST  IP address to listen on
  --port PORT  port to bind the web server to
```

### URL list

* [Github.com - recon-ng](https://github.com/lanmaster53/recon-ng)
* [Github.com - Wiki](https://github.com/lanmaster53/recon-ng/wiki)
* [Tools.kali.org - recon-ng](https://tools.kali.org/information-gathering/recon-ng)
* [Securitytrails.com - blog - recon-ng](https://securitytrails.com/blog/recon-ng)
