import { readFileSync } from 'fs'
import { join } from 'path'

import ts from 'typescript'

export { getTsConfig }

function getTsConfig(): ts.CompilerOptions {
  try {
    const tsconfigPath = join(process.cwd(), 'tsconfig.json')
    const tsconfigContent = readFileSync(tsconfigPath, 'utf8')
    const tsconfigJson = ts.parseConfigFileTextToJson(tsconfigPath, tsconfigContent)
    const parsedConfig = ts.parseJsonConfigFileContent(tsconfigJson.config, ts.sys, process.cwd())

    return parsedConfig.options
  } catch (error) {
    console.error('Error reading tsconfig.json:', (error as any).message)
    return {}
  }
}
