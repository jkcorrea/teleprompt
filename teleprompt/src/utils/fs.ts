/**
 * Returns just the file name, without path or suffix
 *
 * @param str Either a fully qualified file path, or just the file name
 */
export const extractFileName = (str: string) =>
  str
    .split(/(\\|\/)/g)
    .pop()
    ?.replace(/\.[^/.]+$/, '') ?? ''

import { assert } from './assert'

export { assertPosixPath, toPosixPath, toSystemPath }

const sepPosix = '/'
const sepWin32 = '\\'

function toPosixPath(path: string) {
  if (isPosix()) {
    assertPosixPath(path)
    return path
  }
  if (isWin32()) {
    const pathPosix = path.split(sepWin32).join(sepPosix)
    assertPosixPath(pathPosix)
    return pathPosix
  }
  assert(false)
}

function assertPosixPath(path: string) {
  assert(path && !path.includes(sepWin32), `Wrongly formatted path: ${path}`)
}

function toSystemPath(path: string) {
  if (isPosix()) {
    return toPosixPath(path)
  }
  if (isWin32()) {
    return path.split(sepPosix).join(sepWin32)
  }
  assert(false)
}

function isWin32() {
  return process.platform === 'win32'
}
function isPosix() {
  return !isWin32()
}
