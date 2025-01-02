---
title : "dmesg"
# pre : '<i class="fas fa-code"></i> '
description : "Display or control the kernel ring buffer."
date : 2020-08-22T14:36:17+02:00
# hidden : true
# draft : true
weight : 220
# tags : ['']
---

---

Display or control the kernel ring buffer - show bootup messages.

## Usage

```plain
dmesg [options]
```

## Flags

```plain
Options:
 -C, --clear                 clear the kernel ring buffer
 -c, --read-clear            read and clear all messages
 -D, --console-off           disable printing messages to console
 -E, --console-on            enable printing messages to console
 -F, --file <file>           use the file instead of the kernel log buffer
 -f, --facility <list>       restrict output to defined facilities
 -H, --human                 human readable output
 -k, --kernel                display kernel messages
 -L, --color[=<when>]        colorize messages (auto, always or never)
                               colors are enabled by default
 -l, --level <list>          restrict output to defined levels
 -n, --console-level <level> set level of messages printed to console
 -P, --nopager               do not pipe output into a pager
 -p, --force-prefix          force timestamp output on each line of multi-line messages
 -r, --raw                   print the raw message buffer
 -S, --syslog                force to use syslog(2) rather than /dev/kmsg
 -s, --buffer-size <size>    buffer size to query the kernel ring buffer
 -u, --userspace             display userspace messages
 -w, --follow                wait for new messages
 -x, --decode                decode facility and level to readable string
 -d, --show-delta            show time delta between printed messages
 -e, --reltime               show local time and time delta in readable format
 -T, --ctime                 show human-readable timestamp (may be inaccurate!)
 -t, --notime                don't show any timestamp with messages
     --time-format <format>  show timestamp using the given format:
                               [delta|reltime|ctime|notime|iso]
Suspending/resume will make ctime and iso timestamps inaccurate.

 -h, --help                  display this help
 -V, --version               display version

Supported log facilities:
    kern - kernel messages
    user - random user-level messages
    mail - mail system
  daemon - system daemons
    auth - security/authorization messages
  syslog - messages generated internally by syslogd
     lpr - line printer subsystem
    news - network news subsystem

Supported log levels (priorities):
   emerg - system is unusable
   alert - action must be taken immediately
    crit - critical conditions
     err - error conditions
    warn - warning conditions
  notice - normal but significant condition
    info - informational
   debug - debug-level messages

For more details see dmesg(1).
```

## Examples

```plain
 dmesg
[    0.000000] microcode: microcode updated early to revision 0xd6, date = 2020-04-27
[    0.000000] Linux version 5.4.0-7634-generic (buildd@lcy01-amd64-029) (gcc version 9.3.0 (Ubuntu 9.3.0-10ubuntu2)) #38~1596560323~20.04~7719dbd-Ubuntu SMP Tue Aug 4 19:12:34 UTC 2 (Ubuntu 5.4.0-7634.38~1596560323~20.04~7719dbd-generic 5.4.41)
[    0.000000] Command line: initrd=\EFI\Pop_OS-5d9b752f-4284-420f-98f4-ce080478be72\initrd.img root=UUID=5d9b752f-4284-420f-98f4-ce080478be72 ro quiet loglevel=0 systemd.show_status=false splash
[    0.000000] KERNEL supported cpus:
[    0.000000]   Intel GenuineIntel
[    0.000000]   AMD AuthenticAMD
[    0.000000]   Hygon HygonGenuine
[    0.000000]   Centaur CentaurHauls
[    0.000000]   zhaoxin   Shanghai  
[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
[...]
```

## URL List

- [Linux.die.net](https://linux.die.net/man/8/dmesg)
