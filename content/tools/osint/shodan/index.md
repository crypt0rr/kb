---
title : "Shodan.io"
# pre : ' '
description : "Shodan is the world's first search engine for Internet-connected devices."
date : 2020-03-13T22:30:15+01:00
# hidden : true
# draft : true
weight : 300
# tags : ['']
---

---

Shodan is the world's first search engine for Internet-connected devices.

[Shodan.io](https://www.shodan.io)

## Examples

### Find devices in a particular city

```plain
city:"<city>"
```

### Find devices in a particular country

```plain
country:"<country-short>"
```

### Find specific title

```plain
title:"<title>"
```

### Search for specific organisation

```plain
org:"<name>"
```

### Chromecasts / Smart TVs

```plain
"Chromecast:" port:8008
```

### Microsoft RDP

```plain
"\x03\x00\x00\x0b\x06\xd0\x00\x00\x124\x00"
```

```plain
\x03\x00\x00\x13\x0e\xd0\x00\x00\x124\x00\x03\x00\x08\x00\x02\x00\x00\x00
```

### Open surveilance cameras (user: admin without password)

```plain  
NETSurveillance uc-httpd
```

### VNC-servers

```plain
"authentication disabled" "RFB 003.008"
"authentication disabled" port:5900,5901
```

### Find certificate properties

```plain
"ssl.cert.subject.cn:<name> country:nl"
```

### Find based on favicon

Get the favicon and create a hash with the following script. To use makes sure to edit the URL in the script.

{{%resources fa_icon_class="far fa-file-code" pattern=".*(py)"/%}}

```plain
http.favicon.hash:-1922044295
```

## Shodan CLI

## Installation

```plain
easy_install shodan
```

```plain
python3 -m pip install shodan
```

## Usage

```plain
shodan [OPTIONS] COMMAND [ARGS]...
```

## Flags

```plain
Options:
  -h, --help  Show this message and exit.

Commands:
  alert       Manage the network alerts for your account
  convert     Convert the given input data file into a different format.
  count       Returns the number of results for a search
  data        Bulk data access to Shodan
  domain      View all available information for a domain
  download    Download search results and save them in a compressed JSON...
  honeyscore  Check whether the IP is a honeypot or not.
  host        View all available information for an IP address
  info        Shows general information about your account
  init        Initialize the Shodan command-line
  myip        Print your external IP address
  org         Manage your organization's access to Shodan
  parse       Extract information out of compressed JSON files.
  radar       Real-Time Map of some results as Shodan finds them.
  scan        Scan an IP/ netblock using Shodan.
  search      Search the Shodan database
  stats       Provide summary information about a search query
  stream      Stream data in real-time.
  version     Print version of this tool.
```

```plain
shodan search country:"DE" port:"445"
```

## List of Shodan Filters

### General Filters

| **Name**           | **Description**                                                                                                                                                                                                            | **Type** |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **after**          | Only show results after the given date (dd/mm/yyyy) string                                                                                                                                                                 | string   |
| **asn**            | Autonomous system number string                                                                                                                                                                                            | string   |
| **before**         | Only show results before the given date (dd/mm/yyyy) string                                                                                                                                                                | string   |
| **category**       | Available categories: ics, malware string                                                                                                                                                                                  | string   |
| **city**           | Name of the city string                                                                                                                                                                                                    | string   |
| **country**        | 2-letter country code string                                                                                                                                                                                               | string   |
| **geo**            | Accepts between 2 and 4 parameters. If 2 parameters: latitude,longitude. If 3 parameters: latitude,longitude,range. If 4 parameters: top left latitude, top left longitude, bottom right latitude, bottom right longitude. | string   |
| **hash**           | Hash of the data property integer                                                                                                                                                                                          | integer  |
| **has_ipv6**       | True/ False boolean                                                                                                                                                                                                        | boolean  |
| **has_screenshot** | True/ False boolean                                                                                                                                                                                                        | boolean  |
| **hostname**       | Full hostname for the device string                                                                                                                                                                                        | string   |
| **ip**             | Alias for net filter string                                                                                                                                                                                                | string   |
| **isp**            | ISP managing the netblock string                                                                                                                                                                                           | string   |
| **net**            | Network range in CIDR notation (ex. 199.4.1.0/24) string                                                                                                                                                                   | string   |
| **org**            | Organization assigned the netblock string                                                                                                                                                                                  | string   |
| **os**             | Operating system string                                                                                                                                                                                                    | string   |
| **port**           | Port number for the service integer                                                                                                                                                                                        | string   |
| **postal**         | Postal code (US-only) string                                                                                                                                                                                               | string   |
| **product**        | Name of the software/ product providing the banner string                                                                                                                                                                  | string   |
| **region**         | Name of the region/ state string                                                                                                                                                                                           | string   |
| **state**          | Alias for region string                                                                                                                                                                                                    | string   |
| **version**        | Version for the product string                                                                                                                                                                                             | string   |
| **vuln**           | CVE ID for a vulnerability string                                                                                                                                                                                          | string   |

### HTTP Filters

| **Name**                    | **Description**                                  | **Type** |
| --------------------------- | ------------------------------------------------ | -------- |
| **http.component**          | Name of web technology used on the website       | string   |
| **http.component_category** | Category of web components used on the   website | string   |
| **http.html**               | HTML of web banners                              | string   |
| **http.html_hash**          | Hash of the website HTML                         | integer  |
| **http.status**             | Response status code                             | integer  |
| **http.title**              | Title for the web banners website                | string   |

### NTP Filters

| **Name**         | **Description**                                                              | **Type** |
| ---------------- | ---------------------------------------------------------------------------- | -------- |
| **ntp.ip**       | IP addresses returned by monlist                                             | string   |
| **ntp.ip_count** | Number of IPs returned by initial monlist                                    | integer  |
| **ntp.more**     | True/ False; whether there are more IP addresses to be gathered from monlist | boolean  |
| **ntp.port**     | Port used by IP addresses in monlist                                         | integer  |

### SSL Filters

| **Name**                 | **Description**                                       | **Type**         |
| ------------------------ | ----------------------------------------------------- | ---------------- |
| **has_ssl**              | True / False                                          | boolean          |
| **ssl**                  | Search all SSL data                                   | string           |
| **ssl.alpn**             | Application layer protocols such as HTTP/2 ("h2")     | string           |
| **ssl.chain_count**      | Number of certificates in the chain                   | integer          |
| **ssl.version**          | Possible values: SSLv2, SSLv3, TLSv1,TLSv1.1, TLSv1.2 | string           |
| **ssl.cert.alg**         | Certificate algorithm                                 | string           |
| **ssl.cert.expired**     | True / False                                          | boolean          |
| **ssl.cert.extension**   | vNames of extensions in the certificate               | string           |
| **ssl.cert.serial**      | Serial number as an integer or hexadecimal string     | integer / string |
| **ssl.cert.pubkey.bits** | Number of bits in the public key                      | integer          |
| **ssl.cert.pubkey.type** | Public key type                                       | string           |
| **ssl.cipher.version**   | SSL version of the preferred cipher                   | string           |
| **ssl.cipher.bits**      | Number of bits in the preferred cipher                | integer          |
| **ssl.cipher.name**      | Name of the preferred cipher                          | string           |

### Telnet Filters

| **Name**          | **Description**                                             | **Type** |
| ----------------- | ----------------------------------------------------------- | -------- |
| **telnet.option** | Search all the options                                      | string   |
| **telnet.do**     | The server requests the client do support these options     | string   |
| **telnet.dont**   | The server requests the client to not support these options | string   |
| **telnet.will**   | The server supports these options                           | string   |
| **telnet.wont**   | The server doesnt support these options                     | string   |

## URL List

- [Shodan.io](https://www.shodan.io/)
- [cli.shodan.io](https://cli.shodan.io/)
