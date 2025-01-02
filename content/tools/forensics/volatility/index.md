---
title : "Volatility"
# pre : ' '
description : "A memory forensics analysis platform."
date : 2020-03-13T15:49:58+01:00
# hidden : true
# draft : true
weight : 130
# tags : ['']
---

---

A memory forensics analysis platform.

## Installation

```plain
sudo apt install volatility
```

## Usage

```plain
volatility [OPTIONS] <target>
```

## Flags

```plain
Volatility Foundation Volatility Framework 2.6
Usage: Volatility - A memory forensics analysis platform.

Options:
  -h, --help            list all available options and their default values.
                        Default values may be set in the configuration file
                        (/etc/volatilityrc)
  --conf-file=/home/b/.volatilityrc
                        User based configuration file
  -d, --debug           Debug volatility
  --plugins=PLUGINS     Additional plugin directories to use (colon separated)
  --info                Print information about all registered objects
  --cache-directory=/home/b/.cache/volatility
                        Directory where cache files are stored
  --cache               Use caching
  --tz=TZ               Sets the (Olson) timezone for displaying timestamps
                        using pytz (if installed) or tzset
  -f FILENAME, --filename=FILENAME
                        Filename to use when opening an image
  --profile=WinXPSP2x86
                        Name of the profile to load (use --info to see a list
                        of supported profiles)
  -l LOCATION, --location=LOCATION
                        A URN location from which to load an address space
  -w, --write           Enable write support
  --dtb=DTB             DTB Address
  --shift=SHIFT         Mac KASLR shift address
  --output=text         Output in this format (support is module specific, see
                        the Module Output Options below)
  --output-file=OUTPUT_FILE
                        Write output in this file
  -v, --verbose         Verbose information
  --physical_shift=PHYSICAL_SHIFT
                        Linux kernel physical shift address
  --virtual_shift=VIRTUAL_SHIFT
                        Linux kernel virtual shift address
  -g KDBG, --kdbg=KDBG  Specify a KDBG virtual address (Note: for 64-bit
                        Windows 8 and above this is the address of
                        KdCopyDataBlock)
  --force               Force utilization of suspect profile
  --cookie=COOKIE       Specify the address of nt!ObHeaderCookie (valid for
                        Windows 10 only)
  -k KPCR, --kpcr=KPCR  Specify a specific KPCR address

 Supported Plugin Commands:

    amcache        Print AmCache information
    apihooks       Detect API hooks in process and kernel memory
    atoms          Print session and window station atom tables
    atomscan       Pool scanner for atom tables
    auditpol       Prints out the Audit Policies from HKLM\SECURITY\Policy\PolAdtEv
    bigpools       Dump the big page pools using BigPagePoolScanner
    bioskbd        Reads the keyboard buffer from Real Mode memory
    cachedump      Dumps cached domain hashes from memory
    callbacks      Print system-wide notification routines
    clipboard      Extract the contents of the windows clipboard
    cmdline        Display process command-line arguments
    cmdscan        Extract command history by scanning for _COMMAND_HISTORY
    connections    Print list of open connections [Windows XP and 2003 Only]
    connscan       Pool scanner for tcp connections
    consoles       Extract command history by scanning for _CONSOLE_INFORMATION
    crashinfo      Dump crash-dump information
    deskscan       Poolscaner for tagDESKTOP (desktops)
    devicetree     Show device tree
    dlldump        Dump DLLs from a process address space
    dlllist        Print list of loaded dlls for each process
    driverirp      Driver IRP hook detection
    drivermodule   Associate driver objects to kernel modules
    driverscan     Pool scanner for driver objects
    dumpcerts      Dump RSA private and public SSL keys
    dumpfiles      Extract memory mapped and cached files
    dumpregistry   Dumps registry files out to disk
    editbox        Displays information about Edit controls. (Listbox experimental.)
    envars         Display process environment variables
    eventhooks     Print details on windows event hooks
    evtlogs        Extract Windows Event Logs (XP/2003 only)
    filescan       Pool scanner for file objects
    gahti          Dump the USER handle type information
    gditimers      Print installed GDI timers and callbacks
    gdt            Display Global Descriptor Table
    getservicesids Get the names of services in the Registry and return Calculated SID
    getsids        Print the SIDs owning each process
    handles        Print list of open handles for each process
    hashdump       Dumps passwords hashes (LM/NTLM) from memory
    hibinfo        Dump hibernation file information
    hivedump       Prints out a hive
    hivelist       Print list of registry hives.
    hivescan       Pool scanner for registry hives
    hpakextract    Extract physical memory from an HPAK file
    hpakinfo       Info on an HPAK file
    idt            Display Interrupt Descriptor Table
    iehistory      Reconstruct Internet Explorer cache / history
    imagecopy      Copies a physical address space out as a raw DD image
    imageinfo      Identify information for the image
    impscan        Scan for calls to imported functions
    joblinks       Print process job link information
    kdbgscan       Search for and dump potential KDBG values
    kpcrscan       Search for and dump potential KPCR values
    ldrmodules     Detect unlinked DLLs
    lsadump        Dump (decrypted) LSA secrets from the registry
    machoinfo      Dump Mach-O file format information
    malfind        Find hidden and injected code
    mbrparser      Scans for and parses potential Master Boot Records (MBRs)
    memdump        Dump the addressable memory for a process
    memmap         Print the memory map
    messagehooks   ist desktop and thread window message hooks
    mftparser      Scans for and parses potential MFT entries
    moddump        Dump a kernel driver to an executable file sample
    modscan        Pool scanner for kernel modules
    modules        Print list of loaded modules
    multiscan      Scan for various objects at once
    mutantscan     Pool scanner for mutex objects
    notepad        List currently displayed notepad text
    objtypescan    Scan for Windows object type objects
    patcher        Patches memory based on page scans
    poolpeek       Configurable pool scanner plugin
    printkey       Print a registry key, and its subkeys and values
    privs          Display process privileges
    procdump       Dump a process to an executable file sample
    pslist         Print all running processes by following the EPROCESS lists
    psscan         Pool scanner for process objects
    pstree         Print process list as a tree
    psxview        Find hidden processes with various process listings
    qemuinfo       Dump Qemu information
    raw2dmp        Converts a physical memory sample to a windbg crash dump
    screenshot     Save a pseudo-screenshot based on GDI windows
    servicediff    List Windows services (ala Plugx)
    sessions       List details on _MM_SESSION_SPACE (user logon sessions)
    shellbags      Prints ShellBags info
    shimcache      Parses the Application Compatibility Shim Cache registry key
    shutdowntime   Print ShutdownTime of machine from registry
    sockets        Print list of open sockets
    sockscan       Pool scanner for tcp socket objects
    ssdt           Display SSDT entries
    strings        Match physical offsets to virtual addresses (may take a while, VERY verbose)
    svcscan        Scan for Windows services
    symlinkscan    Pool scanner for symlink objects
    thrdscan       Pool scanner for thread objects
    threads        Investigate _ETHREAD and _KTHREADs
    timeliner      Creates a timeline from various artifacts in memory
    timers         Print kernel timers and associated module DPCs
    truecryptmaster     Recover TrueCrypt 7.1a Master Keys
    truecryptpassphrase TrueCrypt Cached Passphrase Finder
    truecryptsummary    TrueCrypt Summary
    unloadedmodules     Print list of unloaded modules
    userassist     Print userassist registry keys and information
    userhandles    Dump the USER handle tables
    vaddump        Dumps out the vad sections to a file
    vadinfo        Dump the VAD info
    vadtree        Walk the VAD tree and display in tree format
    vadwalk        Walk the VAD tree
    vboxinfo       Dump virtualbox information
    verinfo        Prints out the version information from PE images
    vmwareinfo     Dump VMware VMSS/VMSN information
    volshell       Shell in the memory image
    windows        Print Desktop Windows (verbose details)
    wintree        Print Z-Order Desktop Windows Tree
    wndscan        Pool scanner for window stations
    yarascan       Scan process or kernel memory with Yara signatures
```

## Examples

### Finding dump profile type

```plain
$ volatility -f dump.raw imageinfo

Volatility Foundation Volatility Framework 2.6
INFO    : volatility.debug    : Determining profile based on KDBG search...
          Suggested Profile(s) : WinXPSP2x86, WinXPSP3x86 (Instantiated with WinXPSP2x86)
                     AS Layer1 : IA32PagedMemoryPae (Kernel AS)
                     AS Layer2 : FileAddressSpace (dump.raw)
                      PAE type : PAE
                           DTB : 0x3bc000L
                          KDBG : 0x8054d2e0L
          Number of Processors : 1
     Image Type (Service Pack) : 3
                KPCR for CPU 0 : 0xffdff000L
             KUSER_SHARED_DATA : 0xffdf0000L
           Image date and time : 2016-02-24 12:55:34 UTC+0000
     Image local date and time : 2016-02-24 13:55:34 +0100
```

### Overview of running processes

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 pstree

Volatility Foundation Volatility Framework 2.6
Name                                                  Pid   PPid   Thds   Hnds Time
-------------------------------------------------- ------ ------ ------ ------ ----
 0x877c1660:System                                      4      0     60    338 1970-01-01 00:00:00 UTC+0000
. 0x874eada0:smss.exe                                 564      4      3     19 2016-02-24 09:51:11 UTC+0000
.. 0x876ae2a0:winlogon.exe                            904    564     20    509 2016-02-24 09:51:21 UTC+0000
... 0x87521020:services.exe                           948    904     15    278 2016-02-24 09:51:21 UTC+0000
```

### Starting proces command history

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 cmdline

Volatility Foundation Volatility Framework 2.6
************************************************************************
System pid:      4
************************************************************************
smss.exe pid:    564
Command line : \SystemRoot\System32\smss.exe
************************************************************************
avgrsx.exe pid:    616
Command line : c:\PROGRA~1\AVG\AVG2014\avgrsx.exe /boot
```

### Command history

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 cmdscan

Volatility Foundation Volatility Framework 2.6
**************************************************
CommandProcess: csrss.exe Pid: 880
CommandHistory: 0x10a86f8 Application: cmd.exe Flags: Allocated, Reset
CommandCount: 14 LastAdded: 13 LastDisplayed: 13
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x44c
Cmd #0 @ 0x10a7ba8: cd \WINDOWS\Web\transfer
Cmd #1 @ 0x10c4cb0: dir
Cmd #2 @ 0x10b0fd8: cd \
Cmd #3 @ 0x10b8008: dir
Cmd #4 @ 0x10c0960: cd "Documents and Settings"
```

### Show active connections

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 connections

Volatility Foundation Volatility Framework 2.6
Offset(V)  Local Address             Remote Address            Pid
---------- ------------------------- ------------------------- ---
0x872f1e68 192.168.87.153:1180       192.168.87.141:8080       3992
```

### Dump files to folder

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 dumpfiles --dump-dir output
Volatility Foundation Volatility Framework 2.6
DataSectionObject 0x875d10d0   4      \Device\HarddiskVolume1\WINDOWS\system32\config\systemprofile\Local Settings\Application Data\Avg2014\log\avgidpeh.log
SharedCacheMap 0x875d10d0   4      \Device\HarddiskVolume1\WINDOWS\system32\config\systemprofile\Local Settings\Application Data\Avg2014\log\avgidpeh.log
DataSectionObject 0x8732cef0   4      \Device\HarddiskVolume1\WINDOWS\system32\config\systemprofile\Local Settings\Application Data\Avg2014\log\avgtdi.log
```

### Dump all living processes to file

```plain
$ volatility -f dump.raw --profile=WinXPSP2x86 procdump --dump-dir output  

Volatility Foundation Volatility Framework 2.6
Process(V) ImageBase  Name                 Result
---------- ---------- -------------------- ------
0x877c1660 ---------- System               Error: PEB at 0x0 is unavailable (possibly due to paging)
0x874eada0 0x48580000 smss.exe             OK: executable.564.exe
0x87517580 0x00400000 avgrsx.exe           OK: executable.616.exe
0x875139f8 0x00400000 avgcsrvx.exe         OK: executable.668.exe
0x87646610 0x4a680000 csrss.exe            OK: executable.880.exe
0x876ae2a0 0x01000000 winlogon.exe         OK: executable.904.exe
0x87521020 0x01000000 services.exe         OK: executable.948.exe
0x8734a1e0 0x01000000 lsass.exe            OK: executable.960.exe
```

## URL List

- [Github.com - volatility](https://github.com/volatilityfoundation/volatility)
- [Github.com - Profiles Mac Linux](https://github.com/volatilityfoundation/profiles)
- [Book.hacktricks.xyz - Volatility examples](https://book.hacktricks.xyz/forensics/volatility-examples)
