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

A commandline web screenshot and information gathering tool by @leonjza.

### Installation

```plain
go get -u github.com/sensepost/gowitness
```

### Usage

```plain
gowitness [command]
```

### Flags

```plain
Available Commands:
  file        screenshot URLs sourced from a file or stdin
  help        Help about any command
  merge       Merge gowitness sqlite databases
  nmap        Screenshot services from an Nmap XML file
  report      Work with gowitness reports
  scan        Scan a CIDR range and take screenshots along the way
  server      Starts a webservice that takes screenshots
  single      Take a screenshot of a single URL
  version     Prints the version of gowitness

Flags:
      --chrome-path string       path to chrome executable to use
  -D, --db-path string           destination for the gowitness database (default "gowitness.sqlite3")
      --debug                    enable debug logging
      --delay int                delay in seconds between navigation and screenshot
      --disable-db               disable all database operations
      --disable-logging          disable all logging
  -F, --fullpage                 take fullpage screenshots
  -h, --help                     help for gowitness
  -p, --proxy string             http/socks5 proxy to use. Use format proto://address:port
  -X, --resolution-x int         screenshot resolution x (default 1440)
  -Y, --resolution-y int         screenshot resolution y (default 900)
  -P, --screenshot-path string   store path for screenshots (use . for pwd) (default "screenshots")
      --timeout int              preflight check timeout (default 10)
      --user-agent string        user agent string to use (default "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36")

Use "gowitness [command] --help" for more information about a command.
```

### Examples

#### Single page screenshot

```plain
$ gowitness single --url=https://www.google.com/
INFO[2020-08-14 10:03:43] Title parsed                                  title=Google url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response code                                 status="200 OK" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Final URL after redirects                     final-url="https://www.google.com/" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               X-Xss-Protection=0 url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Alt-Svc="h3-29=\":443\"; ma=2592000,h3-27=\":443\"; ma=2592000,h3-T050=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\"" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Content-Type="text/html; charset=UTF-8" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               P3p="CP=\"This is not a P3P policy! See g.co/p3phelp for more info.\"" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Strict-Transport-Security="max-age=31536000" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Server=gws url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Retry-Count=0 url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Date="Fri, 14 Aug 2020 08:03:43 GMT" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Cache-Control="private, max-age=0" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               X-Frame-Options=SAMEORIGIN url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Set-Cookie="1P_JAR=2020-08-14-08; expires=Sun, 13-Sep-2020 08:03:43 GMT; path=/; domain=.google.com; Secure; SameSite=none, NID=204=y-NilmxywuDChS1g7mzySxsmHY6r-8vWM_jy8oTbwMl0LDE1O_u6QV1ySW-Y5kSJwvUD33soBciGOD7Alg8JbSyMeGqK406wRIJUutZ4tlMs7jJIR5bP5Id_qnnhjYq0kj_J4gyX9HuVyH8cLueCCoWhc4PIqmkPmoAlaIKeHto; expires=Sat, 13-Feb-2021 08:03:43 GMT; path=/; domain=.google.com; Secure; HttpOnly; SameSite=none, CONSENT=WP.289fb0; expires=Fri, 01-Jan-2038 00:00:00 GMT; path=/; domain=.google.com" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Response header                               Expires=-1 url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Certificate chain common name                 common_name=www.google.com url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Signature algorithm                           signature-alg=SHA256-RSA url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Public key algorithm                          pubkey-alg=ECDSA url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Issuer                                        issuer="GTS CA 1O1" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] DNS Name                                      dns-names=www.google.com url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Certificate chain common name                 common_name="GTS CA 1O1" url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Signature algorithm                           signature-alg=SHA256-RSA url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Public key algorithm                          pubkey-alg=RSA url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Issuer                                        issuer=GlobalSign url="https://www.google.com/"
INFO[2020-08-14 10:03:43] Cipher suite in use                           cipher-suite=4865 url="https://www.google.com/"
INFO[2020-08-14 10:03:43] [--headless --disable-gpu --hide-scrollbars --disable-crash-reporter --user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36 --window-size=1440,900 --screenshot=https-www.google.com.png --virtual-time-budget=2000]
INFO[2020-08-14 10:03:43] Taking screenshot                             destination=https-www.google.com.png url="https://www.google.com/"
INFO[2020-08-14 10:03:45] Screenshot taken                              destination=https-www.google.com.png duration=1.481597579s url="https://www.google.com/"
INFO[2020-08-14 10:03:45] Complete                                      run-time=2.2574476s
```

![Example](images/example-1.png)

#### Screenshot nmap XML output

```plain
$ gowitness nmap -f nmap-scan.xml
INFO[2020-08-14 10:33:35] Parsing nmap file                             file=nmap-scan.xml
INFO[2020-08-14 10:33:35] Parsed NMAP file information, generating URL's  args="nmap -p80,443 -iL url-list.txt -oX nmap-scan.xml"
INFO[2020-08-14 10:33:35] Total targets to be processed                 target-count=28
ERRO[2020-08-14 10:33:35] Failed to query url                           error="[Get \"https://172.217.168.206:80\": http: server gave HTTP response to HTTPS client]" url="https://172.217.168.206:80"
ERRO[2020-08-14 10:33:35] Failed to query url                           error="[Get \"http://172.217.168.206:443\": EOF]" url="http://172.217.168.206:443"
ERRO[2020-08-14 10:33:35] Failed to query url                           error="[Get \"https://185.60.216.35:80\": http: server gave HTTP response to HTTPS client]" url="https://185.60.216.35:80"
ERRO[2020-08-14 10:33:35] Failed to query url                           error="[Get \"http://185.60.216.35:443\": net/http: HTTP/1.x transport connection broken: malformed HTTP response \"\\x15\\x03\\x03\\x00\\x02\\x022\"]" url="http://185.60.216.35:443"
ERRO[2020-08-14 10:33:35] Failed to query url                           error="[Get \"https://www.facebook.com:80/\": http: server gave HTTP response to HTTPS client]" url="http://185.60.216.35:80"
INFO[2020-08-14 10:33:35] Title parsed                                  title=Google url="https://172.217.168.206:443"
INFO[2020-08-14 10:33:35] Response code                                 status="200 OK" url="https://172.217.168.206:443"
INFO[2020-08-14 10:33:35] Final URL after redirects                     final-url="https://www.google.com/?gws_rd=ssl" url="https://172.217.168.206:443"
INFO[2020-08-14 10:33:35] Response header                               Content-Type="text/html; charset=UTF-8" url="https://172.217.168.206:443"
INFO[2020-08-14 10:33:35] Response header                               Strict-Transport-Security="max-age=31536000" url="https://172.217.168.206:443"
INFO[2020-08-14 10:33:35] Response header                               Server=gws url="https://172.217.168.206:443"
[...SNIP...]
```

#### View results in webbrowser

```plain
$ gowitness report serve                       
31 May 2021 10:17:11 INF db path path=gowitness.sqlite3
31 May 2021 10:17:11 INF screenshot path path=screenshots
31 May 2021 10:17:11 INF server listening address=localhost:7171
```

![Example](images/example-2.png)

### URL list

* [GitHub.com - gowitness](https://github.com/sensepost/gowitness)
