---
title : "ps"
# pre : '<i class="fas fa-code"></i> '
description : "Displays information about a selection of the active processes."
date : 2022-09-25T17:02:25+02:00
# hidden : true
# draft : true
weight : 730
# tags : ['']
---

---

Displays information about a selection of the active processes.

## Usage

```plain
ps [options]
```

## Flags

Please check [linux.die.net - ps](https://linux.die.net/man/1/ps)

## Examples

### List all processes running in full format

The `-ef` options we used above stand for:

- e: select all processes
- f: display full format listing (UID, PID, PPID, etc.)

```plain
$ ps -ef  
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 17:05 ?        00:00:00 /sbin/init splash
root           2       0  0 17:05 ?        00:00:00 [kthreadd]
root           3       2  0 17:05 ?        00:00:00 [rcu_gp]
root           4       2  0 17:05 ?        00:00:00 [rcu_par_gp]
root           5       2  0 17:05 ?        00:00:00 [netns]
root           6       2  0 17:05 ?        00:00:00 [kworker/0:0-rcu_gp]
root           7       2  0 17:05 ?        00:00:00 [kworker/0:0H-events_highpri
root           8       2  0 17:05 ?        00:00:00 [kworker/u4:0-ext4-rsv-conve
root           9       2  0 17:05 ?        00:00:00 [mm_percpu_wq]
root          10       2  0 17:05 ?        00:00:00 [rcu_tasks_rude_kthread]
root          11       2  0 17:05 ?        00:00:00 [rcu_tasks_trace_kthread]
root          12       2  0 17:05 ?        00:00:00 [ksoftirqd/0]
root          13       2  0 17:05 ?        00:00:00 [rcu_sched]
root          14       2  0 17:05 ?        00:00:00 [migration/0]
[...]
```

### Search specific process by  name

`e` is replaced by `C` so the command name can be searched instead of all processes.

- C: select by command name as follows

```plain
$ ps -fC gedit
UID          PID    PPID  C STIME TTY          TIME CMD
crypt0rr    2228     934  2 17:07 ?        00:00:00 /usr/bin/gedit --gapplication-service
```

## URL List

- [Linux.die.net - ps](https://linux.die.net/man/1/ps)
- [Askubuntu.com - What is the difference between standard syntax and BSD syntax?](https://askubuntu.com/questions/484982/what-is-the-difference-between-standard-syntax-and-bsd-syntax)
