---
title : "IPsourcebypass"
# pre : ' '
description : "This Python script can be used to bypass IP source restrictions using HTTP headers."
date : 2021-10-21T10:27:30+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## IPsourcebypass

This Python script can be used to bypass IP source restrictions using HTTP headers.

### Features

* 17 HTTP headers.
* Multithreading.
* JSON export with --json outputfile.json.
* Autodetecting most successfull bypasses.

## Installation

```plain
git clone https://github.com/p0dalirius/ipsourcebypass.git
```

## Usage

```plain
python3 ipsourcebypass.py [-h] [-v] -i IP [-t THREADS] [-x PROXY] [-k] [-L] [-j JSONFILE] url
```

## Flags

```plain
positional arguments:
  url                   e.g. https://example.com:port/path

optional arguments:
  -h, --help            show this help message and exit
  -v, --verbose         arg1 help message
  -i IP, --ip IP        IP to spoof.
  -t THREADS, --threads THREADS
                        Number of threads (default: 5)
  -x PROXY, --proxy PROXY
                        Specify a proxy to use for requests (e.g., http://localhost:8080)
  -k, --insecure        Allow insecure server connections when using SSL (default: False)
  -L, --location        Follow redirects (default: False)
  -j JSONFILE, --jsonfile JSONFILE
                        Save results to specified JSON file.
```

## Examples

![Example](images/example1.png)
![Example](images/example2.png)
![Example](images/example3.png)

## URL List

- [Github.com - ipsourcebypass](https://github.com/p0dalirius/ipsourcebypass)
