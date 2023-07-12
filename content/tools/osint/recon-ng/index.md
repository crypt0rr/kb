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

## Installation

### APT

```plain
sudo apt install recon-ng
```

### Github

```plain
git clone https://github.com/lanmaster53/recon-ng.git
cd recon-ng
python3 -m pip install -r REQUIREMENTS
```

## Usage (recon-ng)

```plain
recon-ng [-h] [-w workspace] [-r filename] [--no-version] [--no-analytics] [--no-marketplace] [--stealth] [--accessible] [--version]
```

## Flags (recon-ng)

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

## Examples (recon-ng)

### Search modules

```plain
[recon-ng][default] > marketplace search github
[*] Searching module index for 'github'...

  +------------------------------------------------------------------------------------------------+
  |                       Path                      | Version |     Status    |  Updated   | D | K |
  +------------------------------------------------------------------------------------------------+
  | recon/companies-multi/github_miner              | 1.1     | not installed | 2020-05-15 |   | * |
  | recon/profiles-contacts/github_users            | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/profiles-profiles/profiler                | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/profiles-repositories/github_repos        | 1.1     | not installed | 2020-05-15 |   | * |
  | recon/repositories-profiles/github_commits      | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/repositories-vulnerabilities/github_dorks | 1.0     | not installed | 2019-06-24 |   | * |
  +------------------------------------------------------------------------------------------------+

  D = Has dependencies. See info for details.
  K = Requires keys. See info for details.
```

### Show info about modules

```plain
[recon-ng][default] > marketplace info recon/domains-hosts/google_site_web

  +---------------------------------------------------------------------------------------------------------------------------------+
  | path          | recon/domains-hosts/google_site_web                                                                             |
  | name          | Google Hostname Enumerator                                                                                      |
  | author        | Tim Tomes (@lanmaster53)                                                                                        |
  | version       | 1.0                                                                                                             |
  | last_updated  | 2019-06-24                                                                                                      |
  | description   | Harvests hosts from Google.com by using the 'site' search operator. Updates the 'hosts' table with the results. |
  | required_keys | []                                                                                                              |
  | dependencies  | []                                                                                                              |
  | files         | []                                                                                                              |
  | status        | not installed                                                                                                   |
  +---------------------------------------------------------------------------------------------------------------------------------+
```

### Install module(s)

```plain
[recon-ng][default] > marketplace install recon/domains-hosts/google_site_web
[*] Module installed: recon/domains-hosts/google_site_web
[*] Reloading modules...
```

### Use installed module

```plain
[recon-ng][default] > modules load recon/domains-hosts/google_site_web
[recon-ng][default][google_site_web] > info

      Name: Google Hostname Enumerator
    Author: Tim Tomes (@lanmaster53)
   Version: 1.0

Description:
  Harvests hosts from Google.com by using the 'site' search operator. Updates the 'hosts' table with
  the results.

Options:
  Name    Current Value  Required  Description
  ------  -------------  --------  -----------
  SOURCE  default        yes       source of input (see 'info' for details)

Source Options:
  default        SELECT DISTINCT domain FROM domains WHERE domain IS NOT NULL
  <string>       string representing a single input
  <path>         path to a file containing a list of inputs
  query <sql>    database query returning one column of inputs

[recon-ng][default][google_site_web] > options set SOURCE offsec.nl
SOURCE => offsec.nl
[recon-ng][default][google_site_web] > run

---------
OFFSEC.NL
---------
[*] Searching Google for: site:offsec.nl
[!] Google CAPTCHA triggered. No bypass available.  
```

## recon-cli

## Usage (recon-cli)

```plain
recon-cli [-h] [-w workspace] [-C command] [-c command] [-G] [-g name=value] [-M] [-m module] [-O] [-o name=value] [-x] [--no-version] [--no-analytics] [--no-marketplace] [--stealth] [--version] [--analytics]
```

## Flags (recon-cli)

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

## Usage (recon-web)

```plain
recon-web [-h] [--host HOST] [--port PORT]
```

## Flags (recon-web)

```plain
  -h, --help   show this help message and exit
  --host HOST  IP address to listen on
  --port PORT  port to bind the web server to
```

## URL List

- [Github.com - recon-ng](https://github.com/lanmaster53/recon-ng)
- [Github.com - Wiki](https://github.com/lanmaster53/recon-ng/wiki)
- [Tools.kali.org - recon-ng](https://tools.kali.org/information-gathering/recon-ng)
- [Securitytrails.com - blog - recon-ng](https://securitytrails.com/blog/recon-ng)
