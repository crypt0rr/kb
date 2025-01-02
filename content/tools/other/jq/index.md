---
title : "jq"
# pre : '<i class="fas fa-code"></i> '
description : "jq is a tool for processing JSON inputs, applying the given filter to its JSON text inputs and producing the filter's results as JSON on standard output."
date : 2020-08-17T15:08:45+02:00
# hidden : true
# draft : true
weight : 950
# tags : ['']
---

---

jq is a tool for processing JSON inputs, applying the given filter to its JSON text inputs and producing the filter's results as JSON on standard output.

## Installation

```plain
sudo apt install jq
```

## Usage

```plain
jq [options] <jq filter> [file...]
jq [options] --args <jq filter> [strings...]
jq [options] --jsonargs <jq filter> [JSON_TEXTS...]
```

## Flags

```plain
jq is a tool for processing JSON inputs, applying the given filter to
its JSON text inputs and producing the filter's results as JSON on
standard output.

The simplest filter is ., which copies jq's input to its output
unmodified (except for formatting, but note that IEEE754 is used
for number representation internally, with all that that implies).

For more advanced filters see the jq(1) manpage ("man jq")
and/or https://stedolan.github.io/jq

Example:

$ echo '{"foo": 0}' | jq .
    {
    "foo": 0
    }

Some of the options include:
  -c               compact instead of pretty-printed output;
  -n               use `null` as the single input value;
  -e               set the exit status code based on the output;
  -s               read (slurp) all inputs into an array; apply filter to it;
  -r               output raw strings, not JSON texts;
  -R               read raw strings, not JSON texts;
  -C               colorize JSON;
  -M               monochrome (don't colorize JSON);
  -S               sort keys of objects on output;
  --tab            use tabs for indentation;
  --arg a v        set variable $a to value <v>;
  --argjson a v    set variable $a to JSON value <v>;
  --slurpfile a f  set variable $a to an array of JSON texts read from <f>;
  --rawfile a f    set variable $a to a string consisting of the contents of <f>;
  --args           remaining arguments are string arguments, not files;
  --jsonargs       remaining arguments are JSON arguments, not files;
  --               terminates argument processing;

Named arguments are also available as $ARGS.named[], while
positional arguments are available as $ARGS.positional[].

See the manpage for more options.
```

## Examples

### Filter specific fields from json file

Input file for query:

```plain
$ head -n20 sonos.com.json
[
  {
    "alias": "todd.kelleher",
    "domain": "sonos.com",
    "password": "RUahNMRH682YpWZKu8zYdA==",
    "breach": "adobe"
  },
  {
    "alias": "rolf.degraaf",
    "domain": "sonos.com",
    "password": "200787",
    "breach": "antipublic"
  },
  {
    "alias": "birger.hillaert.con",
    "domain": "sonos.com",
    "password": null,
    "breach": "linkedin"
  }
]
```

```plain
$ jq -r '.[].alias' sonos.com.json
todd.kelleher
rolf.degraaf
birger.hillaert.con
```

```plain
$ jq -r '.[].breach' sonos.com.json
adobe
antipublic
linkedin
```

## URL List

- [Stedolan.GitHub.io - jq](https://stedolan.github.io/jq/)
