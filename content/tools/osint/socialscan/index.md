---
title : "Socialscan"
# pre : ' '
description : "Command-line interface for checking email address and username usage on online platforms: GitHub, GitLab, Instagram, Lastfm, Pinterest, Reddit, Snapchat, Spotify, Twitter, Tumblr, Yahoo, Firefox."
date : 2020-11-17T11:55:13+01:00
# hidden : true
# draft : true
weight : 310
# tags : ['']
---

---

Command-line interface for checking email address and username usage on online platforms: GitHub, GitLab, Instagram, Lastfm, Pinterest, Reddit, Snapchat, /.Spotify, Twitter, Tumblr, Yahoo, Firefox.

## Installation

```plain
python3 -m pip install socialscan
```

## Usage

```plain
usage: socialscan [-h] [--platforms [platform [platform ...]]] [--view-by {platform,query}] [--available-only] [--cache-tokens]
                  [--input input.txt] [--proxy-list proxy_list.txt] [--verbose] [--show-urls] [--json json.txt] [--debug] [--version]
                  [query [query ...]]
```

## Flags

```plain
Command-line interface for checking email address and username usage on online platforms: GitHub, GitLab, Instagram, Lastfm, Pinterest,
Reddit, Snapchat, Spotify, Twitter, Tumblr, Yahoo, Firefox

positional arguments:
  query                 one or more usernames/email addresses to query (email addresses are automatically be queried if they match the
                        format)

optional arguments:
  -h, --help            show this help message and exit
  --platforms [platform [platform ...]], -p [platform [platform ...]]
                        list of platforms to query (default: all platforms)
  --view-by {platform,query}
                        view results sorted by platform or by query (default: query)
  --available-only, -a  only print usernames/email addresses that are available and not in use
  --cache-tokens, -c    cache tokens for platforms requiring more than one HTTP request (Snapchat, GitHub, Instagram. Lastfm, Tumblr &
                        Yahoo), reducing total number of requests sent
  --input input.txt, -i input.txt
                        file containg list of queries to execute
  --proxy-list proxy_list.txt
                        file containing list of HTTP proxy servers to execute queries with
  --verbose, -v         show query responses as they are received
  --show-urls           display profile URLs for usernames on supported platforms (profiles may not exist if usernames are reserved or
                        belong to deleted/banned accounts)
  --json json.txt       output results in JSON format to the specified file
  --debug               output debug messages
  --version             show program's version number and exit
```

## Examples

```plain
$ socialscan twitter@offsec.nl  
----------------------------------------
         twitter@offsec.nl
----------------------------------------
Firefox
GitHub
Lastfm
Pinterest
Tumblr
Twitter
Instagram: QueryError - Could not retrieve token. You might be sending too many requests. Use a proxy or wait before trying again.
Spotify: KeyError - 'email'

Available, Taken/Reserved, Invalid, Error
Completed 12 queries in 1.75s
```

## URL List

- [GitHub.com - socialscan](https://github.com/iojw/socialscan)
- [Pypi.org - socialscan](https://pypi.org/project/socialscan/)
