---
title : "Windows Security Log References"
pre : '<i class="fab fa-elementor"></i> '
description : "Most handy Windows Security Log Event ID's"
date : 2022-09-13T12:43:46+02:00
# hidden : true
# draft : true
weight : 140
tags : ['Cheatsheets', 'Active Directory']
---

---

Most handy Windows Security Log Event ID's.

## User Account Changes

| Event ID | Action                                       |
| -------- | -------------------------------------------- |
| 4720     | Created                                      |
| 4722     | Enabled                                      |
| 4723     | User changed own password                    |
| 4724     | Privileged User changed this user's password |
| 4725     | Disabled                                     |
| 4726     | Deleted                                      |
| 4738     | Changed                                      |
| 4740     | Locked out                                   |
| 4767     | Unlocked                                     |
| 4781     | Name change                                  |

## Group Changes

| Group Changes          | Created | Changed | Deleted | Member Added | Member Removed |
| ---------------------- | ------- | ------- | ------- | ------------ | -------------- |
| Security Local         | 4731    | 4737    | 4734    | 4732         | 4733           |
| Security Global        | 4727    | 4735    | 4730    | 4728         | 4729           |
| Security Universal     | 4754    | 4755    | 4758    | 4756         | 4757           |
| Distribution Local     | 4744    | 4745    | 4748    | 4746         | 4747           |
| Distribution Global    | 4749    | 4750    | 4753    | 4751         | 4752           |
| Distribution Universal | 4759    | 4760    | 4763    | 4761         | 4762           |

## Domain Controller Authentication Events

| Event ID | Action                                               |
| -------- | ---------------------------------------------------- |
| 4768     | A Kerberos authentication ticket (TGT) was requested |
| 4771     | Kerberos pre-authentication failed                   |
| 4772     | A Kerberos authentication ticket requested failed    |

For both `4771` and `4772` see the following Kerberos Failure Codes

## Kerberos Failure Codes

| Event ID | Action                                                        |
| -------- | ------------------------------------------------------------- |
| 0x6      | Bad user name                                                 |
| 0x7      | New computer account?                                         |
| 0x9      | Administrator should reset password                           |
| OxC      | Workstation restriction                                       |
| 0x12     | Account disabled, expired, locked out,logon hours restriction |
| 0x17     | The user's password has expired                               |
| 0x18     | Bad password                                                  |
| 0x20     | Frequently logged by computer accounts                        |
| 0x25     | Workstation's clock too far out of sync with the DC's         |

## Logon Session Events

| Event ID | Action                                  |
| -------- | --------------------------------------- |
| 4624     | Successful logon                        |
| 4647     | User initiated logoff                   |
| 4625     | Logon failure (See Logon Failure Codes) |
| 4778     | Remote desktop session reconnected      |
| 4779     | Remote desktop session disconnected     |
| 4800     | Workstation locked                      |
| 4801     | Workstation unlocked                    |
| 4802     | Screen saver invoked                    |
| 4803     | Screen saver dismissed                  |

## Logon Types

| Event ID | Action                                                                              |
| -------- | ----------------------------------------------------------------------------------- |
| 2        | Interactive                                                                         |
| 3        | Network (i.e. mapped drive)                                                         |
| 4        | Batch (i.e. schedule task)                                                          |
| 5        | Service (service startup)                                                           |
| 7        | Unlock (i.e. unattended workstation with password protected screen saver)           |
| 8        | Network Cleartext (Most often indicates a logon to IIS with "basic authentication") |
| 10       | Remote Desktop                                                                      |
| 11       | Logon with cached credentials                                                       |

## Logon Failure Codes

| Event ID    | Action                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------- |
| OxC0000064  | User name does not exist                                                                 |
| 0xC000006A  | User name is correct but the password is wrong                                           |
| 0xC0000234  | User is currently locked out                                                             |
| 0xC0000072  | Account is currently disabled                                                            |
| 0xC000006F  | User tried to logon outside his day of week or time of day restrictions                  |
| 0xC0000070  | Workstation restriction                                                                  |
| 0xC00000193 | Account expiration                                                                       |
| 0xC0000071  | Expired password                                                                         |
| OxC0000133  | Clocks between DC and other computer too far out of sync                                 |
| OxC0000224  | User is required to change password at next logon                                        |
| OxC0000225  | Evidently a bug in Windows and not a risk                                                |
| 0x000015b   | The user has not been granted the requested logon type (aka logon right) at this machine |

## URL List

- [Static.spiceworks.com](https://static.spiceworks.com/resources/post/0014/9751/quickref.pdf)
