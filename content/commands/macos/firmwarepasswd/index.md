---
title : "Firmwarepasswd"
# pre : '<i class="fas fa-code"></i> '
description : "Tool for setting and removing firmware passwords on a system."
date : 2021-12-31T17:09:55+01:00
# hidden : true
# draft : true
weight : 30
# tags : ['']
---

---

Setting a firmware password prevents a Mac from starting up from any device other than the startup disk. It may also be set to be required on each boot. This may be useful for mitigating some attacks which require physical access to hardware. See how to [Set a firmware password on your Mac](https://support.apple.com/en-au/HT204455) for official documentation.

This feature [can be helpful if your laptop is lost or stolen](https://www.ftc.gov/news-events/blogs/techftc/2015/08/virtues-strong-enduser-device-controls), protects against Direct Memory Access (DMA) attacks which can read your FileVault passwords and inject kernel modules such as [pcileech](https://github.com/ufrisk/pcileech), as the only way to reset the firmware password is through an Apple Store, or by using an [SPI programmer](https://reverse.put.as/2016/06/25/apple-efi-firmware-passwords-and-the-scbo-myth/), such as [Bus Pirate](http://ho.ax/posts/2012/06/unbricking-a-macbook/) or other flash IC programmer.

Start up pressing `Command` and `R` keys to boot to [Recovery Mode](https://support.apple.com/en-au/HT201314) mode.
When the Recovery window appears, choose Firmware Password Utility from the Utilities menu.
In the Firmware Utility window that appears, select Turn On Firmware Password.
Enter a new password, then enter the same password in the Verify field.
Select Set Password.
Select Quit Firmware Utility to close the Firmware Password Utility.
Select Restart or Shutdown from the Apple menu in the top-left corner.

The firmware password will activate at next boot. To validate the password, hold `Alt` during boot - you should be prompted to enter the password.

## Usage

```plain
firmwarepasswd [OPTION]
```

## Flags

```plain
    ?                               Show usage
    -h                              Show usage
    -setpasswd                      Set a firmware password. You will be promted for passwords as needed.
                                        NOTE: if this is the first password set, and no mode is
                                            in place, the mode will automatically be set to "command"
    -setmode [mode] [-allow-oroms]  Set mode to:
                                        "command" - password required to change boot disk
                                        "full" - password required on all startups
                                        -allow-oroms permits option roms execution
                                        NOTE: cannot set a mode without having set a password
    -mode                           Print out the current mode setting
    -check                          Print out whether there is / isn't a firmware password is set
    -delete                         Delete current firmware password and mode setting
    -verify                         Verify current firmware password
    -unlockseed                     Generate a firmware password recovery key
                                        NOTE: Machine must be stable for this command to generate
                                            a valid seed.  No pending changes that need a restart.
                                        NOTE: Seed is only valid until the next time a firmware password
                                            command occurs.
    -disable-reset-capability       Disable firmware password reset using unlockseed
    -enable-reset-capability        Enable firmware password reset using unlockseed
                                        NOTE: cannot enable or disable firmware password reset
                                            without having set a password
```

## Examples

The firmware password can also be managed with the firmwarepasswd utility while booted into the OS. For example, to prompt for the firmware password when attempting to boot from a different volume:

```plain
sudo firmwarepasswd -setpasswd -setmode command
```

### Verifying password

```plain
$ sudo firmwarepasswd -verify
Verifying Firmware Password
Enter password:
Correct
```

## URL List

- [Support.apple.com - Set a firmware password on your Mac](https://support.apple.com/en-us/HT204455)
