---
title : "LDAP Password Hunter"
# pre : ' '
description : "LDAP Password Hunter is a tool which wraps features of getTGT.py (Impacket) and ldapsearch in order to look up for password stored in LDAP database."
date : 2021-11-06T13:24:44+01:00
# hidden : true
# draft : true
weight : 1010
tags : ['Other', 'LDAP', 'Active Directory']
---

---

It happens that due to legacy services requirements or just bad security practices password are world-readable in the LDAP database by any user who is able to authenticate.
LDAP Password Hunter is a tool which wraps features of getTGT.py (Impacket) and ldapsearch in order to look up for password stored in LDAP database. Impacket getTGT.py script is used in order to authenticate the domain account used for enumeration and save its TGT kerberos ticket. TGT ticket is then exported in KRB5CCNAME variable which is used by ldapsearch script to authenticate and obtain TGS kerberos tickets for each domain/DC LDAP-Password-Hunter is ran for. Basing on the CN=Schema,CN=Configuration export results a custom list of attributes is built and filtered in order to identify a big query which might contains interesting results. Results are shown and saved in a sqlite3 database. The DB is made of one table containing the following columns:

- DistinguishedName
- AttributeName
- Value
- Domain

Results are way more clean than the previous version and organized in the SQL DB. The output shows the entries found only if they are not in DB, so new entries pop up but the overall outcome of the analysis is still saved in a file with a timestamp.

## Installation

Requirements

- [Ldapsearch](https://docs.ldap.com/ldap-sdk/docs/tool-usages/ldapsearch.html) | `sudo apt install ldapscripts`
- [KB - impacket]({{< ref "tools/framework/impacket/" >}})
- [Sqlite](https://www.sqlite.org/index.html) `sudo apt install sqlite3`

```plain
git clone https://github.com/oldboy21/LDAP-Password-Hunter.git
```

## Usage

```plain
./run.sh
```

## Examples

```plain
$ ./run.sh       
LDAP PASSWORD HUNTER
Please be sure impacket and ldapsearch are installed and your /etc/krb5.conf file is clean
Database exist already, Starting analysis on Sat Nov  6 01:45:25 PM CET 2021
****LDAP PASSWORD ENUM****
Creating a TGT ticket for the user
[...]
```

## URL List

- [Github.com - LDAP Password Hunter](https://github.com/oldboy21/LDAP-Password-Hunter)
