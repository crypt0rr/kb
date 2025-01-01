---
title : "ssh"
# pre : '<i class="fas fa-code"></i> '
description : "ssh (SSH client) is a program for logging into a remote machine and for executing commands on a remote machine."
date : 2020-03-11T15:19:22+01:00
# hidden : true
# draft : true
weight : 390
tags : ['Networking', 'SSH', 'Pivoting']
---

---

ssh (SSH client) is a program for logging into a remote machine and for executing commands on a remote machine.  It is intended to provide secure encrypted communications between two untrusted hosts over an insecure network.  X11 connections, arbitrary TCP ports and UNIX-domain sockets can also be forwarded over the secure channel.

## Installation

```plain
sudo apt install openssh-client
```

## Usage

```plain
ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]
```

## Flags

```plain
  -4      Forces ssh to use IPv4 addresses only.

     -6      Forces ssh to use IPv6 addresses only.

     -A      Enables forwarding of connections from an authentication agent such as ssh-agent(1).  This can also be specified on a per-host basis in a configuration file.

             Agent forwarding should be enabled with caution.  Users with the ability to bypass file permissions on the remote host (for the agent's UNIX-domain socket) can access the local agent through the forwarded
             connection.  An attacker cannot obtain key material from the agent, however they can perform operations on the keys that enable them to authenticate using the identities loaded into the agent.  A safer
             alternative may be to use a jump host (see -J).

     -a      Disables forwarding of the authentication agent connection.

     -B bind_interface
             Bind to the address of bind_interface before attempting to connect to the destination host.  This is only useful on systems with more than one address.

     -b bind_address
             Use bind_address on the local machine as the source address of the connection.  Only useful on systems with more than one address.

     -C      Requests compression of all data (including stdin, stdout, stderr, and data for forwarded X11, TCP and UNIX-domain connections).  The compression algorithm is the same used by gzip(1).  Compression is
             desirable on modem lines and other slow connections, but will only slow down things on fast networks.  The default value can be set on a host-by-host basis in the configuration files; see the Compression
             option.

     -c cipher_spec
             Selects the cipher specification for encrypting the session.  cipher_spec is a comma-separated list of ciphers listed in order of preference.  See the Ciphers keyword in ssh_config(5) for more information.

     -D [bind_address:]port
             Specifies a local “dynamic” application-level port forwarding.  This works by allocating a socket to listen to port on the local side, optionally bound to the specified bind_address.  Whenever a connection
             is made to this port, the connection is forwarded over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine.  Currently the SOCKS4 and
             SOCKS5 protocols are supported, and ssh will act as a SOCKS server.  Only root can forward privileged ports.  Dynamic port forwardings can also be specified in the configuration file.

             IPv6 addresses can be specified by enclosing the address in square brackets.  Only the superuser can forward privileged ports.  By default, the local port is bound in accordance with the GatewayPorts
             setting.  However, an explicit bind_address may be used to bind the connection to a specific address.  The bind_address of “localhost” indicates that the listening port be bound for local use only, while
             an empty address or ‘*’ indicates that the port should be available from all interfaces.

     -E log_file
             Append debug logs to log_file instead of standard error.

     -e escape_char
             Sets the escape character for sessions with a pty (default: ‘~’).  The escape character is only recognized at the beginning of a line.  The escape character followed by a dot (‘.’) closes the connection;
     -F configfile
             Specifies an alternative per-user configuration file.  If a configuration file is given on the command line, the system-wide configuration file (/etc/ssh/ssh_config) will be ignored.  The default for the
             per-user configuration file is ~/.ssh/config.  If set to “none”, no configuration files will be read.

     -f      Requests ssh to go to background just before command execution.  This is useful if ssh is going to ask for passwords or passphrases, but the user wants it in the background.  This implies -n.  The
             recommended way to start X11 programs at a remote site is with something like ssh -f host xterm.

             If the ExitOnForwardFailure configuration option is set to “yes”, then a client started with -f will wait for all remote port forwards to be successfully established before placing itself in the
             background.  Refer to the description of ForkAfterAuthentication in ssh_config(5) for details.

     -G      Causes ssh to print its configuration after evaluating Host and Match blocks and exit.

     -g      Allows remote hosts to connect to local forwarded ports.  If used on a multiplexed connection, then this option must be specified on the master process.

     -I pkcs11
             Specify the PKCS#11 shared library ssh should use to communicate with a PKCS#11 token providing keys for user authentication.

     -i identity_file
             Selects a file from which the identity (private key) for public key authentication is read.  You can also specify a public key file to use the corresponding private key that is loaded in ssh-agent(1) when
             the private key file is not present locally.  The default is ~/.ssh/id_rsa, ~/.ssh/id_ecdsa, ~/.ssh/id_ecdsa_sk, ~/.ssh/id_ed25519, ~/.ssh/id_ed25519_sk and ~/.ssh/id_dsa.  Identity files may also be
             specified on a per-host basis in the configuration file.  It is possible to have multiple -i options (and multiple identities specified in configuration files).  If no certificates have been explicitly
             specified by the CertificateFile directive, ssh will also try to load certificate information from the filename obtained by appending -cert.pub to identity filenames.

     -J destination
             Connect to the target host by first making a ssh connection to the jump host described by destination and then establishing a TCP forwarding to the ultimate destination from there.  Multiple jump hops may
             be specified separated by comma characters.  This is a shortcut to specify a ProxyJump configuration directive.  Note that configuration directives supplied on the command-line generally apply to the
             destination host and not any specified jump hosts.  Use ~/.ssh/config to specify configuration for jump hosts.

     -K      Enables GSSAPI-based authentication and forwarding (delegation) of GSSAPI credentials to the server.

     -k      Disables forwarding (delegation) of GSSAPI credentials to the server.

     -L [bind_address:]port:host:hostport
     -L [bind_address:]port:remote_socket
     -L local_socket:host:hostport
     -L local_socket:remote_socket
             Specifies that connections to the given TCP port or Unix socket on the local (client) host are to be forwarded to the given host and port, or Unix socket, on the remote side.  This works by allocating a
             socket to listen to either a TCP port on the local side, optionally bound to the specified bind_address, or to a Unix socket.  Whenever a connection is made to the local port or socket, the connection is
             forwarded over the secure channel, and a connection is made to either host port hostport, or the Unix socket remote_socket, from the remote machine.

             Port forwardings can also be specified in the configuration file.  Only the superuser can forward privileged ports.  IPv6 addresses can be specified by enclosing the address in square brackets.

             By default, the local port is bound in accordance with the GatewayPorts setting.  However, an explicit bind_address may be used to bind the connection to a specific address.  The bind_address of
             “localhost” indicates that the listening port be bound for local use only, while an empty address or ‘*’ indicates that the port should be available from all interfaces.

     -l login_name
             Specifies the user to log in as on the remote machine.  This also may be specified on a per-host basis in the configuration file.

     -M      Places the ssh client into “master” mode for connection sharing.  Multiple -M options places ssh into “master” mode but with confirmation required using ssh-askpass(1) before each operation that changes
             the multiplexing state (e.g. opening a new session).  Refer to the description of ControlMaster in ssh_config(5) for details.

     -m mac_spec
             A comma-separated list of MAC (message authentication code) algorithms, specified in order of preference.  See the MACs keyword for more information.

     -N      Do not execute a remote command.  This is useful for just forwarding ports.  Refer to the description of SessionType in ssh_config(5) for details.

     -n      Redirects stdin from /dev/null (actually, prevents reading from stdin).  This must be used when ssh is run in the background.  A common trick is to use this to run X11 programs on a remote machine.  For
             example, ssh -n shadows.cs.hut.fi emacs & will start an emacs on shadows.cs.hut.fi, and the X11 connection will be automatically forwarded over an encrypted channel.  The ssh program will be put in the
             background.  (This does not work if ssh needs to ask for a password or passphrase; see also the -f option.)  Refer to the description of StdinNull in ssh_config(5) for details.
    -O ctl_cmd
             Control an active connection multiplexing master process.  When the -O option is specified, the ctl_cmd argument is interpreted and passed to the master process.  Valid commands are: “check” (check that
             the master process is running), “forward” (request forwardings without command execution), “cancel” (cancel forwardings), “exit” (request the master to exit), and “stop” (request the master to stop
             accepting further multiplexing requests).

     -o option
             Can be used to give options in the format used in the configuration file.  This is useful for specifying options for which there is no separate command-line flag.  For full details of the options listed
             below, and their possible values, see ssh_config(5).
     -p port
             Port to connect to on the remote host.  This can be specified on a per-host basis in the configuration file.

     -Q query_option
             Queries for the algorithms supported by one of the following features: cipher (supported symmetric ciphers), cipher-auth (supported symmetric ciphers that support authenticated encryption), help (supported
             query terms for use with the -Q flag), mac (supported message integrity codes), kex (key exchange algorithms), key (key types), key-cert (certificate key types), key-plain (non-certificate key types),
             key-sig (all key types and signature algorithms), protocol-version (supported SSH protocol versions), and sig (supported signature algorithms).  Alternatively, any keyword from ssh_config(5) or
             sshd_config(5) that takes an algorithm list may be used as an alias for the corresponding query_option.

     -q      Quiet mode.  Causes most warning and diagnostic messages to be suppressed.

     -R [bind_address:]port:host:hostport
     -R [bind_address:]port:local_socket
     -R remote_socket:host:hostport
     -R remote_socket:local_socket
     -R [bind_address:]port
             Specifies that connections to the given TCP port or Unix socket on the remote (server) host are to be forwarded to the local side.

             This works by allocating a socket to listen to either a TCP port or to a Unix socket on the remote side.  Whenever a connection is made to this port or Unix socket, the connection is forwarded over the
             secure channel, and a connection is made from the local machine to either an explicit destination specified by host port hostport, or local_socket, or, if no explicit destination was specified, ssh will
             act as a SOCKS 4/5 proxy and forward connections to the destinations requested by the remote SOCKS client.

             Port forwardings can also be specified in the configuration file.  Privileged ports can be forwarded only when logging in as root on the remote machine.  IPv6 addresses can be specified by enclosing the
             address in square brackets.

             By default, TCP listening sockets on the server will be bound to the loopback interface only.  This may be overridden by specifying a bind_address.  An empty bind_address, or the address ‘*’, indicates
             that the remote socket should listen on all interfaces.  Specifying a remote bind_address will only succeed if the server's GatewayPorts option is enabled (see sshd_config(5)).

             If the port argument is ‘0’, the listen port will be dynamically allocated on the server and reported to the client at run time.  When used together with -O forward, the allocated port will be printed to
             the standard output.

     -S ctl_path
             Specifies the location of a control socket for connection sharing, or the string “none” to disable connection sharing.  Refer to the description of ControlPath and ControlMaster in ssh_config(5) for
             details.

     -s      May be used to request invocation of a subsystem on the remote system.  Subsystems facilitate the use of SSH as a secure transport for other applications (e.g. sftp(1)).  The subsystem is specified as the
             remote command.  Refer to the description of SessionType in ssh_config(5) for details.

     -T      Disable pseudo-terminal allocation.

     -t      Force pseudo-terminal allocation.  This can be used to execute arbitrary screen-based programs on a remote machine, which can be very useful, e.g. when implementing menu services.  Multiple -t options
             force tty allocation, even if ssh has no local tty.

     -V      Display the version number and exit.

     -v      Verbose mode.  Causes ssh to print debugging messages about its progress.  This is helpful in debugging connection, authentication, and configuration problems.  Multiple -v options increase the verbosity.
             The maximum is 3.
    -W host:port
             Requests that standard input and output on the client be forwarded to host on port over the secure channel.  Implies -N, -T, ExitOnForwardFailure and ClearAllForwardings, though these can be overridden in
             the configuration file or using -o command line options.

     -w local_tun[:remote_tun]
             Requests tunnel device forwarding with the specified tun(4) devices between the client (local_tun) and the server (remote_tun).

             The devices may be specified by numerical ID or the keyword “any”, which uses the next available tunnel device.  If remote_tun is not specified, it defaults to “any”.  See also the Tunnel and TunnelDevice
             directives in ssh_config(5).

             If the Tunnel directive is unset, it will be set to the default tunnel mode, which is “point-to-point”.  If a different Tunnel forwarding mode it desired, then it should be specified before -w.

     -X      Enables X11 forwarding.  This can also be specified on a per-host basis in a configuration file.

             X11 forwarding should be enabled with caution.  Users with the ability to bypass file permissions on the remote host (for the user's X authorization database) can access the local X11 display through the
             forwarded connection.  An attacker may then be able to perform activities such as keystroke monitoring.

             For this reason, X11 forwarding is subjected to X11 SECURITY extension restrictions by default.  Refer to the ssh -Y option and the ForwardX11Trusted directive in ssh_config(5) for more information.

     -x      Disables X11 forwarding.

     -Y      Enables trusted X11 forwarding.  Trusted X11 forwardings are not subjected to the X11 SECURITY extension controls.

     -y      Send log information using the syslog(3) system module.  By default this information is sent to stderr.
```

## Examples

### Connect using specific port (default: 22)

```plain
ssh user@server -p <port>
```

### Run script on remote server

```plain
ssh user@server <scrip_to_run>
```

### Create public private keys

```plain
ssh-keygen -f <filename> -t rsa -b 4096
```

### Upload SSH key to target host

```plain
ssh-copy-id -f -i <filename>.pub <user>@<target>
```

### Disable host key checking

```plain
-o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no"
```

### Disable password authentication

```plain
sudo vi /etc/ssh/sshd_config

ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
PermitRootLogin no
```

```plain
sudo systemctl reload ssh
```

### FIDO U2F over SSH

```plain
$ ssh-keygen -t ecdsa-sk -f ~/.ssh/id_ecdsa_sk
Generating public/private ecdsa-sk key pair.
You may need to touch your authenticator to authorize key generation.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/johndo/.ssh/id_ecdsa_sk
Your public key has been saved in /home/johndo/.ssh/id_ecdsa_sk.pub
The key fingerprint is:
SHA256:f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2 johndo@example
The key's randomart image is:
+-[ECDSA-SK 256]--+
|                 |
| o     . .       |
|oA.     + o      |
|.. .   x O +     |
|a   .   R * .    |
|-  . . . P o     |
|..  o . % + .    |
|   .  .!!! o .   |
|      .---X#o    |
+----[SHA256]-----+
```

### SSH Local Port Forwarding

For full routing please check SSH Dynamic Port Forwarding or [SSHuttle]({{< ref "sshuttle" >}}).

- 2222 - Local port to bind
- 22 - remote port to bind

This scenario will expose the remote port 22 to the local machine on port 2222.

- `-N` - Do not execute a remote command, will result in only forwarding the port not opening a command shell.
- `-L` - Specifies that connections to the given TCP port or Unix socket on the local (client) host are to be forwarded to the given host and port, or Unix socket, on the remote side.

```plain
ssh -N -L 2222:localhost:22 <username>@<ip>
```

To forward multiple ports in one session, use the `-L` option multiple times.

```plain
ssh -L 2222:localhost:22 -L 4444:localhost:80 -L 5555:localhost:443 -L 6666:localhost:3389 <username>@<ip>
```

Helpful ports when targeting Active Directory Domain Controllers, you want to replace `localhost` with the IP address of the DC.

```plain
ssh -L 53:localhost:53 -L 88:localhost:88 -L 389:localhost:389 -L 445:localhost:445 -L 3389:localhost:3389 <username>@<ip>
```

### SSH Remote Port Forwarding

For full routing please check SSH Dynamic Port Forwarding or [SSHuttle]({{< ref "sshuttle" >}}).

- `-N` - Do not execute a remote command, will result in only forwarding the port not opening a command shell.
- `-R` - Specifies that connections to the given TCP port or Unix socket on the remote (server) host are to be forwarded to the local side.

This scenario is ran on the host that can SSH outbound but has no ability to receive a SSH connection. Otherwise the SSH Local Port Forwarding could be used instead.

- `10.10.10.1:4444` - The remote host that will receive the connection binding on port `4444` exposing port `445` on the remote host.
- `127.0.0.1:445` - The remote host that will connect to the target host exposing it's local port `445` to the remote port `4444`

```plain
ssh -N -R 10.10.10.1:4444:127.0.0.1:445 user@target-host
```

Or just create a socks proxy from the remote host to the server. On remote host run the following and thereafter for example use proxychains on the server side.

```plain
ssh -N -R 1080 user@target-host
```

### SSH Dynamic Port Forwarding

Route any traffic thru the SSH connection to the remote host, a proxy tool like [proxychains]({{< ref "proxychains" >}}) is required. An alternative is to using SSH for this is [SSHuttle]({{< ref "sshuttle" >}}).

- `-N` - Do not execute a remote command, will result in only forwarding the port not opening a command shell.
- `-D` - Specifies a local “dynamic” application-level port forwarding. (SOCKS4 Proxy)

```plain
ssh -N -D 127.0.0.1:8080 user@target-host
```

### X11 Forwarding

Make sure the SSH server has `X11Forwarding` set to `yes`.

```plain
ssh -X user@target
```

On macOS install [xquartz](https://formulae.brew.sh/cask/xquartz).

### Connecting Old Systems

- `-oKexAlgorithms=` - Key Exchange Method
- `-oHostKeyAlgorithms=` - Host Key Type
- `-c` - Cipher

```plain
$ ssh 10.10.10.1                
Unable to negotiate with 10.10.10.1 port 22: no matching key exchange method found. Their offer: diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1
                                                                                                                                                                                                                       
$ ssh 10.10.10.1 -oKexAlgorithms=+diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1
Unable to negotiate with 10.10.10.1 port 22: no matching host key type found. Their offer: ssh-rsa,ssh-dss

$ ssh 10.10.10.1 -oKexAlgorithms=+diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1 -oHostKeyAlgorithms=ssh-rsa,ssh-dss
Unable to negotiate with 10.10.10.1 port 22: no matching cipher found. Their offer: aes128-cbc,3des-cbc,blowfish-cbc,cast128-cbc,arcfour,aes192-cbc,aes256-cbc,rijndael128-cbc,rijndael192-cbc,rijndael256-cbc,rijndael-cbc@lysator.liu.se
                                                                                                                                                                                                                       
$ ssh 10.10.10.1 -oKexAlgorithms=+diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1 -oHostKeyAlgorithms=ssh-rsa,ssh-dss -c aes128-cbc
The authenticity of host '10.10.10.1 (10.10.10.1)' can't be established.
RSA key fingerprint is SHA256:VDo/h/SG4A6H+WPH3LsQqw1jwjyseGYq9nLeRWPCY/A.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.10.1' (RSA) to the list of known hosts.
crypt0rr@10.10.10.1's password: 
```

## URL List

- [Linux.die.net](https://linux.die.net/man/1/ssh)
