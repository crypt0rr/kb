---
title : "timedatectl"
# pre : '<i class="fas fa-code"></i> '
description : "Control the system time and date."
date : 2020-04-30T15:09:58+02:00
# hidden : true
# draft : true
weight : 920
# tags : ['']
---

---

## Usage

```plain
timedatectl [OPTIONS...] COMMAND ...
```

## Flags

```plain
Query or change system time and date settings.

  -h --help                Show this help message
     --version             Show package version
     --no-pager            Do not pipe output into a pager
     --no-ask-password     Do not prompt for password
  -H --host=[USER@]HOST    Operate on remote host
  -M --machine=CONTAINER   Operate on local container
     --adjust-system-clock Adjust system clock when changing local RTC mode
     --monitor             Monitor status of systemd-timesyncd
  -p --property=NAME       Show only properties by this name
  -a --all                 Show all properties, including empty ones
     --value               When showing properties, only print the value

Commands:
  status                   Show current time settings
  show                     Show properties of systemd-timedated
  set-time TIME            Set system time
  set-timezone ZONE        Set system time zone
  list-timezones           Show known time zones
  set-local-rtc BOOL       Control whether RTC is in local time
  set-ntp BOOL             Enable or disable network time synchronization

systemd-timesyncd Commands:
  timesync-status          Show status of systemd-timesyncd
  show-timesync            Show properties of systemd-timesyncd

See the timedatectl(1) man page for details.
```

## Examples

### Show current time and date configuration

```plain
$ timedatectl

               Local time: do 2020-04-30 15:12:31 CEST
           Universal time: do 2020-04-30 13:12:31 UTC
                 RTC time: do 2020-04-30 15:12:31
                Time zone: Europe/Amsterdam (CEST, +0200)
System clock synchronized: yes
              NTP service: inactive
          RTC in local TZ: yes
```

### List available timezones

```plain
$ timedatectl list-timezones

Africa/Abidjan
Africa/Accra
Africa/Algiers
```

### Set specific timezone

```plain
sudo timedatectl set-timezone Europe/Amsterdam
```

### Enable/disable automatic time synchronization

Disable

```plain
sudo timedatectl set-ntp 0
```

Enable

```plain
sudo timedatectl set-ntp 1
```

### Set specific time and date

```plain
sudo timedatectl set-time '2021-08-31 14:25'
```

### Show Status

```plain
timedatectl timesync-status
```

## URL List

- [Manpages.ubuntu.com](https://manpages.ubuntu.com/manpages/xenial/man1/timedatectl.1.html)
- [Man7.org](http://man7.org/linux/man-pages/man1/timedatectl.1.html)
