---
title : "Ansible"
# pre : ' '
description : "Simple, agentless IT automation that anyone can use."
date : 2020-10-22T11:42:23+02:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

## Ansible

Simple, agentless IT automation that anyone can use - Define and run a single task 'playbook' against a set of hosts

### Installation

```plain
python3 -m pip install ansible
```

### Usage

```plain
ansible [-h] [--version] [-v] [-b] [--become-method BECOME_METHOD] [--become-user BECOME_USER] [-K] [-i INVENTORY] [--list-hosts] [-l SUBSET] [-P POLL_INTERVAL] [-B SECONDS] [-o] [-t TREE] [-k]
               [--private-key PRIVATE_KEY_FILE] [-u REMOTE_USER] [-c CONNECTION] [-T TIMEOUT] [--ssh-common-args SSH_COMMON_ARGS] [--sftp-extra-args SFTP_EXTRA_ARGS] [--scp-extra-args SCP_EXTRA_ARGS]
               [--ssh-extra-args SSH_EXTRA_ARGS] [-C] [--syntax-check] [-D] [-e EXTRA_VARS] [--vault-id VAULT_IDS] [--ask-vault-pass | --vault-password-file VAULT_PASSWORD_FILES] [-f FORKS] [-M MODULE_PATH]
               [--playbook-dir BASEDIR] [-a MODULE_ARGS] [-m MODULE_NAME]
               pattern
```

### Flags

```plain
positional arguments:
  pattern               host pattern

optional arguments:
  --ask-vault-pass      ask for vault password
  --list-hosts          outputs a list of matching hosts; does not execute anything else
  --playbook-dir BASEDIR
                        Since this tool does not use playbooks, use this as a substitute playbook directory.This sets the relative path for many features including roles/ group_vars/ etc.
  --syntax-check        perform a syntax check on the playbook, but do not execute it
  --vault-id VAULT_IDS  the vault identity to use
  --vault-password-file VAULT_PASSWORD_FILES
                        vault password file
  --version             show program's version number, config file location, configured module search path, module location, executable location and exit
  -B SECONDS, --background SECONDS
                        run asynchronously, failing after X seconds (default=N/A)
  -C, --check           don't make any changes; instead, try to predict some of the changes that may occur
  -D, --diff            when changing (small) files and templates, show the differences in those files; works great with --check
  -M MODULE_PATH, --module-path MODULE_PATH
                        prepend colon-separated path(s) to module library (default=~/.ansible/plugins/modules:/usr/share/ansible/plugins/modules)
  -P POLL_INTERVAL, --poll POLL_INTERVAL
                        set the poll interval if using -B (default=15)
  -a MODULE_ARGS, --args MODULE_ARGS
                        module arguments
  -e EXTRA_VARS, --extra-vars EXTRA_VARS
                        set additional variables as key=value or YAML/JSON, if filename prepend with @
  -f FORKS, --forks FORKS
                        specify number of parallel processes to use (default=5)
  -h, --help            show this help message and exit
  -i INVENTORY, --inventory INVENTORY, --inventory-file INVENTORY
                        specify inventory host path or comma separated host list. --inventory-file is deprecated
  -l SUBSET, --limit SUBSET
                        further limit selected hosts to an additional pattern
  -m MODULE_NAME, --module-name MODULE_NAME
                        module name to execute (default=command)
  -o, --one-line        condense output
  -t TREE, --tree TREE  log output to this directory
  -v, --verbose         verbose mode (-vvv for more, -vvvv to enable connection debugging)

Privilege Escalation Options:
  control how and which user you become as on target hosts

  --become-method BECOME_METHOD
                        privilege escalation method to use (default=sudo), use `ansible-doc -t become -l` to list valid choices.
  --become-user BECOME_USER
                        run operations as this user (default=root)
  -K, --ask-become-pass
                        ask for privilege escalation password
  -b, --become          run operations with become (does not imply password prompting)

Connection Options:
  control as whom and how to connect to hosts

  --private-key PRIVATE_KEY_FILE, --key-file PRIVATE_KEY_FILE
                        use this file to authenticate the connection
  --scp-extra-args SCP_EXTRA_ARGS
                        specify extra arguments to pass to scp only (e.g. -l)
  --sftp-extra-args SFTP_EXTRA_ARGS
                        specify extra arguments to pass to sftp only (e.g. -f, -l)
  --ssh-common-args SSH_COMMON_ARGS
                        specify common arguments to pass to sftp/scp/ssh (e.g. ProxyCommand)
  --ssh-extra-args SSH_EXTRA_ARGS
                        specify extra arguments to pass to ssh only (e.g. -R)
  -T TIMEOUT, --timeout TIMEOUT
                        override the connection timeout in seconds (default=10)
  -c CONNECTION, --connection CONNECTION
                        connection type to use (default=smart)
  -k, --ask-pass        ask for connection password
  -u REMOTE_USER, --user REMOTE_USER
                        connect as this user (default=None)

Some modules do not make sense in Ad-Hoc (include, meta, etc)
```

### Examples

#### Inventory - A list of hosts that are managed by Ansible

Default path that will be used by Ansible is */etc/ansible/hosts*
Optionally you can specify your own hostfile with *--inventory PATH* or *-i PATH*

```plain
$ cat /etc/ansible/hosts
10.10.10.10

#[webservers]
10.10.10.11
10.10.10.12
```

#### Modules - Programs that perform the actual work of the task of a play

List of all modules can be found [here.](https://docs.ansible.com/ansible/2.5/modules/list_of_all_modules.html)

#### Tasks - Set of instructions that can be performed by using modules

#### Example playbook

{{%attachments title="Related files" fa_icon_class="far fa-file-code" pattern=".*(yml)"/%}}

```plain
$ ansible-playbook nginx-install.yml --ask-pass
SSH password:

PLAY [all] *****************************************************************************

TASK [Gathering Facts] *****************************************************************
ok: [188.166.70.130]

TASK [Ensure packages are updated] *****************************************************
[WARNING]: The value True (type bool) in a string field was converted to 'True' (type string). If this does not look like what you expect, quote the entire value to ensure it does not change.
ok: [188.166.70.130]

TASK [Ensure that unzip is installed] **************************************************
ok: [188.166.70.130]

TASK [Install nginx] *******************************************************************
ok: [188.166.70.130]

TASK [start nginx] *********************************************************************
ok: [188.166.70.130]

PLAY RECAP *****************************************************************************
188.166.70.130             : ok=5    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

### URL list

* [Ansible.com](https://www.ansible.com/)
