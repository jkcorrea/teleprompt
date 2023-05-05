import { posix } from 'node:path'

import { assert, assertPosixPath } from '~/utils'

// TODO: transform teleprompt client code into a module that calls the backend
export { transformPromptFile as transformPromptFileClient } from './shared'

function _transformPromptFileClientSync(id: string, appRootDir: string, exportNames: readonly string[] | string[]) {
  assertPosixPath(id)
  assertPosixPath(appRootDir)

  const telepromptFilePath = '/' + posix.relative(appRootDir, id)
  assert(!telepromptFilePath.startsWith('/.'))
  assertPosixPath(telepromptFilePath)

  const code = getCode(exportNames, telepromptFilePath)
  return code
}

export function getCode(exportNames: readonly string[], telepromptFilePath: string) {
  const lines: string[] = []

  lines.push('// @ts-nocheck')

  lines.push(`import { __remoteTelepromptCall } from 'teleprompt/client';`)

  exportNames.forEach(exportName => {
    const varName = exportName === 'default' ? 'defaultExport' : exportName

    lines.push(
      `const ${varName} =  (...args) => __remoteTelepromptCall('${telepromptFilePath}', '${exportName}', args);`
    )

    {
      assert(!telepromptFilePath.includes(':'))
      const key = `${telepromptFilePath}:${exportName}`
      lines.push(`${varName}._key = ${JSON.stringify(key)};`)
    }

    if (exportName === 'default') {
      lines.push(`export default ${varName};`)
    } else {
      lines.push(`export { ${varName} };`)
    }
  })

  const code = lines.join('\n')
  return code
}
