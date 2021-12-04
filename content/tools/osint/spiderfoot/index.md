---
title : "SpiderFoot"
# pre : ' '
description : "SpiderFoot is an open source intelligence (OSINT) automation tool. It integrates with just about every data source available and utilises a range of methods for data analysis, making that data easy to navigate."
date : 2021-07-10T14:26:49+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## SpiderFoot

Is an open source intelligence (OSINT) automation tool. It integrates with just about every data source available and utilises a range of methods for data analysis, making that data easy to navigate.

### FEATURES

* Web based UI or CLI
* Over 200 modules (see below)
* Python 3
* CSV/JSON/GEXF export
* API key export/import
* SQLite back-end for custom querying
* Highly configurable
* Fully documented
* Visualisations
* TOR integration for dark web searching
* Dockerfile for Docker-based deployments
* Can call other tools like DNSTwist, Whatweb, Nmap and CMSeeK
* Actively developed since 2012!

### USES

SpiderFoot can be used offensively (e.g. in a red team exercise or penetration test) for reconnaissance of your target or defensively to gather information about what you or your organisation might have exposed over the Internet.

You can target the following entities in a SpiderFoot scan:

* IP address
* Domain/sub-domain name
* Hostname
* Network subnet (CIDR)
* ASN
* E-mail address
* Phone number
* Username
* Person's name
* Bitcoin address

SpiderFoot's 200+ modules feed each other in a publisher/subscriber model to ensure maximum data extraction to do things like:

* [Host/sub-domain/TLD enumeration/extraction](https://asciinema.org/a/295912)
* [Email address, phone number and human name extraction](https://asciinema.org/a/295947)
* [Bitcoin and Ethereum address extraction](https://asciinema.org/a/295957)
* [Check for susceptibility to sub-domain hijacking](https://asciinema.org/a/344377)
* DNS zone transfers
* [Threat intelligence and Blacklist queries](https://asciinema.org/a/295949)
* API integration with [SHODAN](https://asciinema.org/a/127601), [HaveIBeenPwned](https://asciinema.org/a/128731), [GreyNoise](https://asciinema.org/a/295943), AlienVault, SecurityTrails, etc.
* [Social media account enumeration](https://asciinema.org/a/295923)
* [S3/Azure/Digitalocean bucket enumeration/scraping](https://asciinema.org/a/295941)
* IP geo-location
* Web scraping, web content analysis
* [Image, document and binary file meta data analysis](https://asciinema.org/a/296274)
* Dark web searches
* [Port scanning and banner grabbing](https://asciinema.org/a/295939)
* [Data breach searches](https://asciinema.org/a/296145)
* So much more...

### Installation

#### Stable build (packaged release)

```plain
wget https://github.com/smicallef/spiderfoot/archive/v3.3.tar.gz
tar zxvf v3.3.tar.gz
cd spiderfoot
pip3 install -r requirements.txt
python3 ./sf.py -l 127.0.0.1:5001
```

#### Development build (cloning git master branch)

```plain
git clone https://github.com/smicallef/spiderfoot.git
cd spiderfoot
pip3 install -r requirements.txt
python3 ./sf.py -l 127.0.0.1:5001
```

Check out the [documentation](https://www.spiderfoot.net/documentation) and our [asciinema videos](https://asciinema.org/~spiderfoot) for more tutorials.

### MODULES / INTEGRATIONS

SpiderFoot has over 200 modules, most of which *don't require API keys*, and many of those that do require API keys *have a free tier*.

| Name                         | Description                                                                                                                     | Link                                                                                                                   | Type           |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- | :------------- |
| abuse.ch                     | Check if a host/domain, IP or netblock is malicious according to abuse.ch.                                                      | [https://www.abuse.ch](https://www.abuse.ch)                                                                           | Free API       |
| AbuseIPDB                    | Check if an IP address is malicious according to AbuseIPDB.com blacklist.                                                       | [https://www.abuseipdb.com](https://www.abuseipdb.com)                                                                 | Tiered API     |
| Account Finder               | Look for possible associated accounts on nearly 200 websites like Ebay, Slashdot, reddit, etc.                                  | N/A                                                                                                                    | Internal       |
| AdBlock Check                | Check if linked pages would be blocked by AdBlock Plus.                                                                         | [https://adblockplus.org/](https://adblockplus.org/)                                                                   | Tiered API     |
| Ahmia                        | Search Tor 'Ahmia' search engine for mentions of the target domain.                                                             | [https://ahmia.fi/](https://ahmia.fi/)                                                                                 | Free API       |
| AlienVault IP Reputation     | Check if an IP or netblock is malicious according to the AlienVault IP Reputation database.                                     | [https://cybersecurity.att.com/](https://cybersecurity.att.com/)                                                       | Free API       |
| AlienVault OTX               | Obtain information from AlienVault Open Threat Exchange (OTX)                                                                   | [https://otx.alienvault.com/](https://otx.alienvault.com/)                                                             | Tiered API     |
| Amazon S3 Bucket Finder      | Search for potential Amazon S3 buckets associated with the target and attempt to list their contents.                           | [https://aws.amazon.com/s3/](https://aws.amazon.com/s3/)                                                               | Free API       |
| Apility                      | Search Apility API for IP address and domain reputation.                                                                        | [https://auth0.com/signals](https://auth0.com/signals)                                                                 | Tiered API     |
| Apple iTunes                 | Search Apple iTunes for mobile apps.                                                                                            | [https://itunes.apple.com/](https://itunes.apple.com/)                                                                 | Internal       |
| Archive.org                  | Identifies historic versions of interesting files/pages from the Wayback Machine.                                               | [https://archive.org/](https://archive.org/)                                                                           | Free API       |
| ARIN                         | Queries ARIN registry for contact information.                                                                                  | [https://www.arin.net/](https://www.arin.net/)                                                                         | Free API       |
| Azure Blob Finder            | Search for potential Azure blobs associated with the target and attempt to list their contents.                                 | [https://azure.microsoft.com/en-in/services/storage/blobs/](https://azure.microsoft.com/en-in/services/storage/blobs/) | Free API       |
| Bad Packets                  | Obtain information about any malicious activities involving IP addresses found                                                  | [https://badpackets.net](https://badpackets.net)                                                                       | Commercial API |
| badips.com                   | Check if an IP address is malicious according to BadIPs.com.                                                                    | [https://www.badips.com/](https://www.badips.com/)                                                                     | Free API       |
| Bambenek C&C List            | Check if a host/domain or IP appears on Bambenek Consulting's C&C tracker lists.                                                | [http://www.bambenekconsulting.com/](http://www.bambenekconsulting.com/)                                               | Free API       |
| Base64 Decoder               | Identify Base64-encoded strings in URLs, often revealing interesting hidden information.                                        | N/A                                                                                                                    | Internal       |
| BGPView                      | Obtain network information from BGPView API.                                                                                    | [https://bgpview.io/](https://bgpview.io/)                                                                             | Free API       |
| Binary String Extractor      | Attempt to identify strings in binary content.                                                                                  | N/A                                                                                                                    | Internal       |
| BinaryEdge                   | Obtain information from BinaryEdge.io Internet scanning systems, including breaches, vulnerabilities, torrents and passive DNS. | [https://www.binaryedge.io/](https://www.binaryedge.io/)                                                               | Tiered API     |
| Bing (Shared IPs)            | Search Bing for hosts sharing the same IP.                                                                                      | [https://www.bing.com/](https://www.bing.com/)                                                                         | Tiered API     |
| Bing                         | Obtain information from bing to identify sub-domains and links.                                                                 | [https://www.bing.com/](https://www.bing.com/)                                                                         | Tiered API     |
| Bitcoin Finder               | Identify bitcoin addresses in scraped webpages.                                                                                 | N/A                                                                                                                    | Internal       |
| Bitcoin Who's Who            | Check for Bitcoin addresses against the Bitcoin Who's Who database of suspect/malicious addresses.                              | [https://bitcoinwhoswho.com/](https://bitcoinwhoswho.com/)                                                             | Tiered API     |
| BitcoinAbuse                 | Check Bitcoin addresses against the bitcoinabuse.com database of suspect/malicious addresses.                                   | [https://www.bitcoinabuse.com/](https://www.bitcoinabuse.com/)                                                         | Free API       |
| Blockchain                   | Queries blockchain.info to find the balance of identified bitcoin wallet addresses.                                             | [https://www.blockchain.com/](https://www.blockchain.com/)                                                             | Free API       |
| blocklist.de                 | Check if a netblock or IP is malicious according to blocklist.de.                                                               | [http://www.blocklist.de/en/index.html](http://www.blocklist.de/en/index.html)                                         | Free API       |
| BotScout                     | Searches botscout.com's database of spam-bot IPs and e-mail addresses.                                                          | [http://botscout.com/](http://botscout.com/)                                                                           | Tiered API     |
| botvrij.eu                   | Check if a domain is malicious according to botvrij.eu.                                                                         | [https://botvrij.eu/](https://botvrij.eu/)                                                                             | Free API       |
| BuiltWith                    | Query BuiltWith.com's Domain API for information about your target's web technology stack, e-mail addresses and more.           | [https://builtwith.com/](https://builtwith.com/)                                                                       | Tiered API     |
| C99                          | Queries the C99 API which offers various data (geo location, proxy detection, phone lookup, etc).                               | [https://api.c99.nl/](https://api.c99.nl/)                                                                             | Commercial API |
| CallerName                   | Lookup US phone number location and reputation information.                                                                     | [http://callername.com/](http://callername.com/)                                                                       | Free API       |
| Censys                       | Obtain information from Censys.io                                                                                               | [https://censys.io/](https://censys.io/)                                                                               | Tiered API     |
| Certificate Transparency     | Gather hostnames from historical certificates in crt.sh.                                                                        | [https://crt.sh/](https://crt.sh/)                                                                                     | Free API       |
| CINS Army List               | Check if a netblock or IP address is malicious according to cinsscore.com's Army List.                                          | [https://cinsscore.com/](https://cinsscore.com/)                                                                       | Free API       |
| CIRCL.LU                     | Obtain information from CIRCL.LU's Passive DNS and Passive SSL databases.                                                       | [https://www.circl.lu/](https://www.circl.lu/)                                                                         | Free API       |
| CleanBrowsing.org            | Check if a host would be blocked by CleanBrowsing.org DNS                                                                       | [https://cleanbrowsing.org/](https://cleanbrowsing.org/)                                                               | Free API       |
| CleanTalk Spam List          | Check if a netblock or IP address is on CleanTalk.org's spam IP list.                                                           | [https://cleantalk.org](https://cleantalk.org)                                                                         | Free API       |
| Clearbit                     | Check for names, addresses, domains and more based on lookups of e-mail addresses on clearbit.com.                              | [https://clearbit.com/](https://clearbit.com/)                                                                         | Tiered API     |
| CloudFlare Malware DNS       | Check if a host would be blocked by CloudFlare Malware-blocking DNS                                                             | [https://www.cloudflare.com/](https://www.cloudflare.com/)                                                             | Free API       |
| CoinBlocker Lists            | Check if a host/domain or IP appears on CoinBlocker lists.                                                                      | [https://zerodot1.gitlab.io/CoinBlockerListsWeb/](https://zerodot1.gitlab.io/CoinBlockerListsWeb/)                     | Free API       |
| CommonCrawl                  | Searches for URLs found through CommonCrawl.org.                                                                                | [http://commoncrawl.org/](http://commoncrawl.org/)                                                                     | Free API       |
| Comodo                       | Check if a host would be blocked by Comodo DNS                                                                                  | [https://www.comodo.com/secure-dns/](https://www.comodo.com/secure-dns/)                                               | Free API       |
| Company Name Extractor       | Identify company names in any obtained data.                                                                                    | N/A                                                                                                                    | Internal       |
| Cookie Extractor             | Extract Cookies from HTTP headers.                                                                                              | N/A                                                                                                                    | Internal       |
| Country Name Extractor       | Identify country names in any obtained data.                                                                                    | N/A                                                                                                                    | Internal       |
| Credit Card Number Extractor | Identify Credit Card Numbers in any data                                                                                        | N/A                                                                                                                    | Internal       |
| Crobat API                   | Search Crobat API for subdomains.                                                                                               | [https://sonar.omnisint.io/](https://sonar.omnisint.io/)                                                               | Free API       |
| Cross-Referencer             | Identify whether other domains are associated ('Affiliates') of the target by looking for links back to the target site(s).     | N/A                                                                                                                    | Internal       |
| CRXcavator                   | Search CRXcavator for Chrome extensions.                                                                                        | [https://crxcavator.io/](https://crxcavator.io/)                                                                       | Free API       |
| Custom Threat Feed           | Check if a host/domain, netblock, ASN or IP is malicious according to your custom feed.                                         | N/A                                                                                                                    | Internal       |
| cybercrime-tracker.net       | Check if a host/domain or IP is malicious according to cybercrime-tracker.net.                                                  | [http://cybercrime-tracker.net/](http://cybercrime-tracker.net/)                                                       | Free API       |
| Darksearch                   | Search the Darksearch.io Tor search engine for mentions of the target domain.                                                   | [https://darksearch.io/](https://darksearch.io/)                                                                       | Free API       |
| Debounce                     | Check whether an email is disposable                                                                                            | [https://debounce.io/](https://debounce.io/)                                                                           | Free API       |
| Dehashed                     | Gather breach data from Dehashed API.                                                                                           | [https://www.dehashed.com/](https://www.dehashed.com/)                                                                 | Commercial API |
| Digital Ocean Space Finder   | Search for potential Digital Ocean Spaces associated with the target and attempt to list their contents.                        | [https://www.digitalocean.com/products/spaces/](https://www.digitalocean.com/products/spaces/)                         | Free API       |
| DNS Brute-forcer             | Attempts to identify hostnames through brute-forcing common names and iterations.                                               | N/A                                                                                                                    | Internal       |
| DNS Common SRV               | Attempts to identify hostnames through brute-forcing common DNS SRV records.                                                    | N/A                                                                                                                    | Internal       |
| DNS Look-aside               | Attempt to reverse-resolve the IP addresses next to your target to see if they are related.                                     | N/A                                                                                                                    | Internal       |
| DNS Raw Records              | Retrieves raw DNS records such as MX, TXT and others.                                                                           | N/A                                                                                                                    | Internal       |
| DNS Resolver                 | Resolves Hosts and IP Addresses identified, also extracted from raw content.                                                    | N/A                                                                                                                    | Internal       |
| DNS Zone Transfer            | Attempts to perform a full DNS zone transfer.                                                                                   | N/A                                                                                                                    | Internal       |
| DNSDB                        | Query FarSight's DNSDB for historical and passive DNS data.                                                                     | [https://www.farsightsecurity.com](https://www.farsightsecurity.com)                                                   | Tiered API     |
| DNSGrep                      | Obtain Passive DNS information from Rapid7 Sonar Project using DNSGrep API.                                                     | [https://opendata.rapid7.com/](https://opendata.rapid7.com/)                                                           | Free API       |
| DroneBL                      | Query the DroneBL database for open relays, open proxies, vulnerable servers, etc.                                              | [https://dronebl.org/](https://dronebl.org/)                                                                           | Free API       |
| DuckDuckGo                   | Query DuckDuckGo's API for descriptive information about your target.                                                           | [https://duckduckgo.com/](https://duckduckgo.com/)                                                                     | Free API       |
| E-Mail Address Extractor     | Identify e-mail addresses in any obtained data.                                                                                 | N/A                                                                                                                    | Internal       |
| EmailCrawlr                  | Search EmailCrawlr for email addresses and phone numbers associated with a domain.                                              | [https://emailcrawlr.com/](https://emailcrawlr.com/)                                                                   | Tiered API     |
| EmailFormat                  | Look up e-mail addresses on email-format.com.                                                                                   | [https://www.email-format.com/](https://www.email-format.com/)                                                         | Free API       |
| EmailRep                     | Search EmailRep.io for email address reputation.                                                                                | [https://emailrep.io/](https://emailrep.io/)                                                                           | Tiered API     |
| Emerging Threats             | Check if a netblock or IP is malicious according to emergingthreats.net.                                                        | [https://rules.emergingthreats.net/](https://rules.emergingthreats.net/)                                               | Free API       |
| Error String Extractor       | Identify common error messages in content like SQL errors, etc.                                                                 | N/A                                                                                                                    | Internal       |
| Ethereum Address Extractor   | Identify ethereum addresses in scraped webpages.                                                                                | N/A                                                                                                                    | Internal       |
| Etherscan                    | Queries etherscan.io to find the balance of identified ethereum wallet addresses.                                               | [https://etherscan.io](https://etherscan.io)                                                                           | Free API       |
| F-Secure Riddler.io          | Obtain network information from F-Secure Riddler.io API.                                                                        | [https://riddler.io/](https://riddler.io/)                                                                             | Commercial API |
| File Metadata Extractor      | Extracts meta data from documents and images.                                                                                   | N/A                                                                                                                    | Internal       |
| Flickr                       | Search Flickr for domains, URLs and emails related to the specified domain.                                                     | [https://www.flickr.com/](https://www.flickr.com/)                                                                     | Free API       |
| Fortiguard.com               | Check if an IP is malicious according to Fortiguard.com.                                                                        | [https://fortiguard.com/](https://fortiguard.com/)                                                                     | Free API       |
| Fraudguard                   | Obtain threat information from Fraudguard.io                                                                                    | [https://fraudguard.io/](https://fraudguard.io/)                                                                       | Tiered API     |
| Fringe Project               | Obtain network information from Fringe Project API.                                                                             | [https://fringeproject.com/](https://fringeproject.com/)                                                               | Free API       |
| FullContact                  | Gather domain and e-mail information from FullContact.com API.                                                                  | [https://www.fullcontact.com](https://www.fullcontact.com)                                                             | Tiered API     |
| Github                       | Identify associated public code repositories on Github.                                                                         | [https://github.com/](https://github.com/)                                                                             | Free API       |
| Google Maps                  | Identifies potential physical addresses and latitude/longitude coordinates.                                                     | [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)                                     | Tiered API     |
| Google Object Storage Finder | Search for potential Google Object Storage buckets associated with the target and attempt to list their contents.               | [https://cloud.google.com/storage](https://cloud.google.com/storage)                                                   | Free API       |
| Google SafeBrowsing          | Check if the URL is included on any of the Safe Browsing lists.                                                                 | [https://developers.google.com/safe-browsing/v4/lookup-api](https://developers.google.com/safe-browsing/v4/lookup-api) | Free API       |
| Google                       | Obtain information from the Google Custom Search API to identify sub-domains and links.                                         | [https://developers.google.com/custom-search](https://developers.google.com/custom-search)                             | Tiered API     |
| Gravatar                     | Retrieve user information from Gravatar API.                                                                                    | [https://secure.gravatar.com/](https://secure.gravatar.com/)                                                           | Free API       |
| Grayhat Warfare              | Find bucket names matching the keyword extracted from a domain from Grayhat API.                                                | [https://buckets.grayhatwarfare.com/](https://buckets.grayhatwarfare.com/)                                             | Tiered API     |
| Greensnow                    | Check if a netblock or IP address is malicious according to greensnow.co.                                                       | [https://greensnow.co/](https://greensnow.co/)                                                                         | Free API       |
| grep.app                     | Search grep.app API for links and emails related to the specified domain.                                                       | [https://grep.app/](https://grep.app/)                                                                                 | Free API       |
| Greynoise                    | Obtain information from Greynoise.io's Enterprise API.                                                                          | [https://greynoise.io/](https://greynoise.io/)                                                                         | Tiered API     |
| HackerOne (Unofficial)       | Check external vulnerability scanning/reporting service h1.nobbd.de to see if the target is listed.                             | [http://www.nobbd.de/](http://www.nobbd.de/)                                                                           | Free API       |
| HackerTarget                 | Search HackerTarget.com for hosts sharing the same IP.                                                                          | [https://hackertarget.com/](https://hackertarget.com/)                                                                 | Free API       |
| Hash Extractor               | Identify MD5 and SHA hashes in web content, files and more.                                                                     | N/A                                                                                                                    | Internal       |
| HaveIBeenPwned               | Check HaveIBeenPwned.com for hacked e-mail addresses identified in breaches.                                                    | [https://haveibeenpwned.com/](https://haveibeenpwned.com/)                                                             | Commercial API |
| Honeypot Checker             | Query the projecthoneypot.org database for entries.                                                                             | [https://www.projecthoneypot.org/](https://www.projecthoneypot.org/)                                                   | Free API       |
| Host.io                      | Obtain information about domain names from host.io.                                                                             | [https://host.io](https://host.io)                                                                                     | Tiered API     |
| Hosting Provider Identifier  | Find out if any IP addresses identified fall within known 3rd party hosting ranges, e.g. Amazon, Azure, etc.                    | N/A                                                                                                                    | Internal       |
| Human Name Extractor         | Attempt to identify human names in fetched content.                                                                             | N/A                                                                                                                    | Internal       |
| Hunter.io                    | Check for e-mail addresses and names on hunter.io.                                                                              | [https://hunter.io/](https://hunter.io/)                                                                               | Tiered API     |
| Hybrid Analysis              | Search Hybrid Analysis for domains and URLs related to the target.                                                              | [https://www.hybrid-analysis.com](https://www.hybrid-analysis.com)                                                     | Free API       |
| IBAN Number Extractor        | Identify IBAN Numbers in any data                                                                                               | N/A                                                                                                                    | Internal       |
| Iknowwhatyoudownload.com     | Check iknowwhatyoudownload.com for IP addresses that have been using BitTorrent.                                                | [https://iknowwhatyoudownload.com/en/peer/](https://iknowwhatyoudownload.com/en/peer/)                                 | Tiered API     |
| Instagram                    | Gather information from Instagram profiles.                                                                                     | [https://www.instagram.com/](https://www.instagram.com/)                                                               | Free API       |
| IntelligenceX                | Obtain information from IntelligenceX about identified IP addresses, domains, e-mail addresses and phone numbers.               | [https://intelx.io/](https://intelx.io/)                                                                               | Tiered API     |
| Interesting File Finder      | Identifies potential files of interest, e.g. office documents, zip files.                                                       | N/A                                                                                                                    | Internal       |
| Internet Storm Center        | Check if an IP is malicious according to SANS ISC.                                                                              | [https://isc.sans.edu](https://isc.sans.edu)                                                                           | Free API       |
| ipapi.com                    | Queries ipapi.com to identify geolocation of IP Addresses using ipapi.com API                                                   | [https://ipapi.com/](https://ipapi.com/)                                                                               | Tiered API     |
| ipapi.co                     | Queries ipapi.co to identify geolocation of IP Addresses using ipapi.co API                                                     | [https://ipapi.co/](https://ipapi.co/)                                                                                 | Tiered API     |
| IPInfo.io                    | Identifies the physical location of IP addresses identified using ipinfo.io.                                                    | [https://ipinfo.io](https://ipinfo.io)                                                                                 | Tiered API     |
| IPQualityScore               | Determine if target is malicious using IPQualityScore API                                                                       | [https://www.ipqualityscore.com/](https://www.ipqualityscore.com/)                                                     | Tiered API     |
| ipregistry                   | Query the ipregistry.co database for reputation and geo-location.                                                               | [https://ipregistry.co/](https://ipregistry.co/)                                                                       | Tiered API     |
| ipstack                      | Identifies the physical location of IP addresses identified using ipstack.com.                                                  | [https://ipstack.com/](https://ipstack.com/)                                                                           | Tiered API     |
| JsonWHOIS.com                | Search JsonWHOIS.com for WHOIS records associated with a domain.                                                                | [https://jsonwhois.com](https://jsonwhois.com)                                                                         | Tiered API     |
| Junk File Finder             | Looks for old/temporary and other similar files.                                                                                | N/A                                                                                                                    | Internal       |
| Keybase                      | Obtain additional information about target username                                                                             | [https://keybase.io/](https://keybase.io/)                                                                             | Free API       |
| Koodous                      | Search Koodous for mobile apps.                                                                                                 | [https://koodous.com/apks/](https://koodous.com/apks/)                                                                 | Free API       |
| Leak-Lookup                  | Searches Leak-Lookup.com's database of breaches.                                                                                | [https://leak-lookup.com/](https://leak-lookup.com/)                                                                   | Free API       |
| LeakIX                       | Search LeakIX for host data leaks, open ports, software and geoip.                                                              | [https://leakix.net/](https://leakix.net/)                                                                             | Free API       |
| Maltiverse                   | Obtain information about any malicious activities involving IP addresses                                                        | [https://maltiverse.com](https://maltiverse.com)                                                                       | Free API       |
| malwaredomainlist.com        | Check if a host/domain, IP or netblock is malicious according to malwaredomainlist.com.                                         | [http://www.malwaredomainlist.com/](http://www.malwaredomainlist.com/)                                                 | Free API       |
| malwaredomains.com           | Check if a host/domain is malicious according to malwaredomains.com.                                                            | [http://www.malwaredomains.com/](http://www.malwaredomains.com/)                                                       | Free API       |
| MalwarePatrol                | Searches malwarepatrol.net's database of malicious URLs/IPs.                                                                    | [https://www.malwarepatrol.net/](https://www.malwarepatrol.net/)                                                       | Tiered API     |
| MetaDefender                 | Search MetaDefender API for IP address and domain IP reputation.                                                                | [https://metadefender.opswat.com/](https://metadefender.opswat.com/)                                                   | Tiered API     |
| Mnemonic PassiveDNS          | Obtain Passive DNS information from PassiveDNS.mnemonic.no.                                                                     | [https://www.mnemonic.no](https://www.mnemonic.no)                                                                     | Free API       |
| multiproxy.org Open Proxies  | Check if an IP is an open proxy according to multiproxy.org' open proxy list.                                                   | [https://multiproxy.org/](https://multiproxy.org/)                                                                     | Free API       |
| MySpace                      | Gather username and location from MySpace.com profiles.                                                                         | [https://myspace.com/](https://myspace.com/)                                                                           | Free API       |
| NameAPI                      | Check whether an email is disposable                                                                                            | [https://www.nameapi.org/](https://www.nameapi.org/)                                                                   | Tiered API     |
| NetworksDB                   | Search NetworksDB.io API for IP address and domain information.                                                                 | [https://networksdb.io/](https://networksdb.io/)                                                                       | Tiered API     |
| NeutrinoAPI                  | Search NeutrinoAPI for IP address info and check IP reputation.                                                                 | [https://www.neutrinoapi.com/](https://www.neutrinoapi.com/)                                                           | Tiered API     |
| numverify                    | Lookup phone number location and carrier information from numverify.com.                                                        | [http://numverify.com/](http://numverify.com/)                                                                         | Tiered API     |
| Onion.link                   | Search Tor 'Onion City' search engine for mentions of the target domain.                                                        | [https://onion.link/](https://onion.link/)                                                                             | Free API       |
| Onionsearchengine.com        | Search Tor onionsearchengine.com for mentions of the target domain.                                                             | [https://as.onionsearchengine.com](https://as.onionsearchengine.com)                                                   | Free API       |
| Onyphe                       | Check Onyphe data (threat list, geo-location, pastries, vulnerabilities)  about a given IP.                                     | [https://www.onyphe.io](https://www.onyphe.io)                                                                         | Tiered API     |
| Open Bug Bounty              | Check external vulnerability scanning/reporting service openbugbounty.org to see if the target is listed.                       | [https://www.openbugbounty.org/](https://www.openbugbounty.org/)                                                       | Free API       |
| Open Passive DNS Database    | Obtain passive DNS information from pdns.daloo.de Open passive DNS database.                                                    | [http://pdns.daloo.de/](http://pdns.daloo.de/)                                                                         | Free API       |
| OpenCorporates               | Look up company information from OpenCorporates.                                                                                | [https://opencorporates.com](https://opencorporates.com)                                                               | Tiered API     |
| OpenDNS                      | Check if a host would be blocked by OpenDNS DNS                                                                                 | [https://www.opendns.com/](https://www.opendns.com/)                                                                   | Free API       |
| OpenPhish                    | Check if a host/domain is malicious according to OpenPhish.com.                                                                 | [https://openphish.com/](https://openphish.com/)                                                                       | Free API       |
| OpenStreetMap                | Retrieves latitude/longitude coordinates for physical addresses from OpenStreetMap API.                                         | [https://www.openstreetmap.org/](https://www.openstreetmap.org/)                                                       | Free API       |
| Page Information             | Obtain information about web pages (do they take passwords, do they contain forms, etc.)                                        | N/A                                                                                                                    | Internal       |
| PasteBin                     | PasteBin search (via Google Search API) to identify related content.                                                            | [https://pastebin.com/](https://pastebin.com/)                                                                         | Tiered API     |
| PGP Key Servers              | Look up e-mail addresses in PGP public key servers.                                                                             | N/A                                                                                                                    | Internal       |
| PhishStats                   | Determine if an IP Address is malicious                                                                                         | [https://phishstats.info/](https://phishstats.info/)                                                                   | Free API       |
| PhishTank                    | Check if a host/domain is malicious according to PhishTank.                                                                     | [https://phishtank.com/](https://phishtank.com/)                                                                       | Free API       |
| Phone Number Extractor       | Identify phone numbers in scraped webpages.                                                                                     | N/A                                                                                                                    | Internal       |
| Port Scanner - TCP           | Scans for commonly open TCP ports on Internet-facing systems.                                                                   | N/A                                                                                                                    | Internal       |
| ProjectDiscovery Chaos       | Search for hosts/subdomains using chaos.projectdiscovery.io                                                                     | [https://chaos.projectdiscovery.io](https://chaos.projectdiscovery.io)                                                 | Commercial API |
| Psbdmp                       | Check psbdmp.cc (PasteBin Dump) for potentially hacked e-mails and domains.                                                     | [https://psbdmp.cc/](https://psbdmp.cc/)                                                                               | Free API       |
| Pulsedive                    | Obtain information from Pulsedive's API.                                                                                        | [https://pulsedive.com/](https://pulsedive.com/)                                                                       | Tiered API     |
| Quad9                        | Check if a host would be blocked by Quad9                                                                                       | [https://quad9.net/](https://quad9.net/)                                                                               | Free API       |
| Recon.dev                    | Search Recon.dev for subdomains.                                                                                                | [https://recon.dev](https://recon.dev)                                                                                 | Internal       |
| RIPE                         | Queries the RIPE registry (includes ARIN data) to identify netblocks and other info.                                            | [https://www.ripe.net/](https://www.ripe.net/)                                                                         | Free API       |
| RiskIQ                       | Obtain information from RiskIQ's (formerly PassiveTotal) Passive DNS and Passive SSL databases.                                 | [https://community.riskiq.com/](https://community.riskiq.com/)                                                         | Tiered API     |
| Robtex                       | Search Robtex.com for hosts sharing the same IP.                                                                                | [https://www.robtex.com/](https://www.robtex.com/)                                                                     | Free API       |
| Scylla                       | Gather breach data from Scylla API.                                                                                             | [https://scylla.so/](https://scylla.so/)                                                                               | Free API       |
| SecurityTrails               | Obtain Passive DNS and other information from SecurityTrails                                                                    | [https://securitytrails.com/](https://securitytrails.com/)                                                             | Tiered API     |
| Seon                         | Queries seon.io to gather intelligence about IP Addresses, email addresses, and phone numbers                                   | [https://seon.io/](https://seon.io/)                                                                                   | Commercial API |
| SHODAN                       | Obtain information from SHODAN about identified IP addresses.                                                                   | [https://www.shodan.io/](https://www.shodan.io/)                                                                       | Tiered API     |
| Similar Domain Finder        | Search various sources to identify similar looking domain names, for instance squatted domains.                                 | N/A                                                                                                                    | Internal       |
| Skymem                       | Look up e-mail addresses on Skymem.                                                                                             | [http://www.skymem.info/](http://www.skymem.info/)                                                                     | Free API       |
| SlideShare                   | Gather name and location from SlideShare profiles.                                                                              | [https://www.slideshare.net](https://www.slideshare.net)                                                               | Free API       |
| Snov                         | Gather available email IDs from identified domains                                                                              | [https://snov.io/](https://snov.io/)                                                                                   | Tiered API     |
| Social Links                 | Queries mtg-bi.com to gather intelligence from social media platforms and dark web                                              | [https://mtg-bi.com/](https://mtg-bi.com/)                                                                             | Commercial API |
| Social Media Profile Finder  | Tries to discover the social media profiles for human names identified.                                                         | [https://developers.google.com/custom-search](https://developers.google.com/custom-search)                             | Tiered API     |
| Social Network Identifier    | Identify presence on social media networks such as LinkedIn, Twitter and others.                                                | N/A                                                                                                                    | Internal       |
| SORBS                        | Query the SORBS database for open relays, open proxies, vulnerable servers, etc.                                                | [http://www.sorbs.net/](http://www.sorbs.net/)                                                                         | Free API       |
| SpamCop                      | Query various spamcop databases for open relays, open proxies, vulnerable servers, etc.                                         | [https://www.spamcop.net/](https://www.spamcop.net/)                                                                   | Free API       |
| Spamhaus                     | Query the Spamhaus databases for open relays, open proxies, vulnerable servers, etc.                                            | [https://www.spamhaus.org/](https://www.spamhaus.org/)                                                                 | Free API       |
| spur.us                      | Obtain information about any malicious activities involving IP addresses found                                                  | [https://spur.us/](https://spur.us/)                                                                                   | Commercial API |
| SpyOnWeb                     | Search SpyOnWeb for hosts sharing the same IP address, Google Analytics code, or Google Adsense code.                           | [http://spyonweb.com/](http://spyonweb.com/)                                                                           | Tiered API     |
| Spyse                        | SpiderFoot plug-in to search Spyse API for IP address and domain information.                                                   | [https://spyse.com](https://spyse.com)                                                                                 | Tiered API     |
| SSL Certificate Analyzer     | Gather information about SSL certificates used by the target's HTTPS sites.                                                     | N/A                                                                                                                    | Internal       |
| Strange Header Identifier    | Obtain non-standard HTTP headers returned by web servers.                                                                       | N/A                                                                                                                    | Internal       |
| Subdomain Takeover Checker   | Check if affiliated subdomains are vulnerable to takeover.                                                                      | N/A                                                                                                                    | Internal       |
| Talos Intelligence           | Check if a netblock or IP is malicious according to talosintelligence.com.                                                      | [https://talosintelligence.com/](https://talosintelligence.com/)                                                       | Free API       |
| TextMagic                    | Obtain phone number type from TextMagic API                                                                                     | [https://www.textmagic.com/](https://www.textmagic.com/)                                                               | Tiered API     |
| ThreatCrowd                  | Obtain information from ThreatCrowd about identified IP addresses, domains and e-mail addresses.                                | [https://www.threatcrowd.org](https://www.threatcrowd.org)                                                             | Free API       |
| ThreatMiner                  | Obtain information from ThreatMiner's database for passive DNS and threat intelligence.                                         | [https://www.threatminer.org/](https://www.threatminer.org/)                                                           | Free API       |
| TLD Searcher                 | Search all Internet TLDs for domains with the same name as the target (this can be very slow.)                                  | N/A                                                                                                                    | Internal       |
| Tool - CMSeeK                | Identify what Content Management System (CMS) might be used.                                                                    | [https://github.com/Tuhinshubhra/CMSeeK](https://github.com/Tuhinshubhra/CMSeeK)                                       | Tool           |
| Tool - DNSTwist              | Identify bit-squatting, typo and other similar domains to the target using a local DNSTwist installation.                       | [https://github.com/elceef/dnstwist](https://github.com/elceef/dnstwist)                                               | Tool           |
| Tool - Nmap                  | Identify what Operating System might be used.                                                                                   | [https://nmap.org/](https://nmap.org/)                                                                                 | Tool           |
| Tool - WhatWeb               | Identify what software is in use on the specified website.                                                                      | [https://github.com/urbanadventurer/whatweb](https://github.com/urbanadventurer/whatweb)                               | Tool           |
| TOR Exit Nodes               | Check if an IP or netblock appears on the torproject.org exit node list.                                                        | N/A                                                                                                                    | Internal       |
| TORCH                        | Search Tor 'TORCH' search engine for mentions of the target domain.                                                             | [https://torchsearch.wordpress.com/](https://torchsearch.wordpress.com/)                                               | Free API       |
| TotalHash.com                | Check if a host/domain or IP is malicious according to TotalHash.com.                                                           | [https://totalhash.cymru.com/](https://totalhash.cymru.com/)                                                           | Free API       |
| Trumail                      | Check whether an email is disposable                                                                                            | [https://trumail.io/](https://trumail.io/)                                                                             | Free API       |
| Twilio                       | Obtain information from Twilio about phone numbers. Ensure you have the Caller Name add-on installed in Twilio.                 | [https://www.twilio.com/](https://www.twilio.com/)                                                                     | Tiered API     |
| Twitter                      | Gather name and location from Twitter profiles.                                                                                 | [https://twitter.com/](https://twitter.com/)                                                                           | Free API       |
| UCEPROTECT                   | Query the UCEPROTECT databases for open relays, open proxies, vulnerable servers, etc.                                          | [http://www.uceprotect.net/](http://www.uceprotect.net/)                                                               | Free API       |
| URLScan.io                   | Search URLScan.io cache for domain information.                                                                                 | [https://urlscan.io/](https://urlscan.io/)                                                                             | Free API       |
| Venmo                        | Gather user information from Venmo API.                                                                                         | [https://venmo.com/](https://venmo.com/)                                                                               | Free API       |
| ViewDNS.info                 | Reverse Whois lookups using ViewDNS.info.                                                                                       | [https://viewdns.info/](https://viewdns.info/)                                                                         | Tiered API     |
| VirusTotal                   | Obtain information from VirusTotal about identified IP addresses.                                                               | [https://www.virustotal.com/](https://www.virustotal.com/)                                                             | Tiered API     |
| VoIPBL OpenPBX IPs           | Check if an IP or netblock is an open PBX according to VoIPBL OpenPBX IPs.                                                      | [http://www.voipbl.org/](http://www.voipbl.org/)                                                                       | Free API       |
| VXVault.net                  | Check if a domain or IP is malicious according to VXVault.net.                                                                  | [http://vxvault.net/](http://vxvault.net/)                                                                             | Free API       |
| Watchguard                   | Check if an IP is malicious according to Watchguard's reputationauthority.org.                                                  | [http://reputationauthority.org/](http://reputationauthority.org/)                                                     | Free API       |
| Web Analytics Extractor      | Identify web analytics IDs in scraped webpages and DNS TXT records.                                                             | N/A                                                                                                                    | Internal       |
| Web Framework Identifier     | Identify the usage of popular web frameworks like jQuery, YUI and others.                                                       | N/A                                                                                                                    | Internal       |
| Web Server Identifier        | Obtain web server banners to identify versions of web servers being used.                                                       | N/A                                                                                                                    | Internal       |
| Web Spider                   | Spidering of web-pages to extract content for searching.                                                                        | N/A                                                                                                                    | Internal       |
| WhatCMS                      | Check web technology using WhatCMS.org API.                                                                                     | [https://whatcms.org/](https://whatcms.org/)                                                                           | Tiered API     |
| Whoisology                   | Reverse Whois lookups using Whoisology.com.                                                                                     | [https://whoisology.com/](https://whoisology.com/)                                                                     | Commercial API |
| Whois                        | Perform a WHOIS look-up on domain names and owned netblocks.                                                                    | N/A                                                                                                                    | Internal       |
| Whoxy                        | Reverse Whois lookups using Whoxy.com.                                                                                          | [https://www.whoxy.com/](https://www.whoxy.com/)                                                                       | Commercial API |
| WiGLE                        | Query WiGLE to identify nearby WiFi access points.                                                                              | [https://wigle.net/](https://wigle.net/)                                                                               | Free API       |
| Wikileaks                    | Search Wikileaks for mentions of domain names and e-mail addresses.                                                             | [https://wikileaks.org/](https://wikileaks.org/)                                                                       | Free API       |
| Wikipedia Edits              | Identify edits to Wikipedia articles made from a given IP address or username.                                                  | [https://www.wikipedia.org/](https://www.wikipedia.org/)                                                               | Free API       |
| XForce Exchange              | Obtain IP reputation and passive DNS information from IBM X-Force Exchange                                                      | [https://exchange.xforce.ibmcloud.com/](https://exchange.xforce.ibmcloud.com/)                                         | Tiered API     |
| Yandex DNS                   | Check if a host would be blocked by Yandex DNS                                                                                  | [https://yandex.com/](https://yandex.com/)                                                                             | Free API       |
| Zetalytics                   | Query the Zetalytics database for hosts on your target domain(s).                                                               | [https://zetalytics.com/](https://zetalytics.com/)                                                                     | Tiered API     |
| Zone-H Defacement Check      | Check if a hostname/domain appears on the zone-h.org 'special defacements' RSS feed.                                            | [https://zone-h.org/](https://zone-h.org/)                                                                             | Free API       |

### Usage

```plain
sf.py [-h] [-d] [-l IP:port] [-m mod1,mod2,...] [-M] [-s TARGET]
        [-t type1,type2,...] [-T] [-o tab|csv|json] [-H] [-n] [-r]
        [-S LENGTH] [-D DELIMITER] [-f] [-F type1,type2,...] [-x] [-q]
        [-V]
```

### Flags

```plain
SpiderFoot 3.3.0: Open Source Intelligence Automation.

optional arguments:
  -h, --help          show this help message and exit
  -d, --debug         Enable debug output.
  -l IP:port          IP and port to listen on.
  -m mod1,mod2,...    Modules to enable.
  -M, --modules       List available modules.
  -s TARGET           Target for the scan.
  -t type1,type2,...  Event types to collect (modules selected automatically).
  -T, --types         List available event types.
  -o tab|csv|json     Output format. Tab is default. If using json, -q is
                      enforced.
  -H                  Don't print field headers, just data.
  -n                  Strip newlines from data.
  -r                  Include the source data field in tab/csv output.
  -S LENGTH           Maximum data length to display. By default, all data is
                      shown.
  -D DELIMITER        Delimiter to use for CSV output. Default is ,.
  -f                  Filter out other event types that weren't requested with
                      -t.
  -F type1,type2,...  Show only a set of event types, comma-separated.
  -x                  STRICT MODE. Will only enable modules that can directly
                      consume your target, and if -t was specified only those
                      events will be consumed by modules. This overrides -t
                      and -m options.
  -q                  Disable logging. This will also hide errors!
  -V, --version       Display the version of SpiderFoot and exit.
```

### Examples

![Example](images/example.png)
![Example](images/example1.png)
![Example](images/example2.png)
![Example](images/example3.png)
![Example](images/example4.png)

### DOCUMENTATION

Read more at the [project website](https://www.spiderfoot.net/r.php?u=aHR0cHM6Ly93d3cuc3BpZGVyZm9vdC5uZXQv&s=os_gh), including more complete documentation, blog posts with tutorials/guides, plus information about [SpiderFoot HX](https://www.spiderfoot.net/r.php?u=aHR0cHM6Ly93d3cuc3BpZGVyZm9vdC5uZXQvaHgvCg==&s=os_gh).

Latest updates announced on [Twitter](https://twitter.com/spiderfoot).

### URL list

* [SpiderFoot.net](https://www.spiderfoot.net/)
* [Github.com - SpiderFoot](https://github.com/smicallef/spiderfoot)
* [SpiderFoot.net - Documentation](https://www.spiderfoot.net/documentation/)
