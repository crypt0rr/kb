---
title : "Figlet"
# pre : ' '
description : "Creating ASCII text banners or large letters out of ordinary text."
date : 2021-03-17T12:10:30+01:00
# hidden : true
# draft : true
weight : 650
# tags : ['']
---

---

Creating ASCII text banners or large letters out of ordinary text.

## Installation

```plain
sudo apt install figlet
```

## Usage

```plain
Usage: figlet [ -cklnoprstvxDELNRSWX ] [ -d fontdirectory ]
              [ -f fontfile ] [ -m smushmode ] [ -w outputwidth ]
              [ -C controlfile ] [ -I infocode ] [ message ]
```

## Examples

### Default usage and font

```plain
$ figlet yourtexthere          
                        _            _   _                   
 _   _  ___  _   _ _ __| |_ _____  _| |_| |__   ___ _ __ ___ 
| | | |/ _ \| | | | '__| __/ _ \ \/ / __| '_ \ / _ \ '__/ _ \
| |_| | (_) | |_| | |  | ||  __/>  <| |_| | | |  __/ | |  __/
 \__, |\___/ \__,_|_|   \__\___/_/\_\\__|_| |_|\___|_|  \___|
 |___/      
```

### Use another font

Fonts are located in `/usr/share/figlet`

```plain
$ figlet -f script yourtexthere
                                        _                   
                                       | |                  
       __          ,_  _|_  _      _|_ | |     _   ,_    _  
|   | /  \_|   |  /  |  |  |/  /\/  |  |/ \   |/  /  |  |/  
 \_/|/\__/  \_/|_/   |_/|_/|__/ /\_/|_/|   |_/|__/   |_/|__/
   /|                                                       
   \|         
```

## URL List

- [Linux.com - Fun With the Figlet And Toilet Commands](https://www.linux.com/training-tutorials/linux-tips-fun-figlet-and-toilet-commands/)
