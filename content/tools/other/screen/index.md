---
title : "Screen"
# pre : ' '
description : "Lets you background programs and run them when closing terminal."
date : 2020-03-11T15:15:50+01:00
# hidden : true
# draft : true
weight : 0
# tags : [""]
---

## Screen

Lets you background programs and run them when closing terminal.

## Installation

```plain
sudo apt install screen
```

## Usage

```plain
screen [-opts] [cmd [args]]
```

## Flags

```plain
Use: screen [-opts] [cmd [args]]
 or: screen -r [host.tty]

Options:
-4            Resolve hostnames only to IPv4 addresses.
-6            Resolve hostnames only to IPv6 addresses.
-a            Force all capabilities into each window's termcap.
-A -[r|R]     Adapt all windows to the new display width & height.
-c file       Read configuration file instead of '.screenrc'.
-d (-r)       Detach the elsewhere running screen (and reattach here).
-dmS name     Start as daemon: Screen session in detached mode.
-D (-r)       Detach and logout remote (and reattach here).
-D -RR        Do whatever is needed to get a screen session.
-e xy         Change command characters.
-f            Flow control on, -fn = off, -fa = auto.
-h lines      Set the size of the scrollback history buffer.
-i            Interrupt output sooner when flow control is on.
-l            Login mode on (update /var/run/utmp), -ln = off.
-ls [match]   or
-list         Do nothing, just list our SockDir [on possible matches].
-L            Turn on output logging.
-Logfile file Set logfile name.
-m            ignore $STY variable, do create a new screen session.
-O            Choose optimal output rather than exact vt100 emulation.
-p window     Preselect the named window if it exists.
-q            Quiet startup. Exits with non-zero return code if unsuccessful.
-Q            Commands will send the response to the stdout of the querying process.
-r [session]  Reattach to a detached screen process.
-R            Reattach if possible, otherwise start a new session.
-s shell      Shell to execute rather than $SHELL.
-S sockname   Name this session <pid>.sockname instead of <pid>.<tty>.<host>.
-t title      Set title. (window's name).
-T term       Use term as $TERM for windows, rather than "screen".
-U            Tell screen to use UTF-8 encoding.
-v            Print "Screen version 4.06.02 (GNU) 23-Oct-17".
-wipe [match] Do nothing, just clean up SockDir [on possible matches].
-x            Attach to a not detached screen. (Multi display mode).
-X            Execute <cmd> as a screen command in the specified session.
```

## Examples

### Start screen session

```plain
screen
```

### Start screen with specified name

```plain
screen -S <name>
```

### Detach connected screen

```plain
ctrl + a; d
```

### List running screen sessions

```plain
screen -ls
```

### Reattach to running screen

```plain
screen -r <pid>
```

### Reattach to running screen by name

```plain
screen -r <name>
```

### Lock screen session

```plain
ctrl + a; x
```

### Kill detached screen

```plain
screen -S <name-or-pid> -X kill
```

### Quit detached screen

```plain
screen -S <name-or-pid> -X quit
```

## URL List

* [Linux.die.net - screen](https://linux.die.net/man/1/screen)
