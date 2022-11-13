---
title : "Stormspotter"
# pre : ' '
description : "Stormspotter creates an 'attack graph' of the resources in an Azure subscription."
date : 2021-12-01T16:31:35+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Stormspotter

Stormspotter creates an “attack graph” of the resources in an Azure subscription. It enables red teams and pentesters to visualize the attack surface and pivot opportunities within a tenant, and supercharges your defenders to quickly orient and prioritize incident response work.

## Installation

#### Docker

Most users may find it easier to install Stormspotter via Docker. This is the recommended method.

```plain
git clone https://github.com/Azure/Stormspotter
docker-compose up
```

The `docker-compose` file will create three containers:

* Stormspotter Frontend
* Stormspotter Backend
* Neo4j v4

By default, the Stormspotter container will expose the UI on port 9091. The neo4j container will expose neo4j on ports 7474 (HTTP), and 7687 (Bolt). Default configuration of Neo4j does not have SSL enabled, therefore you may initially interact directly with the neo4j interface on port 7474.

**Note**: Currently, Stormspotter only supports running these containers locally. Attempting to upload to the frontend hosted remotely will be unsuccessful but this behavior is expected to change in the future.

The default credentials for neo4j are: **neo4j/password**. You can change this in the `docker-compose` file via the NEO4JAUTH environment variable.

You can then visit <http://localhost:9091> in your browser.

## Running Stormspotter

### Stormcollector

Stormcollector is the portion of Stormspotter that allows you to enumerate the subscriptions the provided credentials have access to. The **_RECOMMENDED_** way to use Stormcollector is to run the `sscollector.pyz` package, found in [the release file for your operating system](https://github.com/Azure/Stormspotter/releases/). This PYZ has been created with [Shiv](https://github.com/linkedin/shiv) and comes with all the packages already zipped up! The dependencies will extract themselves to a `.shiv` folder in the user's home directory.

```plain
cd stormcollector
python3 sscollector.pyz -h
```

If for some reason you don't want to use the provided package, you may install the required packages with `pip` or `pipenv`. With this approach, it's _highly recommended_ to install Stormcollector in a virtual environment to prevent package conflicts. If you have issues managing your virtual environments, you should use the recommended method above.

```plain
cd stormcollector
python3 -m pip install pipenv
pipenv install .
python3 ./sscollector.py
```

```plain
$ python3 -m pip install pipenv
[...]

$ pipenv install .
[...]
✔ Successfully created virtual environment! 
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.

$ pipenv shell

$  . /home/crypt0rr/.local/share/virtualenvs/stormcollector-wansJJO3/bin/activate
((stormcollector) ) ╭─ ~/tools/Stormspotter/stormcollector 
╰─$ python3 sscollector.py -h    
usage: sscollector.py [-h] {cli,spn} ...

positional arguments:
  {cli,spn}   Methods of authentication

optional arguments:
  -h, --help  show this help message and exit
```

Current login types supported:

* Azure CLI (must use `az login` first)
* Service Principal Client ID/Secret

You can check out all of the options Stormcollector offers by using the `-h` switch as shown above. The most basic usages of Stormcollector are:

```plain
python3 sscollector.pyz cli
python3 sscollector.pyz spn -t <tenant> -c <clientID> -s <clientSecret>
```

#### Common options for all authentication types

* **--cloud**: Specify a different Azure Cloud (GERMAN, CHINA, USGOV)
* **--config**: Specify a custom configuration for cloud environments
* **--azure**: Only enumerate Azure Resource Manager resources
* **--aad**: Only enumerate Azure Active Directory
* **--subs**: Subscriptions you wish to scan. Multiple subscriptions can be added as a space deliminated list.
* **--nosubs**: Subscriptions you wish to exclude. Multiple subscriptions can be excluded as a space deliminated list.
* **--json**: Convert SQLite output to JSON (**WARNING: STORMSPOTTER ONLY PARSES SQLITE FORMAT** )
  * This option is useful if you want to parse the output for reasons other than Stormspotter.
* **--ssl-cert**: Specify an SSL cert for Stormcollector to use for requests. Not a common option
* **--backfill**: Perform AAD enumeration only for object IDs associated with RBAC enumeration. Only applicable when --azure is specified.

#### Uploading Results

Once you've started up the UI, you will see a section in the database tab labeled "Stormcollector Upload". Add your file to this uploader and the processing will begin. As the results get processed, you can check the backend logs to view progress, and the results should also be reflected in the same Database View tab.

## Examples

#### View Permissions on a KeyVault

![Screenshot1](images/screenshot1.png)

#### Show Members of an Azure AD Role

![Screenshot2](images/screenshot2.png)

#### Show Incoming and Outgoing Relationships

![Screenshot3](images/screenshot3.png)

## URL List

* [Github.com - Stormspotter](https://github.com/Azure/Stormspotter)
