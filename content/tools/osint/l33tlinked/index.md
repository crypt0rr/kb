---
title : "L333tlinked"
# pre : ' '
description : "Modified version of CrossLinked."
date : 2021-09-16T11:07:49+02:00
# hidden : true
# draft : true
weight : 0
tags: ['Other','LinkedIn']
---

## L333tlinked

Modified version of CrossLinked.

Welcome to my modification of CrossLinked (Can be found [here](https://github.com/m8r0wn/CrossLinked)). Crosslink/L33tLinked is a LinkedIn scraping tool that utilizes both Google and Bing to grab LinkedIn profiles. Whats the use for this? Well, collecting all known employees in a comapny can be used on a red-team op for searching for employees that are involved in Data Breaches. It's simple enough to take the info you'll recieve here and run the info through the Dehashed/Have I Been Pwned API to determine if the user was affected by a data breach!

## Installation

```plain
git clone https://github.com/Sq00ky/L33tLinked.git
cd L33tLinked
python3 -m pip install -r requirements.txt
```

## Usage

```plain
python3 ./leetlinked.py [OPTIONS]
```

## Flags

```plain
positional arguments:
  company_name          Target company name

optional arguments:
  -h, --help            show this help message and exit
  -t TIMEOUT            Timeout [seconds] for search threads (Default: 25)
  -j JITTER             Jitter for scraping evasion (Default: 0)
  -s, --safe            Only parse names with company in title (Reduces false positives)
  -e EMAIL_DOMAIN, --email-domain EMAIL_DOMAIN
                        Include the email domain for email-generation (Example: microsoft.com)
  -p HIBP, --hibp HIBP  Runs all of the emails through HaveIBeenPwned's API and will list pwned accounts, API key is a required argument.
  -f EMAIL_FORMAT, --email-format EMAIL_FORMAT
                        Generates emails based on various formats, 1=jsmith 2=johnsmith 3=johns 4=smithj 5=john.smith 6=smith.john 7=smith
```

## Examples

```plain
$ python3 leetlinked.py example -e example.lcom -f 5  



 /$$                             /$$     /$$       /$$           /$$                       /$$
| $$                            | $$    | $$      |__/          | $$                      | $$
| $$        /$$$$$$   /$$$$$$  /$$$$$$  | $$       /$$ /$$$$$$$ | $$   /$$  /$$$$$$   /$$$$$$$
| $$       /$$__  $$ /$$__  $$|_  $$_/  | $$      | $$| $$__  $$| $$  /$$/ /$$__  $$ /$$__  $$
| $$      | $$$$$$$$| $$$$$$$$  | $$    | $$      | $$| $$  \ $$| $$$$$$/ | $$$$$$$$| $$  | $$
| $$      | $$_____/| $$_____/  | $$ /$$| $$      | $$| $$  | $$| $$_  $$ | $$_____/| $$  | $$
| $$$$$$$$|  $$$$$$$|  $$$$$$$  |  $$$$/| $$$$$$$$| $$| $$  | $$| $$ \  $$|  $$$$$$$|  $$$$$$$
|________/ \_______/ \_______/   \___/  |________/|__/|__/  |__/|__/  \__/ \_______/ \_______/
                                                                                              
Based off of https://github.com/m8r0wn/CrossLinked
Modified by Ronnie Bartwitz and @Horshark on Github
Email format john.smith@company.xyz chosen

Scrape Complete! Results saved to /L33tLinked/exaScraped.xls
```

![Example](images/example.png)

## URL List

* [Github.com - LeetLinked](https://github.com/Sq00ky/LeetLinked)
