---
title : "SoftwareUpdate"
# pre : '<i class="fas fa-code"></i> '
description : "Check for new and updated versions of your software based on information about your computer and current software."
date : 2021-12-10T17:22:38+01:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

Check for new and updated versions of your software based on information about your computer and current software.

## Usage

```plain
sudo softwareupdate <cmd> [<args> ...]
```

## Flags

```plain
** Manage Updates:
        -l | --list             List all appropriate update labels (options:  --no-scan, --product-types)
        -d | --download         Download Only
        -i | --install          Install
                <label> ...     specific updates
                -a | --all              All appropriate updates
                -R | --restart          Automatically restart (or shut down) if required to complete installation.
                -r | --recommended      Only recommended updates
                     --os-only  Only OS updates
                     --safari-only      Only Safari updates
                     --stdinpass        Password to authenticate as an owner. Apple Silicon only.
                     --user     Local username to authenticate as an owner. Apple Silicon only.
        --list-full-installers          List the available macOS Installers
        --fetch-full-installer          Install the latest recommended macOS Installer
                --full-installer-version        The version of macOS to install. Ex: --full-installer-version 10.15
        --install-rosetta       Install Rosetta 2
        --background            Trigger a background scan and update operation

** Other Tools:
        --dump-state            Log the internal state of the SU daemon to /var/log/install.log
        --evaluate-products     Evaluate a list of product keys specified by the --products option 
        --history               Show the install history.  By default, only displays updates installed by softwareupdate.  
        --all                   Include all processes in history (including App installs) 

** Options:
        --no-scan               Do not scan when listing or installing updates (use available updates previously scanned)
        --product-types <type>          Limit a scan to a particular product type only - ignoring all others
                Ex:  --product-types macOS  || --product-types macOS,Safari 
        --products              A comma-separated (no spaces) list of product keys to operate on. 
        --force                 Force an operation to complete.  Use with --background to trigger a background scan regardless of "Automatically check" pref 
        --agree-to-license              Agree to the software license agreement without user interaction.

        --verbose               Enable verbose output
        --help                  Print this help
```

## Examples

### List available software updates

```plain
sudo softwareupdate -l
```

### Install all available software updates

```plain
sudo softwareupdate -ia
```

### Install Rosetta2

```plain
sudo softwareupdate --install-rosetta
```

### Show update history

```plain
% sudo softwareupdate --history
Display Name                                       Version    Date                  
------------                                       -------    ----                  
Command Line Tools for Xcode                       13.0       12/08/2021, 19:13:14  
Command Line Tools beta 4 for Xcode                13.0       12/08/2021, 19:13:14  
Command Line Tools for Xcode                       13.1       12/08/2021, 19:13:14
```

### Download specific version of macOS

```plain
sudo softwareupdate --fetch-full-installer --full-installer-version 10.15.4
```

## URL List

- [ss64.com - softwareupdate](https://ss64.com/osx/softwareupdate.html)
