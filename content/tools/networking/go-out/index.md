---
title : "go-out"
# pre : ' '
description : "A simple, Golang egress buster."
date : 2022-07-01T12:53:03+02:00
# hidden : true
# draft : true
weight : 160
# tags : ['']
---

---

A simple, Golang egress buster using [@mubix](https://twitter.com/mubix) letmeoutofyour.net and [@bhinfosecurity](https://twitter.com/bhinfosecurity) allports.exposed services.

## Installation

```plain
git clone https://github.com/sensepost/go-out.git
go build -o go-out main.go
```

Or download newest binary from the [releases](https://github.com/sensepost/go-out/releases)

## Usage

```plain
./go-out
```

## Flags

```plain
  -end int
        The end port to use. (default 65535)
  -https
        Egress bust using HTTPs. (letmeout only) (default true)
  -insecure
        Don't verify the certificate when using HTTPs.
  -invert
        Invert results of the egress bust.
  -r    Randomise port scanning order
  -service string
        Use 'letmeout' or 'allports' for this run. (default "letmeout")
  -start int
        The start port to use. (default 1)
  -throttle
        Throttle request speed. (random for a max of 10sec)
  -timeout int
        Timeout in seconds. (default 5)
  -version
        Print the version and exit
  -w int
        Number of concurrent workers to spawn. (default 5)
```

## Examples

### Checking on HTTP protocol on port range from 80 to 100

```plain
$ ./go-out -start=80 -end=100 -https=false
===== Configuration =====
Service:        letmeout
Start Port:     80
End Port:       100
Workers:        5
HTTPS On:       false
Ignore Certs:   false
Invert:         false
Timeout:        5
Throttle:       false
Random Ports:   false
=========================

[!] Looks like we have egress using http://go-out.letmeoutofyour.net:80 on port 80
[!] Looks like we have egress using http://go-out.letmeoutofyour.net:90 on port 90
[!] Looks like we have egress using http://go-out.letmeoutofyour.net:99 on port 99
[!] Looks like we have egress using http://go-out.letmeoutofyour.net:100 on port 100
Done in 6.32565113s
```

### Checking on HTTPS protocol on port range from 80 to 443

```plain
$ ./go-out -start=80 -end=443             
===== Configuration =====
Service:        letmeout
Start Port:     80
End Port:       443
Workers:        5
HTTPS On:       true
Ignore Certs:   false
Invert:         false
Timeout:        5
Throttle:       false
Random Ports:   false
=========================

[!] Looks like we have egress using https://go-out.letmeoutofyour.net:443 on port 443
[!] Looks like we have egress using https://go-out.letmeoutofyour.net:435 on port 435
Done in 36.501049166s
```

## URL List

- [Github.com - go-out](https://github.com/sensepost/go-out)
