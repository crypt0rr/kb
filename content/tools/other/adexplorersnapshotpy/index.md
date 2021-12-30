---
title : "ADExplorerSnapshot.py"
# pre : ' '
description : "ADExplorerSnapshot.py is an AD Explorer snapshot ingestor for BloodHound."
date : 2021-12-30T14:34:11+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## ADExplorerSnapshot.py

ADExplorerSnapshot.py is an AD Explorer snapshot ingestor for [BloodHound](https://bloodhound.readthedocs.io/).

AD Explorer allows you to connect to a DC and browse LDAP data. It can also create snapshots of the server you are currently attached to. This tool allows you to convert those snapshots to BloodHound-compatible JSON files.

### Limitations

The ingestor only supports offline information collection from the snapshot file and won't interact with systems on the network. That means features like session and localadmin collection are not available. GPO/OU collection is missing. The ingestor processes all data it possibly can from the snapshot (including ACLs). You will only have the data available of the LDAP/DC that you ran the snapshot against.

### Installation

```plain
git clone https://github.com/c3c/ADExplorerSnapshot.py.git
cd ADExplorerSnapshot.py
pip3 install --user .
```

### Usage

```plain
usage: ADExplorerSnapshot.py [-h] snapshot

ADExplorer snapshot ingestor for BloodHound

positional arguments:
  snapshot

optional arguments:
  -h, --help  show this help message and exit
```

### Notes

Making snapshots in AD Explorer is more network-intensive than the traditional BloodHound ingestors as it attempts to retrieve all objects it can from the LDAP.

ADExplorerSnapshot.py will create caches of information for quicker lookups while processing the data. Especially when processing larger snapshots (e.g. 4GB+) you will also need to have sufficient RAM available. In my tests, about half of the snapshot file size was required in RAM.

The library was tested with a number of data sets, please create an issue report if you run into problems.

The AD Explorer snapshot parser is implemented as its own module, which could also be used individually.

The format in which snapshots are stored by AD Explorer is proprietary and led to a fun reverse engineering journey. A 010 editor template is included in this repository, which I used for iteratively mapping out the contents of the snapshot into structs.

### Examples

![Example](images/adexplorer.png)
![Example](images/adexpsnapshotpy.png)

### URL list

* [Github.com - ADExplorerSnapshot.py](https://github.com/c3c/ADExplorerSnapshot.py)
