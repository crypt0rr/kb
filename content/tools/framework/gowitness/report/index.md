---
title : "Report"
# pre : ' '
description : "Work with gowitness reports."
date : 2024-09-18T14:55:08+02:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Work with gowitness reports.

## Installation

Install [GoWitness]({{< ref "../gowitness" >}})

## Usage

```plain
gowitness scan [OPTIONS]
```

## Available Commands

- `convert` - Convert between SQLite and JSON Lines file formats
- `generate` - Generate a static HTML report
- `list` - List a summary of results from a data source
- `merge` - Merge multiple SQLite databases into a single database
- `migrate` - Migrate a gowitness v2 SQLite database to v3
- `server` - Start the web user interface

## Flags

### Convert

Convert between SQLite and JSON Lines file formats.

```plain
      --from-file string   The file to convert from
  -h, --help               help for convert
      --to-file string     The file to convert to. Use .sqlite3 for conversion to SQLite, and .jsonl for conversion to JSON Lines
```

### Generate

Generate a static HTML report.

```plain
      --db-uri string            The location of a gowitness database (default "sqlite://gowitness.sqlite3")
  -h, --help                     help for generate
      --json-file string         The location of a JSON Lines results file (e.g., ./gowitness.jsonl). This flag takes precedence over --db-uri
      --screenshot-path string   The path where screenshots are stored (default "./screenshots")
      --zip-name string          The name and location of the final report ZIP file that will be generated (default "gowitness-report.zip"
```

### List

List a summary of results from a data source, like an SQLite database or a JSON lines file.

```plain
      --db-uri string      The location of a gowitness database (default "sqlite://gowitness.sqlite3")
  -h, --help               help for list
      --json-file string   The location of a JSON Lines results file (e.g., ./gowitness.jsonl). This flag takes precedence over --db-uri
```

### Merge

Merge multiple SQLite databases into a single database.

```plain
  -h, --help                  help for merge
      --output-file string    The output SQLite database file
      --source-file strings   One or more source SQLite database files
      --source-path string    The source directory containing SQLite databases
```

### Migrate

Migrate a gowitness v2 SQLite database to v3.

```plain
  -h, --help            help for migrate
  -s, --source string   A gowitness v2 SQLite database file to migrate to v3
```

### Server

Start the web user interface.

```plain
      --db-uri string            The database URI to use. Supports SQLite, Postgres, and MySQL (e.g., postgres://user:pass@host:port/db) (default "sqlite://gowitness.sqlite3")
  -h, --help                     help for server
      --host string              The host address to bind the webserver to (default "127.0.0.1")
      --port int                 The port to start the web server on (default 7171)
      --screenshot-path string   The path where screenshots are stored (default "./screenshots")
```
