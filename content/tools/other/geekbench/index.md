---
title : "Geekbench 6"
# pre : ' '
description : "Geekbench 6 measures your device's CPU and GPU performance."
date : 2025-10-30T20:08:56+01:00
# hidden : true
# draft : true
weight : 0
# tags : ['']
---

If you want to benchmark your Linux machine and quickly measure CPU and GPU performance, Geekbench 6 is one of the easiest tools available. It provides a standardized test suite that you can run directly from the terminal without installing heavy dependencies.

## Installation

```plain
wget https://cdn.geekbench.com/Geekbench-6.5.0-Linux.tar.gz
tar xf Geekbench-6.5.0-Linux.tar.gz
cd Geekbench-6.5.0-Linux/
```

## Usage

```plain
./geekbench6 [ options ]
```

The test will take a few minutes to complete. Once finished, it will output a URL that links to your benchmark results on the Geekbench Browser.

## Flags

```plain
  -h, --help                  print this message
  --unlock EMAIL KEY          unlock Geekbench using EMAIL and KEY

  --cpu                       run the CPU benchmark
  --sysinfo                   display system information and exit
[1030/191242:WARNING:opencl_library.cpp(696)] Cannot find or load OpenCL library.
[1030/191242:WARNING:vulkan_library.cpp(1390)] Failed to load vkGetInstanceProcAddr: 

  If no options are given, the default action is to run the CPU benchmark.
```

## Examples

```plain
# ./geekbench6
Geekbench 6.5.0 : https://www.geekbench.com/

Geekbench 6 requires an active internet connection and automatically uploads 
benchmark results to the Geekbench Browser.

Upgrade to Geekbench 6 Pro to enable offline use and unlock other features:

  https://store.primatelabs.com/v6

Enter your Geekbench 6 Pro license using the following command line:

  ./geekbench6 --unlock <email> <key>

System Information
  Operating System              Debian GNU/Linux 13 (trixie)
  Kernel                        Linux 6.12.41+deb13-cloud-amd64 x86_64
  Model                         Hetzner vServer
  Motherboard                   KVM Standard PC (Q35 + ICH9, 2009)
  BIOS                          Hetzner 20171111

CPU Information
  Name                          AMD EPYC-Rome Processor
  Topology                      1 Processor, 4 Cores
  Identifier                    AuthenticAMD Family 23 Model 49 Stepping 0
  Base Frequency                2.44 GHz
  L1 Instruction Cache          32.0 KB x 4
  L1 Data Cache                 32.0 KB x 4
  L2 Cache                      512 KB x 4
  L3 Cache                      16.0 MB
  Instruction Sets              sse2 sse3 pclmul fma3 sse41 aesni avx avx2 shani

Memory Information
  Size                          7.58 GB


Single-Core
  Running File Compression
  Running Navigation
  Running HTML5 Browser
  Running PDF Renderer
  Running Photo Library
  Running Clang
  Running Text Processing
  Running Asset Compression
  Running Object Detection
  Running Background Blur
  Running Horizon Detection
  Running Object Remover
  Running HDR
  Running Photo Filter
  Running Ray Tracer
  Running Structure from Motion

Multi-Core
  Running File Compression
  Running Navigation
  Running HTML5 Browser
  Running PDF Renderer
  Running Photo Library
  Running Clang
  Running Text Processing
  Running Asset Compression
  Running Object Detection
  Running Background Blur
  Running Horizon Detection
  Running Object Remover
  Running HDR
  Running Photo Filter
  Running Ray Tracer
  Running Structure from Motion


Uploading results to the Geekbench Browser. This could take a minute or two 
depending on the speed of your internet connection.

Upload succeeded. Visit the following link and view your results online:

  https://browser.geekbench.com/v6/cpu/14756300
```

## URL list

- [Geekbench Browser](https://browser.geekbench.com/)
