---
title : "{{ replace .Name "-" " " | title }}"
# pre : ' '
description : "{{ replace .Name "-" " " | lower }} description."
date : {{ .Date }}
# hidden : true
# draft : true
weight : 0
tags : [""]
### a map of Front Matter keys whose values are passed down to the page's descendants unless overwritten by self or a closer ancestor's cascade. 
cascade:
    tags: ['{{ replace .Name "-" " " | title }}']
    # pre : '<i class="fas fa-terminal"></i> '
---

## {{ replace .Name "-" " " | title }}

{{< children style="card" depth="1" description="true" sort="Name"  >}}
