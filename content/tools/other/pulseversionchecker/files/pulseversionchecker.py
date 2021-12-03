import requests
import sys
import re

HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0"}

if len(sys.argv) != 2:
    print (" Usage: python pulseversion.py <target ip/domain>")
    sys.exit(1)

r = requests.get("https://%s/dana-cached/hc/HostCheckerInstaller.osx" % sys.argv[1], verify=False, allow_redirects=False)

if r.status_code != 200:
    print ("[!] Couldn't find target file")
    sys.exit(1)

reg = re.compile(r'<key>version</key>\n<string>([\d.]*?)</string>')
result = reg.search(r.text)

if result:
    print ("[+] %s, version: %s" % (sys.argv[1], result.group(1)))
else:
    print ("[!] Unable to detect version")