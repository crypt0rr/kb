---
title : "Ditto"
# pre : '<i class="fas fa-code"></i> '
description : "Useful in copying large amounts of data as it can run within a Terminal window that contains more useful information about its progress than the more traditional Finder copy window."
date : 2021-12-10T15:18:31+01:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Copy directory hierarchies, create and extract archives. Ditto can preserve ownership / permissions, resource forks and file / folder metadata. Ditto will automatically create the destination folder if it doesn’t yet exist, if the destination does exist and contains files, then ditto will merge them.

## Usage

```plain
ditto [ <options> ] src [ ... src ] dst
```

## Flags

```plain
<options> are any of:
-h                         print full usage
-v                         print a line of status for each source copied
-V                         print a line of status for every file copied
-X                         do not descend into directories with a different device ID

-c                         create an archive at dst (by default CPIO format)
-x                         src(s) are archives
-z                         gzip compress CPIO archive
-j                         bzip2 compress CPIO archive
-k                         archives are PKZip
--keepParent               parent directory name src is embedded in dst_archive
--arch archVal             fat files will be thinned to archVal
                            multiple -arch options can be specified
                            archVal should be one of "ppc", "i386", etc
--bom bomFile              only objects present in bomFile are copied
--norsrc                   don't preserve resource data
--noextattr                don't preserve extended attributes
--noqtn                    don't preserve quarantine information
--noacl                    don't preserve ACLs
--sequesterRsrc            copy resources via polite directory (PKZip only)
--nocache                  don't use filesystem cache for reads/writes
--hfsCompression           compress files at destination if appropriate
--nopreserveHFSCompression don't preserve HFS+ compression when copying files
--zlibCompressionLevel num use compression level 'num' when creating a PKZip archive
--password                 request password for reading from encrypted PKZip archive
```

## Examples

### Using Ditto to Copy Files / Folders

```plain
ditto source destination
```

### Copy without metadata

```plain
ditto -V --norsrc ~/Sample/Folder /Volumes/NoMetadataBackups
```

## URL List

- [ss64.com - ditto](https://ss64.com/osx/ditto.html)
- [OSXdaily.com - Use ditto to Copy Files & Directories Intelligently from the Mac Terminal](https://osxdaily.com/2014/06/11/use-ditto-copy-files-directories-mac-command-line/)
