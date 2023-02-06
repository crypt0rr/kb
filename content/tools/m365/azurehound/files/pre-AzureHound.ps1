# Run this before executing AzureHound
# https://bloodhound.readthedocs.io/en/latest/data-collection/azurehound.html#collecting-data-with-azurehound

[CmdletBinding(DefaultParameterSetName="FQDN")]
param(
[Parameter(Position = 0, Mandatory = $true, ParameterSetName="FQDN")]
[String] $FQDN
)

# 1. Authenticate using MFA
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
# $authResponse
$authResponse.message

# 2. Wait for completion of step 1
timeout /t -1

# 3. Retrieve refresh token and tenant_id
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

$rt = $Tokens.refresh_token
$tenant = $FQDN

Write-Host "Ready to run AzureHound.exe:"
Write-Host ".\AzureHound.exe -r '$rt' list --tenant '$tenant' -o output.json"
