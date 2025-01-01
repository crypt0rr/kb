---
title : "Bulk_extractor"
# pre : ' '
description : "Program that extracts features such as email addresses, credit card numbers, URLs, and other types of information from digital evidence files."
date : 2020-04-21T12:57:34+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Program that extracts features such as email addresses, credit card numbers, URLs, and other types of information from digital evidence files.

## Installation

Download newest release from [Digitalcorpora.org](http://downloads.digitalcorpora.org/downloads/bulk_extractor/)

## Usage

```plain
bulk_extractor [options] imagefile
```

## Flags

```plain
Required parameters:
   imagefile     - the file to extract
 or  -R filedir  - recurse through a directory of files
                  HAS SUPPORT FOR E01 FILES
                  HAS SUPPORT FOR AFF FILES
   -o outdir    - specifies output directory. Must not exist.
                  bulk_extractor creates this directory.
Options:
   -i           - INFO mode. Do a quick random sample and print a report.
   -b banner.txt- Add banner.txt contents to the top of every output file.
   -r alert_list.txt  - a file containing the alert list of features to alert
                       (can be a feature file or a list of globs)
                       (can be repeated.)
   -w stop_list.txt   - a file containing the stop list of features (white list
                       (can be a feature file or a list of globs)s
                       (can be repeated.)
   -F <rfile>   - Read a list of regular expressions from <rfile> to find
   -f <regex>   - find occurrences of <regex>; may be repeated.
                  results go into find.txt
   -q nn        - Quiet Rate; only print every nn status reports. Default 0; -1 for no status at all
   -s frac[:passes] - Set random sampling parameters

Tuning parameters:
   -C NN        - specifies the size of the context window (default 16)
   -S fr:<name>:window=NN   specifies context window for recorder to NN
   -S fr:<name>:window_before=NN  specifies context window before to NN for recorder
   -S fr:<name>:window_after=NN   specifies context window after to NN for recorder
   -G NN        - specify the page size (default 16777216)
   -g NN        - specify margin (default 4194304)
   -j NN        - Number of analysis threads to run (default 4)
   -M nn        - sets max recursion depth (default 7)
   -m <max>     - maximum number of minutes to wait after all data read
                  default is 60

Path Processing Mode:
   -p <path>/f  - print the value of <path> with a given format.
                  formats: r = raw; h = hex.
                  Specify -p - for interactive mode.
                  Specify -p -http for HTTP mode.

Parallelizing:
   -Y <o1>      - Start processing at o1 (o1 may be 1, 1K, 1M or 1G)
   -Y <o1>-<o2> - Process o1-o2
   -A <off>     - Add <off> to all reported feature offsets

Debugging:
   -h           - print this message
   -H           - print detailed info on the scanners
   -V           - print version number
   -z nn        - start on page nn
   -dN          - debug mode (see source code)
   -Z           - zap (erase) output directory

Control of Scanners:
   -P <dir>     - Specifies a plugin directory
             Default dirs include /usr/local/lib/bulk_extractor /usr/lib/bulk_extractor and
             BE_PATH environment variable
   -e <scanner>  enables <scanner> -- -e all   enables all
   -x <scanner>  disable <scanner> -- -x all   disables all
   -E <scanner>    - turn off all scanners except <scanner>
                     (Same as -x all -e <scanner>)
          note: -e, -x and -E commands are executed in order
              e.g.: '-E gzip -e facebook' runs only gzip and facebook
   -S name=value - sets a bulk extractor option name to be value


Settable Options (and their defaults):
   -S work_start_work_end=YES    Record work start and end of each scanner in report.xml file ()
   -S enable_histograms=YES    Disable generation of histograms ()
   -S debug_histogram_malloc_fail_frequency=0    Set >0 to make histogram maker fail with memory allocations ()
   -S hash_alg=md5    Specifies hash algorithm to be used for all hash calculations ()
   -S dup_data_alerts=NO    Notify when duplicate data is not processed ()
   -S write_feature_files=YES    Write features to flat files ()
   -S write_feature_sqlite3=NO    Write feature files to report.sqlite3 ()
   -S report_read_errors=YES    Report read errors ()
   -S carve_net_memory=NO    Carve network  memory structures (net)
   -S word_min=6    Minimum word size (wordlist)
   -S word_max=14    Maximum word size (wordlist)
   -S max_word_outfile_size=100000000    Maximum size of the words output file (wordlist)
   -S wordlist_use_flatfiles=YES    Override SQL settings and use flatfiles for wordlist (wordlist)
   -S ssn_mode=0    0=Normal; 1=No `SSN' required; 2=No dashes required (accts)
   -S min_phone_digits=7    Min. digits required in a phone (accts)
   -S exif_debug=0    debug exif decoder (exif)
   -S jpeg_carve_mode=1    0=carve none; 1=carve encoded; 2=carve all (exif)
   -S min_jpeg_size=1000    Smallest JPEG stream that will be carved (exif)
   -S zip_min_uncompr_size=6    Minimum size of a ZIP uncompressed object (zip)
   -S zip_max_uncompr_size=268435456    Maximum size of a ZIP uncompressed object (zip)
   -S zip_name_len_max=1024    Maximum name of a ZIP component filename (zip)
   -S unzip_carve_mode=1    0=carve none; 1=carve encoded; 2=carve all (zip)
   -S rar_find_components=YES    Search for RAR components (rar)
   -S rar_find_volumes=YES    Search for RAR volumes (rar)
   -S unrar_carve_mode=1    0=carve none; 1=carve encoded; 2=carve all (rar)
   -S gzip_max_uncompr_size=268435456    maximum size for decompressing GZIP objects (gzip)
   -S pdf_dump=NO    Dump the contents of PDF buffers (pdf)
   -S pdf_dump=NO    Dump the contents of PDF buffers (msxml)
   -S winpe_carve_mode=1    0=carve none; 1=carve encoded; 2=carve all (winpe)
   -S opt_weird_file_size=157286400    Threshold for FAT32 scanner (windirs)
   -S opt_weird_file_size2=536870912    Threshold for FAT32 scanner (windirs)
   -S opt_weird_cluster_count=67108864    Threshold for FAT32 scanner (windirs)
   -S opt_weird_cluster_count2=268435456    Threshold for FAT32 scanner (windirs)
   -S opt_max_bits_in_attrib=3    Ignore FAT32 entries with more attributes set than this (windirs)
   -S opt_max_weird_count=2    Number of 'weird' counts to ignore a FAT32 entry (windirs)
   -S opt_last_year=2023    Ignore FAT32 entries with a later year than this (windirs)
   -S xor_mask=255    XOR mask value, in decimal (xor)
   -S sqlite_carve_mode=2    0=carve none; 1=carve encoded; 2=carve all (sqlite)

These scanners disabled by default; enable with -e:
   -e base16 - enable scanner base16
   -e facebook - enable scanner facebook
   -e outlook - enable scanner outlook
   -e sceadan - enable scanner sceadan
   -e wordlist - enable scanner wordlist
   -e xor - enable scanner xor

These scanners enabled by default; disable with -x:
   -x accts - disable scanner accts
   -x aes - disable scanner aes
   -x base64 - disable scanner base64
   -x elf - disable scanner elf
   -x email - disable scanner email
   -x exif - disable scanner exif
   -x find - disable scanner find
   -x gps - disable scanner gps
   -x gzip - disable scanner gzip
   -x hiberfile - disable scanner hiberfile
   -x httplogs - disable scanner httplogs
   -x json - disable scanner json
   -x kml - disable scanner kml
   -x msxml - disable scanner msxml
   -x net - disable scanner net
   -x pdf - disable scanner pdf
   -x rar - disable scanner rar
   -x sqlite - disable scanner sqlite
   -x vcard - disable scanner vcard
   -x windirs - disable scanner windirs
   -x winlnk - disable scanner winlnk
   -x winpe - disable scanner winpe
   -x winprefetch - disable scanner winprefetch
   -x zip - disable scanner zip
```

## Examples

```plain
bulk_extractor -o bulk-out xp-laptop-2005-07-04-1430.img

bulk_extractor version: 1.3
Hostname: kali
Input file: xp-laptop-2005-07-04-1430.img
Output directory: bulk-out
Disk Size: 536715264
Threads: 1
Phase 1.
13:02:46 Offset 0MB (0.00%) Done in n/a at 13:02:45
13:03:39 Offset 67MB (12.50%) Done in  0:06:14 at 13:09:53
13:04:43 Offset 134MB (25.01%) Done in  0:05:50 at 13:10:33
13:04:55 Offset 201MB (37.51%) Done in  0:03:36 at 13:08:31
13:06:01 Offset 268MB (50.01%) Done in  0:03:15 at 13:09:16
13:06:48 Offset 335MB (62.52%) Done in  0:02:25 at 13:09:13
13:07:04 Offset 402MB (75.02%) Done in  0:01:25 at 13:08:29
13:07:20 Offset 469MB (87.53%) Done in  0:00:39 at 13:07:59
All Data is Read; waiting for threads to finish...
Time elapsed waiting for 1 thread to finish:
     (please wait for another 60 min .)
Time elapsed waiting for 1 thread to finish:
    6 sec (please wait for another 59 min 54 sec.)
Thread 0: Processing 520093696

Time elapsed waiting for 1 thread to finish:
    12 sec (please wait for another 59 min 48 sec.)
Thread 0: Processing 520093696

Time elapsed waiting for 1 thread to finish:
    18 sec (please wait for another 59 min 42 sec.)
Thread 0: Processing 520093696

Time elapsed waiting for 1 thread to finish:
    24 sec (please wait for another 59 min 36 sec.)
Thread 0: Processing 520093696

Time elapsed waiting for 1 thread to finish:
    30 sec (please wait for another 59 min 30 sec.)
Thread 0: Processing 520093696

All Threads Finished!
Producer time spent waiting: 335.984 sec.
Average consumer time spent waiting: 0.143353 sec.
*******************************************
** bulk_extractor is probably CPU bound. **
**    Run on a computer with more cores  **
**      to get better performance.       **
*******************************************
Phase 2. Shutting down scanners
Phase 3. Creating Histograms
   ccn histogram...   ccn_track2 histogram...   domain histogram...
   email histogram...   ether histogram...   find histogram...
   ip histogram...   tcp histogram...   telephone histogram...
   url histogram...   url microsoft-live...   url services...
   url facebook-address...   url facebook-id...   url searches...

Elapsed time: 378.5 sec.
Overall performance: 1.418 MBytes/sec.
Total email features found: 899
```

## URL List

- [GitHub.com - bulk_extractor](https://github.com/simsong/bulk_extractor)
- [Tools.kali.org](https://tools.kali.org/forensics/bulk-extractor)
