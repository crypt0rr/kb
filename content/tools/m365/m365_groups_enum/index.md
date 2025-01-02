---
title : "M365_groups_enum"
# pre : ' '
description : "Enumerate Microsoft 365 Groups in a tenant with their metadata."
date : 2021-05-03T11:53:07+02:00
# hidden : true
# draft : true
weight : 90
# tags : ['']
---

---

Enumerate Microsoft 365 Groups in a tenant with their metadata.

## Installation

```plain
git clone https://github.com/cnotin/m365_groups_enum.git
python3 -m pip install -r requirements.txt
```

## Usage

```plain
all_groups.py [-h] [-u USERNAME] [-p PASSWORD] [-t TENANT] [-c CLIENT]
                     [-r RESOURCE] [--as-app] [--device-code]
                     [--access-token ACCESS_TOKEN]
                     [--refresh-token REFRESH_TOKEN] [--prt-cookie PRT_COOKIE]
                     [--prt-init] [--prt PRT] [--derived-key DERIVED_KEY]
                     [--prt-context PRT_CONTEXT]
                     [--prt-sessionkey PRT_SESSIONKEY] [--prt-verify]
                     [-f TOKENFILE] [--tokens-stdout] [--debug]
```

## Flags

```plain
optional arguments:
  -h, --help            show this help message and exit
  -u USERNAME, --username USERNAME
                        Username for authentication
  -p PASSWORD, --password PASSWORD
                        Password (leave empty to prompt)
  -t TENANT, --tenant TENANT
                        Tenant ID to auth to (leave blank for default tenant
                        for account)
  -c CLIENT, --client CLIENT
                        Client ID to use when authenticating. (Must be a
                        public client from Microsoft with user_impersonation
                        permissions!). Default: Azure AD PowerShell module App
                        ID
  -r RESOURCE, --resource RESOURCE
                        Resource to authenticate to (Default:
                        https://graph.windows.net)
  --as-app              Authenticate as App (requires password and client ID
                        set)
  --device-code         Authenticate using a device code
  --access-token ACCESS_TOKEN
                        Access token (JWT)
  --refresh-token REFRESH_TOKEN
                        Refresh token (JWT)
  --prt-cookie PRT_COOKIE
                        Primary Refresh Token cookie from ROADtoken (JWT)
  --prt-init            Initialize Primary Refresh Token authentication flow
                        (get nonce)
  --prt PRT             Primary Refresh Token cookie from mimikatz CloudAP
  --derived-key DERIVED_KEY
                        Derived key used to re-sign the PRT cookie (as hex
                        key)
  --prt-context PRT_CONTEXT
                        Primary Refresh Token context for the derived key (as
                        hex key)
  --prt-sessionkey PRT_SESSIONKEY
                        Primary Refresh Token session key (as hex key)
  --prt-verify          Verify the Primary Refresh Token and exit
  -f TOKENFILE, --tokenfile TOKENFILE
                        File to store the credentials (default:
                        .roadtools_auth)
  --tokens-stdout       Do not store tokens on disk, pipe to stdout instead
  --debug               Enable debug logging to disk
```

## Examples

### Gather information without 2FA

```plain
$ python3 all_groups.py -u johndo@example.com -p 'Welkom1234!'
Authenticated as johndo@example.com
Guessing SharePoint default URL... https://example.sharepoint.com
Getting all groups... 
Got 1337 groups
Getting groups details...
38 %
76 %
Bye!
```

### Gather when 2FA is implemented

```plain
$ python3 all_groups.py --device-code
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code 12345678 to authenticate.
Authenticated as johndo@example.com
Guessing SharePoint default URL... https://example.sharepoint.com
Getting all groups... 
Got 1337 groups
Getting groups details...
38 %
76 %
Bye!
```

### Convert JSON output to CSV

Will convert data from *all_groups.json* to new file *all_groups.csv* (keeps 'all_groups.json')

```plain
python3 reporting.py
```

### Filter public groups

```plain
jq '.[] | select(.visibility=="Public")' all_groups.json
```

Filter public group URLs.

```plain
jq '.[] | select(.visibility=="Public")' all_groups.json | jq -r '.sharepoint'
```

### Filter displayName, sharepoint URL and members

```plain
jq '.[] | select(.visibility=="Public")' all_groups.json | jq -r '.displayName, .sharepoint, .members'
```

## URL List

- [Github.com - m365_groups_enum](https://github.com/cnotin/m365_groups_enum.git)
