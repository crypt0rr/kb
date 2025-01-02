---
title : "Faketime"
# pre : '<i class="fas fa-code"></i> '
description : "Manipulate the system time for a given command."
date : 2022-01-30T15:40:58+01:00
# hidden : true
# draft : true
weight : 240
# tags : ['']
---

---

The Fake Time Preload Library (FTPL, a.k.a. libfaketime) intercepts various system calls which programs use to retrieve the current date and time. It can then report faked dates and times (as specified by you, the user) to these programs. This means you can modify the system time a program sees without having to change the time system-wide. FTPL allows you to specify both absolute dates (e.g., 2004-01-01) and relative dates (e.g., 10 days ago). . This package contains a "faketime" binary that makes it easy to use the LD_PRELOAD library.

## Installation

```plain
sudo apt install faketime
```

## Usage

```plain
faketime [OPTIONS]
```

## Flags

```plain
       --help show usage information and quit.

       --version
              show version information and quit.

       -m     use the multi-threading variant of libfaketime.

       -f     use the advanced timestamp specification format.

```

## Examples

```plain
$ date
Fri 28 Jan 2022 11:19:20 AM EST

$ faketime -f +4h date
Fri 28 Jan 2022 03:19:20 PM EST

$ faketime -f -4h bash
$ date
Fri 28 Jan 2022 07:19:20 AM EST
```

## URL List

- [Manpages.ubuntu.com - Faketime](https://manpages.ubuntu.com/manpages/trusty/man1/faketime.1.html)
