const __webpack_require__ = (id) => {
  const cached = moduleCache[id]
  if (cached !== undefined) {
    if (cached.error) throw cached.error
    return cached.exports
  }

  const execOptions = {
    id,
    module: {
      id,
      exports: {},
      loaded: false,
      error: undefined,
    },
    require: __webpack_require__,
  }

  for (const handler of interceptModuleExecution) {
    handler(execOptions)
  }

  const result = codegenResults.map[id]['build time']
  const moduleObject = execOptions.module

  if (id) moduleCache[id] = moduleObject

  tryRunOrWebpackError(
    () =>
      queried.call(
        {
          codeGenerationResult: new CodeGenerationResult(result),
          moduleObject,
        },
        // What, transform bug?
        { __webpack_require__ }
      ),
    'Compilation.hooks.executeModule'
  )
  moduleObject.loaded = true
  return moduleObject.exports
}
