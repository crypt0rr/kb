---
title : "CDK"
# pre : ' '
description : "CDK is an open-sourced container penetration toolkit, designed for offering stable exploitation in different slimmed containers without any OS dependency."
date : 2021-02-03T13:46:25+01:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

Zero Dependency Container Penetration Toolkit.

## Installation

Download newest release from [Github.com](https://github.com/cdk-team/CDK/releases/)

## Usage

```plain
cdk evaluate [--full]
cdk run (--list | <exploit> [<args>...])
cdk auto-escape <cmd>
cdk <tool> [<args>...]
```

## Flags

```plain
Zero-dependency k8s/docker/serverless penetration toolkit by <i@cdxy.me>
Find tutorial, configuration and use-case in https://github.com/cdk-team/CDK/wiki

Evaluate:
  cdk evaluate                              Gather information to find weakness inside container.
  cdk evaluate --full                       Enable file scan during information gathering.

Exploit:
  cdk run --list                            List all available exploits.
  cdk run <exploit> [<args>...]             Run single exploit, docs in https://github.com/cdk-team/CDK/wiki

Auto Escape:
  cdk auto-escape <cmd>                     Escape container in different ways then let target execute <cmd>.

Tool:
  vi <file>                                 Edit files in container like "vi" command.
  ps                                        Show process information like "ps -ef" command.
  nc [options]                              Create TCP tunnel.
  ifconfig                                  Show network information.
  kcurl <path> (get|post) <uri> [<data>]    Make request to K8s api-server.
  ucurl (get|post) <socket> <uri> <data>    Make request to docker unix socket.
  probe <ip> <port> <parallel> <timeout-ms> TCP port scan, example: cdk probe 10.0.1.0-255 80,8080-9443 50 1000

Options:
  -h --help     Show this help msg.
  -v --version  Show version.
```

## URL List

- [Github.com - CDK](https://github.com/cdk-team/CDK)
