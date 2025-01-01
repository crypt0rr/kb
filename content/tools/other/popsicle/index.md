---
title : "Popsicle"
# pre : ' '
description : "Popsicle is a Linux utility for flashing multiple USB devices in parallel, written in Rust."
date : 2021-07-09T13:36:45+02:00
# hidden : true
# draft : true
weight : 1340
# tags : ['']
---

---

Is a Linux utility for flashing multiple USB devices in parallel, written in Rust.

Popsicle can be used both CLI and/or GTK.

## Installation

A makefile is included for simply building and installing all required files into the system. You may either build both the CLI and GTK workspace, just the CLI workspace, or just the GTK workspace.

```plain
git clone https://github.com/pop-os/popsicle.git
```

- `make cli && sudo make install-cli` will build and install just the CLI workspace
- `make gtk && sudo make install-gtk` will build and install just the GTK workspace
- `make && sudo make install` will build and install both the CLI and GTK workspaces

## Usage

```plain
popsicle [FLAGS] <IMAGE> [DISKS]...
```

## Flags

```plain
popsicle_cli 1.3.0
USB Flasher

FLAGS:
    -a, --all        Flash all detected USB drives
    -c, --check      Check if written image matches source image
    -h, --help       Prints help information
    -u, --unmount    Unmount mounted devices
    -V, --version    Prints version information
    -y, --yes        Continue without confirmation

ARGS:
    <IMAGE>       Input image file
    <DISKS>...    Output disk devices
```

## Examples

![Example](images/screenshot-01.png)
![Example](images/screenshot-02.png)
![Example](images/screenshot-03.png)
![Example](images/screenshot-04.png)
![Example](images/screenshot-05.png)

Also supports active device monitoring when a drive is getting plugged-in or unplugged.

![Example](images/device-monitoring.gif)

## URL List

- [Github.com - Popsicle](https://github.com/pop-os/popsicle)
