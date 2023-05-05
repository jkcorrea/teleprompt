/* eslint-disable no-console */
import { PROJECT_GITHUB_REPO, PROJECT_NAME, PROJECT_VERSION } from './constants'
import { createErrorWithCleanStackTrace } from './errors'
import { getGlobalObject } from './global-object'

export { assert, assertInfo, assertUsage, assertWarning, errorPrefix, getProjectError }

const errorPrefix = `[${PROJECT_NAME}@${PROJECT_VERSION}]`
const internalErrorPrefix = `${errorPrefix}[Bug]`
const usageErrorPrefix = `${errorPrefix}[Wrong Usage]`
const warningPrefix = `${errorPrefix}[Warning]`
const infoPrefix = `${errorPrefix}[Info]`

const numberOfStackTraceLinesToRemove = 2

function assert(condition: unknown, debugInfo?: unknown): asserts condition {
  if (condition) {
    return
  }

  const debugStr = (() => {
    if (!debugInfo) {
      return ''
    }
    const debugInfoSerialized = typeof debugInfo === 'string' ? debugInfo : '`' + JSON.stringify(debugInfo) + '`'
    return `Debug info (this is for the ${PROJECT_NAME} maintainers; you can ignore this): ${debugInfoSerialized}.`
  })()

  const internalError = createErrorWithCleanStackTrace(
    [
      `${internalErrorPrefix} You stumbled upon a bug in ${PROJECT_NAME}'s source code.`,
      `Reach out at ${PROJECT_GITHUB_REPO}/issues/new and include this error stack (the error stack is usually enough to fix the problem).`,
      'A maintainer will fix the bug (usually under 24 hours).',
      `Don't hesitate to reach out as it makes ${PROJECT_NAME} more robust.`,
      debugStr,
    ].join(' '),
    numberOfStackTraceLinesToRemove
  )

  throw internalError
}

function assertUsage(condition: unknown, errorMessage: string): asserts condition {
  if (condition) {
    return
  }
  const whiteSpace = errorMessage.startsWith('[') ? '' : ' '
  const usageError = createErrorWithCleanStackTrace(
    `${usageErrorPrefix}${whiteSpace}${errorMessage}`,
    numberOfStackTraceLinesToRemove
  )
  throw usageError
}

function getProjectError(errorMessage: string) {
  const sep = errorMessage.startsWith('[') ? '' : ' '
  const pluginError = createErrorWithCleanStackTrace(
    `${errorPrefix}${sep}${errorMessage}`,
    numberOfStackTraceLinesToRemove
  )
  return pluginError
}

const globalObject = getGlobalObject<{ alreadyLogged: Set<string> }>('assert.ts', { alreadyLogged: new Set() })
function assertWarning(
  condition: unknown,
  errorMessage: string,
  { onlyOnce, showStackTrace }: { onlyOnce: boolean | string; showStackTrace?: true }
): void {
  if (condition) {
    return
  }
  const msg = `${warningPrefix} ${errorMessage}`
  if (onlyOnce) {
    const { alreadyLogged } = globalObject
    const key = onlyOnce === true ? msg : onlyOnce
    if (alreadyLogged.has(key)) {
      return
    } else {
      alreadyLogged.add(key)
    }
  }
  if (showStackTrace) {
    console.warn(new Error(msg))
  } else {
    console.warn(msg)
  }
}

function assertInfo(condition: unknown, errorMessage: string, { onlyOnce }: { onlyOnce: boolean }): void {
  if (condition) {
    return
  }
  const msg = `${infoPrefix} ${errorMessage}`
  if (onlyOnce) {
    const { alreadyLogged } = globalObject
    const key = msg
    if (alreadyLogged.has(key)) {
      return
    } else {
      alreadyLogged.add(key)
    }
  }
  console.log(msg)
}
