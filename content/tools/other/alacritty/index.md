---
title : "Alacritty"
# pre : ' '
description : "Is the fastest terminal emulator in existence. Using the GPU for rendering enables optimizations that simply aren't possible without it."
date : 2020-03-17T09:09:27+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

Is the fastest terminal emulator in existence. Using the GPU for rendering enables optimizations that simply aren't possible without it.

## Installation

```plain
sudo apt install alacritty
```

## Usage

```plain
alacrity
```

## Flags

```plain
alacritty 0.4.1
Joe Wilm <joe@jwilm.com>
GPU-accelerated terminal emulator

USAGE:
    alacritty [FLAGS] [OPTIONS]

FLAGS:
    -h, --help                     Prints help information
        --hold                     Remain open after child process exits
        --live-config-reload       Enable automatic config reloading
        --no-live-config-reload    Disable automatic config reloading
        --persistent-logging       Keep the log file after quitting Alacritty
        --print-events             Print all events to stdout
    -q                             Reduces the level of verbosity (the min level is -qq)
        --ref-test                 Generates ref test
    -v                             Increases the level of verbosity (the max level is -vvv)
    -V, --version                  Prints version information

OPTIONS:
        --class <class>                            Defines window class on Linux [default: Alacritty]
    -e, --command <command>...                     Command and args to execute (must be last argument)
        --config-file <config-file>
            Specify alternative configuration file [default: $XDG_CONFIG_HOME/alacritty/alacritty.yml]

    -d, --dimensions <columns> <lines>
            Defines the window dimensions. Falls back to size specified by window manager if set to 0x0 [default: 0x0]

        --embed <embed>
            Defines the X11 window ID (as a decimal integer) to embed Alacritty within

        --position <x-pos> <y-pos>
            Defines the window position. Falls back to position specified by window manager if unset [default: unset]

    -t, --title <title>                            Defines the window title [default: Alacritty]
        --working-directory <working-directory>    Start the shell in the specified working directory
```

## URL List

- [GitHub.com - alacritty](https://github.com/alacritty/alacritty)
