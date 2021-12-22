---
title : "Tweaks"
# pre : '<i class="fas fa-code"></i> '
description : "Tweaks for the macOS environment that can be helpful for your daily use."
date : 2021-12-10T14:47:12+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Tweaks

### View Hidden Files & Folders

```plain
defaults write com.apple.finder AppleShowAllFiles -bool TRUE
```

Restart Finder.

```plain
killall Finder
```

### Make your Mac sound like an iPhone when plugged into juice

```plain
defaults write com.apple.PowerChime ChimeOnAllHardware -bool true; open /System/Library/CoreServices/PowerChime.app
```

### Check for updates more often

To tell it to check every day, just type:

```plain
defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 1
```

### Screenshots

All tweaks regarding screenshots require restarting 'SystemUIServer'. To do so use `killall SystemUIServer`.

#### Change where screenshots are saved

```plain
defaults write com.apple.screencapture location ~/your/location/here
```

#### Change screenshot default naming scheme

```plain
defaults write com.apple.screencapture name "New Screen Shot Name"
```

#### Change format screenshots are saved in (default .PNG)

```plain
defaults write com.apple.screencapture type jpg
```

#### Disable screenshot shadows

```plain
defaults write com.apple.screencapture disable-shadow -bool TRUE
```

### Let you Mac talk to you

```plain
say "Please do not try this one."
```

### Prevent Mac from sleeping

After `-t` you enter the number of seconds you want to prevent your Mac from sleeping, dimming display or showing the screensaver.

```plain
caffeinate -t 150000
```

### Rebuild Spotlight

```plain
sudo mdutil -E /Volumes/DriveName
```

### Enable text selection in Quick Look

```plain
defaults write com.apple.finder QLEnableTextSelection -bool TRUE
```

```plain
killall Finder
```

### URL list

* [Github.com - macOSuckless](https://github.com/MartinHarding/macOSuckless)
* [Github.com - awesome-mac](https://github.com/jaywcjlove/awesome-mac)
* [Github.com - TerminalTweaks](https://github.com/MacTweaks/TerminalTweaks)
