---
title : "Fio"
# pre : ' '
description : "Flexible I/O Tester."
date : 2023-06-22T14:25:34+02:00
# hidden : true
# draft : true
weight : 660
tags : ['Other', 'Harddisk']
---

---

Fio (Flexible I/O Tester) was originally written to save me the hassle of writing special test case programs when I wanted to test a specific workload, either for performance reasons or to find/reproduce a bug. The process of writing such a test app can be tiresome, especially if you have to do it often. Hence I needed a tool that would be able to simulate a given I/O workload without resorting to writing a tailored test case again and again.

A test work load is difficult to define, though. There can be any number of processes or threads involved, and they can each be using their own way of generating I/O. You could have someone dirtying large amounts of memory in a memory mapped file, or maybe several threads issuing reads using asynchronous I/O. fio needed to be flexible enough to simulate both of these cases, and many more.

Fio spawns a number of threads or processes doing a particular type of I/O action as specified by the user. fio takes a number of global parameters, each inherited by the thread unless otherwise parameters given to them overriding that setting is given. The typical use of fio is to write a job file matching the I/O load one wants to simulate.

## Installation

```plain
sudo apt install fio
```

```plain
brew install fio
```

## Usage

```plain
fio [options] [job options] <job file(s)>
```

## Flags

```plain
  --debug=options       Enable debug logging. May be one/more of:
                        process,file,io,mem,blktrace,verify,random,parse,
                        diskutil,job,mutex,profile,time,net,rate,compress,
                        steadystate,helperthread,zbd
  --parse-only          Parse options only, don't start any IO
  --merge-blktrace-only Merge blktraces only, don't start any IO
  --output              Write output to file
  --bandwidth-log       Generate aggregate bandwidth logs
  --minimal             Minimal (terse) output
  --output-format=type  Output format (terse,json,json+,normal)
  --terse-version=type  Set terse version output format (default 3, or 2 or 4)
  --version             Print version info and exit
  --help                Print this page
  --cpuclock-test       Perform test/validation of CPU clock
  --crctest=[type]      Test speed of checksum functions
  --cmdhelp=cmd         Print command help, "all" for all of them
  --enghelp=engine      Print ioengine help, or list available ioengines
  --enghelp=engine,cmd  Print help for an ioengine cmd
  --showcmd             Turn a job file into command line options
  --eta=when            When ETA estimate should be printed
                        May be "always", "never" or "auto"
  --eta-newline=t       Force a new line for every 't' period passed
  --status-interval=t   Force full status dump every 't' period passed
  --readonly            Turn on safety read-only checks, preventing writes
  --section=name        Only run specified section in job file, multiple sections can be specified
  --alloc-size=kb       Set smalloc pool to this size in kb (def 16384)
  --warnings-fatal      Fio parser warnings are fatal
  --max-jobs=nr         Maximum number of threads/processes to support
  --server=args         Start a backend fio server
  --daemonize=pidfile   Background fio server, write pid to file
  --client=hostname     Talk to remote backend(s) fio server at hostname
  --remote-config=file  Tell fio server to load this local job file
  --idle-prof=option    Report cpu idleness on a system or percpu basis
                        (option=system,percpu) or run unit work
                        calibration only (option=calibrate)
  --inflate-log=log     Inflate and output compressed log
  --trigger-file=file   Execute trigger cmd when file exists
  --trigger-timeout=t   Execute trigger at this time
  --trigger=cmd         Set this command as local trigger
  --trigger-remote=cmd  Set this command as remote trigger
  --aux-path=path       Use this path for fio state generated files

Fio was written by Jens Axboe <axboe@kernel.dk>
```

## Examples

### Sequential Write

```plain
[sequential-write]
rw=write
size=1G
direct=1
directory=/Users/crypt0rr
numjobs=5
group_reporting
name=sequential-write-direct
bs=8k
runtime=10
```

```plain
$ fio test.fio                                                                                                   
sequential-write-direct: (g=0): rw=write, bs=(R) 8192B-8192B, (W) 8192B-8192B, (T) 8192B-8192B, ioengine=psync, iodepth=1
...
fio-3.35
Starting 5 processes
sequential-write-direct: Laying out IO file (1 file / 1024MiB)
sequential-write: Laying out IO file (1 file / 1024MiB)
sequential-write: Laying out IO file (1 file / 1024MiB)
sequential-write: Laying out IO file (1 file / 1024MiB)
sequential-write: Laying out IO file (1 file / 1024MiB)
Jobs: 5 (f=5): [W(5)][100.0%][w=411MiB/s][w=52.6k IOPS][eta 00m:00s]
sequential-write-direct: (groupid=0, jobs=5): err= 0: pid=20141: Thu Jun 22 14:48:03 2023
  write: IOPS=63.5k, BW=496MiB/s (521MB/s)(4965MiB/10002msec); 0 zone resets
    clat (nsec): min=1000, max=6900.0k, avg=78401.36, stdev=240974.72
     lat (nsec): min=1000, max=6900.0k, avg=78455.26, stdev=240972.20
    clat percentiles (usec):
     |  1.00th=[    3],  5.00th=[    3], 10.00th=[    3], 20.00th=[    3],
     | 30.00th=[    3], 40.00th=[    5], 50.00th=[   25], 60.00th=[   79],
     | 70.00th=[   84], 80.00th=[   88], 90.00th=[   99], 95.00th=[  141],
     | 99.00th=[ 1172], 99.50th=[ 1745], 99.90th=[ 2933], 99.95th=[ 2999],
     | 99.99th=[ 4146]
   bw (  KiB/s): min=413665, max=615630, per=100.00%, avg=512535.84, stdev=15226.26, samples=95
   iops        : min=51707, max=76952, avg=64065.42, stdev=1903.27, samples=95
  lat (usec)   : 2=0.01%, 4=38.20%, 10=10.28%, 20=1.25%, 50=0.84%
  lat (usec)   : 100=39.46%, 250=5.98%, 500=2.30%, 750=0.26%, 1000=0.42%
  lat (msec)   : 2=0.64%, 4=0.37%, 10=0.01%
  cpu          : usr=0.68%, sys=10.08%, ctx=365676, majf=0, minf=47
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,635555,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
  WRITE: bw=496MiB/s (521MB/s), 496MiB/s-496MiB/s (521MB/s-521MB/s), io=4965MiB (5206MB), run=10002-10002msec
```

## URL list

- [Github.com - fio](https://github.com/axboe/fio)
- [Formulae.brew.sh - fio](https://formulae.brew.sh/formula/fio#default)
- [Linux.die.net - fio](https://linux.die.net/man/1/fio)
