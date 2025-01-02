---
title : "Tilix"
# pre : ' '
description : "Tiling GTK3 terminal emulator for GNOME."
date : 2020-03-24T08:56:55+01:00
# hidden : true
# draft : true
weight : 1890
# tags : ['']
---

---

Tiling GTK3 terminal emulator for GNOME.

## Installation

```plain
sudo apt install tilix
```

## Flags

```plain
Usage:
  tilix [OPTION…]

Help Options:
  -h, --help                            Show help options
  --help-all                            Show all help options
  --help-gapplication                   Show GApplication options
  --help-gtk                            Show GTK+ Options

Application Options:
  -w, --working-directory=DIRECTORY     Set the working directory of the terminal
  -p, --profile=PROFILE_NAME            Set the starting profile
  -t, --title=TITLE                     Set the title of the new terminal
  -s, --session=SESSION_NAME            Open the specified session
  -a, --action=ACTION_NAME              Send an action to current Tilix instance
  -e, --command=COMMAND                 Execute the parameter as a command
  --maximize                            Maximize the terminal window
  --minimize                            Minimize the terminal window
  --window-style=WINDOW_STYLE           Override the preferred window style to use, one of: normal, disable-csd, disable-csd-hide-toolbar, borderless
  --full-screen                         Full-screen the terminal window
  --focus-window                        Focus the existing window
  --new-process                         Start additional instance as new process (Not Recommended)
  --geometry=GEOMETRY                   Set the window size; for example: 80x24, or 80x24+200+200 (COLSxROWS+X+Y)
  -q, --quake                           Opens a window in quake mode or toggles existing quake mode window visibility
  -v, --version                         Show the Tilix and dependant component versions
  --preferences                         Show the Tilix preferences dialog directly
  -g, --group=GROUP_NAME                Group tilix instances into different processes (Experimental, not recommended)
  --display=DISPLAY                     X display to use
```

## Examples

### Edit default terminal

```plain
sudo update-alternatives --config x-terminal-emulator
```

```plain
There are 4 choices for the alternative x-terminal-emulator (providing /usr/bin/x-terminal-emulator).

  Selection    Path                             Priority   Status
------------------------------------------------------------
* 0            /usr/bin/terminator               50        auto mode
  1            /usr/bin/alacritty                50        manual mode
  2            /usr/bin/gnome-terminal.wrapper   40        manual mode
  3            /usr/bin/terminator               50        manual mode
  4            /usr/bin/tilix.wrapper            30        manual mode

Press <enter> to keep the current choice[*], or type selection number: 4
update-alternatives: using /usr/bin/tilix.wrapper to provide /usr/bin/x-terminal-emulator (x-terminal-emulator) in manual mode
```

## URL List

- [GitHub.com - tilix](https://github.com/gnunn1/tilix/)
- [GitHub.io - tilix-web](https://gnunn1.github.io/tilix-web/)
- [itsfoss.com - Change default terminal Ubuntu](https://itsfoss.com/change-default-terminal-ubuntu/)
- [Darculatheme.com - Tilix](https://draculatheme.com/tilix/)
