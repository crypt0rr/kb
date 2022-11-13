---
title: "Hugo"
# pre : ' '
description: "The world's fastest framework for building websites."
date: 2020-03-10T15:00:41+01:00
# hidden : true
# draft : true
weight: 0
# tags : [""]
---

## Hugo

The world's fastest framework for building websites.

## Installation

Install from SnapCraft

```plain
sudo snap install hugo --channel=extended
```

Or download newest release from [Github.com](https://github.com/gohugoio/hugo/releases)

## Usage

```plain
hugo [flags]
hugo [command]
```

### Shortcodes

Hugo supports a list of [shortcodes](https://gohugo.io/content-management/shortcodes/) to embed for example YouTube video's

### YouTube

```plain
The spaces after {{ should not be used in working situation
{{ < youtube 2xkNJL4gJ9E >}}
```

### Github Gist

```plain
{{ < gist spf13 7896402 >}}
```

### Front Matter

```plain
---
title: "Title"
menuTitle: "OptionalMenuTitle"
date: 2020-03-06T15:33:12+01:00
draft: false
author: "John Do"
pre: "<i class='far fa-folder'></i> "
weight: 0
tags: ['Tools']
cascade:
    tags: ["Other"]
---
```

### Menu Shortcuts

### Add items to config.toml

```plain
[[menu.shortcuts]]
name = "<i class='fab fa-github'></i> Github repo"
identifier = "ds"
url = "https://github.com/johndo/"
weight = 10

[[menu.shortcuts]]
name = "<i class='fas fa-bookmark'></i> Hugo Documentation"
identifier = "hugodoc"
url = "https://gohugo.io/"
weight = 20
```

## Flags

```plain
hugo is the main command, used to build your Hugo site.

Hugo is a Fast and Flexible Static Site Generator
built with love by spf13 and friends in Go.

Complete documentation is available at http://gohugo.io/.

Usage:
  hugo [flags]
  hugo [command]

Available Commands:
  config      Print the site configuration
  convert     Convert your content to different formats
  deploy      Deploy your site to a Cloud provider.
  env         Print Hugo version and environment info
  gen         A collection of several useful generators.
  help        Help about any command
  import      Import your site from others.
  list        Listing out various types of content
  mod         Various Hugo Modules helpers.
  new         Create new content for your site
  server      A high performance webserver
  version     Print the version number of Hugo

Flags:
  -b, --baseURL string         hostname (and path) to the root, e.g. http://spf13.com/
  -D, --buildDrafts            include content marked as draft
  -E, --buildExpired           include expired content
  -F, --buildFuture            include content with publishdate in the future
      --cacheDir string        filesystem path to cache directory. Defaults: $TMPDIR/hugo_cache/
      --cleanDestinationDir    remove files from destination not found in static directories
      --config string          config file (default is path/config.yaml|json|toml)
      --configDir string       config dir (default "config")
  -c, --contentDir string      filesystem path to content directory
      --debug                  debug output
  -d, --destination string     filesystem path to write files to
      --disableKinds strings   disable different kind of pages (home, RSS etc.)
      --enableGitInfo          add Git revision, date and author info to the pages
  -e, --environment string     build environment
      --forceSyncStatic        copy all files when static is changed.
      --gc                     enable to run some cleanup tasks (remove unused cache files) after the build
  -h, --help                   help for hugo
      --i18n-warnings          print missing translations
      --ignoreCache            ignores the cache directory
      --ignoreVendor           ignores any _vendor directory
  -l, --layoutDir string       filesystem path to layout directory
      --log                    enable Logging
      --logFile string         log File path (if set, logging enabled automatically)
      --minify                 minify any supported output format (HTML, XML etc.)
      --noChmod                don't sync permission mode of files
      --noTimes                don't sync modification time of files
      --path-warnings          print warnings on duplicate target paths etc.
      --quiet                  build in quiet mode
      --renderToMemory         render to memory (only useful for benchmark testing)
  -s, --source string          filesystem path to read files relative from
      --templateMetrics        display metrics about template executions
      --templateMetricsHints   calculate some improvement hints when combined with --templateMetrics
  -t, --theme strings          themes to use (located in /themes/THEMENAME/)
      --themesDir string       filesystem path to themes directory
      --trace file             write trace to file (not useful in general)
  -v, --verbose                verbose output
      --verboseLog             verbose logging
  -w, --watch                  watch filesystem for changes and recreate as needed

Additional help topics:
  hugo check   Contains some verification checks

Use "hugo [command] --help" for more information about a command.
```

## Examples

### File attachments

```plain
{ {%attachments title="Related files" fa_icon_class="far fa-file-pdf" pattern=".*(pdf)"/%}}
```

Multiple filetypes

```plain
{ {%attachments title="Related files" fa_icon_class="far fa-file-code" pattern=".*(exe|ps1|py)"/%}}
```

### Enable target blank for links

```plain
Create layouts/_default/_markup/render-link.html
Add content:
<a href="{{ .Destination | safeURL }}"{{ with .Title}} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank" rel="noopener"{{ end }}>{{ .Text | safeHTML }}</a>
```

### Picture inline

```plain
![Example](images/example.png)
```

### Reference other pages

```plain
[Amass]({{ < ref "amass" > }})
```

### Start Hugo server on other port

```plain
hugo server --port 1337 --bind 0.0.0.0
```

### Server headers

```plain
[server]
[[server.headers]]
  for = '/**'
  [server.headers.values]
    Content-Security-Policy = "default-src https:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests"
    Referrer-Policy = 'strict-origin-when-cross-origin'
    X-Content-Type-Options = 'nosniff'
    X-Frame-Options = 'SAMEORIGIN'
    X-XSS-Protection = '1; mode=block'
    X-Referrer-Policy = 'no-referrer'
```

## URL List

- [GoHugo.io](https://gohugo.io/)
- [Github.com - Hugo](https://github.com/gohugoio/hugo/)
- [Learn theme getgrav.com](https://learn.getgrav.org)
- [Learn theme netlify.com](https://learn.netlify.com)
- [Hugo themes](https://themes.gohugo.io/)
- [Hugo configurations](https://gohugo.io/getting-started/configuration/)
