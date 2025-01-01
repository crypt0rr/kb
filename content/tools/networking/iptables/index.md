---
title : "iptables"
# pre : ' '
description : "Administration tool for IPv4 packet filtering and NAT."
date : 2022-09-14T10:59:39+02:00
# hidden : true
# draft : true
weight : 190
# tags : ['']
---

---

Administration tool for IPv4 packet filtering and NAT. Is used to set up, maintain, and inspect the tables of IP packet filter rules in the Linux kernel. Several different tables may be defined. Each table contains a number of built-in chains and may also contain user-defined chains.

Each chain is a list of rules which can match a set of packets. Each rule specifies what to do with a packet that matches. This is called a 'target', which may be a jump to a user-defined chain in the same table.

## Installation

```plain
sudo apt install iptables
```

## Usage

```plain
iptables -[ACD] chain rule-specification [options]
iptables -I chain [rulenum] rule-specification [options]
iptables -R chain rulenum rule-specification [options]
iptables -D chain rulenum [options]
iptables -[LS] [chain [rulenum]] [options]
iptables -[FZ] [chain] [options]
iptables -[NX] chain
iptables -E old-chain-name new-chain-name
iptables -P chain target [options]
iptables -h (print this help information)
```

## Flags

```plain
iptables v1.8.8 (nf_tables)

Commands:
Either long or short options are allowed.
  --append  -A chain            Append to chain
  --check   -C chain            Check for the existence of a rule
  --delete  -D chain            Delete matching rule from chain
  --delete  -D chain rulenum
                                Delete rule rulenum (1 = first) from chain
  --insert  -I chain [rulenum]
                                Insert in chain as rulenum (default 1=first)
  --replace -R chain rulenum
                                Replace rule rulenum (1 = first) in chain
  --list    -L [chain [rulenum]]
                                List the rules in a chain or all chains
  --list-rules -S [chain [rulenum]]
                                Print the rules in a chain or all chains
  --flush   -F [chain]          Delete all rules in  chain or all chains
  --zero    -Z [chain [rulenum]]
                                Zero counters in chain or all chains
  --new     -N chain            Create a new user-defined chain
  --delete-chain
            -X [chain]          Delete a user-defined chain
  --policy  -P chain target
                                Change policy on chain to target
  --rename-chain
            -E old-chain new-chain
                                Change chain name, (moving any references)

Options:
    --ipv4      -4              Nothing (line is ignored by ip6tables-restore)
    --ipv6      -6              Error (line is ignored by iptables-restore)
[!] --protocol  -p proto        protocol: by number or name, eg. `tcp'
[!] --source    -s address[/mask][...]
                                source specification
[!] --destination -d address[/mask][...]
                                destination specification
[!] --in-interface -i input name[+]
                                network interface name ([+] for wildcard)
 --jump -j target
                                target for rule (may load target extension)
  --goto      -g chain
                               jump to chain with no return
  --match       -m match
                                extended match (may load extension)
  --numeric     -n              numeric output of addresses and ports
[!] --out-interface -o output name[+]
                                network interface name ([+] for wildcard)
  --table       -t table        table to manipulate (default: `filter')
  --verbose     -v              verbose mode
  --wait        -w [seconds]    maximum wait to acquire xtables lock before give up
  --line-numbers                print line numbers when listing
  --exact       -x              expand numbers (display exact values)
[!] --fragment  -f              match second or further fragments only
  --modprobe=<command>          try to insert modules using this command
  --set-counters -c PKTS BYTES  set the counter during insert/append
[!] --version   -V              print package version.
```

## Examples

### List default/current policy

```plain
sudo iptables -L
[sudo] password for crypt0rr: 
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination 
```

### Accept traffic from specific IP Address

```plain
$ sudo iptables -A INPUT -s 10.10.20.241 -j ACCEPT
                                                                                                                                                                                                                                            
$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

ACCEPT     all  --  10.10.20.241         anywhere            

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination   
```

### Drop traffic to a specific DNS destination

**Note** iptables will do a DNS lookup only at the time of the creation of the rule. If the IP address changes, the rule will become ineffective. For this reason, it is preferable to use the IP address of the domain.

```plain
$ sudo iptables -A OUTPUT -p tcp -d amazon.com -j DROP

$ sudo iptables -L                                    
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     all  --  10.10.20.241         anywhere            

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       tcp  --  anywhere             176.32.103.205      
DROP       tcp  --  anywhere             s3-console-us-standard.console.aws.amazon.com 
DROP       tcp  --  anywhere             54.239.28.85 
```

### Block / Accept traffic on specific port(s)

```plain
sudo iptables -A OUTPUT -p tcp --dport 80 -j DROP
sudo iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
```

## URL List

- [Linux.die.net - iptables](https://linux.die.net/man/8/iptables)
- [Wikipedia.org - iptables](https://en.wikipedia.org/wiki/Iptables)
