---
title : "journalctl"
# pre : '<i class="fas fa-code"></i> '
description : "Query the journal."
date : 2020-09-28T20:39:16+02:00
# hidden : true
# draft : true
weight : 440
# tags : ['']
---

---

Query the journal.

## Usage

```plain
journalctl [OPTIONS...] [MATCHES...]
```

## Flags

```plain
Options:
     --system                Show the system journal
     --user                  Show the user journal for the current user
  -M --machine=CONTAINER     Operate on local container
  -S --since=DATE            Show entries not older than the specified date
  -U --until=DATE            Show entries not newer than the specified date
  -c --cursor=CURSOR         Show entries starting at the specified cursor
     --after-cursor=CURSOR   Show entries after the specified cursor
     --show-cursor           Print the cursor after all the entries
     --cursor-file=FILE      Show entries after cursor in FILE and update FILE
  -b --boot[=ID]             Show current boot or the specified boot
     --list-boots            Show terse information about recorded boots
  -k --dmesg                 Show kernel message log from the current boot
  -u --unit=UNIT             Show logs from the specified unit
     --user-unit=UNIT        Show logs from the specified user unit
  -t --identifier=STRING     Show entries with the specified syslog identifier
  -p --priority=RANGE        Show entries with the specified priority
     --facility=FACILITY...  Show entries with the specified facilities
  -g --grep=PATTERN          Show entries with MESSAGE matching PATTERN
     --case-sensitive[=BOOL] Force case sensitive or insenstive matching
  -e --pager-end             Immediately jump to the end in the pager
  -f --follow                Follow the journal
  -n --lines[=INTEGER]       Number of journal entries to show
     --no-tail               Show all lines, even in follow mode
  -r --reverse               Show the newest entries first
  -o --output=STRING         Change journal output mode (short, short-precise,
                               short-iso, short-iso-precise, short-full,
                               short-monotonic, short-unix, verbose, export,
                               json, json-pretty, json-sse, json-seq, cat,
                               with-unit)
     --output-fields=LIST    Select fields to print in verbose/export/json modes
     --utc                   Express time in Coordinated Universal Time (UTC)
  -x --catalog               Add message explanations where available
     --no-full               Ellipsize fields
  -a --all                   Show all fields, including long and unprintable
  -q --quiet                 Do not show info messages and privilege warning
     --no-pager              Do not pipe output into a pager
     --no-hostname           Suppress output of hostname field
  -m --merge                 Show entries from all available journals
  -D --directory=PATH        Show journal files from directory
     --file=PATH             Show journal file
     --root=ROOT             Operate on files below a root directory
     --namespace=NAMESPACE   Show journal data from specified namespace
     --interval=TIME         Time interval for changing the FSS sealing key
     --verify-key=KEY        Specify FSS verification key
     --force                 Override of the FSS key pair with --setup-keys

Commands:
  -h --help                  Show this help text
     --version               Show package version
  -N --fields                List all field names currently used
  -F --field=FIELD           List all values that a specified field takes
     --disk-usage            Show total disk usage of all journal files
     --vacuum-size=BYTES     Reduce disk usage below specified size
     --vacuum-files=INT      Leave only the specified number of journal files
     --vacuum-time=TIME      Remove journal files older than specified time
     --verify                Verify journal file consistency
     --sync                  Synchronize unwritten journal messages to disk
     --relinquish-var        Stop logging to disk, log to temporary file system
     --smart-relinquish-var  Similar, but NOP if log directory is on root mount
     --flush                 Flush all journal data from /run into /var
     --rotate                Request immediate rotation of the journal files
     --header                Show journal header information
     --list-catalog          Show all message IDs in the catalog
     --dump-catalog          Show entries in the message catalog
     --update-catalog        Update the message catalog database
     --setup-keys            Generate a new FSS key pair

See the journalctl(1) man page for details.
```

## Examples

### Show journal of today

```plain
$ journalctl -S today
-- Logs begin at Sat 2020-05-02 11:56:25 CEST, end at Mon 2020-09-28 20:42:51 CEST. --
Sep 28 09:36:55 laptop kernel: Filesystems sync: 0.006 seconds
Sep 28 09:36:55 laptop kernel: Freezing user space processes ... (elapsed 0.003 seconds) done.
Sep 28 09:36:55 laptop kernel: OOM killer disabled.
Sep 28 09:36:55 laptop kernel: Freezing remaining freezable tasks ... (elapsed 0.001 seconds) done.
Sep 28 09:36:55 laptop kernel: printk: Suspending console(s) (use no_console_suspend to debug)
Sep 28 09:36:55 laptop kernel: wlp4s0: deauthenticating from AA:BB:CC:74:bb:b8 by local choice (Reason: 3=DEAUTH_LEAVING)
Sep 28 09:36:55 laptop kernel: e1000e: EEE TX LPI TIMER: 00000011
Sep 28 09:36:55 laptop kernel: ACPI: EC: interrupt blocked
Sep 28 09:36:55 laptop kernel: ACPI: Preparing to enter system sleep state S3
Sep 28 09:36:55 laptop kernel: ACPI: EC: event blocked
```

## URL List

- [HowToGeek.com](https://www.howtogeek.com/499623/how-to-use-journalctl-to-read-linux-system-logs/)
