---
title : "Pymeta"
# pre : ' '
description : "Uses specially crafted search queries to identify and download the following file types (pdf, xls, xlsx, csv, doc, docx, ppt, pptx) from a given domain using Google and Bing scraping."
date : 2020-08-03T11:14:30+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Pymeta

Scrape the internet for files and EXIF data.

### Installation

```plain
git clone https://github.com/m8r0wn/pymeta
cd pymeta
sudo python3 setup.py install
```

```plain
pip3 install pymetadata
```

### Usage

```plain
pymeta -d example.com -s all -csv
pymeta -d example.org -s bing
pymeta -dir my_files/
```

### Flags

```plain
            PyMeta v.1.0.4
   -----------------------------------
Search the web for files on the targeted domain
and extract metadata.

optional arguments:
  -h, --help            show this help message and exit

Target Options:
  -d DOMAIN             Target domain
  -dir FILE_DIR         Pre-existing directory of files

Search Options:
  -s {google,bing,all}  Search engine(s) to scrape
  -m MAX_RESULTS        Max results per file type, per search engine (Default: 50)
  -j JITTER             Seconds between search requests (Default: 2)

Output Options:
  -o OUTPUT_DIR         Path to store PyMeta's download folder (Default: ./)
  -f FILENAME           Custom report path/name.csv
  --debug               Show links as they are collected during scraping
```

### Examples

```plain
$ pymeta -d example.com

[*] Starting PyMeta web scraper
[*] Extension  |  Number of New Files Found  |  Search URL
[*] pdf : 50 https://www.google.com/search?q=site:example.com+filetype:pdf&num=100&start=0
[*] pdf :  6 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=0
[*] pdf :  7 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=43
[*] pdf :  9 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=82
[*] pdf :  9 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=120
[*] pdf :  4 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=157
[*] pdf :  7 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=195
[*] pdf :  7 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=233
[*] pdf :  0 http://www.bing.com/search?q=site:example.com%20filetype:pdf&first=270
[*] xls :  0 https://www.google.com/search?q=site:example.com+filetype:xls&num=100&start=0
[*] xls :  2 http://www.bing.com/search?q=site:example.com%20filetype:xls&first=0
[*] xls :  0 http://www.bing.com/search?q=site:example.com%20filetype:xls&first=32
[*] xlsx:  0 https://www.google.com/search?q=site:example.com+filetype:xlsx&num=100&start=0
[*] xlsx:  0 http://www.bing.com/search?q=site:example.com%20filetype:xlsx&first=0
[*] csv :  0 https://www.google.com/search?q=site:example.com+filetype:csv&num=100&start=0
[*] csv :  0 http://www.bing.com/search?q=site:example.com%20filetype:csv&first=0
[*] doc :  0 https://www.google.com/search?q=site:example.com+filetype:doc&num=100&start=0
[*] doc :  0 http://www.bing.com/search?q=site:example.com%20filetype:doc&first=0
[*] docx:  0 https://www.google.com/search?q=site:example.com+filetype:docx&num=100&start=0
[*] docx:  0 http://www.bing.com/search?q=site:example.com%20filetype:docx&first=0
[*] ppt :  0 https://www.google.com/search?q=site:example.com+filetype:ppt&num=100&start=0
[*] ppt :  0 http://www.bing.com/search?q=site:example.com%20filetype:ppt&first=0
[*] pptx:  0 https://www.google.com/search?q=site:example.com+filetype:pptx&num=100&start=0
[*] pptx:  0 http://www.bing.com/search?q=site:example.com%20filetype:pptx&first=0
[*] Downloading 101 files to: ./example_meta/
[*] Extracting Metadata...
[*] Adding source URL's to the report
[+] Report complete: example_meta.csv
```

### URL list

* [GitHub.com - pymeta](https://github.com/m8r0wn/pymeta)
