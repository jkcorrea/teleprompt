/**
 * Manages a global object by module name
 */
export function getGlobalObject<T extends Record<string, unknown> = never>(
  /** We use the filename or file path as module key */
  moduleKey: `${string}.ts`,
  defaultValue: T
): T {
  const allGlobalObjects = (globalThis.__teleprompt = globalThis.__teleprompt || {})
  const globalObject = (allGlobalObjects[moduleKey] = (allGlobalObjects[moduleKey] as T) || defaultValue)
  return globalObject
}

declare global {
  // eslint-disable-next-line no-var
  var __teleprompt: undefined | Record<string, Record<string, unknown>>
}
