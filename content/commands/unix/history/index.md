---
title : "history"
# pre : '<i class="fas fa-code"></i> '
description : "GNU History Library."
date : 2020-09-10T17:24:33+02:00
# hidden : true
# draft : true
weight : 380
# tags : ['']
---

---

## Usage

```plain
history
history [n]
history -c
history -d offset
history [-anrw] [filename]
history -ps arg
```

## Flags

```plain
   -c   Clear the history list. This can be combined with the other
        options to replace the history list completely.

   -d offset
        Delete the history entry at position offset.
        offset should be specified as it appears when the history is displayed.

   -a   Append the new history lines (history lines entered since
        the beginning of the current Bash session) to the history file.

   -n   Append the history lines not already read from the history file
        to the current history list. These are lines appended to the
        history file since the beginning of the current Bash session.

   -r   Read the current history file and append its contents to the history list.

   -w   Write out the current history to the history file.

   -p   Perform history substitution on the args and display the result
        on the standard output, without storing the results in the history list.

   -s   The args are added to the end of the history list as a single entry.
```

## Examples

### Clear history

```plain
history -c
```

## URL List

- [Linux.die.net](https://linux.die.net/Linux-CLI/x1712.htm)
- [Linux.die.net](https://linux.die.net/man/3/history)
