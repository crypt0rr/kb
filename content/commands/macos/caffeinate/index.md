---
title : "Caffeinate"
# pre : '<i class="fas fa-code"></i> '
description : "Prevent the system from sleeping on behalf of a utility."
date : 2021-12-21T13:45:00+01:00
# hidden : true
author: 'crypt0rr'
# draft : true
weight : 10
# tags : ['']
---

---

Prevent the system from sleeping on behalf of a utility.

## Usage

```plain
caffeinate [-disu] [-t timeout] [-w pid] [utility arguments...]
```

## Flags

```plain
   -d      Create an assertion to prevent the display from sleeping.

   -i      Create an assertion to prevent the system from idle sleeping.

   -m      Create an assertion to prevent the disk from idle sleeping.

   -s      Create an assertion to prevent the system from sleeping. This
           assertion is valid only when system is running on AC power.

   -u      Create an assertion to declare that user is active.
           If the display is off, this option turns the display on and prevents the display from going
           into idle sleep. If a timeout is not specified with '-t' option, then this assertion is
           taken with a default of 5 second timeout.

   -t      Specifies the timeout value in seconds for which this assertion has to be valid.
           The assertion is dropped after the specified timeout.
           Timeout value is not used when an utility is invoked with this command.

   -w      Waits for the process with the specified pid to exit. Once the  the process exits, the
           assertion is also released.  This option is ignored when used with utility option.
```

## Examples

### Prevent sleep for 1 hour (3600 seconds)

```plain
caffeinate -u -t 3600
```

### Make caffeinate fork a process, exec "make" in it, and hold an assertion that prevents idle sleep as long as that process is running

```plain
caffeinate -i make
```

## URL List

- [ss64.com - Caffeinate](https://ss64.com/osx/caffeinate.html)
