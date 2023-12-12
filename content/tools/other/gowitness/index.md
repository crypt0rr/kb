---
title : "GoWitness"
# pre : ' '
description : "A website screenshot utility written in Golang, that uses Chrome Headless to generate screenshots of web interfaces using the command line."
date : 2020-08-14T10:01:21+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## GoWitness

A command line web screenshot and information gathering tool by [@leonjza](https://twitter.com/leonjza).

## Installation

```plain
go install github.com/sensepost/gowitness@latest
```

## Usage

```plain
gowitness [command]
```

## Flags

```plain
Available Commands:
  completion  Generate the autocompletion script for the specified shell
  file        Screenshot URLs sourced from a file or stdin
  help        Help about any command
  merge       Merge gowitness sqlite databases
  nessus      Screenshot services from a Nessus XML file
  nmap        Screenshot services from an Nmap XML file
  report      Work with gowitness reports
  scan        Scan a CIDR range and take screenshots along the way
  server      Starts a webserver that serves the report interface, api and screenshot tool
  single      Take a screenshot of a single URL
  version     Prints the version of gowitness

Flags:
      --chrome-path string       path to chrome executable to use
  -D, --db-location string       destination for the gowitness database. supports sqlite & postgres (eg: postgres://user:pass@host:port/db) (default "sqlite://gowitness.sqlite3")
      --debug                    enable debug logging
      --debug-db                 enable debug logging for all database operations
      --delay int                delay in seconds between navigation and screenshot
      --disable-db               disable all database operations
      --disable-logging          disable all logging
  -F, --fullpage                 take fullpage screenshots
      --header strings           additional HTTP header to set. Supports multiple --header flags
  -h, --help                     help for gowitness
      --js string                javascript code to execute when loading a target site (eg: console.log('gowitness'))
      --pdf                      save screenshots as pdf
  -p, --proxy string             http/socks5 proxy to use. Use format proto://address:port
  -X, --resolution-x int         screenshot resolution x (default 1440)
  -Y, --resolution-y int         screenshot resolution y (default 900)
      --screenshot-db-store      save screenshots to the database as well
      --screenshot-filter ints   http response codes to screenshot. this is a filter. by default all codes are screenshotted
  -P, --screenshot-path string   store path for screenshots (use . for pwd) (default "screenshots")
      --timeout int              preflight check timeout (default 10)
      --user-agent string        user agent string to use (default "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36")
```

## Examples

### Single page screenshot

```plain
$ gowitness single https://www.google.com/
21 Jun 2022 20:59:59 INF preflight result statuscode=200 title=Google url=https://www.google.com/
```

![Example](images/example-1.png)

### Screenshot nmap XML output

```plain
$ gowitness nmap --file out.xml                       
21 Jun 2022 21:14:49 ERR preflight request failed error="Get \"http://172.217.169.78:443\": EOF"
21 Jun 2022 21:14:49 ERR preflight request failed error="Get \"https://172.217.169.78:80\": http: server gave HTTP response to HTTPS client"
21 Jun 2022 21:14:49 ERR preflight request failed error="Get \"https://157.240.221.35:80\": http: server gave HTTP response to HTTPS client"
21 Jun 2022 21:14:49 ERR preflight request failed error="Get \"http://157.240.221.35:443\": net/http: HTTP/1.x transport connection broken: malformed HTTP response \"\\x15\\x03\\x03\\x00\\x02\\x022\""
21 Jun 2022 21:14:49 ERR preflight request failed error="Get \"https://www.facebook.com:80/\": http: server gave HTTP response to HTTPS client"
21 Jun 2022 21:14:50 INF preflight result statuscode=200 title=Google url=http://172.217.169.78:80
21 Jun 2022 21:14:50 INF preflight result statuscode=200 title=Google url=https://172.217.169.78:443
21 Jun 2022 21:14:50 INF preflight result statuscode=200 title="Facebook – log in or sign up" url=https://157.240.221.35:443
21 Jun 2022 21:14:54 ERR preflight request failed error="Get \"https://172.67.180.148:80\": http: server gave HTTP response to HTTPS client"
21 Jun 2022 21:14:54 WRN preflight result statuscode=400 title="400 The plain HTTP request was sent to HTTPS port" url=http://172.67.180.148:443
21 Jun 2022 21:14:55 ERR preflight request failed error="Get \"https://172.67.180.148:443\": remote error: tls: handshake failure"
21 Jun 2022 21:14:59 ERR preflight request failed error="Get \"http://172.67.180.148:80\": context deadline exceeded"
21 Jun 2022 21:14:59 INF processing complete
```

### View results in web browser

```plain
$ gowitness server                        
21 Jun 2022 21:19:59 INF db path path=gowitness.sqlite3
21 Jun 2022 21:19:59 INF screenshot path path=screenshots
21 Jun 2022 21:19:59 INF server listening address=localhost:7171
```

![Example](images/example-2.png)
![Example](images/example-3.png)

## URL List

- [GitHub.com - gowitness](https://github.com/sensepost/gowitness)
