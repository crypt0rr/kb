---
title : "PAN-OS GP Scanner"
# pre : ' '
description : "Determine the Palo Alto PAN-OS software version of a remote GlobalProtect portal or management interface."
date : 2022-04-24T14:34:27+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## PAN-OS GlobalProtect Portal Scanner

Palo Alto's GlobalProtect portal, a feature of PAN-OS, has been the subject of [several critical-severity vulnerabilities](https://security.paloaltonetworks.com/?severity=CRITICAL&product=PAN-OS&sort=-date) that can allow authorization bypass, unauthenticated remote code execution, etc. From an external perspective, it can be difficult to tell if you're running a patched version of PAN-OS since the GlobalProtect portal and management interface don't explicitly reveal their underlying software version.

To assist PAN-OS users in patching their firewalls, this scanner examines the `Last-Modified` and `ETag` HTTP response headers for several static web resources, and associates those values with specific PAN-OS releases. For example, note the `ETag` in the following HTTP response from the GlobalProtect portal login page:

```plain
$ curl -skI https://example.com/global-protect/login.esp
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
ETag: "6e185d5daf9a"
```

Examining the last 8 characters of the `ETag` gives us the hexadecimal epoch time `5d5daf9a`, represented as `1566420890` in decimal format. We can convert this epoch time to a human-readable format using the UNIX `date` utility:

```plain
$ date -d @1566420890
Wed 21 Aug 2019 08:54:50 PM UTC
```

Using the attached `version-table.txt`, we can determine that this instance of GlobalProtect portal is running on PAN-OS version `8.1.10`, and is therefore vulnerable to [CVE-2020-2034](https://security.paloaltonetworks.com/CVE-2020-2034), an OS command injection vulnerability in GlobalProtect portal, and should consequently be patched.

```plain
$ awk '/Aug.*21.*2019/ {print $1}' version-table.txt 
8.1.10
```

This scanner automates the process described above, suggesting an exact (or approximate) underlying PAN-OS version for a remote GlobalProtect portal or management interface. When multiple versions are associated with a given date, this tool will display all version matches as a comma-separated list; e.g, `7.1.24-h1,8.0.19-h1,8.1.9-h4` for `2019-08-15`.

## Installation

```plain
git clone https://github.com/noperator/panos-scanner
```

## Usage

```plain
python3 panos-scanner.py [-h] [-v] [-s] -t TARGET
```

## Flags

```plain
Determine the software version of a remote PAN-OS target. Requires version-table.txt in the same directory. See https://security.paloaltonetworks.com/?product=PAN-OS for security advisories for specific PAN-OS
versions.

optional arguments:
  -h, --help  show this help message and exit
  -v          verbose output
  -s          stop after one exact match
  -t TARGET   https://example.com
```

## Examples

```plain
$ python3 panos-scanner.py -s -t https://example.com | jq '.match'
{
  "date": "2018-05-04",
  "versions": [
    "8.0.10"
  ],
  "precision": "exact",
  "resource": "global-protect/portal/images/favicon.ico"
}
```

## URL List

* [Github.com - PAN-OS GlobalProtect Portal Scanner](https://github.com/noperator/panos-scanner)
