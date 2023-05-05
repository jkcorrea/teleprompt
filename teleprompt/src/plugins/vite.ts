import type { Plugin } from 'vite'

import { transformPromptFileClient } from '~/transformers/transform-client'
import { transformPromptFileServer } from '~/transformers/transform-server'
import { FILE_EXT_REGEX, PROJECT_NAME } from '~/utils'

export default function vitePluginPrompt() {
  return {
    name: `${PROJECT_NAME}:transform`,
    enforce: 'pre',
    transform(code: string, id: string, options) {
      if (!FILE_EXT_REGEX.test(id)) return

      const isClientSide = !options?.ssr
      if (isClientSide) {
        const output = transformPromptFileClient(code, id)
        return {
          code: output,
          // Remove unnecessary source map
          map: null,
        }
      } else {
        const output = transformPromptFileServer(code, id)
        return output
      }
    },
  } as const satisfies Plugin
}
