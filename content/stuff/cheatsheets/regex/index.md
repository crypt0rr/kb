---
title : "Regex"
pre : '<i class="fas fa-terminal"></i> '
description : "Regular Expressions."
date : 2020-05-05T17:37:46+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Regular Expressions

Creating Regular Expressions online, use [this site](https://regex-generator.olafneumann.org/).

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

### E-mail addresses

```plain
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

### Specific length

#### Line length

```plain
^.{16}$
```

#### Lines longer than x

```plain
.{22,}
```

#### Lines shorter than x

```plain
^.{0,31}$
```

#### Lines between x y

```plain
.{33,64}
```

### URL list

* [Regex-generator.olafneumann.org](https://regex-generator.olafneumann.org)
* [Regexone.com](https://regexone.com)
* [Regexr.com](https://regexr.com/)
