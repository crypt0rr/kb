---
title : "iPerf3"
# pre : ' '
description : "The ultimate speed test tool for TCP, UDP and SCTP."
date : 2021-05-24T11:22:33+02:00
# hidden : true
# draft : true
weight : 180
# tags : ['']
---

---

The ultimate speed test tool for TCP, UDP and SCTP.

For Wi-Fi analyse use with [Wavemon.]({{< ref "wavemon" >}})

## Installation

```plain
sudo apt install iperf3
```

## Usage

```plain
iperf3 [-s|-c host] [options]
iperf3 [-h|--help] [-v|--version]
```

## Flags

```plain
Server or Client:
  -p, --port      #         server port to listen on/connect to
  -f, --format   [kmgtKMGT] format to report: Kbits, Mbits, Gbits, Tbits
  -i, --interval  #         seconds between periodic throughput reports
  -F, --file name           xmit/recv the specified file
  -A, --affinity n/n,m      set CPU affinity
  -B, --bind      <host>    bind to the interface associated with the address <host>
  -V, --verbose             more detailed output
  -J, --json                output in JSON format
  --logfile f               send output to a log file
  --forceflush              force flushing output at every interval
  -d, --debug               emit debugging output
  -v, --version             show version information and quit
  -h, --help                show this message and quit
Server specific:
  -s, --server              run in server mode
  -D, --daemon              run the server as a daemon
  -I, --pidfile file        write PID file
  -1, --one-off             handle one client connection then exit
  --rsa-private-key-path    path to the RSA private key used to decrypt
                            authentication credentials
  --authorized-users-path   path to the configuration file containing user
                            credentials
Client specific:
  -c, --client    <host>    run in client mode, connecting to <host>
  --sctp                    use SCTP rather than TCP
  -X, --xbind <name>        bind SCTP association to links
  --nstreams      #         number of SCTP streams
  -u, --udp                 use UDP rather than TCP
  --connect-timeout #       timeout for control connection setup (ms)
  -b, --bitrate #[KMG][/#]  target bitrate in bits/sec (0 for unlimited)
                            (default 1 Mbit/sec for UDP, unlimited for TCP)
                            (optional slash and packet count for burst mode)
  --pacing-timer #[KMG]     set the timing for pacing, in microseconds (default 1000)
  --fq-rate #[KMG]          enable fair-queuing based socket pacing in
                            bits/sec (Linux only)
  -t, --time      #         time in seconds to transmit for (default 10 secs)
  -n, --bytes     #[KMG]    number of bytes to transmit (instead of -t)
  -k, --blockcount #[KMG]   number of blocks (packets) to transmit (instead of -t or -n)
  -l, --length    #[KMG]    length of buffer to read or write
                            (default 128 KB for TCP, dynamic or 1460 for UDP)
  --cport         <port>    bind to a specific client port (TCP and UDP, default: ephemeral port)
  -P, --parallel  #         number of parallel client streams to run
  -R, --reverse             run in reverse mode (server sends, client receives)
  --bidir                   run in bidirectional mode.
                            Client and server send and receive data.
  -w, --window    #[KMG]    set window size / socket buffer size
  -C, --congestion <algo>   set TCP congestion control algorithm (Linux and FreeBSD only)
  -M, --set-mss   #         set TCP/SCTP maximum segment size (MTU - 40 bytes)
  -N, --no-delay            set TCP/SCTP no delay, disabling Nagle's Algorithm
  -4, --version4            only use IPv4
  -6, --version6            only use IPv6
  -S, --tos N               set the IP type of service, 0-255.
                            The usual prefixes for octal and hex can be used,
                            i.e. 52, 064 and 0x34 all specify the same value.
  --dscp N or --dscp val    set the IP dscp value, either 0-63 or symbolic.
                            Numeric values can be specified in decimal,
                            octal and hex (see --tos above).
  -L, --flowlabel N         set the IPv6 flow label (only supported on Linux)
  -Z, --zerocopy            use a 'zero copy' method of sending data
  -O, --omit N              omit the first n seconds
  -T, --title str           prefix every output line with this string
  --extra-data str          data string to include in client and server JSON
  --get-server-output       get results from server
  --udp-counters-64bit      use 64-bit counters in UDP test packets
  --repeating-payload       use repeating pattern in payload, instead of
                            randomized payload (like in iperf2)
  --username                username for authentication
  --rsa-public-key-path     path to the RSA public key used to encrypt
                            authentication credentials

[KMG] indicates options that support a K/M/G suffix for kilo-, mega-, or giga-

iperf3 homepage at: https://software.es.net/iperf/
Report bugs to:     https://github.com/esnet/iperf
```

## Examples

### Server side (receiver)

```plain
$ iperf3 -s
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
Accepted connection from 10.10.20.107, port 58080
[  5] local 10.10.20.250 port 5201 connected to 10.10.20.107 port 58082
[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  29.1 MBytes   244 Mbits/sec                  
[  5]   1.00-2.00   sec  39.3 MBytes   330 Mbits/sec                  
[  5]   2.00-3.00   sec  44.2 MBytes   371 Mbits/sec                  
[  5]   3.00-4.00   sec  45.2 MBytes   379 Mbits/sec                  
[  5]   4.00-5.00   sec  45.5 MBytes   381 Mbits/sec                  
[  5]   5.00-6.00   sec  46.0 MBytes   386 Mbits/sec                  
[  5]   6.00-7.00   sec  42.3 MBytes   355 Mbits/sec                  
[  5]   7.00-8.00   sec  41.5 MBytes   348 Mbits/sec                  
[  5]   8.00-9.00   sec  44.1 MBytes   370 Mbits/sec                  
[  5]   9.00-10.00  sec  46.5 MBytes   390 Mbits/sec                  
[  5]  10.00-11.00  sec  45.4 MBytes   381 Mbits/sec                  
[  5]  11.00-12.00  sec  41.3 MBytes   347 Mbits/sec                  
[  5]  12.00-13.00  sec  44.6 MBytes   375 Mbits/sec                  
[  5]  13.00-14.00  sec  45.9 MBytes   385 Mbits/sec                  
[  5]  14.00-15.00  sec  46.0 MBytes   386 Mbits/sec                  
[  5]  15.00-16.00  sec  45.9 MBytes   385 Mbits/sec                  
[  5]  16.00-17.00  sec  46.8 MBytes   392 Mbits/sec                  
[  5]  17.00-18.00  sec  41.9 MBytes   352 Mbits/sec                  
[  5]  17.00-18.00  sec  41.9 MBytes   352 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate
[  5]   0.00-18.00  sec   785 MBytes   366 Mbits/sec              receiver
```

### Client side (sender)

```plain
$ iperf3 -t200 -c 10.10.20.250
Connecting to host 10.10.20.250, port 5201
[  5] local 10.10.20.107 port 58082 connected to 10.10.20.250 port 5201
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  32.0 MBytes   268 Mbits/sec    0   1.38 MBytes       
[  5]   1.00-2.00   sec  40.0 MBytes   336 Mbits/sec    0   2.05 MBytes       
[  5]   2.00-3.00   sec  43.8 MBytes   367 Mbits/sec    0   2.15 MBytes       
[  5]   3.00-4.00   sec  46.2 MBytes   388 Mbits/sec    0   2.15 MBytes       
[  5]   4.00-5.00   sec  45.0 MBytes   377 Mbits/sec    0   2.15 MBytes       
[  5]   5.00-6.00   sec  46.2 MBytes   388 Mbits/sec    0   2.15 MBytes       
[  5]   6.00-7.00   sec  42.5 MBytes   357 Mbits/sec    0   2.15 MBytes       
[  5]   7.00-8.00   sec  41.2 MBytes   346 Mbits/sec    0   2.15 MBytes       
[  5]   8.00-9.00   sec  43.8 MBytes   367 Mbits/sec    0   2.15 MBytes       
[  5]   9.00-10.00  sec  46.2 MBytes   388 Mbits/sec    0   2.15 MBytes       
[  5]  10.00-11.00  sec  45.0 MBytes   378 Mbits/sec    0   2.15 MBytes       
[  5]  11.00-12.00  sec  41.2 MBytes   346 Mbits/sec    0   2.15 MBytes       
[  5]  12.00-13.00  sec  45.0 MBytes   377 Mbits/sec    0   2.15 MBytes       
[  5]  13.00-14.00  sec  46.2 MBytes   388 Mbits/sec    0   2.26 MBytes       
[  5]  14.00-15.00  sec  46.2 MBytes   388 Mbits/sec    0   2.26 MBytes       
[  5]  15.00-16.00  sec  46.2 MBytes   388 Mbits/sec    0   2.26 MBytes       
[  5]  16.00-17.00  sec  46.2 MBytes   388 Mbits/sec    0   2.52 MBytes       
[  5]  17.00-18.00  sec  42.5 MBytes   357 Mbits/sec    0   2.70 MBytes       
[  5]  18.00-18.06  sec  2.50 MBytes   368 Mbits/sec    0   2.70 MBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-18.06  sec   788 MBytes   366 Mbits/sec    0             sender
[  5]   0.00-18.06  sec  0.00 Bytes  0.00 bits/sec                  receiver
```

## URL List

- [iperf.fr - iperf](https://iperf.fr/)
- [iperf.fr - Docs](https://iperf.fr/iperf-doc.php)
- [Support.cumulusnetworks.com - iperf - throughput Testing and Troubleshooting](https://support.cumulusnetworks.com/hc/en-us/articles/216509388-Throughput-Testing-and-Troubleshooting)
