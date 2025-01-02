---
title : "PowerMeta"
# pre : ' '
description : "PowerMeta searches for publicly available files hosted on various websites for a particular domain by using specially crafted Google, and Bing searches."
date : 2020-11-16T12:52:56+01:00
# hidden : true
# draft : true
weight : 220
# tags : ['']
---

---

PowerMeta searches for publicly available files hosted on various websites for a particular domain by using specially crafted Google, and Bing searches.

## Installation

Download from [Github.com](https://github.com/dafthack/PowerMeta)

## Usage

```powershell
C:\> powershell.exe -exec bypass
PS C:\> Import-Module .\PowerMeta.ps1
```

## Flags

```plain
TargetDomain        - The target domain to search for files.
FileTypes           - A comma seperated list of file extensions to search for. By default PowerMeta searches for "pdf, docx, xlsx, doc, xls, pptx, ppt".
OutputList          - A file to output the list of links discovered through web searching to.
OutputDir           - A directory to store all downloaded files in.
TargetFileList      - List of file links to download.
Download            - Instead of being prompted interactively pass this flag to auto-download files found.
Extract             - Instead of being prompted interactively pass this flag to extract metadata from found files pass this flag to auto-extract any metadata.
ExtractAllToCsv     - All metadata (not just the default fields) will be extracted from files to a CSV specified with this flag.
UserAgent           - Change the default User Agent used by PowerMeta.
MaxSearchPages      - The maximum number of pages to search on each search engine.
```

## Examples

```plain
> Invoke-PowerMeta -TargetDomain offsec.nl
[*] Searching Google for 'site:offsec.nl filetype:pdf'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:pdf'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:docx'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:docx'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:xlsx'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:xlsx'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:doc'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:doc'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:xls'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:xls'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:pptx'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:pptx'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] Searching Google for 'site:offsec.nl filetype:ppt'
[*] Now Analyzing page 1 of Google search results (100 results per page)
[*] Searching Bing for 'site:offsec.nl filetype:ppt'
[*] Now Analyzing page 1 of Bing search results (30 results per page)
[*] A total of 5 files were discovered.

Download Files?
Would you like to download all of the files discovered?
```

## URL List

- [GitHub.com - PowerMeta](https://github.com/dafthack/PowerMeta)
