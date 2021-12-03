---
title : "BloodHound"
# pre : ' '
description : "Uses graph theory to reveal the hidden and often unintended relationships within an Active Directory environment."
date : 2020-03-10T15:32:33+01:00
# hidden : true
# draft : true
weight : 0
tags : ['Framework', 'Active Directory']
---

## BloodHound

Uses graph theory to reveal the hidden and often unintended relationships within an Active Directory environment.

### Collectors

*BordeauxDog.exe* is an obfuscated version of *SharpHound.exe*. All collectors based on version 3.

{{%attachments title="Executables" fa_icon_class="far fa-file-code" pattern=".*(exe)"/%}}

{{%attachments title="PowerShell Modules" fa_icon_class="far fa-file-code" pattern=".*(ps1)"/%}}

### Installation

Kali

```plain
sudo apt install bloodhound
```

Ubuntu

```plain
pip3 install bloodhound
```

### Installation of Neo4j and bloodhound interface on Ubuntu

```plain
sudo wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
sudo echo 'deb https://debian.neo4j.org/repo stable/' | sudo tee -a /etc/apt/sources.list.d/neo4j.list
sudo apt update && sudo apt install neo4j openjdk-8-jdk apt-transport-https
```

Download newest binary from [Github.com](https://github.com/BloodHoundAD/BloodHound/releases)

```plain
sudo neo4j console
sudo ./BloodHound -no-sandbox
```

Change default Java JDK to 8

```plain
$ sudo update-alternatives --config java

There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                            Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      manual mode
  2            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      manual mode

Press <enter> to keep the current choice[*], or type selection number: 2
```

Change `DefaultLimitNOFILE` for Neo4j to run without standard `1024` limit. After changing the files reboot your system.

```plain
$ cat /etc/systemd/user.conf 
DefaultLimitNOFILE=60000

$ cat /etc/systemd/system.conf 
DefaultLimitNOFILE=60000
```

### Custom Queries

{{%attachments title="Related files" fa_icon_class="fas fa-file-code" pattern=".*(json)"/%}}

```plain
~/.config/bloodhound/customqueries.json
```

### Usage

#### Bloodhound - Run ingestor on target domain joined system

`. .\SharpHound.ps1 / exe`

`Invoke-BloodHound -CollectionMethod All -JSONFolder "OUTPUT-FOLDER"`

#### Bloodhound - Remote ingestor

`bloodhound-python -c All -u '<user>@domain' -p '<password>' -d <domain> -v`

Import the .zip file in Bloodhound

#### AzureHound - Run ingestor

Import the module

`Import-Module AzureHound.ps1`

`Connect-AZAccount`

`Invoke-AzureHound -Install`

#### Start bloodhound (Kali)

Start database

```plain
neo4j console
```

Start bloodhound

```plain
bloodhound
```

![Example](images/example.png)
![Example](images/example1.png)

#### Filter users from json export Bloodhound

Filter domain admins

```plain
grep -E '"name":' da-export-bloodhound.json | cut -d '"' -f 4 | cut -d '@' -f1
```

### Excessive privileges allowing for shadow Domain Admins

```plain
ForceChangePassword – Ability to reset password of another user
GenericAll          – Full control over an object (read/write)
GenericWrite        – Update of any attributes of an object
WriteOwner          – Assume ownership of an object
WriteDacl           – Modify the DACL of an object
Self                – Arbitrarily modify self
```

* [Infosecmatter.com - Top 16 Active Directory vulnerabilities](https://www.infosecmatter.com/top-16-active-directory-vulnerabilities/#5-excessive-privileges-allowing-for-shadow-domain-admins)
* [iRed.team - Active Directory Kerberos Abuse](https://ired.team/offensive-security-experiments/active-directory-kerberos-abuse/abusing-active-directory-acls-aces)

### High privilege user groups

```plain
Administrators
Domain Admins
Enterprise Admins
Schema Admins
Account Operators
Server Operators
Backup Operators
```

### URL list

* [GitHub.com - Bloodhound](https://github.com/BloodHoundAD/BloodHound/)
* [Github.com - Bloodhound - Pre-compiled binaries](https://github.com/BloodHoundAD/BloodHound/releases)
* [GitHub.com - Bloodhound.py](https://github.com/fox-it/BloodHound.py)
* [Bloodhound for IT teams - PlumHound](https://github.com/PlumHound/PlumHound)
* [GitHub - awsmhacks - BloodhoundCustomQueries](https://github.com/awsmhacks/awsmBloodhoundCustomQueries)
* [Github.com - Azurehound](https://bloodhound.readthedocs.io/en/latest/data-collection/azurehound.html)
