import { pascalCase } from 'change-case'
import ts from 'typescript'

import { extractFileName } from '~/utils'
import { getTsConfig } from '~/utils/get-ts-config'

export { transformPromptFile }

/**
 * Transforms a prompt file into a module that can be imported and called
 *
 * @param src The code of the prompt file
 * @param id The file name or path of the prompt file
 */
function transformPromptFile(src: string, fileName: string): string {
  const fnName = pascalCase(extractFileName(fileName)) + 'Prompt'
  if (!fnName) throw new Error(`Unable to extract file name from ${fileName}`)

  const parts = src
    .split(/^```(?:.*)$/m)
    .filter(Boolean)
    .map(part => part.trim())
  if (parts.length !== 2) throw new Error(`Unable to parse prompt file ${fileName}`)
  const [header, body] = parts

  // Grab file name from the id
  // Create the default export as an async function that returns the body as a string
  const tsCode = `async function ${fnName}(): Promise<string> {
  ${header}

  return \`${body}\`;
}

export default ${fnName};
  `

  const compilerOptions = getTsConfig()
  const transpiled = ts.transpileModule(tsCode, { compilerOptions })

  return transpiled.outputText
}
