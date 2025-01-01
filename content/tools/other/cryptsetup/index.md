---
title : "Cryptsetup"
# pre : ' '
description : "Manage plain dm-crypt and LUKS encrypted volumes."
date : 2020-04-13T13:58:29+02:00
# hidden : true
# draft : true
weight : 370
# tags : ['']
---

---

Manage plain dm-crypt and LUKS encrypted volumes.

## Usage

```plain
cryptsetup [OPTION...] <action> <action-specific>
```

## Flags

```plain
      --version                         Print package version
  -v, --verbose                         Shows more detailed error messages
      --debug                           Show debug messages
      --debug-json                      Show debug messages including JSON
                                        metadata
  -c, --cipher=STRING                   The cipher used to encrypt the disk
                                        (see /proc/crypto)
  -h, --hash=STRING                     The hash used to create the encryption
                                        key from the passphrase
  -y, --verify-passphrase               Verifies the passphrase by asking for
                                        it twice
  -d, --key-file=STRING                 Read the key from a file
      --master-key-file=STRING          Read the volume (master) key from file.
      --dump-master-key                 Dump volume (master) key instead of
                                        keyslots info
  -s, --key-size=BITS                   The size of the encryption key
  -l, --keyfile-size=bytes              Limits the read from keyfile
      --keyfile-offset=bytes            Number of bytes to skip in keyfile
      --new-keyfile-size=bytes          Limits the read from newly added
                                        keyfile
      --new-keyfile-offset=bytes        Number of bytes to skip in newly added
                                        keyfile
  -S, --key-slot=INT                    Slot number for new key (default is
                                        first free)
  -b, --size=SECTORS                    The size of the device
      --device-size=bytes               Use only specified device size (ignore
                                        rest of device). DANGEROUS!
  -o, --offset=SECTORS                  The start offset in the backend device
  -p, --skip=SECTORS                    How many sectors of the encrypted data
                                        to skip at the beginning
  -r, --readonly                        Create a readonly mapping
  -q, --batch-mode                      Do not ask for confirmation
  -t, --timeout=secs                    Timeout for interactive passphrase
                                        prompt (in seconds)
      --progress-frequency=secs         Progress line update (in seconds)
  -T, --tries=INT                       How often the input of the passphrase
                                        can be retried
      --align-payload=SECTORS           Align payload at <n> sector boundaries
                                        - for luksFormat
      --header-backup-file=STRING       File with LUKS header and keyslots
                                        backup
      --use-random                      Use /dev/random for generating volume
                                        key
      --use-urandom                     Use /dev/urandom for generating volume
                                        key
      --shared                          Share device with another
                                        non-overlapping crypt segment
      --uuid=STRING                     UUID for device to use
      --allow-discards                  Allow discards (aka TRIM) requests for
                                        device
      --header=STRING                   Device or file with separated LUKS
                                        header
      --test-passphrase                 Do not activate device, just check
                                        passphrase
      --tcrypt-hidden                   Use hidden header (hidden TCRYPT
                                        device)
      --tcrypt-system                   Device is system TCRYPT drive (with
                                        bootloader)
      --tcrypt-backup                   Use backup (secondary) TCRYPT header
      --veracrypt                       Scan also for VeraCrypt compatible
                                        device
      --veracrypt-pim=INT               Personal Iteration Multiplier for
                                        VeraCrypt compatible device
      --veracrypt-query-pim             Query Personal Iteration Multiplier
                                        for VeraCrypt compatible device
  -M, --type=STRING                     Type of device metadata: luks, luks1,
                                        luks2, plain, loopaes, tcrypt
      --force-password                  Disable password quality check (if
                                        enabled)
      --perf-same_cpu_crypt             Use dm-crypt same_cpu_crypt
                                        performance compatibility option
      --perf-submit_from_crypt_cpus     Use dm-crypt submit_from_crypt_cpus
                                        performance compatibility option
      --deferred                        Device removal is deferred until the
                                        last user closes it
      --serialize-memory-hard-pbkdf     Use global lock to serialize memory
                                        hard PBKDF (OOM workaround)
  -i, --iter-time=msecs                 PBKDF iteration time for LUKS (in ms)
      --pbkdf=STRING                    PBKDF algorithm (for LUKS2): argon2i,
                                        argon2id, pbkdf2
      --pbkdf-memory=kilobytes          PBKDF memory cost limit
      --pbkdf-parallel=threads          PBKDF parallel cost
      --pbkdf-force-iterations=LONG     PBKDF iterations cost (forced,
                                        disables benchmark)
      --priority=STRING                 Keyslot priority: ignore, normal,
                                        prefer
      --disable-locks                   Disable locking of on-disk metadata
      --disable-keyring                 Disable loading volume keys via kernel
                                        keyring
  -I, --integrity=STRING                Data integrity algorithm (LUKS2 only)
      --integrity-no-journal            Disable journal for integrity device
      --integrity-no-wipe               Do not wipe device after format
      --token-only                      Do not ask for passphrase if
                                        activation by token fails
      --token-id=INT                    Token number (default: any)
      --key-description=STRING          Key description
      --sector-size=INT                 Encryption sector size (default: 512
                                        bytes)
      --persistent                      Set activation flags persistent for
                                        device
      --label=STRING                    Set label for the LUKS2 device
      --subsystem=STRING                Set subsystem label for the LUKS2
                                        device
      --unbound                         Create unbound (no assigned data
                                        segment) LUKS2 keyslot
      --json-file=STRING                Read or write the json from or to a
                                        file
      --luks2-metadata-size=bytes       LUKS2 header metadata area size
      --luks2-keyslots-size=bytes       LUKS2 header keyslots area size
      --refresh                         Refresh (reactivate) device with new
                                        parameters
      --keyslot-key-size=BITS           LUKS2 keyslot: The size of the
                                        encryption key
      --keyslot-cipher=STRING           LUKS2 keyslot: The cipher used for
                                        keyslot encryption
      --encrypt                         Encrypt LUKS2 device (in-place
                                        encryption).
      --decrypt                         Decrypt LUKS2 device (remove
                                        encryption).
      --init-only                       Initialize LUKS2 reencryption in
                                        metadata only.
      --resume-only                     Resume initialized LUKS2 reencryption
                                        only.
      --reduce-device-size=bytes        Reduce data device size (move data
                                        offset). DANGEROUS!
      --hotzone-size=bytes              Maximal reencryption hotzone size.
      --resilience=STRING               Reencryption hotzone resilience type
                                        (checksum,journal,none)
      --resilience-hash=STRING          Reencryption hotzone checksums hash
      --active-name=STRING              Override device autodetection of dm
                                        device to be reencrypted

Help options:
  -?, --help                            Show this help message
      --usage                           Display brief usage

<action> is one of:
    open <device> [--type <type>] [<name>] - open device as <name>
    close <name> - close device (remove mapping)
    resize <name> - resize active device
    status <name> - show device status
    benchmark [--cipher <cipher>] - benchmark cipher
    repair <device> - try to repair on-disk metadata
    reencrypt <device> - reencrypt LUKS2 device
    erase <device> - erase all keyslots (remove encryption key)
    convert <device> - convert LUKS from/to LUKS2 format
    config <device> - set permanent configuration options for LUKS2
    luksFormat <device> [<new key file>] - formats a LUKS device
    luksAddKey <device> [<new key file>] - add key to LUKS device
    luksRemoveKey <device> [<key file>] - removes supplied key or key file from LUKS device
    luksChangeKey <device> [<key file>] - changes supplied key or key file of LUKS device
    luksConvertKey <device> [<key file>] - converts a key to new pbkdf parameters
    luksKillSlot <device> <key slot> - wipes key with number <key slot> from LUKS device
    luksUUID <device> - print UUID of LUKS device
    isLuks <device> - tests <device> for LUKS partition header
    luksDump <device> - dump LUKS partition information
    tcryptDump <device> - dump TCRYPT device information
    luksSuspend <device> - Suspend LUKS device and wipe key (all IOs are frozen)
    luksResume <device> - Resume suspended LUKS device
    luksHeaderBackup <device> - Backup LUKS device header and keyslots
    luksHeaderRestore <device> - Restore LUKS device header and keyslots
    token <add|remove|import|export> <device> - Manipulate LUKS2 tokens

You can also use old <action> syntax aliases:
    open: create (plainOpen), luksOpen, loopaesOpen, tcryptOpen
    close: remove (plainClose), luksClose, loopaesClose, tcryptClose

<name> is the device to create under /dev/mapper
<device> is the encrypted device
<key slot> is the LUKS key slot number to modify
<key file> optional key file for the new key for luksAddKey action

Default compiled-in metadata format is LUKS2 (for luksFormat action).

Default compiled-in key and passphrase parameters:
    Maximum keyfile size: 8192kB, Maximum interactive passphrase length 512 (characters)
Default PBKDF for LUKS1: pbkdf2, iteration time: 2000 (ms)
Default PBKDF for LUKS2: argon2i
    Iteration time: 2000, Memory required: 1048576kB, Parallel threads: 4

Default compiled-in device cipher parameters:
    loop-AES: aes, Key 256 bits
    plain: aes-cbc-essiv:sha256, Key: 256 bits, Password hashing: ripemd160
    LUKS: aes-xts-plain64, Key: 256 bits, LUKS header hashing: sha256, RNG: /dev/urandom
    LUKS: Default keysize with XTS mode (two internal keys) will be doubled.
```

## Examples

### Check for encrypted partitions

Find partitions on the system.

```plain
$ lsblk

NAME            MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
sda               8:0    0 465.8G  0 disk  
├─sda1            8:1    0   498M  0 part  /boot/efi
├─sda2            8:2    0     4G  0 part  /recovery
├─sda3            8:3    0 457.3G  0 part  
│ └─cryptdata   253:0    0 457.3G  0 crypt
│   └─data-root 253:1    0 457.3G  0 lvm   /
└─sda4            8:4    0     4G  0 part  
  └─cryptswap   253:2    0     4G  0 crypt [SWAP]
```

When the partition entered but it's not encrypted, the following occurs.

```plain
$ sudo cryptsetup -v isLuks /dev/sda1

Command failed with code -1 (wrong or missing parameters).
```

When the partition entered is indeed encrypted, the following occurs.

```plain
$ sudo cryptsetup -v isLuks /dev/sda3

Command successful.
```

### Change current LUSK passphrase

```plain
sudo cryptsetup luksChangeKey <device>
```

## URL List

- [Linux.die.net - Cryptsetup](https://linux.die.net/man/8/cryptsetup)
- [Johnpili.com - How to change full disk encryption LUKS password on Ubuntu](https://johnpili.com/how-to-change-full-disk-encryption-luks-password-on-ubuntu-18-04/)
