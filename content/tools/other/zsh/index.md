---
title : "zsh - Z Shell"
# pre : ' '
description : "Is a UNIX command interpreter (shell) usable as an interactive login shell and as a shell script command processor."
date : 2020-03-13T15:35:05+01:00
# hidden : true
# draft : true
weight : 2140
# tags : ['']
---

---

Is a UNIX command interpreter (shell) usable as an interactive login shell and as a shell script command processor.

## Installation

```plain
sudo apt install zsh
```

## Usage

```plain
zsh [<options>] [<argument> ...]
```

## Flags

```plain
Usage: zsh [<options>] [<argument> ...]

Special options:
  --help     show this message, then exit
  --version  show zsh version number, then exit
  -b         end option processing, like --
  -c         take first argument as a command to execute
  -o OPTION  set an option by name (see below)

Normal options are named.  An option may be turned on by
`-o OPTION', `--OPTION', `+o no_OPTION' or `+-no-OPTION'.  An
option may be turned off by `-o no_OPTION', `--no-OPTION',
`+o OPTION' or `+-OPTION'.  Options are listed below only in
`--OPTION' or `--no-OPTION' form.
[...]
```

### Oh My ZSH

### Installation Oh My ZSH

```plain
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Plugins

#### Autocompletion

```plain
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

#### sudo - implements double tap esc for sudo

```plain
Add 'sudo' to plugins
```

#### Auto highlighting

```plain
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Theme

{{%resources fa_icon_class="far fa-file-alt" pattern=".*(txt)"/%}}

## URL List

- [Linux.die.net - zsh](https://linux.die.net/man/1/zsh)
- [Oh My ZHS!](https://ohmyz.sh/)
