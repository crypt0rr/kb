---
title : "check_mdi"
# pre : ' '
description : "Python script to enumerate valid Microsoft 365 domains, retrieve tenant name, and check for a Microsoft Defender for Identity (MDI) instance."
date : 2023-02-22T09:39:23+01:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

Python script to enumerate valid Microsoft 365 domains, retrieve tenant name, and check for a Microsoft Defender for Identity (MDI) instance.

Based on: <https://github.com/thalpius/Microsoft-Defender-for-Identity-Check-Instance>.

## Installation

```plain
git clone https://github.com/expl0itabl3/check_mdi
python3 -m pip install -r requirements.txt
```

## Usage

```plain
python3 main.py [-h] -d DOMAIN
```

## Flags

```plain
  -h, --help            show this help message and exit
  -d DOMAIN, --domain DOMAIN
                        input domain name, example format: example.com
```

## Examples

```plain
$ python3 main.py -d microsoft.com

[+] Domains found:
css.one.microsoft.com
bookings.microsoft.com
cloudyn.com
volometrix.com
clearsoftware.com
008.mgd.microsoft.com
064d.mgd.microsoft.com
officelabs.microsoft.com
mail.support.microsoft.com
phonefactor.com
proclarity.com
perceptivepixel.com
messages.microsoft.com
nonprofits.microsoft.com
eventscommunication.microsoft.com
promoteiq.com
azcis.microsoft.com
Howdy.ai
smtphost.microsoft.com
semanticmachines.com
Windows.mail.microsoft.com
p5cdn.com
jclarity.com
askhr.microsoft.com
movere.io
2hatsecurity.com
security.microsoft.com
fslogix.com
acompli.com
fieldone.com
MicrosoftAPC.onmicrosoft.com
Trinigy.net
secureislands.com
mgd.microsoft.com
Pioneerinteractive.com
rare.co.uk
msads.microsoft.com
pioneer.exchange.microsoft.com
pssupport.microsoft.com
takelessons.com
microsoft.ccsctp.com
spsdog4-16.redmond.corp.microsoft.com
filtering.service.exchange.microsoft.com
averesystems.com
vc.linkedin.com
wmislabcon01.redmond.corp.microsoft.com
service.linkedin.com
SPSDOG4-34.redmond.corp.microsoft.com
primary.exchange.microsoft.com
cyrusb-z400.redmond.corp.microsoft.com
cyberx-labs.com
euevents.microsoft.com
ims.microsoft.com
servicescout.com
video2brain.com
commuteconnection.linkedin.com
hybrid.microsoft.com
preonboarding.microsoft.com
segroup.winse.corp.microsoft.com
github.com
mover.io
Hexadite.com
microsoft.affirmednetworks.com
sales.microsoft.com
bons.ai
office365.microsoft.com
inside-r.org
tex.quantum.microsoft.com
mailflowtest.mail.microsoft.com
Projectanarchy.com
aka.ms
Rocketbox.de
windows.microsoft.com
cloudknox.io
bayiportali.mmdservice.com
musiwave.com
mail.microsoft.com
rareware.com
erpsystem.microsoft.com
altvr.com
incentgames.com
email2.microsoft.com
nuvolarosa.eu
gotoally.com
ezscans.net
Fantasysalesteam.com
maquette.ms
themarsdengroup.com
gta.microsoft.com
southpacific.corp.microsoft.com
expresslogic.com
clickdimensions.Microsoft.com
msra.microsoft.com
service.microsoft.com
msftdomains.microsoft.com
simplygon.com
genee.me
placeware.com
maluuba.com
fareast.corp.microsoft.com
sangamemail.microsoft.com
filtering.exchange.microsoft.com
healthcheck.microsoft.com
mail.appcenter.ms
githubenterprise.microsoft.com
middleeast.corp.microsoft.com
clearui.com
stock.microsoft.com
microsoft.mail.onmicrosoft.com
skype.com
contractors.xandr.com
msconnectmail.microsoft.com
glintinc.com
wsus.ci-fx.microsoft.com
cloudtest.microsoft.com
Xamarin.com
nuget.org
solaircorporate.com
idwebmail.microsoft.com
ntdev.corp.microsoft.com
pgsurvey.microsoft.com
surface.com
WOSTIX-TEST.NTDEV.corp.microsoft.com
forzaesports.com
MOSSDOG2982.redmond.corp.microsoft.com
fbt.microsoft.com
Hockeyapp.com
wostcktiis01.redmond.corp.microsoft.com
communities.linkedin.com
TransportInAzure.microsoft.com
SPSDOG4-27.redmond.corp.microsoft.com
news.microsoft.com
nokia.microsoft.com
drawbridge.com
trp.microsoft.com
peer5.com
groupme.com
itsm.microsoft.com
winse.corp.microsoft.com
Newsle.com
start.gg
robin-language.org
lobe.ai
wingroup.windeploy.ntdev.microsoft.com
munich.microsoft.com
email.bing.com
wingroup.microsoft.com
corp.webtv.net
osgemail.redmond.corp.microsoft.com
Xoxco.com
Botkit.ai
northamerica.corp.microsoft.com
microsoft.onmicrosoft.com
navic.tv
extranettest.microsoft.com
adxstudio.com
redmond.corp.microsoft.com
bluestripe.com
spotfront.com
osgwebindex.redmond.corp.microsoft.com
microsoft.co.nz
mojang.com
groups.metaswitch.com
MicrosoftEur.onmicrosoft.com
microsoft.com
musiwave.net
email-2.microsoft.com
sharepointjournaling.exchange.microsoft.com
mpsd.microsoft.com
cloudappsecurity.com
gmo.microsoft.com
mslpa.corp.microsoft.com
serivce.exchange.microsoft.com
exmail.microsoft.com
ntdev.microsoft.com
extranet.microsoft.com
e-mail.microsoft.com
Lynda.com
mail1.averesystems.com
azns.microsoft.com
winfarmmail.ntdev.corp.microsoft.com
view012.de
doublelabs.com
elk-vepc-mon.microsoft.com
m12.vc
africa.corp.microsoft.com
fastsearch.com
Unifiedlogic.com
bounce.e-mail.microsoft.com
playfab.com
inside-r.com
codenauts.de
qa2.parature.net
surveys.microsoft.com
msg.microsoft.com
microsoftprd.onmicrosoft.com
email.microsoft.com
showvine.com
exchange.corp.microsoft.com
globalmobility.microsoft.com
ageofempires.com
slimbezig.nl
appcenter.ms
time.microsoft.com
domains.microsoft
benefits.microsoft.com
revolutionanalytics.com
robovm.com
revolution-computing.com
messages2.microsoft.com
fast.no
myemailing.microsoft.com
ageofempiresonline.com
seaofthieves.com
zune.net
southamerica.corp.microsoft.com
Storesimple.com
gearspop.com
managed.microsoft.com
initiativegaming.com
bluetalon.com
microsoftcan.onmicrosoft.com
sap.microsoft.com
flipgrid.com
mds.microsoft.com
dmarc.microsoft
parttest.extranettest.microsoft.com
msfts2.onmicrosoft.com
Swiftkey.net
microsoft.eu
bing.com
cyclecomputing.com
bingnews.microsoft.com
azure.com
Swiftkey.com
HaloWaypoint.com
componentart.com
smash.gg
Codenauts.com
citusdata.com
winautomation.com
microsoftsmarthq.com.au
qik.com
Intentional.com
altspacevr.com
microsoftstudios.com
titanium.microsoft.com
yammer-inc.com
deis.com
xbox.com
softomotive.com
azmosa.io
dcat.microsoft.com
marketingpilot.com
winse.microsoft.com
xandr.com
api.yammer.com
lucernepublishing.com
Phonefactor.net
azureemail.microsoft.com
skype.net
partners.extranet.microsoft.com
mobiledatalabs.com
exchange.microsoft.com
Havok.com
linkedin.com
gears.gg
europe.corp.microsoft.com
affirmedNetworks.com
internal.linkedin.cn
kinvolk.io
educatorcommunity.microsoft.com
linkedin.biz
tibazdev.microsoft.com
msfts2.mail.onmicrosoft.com
datazen.com
suplari.com
lockbox.microsoft.com
communitysift.com
corp.microsoft.com
msitsupp.microsoft.com
service.fbt.microsoft.com

[+] Tenant found: 
msfts2

[-] No MDI instance was found for msfts2.atp.azure.com
```

## URL list

- [Github.com - check_mdi](https://github.com/expl0itabl3/check_mdi)
