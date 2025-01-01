---
title : "Tweaks"
# pre : '<i class="fas fa-code"></i> '
description : "Tweaks for the macOS environment that can be helpful for your daily use."
date : 2021-12-10T14:47:12+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

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

### Change where screenshots are saved

```plain
defaults write com.apple.screencapture location ~/your/location/here
```

### Change screenshot default naming scheme

```plain
defaults write com.apple.screencapture name "New Screen Shot Name"
```

### Change format screenshots are saved in (default .PNG)

```plain
defaults write com.apple.screencapture type jpg
```

### Disable screenshot shadows

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

### Disable crash reporter (the dialog which appears after an application crashes and prompts to report the problem to Apple)

```plain
defaults write com.apple.CrashReporter DialogType none
```

### Disable Bonjour multicast advertisements

Reference: <https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/mdns-telling-the-world-about-you-and-your-device/>

```plain
sudo defaults write /Library/Preferences/com.apple.mDNSResponder.plist NoMulticastAdvertisements -bool YES
```

### Captive portal

When macOS connects to new networks, it checks for Internet connectivity and may launch a Captive Portal assistant utility application.

An attacker could trigger the utility and direct a Mac to a site with malware without user interaction, so it's best to disable this feature and log in to captive portals using your regular Web browser by navigating to a non-secure HTTP page and accepting a redirect to the captive portal login interface (after disabling any custom proxy or DNS settings).

```plain
sudo defaults write /Library/Preferences/SystemConfiguration/com.apple.captive.control.plist Active -bool false
```

### New tabs for all links in Safari

```plain
defaults write com.apple.Safari TargetedClicksCreateTabs -bool TRUE
```

### View and hide dock quicker

You can change the times to other settings to speed up or delay.

```plain
defaults write com.apple.dock autohide-delay -float 0.1; defaults write com.apple.dock autohide-time-modifier -int 0.3; killall Dock
```

### Add spacer to Dock

Full height.

```plain
defaults write com.apple.dock persistent-apps -array-add '{tile-data={}; tile-type="spacer-tile";}' && killall Dock
```

Half-height.

```plain
defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="small-spacer-tile";}' && killall Dock
```

### Make hidden apps transparent in dock

```plain
defaults write com.apple.Dock showhidden -bool TRUE && killall Dock
```

### Change TimeMachine Back-up Interval

Interval is in seconds, default is 60 minutes (3600).

```plain
sudo defaults write /System/Library/LaunchDaemons/com.apple.backupd-auto StartInterval -int 3600
```

### Clear DNS Cache

```plain
sudo dscacheutil -flushcache && \
sudo killall -HUP mDNSResponder
```

## URL List

- [Github.com - macOSuckless](https://github.com/MartinHarding/macOSuckless)
- [Github.com - awesome-mac](https://github.com/jaywcjlove/awesome-mac)
- [Github.com - TerminalTweaks](https://github.com/MacTweaks/TerminalTweaks)
- [Github.com - macOS Security and Privacy Guide](https://github.com/drduh/macOS-Security-and-Privacy-Guide#)
