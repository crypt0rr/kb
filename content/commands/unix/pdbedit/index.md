---
title : "Pdbedit"
# pre : '<i class="fas fa-code"></i> '
description : "Manage the SAM database (Database of Samba Users)."
date : 2023-09-15T21:07:12+02:00
# hidden : true
# draft : true
weight : 720
tags : ['Unix', 'SMB']
---

---

Manage the SAM database (Database of Samba Users).

## Usage

```plain
pdbedit [OPTION...]
```

## Flags

```plain
  -L, --list                            list all users
  -v, --verbose                         be verbose
  -w, --smbpasswd-style                 give output in smbpasswd style
  -u, --user=USER                       use username
  -N, --account-desc=STRING             set account description
  -f, --fullname=STRING                 set full name
  -h, --homedir=STRING                  set home directory
  -D, --drive=STRING                    set home drive
  -S, --script=STRING                   set logon script
  -p, --profile=STRING                  set profile path
  -I, --domain=STRING                   set a users' domain
  -U, --user SID=STRING                 set user SID or RID
  -M, --machine SID=STRING              set machine SID or RID
  -a, --create                          create user
  -r, --modify                          modify user
  -m, --machine                         account is a machine account
  -x, --delete                          delete user
  -b, --backend=STRING                  use different passdb backend as default backend
  -i, --import=STRING                   import user accounts from this backend
  -e, --export=STRING                   export user accounts to this backend
  -g, --group                           use -i and -e for groups
  -y, --policies                        use -i and -e to move account policies between backends
      --policies-reset                  restore default policies
  -P, --account-policy=STRING           value of an account policy (like maximum password age)
  -C, --value=LONG                      set the account policy to this value
  -c, --account-control=STRING          Values of account control
      --force-initialized-passwords     Force initialization of corrupt password strings in a passdb
                                        backend
  -z, --bad-password-count-reset        reset bad password count
  -Z, --logon-hours-reset               reset logon hours
      --time-format=STRING              The time format for time parameters
  -t, --password-from-stdin             get password from standard in
  -K, --kickoff-time=STRING             set the kickoff time
      --set-nt-hash=STRING              set password from nt-hash

Help options:
  -?, --help                            Show this help message
      --usage                           Display brief usage message

Common Samba options:
  -d, --debuglevel=DEBUGLEVEL           Set debug level
      --debug-stdout                    Send debug output to standard output
  -s, --configfile=CONFIGFILE           Use alternative configuration file
      --option=name=value               Set smb.conf option from command line
  -l, --log-basename=LOGFILEBASE        Basename for log/debug files
      --leak-report                     enable talloc leak reporting on exit
      --leak-report-full                enable full talloc leak reporting on exit

Version options:
  -V, --version                         Print version
```

## Examples

### Adding user

**Note:** Make sure to create the user on the local system as well - for example `sudo useradd crypt0rr`

```plain
$ sudo pdbedit -a crypt0rr
new password:
retype new password:
Unix username:        crypt0rr
NT username:          
Account Flags:        [U          ]
User SID:             S-1-5-21-3061420897-454507726-2060879121-1001
Primary Group SID:    S-1-5-21-3061420897-454507726-2060879121-513
Full Name:            
Home Directory:       \\SMBSERVER\crypt0rr
HomeDir Drive:        
Logon Script:         
Profile Path:         \\SMBSERVER\crypt0rr\profile
Domain:               SMBSERVER
Account desc:         
Workstations:         
Munged dial:          
Logon time:           0
Logoff time:          Wed, 06 Feb 2036 16:06:39 CET
Kickoff time:         Wed, 06 Feb 2036 16:06:39 CET
Password last set:    Fri, 15 Sep 2023 21:13:28 CEST
Password can change:  Fri, 15 Sep 2023 21:13:28 CEST
Password must change: never
Last bad password   : 0
Bad password count  : 0
Logon hours         : FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
```

## URL list

- [Linux.die.net - pdbedit](https://linux.die.net/man/8/pdbedit)
