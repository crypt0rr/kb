---
title : "Chisel"
# pre : ' '
description : "Chisel is a fast TCP tunnel, transported over HTTP, secured via SSH. 'Call home' solution."
date : 2020-10-06T11:16:32+02:00
# hidden : true
# draft : true
weight : 110
# tags : ['']
---

---

Chisel is a fast TCP tunnel, transported over HTTP, secured via SSH.

## Installation

Docker

```plain
docker run --rm -it jpillora/chisel --help
```

From source

```plain
go get -v github.com/jpillora/chisel
```

## Usage Server

```plain
  Usage: chisel server [options]

  Options:

    --host, Defines the HTTP listening host – the network interface
    (defaults the environment variable HOST and falls back to 0.0.0.0).

    --port, -p, Defines the HTTP listening port (defaults to the environment
    variable PORT and fallsback to port 8080).

    --key, An optional string to seed the generation of a ECDSA public
    and private key pair. All communications will be secured using this
    key pair. Share the subsequent fingerprint with clients to enable detection
    of man-in-the-middle attacks (defaults to the CHISEL_KEY environment
    variable, otherwise a new key is generate each run).

    --authfile, An optional path to a users.json file. This file should
    be an object with users defined like:
      {
        "<user:pass>": ["<addr-regex>","<addr-regex>"]
      }
    when <user> connects, their <pass> will be verified and then
    each of the remote addresses will be compared against the list
    of address regular expressions for a match. Addresses will
    always come in the form "<remote-host>:<remote-port>" for normal remotes
    and "R:<local-interface>:<local-port>" for reverse port forwarding
    remotes. This file will be automatically reloaded on change.

    --auth, An optional string representing a single user with full
    access, in the form of <user:pass>. It is equivalent to creating an
    authfile with {"<user:pass>": [""]}. If unset, it will use the
    environment variable AUTH.

    --keepalive, An optional keepalive interval. Since the underlying
    transport is HTTP, in many instances we'll be traversing through
    proxies, often these proxies will close idle connections. You must
    specify a time with a unit, for example '5s' or '2m'. Defaults
    to '25s' (set to 0s to disable).

    --backend, Specifies another HTTP server to proxy requests to when
    chisel receives a normal HTTP request. Useful for hiding chisel in
    plain sight.

    --socks5, Allow clients to access the internal SOCKS5 proxy. See
    chisel client --help for more information.

    --reverse, Allow clients to specify reverse port forwarding remotes
    in addition to normal remotes.

    --tls-key, Enables TLS and provides optional path to a PEM-encoded
    TLS private key. When this flag is set, you must also set --tls-cert,
    and you cannot set --tls-domain.

    --tls-cert, Enables TLS and provides optional path to a PEM-encoded
    TLS certificate. When this flag is set, you must also set --tls-key,
    and you cannot set --tls-domain.

    --tls-domain, Enables TLS and automatically acquires a TLS key and
    certificate using LetsEncypt. Setting --tls-domain requires port 443.
    You may specify multiple --tls-domain flags to serve multiple domains.
    The resulting files are cached in the "$HOME/.cache/chisel" directory.
    You can modify this path by setting the CHISEL_LE_CACHE variable,
    or disable caching by setting this variable to "-". You can optionally
    provide a certificate notification email by setting CHISEL_LE_EMAIL.

    --tls-ca, a path to a PEM encoded CA certificate bundle or a directory
    holding multiple PEM encode CA certificate bundle files, which is used to
    validate client connections. The provided CA certificates will be used
    instead of the system roots. This is commonly used to implement mutual-TLS.

    --pid Generate pid file in current working directory

    -v, Enable verbose logging

    --help, This help text

  Signals:
    The chisel process is listening for:
      a SIGUSR2 to print process stats, and
      a SIGHUP to short-circuit the client reconnect timer

  Version:
    0.0.0-src (go1.15.2)

  Read more:
    https://github.com/jpillora/chisel
```

## Usage Client

```plain
  Usage: chisel client [options] <server> <remote> [remote] [remote] ...

  <server> is the URL to the chisel server.

  <remote>s are remote connections tunneled through the server, each of
  which come in the form:

    <local-host>:<local-port>:<remote-host>:<remote-port>

    ■ local-host defaults to 0.0.0.0 (all interfaces).
    ■ local-port defaults to remote-port.
    ■ remote-port is required*.
    ■ remote-host defaults to 0.0.0.0 (server localhost).

  which shares <remote-host>:<remote-port> from the server to the client
  as <local-host>:<local-port>, or:

    R:<local-interface>:<local-port>:<remote-host>:<remote-port>

  which does reverse port forwarding, sharing <remote-host>:<remote-port>
  from the client to the server's <local-interface>:<local-port>.

    example remotes

      3000
      example.com:3000
      3000:google.com:80
      192.168.0.5:3000:google.com:80
      socks
      5000:socks
      R:2222:localhost:22
      R:socks
      R:5000:socks
      stdio:example.com:22

    When the chisel server has --socks5 enabled, remotes can
    specify "socks" in place of remote-host and remote-port.
    The default local host and port for a "socks" remote is
    127.0.0.1:1080. Connections to this remote will terminate
    at the server's internal SOCKS5 proxy.

    When the chisel server has --reverse enabled, remotes can
    be prefixed with R to denote that they are reversed. That
    is, the server will listen and accept connections, and they
    will be proxied through the client which specified the remote.
    Reverse remotes specifying "R:socks" will listen on the server's
    default socks port (1080) and terminate the connection at the
    client's internal SOCKS5 proxy.

    When stdio is used as local-host, the tunnel will connect standard
    input/output of this program with the remote. This is useful when
    combined with ssh ProxyCommand. You can use
      ssh -o ProxyCommand='chisel client chiselserver stdio:%h:%p' \
          user@example.com
    to connect to an SSH server through the tunnel.

  Options:

    --fingerprint, A *strongly recommended* fingerprint string
    to perform host-key validation against the server's public key.
    You may provide just a prefix of the key or the entire string.
    Fingerprint mismatches will close the connection.

    --auth, An optional username and password (client authentication)
    in the form: "<user>:<pass>". These credentials are compared to
    the credentials inside the server's --authfile. defaults to the
    AUTH environment variable.

    --keepalive, An optional keepalive interval. Since the underlying
    transport is HTTP, in many instances we'll be traversing through
    proxies, often these proxies will close idle connections. You must
    specify a time with a unit, for example '5s' or '2m'. Defaults
    to '25s' (set to 0s to disable).

    --max-retry-count, Maximum number of times to retry before exiting.
    Defaults to unlimited.

    --max-retry-interval, Maximum wait time before retrying after a
    disconnection. Defaults to 5 minutes.

    --proxy, An optional HTTP CONNECT or SOCKS5 proxy which will be
    used to reach the chisel server. Authentication can be specified
    inside the URL.
    For example, http://admin:password@my-server.com:8081
            or: socks://admin:password@my-server.com:1080

    --header, Set a custom header in the form "HeaderName: HeaderContent".
    Can be used multiple times. (e.g --header "Foo: Bar" --header "Hello: World")

    --hostname, Optionally set the 'Host' header (defaults to the host
    found in the server url).

    --tls-ca, An optional root certificate bundle used to verify the
    chisel server. Only valid when connecting to the server with
    "https" or "wss". By default, the operating system CAs will be used.

    --tls-skip-verify, Skip server TLS certificate verification of
    chain and host name (if TLS is used for transport connections to
    server). If set, client accepts any TLS certificate presented by
    the server and any host name in that certificate. This only affects
    transport https (wss) connection. Chisel server's public key
    may be still verified (see --fingerprint) after inner connection
    is established.

    --tls-key, a path to a PEM encoded private key used for client
    authentication (mutual-TLS).

    --tls-cert, a path to a PEM encoded certificate matching the provided
    private key. The certificate must have client authentication
    enabled (mutual-TLS).

    --pid Generate pid file in current working directory

    -v, Enable verbose logging

    --help, This help text

  Signals:
    The chisel process is listening for:
      a SIGUSR2 to print process stats, and
      a SIGHUP to short-circuit the client reconnect timer

  Version:
    0.0.0-src (go1.15.2)

  Read more:
    https://github.com/jpillora/chisel
```

## Examples

### Chisel server

Chisel server listening on port 80 for reverse connections.

```plain
$ ./chisel server --port 80 --reverse
2020/10/06 09:56:46 server: Reverse tunnelling enabled
2020/10/06 09:56:46 server: Fingerprint 64:ed:18:bd:e0:81:57:59:1f:17:b8:d5:12:37:ea:12
2020/10/06 09:56:46 server: Listening on http://0.0.0.0:80
2020/10/06 09:56:47 server: session#1: tun: proxy#R:910=>22: Listening
```

### Chisel client

Chisel client starting reverse connection, forwarding local port 22 to port 910 on server all through port 80 over internet.

```plain
$ ./chisel client 188.166.27.194:80 R:910:127.0.0.1:22
2020/10/06 05:56:16 client: Connecting to ws://188.166.27.194:80
2020/10/06 05:56:17 client: Retrying in 100ms...
2020/10/06 05:56:17 client: Retrying in 200ms...
2020/10/06 05:56:17 client: Retrying in 400ms...
2020/10/06 05:56:17 client: Retrying in 800ms...
2020/10/06 05:56:18 client: Retrying in 1.6s...
2020/10/06 05:56:20 client: Retrying in 3.2s...
2020/10/06 05:56:23 client: Retrying in 6.4s...
2020/10/06 05:56:30 client: Fingerprint 05:f9:f1:e6:25:f2:f3:df:c9:23:21:11:8e:c3:91:c4
2020/10/06 05:56:30 client: Connected (Latency 34.820954ms)
2020/10/06 05:56:34 client: Disconnected
2020/10/06 05:56:34 client: Retrying in 12.8s...
2020/10/06 05:56:47 client: Fingerprint 64:ed:18:bd:e0:81:57:59:1f:17:b8:d5:12:37:ea:12
2020/10/06 05:56:47 client: Connected (Latency 32.352854ms)
2020/10/06 06:00:08 client: Disconnected
```

### Usage after connection received

On Chisel server side we can now find the port available.

```plain
$ netstat -a | grep -E LISTEN
tcp6       0      0 [::]:1337               [::]:*                  LISTEN
```

```plain
$ ssh root@127.0.0.1 -p 1337
root@127.0.0.1's password:
```

## URL List

- [Github.com - Chisel](https://github.com/jpillora/chisel)
