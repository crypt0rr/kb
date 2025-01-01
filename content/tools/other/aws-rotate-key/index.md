---
title : "aws-rotate-key"
# pre : ' '
description : "Easily rotate your AWS access key."
date : 2022-05-12T15:16:22+02:00
# hidden : true
# draft : true
weight : 130
tags : ['Other', 'AWS']
---

---

As a security best practice, AWS recommends that users periodically regenerate their API access keys. This tool simplifies the rotation of access keys defined in your credentials file.

When run, the program will list the current access keys associated with your IAM user, and print the steps it has to perform to rotate them. It will then wait for your confirmation before continuing.

## Installation

```plain
go install github.com/stefansundin/aws-rotate-key@latest
```

## Usage

```plain
aws-rotate-key [OPTIONS]
```

## Flags

```plain
  -auth-profile string
        Use a different profile when calling AWS.
  -d    Delete old key without deactivation.
  -mfa
        Use MFA.
  -profile string
        The profile to use. (default "default")
  -version
        Print version number
  -y    Automatic "yes" to prompts.
```

## Examples

You can check your current and/or new identity with `aws sts get-caller-identity`.

```plain
$ aws-rotate-key                   
Using access key ABCDEFGHIJKLMNOP from profile "default".
Your user ARN is: arn:aws:iam::1234567890:user/crypt0rr

You have 1 access key associated with your user:
- ABCDEFGHIJKLMNOP (Active, created 2022-05-09 14:24:08 +0000 UTC, last used 2022-05-12 09:38:00 +0000 UTC for service cloudformation in eu-west-1)

Do you want to create a new key and deactivate ABCDEFGHIJKLMNOP? [yN] y
Created access key POIUYTREWQASDFGHJ.
Wrote new key pair to /Users/crypt0rr/.aws/credentials
Deactivated old access key ABCDEFGHIJKLMNOP.
Please make sure this key is not used elsewhere.
Please note that it may take a minute for your new access key to propagate in the AWS control plane.
```

## URL List

- [Github.com - aws-rotate-key](https://github.com/stefansundin/aws-rotate-key)
