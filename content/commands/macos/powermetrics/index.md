---
title : "Powermetrics"
# pre : '<i class="fas fa-code"></i> '
description : "Gather and display CPU usage statistics (divided into time spent in user mode and supervisor mode)."
date : 2021-12-21T08:54:06+01:00
# hidden : true
# draft : true
weight : 60
# tags : ['']
---

---

Gather and display CPU usage statistics (divided into time spent in user mode and supervisor mode), timer and interrupt wakeup frequency (total and, for near-idle workloads, those that resulted in package C-state exits), and on supported platforms, interrupt frequencies (categorized by CPU number), package C-state statistics (an indication of the time the core complex + integrated graphics, if any, were in low-power idle states), as well as the average execution frequency for each CPU when not idle.

## Usage

```plain
powermetrics [-i sample_interval] [-r order] [-t wakeup_cost]
```

## Flags

```plain


The following command-line options are supported:

    -h | --help                  show this message

    -A | --show-all              Enables all samplers and displays all the
                                 available information for each sampler.

    -a | --poweravg <N>          display poweravg every N samples (0=disabled) [default: 10]
    -b | --buffer-size <size>    set output buffer size (0=none, 1=line)
    -f | --format <format>       display data in specified format [default: text]
    -i | --sample-rate <N>       sample every N ms (0=disabled) [default: 5000ms]
    -n | --sample-count <N>      obtain N periodic samples (-1=infinite) [default: -1]
    -o | --output-file <file>    output to file [default: stdout]
    -r | --order <method>        order process list using specified method [default: composite]
    -s | --samplers <samplers>   comma separated list of samplers and sampler groups
    -t | --wakeup-cost <N>       assume package idle wakeups have a CPU time
                                 cost of N us when using hybrid sort orders
                                 using idle wakeups with time-based metrics


    --show-initial-usage         print initial sample for entire uptime
    --show-usage-summary         print final usage summary when exiting

    --show-extra-power-info      unsupported power info (may change between releases)

    --show-pstates               show pstate distribution (XCPM only)
    --show-plimits               cpu limiting information
    --show-cpu-qos               show per cpu QOS breakdowns
    --show-cpu-scalability       show per cpu workload scalability
    --show-hwp-capability        show per cpu-thread HWP estimated efficient and guarateed frequencies (instantaneous)
    --show-process-coalition     group processes by coalitions and show per coalition information
    --show-responsible-pid       show responsible pid for xpc services and parent pid
    --show-process-wait-times    show per-process sfi wait time info
    --show-process-qos-tiers     show per-process QOS latency and throughput tiers
    --show-process-io            show per-process io information
    --show-process-gpu           show per-process gpu time
    --show-process-netstats      show per-process network information
    --show-process-qos           show QOS times aggregated by process
    --show-process-energy        show per-process energy impact number
                                 This implicitly enables sampling of all the
                                 above per-process statistics.
    --show-process-samp-norm     Show CPU time normailzed by the sample window.
    --handle-invalid-values      powermetrics will output invalid=true rather
                                 than abort when it sees invalid values.
    --hide-cpu-duty-cycle        hide CPU duty cycle data
    --unhide-info <samplers>     comma separated list of samplers to unhide (backwards compatibility)

The following sort orders are supported by --order:

    pid         process identifier
    wakeups     total package idle wakeups         (alias: -W)
    cputime     total CPU time used                (alias: -C)
    composite   weighted hybrid of package idle
                wakeups and CPU time used          (alias: -O)

The following output formats are supported by --format:

    text        human-readable text output
    plist       machine-readable property list, NUL-separated

This tool also implements special behavior upon receipt of certain signals
to aid with the automated collection of data:

    SIGINFO                 take an immediate sample
    SIGIO                   flush any buffered output
    SIGINT/SIGTERM/SIGHUP   stop sampling and exit

The following samplers are supported by --samplers:

    tasks             per task cpu usage and wakeup stats
    battery           battery and backlight info
    network           network usage info
    disk              disk usage info
    int_sources       interrupt sources information
    interrupts        interrupt distribution
    cpu_power         c-state residency, power and frequency info
    thermal           thermal pressure notifications
    sfi               selective forced idle information
    gpu_power         gpu c-state residency, p-state residency and frequency info
    gpu_agpm_stats    Statistics reported by AGPM
    smc               SMC sensors
    gpu_dcc_stats     gpu duty cycle info
    nvme_ssd          NVMe power state information
    io_throttle_ssd   IO Throttling information

and the following sampler groups are supported by --samplers:

    all           tasks,battery,network,disk,int_sources,interrupts,cpu_power,thermal,sfi,gpu_power,gpu_agpm_stats,smc,gpu_dcc_stats,nvme_ssd,io_throttle_ssd
    default       tasks,battery,network,disk,interrupts,cpu_power,gpu_power,gpu_agpm_stats,smc,gpu_dcc_stats
```

## Examples

### Monitor CPU temperature

Change the `-i` parameter to adjust the interval. 2000 = 2 seconds.

```plain
sudo powermetrics -i 2000 --samplers smc | grep 'CPU die temperature'
```

### Monitor GPU temperature

```plain
sudo powermetrics -i 2000 --samplers smc | grep 'GPU die temperature'
```

### Monitor fan speed

```plain
sudo powermetrics -i 2000 --samplers smc | grep 'Fan:'
```

## URL List

- [Unix.com - Powermetrics](https://www.unix.com/man-page/osx/1/powermetrics/)
