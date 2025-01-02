---
title : "Testssl.sh"
# pre : ' '
description : "Is a free command line tool which checks a server's service on any port for the support of TLS/SSL ciphers, protocols as well as recent cryptographic flaws and more."
date : 2020-03-13T14:09:06+01:00
# hidden : true
# draft : true
weight : 1840
tags : ['Other', 'SSL/TLS', 'Certificates']
---

---

Is a free command line tool which checks a server's service on any port for the support of TLS/SSL ciphers, protocols as well as recent cryptographic flaws and more.

## Installation

```plain
git clone https://github.com/drwetter/testssl.sh.git
```

```plain
chmod +x testssl.sh
```

## Usage

```plain
./testssl.sh [OPTIONS] <target>
```

## Flags

```plain
"testssl.sh <options>", where <options> is:

     --help                        what you're looking at
     -b, --banner                  displays banner + version of testssl.sh
     -v, --version                 same as previous
     -V, --local                   pretty print all local ciphers
     -V, --local <pattern>         which local ciphers with <pattern> are available? If pattern is not a number: word match

     <pattern>                     is always an ignore case word pattern of cipher hexcode or any other string in the name, kx or bits

"testssl.sh <URI>", where <URI> is:

     <URI>                         host|host:port|URL|URL:port   port 443 is default, URL can only contain HTTPS protocol)

"testssl.sh [options] <URI>", where [options] is:

     -t, --starttls <protocol>     Does a default run against a STARTTLS enabled <protocol,
                                   protocol is <ftp|smtp|lmtp|pop3|imap|xmpp|telnet|ldap|nntp|postgres|mysql>
     --xmpphost <to_domain>        For STARTTLS enabled XMPP it supplies the XML stream to-'' domain -- sometimes needed
     --mx <domain/host>            Tests MX records from high to low priority (STARTTLS, port 25)
     --file/-iL <fname>            Mass testing option: Reads one testssl.sh command line per line from <fname>.
                                   Can be combined with --serial or --parallel. Implicitly turns on "--warnings batch".
                                   Text format 1: Comments via # allowed, EOF signals end of <fname>
                                   Text format 2: nmap output in greppable format (-oG), 1 port per line allowed
     --mode <serial|parallel>      Mass testing to be done serial (default) or parallel (--parallel is shortcut for the latter)
     --warnings <batch|off>        "batch" doesn't continue when a testing error is encountered, off continues and skips warnings
     --connect-timeout <seconds>   useful to avoid hangers. Max <seconds> to wait for the TCP socket connect to return
     --openssl-timeout <seconds>   useful to avoid hangers. Max <seconds> to wait before openssl connect will be terminated

single check as <options>  ("testssl.sh URI" does everything except -E and -g):
     -e, --each-cipher             checks each local cipher remotely
     -E, --cipher-per-proto        checks those per protocol
     -s, --std, --standard         tests certain lists of cipher suites by strength
     -p, --protocols               checks TLS/SSL protocols (including SPDY/HTTP2)
     -g, --grease                  tests several server implementation bugs like GREASE and size limitations
     -S, --server-defaults         displays the server's default picks and certificate info
     -P, --server-preference       displays the server's picks: protocol+cipher
     -x, --single-cipher <pattern> tests matched <pattern> of ciphers
                                   (if <pattern> not a number: word match)
     -c, --client-simulation       test client simulations, see which client negotiates with cipher and protocol
     -h, --header, --headers       tests HSTS, HPKP, server/app banner, security headers, cookie, reverse proxy, IPv4 address

     -U, --vulnerable              tests all (of the following) vulnerabilities (if applicable)
     -H, --heartbleed              tests for Heartbleed vulnerability
     -I, --ccs, --ccs-injection    tests for CCS injection vulnerability
     -T, --ticketbleed             tests for Ticketbleed vulnerability in BigIP loadbalancers
     -BB, --robot                  tests for Return of Bleichenbacher's Oracle Threat (ROBOT) vulnerability
     -R, --renegotiation           tests for renegotiation vulnerabilities
     -C, --compression, --crime    tests for CRIME vulnerability (TLS compression issue)
     -B, --breach                  tests for BREACH vulnerability (HTTP compression issue)
     -O, --poodle                  tests for POODLE (SSL) vulnerability
     -Z, --tls-fallback            checks TLS_FALLBACK_SCSV mitigation
     -W, --sweet32                 tests 64 bit block ciphers (3DES, RC2 and IDEA): SWEET32 vulnerability
     -A, --beast                   tests for BEAST vulnerability
     -L, --lucky13                 tests for LUCKY13
     -F, --freak                   tests for FREAK vulnerability
     -J, --logjam                  tests for LOGJAM vulnerability
     -D, --drown                   tests for DROWN vulnerability
     -f, --pfs, --fs, --nsa        checks (perfect) forward secrecy settings
     -4, --rc4, --appelbaum        which RC4 ciphers are being offered?

tuning / connect options (most also can be preset via environment variables):
     --fast                        omits some checks: using openssl for all ciphers (-e), show only first preferred cipher.
     -9, --full                    includes tests for implementation bugs and cipher per protocol (could disappear)
     --bugs                        enables the "-bugs" option of s_client, needed e.g. for some buggy F5s
     --assume-http                 if protocol check fails it assumes HTTP protocol and enforces HTTP checks
     --ssl-native                  fallback to checks with OpenSSL where sockets are normally used
     --openssl <PATH>              use this openssl binary (default: look in $PATH, $RUN_DIR of testssl.sh)
     --proxy <host:port|auto>      (experimental) proxy connects via <host:port>, auto: values from $env ($http(s)_proxy)
     -6                            also use IPv6. Works only with supporting OpenSSL version and IPv6 connectivity
     --ip <ip>                     a) tests the supplied <ip> v4 or v6 address instead of resolving host(s) in URI
                                   b) arg "one" means: just test the first DNS returns (useful for multiple IPs)
     -n, --nodns <min|none>        if "none": do not try any DNS lookups, "min" queries A, AAAA and MX records
     --sneaky                      leave less traces in target logs: user agent, referer
     --ids-friendly                skips a few vulnerability checks which may cause IDSs to block the scanning IP
     --phone-out                   allow to contact external servers for CRL download and querying OCSP responder
     --add-ca <cafile>             path to <cafile> or a comma separated list of CA files enables test against additional CAs.
     --basicauth <user:pass>       provide HTTP basic auth information.

output options (can also be preset via environment variables):
     --quiet                       don't output the banner. By doing this you acknowledge usage terms normally appearing in the banner
     --wide                        wide output for tests like RC4, BEAST. PFS also with hexcode, kx, strength, RFC name
     --show-each                   for wide outputs: display all ciphers tested -- not only succeeded ones
     --mapping <openssl|           openssl: use the OpenSSL cipher suite name as the primary name cipher suite name form (default)
                iana|rfc             -> use the IANA/(RFC) cipher suite name as the primary name cipher suite name form
                no-openssl|          -> don't display the OpenSSL cipher suite name, display IANA/(RFC) names only
                no-iana|no-rfc>      -> don't display the IANA/(RFC) cipher suite name, display OpenSSL names only
     --color <0|1|2|3>             0: no escape or other codes,  1: b/w escape codes,  2: color (default), 3: extra color (color all ciphers)
     --colorblind                  swap green and blue in the output
     --debug <0-6>                 1: screen output normal but keeps debug output in /tmp/.  2-6: see "grep -A 5 '^DEBUG=' testssl.sh"

file output options (can also be preset via environment variables)
     --log, --logging              logs stdout to '${NODE}-p${port}${YYYYMMDD-HHMM}.log' in current working directory (cwd)
     --logfile|-oL <logfile>       logs stdout to 'dir/${NODE}-p${port}${YYYYMMDD-HHMM}.log'. If 'logfile' is a dir or to a specified 'logfile'
     --json                        additional output of findings to flat JSON file '${NODE}-p${port}${YYYYMMDD-HHMM}.json' in cwd
     --jsonfile|-oj <jsonfile>     additional output to the specified flat JSON file or directory, similar to --logfile
     --json-pretty                 additional JSON structured output of findings to a file '${NODE}-p${port}${YYYYMMDD-HHMM}.json' in cwd
     --jsonfile-pretty|-oJ <jsonfile>  additional JSON structured output to the specified file or directory, similar to --logfile
     --csv                         additional output of findings to CSV file '${NODE}-p${port}${YYYYMMDD-HHMM}.csv' in cwd or directory
     --csvfile|-oC <csvfile>       additional output as CSV to the specified file or directory, similar to --logfile
     --html                        additional output as HTML to file '${NODE}-p${port}${YYYYMMDD-HHMM}.html'
     --htmlfile|-oH <htmlfile>     additional output as HTML to the specified file or directory, similar to --logfile
     --out(f,F)ile|-oa/-oA <fname> log to a LOG,JSON,CSV,HTML file (see nmap). -oA/-oa: pretty/flat JSON.
                                   "auto" uses '${NODE}-p${port}${YYYYMMDD-HHMM}'. If fname if a dir uses 'dir/${NODE}-p${port}${YYYYMMDD-HHMM}'
     --hints                       additional hints to findings
     --severity <severity>         severities with lower level will be filtered for CSV+JSON, possible values <LOW|MEDIUM|HIGH|CRITICAL>
     --append                      if (non-empty) <logfile>, <csvfile>, <jsonfile> or <htmlfile> exists, append to file. Omits any header
     --outprefix <fname_prefix>    before  '${NODE}.' above prepend <fname_prefix>


Options requiring a value can also be called with '=' e.g. testssl.sh -t=smtp --wide --openssl=/usr/bin/openssl <URI>.
<URI> always needs to be the last parameter.
```

## Examples

### Display the server's default picks and certificate info

```plain
./testssl.sh -S <target>
```

### Only show protocols

```plain
./testssl.sh --protocols <target>

No engine or GOST support via engine with your /usr/bin/openssl

#############################################
    testssl.sh       3.0 from https://testssl.sh/
    (4601670 2020-03-07 12:15:55 -- )

      This program is free software. Distribution and
             modification under GPLv2 permitted.
      USAGE w/o ANY WARRANTY. USE IT AT YOUR OWN RISK!

       Please file bugs @ https://testssl.sh/bugs/

#############################################

 Using "OpenSSL 1.1.1c  28 May 2019" [~79 ciphers]
 on lo:/usr/bin/openssl
 (built: "Aug 20 11:46:33 2019", platform: "debian-amd64")


 Start 2020-03-13 14:12:57        -->> <target>:443 (<target>) <<--

 Further IP addresses:   --
 rDNS (<target>):  --
 Service detected:       HTTP


 Testing protocols via sockets except NPN+ALPN

 SSLv2      not offered (OK)
 SSLv3      not offered (OK)
 TLS 1      not offered
 TLS 1.1    not offered
 TLS 1.2    offered (OK)
 TLS 1.3    offered (OK): final
 NPN/SPDY   not offered
 ALPN/HTTP2 h2, http/1.1 (offered)

 Done 2020-03-13 14:13:03 [  11s] -->> <target>:443 (<target>) <<--
```

## URL List

- [Testssl.sh](https://testssl.sh/)
- [GitHub.com - testssl.sh](https://github.com/drwetter/testssl.sh)
- [Ciphersuite.info](https://ciphersuite.info/)
