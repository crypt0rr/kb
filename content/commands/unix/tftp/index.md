---
title : "tftp"
# pre : '<i class="fas fa-code"></i> '
description : "Trivial File Transfer Program."
date : 2020-05-04T14:00:13+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## TFTP

For TFTP-server check [atftp]({{< ref "atftp" >}})

### Examples

#### Test for TFTP

If error occurs this means the server is running TFTP.

```plain
$ tftp 10.10.10.1 69

tftp> get nonexistingfile.txt
Error code 4: Transfer mode not supported.
```

### URL list

* [Scan.shadowserver.org](https://scan.shadowserver.org/tftp/)
