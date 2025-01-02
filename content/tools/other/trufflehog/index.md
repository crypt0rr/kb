---
title : "TruffleHog"
# pre : ' '
description : "TruffleHog is a tool for finding credentials."
date : 2023-04-23T19:52:06+02:00
# hidden : true
# draft : true
weight : 1940
tags : ['Other', 'Git']
---

---

TruffleHog is an open source secret-scanning engine that helps resolve exposed secrets across your company’s entire tech stack.

## Installation

```plain
# MacOS users
brew install trufflesecurity/trufflehog/trufflehog

# Docker
docker run --rm -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys

# Docker for M1 and M2 Mac
docker run --platform linux/arm64 --rm -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys

# Binary releases
Download and unpack from https://github.com/trufflesecurity/trufflehog/releases

# Compile from source
git clone https://github.com/trufflesecurity/trufflehog.git
cd trufflehog; go install
```

## Usage

```plain
TruffleHog [<flags>] <command> [<args> ...]
```

## Flags

```plain

Flags:
      --help                     Show context-sensitive help (also try --help-long and --help-man).
      --debug                    Run in debug mode.
      --trace                    Run in trace mode.
      --profile                  Enables profiling and sets a pprof and fgprof server on :18066.
  -j, --json                     Output in JSON format.
      --json-legacy              Use the pre-v3.0 JSON format. Only works with git, gitlab, and github sources.
      --github-actions           Output in GitHub Actions format.
      --concurrency=8            Number of concurrent workers.
      --no-verification          Don't verify the results.
      --only-verified            Only output verified results.
      --filter-unverified        Only output first unverified result per chunk per detector if there are more than one results.
      --config=CONFIG            Path to configuration file.
      --print-avg-detector-time  Print the average time spent on each detector.
      --no-update                Don't check for updates.
      --fail                     Exit with code 183 if results are found.
      --verifier=VERIFIER ...    Set custom verification endpoints.
      --archive-max-size=ARCHIVE-MAX-SIZE  
                                 Maximum size of archive to scan. (Byte units eg. 512B, 2KB, 4MB)
      --archive-max-depth=ARCHIVE-MAX-DEPTH  
                                 Maximum depth of archive to scan.
      --archive-timeout=ARCHIVE-TIMEOUT  
                                 Maximum time to spend extracting an archive.
      --include-detectors="all"  Comma separated list of detector types to include. Protobuf name or IDs may be used, as well as ranges.
      --exclude-detectors=EXCLUDE-DETECTORS  
                                 Comma separated list of detector types to exclude. Protobuf name or IDs may be used, as well as ranges. IDs defined here take precedence over the include list.
      --version                  Show application version.

Commands:
  help [<command>...]
    Show help.

  git [<flags>] <uri>
    Find credentials in git repositories.

  github [<flags>]
    Find credentials in GitHub repositories.

  gitlab --token=TOKEN [<flags>]
    Find credentials in GitLab repositories.

  filesystem [<flags>] [<path>...]
    Find credentials in a filesystem.

  s3 [<flags>]
    Find credentials in S3 buckets.

  gcs [<flags>]
    Find credentials in GCS buckets.

  syslog [<flags>]
    Scan syslog

  circleci --token=TOKEN
    Scan CircleCI
```

## Examples

```bash
trufflehog git https://github.com/trufflesecurity/test_keys --only-verified
```

Expected output:

```plain
🐷🔑🐷  TruffleHog. Unearth your secrets. 🐷🔑🐷

Found verified result 🐷🔑
Detector Type: AWS
Decoder Type: PLAIN
Raw result: AKIAYVP4CIPPERUVIFXG
Line: 4
Commit: fbc14303ffbf8fb1c2c1914e8dda7d0121633aca
File: keys
Email: counter <counter@counters-MacBook-Air.local>
Repository: https://github.com/trufflesecurity/test_keys
Timestamp: 2022-06-16 10:17:40 -0700 PDT
...
```

## 2: Scan a GitHub Org for only verified secrets

```bash
trufflehog github --org=trufflesecurity --only-verified
```

## 3: Scan a GitHub Repo for only verified keys and get JSON output

Command:

```bash
trufflehog git https://github.com/trufflesecurity/test_keys --only-verified --json
```

Expected output:

```plain
{"SourceMetadata":{"Data":{"Git":{"commit":"fbc14303ffbf8fb1c2c1914e8dda7d0121633aca","file":"keys","email":"counter \u003ccounter@counters-MacBook-Air.local\u003e","repository":"https://github.com/trufflesecurity/test_keys","timestamp":"2022-06-16 10:17:40 -0700 PDT","line":4}}},"SourceID":0,"SourceType":16,"SourceName":"trufflehog - git","DetectorType":2,"DetectorName":"AWS","DecoderName":"PLAIN","Verified":true,"Raw":"AKIAYVP4CIPPERUVIFXG","Redacted":"AKIAYVP4CIPPERUVIFXG","ExtraData":{"account":"595918472158","arn":"arn:aws:iam::595918472158:user/canarytokens.com@@mirux23ppyky6hx3l6vclmhnj","user_id":"AIDAYVP4CIPPJ5M54LRCY"},"StructuredData":null}
...
```

## 4: Scan an S3 bucket for verified keys

```bash
trufflehog s3 --bucket=<bucket name> --only-verified
```

## 5: Scan a Github Repo using SSH authentication in docker

```bash
docker run --rm -v "$HOME/.ssh:/root/.ssh:ro" trufflesecurity/trufflehog:latest git ssh://github.com/trufflesecurity/test_keys
```

## 6: Scan individual files or directories

```bash
trufflehog filesystem path/to/file1.txt path/to/file2.txt path/to/dir
```

## 7: Scan GCS buckets for verified secrets

```bash
trufflehog gcs --project-id=<project-ID> --cloud-environment --only-verified
```

## URL list

- [TruffleSecurity.com](https://trufflesecurity.com/)
- [Github.com - trufflehog](https://github.com/trufflesecurity/trufflehog)
