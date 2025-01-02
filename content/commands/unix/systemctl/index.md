---
title : "systemctl"
# pre : '<i class="fas fa-code"></i> '
description : "Control the systemd system and service manager."
date : 2020-03-11T16:44:03+01:00
# hidden : true
# draft : true
weight : 870
# tags : [""]
---

---

## Usage

```plain
systemctl [OPTIONS...] {COMMAND} ...
```

## Flags

```plain
systemctl [OPTIONS...] {COMMAND} ...

Query or send control commands to the systemd manager.

  -h --help           Show this help
     --version        Show package version
     --system         Connect to system manager
     --user           Connect to user service manager
  -H --host=[USER@]HOST
                      Operate on remote host
  -M --machine=CONTAINER
                      Operate on local container
  -t --type=TYPE      List units of a particular type
     --state=STATE    List units with particular LOAD or SUB or ACTIVE state
     --failed         Shorcut for --state=failed
  -p --property=NAME  Show only properties by this name
  -a --all            Show all properties/all units currently in memory,
                      including dead/empty ones. To list all units installed on
                      the system, use the 'list-unit-files' command instead.
  -l --full           Don't ellipsize unit names on output
  -r --recursive      Show unit list of host and local containers
     --reverse        Show reverse dependencies with 'list-dependencies'
     --job-mode=MODE  Specify how to deal with already queued jobs, when

Query or send control commands to the systemd manager.

  -h --help           Show this help
     --version        Show package version
     --system         Connect to system manager
     --user           Connect to user service manager
  -H --host=[USER@]HOST
                      Operate on remote host
  -M --machine=CONTAINER
                      Operate on local container
  -t --type=TYPE      List units of a particular type
     --state=STATE    List units with particular LOAD or SUB or ACTIVE state
     --failed         Shorcut for --state=failed
  -p --property=NAME  Show only properties by this name
  -a --all            Show all properties/all units currently in memory,
                      including dead/empty ones. To list all units installed on
                      the system, use the 'list-unit-files' command instead.
  -l --full           Don't ellipsize unit names on output
  -r --recursive      Show unit list of host and local containers
     --reverse        Show reverse dependencies with 'list-dependencies'
     --job-mode=MODE  Specify how to deal with already queued jobs, when
                      queueing a new job
  -T --show-transaction
                      When enqueuing a unit job, show full transaction
     --show-types     When showing sockets, explicitly show their type
     --value          When showing properties, only print the value
  -i --ignore-inhibitors
                      When shutting down or sleeping, ignore inhibitors
     --kill-who=WHO   Who to send signal to
  -s --signal=SIGNAL  Which signal to send
     --now            Start or stop unit in addition to enabling or disabling it
     --dry-run        Only print what would be done
  -q --quiet          Suppress output
     --wait           For (re)start, wait until service stopped again
                      For is-system-running, wait until startup is completed
     --no-block       Do not wait until operation finished
     --no-wall        Don't send wall message before halt/power-off/reboot
     --no-reload      Don't reload daemon after en-/dis-abling unit files
     --no-legend      Do not print a legend (column headers and hints)
     --no-pager       Do not pipe output into a pager
     --no-ask-password
                      Do not ask for system passwords
     --global         Enable/disable/mask unit files globally
     --runtime        Enable/disable/mask unit files temporarily until next
                      reboot
  -f --force          When enabling unit files, override existing symlinks
                      When shutting down, execute action immediately
     --preset-mode=   Apply only enable, only disable, or all presets
     --root=PATH      Enable/disable/mask unit files in the specified root
                      directory
  -n --lines=INTEGER  Number of journal entries to show
  -o --output=STRING  Change journal output mode (short, short-precise,
                             short-iso, short-iso-precise, short-full,
                             short-monotonic, short-unix,
                             verbose, export, json, json-pretty, json-sse, cat)
     --firmware-setup Tell the firmware to show the setup menu on next boot
     --boot-loader-menu=TIME
                      Boot into boot loader menu on next boot
     --boot-loader-entry=NAME
                      Boot into a specific boot loader entry on next boot
     --plain          Print unit dependencies as a list instead of a tree

Unit Commands:
  list-units [PATTERN...]             List units currently in memory
  list-sockets [PATTERN...]           List socket units currently in memory,
                                      ordered by address
  list-timers [PATTERN...]            List timer units currently in memory,
                                      ordered by next elapse
  start UNIT...                       Start (activate) one or more units
  stop UNIT...                        Stop (deactivate) one or more units
  reload UNIT...                      Reload one or more units
  restart UNIT...                     Start or restart one or more units
  try-restart UNIT...                 Restart one or more units if active
  reload-or-restart UNIT...           Reload one or more units if possible,
                                      otherwise start or restart
  try-reload-or-restart UNIT...       If active, reload one or more units,
                                      if supported, otherwise restart
  isolate UNIT                        Start one unit and stop all others
  kill UNIT...                        Send signal to processes of a unit
  is-active PATTERN...                Check whether units are active
  is-failed PATTERN...                Check whether units are failed
  status [PATTERN...|PID...]          Show runtime status of one or more units
  show [PATTERN...|JOB...]            Show properties of one or more
                                      units/jobs or the manager
  cat PATTERN...                      Show files and drop-ins of specified units
  set-property UNIT PROPERTY=VALUE... Sets one or more properties of a unit
  help PATTERN...|PID...              Show manual for one or more units
  reset-failed [PATTERN...]           Reset failed state for all, one, or more
                                      units
  list-dependencies [UNIT]            Recursively show units which are required
                                      or wanted by this unit or by which this
                                      unit is required or wanted

Unit File Commands:
  list-unit-files [PATTERN...]        List installed unit files
  enable [UNIT...|PATH...]            Enable one or more unit files
  disable UNIT...                     Disable one or more unit files
  reenable UNIT...                    Reenable one or more unit files
  preset UNIT...                      Enable/disable one or more unit files
                                      based on preset configuration
  preset-all                          Enable/disable all unit files based on
                                      preset configuration
  is-enabled UNIT...                  Check whether unit files are enabled
  mask UNIT...                        Mask one or more units
  unmask UNIT...                      Unmask one or more units
  link PATH...                        Link one or more units files into
                                      the search path
  revert UNIT...                      Revert one or more unit files to vendor
                                      version
  add-wants TARGET UNIT...            Add 'Wants' dependency for the target
                                      on specified one or more units
  add-requires TARGET UNIT...         Add 'Requires' dependency for the target
                                      on specified one or more units
  edit UNIT...                        Edit one or more unit files
  get-default                         Get the name of the default target
  set-default TARGET                  Set the default target

Machine Commands:
  list-machines [PATTERN...]          List local containers and host

Job Commands:
  list-jobs [PATTERN...]              List jobs
  cancel [JOB...]                     Cancel all, one, or more jobs

Environment Commands:
  show-environment                    Dump environment
  set-environment VARIABLE=VALUE...   Set one or more environment variables
  unset-environment VARIABLE...       Unset one or more environment variables
  import-environment [VARIABLE...]    Import all or some environment variables

Manager Lifecycle Commands:
  daemon-reload                       Reload systemd manager configuration
  daemon-reexec                       Reexecute systemd manager

System Commands:
  is-system-running                   Check whether system is fully running
  default                             Enter system default mode
  rescue                              Enter system rescue mode
  emergency                           Enter system emergency mode
  halt                                Shut down and halt the system
  poweroff                            Shut down and power-off the system
  reboot [ARG]                        Shut down and reboot the system
  kexec                               Shut down and reboot the system with kexec
  exit [EXIT_CODE]                    Request user instance or container exit
  switch-root ROOT [INIT]             Change to a different root file system
  suspend                             Suspend the system
  hibernate                           Hibernate the system
  hybrid-sleep                        Hibernate and suspend the system
  suspend-then-hibernate              Suspend the system, wake after a period of
                                      time and put it into hibernate

See the systemctl(1) man page for details.
```

## Examples

### Show available services

```plain
sudo systemctl
```

### Show service status

```plain
sudo systemctl status <service>
```

### Start service

```plain
sudo systemctl start <service>
```

### Stop service

```plain
sudo systemctl stop <service>
```

### Enable on startup (under root)

```plain
sudo systemctl enable <service>
```

### Enable on startup (under current user)

```plain
systemctl enable --user <service>
```

### Show status of all services

```plain
sudo systemctl list-units --type service --all
```

### Show all available services

```plain
sudo systemctl list-unit-files
```

### Show all dependencies a service relies on

```plain
sudo systemctl list-dependencies <service>
```

### Show default run level

```plain
sudo systemctl get-default
```

### Change the current run level (temporarily)

```plain
sudo systemctl isolate <target>
```

### Change the current run level (permanently)

```plain
sudo systemctl set-default <target>
```

### Create startup task / service

```plain
sudo nano /etc/systemd/system/YOUR_SERVICE_NAME.service
```

```plain
Description=GIVE_YOUR_SERVICE_A_DESCRIPTION

Wants=network.target
After=syslog.target network-online.target

[Service]
Type=simple
ExecStart=YOUR_COMMAND_HERE
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
```

```plain
sudo systemctl daemon-reload
```

```plain
sudo systemctl enable YOUR_SERVICE_NAME

```

```plain
sudo systemctl start YOUR_SERVICE_NAME
```

## URL List

- [Debian.org](https://manpages.debian.org/stretch/systemd/systemctl.1.en.html)
