---
title : "Lvextend"
# pre : '<i class="fas fa-code"></i> '
description : "Extend the size of a logical volume."
date : 2023-10-22T20:21:24+02:00
# hidden : true
# draft : true
weight : 550
# tags : ['']
---

---

Extend the size of a logical volume.

## Usage

```plain
lvextend [OPTIONS]
```

## Flags

```plain
  Extend an LV by a specified size.
  lvextend -L|--size [+]Size[m|UNIT] LV
        [ -l|--extents [+]Number[PERCENT] ]
        [ -r|--resizefs ]
        [ -i|--stripes Number ]
        [ -I|--stripesize Size[k|UNIT] ]
        [    --poolmetadatasize [+]Size[m|UNIT] ]
        [ COMMON_OPTIONS ]
        [ PV ... ]

  Extend an LV by specified PV extents.
  lvextend LV PV ...
        [ -r|--resizefs ]
        [ -i|--stripes Number ]
        [ -I|--stripesize Size[k|UNIT] ]
        [ COMMON_OPTIONS ]

  Extend a pool metadata SubLV by a specified size.
  lvextend --poolmetadatasize [+]Size[m|UNIT] LV_thinpool
        [ -i|--stripes Number ]
        [ -I|--stripesize Size[k|UNIT] ]
        [ COMMON_OPTIONS ]
        [ PV ... ]

  Extend an LV according to a predefined policy.
  lvextend --usepolicies LV_snapshot_thinpool
        [ -r|--resizefs ]
        [ COMMON_OPTIONS ]
        [ PV ... ]

  Common options for command:
        [ -A|--autobackup y|n ]
        [ -f|--force ]
        [ -m|--mirrors Number ]
        [ -n|--nofsck ]
        [    --alloc contiguous|cling|cling_by_tags|normal|anywhere|inherit ]
        [    --nosync ]
        [    --noudevsync ]
        [    --reportformat basic|json ]
        [    --type linear|striped|snapshot|mirror|raid|thin|cache|vdo|thin-pool|cache-pool|vdo-pool ]

  Common options for lvm:
        [ -d|--debug ]
        [ -h|--help ]
        [ -q|--quiet ]
        [ -v|--verbose ]
        [ -y|--yes ]
        [ -t|--test ]
        [    --commandprofile String ]
        [    --config String ]
        [    --driverloaded y|n ]
        [    --nolocking ]
        [    --lockopt String ]
        [    --longhelp ]
        [    --profile String ]
        [    --version ]

  Use --longhelp to show all options and advanced commands.
```

## Examples

Ubuntu Server by default does not take 100% of the allocated disk space as `/` disk. This can become an issue when the `/` is used up completely.

The command below sets the use for the disk to be 100%.

```plain
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
    Extending logical volume ubuntu--vg-ubuntu--lv to 30.77 GiB
    Logical volume ubuntu--vg-ubuntu--lv successfully resized
```

To apply the change to the actual disk in use, use `resize2fs`.

```plain
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

## URL list

- [Linux.die.net - lvextend](https://linux.die.net/man/8/lvextend)
