---
title : "cal"
# pre : '<i class="fas fa-code"></i> '
description : "Displays a calendar"
date : 2021-03-17T11:58:35+01:00
# hidden : true
# draft : true
weight : 70
# tags : ['']
---

---

Displays a calendar and the date of Easter.

## Usage

```plain
cal [general options] [-jy] [[month] year]
    cal [general options] [-j] [-m month] [year]
    ncal -C [general options] [-jy] [[month] year]
    ncal -C [general options] [-j] [-m month] [year]
    ncal [general options] [-bhJjpwySM] [-H yyyy-mm-dd] [-s country_code] [[month] year]
    ncal [general options] [-bhJeoSM] [year]
```

## Flags

```plain
General options: [-31] [-A months] [-B months] [-d yyyy-mm]
```

## Examples

### Current month and date

```plain
$ cal        
     March 2021       
Su Mo Tu We Th Fr Sa  
    1  2  3  4  5  6  
 7  8  9 10 11 12 13  
14 15 16 *17* 18 19 20  
21 22 23 24 25 26 27  
28 29 30 31           
```

### Calendar for specific year

```plain
$ cal 1970
                            1970
      January               February               March          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
             1  2  3   1  2  3  4  5  6  7   1  2  3  4  5  6  7  
 4  5  6  7  8  9 10   8  9 10 11 12 13 14   8  9 10 11 12 13 14  
11 12 13 14 15 16 17  15 16 17 18 19 20 21  15 16 17 18 19 20 21  
18 19 20 21 22 23 24  22 23 24 25 26 27 28  22 23 24 25 26 27 28  
25 26 27 28 29 30 31                        29 30 31              
                                                                  

       April                  May                   June          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                  1  2      1  2  3  4  5  6  
 5  6  7  8  9 10 11   3  4  5  6  7  8  9   7  8  9 10 11 12 13  
12 13 14 15 16 17 18  10 11 12 13 14 15 16  14 15 16 17 18 19 20  
19 20 21 22 23 24 25  17 18 19 20 21 22 23  21 22 23 24 25 26 27  
26 27 28 29 30        24 25 26 27 28 29 30  28 29 30              
                      31                                          

        July                 August              September        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                     1         1  2  3  4  5  
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   6  7  8  9 10 11 12  
12 13 14 15 16 17 18   9 10 11 12 13 14 15  13 14 15 16 17 18 19  
19 20 21 22 23 24 25  16 17 18 19 20 21 22  20 21 22 23 24 25 26  
26 27 28 29 30 31     23 24 25 26 27 28 29  27 28 29 30           
                      30 31                                       

      October               November              December        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
             1  2  3   1  2  3  4  5  6  7         1  2  3  4  5  
 4  5  6  7  8  9 10   8  9 10 11 12 13 14   6  7  8  9 10 11 12  
11 12 13 14 15 16 17  15 16 17 18 19 20 21  13 14 15 16 17 18 19  
18 19 20 21 22 23 24  22 23 24 25 26 27 28  20 21 22 23 24 25 26  
25 26 27 28 29 30 31  29 30                 27 28 29 30 31
```

## URL List

- [Linux.die.net - cal](https://linux.die.net/man/1/cal)
