---
title : "Visual Studio Code"
# pre : ' '
description : "Code editing. Redefined."
date : 2020-03-11T15:39:24+01:00
# hidden : true
# draft : true
weight : 2030
tags : ['Other', 'Coding']
---

---

Code editing. Redefined.

## Installation

### Snapcraft

```plain
sudo snap install code --classic
```

### Other platforms

Download newest release: <https://code.visualstudio.com/>

## Usage

```plain
code [options][paths...]
```

## Flags

```plain
Visual Studio Code 1.43.0

Usage: code [options][paths...]

To read from stdin, append '-' (e.g. 'ps aux | grep code | code -')

Options
  -d --diff <file> <file>           Compare two files with each other.
  -a --add <folder>                 Add folder(s) to the last active window.
  -g --goto <file:line[:character]> Open a file at the path on the specified
                                    line and character position.
  -n --new-window                   Force to open a new window.
  -r --reuse-window                 Force to open a file or folder in an
                                    already opened window.
  -w --wait                         Wait for the files to be closed before
                                    returning.
  --locale <locale>                 The locale to use (e.g. en-US or zh-TW).
  --user-data-dir <dir>             Specifies the directory that user data is
                                    kept in. Can be used to open multiple
                                    distinct instances of Code.
  -v --version                      Print version.
  -h --help                         Print usage.
  --telemetry                       Shows all telemetry events which VS code
                                    collects.
  --folder-uri <uri>                Opens a window with given folder uri(s)
  --file-uri <uri>                  Opens a window with given file uri(s)

Extensions Management
  --extensions-dir <dir>                            Set the root path for
                                                    extensions.
  --list-extensions                                 List the installed
                                                    extensions.
  --show-versions                                   Show versions of installed
                                                    extensions, when using
                                                    --list-extension.
  --category                                        Filters installed
                                                    extensions by provided
                                                    category, when using
                                                    --list-extension.
  --install-extension <extension-id | path-to-vsix> Installs or updates the
                                                    extension. Use `--force`
                                                    argument to avoid
                                                    prompts.
  --uninstall-extension <extension-id>              Uninstalls an extension.
  --enable-proposed-api <extension-id>              Enables proposed API
                                                    features for extensions.
                                                    Can receive one or more
                                                    extension IDs to enable
                                                    individually.

Troubleshooting
  --verbose                          Print verbose output (implies --wait).
  --log <level>                      Log level to use. Default is 'info'.
                                     Allowed values are 'critical', 'error',
                                     'warn', 'info', 'debug', 'trace', 'off'.
  -s --status                        Print process usage and diagnostics
                                     information.
  --prof-startup                     Run CPU profiler during startup
  --disable-extensions               Disable all installed extensions.
  --disable-extension <extension-id> Disable an extension.
  --inspect-extensions <port>        Allow debugging and profiling of
                                     extensions. Check the developer tools for
                                     the connection URI.
  --inspect-brk-extensions <port>    Allow debugging and profiling of
                                     extensions with the extension host being
                                     paused after start. Check the developer
                                     tools for the connection URI.
  --disable-gpu                      Disable GPU hardware acceleration.
  --max-memory                       Max memory size for a window (in Mbytes).
```

## Examples

### Start VSCode from current directory

```plain
code .
```

### Plugins

```plain
Andromeda (theme, https://marketplace.visualstudio.com/items?itemName=EliverLara.andromeda)
ANSI Colors
auto rename tag
autoclosetag
Batch Rename
better comments
better toml
code spell checker
color highlight
docker
Draw.io Integration
EditorConfig for VS Code
Electron Color Theme
GitLens
Hugo Helper
Hugo Language and Syntax Support
Hugo Shortcode Syntax Highlighting
Live Server
markdown All in One
markdown paste
markdown pdf
markdown preview enhanced
markdownlint
material icon theme
path intellisense
Prettier - Code formatter
python
Remote Development
Settings Sync
VS Color Picker
XML
YAML
```

## URL List

- [Code.visualstudio.com](https://code.visualstudio.com/)
- [Snapcraft.io - Code](https://snapcraft.io/code)
