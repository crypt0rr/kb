---
title : "Shairport-Sync"
# pre : ' '
description : "Synchronised Audio Player for iTunes / AirPlay."
date : 2020-08-24T14:01:44+02:00
# hidden : true
# draft : true
weight : 1570
# tags : ['']
---

---

Synchronised Audio Player for iTunes / AirPlay.

## Installation

```plain
sudo apt install shairport-sync
```

## Usage

```plain
shairport-sync [options...]
or:  shairport-sync [options...] -- [audio output-specific options]
```

## Flags

```plain
Options:
    -h, --help              show this help.
    -d, --daemon            daemonise.
    -j, --justDaemoniseNoPIDFile            daemonise without a PID file.
    -k, --kill              kill the existing shairport daemon.
    -V, --version           show version information.
    -c, --configfile=FILE   read configuration settings from FILE. Default is /etc/shairport-sync.conf.

The following general options are for backward compatibility. These and all new options have settings in the configuration file, by default /etc/shairport-sync.conf:
    -v, --verbose           -v print debug information; -vv more; -vvv lots.
    -p, --port=PORT         set RTSP listening port.
    -a, --name=NAME         set advertised name.
    -L, --latency=FRAMES    [Deprecated] Set the latency for audio sent from an unknown device.
                            The default is to set it automatically.
    -S, --stuffing=MODE set how to adjust current latency to match desired latency, where
                            "basic" inserts or deletes audio frames from packet frames with low processor overhead, and
                            "soxr" uses libsoxr to minimally resample packet frames -- moderate processor overhead.
                            "soxr" option only available if built with soxr support.
    -B, --on-start=PROGRAM  run PROGRAM when playback is about to begin.
    -E, --on-stop=PROGRAM   run PROGRAM when playback has ended.
                            For -B and -E options, specify the full path to the program, e.g. /usr/bin/logger.
                            Executable scripts work, but must have the appropriate shebang (#!/bin/sh) in the headline.
    -w, --wait-cmd          wait until the -B or -E programs finish before continuing.
    -o, --output=BACKEND    select audio output method.
    -m, --mdns=BACKEND      force the use of BACKEND to advertize the service.
                            if no mdns provider is specified,
                            shairport tries them all until one works.
    -r, --resync=THRESHOLD  [Deprecated] resync if error exceeds this number of frames. Set to 0 to stop resyncing.
    -t, --timeout=SECONDS   go back to idle mode from play mode after a break in communications of this many seconds (default 120). Set to 0 never to exit play mode.
    --statistics            print some interesting statistics -- output to the logfile if running as a daemon.
    --tolerance=TOLERANCE   [Deprecated] allow a synchronization error of TOLERANCE frames (default 88) before trying to correct it.
    --password=PASSWORD     require PASSWORD to connect. Default is not to require a password.
    --logOutputLevel        log the output level setting -- useful for setting maximum volume.
    -M, --metadata-enable   ask for metadata from the source and process it.
    --metadata-pipename=PIPE send metadata to PIPE, e.g. --metadata-pipename=/tmp/shairport-sync-metadata.
                            The default is /tmp/shairport-sync-metadata.
    --get-coverart          send cover art through the metadata pipe.
    -u, --use-stderr        log messages through STDERR rather than syslog.

Available mDNS backends:
    avahi

Available audio backends:
    alsa (default)
    pa
    jack
    pipe
    stdout
    dummy

Settings and options for the audio backend "alsa":
    -d output-device    set the output device, default is "default".
    -c mixer-control    set the mixer control name, default is to use no mixer.
    -m mixer-device     set the mixer device, default is the output device.
    -i mixer-index      set the mixer index, default is 0.
    hardware output devices:
      "hw:PCH"

There are no settings or options for the audio backend "pa".

There are no settings or options for the audio backend "jack".

Settings and options for the audio backend "pipe":
    specify the pathname of the pipe to write to.

There are no settings or options for the audio backend "stdout".

There are no settings or options for the audio backend "dummy".
```

## Examples

Shairport will directly be available when installed from an Apple device streaming via AirPlay.

## URL List

- [GitHub.com - Shairport-sync](https://github.com/mikebrady/shairport-sync)
