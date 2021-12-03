#!/usr/bin/env python3

from argparse import ArgumentParser
import ipaddress
import hashlib

defaultSubnets = [
    '127.0.0.1/32',
    '192.168.0.0/16',
    '172.16.0.0/12',
    '10.0.0.0/8'
]


def ipHash(ip):
    return hashlib.sha256(str(ip).encode('utf-16le')).hexdigest()


def nameHash(name):
    return hashlib.sha256(name.encode('utf-16le')).hexdigest()


def subnetIPs(subnet):
    try:
        return ipaddress.ip_network(subnet)
    except ValueError:
        print('Invalid or unknown subnet')
        exit()


def checkCookie(cookie, subnet):
    ips = subnetIPs(subnet)
    for ip in range(0, ips.num_addresses):
        if ipHash(ips[ip]) == cookie:
            print()
            print('ARRAffinity match! IP: {}'.format(ips[ip]))
            exit()
        elif (ip + 1) == ips.num_addresses:
            print('No ARRAffinity match in subnet {}'.format(subnet))


def main():
    parser = ArgumentParser(prog='ARRAffinity value')
    parser.add_argument('-c', '--cookie', type=str, help='Cookie value')
    parser.add_argument('-s', '--subnet', type=str, help='Expected subnet')
    args = parser.parse_args()

    if args.cookie:
        if not args.subnet:
            for subnet in defaultSubnets:
                checkCookie(args.cookie, subnet)
        else:
            checkCookie(args.cookie, args.subnet)
    else:
        if not args.subnet:
            for subnet in defaultSubnets:
                ips = subnetIPs(subnet)
                for ip in range(0, ips.num_addresses):
                    print(ips[ip], ipHash(ips[ip]))
        else:
            ips = subnetIPs(args.subnet)
            for ip in range(0, ips.num_addresses):
                print(ips[ip], ipHash(ips[ip]))


if __name__ == '__main__':
    main()
