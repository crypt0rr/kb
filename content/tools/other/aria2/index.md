---
title : "Aria2"
# pre : ' '
description : "Aria2 is a command line download client with resuming and segmented downloading. Supported protocols are HTTP/HTTPS/SFTP/FTP/BitTorrent and it also supports Metalink."
date : 2021-07-02T09:34:48+02:00
# hidden : true
# draft : true
weight : 100
tags : ['Other', 'macOS', 'Linux', 'Torrent', 'P2P', 'FTP']
---

---

Is a command line download client with resuming and segmented downloading. Supported protocols are HTTP/HTTPS/SFTP/FTP/BitTorrent and it also supports Metalink.

## Installation

```plain
sudo apt install aria2
```

## Usage

```plain
aria2c [OPTIONS] [URI | MAGNET | TORRENT_FILE | METALINK_FILE]...
```

## Flags

```plain
Printing options tagged with '#basic'.
See 'aria2c -h#help' to know all available tags.
Options:
 -v, --version                Print the version number and exit.

                              Tags: #basic

 -h, --help[=TAG|KEYWORD]     Print usage and exit.
                              The help messages are classified with tags. A tag
                              starts with "#". For example, type "--help=#http"
                              to get the usage for the options tagged with
                              "#http". If non-tag word is given, print the usage
                              for the options whose name includes that word.

                              Possible Values: #basic, #advanced, #http, #https, #ftp, #metalink, #bittorrent, #cookie, #hook, #file, #rpc, #checksum, #experimental, #deprecated, #help, #all
                              Default: #basic
                              Tags: #basic, #help

 -l, --log=LOG                The file name of the log file. If '-' is
                              specified, log is written to stdout.

                              Possible Values: /path/to/file, -
                              Tags: #basic

 -d, --dir=DIR                The directory to store the downloaded file.

                              Possible Values: /path/to/directory
                              Default: /root/
                              Tags: #basic, #file

 -o, --out=FILE               The file name of the downloaded file. It is
                              always relative to the directory given in -d
                              option. When the -Z option is used, this option
                              will be ignored.

                              Possible Values: /path/to/file
                              Tags: #basic, #http, #ftp, #file

 -s, --split=N                Download a file using N connections. If more
                              than N URIs are given, first N URIs are used and
                              remaining URLs are used for backup. If less than
                              N URIs are given, those URLs are used more than
                              once so that N connections total are made
                              simultaneously. The number of connections to the
                              same host is restricted by the 
                              --max-connection-per-server option. See also the
                              --min-split-size option.

                              Possible Values: 1-*
                              Default: 5
                              Tags: #basic, #http, #ftp

 --file-allocation=METHOD     Specify file allocation method.
                              'none' doesn't pre-allocate file space. 'prealloc'
                              pre-allocates file space before download begins.
                              This may take some time depending on the size of
                              the file.
                              If you are using newer file systems such as ext4
                              (with extents support), btrfs, xfs or NTFS
                              (MinGW build only), 'falloc' is your best
                              choice. It allocates large(few GiB) files
                              almost instantly. Don't use 'falloc' with legacy
                              file systems such as ext3 and FAT32 because it
                              takes almost same time as 'prealloc' and it
                              blocks aria2 entirely until allocation finishes.
                              'falloc' may not be available if your system
                              doesn't have posix_fallocate() function.
                              'trunc' uses ftruncate() system call or
                              platform-specific counterpart to truncate a file
                              to a specified length.

                              Possible Values: none, prealloc, trunc, falloc
                              Default: prealloc
                              Tags: #basic, #file

 -V, --check-integrity[=true|false] Check file integrity by validating piece
                              hashes or a hash of entire file. This option has
                              effect only in BitTorrent, Metalink downloads
                              with checksums or HTTP(S)/FTP downloads with
                              --checksum option. If piece hashes are provided,
                              this option can detect damaged portions of a file
                              and re-download them. If a hash of entire file is
                              provided, hash check is only done when file has
                              been already download. This is determined by file
                              length. If hash check fails, file is
                              re-downloaded from scratch. If both piece hashes
                              and a hash of entire file are provided, only
                              piece hashes are used.

                              Possible Values: true, false
                              Default: false
                              Tags: #basic, #metalink, #bittorrent, #file, #checksum

 -c, --continue[=true|false]  Continue downloading a partially downloaded
                              file. Use this option to resume a download
                              started by a web browser or another program
                              which downloads files sequentially from the
                              beginning. Currently this option is only
                              applicable to http(s)/ftp downloads.

                              Possible Values: true, false
                              Default: false
                              Tags: #basic, #http, #ftp

 -i, --input-file=FILE        Downloads URIs found in FILE. You can specify
                              multiple URIs for a single entity: separate
                              URIs on a single line using the TAB character.
                              Reads input from stdin when '-' is specified.
                              Additionally, options can be specified after each
                              line of URI. This optional line must start with
                              one or more white spaces and have one option per
                              single line. See INPUT FILE section of man page
                              for details. See also --deferred-input option.

                              Possible Values: /path/to/file, -
                              Tags: #basic

 -j, --max-concurrent-downloads=N Set maximum number of parallel downloads for
                              every static (HTTP/FTP) URL, torrent and metalink.
                              See also --split and --optimize-concurrent-downloads options.

                              Possible Values: 1-*
                              Default: 5
                              Tags: #basic

 -Z, --force-sequential[=true|false] Fetch URIs in the command-line sequentially
                              and download each URI in a separate session, like
                              the usual command-line download utilities.

                              Possible Values: true, false
                              Default: false
                              Tags: #basic

 -x, --max-connection-per-server=NUM The maximum number of connections to one
                              server for each download.

                              Possible Values: 1-16
                              Default: 1
                              Tags: #basic, #http, #ftp

 -k, --min-split-size=SIZE    aria2 does not split less than 2*SIZE byte range.
                              For example, let's consider downloading 20MiB
                              file. If SIZE is 10M, aria2 can split file into 2
                              range [0-10MiB) and [10MiB-20MiB) and download it
                              using 2 sources(if --split >= 2, of course).
                              If SIZE is 15M, since 2*15M > 20MiB, aria2 does
                              not split file and download it using 1 source.
                              You can append K or M(1K = 1024, 1M = 1024K).

                              Possible Values: 1048576-1073741824
                              Default: 20M
                              Tags: #basic, #http, #ftp

 --ftp-user=USER              Set FTP user. This affects all URLs.

                              Tags: #basic, #ftp

 --ftp-passwd=PASSWD          Set FTP password. This affects all URLs.

                              Tags: #basic, #ftp

 --http-user=USER             Set HTTP user. This affects all URLs.

                              Tags: #basic, #http

 --http-passwd=PASSWD         Set HTTP password. This affects all URLs.

                              Tags: #basic, #http

 --load-cookies=FILE          Load Cookies from FILE using the Firefox3 format
                              and Mozilla/Firefox(1.x/2.x)/Netscape format.

                              Possible Values: /path/to/file
                              Tags: #basic, #http, #cookie

 -S, --show-files[=true|false] Print file listing of .torrent, .meta4 and
                              .metalink file and exit. More detailed
                              information will be listed in case of torrent
                              file.

                              Possible Values: true, false
                              Default: false
                              Tags: #basic, #metalink, #bittorrent

 --max-overall-upload-limit=SPEED Set max overall upload speed in bytes/sec.
                              0 means unrestricted.
                              You can append K or M(1K = 1024, 1M = 1024K).
                              To limit the upload speed per torrent, use
                              --max-upload-limit option.

                              Possible Values: 0-*
                              Default: 0
                              Tags: #basic, #bittorrent

 -u, --max-upload-limit=SPEED Set max upload speed per each torrent in
                              bytes/sec. 0 means unrestricted.
                              You can append K or M(1K = 1024, 1M = 1024K).
                              To limit the overall upload speed, use
                              --max-overall-upload-limit option.

                              Possible Values: 0-*
                              Default: 0
                              Tags: #basic, #bittorrent

 -T, --torrent-file=TORRENT_FILE  The path to the .torrent file.

                              Possible Values: /path/to/file
                              Tags: #basic, #bittorrent

 --listen-port=PORT...        Set TCP port number for BitTorrent downloads.
                              Multiple ports can be specified by using ',',
                              for example: "6881,6885". You can also use '-'
                              to specify a range: "6881-6999". ',' and '-' can
                              be used together.

                              Possible Values: 1024-65535
                              Default: 6881-6999
                              Tags: #basic, #bittorrent

 --enable-dht[=true|false]    Enable IPv4 DHT functionality. It also enables
                              UDP tracker support. If a private flag is set
                              in a torrent, aria2 doesn't use DHT for that
                              download even if ``true`` is given.

                              Possible Values: true, false
                              Default: true
                              Tags: #basic, #bittorrent

 --dht-listen-port=PORT...    Set UDP listening port used by DHT(IPv4, IPv6)
                              and UDP tracker. Multiple ports can be specified
                              by using ',', for example: "6881,6885". You can
                              also use '-' to specify a range: "6881-6999".
                              ',' and '-' can be used together.

                              Possible Values: 1024-65535
                              Default: 6881-6999
                              Tags: #basic, #bittorrent

 --enable-dht6[=true|false]   Enable IPv6 DHT functionality.
                              Use --dht-listen-port option to specify port
                              number to listen on. See also --dht-listen-addr6
                              option.

                              Possible Values: true, false
                              Default: false
                              Tags: #basic, #bittorrent

 --dht-listen-addr6=ADDR      Specify address to bind socket for IPv6 DHT. 
                              It should be a global unicast IPv6 address of the
                              host.

                              Tags: #basic, #bittorrent

 -M, --metalink-file=METALINK_FILE The file path to the .meta4 and .metalink
                              file. Reads input from stdin when '-' is
                              specified.

                              Possible Values: /path/to/file, -
                              Tags: #basic, #metalink

URI, MAGNET, TORRENT_FILE, METALINK_FILE:
 You can specify multiple HTTP(S)/FTP URIs. Unless you specify -Z option, all
 URIs must point to the same file or downloading will fail.
 You can also specify arbitrary number of BitTorrent Magnet URIs, torrent/
 metalink files stored in a local drive. Please note that they are always
 treated as a separate download.

 You can specify both torrent file with -T option and URIs. By doing this,
 download a file from both torrent swarm and HTTP/FTP server at the same time,
 while the data from HTTP/FTP are uploaded to the torrent swarm. For single file
 torrents, URI can be a complete URI pointing to the resource or if URI ends
 with '/', 'name' in torrent file is added. For multi-file torrents, 'name' and
 'path' in torrent are added to form a URI for each file.

 Make sure that URI is quoted with single(') or double(") quotation if it
 contains "&" or any characters that have special meaning in shell.

About the number of connections
 Since 1.10.0 release, aria2 uses 1 connection per host by default and has 20MiB
 segment size restriction. So whatever value you specify using -s option, it
 uses 1 connection per host. To make it behave like 1.9.x, use
 --max-connection-per-server=4 --min-split-size=1M.
```

## Examples

### HTTP/HTTPS

```plain
aria2c https://example.com/linux-distro.iso
```

To potentially speed up things you can supply multiple sources for the same file (mirrors).

```plain
aria2c https://example.com/linux-distro.iso https://example.org/linux-distro.iso
```

```plain
$ aria2c https://releases.ubuntu.com/21.04/ubuntu-21.04-desktop-amd64.iso      

07/02 09:44:09 [NOTICE] Downloading 1 item(s)
 *** Download Progress Summary as of Fri Jul  2 09:45:09 2021 ***                                                                                                                                                   
====================================================================================================================================================================================================================
[#65c0da 1.0GiB/2.6GiB(40%) CN:1 DL:19MiB ETA:1m23s]
FILE: /root/ubuntu-21.04-desktop-amd64.iso
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 *** Download Progress Summary as of Fri Jul  2 09:46:09 2021 ***                                                                                                                                                   
====================================================================================================================================================================================================================
[#65c0da 2.2GiB/2.6GiB(83%) CN:1 DL:20MiB ETA:21s]
FILE: /root/ubuntu-21.04-desktop-amd64.iso
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[#65c0da 2.6GiB/2.6GiB(99%) CN:1 DL:20MiB]                                                                                                                                                                          
07/02 09:46:31 [NOTICE] Download complete: /root/ubuntu-21.04-desktop-amd64.iso

Download Results:
gid   |stat|avg speed  |path/URI
======+====+===========+=======================================================
65c0da|OK  |    18MiB/s|/root/ubuntu-21.04-desktop-amd64.iso

Status Legend:
(OK):download completed.
```

### Torrents

```plain
aria2c linux-distro.torrent
```

```plain
aria2c https://example.com/linux-distro.torrent
```

### Magnet Links

```plain
aria2c magnet:?xt=urn:btih:1e99d95f1764644a86a8e99bfd80c ...
```

### (S)FTP

```plain
aria2c ftp://example.com/linux-distro.iso
```

## URL List

- [Github.com - Aria2](https://github.com/aria2/aria2)
- [UUPdump.net](https://uupdump.net/)
- [Linuxconfig.org - aria2 - all in one command line download tool](https://linuxconfig.org/aria2-all-in-one-command-line-download-tool)
