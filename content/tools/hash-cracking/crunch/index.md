---
title : "Crunch"
# pre : ' '
description : "Crunch can create a word list based on criteria you specify. The output from crunch can be sent to the screen, file, or to another program.."
date : 2022-11-14T14:30:12+01:00
# hidden : true
# draft : true
weight : 10
# tags : ['']
---

---

Crunch can create a word list based on criteria you specify. The output from crunch can be sent to the screen, file, or to another program.

## Installation

```plain
sudo apt install crunch
```

```plain
brew install crunch
```

## Usage

```plain
crunch <min-len> <max-len> [<charset string>] [options]
```

## Placeholders

| Placeholder | Character Translation              | Output                                          |
| ----------- | ---------------------------------- | ----------------------------------------------- |
| `@`         | Lower case alpha characters        | abcdefghijklmnopqrstuvwxyz                      |
| `,`         | Upper case alpha characters        | ABCDEFGHIJKLMNOPQRSTUVWXYZ                      |
| `%`         | Numeric characters                 | 1234567890                                      |
| `^`         | Special characters including space | ```«space»!"#$%&'()-+,-./:;<=>?@[\]^_`{\| }~``` |

## Flags

```plain
       min-len
              The minimum length string you want crunch to start at.  This option is required even for parameters that won't use the value.

       max-len
              The maximum length string you want crunch to end at.  This option is required even for parameters that won't use the value.

       charset string
              You may specify character sets for crunch to use on the command line or if you leave it blank crunch will use the default character sets.  The order MUST BE lower case characters, upper case characters,
              numbers, and then symbols.  If you don't follow this order you will not get the results you want.  You MUST specify either values for the character type or a plus sign.  NOTE: If you want to include the
              space character in your character set you must escape it using the \ character or enclose your character set in quotes i.e. "abc ".  See the examples 3, 11, 12, and 13 for examples.

       -b number[type]
              Specifies the size of the output file, only works if -o START is used, i.e.: 60MB  The output files will be in the format of starting letter-ending letter for example: ./crunch 4 5 -b 20mib -o START will
              generate 4 files: aaaa-gvfed.txt, gvfee-ombqy.txt, ombqz-wcydt.txt, wcydu-zzzzz.txt valid values for type are kb, mb, gb, kib, mib, and gib.  The first three types are based on 1000 while the last three
              types are based on 1024.  NOTE There is no space between the number and type.  For example 500mb is correct 500 mb is NOT correct.

       -c number
              Specifies the number of lines to write to output file, only works if -o START is used, i.e.: 60  The output files will be in the format of starting letter-ending letter for example: ./crunch 1 1 -f
              /pentest/password/crunch/charset.lst mixalpha-numeric-all-space -o START -c 60 will result in 2 files: a-7.txt and 8-\ .txt  The reason for the slash in  the second filename is the ending character is
              space and ls has to escape it to print it.  Yes you will need to put in the \ when specifying the filename because the last character is a space.

       -d numbersymbol
              Limits the number of duplicate characters.  -d 2@ limits the lower case alphabet to output like aab and aac.  aaa would not be generated as that is 3 consecutive letters of a.  The format is number then
              symbol where number is the maximum number of consecutive characters and symbol is the symbol of the the character set you want to limit i.e. @,%^   See examples 17-19.

       -e string
              Specifies when crunch should stop early

       -f /path/to/charset.lst charset-name
              Specifies a character set from the charset.lst

       -i Inverts the output so instead of aaa,aab,aac,aad, etc you get aaa,baa,caa,daa,aba,bba, etc

       -l When you use the -t option this option tells crunch which symbols should be treated as literals.  This will allow you to use the placeholders as letters in the pattern.  The -l option should be the same
              length as the -t option.  See example 15.

       -m Merged with -p.  Please use -p instead.

       -o wordlist.txt
              Specifies the file to write the output to, eg: wordlist.txt

       -p charset OR -p word1 word2 ...
              Tells crunch to generate words that don't have repeating characters.  By default crunch will generate a wordlist size of #of_chars_in_charset ^ max_length.  This option will instead generate
              #of_chars_in_charset!.  The ! stands for factorial.  For example say the charset is abc and max length is 4..  Crunch will by default generate 3^4 = 81 words.  This option will instead generate 3! = 3x2x1
              = 6 words (abc, acb, bac, bca, cab, cba).  THIS MUST BE THE LAST OPTION!  This option CANNOT be used with -s and it ignores min and max length however you must still specify two numbers.

       -q filename.txt
              Tells crunch to read filename.txt and permute what is read.  This is like the -p option except it gets the input from filename.txt.

       -r Tells crunch to resume generate words from where it left off.  -r only works if you use -o.  You must use the same command as the original command used to generate the words.  The only exception to this is
              the -s option.  If your original command used the -s option you MUST remove it before you resume the session.  Just add -r to the end of the original command.

       -s startblock
              Specifies a starting string, eg: 03god22fs

       -t @,%^
              Specifies a pattern, eg: @@god@@@@ where the only the @'s, ,'s, %'s, and ^'s will change.
              @ will insert lower case characters
              , will insert upper case characters
              % will insert numbers
              ^ will insert symbols

       -u     The -u option disables the printpercentage thread.  This should be the last option.

       -z gzip, bzip2, lzma, and 7z
              Compresses the output from the -o option.  Valid parameters are gzip, bzip2, lzma, and 7z.
              gzip is the fastest but the compression is minimal.  bzip2 is a little slower than gzip but has better compression.  7z is slowest but has the best compression.
```

## Examples

### Create list with specific word followed by specific placeholder

```plain
$ crunch 10 10 -t Welkom%%%%
Crunch will now generate the following amount of data: 110000 bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: 10000 
Welkom0000
Welkom0001
Welkom0002
Welkom0003
Welkom0004
Welkom0005
Welkom0006
Welkom0007
Welkom0008
Welkom0009
Welkom0010
[...]
```

### Brute force wordlist creation

```plain
$ crunch 4 6 0123456789ABCDEF -o wordlist.txt
Crunch will now generate the following amount of data: 124059648 bytes
118 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: 17891328 

crunch: 100% completed generating output
```

This will result in for example:

- 0000
- 0001
- 0002
- FFFFF6
- FFFFF7
- FFFFF8

## URL list

- [Sourceforge.net - crunch-wordlist](https://sourceforge.net/projects/crunch-wordlist/)
- [Formulae.brew.sh - crunch](https://formulae.brew.sh/formula/crunch#default)
