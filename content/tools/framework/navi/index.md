---
title : "Navi"
# pre : ' '
description : "An interactive cheatsheet tool for the command-line and application launchers."
date : 2021-02-11T13:56:16+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Navi

An interactive cheatsheet tool for the command-line and application launchers.

Navi allows you to browse through cheatsheets (that you may write yourself or download from maintainers) and execute commands. Suggested values for arguments are dynamically displayed in a list.

### Installation

*Recommended* way of installation

```plain
brew install navi
```

Or download newest pre-compiled binary from [Github.com](https://github.com/denisidoro/navi/releases/latest)

### Usage

```plain
navi [FLAGS] [OPTIONS] [SUBCOMMAND]
```

### Flags

```plain
FLAGS:
        --best-match    Returns the best match
    -h, --help          Prints help information
        --no-preview    Hides preview window
        --print         Instead of executing a snippet, prints it to stdout
    -V, --version       Prints version information

OPTIONS:
        --cheatsh <cheatsh>
            Search for cheatsheets using the cheat.sh repository

        --finder <finder>
            which finder application to use [env: NAVI_FINDER=] [default: fzf] [possible values:
            fzf, skim]

        --fzf-overrides <fzf-overrides>
            finder overrides for cheat selection [env: NAVI_FZF_OVERRIDES=]

        --fzf-overrides-var <fzf-overrides-var>
            finder overrides for variable selection [env: NAVI_FZF_OVERRIDES_VAR=]

    -p, --path <path>
            List of :-separated paths containing .cheat files [env: NAVI_PATH=]

    -q, --query <query>                            Query
    -s, --save <save>
            [Experimental] Instead of executing a snippet, saves it to a file

        --tldr <tldr>
            Search for cheatsheets using the tldr-pages repository


SUBCOMMANDS:
    fn        Performs ad-hoc functions provided by navi
    help      Prints this message or the help of the given subcommand(s)
    info      Shows info
    repo      Manages cheatsheet repositories
    widget    Outputs shell widget source code

MORE INFO:
    Please refer to https://github.com/denisidoro/navi

EXAMPLES:
    navi                                             # default behavior
    navi --print                                     # doesn't execute the snippet
    navi --tldr docker                               # search for docker cheatsheets using tldr
    navi --cheatsh docker                            # search for docker cheatsheets using cheatsh
    navi --path '/some/dir:/other/dir'               # use .cheat files from custom paths
    navi --query git                                 # filter results by "git"
    navi --query 'create db' --best-match            # autoselect the snippet that best matches a
query
    name=mydb navi --query 'create db' --best-match  # same, but set the value for the <name>
variable
    navi repo add denisidoro/cheats                  # import cheats from a git repository
    eval "$(navi widget zsh)"                        # load the zsh widget
    navi --finder 'skim'                             # set skim as finder, instead of fzf
    navi --fzf-overrides '--with-nth 1,2'            # show only the comment and tag columns
    navi --fzf-overrides '--no-select-1'             # prevent autoselection in case of single line
    navi --fzf-overrides-var '--no-select-1'         # same, but for variable selection
    navi --fzf-overrides '--nth 1,2'                 # only consider the first two columns for
search
    navi --fzf-overrides '--no-exact'                # use looser search algorithm
```

### Examples

![Example](images/navi.gif)

### URL list

* [Github.com - navi](https://github.com/denisidoro/navi)
