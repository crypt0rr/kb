import mmh3
import codecs
import requests
from urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning) 
response = requests.get('https://50.220.52.222/favicon.ico', verify=False)
favicon = codecs.encode(response.content,"base64")
hash = mmh3.hash(favicon)
print(hash)