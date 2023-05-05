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

## Example

Suppose you write a prompt template file like this:

`src/prompts/my-amazing-prompt.prompt`

````md
```ts
interface Props {
  requestedAt: Date
}

interface Context {
  adverb: string
}

export default function(props: Props): Context {
  return {
    time: requestedAt.toISOString(),
    adverb: 'ease'
  }
}

export const config: PromptConfig = {
  model: 'gpt-3.5-turbo',
}

```

This is my prompt. I can interpolate variables with ${adverb}! The current time is ${time}.
````

Then, in your client code, you simply import and call it like so:

`src/App.tsx`

```ts
import MyAmazingPrompt from './prompts/my-amazing-prompt.prompt'

export default function App() {
  useEffect(() => {
    const output = await MyAmazingPrompt(
      // the `Props` object
      { requestedAt: new Date() },
      // Optional. Override the template config
      { model: 'gpt-4' }
    )
    // The AI model receives:
    // "This is my prompt. I can interpolate variables with ease! The current time is 2023-05-05T18:31:04.740Z."
    console.log(output)
    // => The response from the AI model...
  }, [])

  return ...
}
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
