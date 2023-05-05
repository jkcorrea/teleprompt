# Teleprompt

Create, compose, and use a AI prompts like you would GraphQL queries.

## Quick Start

```sh
yarn install
yarn dev
```

Then, try it out:

```sh
yarn workspace example dev
```

## Development

You'll first want to [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/) the package dir to the `example/`:

```sh
cd teleprompt && yarn link
cd ../example && yarn link teleprompt
```

Next, watch for source file changes & rebuild with:
```sh
# At workspace root
yarn dev
```

Then, run the `example/` project

```sh
yarn workspace example dev
```

NOTE: Any changes to the vite plugin will require a restart of the `example/` project.
