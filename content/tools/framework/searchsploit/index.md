---
title : "SearchSploit"
# pre : ' '
description : "SearchSploit gives you the power to perform detailed off-line searches through your locally checked-out copy of the repository."
date : 2021-06-18T15:25:16+02:00
# hidden : true
# draft : true
weight : 380
# tags : ['']
---

---

Gives you the power to perform detailed off-line searches through your locally checked-out copy of the repository

## Installation

```plain
sudo apt install searchsploit
```

## Usage

```plain
searchsploit [options] term1 [term2] ... [termN]
```

## Flags

```plain
==========
 Examples 
==========
  searchsploit afd windows local
  searchsploit -t oracle windows
  searchsploit -p 39446
  searchsploit linux kernel 3.2 --exclude="(PoC)|/dos/"
  searchsploit -s Apache Struts 2.0.0
  searchsploit linux reverse password
  searchsploit -j 55555 | json_pp

  For more examples, see the manual: https://www.exploit-db.com/searchsploit

=========
 Options 
=========
## Search Terms
   -c, --case     [Term]      Perform a case-sensitive search (Default is inSEnsITiVe)
   -e, --exact    [Term]      Perform an EXACT & order match on exploit title (Default is an AND match on each term) [Implies "-t"]
                                e.g. "WordPress 4.1" would not be detect "WordPress Core 4.1")
   -s, --strict               Perform a strict search, so input values must exist, disabling fuzzy search for version range
                                e.g. "1.1" would not be detected in "1.0 < 1.3")
   -t, --title    [Term]      Search JUST the exploit title (Default is title AND the file's path)
       --exclude="term"       Remove values from results. By using "|" to separate, you can chain multiple values
                                e.g. --exclude="term1|term2|term3"

## Output
   -j, --json     [Term]      Show result in JSON format
   -o, --overflow [Term]      Exploit titles are allowed to overflow their columns
   -p, --path     [EDB-ID]    Show the full path to an exploit (and also copies the path to the clipboard if possible)
   -v, --verbose              Display more information in output
   -w, --www      [Term]      Show URLs to Exploit-DB.com rather than the local path
       --id                   Display the EDB-ID value rather than local path
       --colour               Disable colour highlighting in search results

## Non-Searching
   -m, --mirror   [EDB-ID]    Mirror (aka copies) an exploit to the current working directory
   -x, --examine  [EDB-ID]    Examine (aka opens) the exploit using $PAGER

## Non-Searching
   -h, --help                 Show this help screen
   -u, --update               Check for and install any exploitdb package updates (brew, deb & git)

## Automation
       --nmap     [file.xml]  Checks all results in Nmap's XML output with service version
                                e.g.: nmap [host] -sV -oX file.xml

=======
 Notes 
=======
 - You can use any number of search terms
 - By default, search terms are not case-sensitive, ordering is irrelevant, and will search between version ranges
   - Use '-c' if you wish to reduce results by case-sensitive searching
   - And/Or '-e' if you wish to filter results by using an exact match
   - And/Or '-s' if you wish to look for an exact version match
 - Use '-t' to exclude the file's path to filter the search results
   - Remove false positives (especially when searching using numbers - i.e. versions)
 - When using '--nmap', adding '-v' (verbose), it will search for even more combinations
 - When updating or displaying help, search terms will be ignored
```

## Examples

### Search for exploits

```plain
# searchsploit sweetrice
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------------------------
 Exploit Title                                                                                                                                                                                              |  Path
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------------------------
SweetRice 0.5.3 - Remote File Inclusion                                                                                                                                                                     | php/webapps/10246.txt
SweetRice 0.6.7 - Multiple Vulnerabilities                                                                                                                                                                  | php/webapps/15413.txt
SweetRice 1.5.1 - Arbitrary File Download                                                                                                                                                                   | php/webapps/40698.py
SweetRice 1.5.1 - Arbitrary File Upload                                                                                                                                                                     | php/webapps/40716.py
SweetRice 1.5.1 - Backup Disclosure                                                                                                                                                                         | php/webapps/40718.txt
SweetRice 1.5.1 - Cross-Site Request Forgery                                                                                                                                                                | php/webapps/40692.html
SweetRice 1.5.1 - Cross-Site Request Forgery / PHP Code Execution                                                                                                                                           | php/webapps/40700.html
SweetRice < 0.6.4 - 'FCKeditor' Arbitrary File Upload                                                                                                                                                       | php/webapps/14184.txt
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------------------------
Shellcodes: No Results
```

### Copy exploit to current directory

```plain
# searchsploit -m php/webapps/40698.py
  Exploit: SweetRice 1.5.1 - Arbitrary File Download
      URL: https://www.exploit-db.com/exploits/40698
     Path: /usr/share/exploitdb/exploits/php/webapps/40698.py
File Type: Python script, ASCII text executable, with CRLF line terminators

Copied to: /root/40698.py
```

## URL List

- [Exploit-db.com - Searchsploit](https://www.exploit-db.com/searchsploit)
- [Exploit-db.com - Offsec-Searchsploit.pdf](https://www.exploit-db.com/documentation/Offsec-SearchSploit.pdf)
- [Github.com - ExploitDB](https://github.com/offensive-security/exploitdb)
