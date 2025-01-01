---
title : "Neo4j"
# pre : ' '
description : "Is a high performance graph store with all the features expected of a mature and robust database, like a friendly query language and ACID transactions."
date : 2023-01-09T21:29:44+01:00
# hidden : true
# draft : true
weight : 1150
# tags : ['']
---

---

Neo4j is the world’s leading Graph Database. It is a high performance graph store with all the features expected of a mature and robust database, like a friendly query language and ACID transactions. The programmer works with a flexible network structure of nodes and relationships rather than static tables — yet enjoys all the benefits of enterprise-quality database. For many applications, Neo4j offers orders of magnitude performance benefits compared to relational DBs.

## Installation

**NOTE:** you can change the version that needs to be installed by changing the `4.1` in the second line below. For example to `4.4`.

```plain
curl -fsSL https://debian.neo4j.com/neotechnology.gpg.key |sudo gpg --dearmor -o /usr/share/keyrings/neo4j.gpg
echo "deb [signed-by=/usr/share/keyrings/neo4j.gpg] https://debian.neo4j.com stable 4.1" | sudo tee -a /etc/apt/sources.list.d/neo4j.list
sudo apt update
sudo apt install neo4j
```

## Multi-database

### Neo4j v4.x Multi-database usage

To use multiple databases in Neo4j v4.x with BloodHound, edit the `/etc/neo4j/neo4j.conf` configuration file.

The uncommented (#) database will be in use when starting Neo4j.

```plain
#dbms.default_database=neo4j-1
#dbms.default_database=neo4j-2
dbms.default_database=neo4j-3
```

### Neo4j v5.x Multi-database usage

To use multiple databases in Neo4j v5.x with BloodHound, edit the `/etc/neo4j/neo4j.conf` configuration file.

The uncommented (#) database will be in use when starting Neo4j.

```plain
#initial.dbms.default_database=neo4j-1
#initial.dbms.default_database=neo4j-2
initial.dbms.default_database=neo4j-3
```

## URL list

- [Neo4j.com](https://neo4j.com/)
- [Github.com - Neo4j](https://github.com/neo4j/neo4j)
