---
title : "Brew"
# pre : ' '
description : "The Missing Package Manager for macOS (or Linux)."
date : 2021-12-10T17:39:51+01:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

Homebrew is the easiest and most flexible way to install the UNIX tools Apple didn’t include with macOS. It can also install software not packaged for your Linux distribution to your home directory without requiring sudo.

## Installation

```plain
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Usage

```plain
brew search TEXT|/REGEX/
brew info [FORMULA|CASK...]
brew install FORMULA|CASK...
brew update
brew upgrade [FORMULA|CASK...]
brew uninstall FORMULA|CASK...
brew list [FORMULA|CASK...]
```

## Flags

```plain
Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA|CASK

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```

## Examples

### Install formula

```plain
brew install [FORMULA]
```

### Uninstall formula

```plain
brew uninstall [FORMULA]
```

### Fetch latest version of homebrew and formula

```plain
brew update
```

### Upgrade all outdated and unpinned brews

```plain
brew upgrade
```

### List installed formulas

```plain
brew list
```

### Search formulas

```plain
brew search [text|/text/]
```

### Change analytic settings

```plain
crypt0rr@mba ~ % brew analytics
Analytics are enabled.
UUID: [REDACTED]
```

Disable analytics

```plain
brew analytics off     
```

```plain
crypt0rr@mba ~ % brew analytics
Analytics are disabled.
```

## URL List

- [Brew.sh](https://brew.sh)
- [Brew.sh - All Formula](https://formulae.brew.sh/formula/)
- [Docs.brew.sh - Homebrew Documentation](https://docs.brew.sh/Manpage)
