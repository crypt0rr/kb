---
title : "Fawkes"
# pre : ' '
description : "A tool to search for targets vulnerable to SQL Injection. Performs the search using Google search engine."
date : 2020-12-22T12:45:39+01:00
# hidden : true
# draft : true
weight : 630
# tags : ['']
---

---

Tool to search for targets vulnerable to SQL Injection. Performs the search using Google search engine.

## Installation

```plain
git clone https://github.com/0xdutra/fawkes
cd fawkes
python3 -m pip install -r requirements.txt
```

## Usage

```plain
python3 fawkes.py [options]
```

## Flags

```plain
███████╗ █████╗ ██╗    ██╗██╗  ██╗███████╗███████╗
██╔════╝██╔══██╗██║    ██║██║ ██╔╝██╔════╝██╔════╝
█████╗  ███████║██║ █╗ ██║█████╔╝ █████╗  ███████╗
██╔══╝  ██╔══██║██║███╗██║██╔═██╗ ██╔══╝  ╚════██║
██║     ██║  ██║╚███╔███╔╝██║  ██╗███████╗███████║
╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝

Author: @0xdutra
Version: 1.0.0
Bugs: https://github.com/0xdutra/fawkes/issues
---------------------------------------------------
    
usage: 
    -q, --query      - Dork that will be used in the search engine.
    -r, --results    - Number of results brought by the search engine.
    -s, --start-page - Home page of search results.
    -t, --timeout    - Timeout of requests.
    -v, --verbose    - Enable verbosity.

Examples:
    fawkes --query 'noticias.php?id=10' --timeout 3 --verbose
    fawkes --query 'admin.php?id=1' --timeout 3 --verbose

```

## Examples

```plain
$ python3 fawkes.py --query 'noticias.php?id=10' --timeout 3 --verbose

███████╗ █████╗ ██╗    ██╗██╗  ██╗███████╗███████╗
██╔════╝██╔══██╗██║    ██║██║ ██╔╝██╔════╝██╔════╝
█████╗  ███████║██║ █╗ ██║█████╔╝ █████╗  ███████╗
██╔══╝  ██╔══██║██║███╗██║██╔═██╗ ██╔══╝  ╚════██║
██║     ██║  ██║╚███╔███╔╝██║  ██╗███████╗███████║
╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝

Author: @0xdutra
Version: 1.0.0
Bugs: https://github.com/0xdutra/fawkes/issues
---------------------------------------------------
    
Random google URL: https://www.google.pn/search
Random User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36
Number of targets: 93
-------------------------------------------------------------------------------
[SUCCESS] - http://car.fpbadminton.com/noticias.php?id=10'
[ERROR] - http://car.fpbadminton.com/noticias.php?id=10'
[SUCCESS] - http://kansascitynova.org/news.php?id=42'
[ERROR] - http://kansascitynova.org/news.php?id=42'
[SUCCESS] - https://esevidasinu.gov.co/noticias.php?id=18'
[ERROR] - https://esevidasinu.gov.co/noticias.php?id=18'
```

## URL List

- [Github.com - fawkes](https://github.com/0xdutra/fawkes)
