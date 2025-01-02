---
title : "Twofi"
# pre : ' '
description : "Twitter Words of Interest."
date : 2022-10-03T15:44:16+02:00
# hidden : true
# draft : true
weight : 360
# tags : ['']
---

---

Twitter Words of Interest.

When attempting to crack passwords custom word lists are very useful additions to standard dictionaries. An interesting idea originally released on the ["7 Habits of Highly Effective Hackers"](http://7habitsofhighlyeffectivehackers.blogspot.com.au/2012/05/using-twitter-to-build-password.html) blog was to use Twitter to help generate those lists based on searches for keywords related to the list that is being cracked. I've expanded this idea into twofi which will take multiple search terms and return a word list sorted by most common first.

A second option, suggested by [@pentest4dummies](https://www.twitter.com/pentest4dummies), was to look at what specific users have been saying and use their own tweets to build up the list so I've added that as well. Given a list of twitter usernames the script will bring back approximately the last 500 tweets for each user and use those to create the list.

**NOTE:** Requires Twitter API key, you can do this at [apps.twitter.com](https://apps.twitter.com/)

## Installation

Download newest release from [digi.ninja](https://digi.ninja/projects/twofi.php). Or use the downloads below.

{{%resources fa_icon_class="far fa-file-archive" pattern=".*(bz2)"/%}}

```plain
bundle install
ruby twofi.rb
```

## Usage

```plain
twofi [OPTIONS]
```

## Flags

```plain
--help, -h: show help
--config <file>: config file, default is twofi.yml
--count, -c: include the count with the words
--min_word_length, -m: minimum word length
--term_file, -T <file>: a file containing a list of terms
--terms, -t: comma separated search terms
    quote words containing spaces, no space after commas
--user_file, -U <file>: a file containing a list of users
--users, -u: comma separated usernames
    quote words containing spaces, no space after commas
--verbose, -v: verbose
```

## Examples

*Nothing here yet.*

## URL List

- [Digi.ninja - twofi](https://digi.ninja/projects/twofi.php)
- [Github.com - twofi](https://github.com/digininja/twofi)
