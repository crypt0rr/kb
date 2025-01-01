---
title : "CeWL"
# pre : ' '
description : "CeWL - Custom Word List generator."
date : 2021-10-28T13:47:56+02:00
# hidden : true
# draft : true
weight : 300
# tags : ['']
---

---

Based on a discussion on PaulDotCom (episode 129) about creating custom word lists spidering a targets website and collecting unique words I decided to write CeWL, the Custom Word List generator. CeWL is a ruby app which spiders a given URL to a specified depth, optionally following external links, and returns a list of words which can then be used for password crackers such as John the Ripper.

By default, CeWL sticks to just the site you have specified and will go to a depth of 2 links, this behaviour can be changed by passing arguments. Be careful if setting a large depth and allowing it to go offsite, you could end up drifting on to a lot of other domains. All words of three characters and over are output to stdout. This length can be increased and the words can be written to a file rather than screen so the app can be automated.

CeWL also has an associated command line app, FAB (Files Already Bagged) which uses the same meta data extraction techniques to create author/creator lists from already downloaded.

## Installation

Please use Kali or install from source.

```plain
git clone https://github.com/digininja/CeWL/
gem install bundler
bundle install
```

## Usage

```plain
cewl [OPTIONS] ... <url>
```

## Flags

```plain
CeWL 5.5.2 (Grouping) Robin Wood (robin@digi.ninja) (https://digi.ninja/)
OPTIONS:
-h, --help: Show help.
-k, --keep: Keep the downloaded file.
-d <x>,--depth <x>: Depth to spider to, default 2.
-m, --min_word_length: Minimum word length, default 3.
-o, --offsite: Let the spider visit other sites.
--exclude: A file containing a list of paths to exclude
--allowed: A regex pattern that path must match to be followed
-w, --write: Write the output to the file.
-u, --ua <agent>: User agent to send.
-n, --no-words: Don't output the wordlist.
-g <x>, --groups <x>: Return groups of words as well
--lowercase: Lowercase all parsed words
--with-numbers: Accept words with numbers in as well as just letters
--convert-umlauts: Convert common ISO-8859-1 (Latin-1) umlauts (ä-ae, ö-oe, ü-ue, ß-ss)
-a, --meta: include meta data.
--meta_file file: Output file for meta data.
-e, --email: Include email addresses.
--email_file <file>: Output file for email addresses.
--meta-temp-dir <dir>: The temporary directory used by exiftool when parsing files, default /tmp.
-c, --count: Show the count for each word found.
-v, --verbose: Verbose.
--debug: Extra debug information.

Authentication
--auth_type: Digest or basic.
--auth_user: Authentication username.
--auth_pass: Authentication password.

Proxy Support
--proxy_host: Proxy host.
--proxy_port: Proxy port, default 8080.
--proxy_username: Username for proxy, if required.
--proxy_password: Password for proxy, if required.

Headers
--header, -H: In format name:value - can pass multiple.

<url>: The site to spider.
```

## Examples

### Basic wordlist creation from URL

```plain
$ cewl -v -w loremipsum https://www.lipsum.com/
CeWL 5.5.2 (Grouping) Robin Wood (robin@digi.ninja) (https://digi.ninja/)
Starting at https://www.lipsum.com/
Visiting: https://www.lipsum.com/, got response code 200
Attribute text found:
Banners Banners Banners 

Offsite link, not following: http://hy.lipsum.com/
Offsite link, not following: http://sq.lipsum.com/
[...]
Offsite link, not following: http://sk.lipsum.com/
Offsite link, not following: http://vi.lipsum.com/
Visiting: https://www.lipsum.com:443/privacy.pdf referred from https://www.lipsum.com/, got response code 200
Writing words to file


$ head loremipsum 
the
and
Lorem
Ipsum
pain
from
dolor
sit
who
pleasure
```

### Follow links on pages

```plain
$ cewl -v -o -w loremipsum https://www.lipsum.com/
CeWL 5.5.2 (Grouping) Robin Wood (robin@digi.ninja) (https://digi.ninja/)
Starting at https://www.lipsum.com/
Visiting: https://www.lipsum.com/, got response code 200
Attribute text found:
Banners Banners Banners 

Visiting: http://gtklipsum.sourceforge.net/ referred from https://www.lipsum.com/, got response code 200
Attribute text found:
Screenshot. Click for more SourceForge.net Logo Valid XHTML 1.1 Valid CSS! 

Visiting: http://groovyconsole.appspot.com/script/64002 referred from https://www.lipsum.com/, got response code 200
Attribute text found:
subscribe to the feed Groovy Web Console snippets atom feed 

Visiting: https://www.lipsum.com:443/privacy.pdf referred from https://www.lipsum.com/, got response code 200
Visiting: https://hy.lipsum.com/ referred from http://hy.lipsum.com/, got response code 200
Attribute text found:
Banners Banners Banners 

Visiting: https://sq.lipsum.com/ referred from http://sq.lipsum.com/, got response code 200
Attribute text found:
Banners Banners Banners 

[...]

Writing words to file
```

### Scrape words using specific User Agent

```plain
cewl -m 3 https://kb.offsec.nl/ -u "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36" -d 0 -w offsec.txt
```

## URL List

- [Digi.ninja - cewl](https://digi.ninja/projects/cewl.php)
- [Github.com - cewl](https://github.com/digininja/CeWL/)
