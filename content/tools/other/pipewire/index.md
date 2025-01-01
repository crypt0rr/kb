---
title : "PipeWire"
# pre : ' '
description : "PipeWire is a project that aims to greatly improve handling of audio and video under Linux."
date : 2021-07-12T10:08:37+02:00
# hidden : true
# draft : true
weight : 1320
# tags : ['']
---

---

Is a project that aims to greatly improve handling of audio and video under Linux.

It provides a low-latency, graph based processing engine on top of audio and video devices that can be used to support the use cases currently handled by both pulseaudio and JACK. PipeWire was designed with a powerful security model that makes interacting with audio and video devices from containerized applications easy, with supporting Flatpak applications being the primary goal. Alongside Wayland and Flatpak we expect PipeWire to provide a core building block for the future of Linux application development.

Features include:

- Capture and playback of audio and video with minimal latency.
- Real-time Multimedia processing on audio and video.
- Multiprocess architecture to let applications share multimedia content.
- Seamless support for PulseAudio, JACK, ALSA and GStreamer applications.
- Sandboxed applications support. See Flatpak for more info.

Optionally install [Sound Input & Output Device Chooser](https://extensions.gnome.org/extension/906/sound-output-device-chooser/) to easily chose input/output devices.

## Installation on Pop!_OS 21.04

```plain
# Add ppa for latest build
sudo add-apt-repository ppa:pipewire-debian/pipewire-upstream

# Install components
sudo apt install gstreamer1.0-pipewire pipewire-media-session libspa-0.2-bluetooth libspa-0.2-jack pipewire pipewire-audio-client-libraries

# If you get unmet dependencies, you can run:
sudo apt --fix-broken install

# Reload new services
systemctl --user daemon-reload

# Disable PulseAudio service
systemctl --user --now disable pulseaudio.service pulseaudio.socket

# If you update from previous version of PopOS
systemctl --user mask pulseaudio

# Enable Pipewire services
systemctl --user --now enable pipewire pipewire-pulse

# Enable Pipewire media session
systemctl --user --now enable pipewire-media-session.service
```

## URL List

- [Pipewire.org](https://pipewire.org/)
- [Reddit.com - Replaced pulseaudio with pipewire on Pop!_OS 21.04](https://www.reddit.com/r/pop_os/comments/ofdalv/replaced_pulseaudio_with_pipewire_on_popos_2104_i/)
- [Gitlab.freedesktop.org - PipeWire](https://gitlab.freedesktop.org/pipewire/pipewire)
