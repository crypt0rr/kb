import argparse
import ipaddress
from os import path
from time import sleep
from shlex import split
from scapy.all import sniff
from threading import Thread
from subprocess import Popen, PIPE

valid_ranges = []
intern_ranges = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]

def listen(args):
    global valid_ranges
    if path.isfile(args.output):
        valid_ranges = open(args.output, "r").read().splitlines()
        print(f"Already found ranges:")
        for ip_range in valid_ranges:
            print(f"{ip_range}")
    log_file = open(args.output, "a")
    print(f'Listening for incoming packets on {args.interface}... Press Ctrl+C to stop.')
    sniff(iface=args.interface, prn=lambda packet: packet_callback(packet, log_file), store=0)
    
def packet_callback(packet, log_file):
    global valid_ranges
    if packet.haslayer("IP"):
        for ip_range in intern_ranges:
            if ipaddress.ip_address(packet["IP"].src) in ipaddress.ip_network(ip_range, strict=False):
                slash24range = f'{".".join(packet["IP"].src.split(".")[:3])}.0/24'
                # print(slash24range, valid_ranges, slash24range in valid_ranges)
                if slash24range not in valid_ranges:
                    valid_ranges.append(slash24range)
                    log_file.write(f"{slash24range}\n")
                    log_file.flush()
                    print(slash24range)         

def scan(args):
    print("Launching Masscan on internal ranges")
    if args.rate: 
        print(args.rate)
        rate = args.rate
    else: 
        rate = "100000"
    command = f"xterm -e masscan 192.168.0.0/16 10.0.0.0/8 172.16.0.0/12 -p 22,80,443,445,3389 --rate {rate}"
    Popen(split(command) , stdout=PIPE, stderr=PIPE)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", help="Interface on which to listen and run scan", dest="interface", required=True)    
    parser.add_argument("-o", help="File in which to write found ranges", dest="output", required=True)
    parser.add_argument("--scan", help="Launch internal ranges masscan", dest="scan", action="store_true")
    parser.add_argument("--rate", help="Scan rate (the more the faster)", dest="rate")

    args = parser.parse_args()
    
    Thread(target=listen, args=(args,)).start()
    sleep(2)
    if args.scan:
        Thread(target=scan, args=(args,)).start()
