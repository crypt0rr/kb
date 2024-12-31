---
title : "Bash Scripting"
pre : '<i class="fas fa-code"></i> '
description : "Bash scripting must have/know tips."
date : 2022-09-18T14:34:31+02:00
# hidden : true
# draft : true
weight : 20
# tags : ['']
---

---

Bash scripting must have/know tips.

## Intro script

```bash
#!/bin/bash
# Hello World Bash Script
echo "Hello World!"
```

- Line 1: #! is commonly known as the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) and is ignored by the Bash interpreter. The second part, /bin/bash, is the [absolute path](http://www.linfo.org/absolute_pathname.html) to the interpreter, which is used to run the script. This is what makes this a “Bash script” as opposed to another type of shell script, like a “C Shell script”, for example.
- Line 2: # is used to add a comment, so all text that follows it is ignored.
- Line 3: echo “Hello World!” uses the echo Linux command utility to print a given string to the terminal, which in this case is “Hello World!”.

Results in:

```plain
./hello-world.sh
Hello World!
```

## Special Bash variables

| Variable Name | Description                                      |
| ------------- | ------------------------------------------------ |
| $0            | The name of the Bash script                      |
| $1 - $9       | The first 9 arguments to the Bash script         |
| $#            | Number of arguments passed to the Bash script    |
| $@            | All arguments passed to the Bash script          |
| $?            | The exit status of the most recently run process |
| $$            | The process ID of the current script             |
| $USER         | The username of the user running the script      |
| $HOSTNAME     | The hostname of the machine                      |
| $RANDOM       | A random number                                  |
| $LINENO       | The current line number in the scrip             |

## Common test command operators

| Operator              | Description: Expression True if...             |
| --------------------- | ---------------------------------------------- |
| !EXPRESSION           | The EXPRESSION is false.                       |
| -n STRING             | STRING length is greater than zero             |
| -z STRING             | The length of STRING is zero (empty)           |
| STRING1 != STRING2    | STRING1 is not equal to STRING2                |
| STRING1 = STRING2     | STRING1 is equal to STRING2                    |
| INTEGER1 -eq INTEGER2 | INTEGER1 is equal to INTEGER2                  |
| INTEGER1 -ne INTEGER2 | INTEGER1 is not equal to INTEGER2              |
| INTEGER1 -gt INTEGER2 | INTEGER1 is greater than INTEGER2              |
| INTEGER1 -lt INTEGER2 | INTEGER1 is less than INTEGER2                 |
| INTEGER1 -ge INTEGER2 | INTEGER1 is greater than or equal to INTEGER 2 |
| INTEGER1 -le INTEGER2 | INTEGER1 is less than or equal to INTEGER 2    |
| -d FILE               | FILE exists and is a directory                 |
| -e FILE               | FILE exists                                    |
| -r FILE               | FILE exists and has read permission            |
| -s FILE               | FILE exists and it is not empty                |
| -w FILE               | FILE exists and has write permission           |
| -x FILE               | FILE exists and has execute permission         |
| &&                    | AND                                            |
| \|\|                  | OR                                             |

## Reading user input

Prompting user for input and silently reading it using `read`.

- `-p` - prompts the user to supply input, while the input is typed it is shown in the terminal
- `-sp` - prompts the user to supply input, while the input is typed it is NOT shown in the terminal

```bash
#!/bin/bash
# Prompt the user for credentials
read -p 'Username: ' username
read -sp 'Password: ' password
echo "Thanks, your credentials are as follows: " $username " and " $password 

$ ./input2.sh
Username: crypt0rr
Password:
Thanks, your credentials are as follows: crypt0rr and HaveYouSeenMyPassword?
```

## For Loop

```plain
$ for ip in $(seq 1 5); do echo 10.11.1.$ip; done 
10.11.1.1
10.11.1.2
10.11.1.3
10.11.1.4
10.11.1.5
```

```plain
$ for i in {1..5}; do echo 10.11.1.$i;done 
10.11.1.1
10.11.1.2
10.11.1.3
10.11.1.4
10.11.1.5
```

## While Loop

```bash
#!/bin/bash
# while loop example
counter=1
while [ $counter -lt 6 ]
do
    echo "10.11.1.$counter"
    ((counter++))
done
```

```plain
./while.sh
10.11.1.1
10.11.1.2
10.11.1.3
10.11.1.4
10.11.1.5
```

```bash
#!/bin/bash
# while loop example 2
counter=1
while [ $counter -le 5 ]
do
    echo "10.11.1.$counter"
    ((counter++))
done

./while2.sh 10.11.1.1
10.11.1.2
10.11.1.3
10.11.1.4
10.11.1.5
```

## Functions

Two methods of declaring functions.

```bash
function function_name {
commands...
}
```

```bash
function_name () {
commands...
}
```

## URL List

- [Linuxconfig.org - Bash Scripting Tutorial for Beginners](https://linuxconfig.org/bash-scripting-tutorial-for-beginners)
- [Linuxconfig.org - Bash Scripting Tutorial](https://linuxconfig.org/bash-scripting-tutorial)
- [Hostinger.com - Bash Scripting Tutorial for Beginners](https://www.hostinger.com/tutorials/bash-function-tutorial-with-examples/)
- [Geeksforgeeks.org - Bash Scripting – Functions](https://www.geeksforgeeks.org/bash-scripting-functions/)
