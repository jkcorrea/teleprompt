type RenderFn<T extends Record<string, unknown>> = (props: T) => Promise<string> | string

declare module '*' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const render: RenderFn<any>
  export default render
}
