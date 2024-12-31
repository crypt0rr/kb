---
title : "Regular Expressions"
pre : '<i class="fas fa-terminal"></i> '
description : "Regular Expressions."
date : 2020-05-05T17:37:46+02:00
# hidden : true
# draft : true
weight : 120
# tags : ['']
---

---

Creating Regular Expressions online, use [this site](https://regex-generator.olafneumann.org/).

## Regex references

For more look [here](http://www.rexegg.com/regex-quickstart.html#ref).

### Characters

| Character | Legend                                                                                   | Example    | Sample Match |
| --------- | ---------------------------------------------------------------------------------------- | ---------- | ------------ |
| \d        | Most engines: one digit from 0 to 9                                                      | file_\d\d  | file_25      |
| \d        | .NET, Python 3: one Unicode digit in any script                                          | file_\d\d  | file_9੩      |
| \w        | Most engines: "word character": ASCII letter, digit or underscore                        | \w-\w\w\w  | A-b_1        |
| \w        | .Python 3: "word character": Unicode letter, ideogram, digit, or underscore              | \w-\w\w\w  | 字-ま_۳      |
| \w        | .NET: "word character": Unicode letter, ideogram, digit, or connector                    | \w-\w\w\w  | 字-ま‿۳      |
| \s        | Most engines: "whitespace character": space, tab, newline, carriage return, vertical tab | a\sb\sc    | a b c        |
| \s        | .NET, Python 3, JavaScript: "whitespace character": any Unicode separator                | a\sb\sc    | a b c        |
| \D        | One character that is not a digit as defined by your engine's \d                         | \D\D\D     | ABC          |
| \W        | One character that is not a word character as defined by your engine's \w                | \W\W\W\W\W | *-+=)        |
| \S        | One character that is not a whitespace character as defined by your engine's \s          | \S\S\S\S   | Yoyo         |

### Quantifiers

| Quantifier | Legend              | Example        | Sample Match   |
| ---------- | ------------------- | -------------- | -------------- |
| +          | One or more         | Version \w-\w+ | Version A-b1_1 |
| {3}        | Exactly three times | \D{3}          | ABC            |
| {2,4}      | Two to four times   | \d{2,4}        | 156            |
| {3,}       | Three or more times | \w{3,}         | regex_tutorial |
| \*          | Zero or more times  | A*B*C*         | AAACC          |
| ?          | Once or none        | plurals?       | plural         |

### More Characters

| Character | Legend                                                   | Example                           | Sample Match   |
| --------- | -------------------------------------------------------- | --------------------------------- | -------------- |
| .         | Any character except line break                          | a.c                               | abc            |
| .         | Any character except line break                          | .*                                | whatever, man. |
| \.        | A period (special character: needs to be escaped by a \) | a\.c                              | a.c            |
| \         | Escapes a special character                              | \.\*\+\?    \$\^\/\\|.*+?    $^/\ | -              |
| \         | Escapes a special character                              | \[\{\(\)\}\]                      | [{()}]         |

### Logic

| Logic   | Legend                   | Example               | Sample Match            |
| ------- | ------------------------ | --------------------- | ----------------------- |
| \|        | Alternation / OR operand | 22\|33                | 33                      |
| ( … )   | Capturing group          | A(nt\|pple)           | Apple (captures "pple") |
| \1      | Contents of Group 1      | r(\w)g\1x             | regex                   |
| \2      | Contents of Group 2      | (\d\d)\+(\d\d)=\2\+\1 | 12+65=65+12             |
| (?: … ) | Non-capturing group      | A(?:nt\|pple)         | Apple                   |

### More White Space

| Character | Legend                                                                                                                                             | Example   | Sample Match |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ |
| \t        | Tab                                                                                                                                                | T\t\w{2}  | T     ab     |
| \r        | Carriage return character                                                                                                                          | see below |
| \n        | Line feed character                                                                                                                                | see below |
| \r\n      | Line separator on Windows                                                                                                                          | AB\r\nCD  | ABCD         |
| \N        | Perl, PCRE (C, PHP, R…): one character that is not a line break                                                                                    | \N+       | ABC          |
| \h        | Perl, PCRE (C, PHP, R…), Java: one horizontal whitespace character: tab or Unicode space separator                                                 |           |
| \H        | One character that is not a horizontal whitespace                                                                                                  |           |
| \v        | .NET, JavaScript, Python, Ruby: vertical tab                                                                                                       |           |
| \v        | Perl, PCRE (C, PHP, R…), Java: one vertical whitespace character: line feed, carriage return, vertical tab, form feed, paragraph or line separator |           |
| \V        | Perl, PCRE (C, PHP, R…), Java: any character that is not a vertical whitespace                                                                     |           |
| \R        | Perl, PCRE (C, PHP, R…), Java: one line break (carriage return + line feed pair, and all the characters matched by \v)                             |

### More Quantifiers

| Quantifier | Legend                           | Example  | Sample Match   |
| ---------- | -------------------------------- | -------- | -------------- |
| +          | The + (one or more) is "greedy"  | \d+      | 12345          |
| ?          | Makes quantifiers "lazy"         | \d+?     | 1 in **1**2345 |
| \*          | The \* (zero or more) is "greedy" | A*       | AAA            |
| ?          | Makes quantifiers "lazy"         | A*?      | empty in AAA   |
| {2,4}      | Two to four times, "greedy"      | \w{2,4}  | abcd           |
| ?          | Makes quantifiers "lazy"         | \w{2,4}? | ab in **ab**cd |

### Character Classes

| Character | Legend                                                                      | Example        | Sample Match                                                                                           |
| --------- | --------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| [ … ]     | One of the characters in the brackets                                       | [AEIOU]        | One uppercase vowel                                                                                    |
| [ … ]     | One of the characters in the brackets                                       | T[ao]p         | Tap or Top                                                                                             |
| -         | Range indicator                                                             | [a-z]          | One lowercase letter                                                                                   |
| [x-y]     | One of the characters in the range from x to y                              | [A-Z]+         | GREAT                                                                                                  |
| [ … ]     | One of the characters in the brackets                                       | [AB1-5w-z]     | One of either: A,B,1,2,3,4,5,w,x,y,z                                                                   |
| [x-y]     | One of the characters in the range from x to y                              | [ -~]+         | Characters in the printable section of the [ASCII table](http://www.asciitable.com/).                  |
| [^x]      | One character that is not x                                                 | [^a-z]{3}      | A1!                                                                                                    |
| [^x-y]    | One of the characters **not** in the range from x to y                      | [^ -~]+        | Characters that are **not** in the printable section of the [ASCII table](http://www.asciitable.com/). |
| [\d\D]    | One character that is a digit or a non-digit                                | [\d\D]+        | Any characters, including new lines, which the regular dot doesn't match                               |
| [\x41]    | Matches the character at hexadecimal position 41 in the ASCII table, i.e. A | [\x41-\x45]{3} | ABE                                                                                                    |

## Examples

### IP addresses

```plain
grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b"
```

```plain
$ nmcli | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b"

10.10.10.32
0.0.0.0
10.10.10.0
169.254.0.0
```

### Subdomains

```plain
grep -o '[^/]*\.<domain>\.com'
```

### File extensions

```plain
grep -o '[^/]*\.js'
```

### E-mail addresses

```plain
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

### Specific length

### Line length

```plain
^.{16}$
```

### Lines longer than x

```plain
.{22,}
```

### Lines shorter than x

```plain
^.{0,31}$
```

### Lines between x y

```plain
.{33,64}
```

## URL List

- [Regex-generator.olafneumann.org](https://regex-generator.olafneumann.org)
- [Regexone.com](https://regexone.com)
- [Regexr.com](https://regexr.com/)
- [Rexegg.com - Regex tutorial, one of the most detailed on the web](http://www.rexegg.com/)
- [Regular-expressions.info](https://www.regular-expressions.info/)
- [Cyrilex](https://extendsclass.com/regex-tester.html)
