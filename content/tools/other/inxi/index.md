---
title : "inxi"
# pre : ' '
description : "Command line system information script for console and IRC."
date : 2021-07-11T15:20:45+02:00
# hidden : true
# draft : true
weight : 910
# tags : ['']
---

---

Command line system information script for console and IRC.

## Installation

```plain
sudo apt install inxi
```

## Usage

```plain
inxi [OPTIONS]
```

## Flags

```plain
inxi supports the following options. For more detailed information, see man inxi. If you start inxi with no arguments, it will 
display a short system summary. 

You can use these options alone or together, to show or add the item(s) you want to see: A, B, C, D, E, G, I, J, L, M, N, P, R, 
S, W, d, f, i, j, l, m, n, o, p, r, s, t, u, w, --slots. If you use them with -v [level], -b or -F, inxi will add the requested 
lines to the output. 

Examples: inxi -v4 -c6 OR inxi -bDc 6 OR inxi -FzjJxy 80
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Output Control Options (see Extra Data Options to extend output):
 -A, --audio          Audio/sound devices(s), driver, sound server.
 -b, --basic          Basic output, short form. Same as inxi -v 2.
 -B, --battery        System battery info, including charge and condition, plus extra info (if battery present).
 -c, --color          Set color scheme (0-42). For piped or redirected output, you must use an explicit color selector. 
                      Example: inxi -c 11 
                      Color selectors let you set the config file value for the selection (NOTE: IRC and global only show safe 
                      color set) 
                         94  Console, out of X
                         95  Terminal, running in X - like xTerm
                         96  Gui IRC, running in X - like Xchat, Quassel, Konversation etc.
                         97  Console IRC running in X - like irssi in xTerm
                         98  Console IRC not in X
                         99  Global - Overrides/removes all settings. Setting specific removes global.
 -C, --cpu            CPU output, including per CPU clock speed and max CPU speed (if available).
 -d, --disk-full, --optical
                      Optical drive data (and floppy disks, if present). Triggers -D.
 -D, --disk           Hard Disk info, including total storage and details for each disk. Disk total used percentage includes 
                      swap partition size(s). 
 -E, --bluetooth      Show bluetooth device data and report, if available. Shows state, address, IDs, version info.
 -f, --flags          All CPU flags. Triggers -C. Not shown with -F to avoid spamming.
 -F, --full           Full output. Includes all Upper Case line letters (except -J, -W) plus --swap, -s and -n. Does not show 
                      extra verbose options such as -d -f -i -J -l -m -o -p -r -t -u -x, unless specified. 
 -G, --graphics       Graphics info (devices(s), drivers, display protocol (if available), display server/Wayland compositor, 
                      resolution, renderer, OpenGL version). 
 -i, --ip             WAN IP address and local interfaces (requires ifconfig or ip network tool). Triggers -n. Not shown with 
                      -F for user security reasons. You shouldn't paste your local/WAN IP. 
 -I, --info           General info, including processes, uptime, memory, IRC client or shell type, inxi version.
 -j, --swap           Swap in use. Includes partitions, zram, file.
 -J, --usb            Show USB data: Hubs and Devices.
 -l, --label          Partition labels. Triggers -P. For full -p output, use -pl.
 -L, --logical        Logical devices, LVM (VG, LV), LUKS, Crypto, bcache, etc. Shows components/devices, sizes, etc.
 -m, --memory         Memory (RAM) data. Requires root. Numbers of devices (slots) supported and individual memory devices 
                      (sticks of memory etc). For devices, shows device locator, size, speed, type (e.g. DDR3). If neither -I 
                      nor -tm are selected, also shows RAM used/total. 
     --memory-modules Memory (RAM) data. Exclude empty module slots.
     --memory-short   Memory (RAM) data. Show only short Memory RAM report, number of arrays, slots, modules, and RAM type.
 -M, --machine        Machine data. Device type (desktop, server, laptop, VM etc.), motherboard, BIOS and, if present, system 
                      builder (e.g. Lenovo). Shows UEFI/BIOS/UEFI [Legacy]. Older systems/kernels without the required /sys 
                      data can use dmidecode instead, run as root. Dmidecode can be forced with --dmidecode 
 -n, --network-advanced
                      Advanced Network device info. Triggers -N. Shows interface, speed, MAC id, state, etc. 
 -N, --network        Network device(s), driver.
 -o, --unmounted      Unmounted partition info (includes UUID and Label if available). Shows file system type if you have lsblk 
                      installed (Linux) or, for BSD/GNU Linux, if 'file' installed and you are root or if you have added to 
                      /etc/sudoers (sudo v. 1.7 or newer). 
                      Example:  <username> ALL = NOPASSWD: /usr/bin/file 
 -p, --partitions-full
                      Full partition information (-P plus all other detected partitions).
 -P, --partitions     Basic partition info. Shows, if detected: / /boot /home /opt /tmp /usr /usr/home /var /var/log /var/tmp. 
                      Swap partitions show if --swap is not used. Use -p to see all mounted partitions. 
 -r, --repos          Distro repository data. Supported repo types: APK, APT, CARDS, EOPKG, PACMAN, PACMAN-G2, PISI, PORTAGE, 
                      PORTS (BSDs), SLACKPKG, TCE, URPMQ, XBPS, YUM/ZYPP. 
 -R, --raid           RAID data. Shows RAID devices, states, levels, array sizes, and components. md-raid: If device is 
                      resyncing, also shows resync progress line. 
 -s, --sensors        Sensors output (if sensors installed/configured): mobo/CPU/GPU temp; detected fan speeds. GPU temp only 
                      for Fglrx/Nvidia drivers. Nvidia shows screen number for > 1 screen. IPMI sensors if present. 
     --slots          PCI slots: type, speed, status. Requires root.
 -S, --system         System info: host name, kernel, desktop environment (if in X/Wayland), distro.
 -t, --processes      Processes. Requires extra options: c (CPU), m (memory), cm (CPU+memory). If followed by numbers 1-x, 
                      shows that number of processes for each type (default: 5; if in IRC, max: 5). 
                      Make sure that there is no space between letters and numbers (e.g. -t cm10).
 -u, --uuid           Partition UUIDs. Triggers -P. For full -p output, use -pu.
 -v, --verbosity      Set inxi verbosity level (0-8). Should not be used with -b or -F. Example: inxi -v 4
                          0  Same as: inxi
                          1  Basic verbose, -S + basic CPU + -G + basic Disk + -I.
                          2  Networking device (-N), Machine (-M), Battery (-B; if present), and, if present, basic RAID 
                             (devices only; notes if inactive). Same as inxi -b 
                          3  Advanced CPU (-C), battery (-B), network (-n); triggers -x. 
                          4  Partition size/used data (-P) for (if present) /, /home, /var/, /boot. Shows full disk data (-D). 
                          5  Audio device (-A), sensors (-s), memory/RAM (-m), bluetooth (if present), partition label (-l), 
                             full swap (-j), UUID (-u), short form of optical drives, RAID data (if present). 
                          6  Full partition (-p), unmounted partition (-o), optical drive (-d), USB (-J), full RAID; triggers 
                             -xx. 
                          7  Network IP data (-i), bluetooth and RAID forced; triggers -xxx.
                          8  Everything available, including logical (-L), repos (-r), processes (-tcm), PCI slots (--slots); 
                             triggers admin (-a). 
 -w, --weather        Local weather data/time. To check an alternate location, see -W. NO AUTOMATED QUERIES ALLOWED!
 -W, --weather-location
                      [location] Supported options for [location]: postal code[,country/country code]; city, state 
                      (USA)/country (country/two character country code); latitude, longitude. Only use if you want the weather 
                      somewhere other than the machine running inxi. Use only ASCII characters, replace spaces in 
                      city/state/country names with '+'. Example: inxi -W [new+york,ny london,gb madrid,es] 
     --weather-source [1-9] Change weather data source. 1-4 generally active, 5-9 check. See man.
     --weather-unit   Set weather units to metric (m), imperial (i), metric/imperial (mi), or imperial/metric (im).
 -y, --width          Output line width max (integer >= 80). Overrides IRC/Terminal settings or actual widths. If no integer 
                      give, defaults to 80. -1 removes line lengths. 1 switches output to 1 key/value pair per line. 
                      Example: inxi -y 130 
 -z, --filter         Adds security filters for IP/MAC addresses, serial numbers, location (-w), user home directory name, host 
                      name. Default on for IRC clients. 
     --filter-label   Filters out partition labels in -j, -o, -p, -P, -Sa.
 -Z, --filter-override
                      Override for output filters. Useful for debugging networking issues in IRC, for example.
     --filter-uuid    Filters out partition UUIDs in -j, -o, -p, -P, -Sa.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Extra Data Options:
 -a, --admin          Adds advanced sys admin data (only works with verbose or line output, not short form); check man page for 
                      explanations!; also sets --extra=3: 
                         -A  If available: list of alternate kernel modules/drivers for device(s).
                         -C  If available: CPU socket type, base/boost speeds (dmidecode+root/sudo required); CPU 
                             vulnerabilities (bugs); family, model-id, stepping - format: hex (decimal) if greater than 9, 
                             otherwise hex; microcode - format: hex. 
                      -d,-D  If available: logical and physical block sizes; drive family; maj:min, USB drive specifics; SMART 
                             report. 
                         -E  If available: in Report:, adds Info: line: acl-mtu, sco-mtu, link-policy, link-mode, 
                             service-classes. 
                         -G  If available: Xorg Display ID, Screens total, default Screen, current Screen; per X Screen: 
                             resolution, dpi, size, diagonal; per Monitor: resolution; hz; dpi; size; diagonal; list of 
                             alternate kernel modules/drivers for device(s). 
                         -I  As well as per package manager counts, also adds total number of lib files found for each package 
                             manager if not -r. 
                   -j,-p,-P  For swap (if available): swappiness and vfs cache pressure, and if values are default or not.
                         -L  LV, Crypto, devices, components: add maj:min; show full device/components report (speed, mapped 
                             names). 
                      -n,-N  If available: list of alternate kernel modules/drivers for device(s).
                         -o  If available: maj:min of device.
                      -p,-P  If available: raw size of partitions, maj:min, percent available for user, block size of file 
                             system (root required). 
                         -r  Packages, see -Ia.
                         -R  mdraid: device maj:min; per component: size, maj:min, state.
                         -S  If available: kernel boot parameters.

 -x, --extra          Adds the following extra data (only works with verbose or line output, not short form):
                         -A  Specific vendor/product information (if relevant); PCI/USB ID of device; Version/port(s)/driver 
                             version (if available). 
                         -B  Vendor/model, status (if available); attached devices (e.g. wireless mouse, keyboard, if present).
                         -C  CPU flags (short list, use -f to see full list); CPU boost (turbo) enabled/disabled, if present; 
                             Bogomips on CPU; CPU microarchitecture + revision (if found, or unless --admin, then shows as 
                             'stepping'). 
                         -d  Extra optical drive features data; adds rev version to optical drive.
                         -D  HDD temp with disk data. Kernels >= 5.6: enable module drivetemp if not enabled. Older systems 
                             require hddtemp, run as as superuser, or as user if you have added hddtemp to /etc/sudoers (sudo 
                             v. 1.7 or newer). Example: <username> ALL = NOPASSWD: /usr/sbin/hddtemp 
                         -E  PCI/USB Bus ID of device, driver version, LMP version.
                         -G  Specific vendor/product information (if relevant); PCI/USB ID of device; Direct rendering status 
                             (in X); Screen number GPU is running on (Nvidia only). 
                         -i  For IPv6, show additional scope addresses: Global, Site, Temporary, Unknown. See --limit for large 
                             counts of IP addresses. 
                         -I  Default system GCC. With -xx, also shows other installed GCC versions. If running in shell, not in 
                             IRC client, shows shell version number, if detected. Init/RC type and runlevel (if available). 
                             Total count of all packages discovered in system and not -r. 
                         -j  Add mapped: name if partition mapped.
                         -J  For Device: driver.
                         -L  For VG > LV, and other Devices, dm:
        -m,--memory-modules  Max memory module size (if available), device type.
                         -N  Specific vendor/product information (if relevant); PCI/USB ID of device; Version/port(s)/driver 
                             version (if available). 
                   -o,-p,-P  Add mapped: name if partition mapped.
                         -r  Packages, see -Ix.
                         -R  md-raid: second RAID Info line with extra data: blocks, chunk size, bitmap (if present). Resync 
                             line, shows blocks synced/total blocks. Hardware RAID driver version, bus ID. 
                         -s  Basic voltages (ipmi, lm-sensors if present): 12v, 5v, 3.3v, vbat.
                         -S  Kernel gcc version; system base of distro (if relevant and detected)
                         -t  Adds memory use output to CPU (-xt c), and CPU use to memory (-xt m).
                      -w,-W  Wind speed and direction, humidity, pressure, and time zone, if available.

-xx, --extra 2        Show extra, extra data (only works with verbose or line output, not short form):
                         -A  Chip vendor:product ID for each audio device.
                         -B  Serial number, voltage now/minimum (if available).
                         -C  L1/L3 cache (if root and dmidecode installed).
                         -D  Disk transfer speed; NVMe lanes; Disk serial number; LVM volume group free space (if available).
                         -E  Chip vendor:product ID, LMP subversion.
                         -G  Chip vendor:product ID for each video device; OpenGL compatibility version, if free drivers and 
                             available; Xorg compositor; alternate Xorg drivers (if available). Alternate means driver is on 
                             automatic driver check list of Xorg for the device vendor, but is not installed on system; Xorg 
                             dpi. 
                         -I  Other detected installed gcc versions (if present). System default runlevel. Adds parent program 
                             (or tty) for shell info if not in IRC. Adds Init version number, RC (if found). Adds per package 
                             manager package counts if not -r. 
                   -j,-p,-P  Swap priority.
                         -J  Vendor:chip ID.
                         -L  Show internal LVM volumes, like raid image/meta volumes; for LVM RAID, adds RAID report line (if 
                             not -R); show all components > devices, number of 'c' or 'p' indicate depth of device. 
        -m,--memory-modules  Manufacturer, part number; single/double bank (if found).
                         -M  Chassis info, BIOS ROM size (dmidecode only), if available.
                         -N  Chip vendor:product ID.
                         -r  Packages, see -Ixx.
                         -R  md-raid: Superblock (if present), algorithm. If resync, shows progress bar. Hardware RAID Chip 
                             vendor:product ID. 
                         -s  DIMM/SOC voltages (ipmi only).
                         -S  Display manager (dm) in desktop output (e.g. kdm, gdm3, lightdm); active window manager if 
                             detected; desktop toolkit, if available (Xfce/KDE/Trinity only). 
                    --slots  Slot length.
                      -w,-W  Snow, rain, precipitation, (last observed hour), cloud cover, wind chill, dew point, heat index, 
                             if available. 

-xxx, --extra 3       Show extra, extra, extra data (only works with verbose or line output, not short form):
                         -A  Serial number, class ID.
                         -B  Chemistry, cycles, location (if available).
                         -C  CPU voltage, external clock speed (if root and dmidecode installed).
                         -D  Firmware rev. if available; partition scheme, in some cases; disk rotation speed/SSD (if 
                             detected). 
                         -E  Serial number, class ID, HCI version and revision.
                         -G  Serial number, class ID.
                         -I  For 'Shell:' adds ([su|sudo|login]) to shell name if present; adds default shell+version if 
                             different; for 'running in:' adds (SSH) if SSH session; adds wakeups: (from suspend) to Uptime. 
                         -J  For Device: serial number (if present), interface count; USB speed.
        -m,--memory-modules  Width of memory bus, data and total (if present and greater than data); Detail for Type, if 
                             present; module voltage, if available; serial number. 
                         -N  Serial number, class ID.
                         -R  zfs-raid: portion allocated (used) by RAID devices/arrays. md-raid: system md-raid support types 
                             (kernel support, read ahead, RAID events). Hardware RAID rev, ports, specific vendor/product 
                             information. 
                         -S  Panel/tray/bar/dock info in desktop output, if in X (like lxpanel, xfce4-panel, mate-panel); (if 
                             available) dm version number, window manager version number. 
                      -w,-W  Location (uses -z/irc filter), weather observation time, altitude, sunrise/sunset, if available.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Additional Options:
 -h, --help           This help menu.
     --recommends     Checks inxi application dependencies + recommends, and directories, then shows what package(s) you need 
                      to install to add support for that feature. 
 -V, --version        Prints inxi version info then exits.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Advanced Options:
     --alt            Trigger for various advanced options:
                         40  Bypass Perl as a downloader option.
                         41  Bypass Curl as a downloader option.
                         42  Bypass Fetch as a downloader option.
                         43  Bypass Wget as a downloader option.
                         44  Bypass Curl, Fetch, and Wget as downloader options. Forces Perl if HTTP::Tiny present.
     --dig            Overrides configuration item NO_DIG (resets to default).
     --display        [:[0-9]] Try to get display data out of X (default: display 0).
     --dmidecode      Force use of dmidecode data instead of /sys where relevant (e.g. -M, -B).
     --downloader     Force inxi to use [curl|fetch|perl|wget] for downloads.
     --hddtemp        Force use of hddtemp for disk temps.
     --host           Turn on hostname for -S.
     --html-wan       Overrides configuration item NO_HTML_WAN (resets to default).
     --limit          [-1; 1-x] Set max output limit of IP addresses for -i (default 10; -1 removes limit).
     --no-dig         Skip dig for WAN IP checks, use downloader program.
     --no-host        Turn off hostname for -S. Useful if showing output from servers etc. -z triggers --no-host.
     --no-html-wan    Skip HTML IP sources for WAN IP checks, use dig only, or nothing if --no-dig.
     --no-ssl         Skip SSL certificate checks for all downloader actions (Wget/Fetch/Curl/Perl-HTTP::Tiny).
     --no-sudo        Skip internal program use of sudo features (not related to starting inxi with sudo).
     --output         [json|screen|xml] Change data output type. Requires --output-file if not screen.
     --output-file    [Full filepath|print] Output file to be used for --output.
     --partition-sort [dev-base|fs|id|label|percent-used|size|uuid|used] Change sort order of partition output. See man page 
                      for specifics. 
     --sensors-default
                      Removes configuration item SENSORS_USE and SENSORS_EXCLUDE. Same as default behavior.
     --sensors-exclude
                      [sensor[s] name, comma separated] Exclude supplied sensor array[s] for -s output (lm-sensors, Linux 
                      only). 
     --sensors-use    [sensor[s] name, comma separated] Use only supplied sensor array[s] for -s output (lm-sensors, Linux 
                      only). 
     --sleep          [0-x.x] Change CPU sleep time, in seconds, for -C (default: 0.35). Allows system to catch up and show a 
                      more accurate CPU use. Example: inxi -Cxxx --sleep 0.15 
     --tty            Forces irc flag to false. Generally useful if inxi is running inside of another tool like Chef or MOTD 
                      and returns corrupted color codes. Please see man page or file an issue if you need to use this flag. 
                      Must use -y [width] option if you want a specific output width. Always put this option first in an option 
                      list. 
     --usb-sys        Force USB data to use /sys as data source (Linux only).
     --usb-tool       Force USB data to use lsusb as data source (Linux only).
     --wan-ip-url     [URL] Skips dig, uses supplied URL for WAN IP (-i). URL output must end in the IP address. See man. 
                      Example: inxi -i --wan-ip-url https://yoursite.com/ip.php 
     --wm             Force wm: to use wmctrl as data source. Default uses ps.
     --wrap-max       Set maximum width where inxi autowraps line starters (previously --indent-min). Current: 90
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Debugging Options:
     --dbg            Specific debuggers, change often. Only 1 is constant:
                          1  Show downloader output. Turns off quiet mode.
     --debug          Triggers debugging modes.
                        1-3  On screen debugger output.
                         10  Basic logging.
                         11  Full file/system info logging.
                      The following create a tar.gz file of system data, plus inxi output. To automatically upload debugger 
                      data tar.gz file to ftp.smxi.org: inxi --debug 21 
                         20  Full system data collection: /sys; xorg conf and log data, xrandr, xprop, xdpyinfo, glxinfo etc.; 
                             data from dev, disks, partitions, etc. 
                         21  Upload debugger dataset to inxi debugger server automatically, removes debugger data directory, 
                             leaves tar.gz debugger file. 
                         22  Upload debugger dataset to inxi debugger server automatically, removes debugger data directory and 
                             debugger tar.gz file. 
     --debug-proc     Force debugger parsing of /proc as sudo/root.
     --debug-proc-print
                      To locate file that /proc debugger hangs on.
     --debug-no-exit  Skip exit on error to allow completion.
     --debug-no-proc  Skip /proc debugging in case of a hang.
     --debug-no-sys   Skip /sys debugging in case of a hang.
     --debug-sys      Force PowerPC debugger parsing of /sys as sudo/root.
     --debug-sys-print
                      To locate file that /sys debugger hangs on.
     --ftp            Use with --debugger 21 to trigger an alternate FTP server for upload. Format: [ftp.xx.xx/yy]. Must 
                      include a remote directory to upload to. Example: inxi --debug 21 --ftp ftp.myserver.com/incoming 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
```

## Examples

### Basic information CPU/MEM

```plain
$ inxi   
CPU: Dual Core Intel Core i7-7500U (-MT MCP-) speed/min/max: 800/400/3500 MHz Kernel: 5.11.0-7620-generic x86_64 Up: 1h 13m 
Mem: 13072.6/15764.5 MiB (82.9%) Storage: 476.94 GiB (22.1% used) Procs: 291 Shell: Zsh inxi: 3.3.01 
```

### Use of specific Output Control Options

Check the flags overview for the available Output Control Options.

Basic information output of all components.

```plain
$ inxi -b
System:    Host: dco Kernel: 5.11.0-7620-generic x86_64 bits: 64 Desktop: GNOME 3.38.4 Distro: Pop!_OS 21.04 
Machine:   Type: Laptop System: LENOVO product: 20HD000EMH v: ThinkPad T470 serial: <superuser required> 
           Mobo: LENOVO model: 20HD000EMH v: SDK0J40697 WIN serial: <superuser required> UEFI: LENOVO v: N1QET87W (1.62 ) 
           date: 02/27/2020 
Battery:   ID-1: BAT0 charge: 11.8 Wh condition: 18.3/23.9 Wh (77%) 
           ID-2: BAT1 charge: 8.7 Wh condition: 20.3/23.9 Wh (85%) 
CPU:       Info: Dual Core Intel Core i7-7500U [MT MCP] speed: 1870 MHz min/max: 400/3500 MHz 
Graphics:  Device-1: Intel HD Graphics 620 driver: i915 v: kernel 
           Device-2: Chicony Integrated Camera type: USB driver: uvcvideo 
           Display: x11 server: X.Org 1.20.11 driver: loaded: modesetting unloaded: fbdev,vesa resolution: 1920x1080~60Hz 
           OpenGL: renderer: Mesa Intel HD Graphics 620 (KBL GT2) v: 4.6 Mesa 21.0.1 
Network:   Device-1: Intel Ethernet I219-V driver: e1000e 
           Device-2: Intel Wireless 8265 / 8275 driver: iwlwifi 
Drives:    Local Storage: total: 476.94 GiB used: 105.29 GiB (22.1%) 
Info:      Processes: 293 Uptime: 1h 16m Memory: 15.39 GiB used: 12.78 GiB (83.0%) Shell: Zsh inxi: 3.3.01 
```

### Full output of all components

```plain
$ inxi -F -xxx
System:    Host: pop Kernel: 5.11.0-7620-generic x86_64 bits: 64 compiler: gcc v: 10.2.1 Desktop: GNOME 3.38.4 tk: GTK 3.24.25 
           wm: gnome-shell dm: GDM3 3.38.2.1 Distro: Pop!_OS 21.04 base: Ubuntu 21.04 Hirsute 
Machine:   Type: Laptop System: LENOVO product: 20HHS0EQ00 v: ThinkPad P51 serial: <superuser required> Chassis: type: 10 
           serial: <superuser required> 
           Mobo: LENOVO model: 20HHS0EQ00 v: SDK0J40697 WIN serial: <superuser required> UEFI: LENOVO v: N1UET80W (1.54 ) 
           date: 11/05/2020 
Battery:   ID-1: BAT0 charge: 80.9 Wh condition: 80.9/90.0 Wh (90%) volts: 12.7/11.2 model: SMP 00NY493 type: Li-poly 
           serial: 15 status: Full cycles: 279 
           Device-1: hidpp_battery_1 model: Logitech MX Ergo Multi-Device Trackball serial: e3:fa:54:ff:5a:8c 
           charge: 100% (should be ignored) rechargeable: yes status: Discharging 
CPU:       Info: Quad Core model: Intel Core i7-7700HQ bits: 64 type: MT MCP arch: Kaby Lake rev: 9 L2 cache: 6 MiB 
           flags: avx avx2 lm nx pae sse sse2 sse3 sse4_1 sse4_2 ssse3 vmx bogomips: 44798 
           Speed: 3483 MHz min/max: 800/3800 MHz Core speeds (MHz): 1: 3483 2: 3539 3: 3457 4: 3591 5: 3479 6: 3483 7: 3487 
           8: 3457 
Graphics:  Device-1: NVIDIA GM107GLM [Quadro M1200 Mobile] vendor: Lenovo driver: nvidia v: 465.31 bus ID: 01:00.0 
           chip ID: 10de:13b6 class ID: 0300 
           Device-2: Lite-On Integrated Camera type: USB driver: uvcvideo bus ID: 1-8:2 chip ID: 04ca:7066 class ID: 0e02 
           Display: x11 server: X.Org 1.20.11 compositor: gnome-shell driver: loaded: modesetting,nouveau,nvidia 
           unloaded: fbdev,vesa resolution: 2560x1440~60Hz s-dpi: 96 
           OpenGL: renderer: NVIDIA Quadro M1200/PCIe/SSE2 v: 4.6.0 NVIDIA 465.31 direct render: Yes 
Audio:     Device-1: Intel CM238 HD Audio vendor: Lenovo driver: snd_hda_intel v: kernel bus ID: 00:1f.3 chip ID: 8086:a171 
           class ID: 0403 
           Device-2: NVIDIA GM107 High Definition Audio [GeForce 940MX] driver: snd_hda_intel v: kernel bus ID: 01:00.1 
           chip ID: 10de:0fbc class ID: 0403 
           Sound Server: ALSA v: k5.11.0-7620-generic 
Network:   Device-1: Intel Ethernet I219-V vendor: Lenovo driver: e1000e v: kernel port: efa0 bus ID: 00:1f.6 
           chip ID: 8086:15d6 class ID: 0200 
           IF: enp0s31f6 state: down mac: 54:[REDACTED]:8a 
           Device-2: Intel Wireless 8265 / 8275 driver: iwlwifi v: kernel port: d000 bus ID: 04:00.0 chip ID: 8086:24fd 
           class ID: 0280 
           IF: wlp4s0 state: up mac: ac:[REDACTED]:14 
           IF-ID-1: docker0 state: down mac: 02:[REDACTED]:00 
           IF-ID-2: tun0 state: unknown speed: 10 Mbps duplex: full mac: N/A 
Bluetooth: Device-1: Intel Bluetooth wireless interface type: USB driver: btusb v: 0.8 bus ID: 1-14:4 chip ID: 8087:0a2b 
           class ID: e001 
           Report: ID: hci0 state: up running bt-v: 2.1 lmp-v: 4.2 sub-v: 100 hci-v: 4.2 rev: 100 address: AC:ED:5C:B9:8C:18 
Drives:    Local Storage: total: 1.14 TiB used: 666.23 GiB (56.9%) 
           ID-1: /dev/nvme0n1 vendor: Samsung model: MZVLB256HAHQ-000H1 size: 238.47 GiB speed: 31.6 Gb/s lanes: 4 
           rotation: SSD serial: S4[REDACTED]05 rev: EXD70H1Q temp: 23.9 C scheme: GPT 
           ID-2: /dev/nvme1n1 vendor: Samsung model: SSD 970 EVO Plus 1TB size: 931.51 GiB speed: 31.6 Gb/s lanes: 4 
           rotation: SSD serial: S4[REDACTED]05Z rev: 2B2QEXM7 temp: 38.9 C scheme: GPT 
Partition: ID-1: / size: 907.52 GiB used: 663.17 GiB (73.1%) fs: ext4 dev: /dev/dm-1 mapped: data-root 
           ID-2: /boot/efi size: 497 MiB used: 351.5 MiB (70.7%) fs: vfat dev: /dev/nvme1n1p1 
Swap:      ID-1: swap-1 type: partition size: 4 GiB used: 0 KiB (0.0%) priority: -2 dev: /dev/dm-2 mapped: cryptswap 
Sensors:   System Temperatures: cpu: 68.0 C mobo: 48.0 C gpu: nvidia temp: 48 C 
           Fan Speeds (RPM): cpu: 3386 fan-2: 3388 
Info:      Processes: 368 Uptime: 2h 29m wakeups: 5 Memory: 31.16 GiB used: 8.41 GiB (27.0%) Init: systemd v: 247 runlevel: 5 
           Compilers: gcc: 10.3.0 alt: 10/9 Packages: 2534 apt: 2514 snap: 20 Shell: Zsh v: 5.8 running in: tilix inxi: 3.3.01 
```

## URL List

- [Github.com - inxi](https://github.com/smxi/inxi)
- [Smxi.org - inxi](https://smxi.org/docs/inxi.htm)
