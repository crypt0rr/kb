#!/bin/bash

# Checking requirements, requirements are defined in PROGRAMLIST
func_requirements () {
	echo -e "\nChecking requirements..."
	PROGRAMLIST=(amass nmap aquatone)
	COUNTER=0
	ALLPASS=TRUE
	for PROGRAM in ${PROGRAMLIST[*]}
		do
			if ! [ -x "$(command -v $PROGRAM)" ]; then
				echo -e '\e[31m[-]' ${PROGRAMLIST[COUNTER]}  'is not installed or not in path' >&2; ((COUNTER=COUNTER + 1)); ALLPASS=FALSE
			else
				echo -e '\e[32m[+]' ${PROGRAMLIST[COUNTER]} 'is installed'; ((COUNTER=COUNTER + 1))
			fi
	done
	func_check_connect

	# If a dependency is not met exit program
	if [ "$ALLPASS" == FALSE ]; then
		echo -e "\n\e[31mNot all requirements met please fix and try again"; exit 1
	fi
	echo -e "\e[0m"; func_main
}

# Check internet connection
func_check_connect () {
	wget -q --spider http://google.com
	if [ $? -eq 0 ]; then
    	echo -e "\e[32m[+] Internet connection up\e[0m"
    	#return 1
	else
	    echo -e "\e[31mYour internet connection seams down, please check before continuing"; exit 1
	fi
}

# Creating working directory otherwise asking to delete existing
func_workingdir () {
	echo -e "\nFolder recon-folder will be created, this will contain results"
	mkdir recon-folder || { echo -e "\n\e[31mFolder recon-folder could not be created"; EXISTS=1; }
	if [[ $EXISTS = '1' ]]; then
		read -p "Do you want to remove the existing recon-folder? y/n: " ANSWER
		if [[ $ANSWER =~ ^[Yy]$ ]]; then
			rm -rf recon-folder; echo -e "\e[32mDone, proceeding...\n\e[0m"; mkdir recon-folder
		else
			echo -e "\nCannot proceed, try again\e[0m\n"; func_main
		fi
	fi
}

# Get domain from user
func_getdomain () {
	read -p "Please enter a domain to harvest (e.g. example.com): " DOMAIN
	read -p "You have entered: ${DOMAIN} is this correct? y/n: " ANSWER
	if [[ $ANSWER =~ ^[Yy]$ ]]; then
		echo $DOMAIN
	else
		func_getdomain
	fi
}

# amass for the given domain
func_amass () {
	echo -e "\namass warming up... getting subdomains for $DOMAIN"
 	amass enum -d $DOMAIN -o recon-folder/$DOMAIN.amass.log || { echo -e "\e[31mError occured, please restart."; exit 1; }
}

# nmap parsing results of amass and writes output
func_nmap () {
	echo -e "\nnmap will now portscan the domains found by amass"
	read -p "Default flags that will be used are: -Pn -T3, is this ok? y/n: " ANSWER
	if [[ $ANSWER =~ ^[Yy]$ ]];	then
			echo -e "\nnmap starting portscan with default flags on all domains found with amass... "
			nmap -iL recon-folder/$DOMAIN.amass.log -Pn -T3 -oA recon-folder/$DOMAIN.log || { echo -e "\e[31mError occured, please restart."; exit 1; }
	else
		echo -e "\e[31mYou can't say no to this function yet\e[0m"; func_nmap
	fi
}

# aquatone parsing the nmap output to visible screenshots
func_aquatone () {
	echo -e "\naquatone will now screenshot the results for $DOMAIN"
	read -p "Do you want to use a proxy (e.g. Burp Suite)? y/n: " ANSWER
	if [[ $ANSWER =~ ^[Yy]$ ]]; then
		echo "Make sure your proxy is running and lettings requests thru"
		read -p "Give proxy IP and port (e.g. http://127.0.0.1:8080): " PROXY
		echo "aquatone will now start..."
		cat recon-folder/$DOMAIN.log.xml | aquatone -nmap -proxy $PROXY -out recon-folder || { echo -e "\e[31mError occured, please restart."; exit 1; }
	fi
	if [[ $ANSWER =~ ^[Nn]$ ]]; then
		echo "aquatone will now start..."
		cat recon-folder/$DOMAIN.log.xml | aquatone -nmap -out recon-folder || { echo -e "\e[31mError occured, please restart."; exit 1; }
	fi
}

# Validating browsers and giving the option to open report
func_report () {
	read -p "Do you want to open the aquatone report now? y/n: " ANSWER
	if [[ $ANSWER =~ ^[Yy]$ ]]; then
		PROGRAMLIST=(chromium google-chrome firefox)
		COUNTER=0
		for PROGRAM in ${PROGRAMLIST[*]}; do
			if ! [ -x "$(command -v $PROGRAM)" ]; then
				echo -e '\e[31m[-]' ${PROGRAMLIST[COUNTER]}  'is not installed or not in path' >&2;	((COUNTER=COUNTER + 1))
			else
				echo -e '\e[32m[+]' $COUNTER ${PROGRAMLIST[COUNTER]} 'is installed'; ((COUNTER=COUNTER + 1))
			fi
		done
		echo -e "\e[0m "
		read -p "Which browser should be used to open report? (0/1/2): " ANSWER
		#BROWSER="echo ${PROGRAMLIST[ANSWER]}"
		if [[ "$ANSWER" =~ ^[0-2]$ ]]; then
			BROWSER=echo ${PROGRAMLIST[ANSWER]} recon-folder/aquatone_report.html || { echo -e "\e[31mError occured, please restart."; exit 1; }
		else
			func_report
		fi
	fi
}

# Main functionality, requests the functions
func_main () { 
	echo "0. Exit"
	echo "1. Only check requirements"
	echo "2. Full sequence (amass, nmap and aquatone)"
	read -p "Please enter number to start: " START

	if [[ $START = '0' ]]; then
		echo "Bye..."; exit 1
	elif [[ $START = '1' ]]; then
		func_requirements
	elif [[ $START = '2' ]]; then
		func_check_connect; func_workingdir; DOMAIN="$(func_getdomain)"; func_amass; func_nmap; func_aquatone; func_report
	else
		echo -e "\e[31mNot valid, try again\n\e[0m"; func_main
	fi
}

# Start program
func_main