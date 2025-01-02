---
title : "MANSPIDER"
# pre : ' '
description : "Scan for juicy data on SMB shares. Matching files and logs are stored in $HOME/.manspider. All filters are case-insensitive."
date : 2024-06-18T15:58:48+02:00
# hidden : true
# draft : true
weight : 1110
tags : ['Other', 'SMB']
---

---

Scan for juicy data on SMB shares. Matching files and logs are stored in $HOME/.manspider. All filters are case-insensitive.

File types supported:

- `PDF`
- `DOCX`
- `XLSX`
- `PPTX`
- any text-based format
- and many more!!

## Installation

Prerequisites

```plain
sudo apt install tesseract-ocr antiword
pip install pdf2txt
wget https://raw.githubusercontent.com/blacklanternsecurity/MANSPIDER/master/requirements.txt && pip install -r requirements.txt
```

```plain
pipx install git+https://github.com/blacklanternsecurity/MANSPIDER
```

## Usage

```plain
manspider [-h] [-u USERNAME] [-p PASSWORD] [-d DOMAIN] [-l LOOT_DIR] [-m MAXDEPTH] [-H HASH] [-t THREADS] [-f REGEX [REGEX ...]] [-e EXT [EXT ...]] [--exclude-extensions EXT [EXT ...]] [-c REGEX [REGEX ...]]
                 [--sharenames SHARE [SHARE ...]] [--exclude-sharenames [SHARE ...]] [--dirnames DIR [DIR ...]] [--exclude-dirnames DIR [DIR ...]] [-q] [-n] [-mfail INT] [-o] [-s SIZE] [-v]
                 targets [targets ...]
```

## Flags

```plain
positional arguments:
  targets               IPs, Hostnames, CIDR ranges, or files containing targets to spider (NOTE: local searching also supported, specify directory name or keyword "loot" to search downloaded files)

options:
  -h, --help            show this help message and exit
  -u USERNAME, --username USERNAME
                        username for authentication
  -p PASSWORD, --password PASSWORD
                        password for authentication
  -d DOMAIN, --domain DOMAIN
                        domain for authentication
  -l LOOT_DIR, --loot-dir LOOT_DIR
                        loot directory (default ~/.manspider/)
  -m MAXDEPTH, --maxdepth MAXDEPTH
                        maximum depth to spider (default: 10)
  -H HASH, --hash HASH  NTLM hash for authentication
  -t THREADS, --threads THREADS
                        concurrent threads (default: 5)
  -f REGEX [REGEX ...], --filenames REGEX [REGEX ...]
                        filter filenames using regex (space-separated)
  -e EXT [EXT ...], --extensions EXT [EXT ...]
                        only show filenames with these extensions (space-separated, e.g. `docx xlsx` for only word & excel docs)
  --exclude-extensions EXT [EXT ...]
                        ignore files with these extensions
  -c REGEX [REGEX ...], --content REGEX [REGEX ...]
                        search for file content using regex (multiple supported)
  --sharenames SHARE [SHARE ...]
                        only search shares with these names (multiple supported)
  --exclude-sharenames [SHARE ...]
                        don't search shares with these names (multiple supported)
  --dirnames DIR [DIR ...]
                        only search directories containing these strings (multiple supported)
  --exclude-dirnames DIR [DIR ...]
                        don't search directories containing these strings (multiple supported)
  -q, --quiet           don't display matching file content
  -n, --no-download     don't download matching files
  -mfail INT, --max-failed-logons INT
                        limit failed logons
  -o, --or-logic        use OR logic instead of AND (files are downloaded if filename OR extension OR content match)
  -s SIZE, --max-filesize SIZE
                        don't retrieve files over this size, e.g. "500K" or ".5M" (default: 10M)
  -v, --verbose         show debugging messages


    # EXAMPLES

    Example 1: Search the network for filenames that may contain creds
    $ manspider 192.168.0.0/24 -f passw user admin account network login logon cred -d evilcorp -u bob -p Passw0rd

    Example 2: Search for XLSX files containing "password"
    $ manspider share.evilcorp.local -c password -e xlsx -d evilcorp -u bob -p Passw0rd

    Example 3: Search for interesting file extensions
    $ manspider share.evilcorp.local -e bat com vbs ps1 psd1 psm1 pem key rsa pub reg txt cfg conf config -d evilcorp -u bob -p Passw0rd

    Example 4: Search for finance-related files
    $ manspider share.evilcorp.local --dirnames bank financ payable payment reconcil remit voucher vendor eft swift -f '[0-9]{5,}' -d evilcorp -u bob -p Passw0rd
```

## Examples

```plain
$ manspider 10.10.10.1 -c cpassword -d offsec.nl -u crypt0rr -p 'Welkom1234'
[+] MANSPIDER command executed: /home/crypt0rr/.local/bin/manspider 10.10.10.1 -c cpassword -d offsec.nl -u crypt0rr -p Welkom1234
[+] Skipping files larger than 10.00MB
[+] Using 5 threads
[+] Searching by file content: "cpassword"
[+] Matching files will be downloaded to /home/crypt0rr/.manspider/loot
[+] 10.10.10.1: Successful login as "crypt0rr"
[+] 10.10.10.1: Successful login as "crypt0rr"
[+] 10.10.10.1\SYSVOL\offsec.nl\Policies\{F223E31D-877B-48D0-954F-1337}\Machine\Preferences\Groups\Groups.xml: matched "cpassword" 2 times
[+] <Groups clsid="{3125E937-EB16-4b4c-9934-1337}"><User clsid="{DF5F1855-51E5-4d24-8B1A-1337}" name="Administrator (built-in)" image="2" changed="2020-09-25 21:41:31" uid="{CFA82C95-524F-49A9-A7B2-1337}" userContext="0" removePolicy="0"><Properties action="U" newName="" fullName="" description="" cpassword="Pe81R/eXjjPtd5oJw6D0hifqz78ezVt7tD0ViS9eTg+z2dKIvfwMRbD5JPFEA26i" changeLogon="0" noChange="0" neverExpires="1" acctDisabled="0" userName="Administrator (built-in)" expires="2028-01-25"/><Filters><FilterRunOnce hidden                                                                                                                                                                            
[+] Finished spidering 10.10.10.1
```

## URL list

- [Github.com - MANSPIDER](https://github.com/blacklanternsecurity/MANSPIDER)
