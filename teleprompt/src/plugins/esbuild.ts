import type { Plugin } from 'esbuild'
import fs from 'node:fs/promises'

import { transformPromptFileClient } from '~/transformers/transform-client'
import { FILE_EXT_REGEX, PROJECT_NAME } from '~/utils'

interface PromptFileLoaderPluginOptions {}

export default function promptFileLoaderPlugin(_options: PromptFileLoaderPluginOptions = {}): Plugin {
  return {
    name: PROJECT_NAME,
    setup(build) {
      build.onLoad({ filter: FILE_EXT_REGEX }, async args => {
        const code = await fs.readFile(args.path, 'utf8')
        const contents = transformPromptFileClient(code, args.path)
        return {
          contents,
          loader: 'ts',
        }
      })
    },
  }
}
