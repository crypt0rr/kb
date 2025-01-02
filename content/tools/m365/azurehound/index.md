---
title : "AzureHound"
# pre : ' '
description : "AzureAD focused module to gather information."
date : 2021-12-20T14:51:22+01:00
# hidden : true
# draft : true
weight : 40
# tags : ['']
---

---

Please go to [BloodHound]({{< ref "bloodhound" >}}) after gathering information with AzureHound.

Custom queries for finding interesting stuff <https://hausec.com/2020/11/23/azurehound-cypher-cheatsheet/>.

## Prerequisites

- Download newest release of AzureHound from [Github.com](https://github.com/BloodHoundAD/AzureHound/releases)

## Usage

Within PowerShell, paste the following code as-is.

```plain
$body = @{
    "client_id" =     "1950a258-227b-4e31-a9cf-717495945fc2"
    "resource" =      "https://graph.microsoft.com"
}
$UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
$Headers=@{}
$Headers["User-Agent"] = $UserAgent
$authResponse = Invoke-RestMethod `
    -UseBasicParsing `
    -Method Post `
    -Uri "https://login.microsoftonline.com/common/oauth2/devicecode?api-version=1.0" `
    -Headers $Headers `
    -Body $body
$authResponse
```

The output will contain a user_code and device_code. Now, open a browser where your AzureAD user either already logged on or can log on to Azure. In this browser, navigate to <https://microsoft.com/devicelogin>

After the device login is done, run the following as-is.

```plain
$body=@{
    "client_id" =  "1950a258-227b-4e31-a9cf-717495945fc2"
    "grant_type" = "urn:ietf:params:oauth:grant-type:device_code"
    "code" =       $authResponse.device_code
}
$Tokens = Invoke-RestMethod `
    -UseBasicParsing `
    -Method Post `
    -Uri "https://login.microsoftonline.com/Common/oauth2/token?api-version=1.0" `
    -Headers $Headers `
    -Body $body
$Tokens
```

The output will include several tokens including a `refresh_token`. It will start with characters similar to “0.ARwA6Wg…”. Now you are ready to run AzureHound! Take the refresh token and supply it to AzureHound using the -r switch:

```plain
./azurehound -r "0.ARwA6Wg..." list --tenant "contoso.onmicrosoft.com" -o output.json
```

## URL List

- [Github.com - BloodHound](https://github.com/BloodHoundAD/BloodHound/)
- [Github.com - AzureHound Collector](https://github.com/BloodHoundAD/BloodHound/blob/master/Collectors/AzureHound.ps1)
- [Github.com - Bloodhound-CustomQueries - Azure](https://github.com/ZephrFish/Bloodhound-CustomQueries/blob/main/customqueries.json)
