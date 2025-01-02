---
title : "snmpwalk"
# pre : ' '
description : "Retrieve a subtree of management values using SNMP GETNEXT requests."
date : 2022-10-08T13:19:14+02:00
# hidden : true
# draft : true
weight : 1690
tags : ['Other', 'SNMP']
---

---

Retrieve a subtree of management values using SNMP GETNEXT requests

## Installation

```plain
sudo apt install snmpwalk
```

## Usage

```plain
snmpwalk [OPTIONS] AGENT [OID]
```

## Flags

```plain
  Web:      http://www.net-snmp.org/
  Email:    net-snmp-coders@lists.sourceforge.net

OPTIONS:
  -h, --help        display this help message
  -H        display configuration file directives understood
  -v 1|2c|3    specifies SNMP version to use
  -V, --version     display package version number
SNMP Version 1 or 2c specific
  -c COMMUNITY      set the community string
SNMP Version 3 specific
  -a PROTOCOL  set authentication protocol (MD5|SHA|SHA-224|SHA-256|SHA-384|SHA-512)
  -A PASSPHRASE  set authentication protocol pass phrase
  -e ENGINE-ID  set security engine ID (e.g. 800000020109840301)
  -E ENGINE-ID  set context engine ID (e.g. 800000020109840301)
  -l LEVEL  set security level (noAuthNoPriv|authNoPriv|authPriv)
  -n CONTEXT  set context name (e.g. bridge1)
  -u USER-NAME  set security name (e.g. bert)
  -x PROTOCOL  set privacy protocol (DES|AES|AES-192|AES-256)
  -X PASSPHRASE  set privacy protocol pass phrase
  -Z BOOTS,TIME  set destination engine boots/time
General communication options
  -r RETRIES  set the number of retries
  -t TIMEOUT  set the request timeout (in seconds)
Debugging
  -d   dump input/output packets in hexadecimal
  -D[TOKEN[,...]] turn on debugging output for the specified TOKENs
      (ALL gives extremely verbose debugging output)
General options
  -m MIB[:...]  load given list of MIBs (ALL loads everything)
  -M DIR[:...]  look in given list of directories for MIBs
    (default: $HOME/.snmp/mibs:/usr/share/snmp/mibs:/usr/share/snmp/mibs/iana:/usr/share/snmp/mibs/ietf)
  -P MIBOPTS  Toggle various defaults controlling MIB parsing:
     u:  allow the use of underlines in MIB symbols
     c:  disallow the use of "--" to terminate comments
     d:  save the DESCRIPTIONs of the MIB objects
     e:  disable errors when MIB symbols conflict
     w:  enable warnings when MIB symbols conflict
     W:  enable detailed warnings when MIB symbols conflict
     R:  replace MIB symbols from latest module
  -O OUTOPTS  Toggle various defaults controlling output display:
     0:  print leading 0 for single-digit hex characters
     a:  print all strings in ascii format
     b:  do not break OID indexes down
     e:  print enums numerically
     E:  escape quotes in string indices
     f:  print full OIDs on output
     n:  print OIDs numerically
     p PRECISION:  display floating point values with specified PRECISION (printf format string)
     q:  quick print for easier parsing
     Q:  quick print with equal-signs
     s:  print only last symbolic element of OID
     S:  print MIB module-id plus last element
     t:  print timeticks unparsed as numeric integers
     T:  print human-readable text along with hex strings
     u:  print OIDs using UCD-style prefix suppression
     U:  don't print units
     v:  print values only (not OID = value)
     x:  print all strings in hex format
     X:  extended index format
  -I INOPTS  Toggle various defaults controlling input parsing:
     b:  do best/regex matching to find a MIB node
     h:  don't apply DISPLAY-HINTs
     r:  do not check values for range/type legality
     R:  do random access to OID labels
     u:  top-level OIDs must have '.' prefix (UCD-style)
     s SUFFIX:  Append all textual OIDs with SUFFIX before parsing
     S PREFIX:  Prepend all textual OIDs with PREFIX before parsing
  -L LOGOPTS  Toggle various defaults controlling logging:
     e:           log to standard error
     o:           log to standard output
     n:           don't log at all
     f file:      log to the specified file
     s facility:  log to syslog (via the specified facility)

     (variants)
     [EON] pri:   log to standard error, output or /dev/null for level 'pri' and above
     [EON] p1-p2: log to standard error, output or /dev/null for levels 'p1' to 'p2'
     [FS] pri token:    log to file/syslog for level 'pri' and above
     [FS] p1-p2 token:  log to file/syslog for levels 'p1' to 'p2'
  -C APPOPTS  Set various application specific behaviors:
     p:  print the number of variables found
     i:  include given OID in the search range
     I:  don't include the given OID, even if no results are returned
     c:  do not check returned OIDs are increasing
     t:  Display wall-clock time to complete the walk
     T:  Display wall-clock time to complete each request
     E {OID}:  End the walk at the specified OID
```

## Examples

### Gather full MIB tree

- `-c` - community string
- `-v1` - SNMP version
- `-t 10` - timeout

```plain
$ snmpwalk -c public -v1 -t 10 10.10.10.1
iso.3.6.1.2.1.1.1.0 = STRING: "Hardware: x86 Family 6 Model 12 Stepping 2 AT/AT COMPATIBLE - Software: Windows 2000 Version 5.1 (Build 2600 Uniprocessor Free)"
iso.3.6.1.2.1.1.2.0 = OID: iso.3.6.1.4.1.311.1.1.3.1.1
iso.3.6.1.2.1.1.3.0 = Timeticks: (2005595051) 232 days, 3:05:50.51
iso.3.6.1.2.1.1.4.0 = ""
[...]
```

### Enumerate Windows Users

```plain
$ snmpwalk -c public -v1 10.10.10.1 1.3.6.1.4.1.77.1.2.25
iso.3.6.1.4.1.77.1.2.25.1.1.3.98.111.98 = STRING: "bob"
iso.3.6.1.4.1.77.1.2.25.1.1.5.71.117.101.115.116 = STRING: "Guest"
iso.3.6.1.4.1.77.1.2.25.1.1.8.73.85.83.82.95.66.79.66 = STRING: "IUSR_BOB"
iso.3.6.1.4.1.77.1.2.25.1.1.8.73.87.65.77.95.66.79.66 = STRING: "IWAM_BOB"
iso.3.6.1.4.1.77.1.2.25.1.1.13.65.100.109.105.110.105.115.116.114.97.116.111.114 = STRING: "Administrator"
iso.3.6.1.4.1.77.1.2.25.1.1.13.72.101.108.112.65.115.115.105.115.116.97.110.116 = STRING: "HelpAssistant"
iso.3.6.1.4.1.77.1.2.25.1.1.16.83.85.80.80.79.82.84.95.51.56.56.57.52.53.97.48 = STRING: "SUPPORT_388945a0"
```

### Other helpful Windows variables

- Windows Processes -  `1.3.6.1.2.1.25.4.2.1.2`
- Open TCP Ports - `1.3.6.1.2.1.6.13.1.3`
- Installed Software - `1.3.6.1.2.1.25.6.3.1.2`

## URL List

- [Kali.org - snmpwalk](https://www.kali.org/tools/net-snmp/#snmpwalk)
