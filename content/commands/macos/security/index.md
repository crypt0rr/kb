---
title : "Security"
# pre : '<i class="fas fa-code"></i> '
description : "Administer Keychains, keys, certificates and the Security framework."
date : 2022-08-18T14:56:32+02:00
# hidden : true
# draft : true
weight : 80
# tags : ['']
---

---

Administer Keychains, keys, certificates and the Security framework.

## Usage

```plain
security [-h] [-i] [-l] [-p prompt] [-q] [-v] [command] [opt ...]
    -i    Run in interactive mode.
    -l    Run /usr/bin/leaks -nocontext before exiting.
    -p    Set the prompt to "prompt" (implies -i).
    -q    Be less verbose.
    -v    Be more verbose about what's going on.
```

## Flags

```plain
security commands are:
    help                                 Show all commands, or show usage for a command.
    list-keychains                       Display or manipulate the keychain search list.
    list-smartcards                      Display available smartcards.
    default-keychain                     Display or set the default keychain.
    login-keychain                       Display or set the login keychain.
    create-keychain                      Create keychains and add them to the search list.
    delete-keychain                      Delete keychains and remove them from the search list.
    lock-keychain                        Lock the specified keychain.
    unlock-keychain                      Unlock the specified keychain.
    set-keychain-settings                Set settings for a keychain.
    set-keychain-password                Set password for a keychain.
    show-keychain-info                   Show the settings for keychain.
    dump-keychain                        Dump the contents of one or more keychains.
    create-keypair                       Create an asymmetric key pair.
    add-generic-password                 Add a generic password item.
    add-internet-password                Add an internet password item.
    add-certificates                     Add certificates to a keychain.
    find-generic-password                Find a generic password item.
    delete-generic-password              Delete a generic password item.
    set-generic-password-partition-list  Set the partition list of a generic password item.
    find-internet-password               Find an internet password item.
    delete-internet-password             Delete an internet password item.
    set-internet-password-partition-list Set the partition list of a internet password item.
    find-key                             Find keys in the keychain
    set-key-partition-list               Set the partition list of a key.
    find-certificate                     Find a certificate item.
    find-identity                        Find an identity (certificate + private key).
    delete-certificate                   Delete a certificate from a keychain.
    delete-identity                      Delete an identity (certificate + private key) from a keychain.
    set-identity-preference              Set the preferred identity to use for a service.
    get-identity-preference              Get the preferred identity to use for a service.
    create-db                            Create a db using the DL.
    export                               Export items from a keychain.
    import                               Import items into a keychain.
    export-smartcard                     Export items from a smartcard.
    cms                                  Encode or decode CMS messages.
    install-mds                          Install (or re-install) the MDS database.
    add-trusted-cert                     Add trusted certificate(s).
    remove-trusted-cert                  Remove trusted certificate(s).
    dump-trust-settings                  Display contents of trust settings.
    user-trust-settings-enable           Display or manipulate user-level trust settings.
    trust-settings-export                Export trust settings.
    trust-settings-import                Import trust settings.
    verify-cert                          Verify certificate(s).
    authorize                            Perform authorization operations.
    authorizationdb                      Make changes to the authorization policy database.
    execute-with-privileges              Execute tool with privileges.
    leaks                                Run /usr/bin/leaks on this process.
    error                                Display a descriptive message for the given error code(s).
    create-filevaultmaster-keychain      Create a keychain containing a key pair for FileVault recovery use.
    smartcards                           Enable, disable or list disabled smartcard tokens.
    translocate-create                   Create a translocation point for the provided path
    translocate-policy-check             Check whether a path would be translocated.
    translocate-status-check             Check whether a path is translocated.
    translocate-original-path            Find the original path for a translocated path.
    requirement-evaluate                 Evaluate a requirement against a cert chain.
    filevault                            Handles FileVault specific settings and overrides.
```

## Examples

```plain
$ security list-keychains                     
    "/Users/crypt0rr/Library/Keychains/login.keychain-db"
    "/Library/Keychains/System.keychain"
```

## URL List

- [ss64.com - security](https://ss64.com/osx/security.html)
