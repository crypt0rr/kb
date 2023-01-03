# Knowledge Base (kb)

Just some silly notes digitalized, have fun and feel free to open PR.

Live version of the site is available on [kb.offsec.nl](https://kb.offsec.nl).

## Run Locally?

```plain
git clone https://github.com/crypt0rr/kb
cd kb
hugo server
```

## Create new pages

```plain
hugo new --kind <archetype> content/<folder>/<item>
```

Example creation of tool

```plain
hugo new --kind tool content/tools/other/testtool
```

## Contributing

Feel free to open a PR with your content/changes. Some rules:

- Markdown styling as used in other content;
- Content is UTF-8;
- Single file size limit 25MB;
- PR naming describes content.

## License

[GNU GPLv3](https://github.com/crypt0rr/kb/blob/master/LICENSE)
