---
title : "Guestmount"
# pre : ' '
description : "FUSE module for libguestfs. guestmount lets you mount a virtual machine filesystem."
date : 2023-05-31T14:33:52+02:00
# hidden : true
# draft : true
weight : 1070
# tags : ['']
---

---

FUSE module for libguestfs. guestmount lets you mount a virtual machine filesystem.

You must ***not*** use "guestmount" in read-write mode on live virtual machines. If you do this, you risk disk corruption in the VM .

## Installation

```plain
sudo apt install libguestfs-tools
```

## Usage

```plain
guestmount [--options] mountpoint
```

## Flags

```plain
  -a|--add image       Add image
  -c|--connect uri     Specify libvirt URI for -d option
  --dir-cache-timeout  Set readdir cache timeout (default 5 sec)
  -d|--domain guest    Add disks from libvirt guest
  --echo-keys          Don't turn off echo for passphrases
  --fd=FD              Write to pipe FD when mountpoint is ready
  --format[=raw|..]    Force disk format for -a option
  --fuse-help          Display extra FUSE options
  -i|--inspector       Automatically mount filesystems
  --help               Display help message and exit
  --key selector       Specify a LUKS key
  --keys-from-stdin    Read passphrases from stdin
  --live               Connect to a live virtual machine
  -m|--mount dev[:mnt[:opts[:fstype]] Mount dev on mnt (if omitted, /)
  --no-fork            Don't daemonize
  -n|--no-sync         Don't autosync
  -o|--option opt      Pass extra option to FUSE
  --pid-file filename  Write PID to filename
  -r|--ro              Mount read-only
  --selinux            For backwards compat only, does nothing
  -v|--verbose         Verbose messages
  -V|--version         Display version and exit
  -w|--rw              Mount read-write
  -x|--trace           Trace guestfs API calls
```

## Examples

### Mount .VDH(X) Virtual Disk

- `-i` - Automatically mount filesystems
- `--ro` - Read Only

```plain
mkdir mountpoint
sudo guestmount --add <VM>.vhdx -i --ro mountpoint
cd mountpoint
```

## URL list

- [Linux.die.net - guestmount](https://linux.die.net/man/1/guestmount)
