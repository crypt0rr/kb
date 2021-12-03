#!/bin/bash
GROUPLIST=("Domain Admins" "Enterprise Admins" "Administrators" "Schema Admins" "Backup Operators" "Account Operators" "DNS Admins")
for GROUP in ${!GROUPLIST[*]}
do
    printf "%s\n" "${GROUPLIST[$GROUP]} contains:"
    grep -w "${GROUPLIST[$GROUP]}" domain_users.grep | grep -v ACCOUNT_DISABLED | awk -F ';' '{print $3}' | sort && echo ""
done