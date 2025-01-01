---
title : "DIRB"
# pre : ' '
description : "DIRB is a Web Content Scanner."
date : 2022-10-09T17:25:06+02:00
# hidden : true
# draft : true
weight : 460
tags : ['Other', 'Brute Force', 'Web Application']
---

---

DIRB is a Web Content Scanner. It looks for existing (and/or hidden) Web Objects. It basically works by launching a dictionary based attack against a web server and analyzing the response.

DIRB comes with a set of pre-configured attack word lists for easy usage but you can use your custom word lists. Also DIRB sometimes can be used as a classic CGI scanner, but remember is a content scanner not a vulnerability scanner.

DIRB main purpose is to help in professional web application auditing. Specially in security related testing. It covers some holes not covered by classic web vulnerability scanners. DIRB looks for specific web objects that other generic CGI scanners can't look for. It doesn't search vulnerabilities nor does it look for web contents that can be vulnerables.

## Installation

By default installed in [Kali Linux](https://www.kali.org/).

```plain
sudo apt install dirb
```

## Usage

```plain
dirb <url_base> [<wordlist_file(s)>] [options]
```

## Flags

```plain
========================= NOTES =========================
 <url_base> : Base URL to scan. (Use -resume for session resuming)
 <wordlist_file(s)> : List of wordfiles. (wordfile1,wordfile2,wordfile3...)

======================== HOTKEYS ========================
 'n' -> Go to next directory.
 'q' -> Stop scan. (Saving state for resume)
 'r' -> Remaining scan stats.

======================== OPTIONS ========================
 -a <agent_string> : Specify your custom USER_AGENT.
 -b : Use path as is.
 -c <cookie_string> : Set a cookie for the HTTP request.
 -E <certificate> : path to the client certificate.
 -f : Fine tunning of NOT_FOUND (404) detection.
 -H <header_string> : Add a custom header to the HTTP request.
 -i : Use case-insensitive search.
 -l : Print "Location" header when found.
 -N <nf_code>: Ignore responses with this HTTP code.
 -o <output_file> : Save output to disk.
 -p <proxy[:port]> : Use this proxy. (Default port is 1080)
 -P <proxy_username:proxy_password> : Proxy Authentication.
 -r : Don't search recursively.
 -R : Interactive recursion. (Asks for each directory)
 -S : Silent Mode. Don't show tested words. (For dumb terminals)
 -t : Don't force an ending '/' on URLs.
 -u <username:password> : HTTP Authentication.
 -v : Show also NOT_FOUND pages.
 -w : Don't stop on WARNING messages.
 -X <extensions> / -x <exts_file> : Append each word with this extensions.
 -z <millisecs> : Add a milliseconds delay to not cause excessive Flood.
```

## Examples

```plain
 dirb http://url/directory/ (Simple Test)
 dirb http://url/ -X .html (Test files with '.html' extension)
 dirb http://url/ /usr/share/dirb/wordlists/vulns/apache.txt (Test with apache.txt wordlist)
 dirb https://secure_url/ (Simple Test with SSL)
```

- `-r` - Don't search recursively.
- `-z <millisecs>` - Add a milliseconds delay to not cause excessive Flood.

```plain
$ dirb http://www.megacorpone.com -r -z 10

-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Sun Oct  9 17:27:31 2022
URL_BASE: http://www.megacorpone.com/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt
OPTION: Not Recursive
SPEED_DELAY: 10 milliseconds

-----------------

GENERATED WORDS: 4612  

---- Scanning URL: http://www.megacorpone.com/ ----
+ http://www.megacorpone.com/admin (CODE:403|SIZE:284)   
==> DIRECTORY: http://www.megacorpone.com/assets/   
+ http://www.megacorpone.com/index.html (CODE:200|SIZE:14603)     
==> DIRECTORY: http://www.megacorpone.com/old-site/   
+ http://www.megacorpone.com/robots.txt (CODE:200|SIZE:43)   
+ http://www.megacorpone.com/server-status (CODE:403|SIZE:284)
-----------------
END_TIME: Sun Oct  9 17:38:35 2022
DOWNLOADED: 4612 - FOUND: 4
```

## URL List

- [Kali.org - dirb](https://www.kali.org/tools/dirb/)
- [Github.com - dirb](https://github.com/Seabreg/dirb)
