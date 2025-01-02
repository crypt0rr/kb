---
title : "OneDriveExplorer"
# pre : ' '
description : "OneDriveExplorer is a command line and GUI based application for reconstructing the folder structure of OneDrive from the <UserCid>.dat file."
date : 2022-02-08T10:28:18+01:00
# hidden : true
# draft : true
weight : 210
# tags : ['']
---

---

OneDriveExplorer is a command line and GUI based application for reconstructing the folder structure of OneDrive from the `.\<UserCid>.dat` file.

### GUI

The GUI consists of two panes: the folder structure on the left and details on the right. By clicking on one of the entries in the left pane, the details pane will populate with various data such as name, whether it is a file or folder, UUIDs and the number of children, if any.

### File Location

This may be different on your system / installation.

```plain
C:\Users\<USERNAME>\AppData\Local\Microsoft\OneDrive\settings\Personal\<UserCid.dat>
C:\Users\<USERNAME>\AppData\Local\Microsoft\OneDrive\settings\Business1\<UserCid.dat>
```

## Installation

```plain
git clone https://github.com/Beercow/OneDriveExplorer.git
```

## Usage

```plain
OneDriveExplorer.py [-h] [-f FILE] [-o OUTFILE] [--pretty]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -f FILE, --file FILE  <UserCid>.dat file to be parsed
  -o OUTFILE, --outfile OUTFILE
                        File name to save json representation to. When pressent, overrides default name
  --pretty              When exporting to json, use a more human readable layout. Default is FALSE
```

## Examples

```plain
$ python3 OneDriveExplorer.py -f 4f241cd83085182d.dat --pretty

     _____                ___                           ___                 _
    (  _  )              (  _`\        _               (  _`\              (_ )
    | ( ) |  ___     __  | | ) | _ __ (_) _   _    __  | (_(_)       _ _    | |    _    _ __   __   _ __
    | | | |/' _ `\ /'__`\| | | )( '__)| |( ) ( ) /'__`\|  _)_ (`\/')( '_`\  | |  /'_`\ ( '__)/'__`\( '__)
    | (_) || ( ) |(  ___/| |_) || |   | || \_/ |(  ___/| (_( ) >  < | (_) ) | | ( (_) )| |  (  ___/| |
    (_____)(_) (_)`\____)(____/'(_)   (_)`\___/'`\____)(____/'(_/\_)| ,__/'(___)`\___/'(_)  `\____)(_) v2022.02.08
                                                                    | |        by @bmmaloney97
                                                                    (_)
    
[======================================================------] 89.2% ...Building folder list. Please wait....

[======================================================------] 89.2% ...Recreating OneDrive folder. Please wait....
```

```plain
$ cat OneDrive.json 
{
    "Folder_UUID": "",
    "Object_UUID": "4F241CD83085182D!105",
    "Type": "Folder",
    "Name": "Root",
    "Children": [
        {
            "Folder_UUID": "4F241CD83085182D!105",
            "Object_UUID": "4F241CD83085182D!107",
            "Type": "File",
            "Name": "Pictures"
        },
        {
            "Folder_UUID": "4F241CD83085182D!105",
            "Object_UUID": "4F241CD83085182D!108",
            "Type": "File",
            "Name": "Public"
        },
        {
            "Folder_UUID": "4F241CD83085182D!105",
            "Object_UUID": "4F241CD83085182D!106",
            "Type": "Folder",
            "Name": "Documents",
            "Children": [
                {
                    "Folder_UUID": "4F241CD83085182D!106",
                    "Object_UUID": "4F241CD83085182D!601",
                    "Type": "File",
                    "Name": "New folder"
                },
                {
                    "Folder_UUID": "4F241CD83085182D!106",
                    "Object_UUID": "4F241CD83085182D!602",
                    "Type": "File",
                    "Name": "creds.txt.txt"
                }
            ]
        },
        {
            "Folder_UUID": "4F241CD83085182D!105",
            "Object_UUID": "4F241CD83085182D!595",
            "Type": "File",
            "Name": "resources"
        },
        {
            "Folder_UUID": "4F241CD83085182D!105",
            "Object_UUID": "4F241CD83085182D!600",
            "Type": "File",
            "Name": "Personal Vault"
        }
    ]
}
```

## URL List

- [Github.com - OneDriveExplorer](https://github.com/Beercow/OneDriveExplorer)
