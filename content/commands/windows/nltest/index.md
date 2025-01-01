---
title : "Nltest"
# pre : '<i class="fas fa-code"></i> '
description : "Performs network administrative tasks."
date : 2022-02-15T16:37:11+01:00
# hidden : true
# draft : true
weight : 100
# tags : ['']
---

---

## Usage

```plain
nltest [/OPTIONS]
```

## Flags

```plain
    /SERVER:<ServerName> - Specify <ServerName>

    /QUERY - Query <ServerName> netlogon service
    /REPL - Force partial sync on <ServerName> BDC
    /SYNC - Force full sync on <ServerName> BDC
    /PDC_REPL - Force UAS change message from <ServerName> PDC

    /SC_QUERY:<DomainName> - Query secure channel for <Domain> on <ServerName>
    /SC_RESET:<DomainName>[\<DcName>] - Reset secure channel for <Domain> on <ServerName> to <DcName>
    /SC_VERIFY:<DomainName> - Verify secure channel for <Domain> on <ServerName>
    /SC_CHANGE_PWD:<DomainName> - Change a secure channel  password for <Domain> on <ServerName>
    /DCLIST:<DomainName> - Get list of DC's for <DomainName>
    /DCNAME:<DomainName> - Get the PDC name for <DomainName>
    /DSGETDC:<DomainName> - Call DsGetDcName /PDC /DS /DSP /GC /KDC
        /TIMESERV /GTIMESERV /WS /NETBIOS /DNS /IP /FORCE /WRITABLE /AVOIDSELF /LDAPONLY /BACKG /DS_6 /DS_8 /DS_9 /DS_10
        /KEYLIST /TRY_NEXT_CLOSEST_SITE /SITE:<SiteName> /ACCOUNT:<AccountName> /RET_DNS /RET_NETBIOS
    /DNSGETDC:<DomainName> - Call DsGetDcOpen/Next/Close /PDC /GC
        /KDC /WRITABLE /LDAPONLY /FORCE /SITESPEC
    /DSGETFTI:<DomainName> - Call DsGetForestTrustInformation
        /UPDATE_TDO
    /LSAQUERYFTI:<TrustedForest> - Call LsaQueryForestTrustInformation
    /DSGETSITE - Call DsGetSiteName
    /DSGETSITECOV - Call DsGetDcSiteCoverage
    /DSADDRESSTOSITE:[MachineName] - Call DsAddressToSiteNamesEx
        /ADDRESSES:<Address1,Address2,...>
    /PARENTDOMAIN - Get the name of the parent domain of this machine
    /WHOWILL:<Domain>* <User> [<Iteration>] - See if <Domain> will log on <User>
    /FINDUSER:<User> - See which trusted domain will log on <User>
    /TRANSPORT_NOTIFY - Notify netlogon of new transport

    /DBFLAG:<HexFlags> - New debug flag

    /USER:<UserName> - Query User info on <ServerName>

    /TIME:<Hex LSL> <Hex MSL> - Convert NT GMT time to ascii
    /LOGON_QUERY - Query number of cumulative logon attempts
    /DOMAIN_TRUSTS - Query domain trusts on <ServerName>
        /PRIMARY /FOREST /DIRECT_OUT /DIRECT_IN /ALL_TRUSTS /V
    /DSREGDNS - Force registration of all DC-specific DNS records
    /DSDEREGDNS:<DnsHostName> - Deregister DC-specific DNS records for specified DC
        /DOM:<DnsDomainName> /DOMGUID:<DomainGuid> /DSAGUID:<DsaGuid>
    /DSQUERYDNS - Query the status of the last update for all DC-specific DNS records

    /BDC_QUERY:<DomainName> - Query replication status of BDCs for <DomainName>

    /LIST_DELTAS:<FileName> - display the content of given change log file

    /CDIGEST:<Message> /DOMAIN:<DomainName> - Get client digest
    /SDIGEST:<Message> /RID:<RID in hex> - Get server digest

    /SHUTDOWN:<Reason> [<Seconds>] - Shutdown <ServerName> for <Reason>
    /SHUTDOWN_ABORT - Abort a system shutdown
```

## Examples

### list Domain Controllers

```plain
$ nltest /dclist:offsec.nl
Get list of DCs in domain 'offsec.nl' from '\\SRV2022.offsec.nl'.
    SRV2019.offsec.nl [PDC]  [DS] Site: Default-First-Site-Name
    SRV2022.offsec.nl        [DS] Site: Default-First-Site-Name
The command completed successfully
```

### List domain trusts

```plain
$ nltest /domain_trusts
List of domain trusts:
    0: OFFSEC offsec.nl (NT 5) (Forest Tree Root) (Primary Domain) (Native)
The command completed successfully
```

## URL List

- [Docs.microsoft.com - Nltest](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/cc731935(v=ws.11))
