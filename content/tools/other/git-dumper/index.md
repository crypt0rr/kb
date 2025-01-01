---
title : "Git-dumper"
# pre : ' '
description : "A tool to dump a git repository from a website."
date : 2022-01-12T17:24:14+01:00
# hidden : true
# draft : true
weight : 730
# tags : ['']
---

---

A tool to dump a git repository from a website.

## Installation

```plain
python3 -m pip install git-dumper
```

## Usage

```plain
git-dumper [options] URL DIR
```

## Flags

```plain
positional arguments:
  URL                   url
  DIR                   output directory

options:
  -h, --help            show this help message and exit
  --proxy PROXY         use the specified proxy
  -j JOBS, --jobs JOBS  number of simultaneous requests
  -r RETRY, --retry RETRY
                        number of request attempts before giving up
  -t TIMEOUT, --timeout TIMEOUT
                        maximum time in seconds before giving up
  -u USER_AGENT, --user-agent USER_AGENT
                        user-agent to use for requests
  -H HEADER, --header HEADER
                        additional http headers, e.g `NAME=VALUE`
```

## Examples

```plain
$ git-dumper http://127.0.0.1 output
[-] Testing http://127.0.0.1/.git/HEAD [200]
[-] Testing http://127.0.0.1/.git/ [200]
[-] Fetching .git recursively
[-] Fetching http://127.0.0.1/.git/ [200]
[-] Fetching http://127.0.0.1/.gitignore [200]
[-] Fetching http://127.0.0.1/.git/.git/ [200]
[-] Fetching http://127.0.0.1/.git/.gitignore [200]
[-] Fetching http://127.0.0.1/.git/config [200]
[-] Fetching http://127.0.0.1/.git/description [200]
[-] Fetching http://127.0.0.1/.git/git_dumper.py [200]
[-] Fetching http://127.0.0.1/.git/HEAD [200]
[-] Fetching http://127.0.0.1/.git/index [200]
[-] Fetching http://127.0.0.1/.git/info/ [200]
[-] Fetching http://127.0.0.1/.git/LICENSE [200]
[-] Fetching http://127.0.0.1/.git/logs/ [200]
[-] Fetching http://127.0.0.1/.git/objects/ [200]
[-] Fetching http://127.0.0.1/.git/packed-refs [200]
[-] Fetching http://127.0.0.1/.git/README.md [200]
[-] Fetching http://127.0.0.1/.git/hooks/ [200]
[-] Fetching http://127.0.0.1/.git/refs/ [200]
[-] Fetching http://127.0.0.1/.git/requirements.txt [200]
[-] Fetching http://127.0.0.1/.git/.git/config [200]
[-] Fetching http://127.0.0.1/.git/.git/description [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/ [200]
[-] Fetching http://127.0.0.1/.git/.git/info/ [200]
[-] Fetching http://127.0.0.1/.git/.git/objects/ [200]
[-] Fetching http://127.0.0.1/.git/.git/packed-refs [200]
[-] Fetching http://127.0.0.1/.git/.git/index [200]
[-] Fetching http://127.0.0.1/.git/.git/HEAD [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/ [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/ [200]
[-] Fetching http://127.0.0.1/.git/logs/HEAD [200]
[-] Fetching http://127.0.0.1/.git/info/exclude [200]
[-] Fetching http://127.0.0.1/.git/objects/info/ [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/ [200]
[-] Fetching http://127.0.0.1/.git/objects/pack/ [200]
[-] Fetching http://127.0.0.1/.git/hooks/applypatch-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/commit-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-commit.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-push.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/prepare-commit-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-rebase.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/push-to-checkout.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/update.sample [200]
[-] Fetching http://127.0.0.1/.git/refs/heads/ [200]
[-] Fetching http://127.0.0.1/.git/refs/remotes/ [200]
[-] Fetching http://127.0.0.1/.git/refs/tags/ [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/applypatch-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/commit-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/setup.py [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/fsmonitor-watchman.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-receive.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/post-update.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/post-update.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-applypatch.sample [200]
[-] Fetching http://127.0.0.1/.git/hooks/fsmonitor-watchman.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/pre-commit.sample [200]
[-] Fetching http://127.0.0.1/[-] Fetching http://127.0.0.1/.git/.git/hooks/pre-rebase.sample [200]
.git/.git/hooks/pre-merge-commit.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/info/exclude [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/pre-applypatch.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/pre-push.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/HEAD [200]
[-] Fetching http://127.0.0.1/.git/.git/objects/pack/ [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/ [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/heads/ [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/heads/ [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/remotes/ [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/pre-receive.sample [200]
[-] Fetching http://127.0.0.1/.git/objects/pack/pack-4b034facd4498c7ab9c0b5054ca1675a396657c1.idx [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/remotes/ [200]
[-] Fetching http://127.0.0.1/.git/refs/heads/master [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/pre[-] Fetching http://127.0.0.1/.git/objects/pack/pack-4b034facd4498c7ab9c0b5054ca1675a396657c1.pack [200]
[-] Fetching http://127.0.0.1/.git/.git/objects/pack/pack-4b034facd4498c7ab9c0b5054ca1675a396657c1.idx [200]
[-] Fetching http://127.0.0.1/.git/refs/remotes/origin/ [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/heads/ [200]
[-] Fetching http://127.0.0.1/.git/.git/objects/pack/pack-4b034facd4498c7ab9c0b5054ca1675a396657c1.pack [200]
pare-commit-msg.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/remotes/ [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/update.sample [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/remotes/origin/ [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/heads/master [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/remotes/origin/ [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/remotes/origin/HEAD [200]
[-] Fetching http://127.0.0.1/.git/hooks/pre-merge-commit.sample [200]
[-] Fetching http://127.0.0.1/.git/.git/logs/refs/remotes/origin/HEAD [200]
[-] Fetching http://127.0.0.1/.git/logs/refs/heads/master [200]
[-] Fetching http://127.0.0.1/.git/.git/hooks/push-to-checkout.sample [200]
[-] Fetching http://127.0.0.1/.git/refs/remotes/origin/HEAD [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/heads/master [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/remotes/origin/ [200]
[-] Fetching http://127.0.0.1/.git/.git/refs/remotes/origin/HEAD [200]
[-] Running git checkout .
Updated 6 paths from the index
```

## URL List

- [Github.com - git-dumper](https://github.com/arthaud/git-dumper.git)
