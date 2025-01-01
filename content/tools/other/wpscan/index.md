---
title : "WPscan"
# pre : ' '
description : "WordPress Vulnerability Scanner."
date : 2020-03-11T15:57:21+01:00
# hidden : true
# draft : true
weight : 2080
# tags : [""]
---

---

WordPress Vulnerability Scanner.

## Installation

### Requirements

```plain
sudo apt install gem zlib1g-dev ruby2.5-dev
```

```plain
sudo gem install wpscan
```

### On failure of installation

```plain
sudo apt-get install ruby`ruby -e 'puts RUBY_VERSION[/\d+\.\d+/]'`-dev
```

## Usage

```plain
wpscan [options]
```

## Flags

```plain
Usage: wpscan [options]
        --url URL                                 The URL of the blog to scan
                                                  Allowed Protocols: http, https
                                                  Default Protocol if none provided: http
                                                  This option is mandatory unless update or help or hh or version is/are supplied
    -h, --help                                    Display the simple help and exit
        --hh                                      Display the full help and exit
        --version                                 Display the version and exit
    -v, --verbose                                 Verbose mode
        --[no-]banner                             Whether or not to display the banner
                                                  Default: true
    -o, --output FILE                             Output to FILE
    -f, --format FORMAT                           Output results in the format supplied
                                                  Available choices: cli-no-colour, cli-no-color, json, cli
        --detection-mode MODE                     Default: mixed
                                                  Available choices: mixed, passive, aggressive
        --user-agent, --ua VALUE
        --random-user-agent, --rua                Use a random user-agent for each scan
        --http-auth login:password
    -t, --max-threads VALUE                       The max threads to use
                                                  Default: 5
        --throttle MilliSeconds                   Milliseconds to wait before doing another web request. If used, the max threads will be set to 1.
        --request-timeout SECONDS                 The request timeout in seconds
                                                  Default: 60
        --connect-timeout SECONDS                 The connection timeout in seconds
                                                  Default: 30
        --disable-tls-checks                      Disables SSL/TLS certificate verification, and downgrade to TLS1.0+ (requires cURL 7.66 for the latter)
        --proxy protocol://IP:port                Supported protocols depend on the cURL installed
        --proxy-auth login:password
        --cookie-string COOKIE                    Cookie string to use in requests, format: cookie1=value1[; cookie2=value2]
        --cookie-jar FILE-PATH                    File to read and write cookies
                                                  Default: /tmp/wpscan/cookie_jar.txt
        --force                                   Do not check if the target is running WordPress
        --[no-]update                             Whether or not to update the Database
        --api-token TOKEN                         The WPVulnDB API Token to display vulnerability data
        --wp-content-dir DIR                      The wp-content directory if custom or not detected, such as "wp-content"
        --wp-plugins-dir DIR                      The plugins directory if custom or not detected, such as "wp-content/plugins"
    -e, --enumerate [OPTS]                        Enumeration Process
                                                  Available Choices:
                                                   vp   Vulnerable plugins
                                                   ap   All plugins
                                                   p    Popular plugins
                                                   vt   Vulnerable themes
                                                   at   All themes
                                                   t    Popular themes
                                                   tt   Timthumbs
                                                   cb   Config backups
                                                   dbe  Db exports
                                                   u    User IDs range. e.g: u1-5
                                                        Range separator to use: '-'
                                                        Value if no argument supplied: 1-10
                                                   m    Media IDs range. e.g m1-15
                                                        Note: Permalink setting must be set to "Plain" for those to be detected
                                                        Range separator to use: '-'
                                                        Value if no argument supplied: 1-100
                                                  Separator to use between the values: ','
                                                  Default: All Plugins, Config Backups
                                                  Value if no argument supplied: vp,vt,tt,cb,dbe,u,m
                                                  Incompatible choices (only one of each group/s can be used):
                                                   - vp, ap, p
                                                   - vt, at, t
        --exclude-content-based REGEXP_OR_STRING  Exclude all responses matching the Regexp (case insensitive) during parts of the enumeration.
                                                  Both the headers and body are checked. Regexp delimiters are not required.
        --plugins-detection MODE                  Use the supplied mode to enumerate Plugins, instead of the global (--detection-mode) mode.
                                                  Default: passive
                                                  Available choices: mixed, passive, aggressive
        --plugins-version-detection MODE          Use the supplied mode to check plugins versions instead of the --detection-mode or --plugins-detection modes.
                                                  Default: mixed
                                                  Available choices: mixed, passive, aggressive
    -P, --passwords FILE-PATH                     List of passwords to use during the password attack.
                                                  If no --username/s option supplied, user enumeration will be run.
    -U, --usernames LIST                          List of usernames to use during the password attack.
                                                  Examples: 'a1', 'a1,a2,a3', '/tmp/a.txt'
        --multicall-max-passwords MAX_PWD         Maximum number of passwords to send by request with XMLRPC multicall
                                                  Default: 500
        --password-attack ATTACK                  Force the supplied attack to be used rather than automatically determining one.
                                                  Available choices: wp-login, xmlrpc, xmlrpc-multicall
        --stealthy                                Alias for --random-user-agent --detection-mode passive --plugins-version-detection passive
```

## Examples

### Normal scan

```plain
wpscan --update --url <target>
```

### Normal scan and scan specific plugins

```plain
wpscan --update --force --enumerate p,t,u,tt --url <target>
```

### Normal scan and force enumerate all plugins

```plain
wpscan --update --force --enumerate plugins --url <target>
```

### Use proxy

```plain
wpscan --proxy http://127.0.0.1:8080 --disable-tls-checks --url <target>
```

### User enumeration

```plain
/wp-json/wp/v2/users
//wp-json/wp/v2/users
/author-sitemap.xml
```

### Interesting paths

```plain
/wp-content/debug.log
```

### Brute force attack Wordpress user

```plain
$ wpscan --url 10.10.10.10/wordpress/ --passwords /usr/share/wordlists/rockyou.txt --usernames admin --max-threads 50 
[...]
[+] Performing password attack on Xmlrpc against 1 user/s
[SUCCESS] - admin / my2boys                                                         
[...]
```

### XMLRPC.php attack SSRF

<https://the-bilal-rizwan.medium.com/wordpress-xmlrpc-php-common-vulnerabilites-how-to-exploit-them-d8d3c8600b32>

## URL List

- [WPscan.org](https://wpscan.org/)
- [GitHub.com - wpscan](https://github.com/wpscanteam/wpscan)
